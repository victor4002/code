"use client";

import { useEffect, useState, useCallback } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean;
  duration?: number;
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

export function TextScramble({
  text,
  className = "",
  trigger = true,
  duration = 1500,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalIterations = text.length * 3;
    const intervalDuration = duration / totalIterations;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 3) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1;

      if (iteration >= totalIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [text, duration]);

  useEffect(() => {
    if (trigger && !hasAnimated) {
      scramble();
      setHasAnimated(true);
    }
  }, [trigger, hasAnimated, scramble]);

  return <span className={`font-mono ${className}`}>{displayText}</span>;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <span
        className="inline-block animate-text-reveal"
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </span>
    </span>
  );
}
