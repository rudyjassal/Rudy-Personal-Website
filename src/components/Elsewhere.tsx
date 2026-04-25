import { elsewhere } from "@/content/site";
import FisheyeText from "./FisheyeText";

export default function Elsewhere() {
  return (
    <p className="font-serif" style={{ fontSize: "17px" }}>
      {elsewhere.map((link, i) => (
        <span key={link.label}>
          {i > 0 && <span style={{ color: "#888", margin: "0 0.4em" }}>·</span>}
          <a
            className="elsewhere-link"
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={
              link.href.startsWith("mailto:")
                ? undefined
                : "noopener noreferrer"
            }
          >
            <FisheyeText>{link.label}</FisheyeText>
          </a>
        </span>
      ))}
    </p>
  );
}
