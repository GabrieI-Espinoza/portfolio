import { useState, useEffect, useRef } from "react";

const CODE = `profile = {
    "name": "Gabriel Espinoza",
    "role": "Software Engineer",
    "location": "Fairfax, VA",
    "status": "Ready to build"
}`;

const CHAR_DELAYS = {
  bracket: 150,
  newline: 400,
  space: -10,
  base: 30,
  jitter: 50,
};

function getCharDelay(char) {
  let delay = Math.random() * CHAR_DELAYS.jitter + CHAR_DELAYS.base;

  if ("{},[]".includes(char)) delay += CHAR_DELAYS.bracket;
  else if (char === "\n") delay += CHAR_DELAYS.newline;
  else if (char === " ") delay += CHAR_DELAYS.space;

  return delay;
}

function highlightSyntax(text) {
  return text
    .replace(/"(.*?)"/g, '<span class="text-accent-warm">"$1"</span>')
    .replace(
      /(profile)/g,
      '<span class="text-neutral-900 font-semibold">$1</span>',
    )
    .replace(
      /\b(name|role|location|status)\b/g,
      '<span class="text-accent-cool">$1</span>',
    )
    .replace(/(True|False|None)/g, '<span class="text-accent-warm">$1</span>')
    .replace(/([{}[\]])/g, '<span class="text-neutral-500">$1</span>');
}

const LINE_COUNT = CODE.split("\n").length;

const Terminal = () => {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);

  /* Type out CODE one character at a time */
  useEffect(() => {
    let timeoutId;

    const typeNext = () => {
      const i = indexRef.current;
      if (i >= CODE.length) return;

      setTypedText(CODE.slice(0, i + 1));
      indexRef.current++;
      timeoutId = setTimeout(typeNext, getCharDelay(CODE[i]));
    };

    timeoutId = setTimeout(typeNext, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  /* Blinking cursor */
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="w-full"
      role="img"
      aria-label="Animated code editor showing developer profile"
    >
      <div className="rounded-lg overflow-hidden bg-surface border border-border shadow-sm">
        {/* Title bar */}
        <div className="flex items-center px-4 py-2.5 border-b border-border-subtle relative">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-[10px] text-neutral-500 font-mono">
            profile.py
          </span>
        </div>

        {/* Code area */}
        <div className="p-4 md:p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto min-h-[140px]">
          <div className="flex">
            {/* Line numbers */}
            <div className="flex flex-col text-right pr-4 md:pr-6 select-none border-r border-border-subtle mr-4 md:mr-6 text-[10px] md:text-xs leading-relaxed py-0.5 text-neutral-400">
              {Array.from({ length: LINE_COUNT }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>

            {/* Code + cursor */}
            <div className="relative w-full">
              <pre
                className="whitespace-pre-wrap font-medium text-neutral-700"
                dangerouslySetInnerHTML={{ __html: highlightSyntax(typedText) }}
              />
              <span
                className={`inline-block w-1.5 h-4 md:h-5 bg-neutral-500 align-middle ml-0.5 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
