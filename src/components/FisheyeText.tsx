"use client";
import React from 'react';

export default function FisheyeText({ children }: { children: string }) {
  const words = children.split(" ");
  return (
    <span className="fisheye-container">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, i) => (
            <span
              key={i}
              className="fisheye-char inline-block font-medium"
              style={{
                pointerEvents: "none",
                willChange: "transform",
                verticalAlign: "middle",
              }}
            >
              {char}
            </span>
          ))}
          {/* Add space between words */}
          {wordIndex < words.length - 1 && (
            <span className="inline" style={{ width: '0.3em', display: 'inline-block' }}>
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
