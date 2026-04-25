import { NextResponse } from "next/server";

const TICKERS = [
  { symbol: "^GSPC", label: "S&P 500" },
  { symbol: "^DJI", label: "DOW" },
  { symbol: "^IXIC", label: "NASDAQ" },
  { symbol: "^RUT", label: "R2000" },
  { symbol: "SPY", label: "SPY" },
  { symbol: "QQQ", label: "QQQ" },
  { symbol: "DIA", label: "DIA" },
  { symbol: "IWM", label: "IWM" },
  { symbol: "VTI", label: "VTI" },
  { symbol: "GLD", label: "GLD" },
  { symbol: "BTC-USD", label: "BTC" },
];

export type MarketTicker = {
  symbol: string;
  label: string;
  price: number;
  change: number;
  changePct: number;
  high: number;
  low: number;
  open: number;
};

async function fetchTicker(
  symbol: string,
  label: string
): Promise<MarketTicker | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      symbol
    )}?range=1d&interval=1d&includePrePost=false`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const result = data?.chart?.result?.[0];
    if (!result) return null;

    const meta = result.meta;
    const quote = result.indicators?.quote?.[0];

    const price = meta.regularMarketPrice ?? 0;
    const prevClose = meta.chartPreviousClose ?? meta.previousClose ?? price;
    const change = price - prevClose;
    const changePct = prevClose !== 0 ? (change / prevClose) * 100 : 0;

    const high =
      quote?.high?.filter((v: number | null) => v !== null).at(-1) ??
      meta.regularMarketDayHigh ??
      price;
    const low =
      quote?.low?.filter((v: number | null) => v !== null).at(-1) ??
      meta.regularMarketDayLow ??
      price;
    const open =
      quote?.open?.filter((v: number | null) => v !== null)?.[0] ??
      prevClose;

    return {
      symbol,
      label,
      price: +price.toFixed(2),
      change: +change.toFixed(2),
      changePct: +changePct.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      open: +open.toFixed(2),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const results = await Promise.all(
    TICKERS.map((t) => fetchTicker(t.symbol, t.label))
  );

  const tickers = results.filter(Boolean) as MarketTicker[];

  return NextResponse.json(
    {
      tickers,
      updatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    }
  );
}
