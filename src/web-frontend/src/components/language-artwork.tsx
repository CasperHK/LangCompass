import type { LanguageCategory } from "@/lib/languages";

const categoryHues: Record<LanguageCategory, number> = {
  "系統與效能": 26,
  "Web 與全端": 205,
  "資料科學與 AI": 278,
  "雲端與分散式": 185,
  "晶片設計": 165,
  "應用程式與行動": 238,
  "遊戲與互動": 340,
  "資料庫與查詢": 145,
};

function hashString(value: string) {
  return [...value].reduce((hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0, 7);
}

export function LanguageArtwork({
  slug,
  category,
}: {
  slug: string;
  category: LanguageCategory;
}) {
  const seed = hashString(slug);
  const hue = (categoryHues[category] + (seed % 55) - 27 + 360) % 360;
  const centerX = 180 + (seed % 140);
  const centerY = 100 + ((seed >>> 7) % 100);
  const nodes = Array.from({ length: 7 }, (_, index) => {
    const value = (seed * (index + 11) + index * 7919) >>> 0;
    return {
      x: 24 + (value % 450),
      y: 18 + ((value >>> 8) % 275),
      radius: 2 + (value % 5),
    };
  });
  const slugId = slug.replace(/[^a-z0-9-]/g, "");
  const nodePath = nodes.map((node, index) => `${index === 0 ? "M" : "L"}${node.x} ${node.y}`).join(" ");
  const accent = `hsl(${(hue + 36) % 360} 88% 68%)`;
  const motifTransform = `translate(${centerX + 95} ${centerY})`;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-55"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 500 320"
    >
      <defs>
        <linearGradient id={`language-gradient-${slugId}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 76% 57% / 0.48)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 62) % 360} 78% 58% / 0.12)`} />
        </linearGradient>
        <pattern
          height="34"
          id={`language-grid-${slugId}`}
          patternUnits="userSpaceOnUse"
          width="34"
        >
          <path
            d="M 34 0 L 0 0 0 34"
            fill="none"
            stroke={`hsl(${hue} 75% 78% / 0.16)`}
            strokeWidth="0.7"
          />
        </pattern>
      </defs>
      <rect fill={`url(#language-gradient-${slugId})`} height="320" width="500" />
      <rect fill={`url(#language-grid-${slugId})`} height="320" width="500" />
      <circle
        className="animate-pulse motion-reduce:animate-none"
        cx={centerX}
        cy={centerY}
        fill={`hsl(${(hue + 35) % 360} 80% 65% / 0.18)`}
        r={48 + (seed % 38)}
      />
      {slug === "rust" ? (
        <g
          className="origin-center animate-[spin_32s_linear_infinite] motion-reduce:animate-none"
          style={{ transformBox: "fill-box", transformOrigin: motifTransform }}
          transform={`translate(${centerX + 95} ${centerY})`}
        >
          <path
            d="M-8-62h16l4 15 11 5 13-7 12 12-7 13 5 11 15 4v16l-15 4-5 11 7 13-12 12-13-7-11 5-4 15H-8l-4-15-11-5-13 7-12-12 7-13-5-11-15-4v-16l15-4 5-11-7-13 12-12 13 7 11-5z"
            fill={`url(#language-gradient-${slugId})`}
            stroke={accent}
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <circle r="27" fill="#020617" stroke={accent} strokeWidth="2" />
          <circle r="12" fill="none" stroke={accent} strokeWidth="3" />
        </g>
      ) : slug === "go" ? (
        <g
          className="animate-[float_5s_ease-in-out_infinite] motion-reduce:animate-none"
          transform={`translate(${centerX + 95} ${centerY - 5})`}
        >
          <ellipse cx="0" cy="3" rx="49" ry="43" fill={accent} opacity=".16" />
          <path
            d="M-25-24Q-36-54-16-47L0-33Q16-51 28-37L23-20Q42-10 38 14Q34 42 3 43Q-31 45-39 19Q-46-5-25-24Z"
            fill={`hsl(${(hue + 28) % 360} 66% 64%)`}
            stroke={`hsl(${(hue + 45) % 360} 75% 88%)`}
            strokeWidth="2"
          />
          <ellipse cx="-11" cy="-6" rx="5" ry="7" fill="#0f172a" />
          <ellipse cx="12" cy="-6" rx="5" ry="7" fill="#0f172a" />
          <path
            d="M-8 9Q0 16 9 8M-31 5l-12-3m48 4 12-4"
            fill="none"
            stroke="#0f172a"
            strokeLinecap="round"
            strokeWidth="3"
          />
          <circle cx="-11" cy="-8" r="1.5" fill="white" />
          <circle cx="12" cy="-8" r="1.5" fill="white" />
        </g>
      ) : slug === "python" ? (
        <g
          className="origin-center animate-[spin_48s_linear_infinite] motion-reduce:animate-none"
          style={{ transformBox: "fill-box", transformOrigin: motifTransform }}
          transform={`translate(${centerX + 95} ${centerY})`}
        >
          <path
            d="M-38-25Q-38-43-15-43H13Q32-43 32-24V1H-10Q-38 1-38-25Z"
            fill={`hsl(${(hue + 65) % 360} 75% 62%)`}
            opacity=".9"
          />
          <path
            d="M38 25Q38 43 15 43H-13Q-32 43-32 24V-1H10Q38-1 38 25Z"
            fill={`hsl(${(hue + 205) % 360} 75% 68%)`}
            opacity=".9"
          />
          <circle cx="-13" cy="-29" r="3" fill="white" />
          <circle cx="13" cy="29" r="3" fill="white" />
        </g>
      ) : category === "晶片設計" ? (
        <g
          className="animate-[float_6s_ease-in-out_infinite] motion-reduce:animate-none"
          transform={`translate(${centerX + 95} ${centerY})`}
          fill="none"
          stroke={accent}
          strokeWidth="2"
        >
          <path d="M-28-28h56v56h-56zM-42-16h14m-14 16h14m-14 16h14m56-32h14m-14 16h14m-14 16h14M-16-42v14m16-14v14m16-14v14m-32 56v14m16-14v14m16-14v14" />
          <path d="M-12-12h24v24h-24zM-8 0h16M0-8v16" opacity=".8" />
        </g>
      ) : category === "資料科學與 AI" ? (
        <g
          className="animate-[float_7s_ease-in-out_infinite] motion-reduce:animate-none"
          transform={`translate(${centerX + 95} ${centerY})`}
          fill="none"
          stroke={accent}
          strokeWidth="2"
        >
          <circle r="10" fill={accent} fillOpacity=".25" />
          <ellipse rx="48" ry="18" />
          <ellipse rx="48" ry="18" transform="rotate(60)" />
          <ellipse rx="48" ry="18" transform="rotate(120)" />
          <circle cx="48" r="4" fill="white" />
          <circle cy="-48" r="4" fill="white" />
        </g>
      ) : category === "遊戲與互動" ? (
        <g
          className="animate-[float_5.5s_ease-in-out_infinite] motion-reduce:animate-none"
          transform={`translate(${centerX + 95} ${centerY})`}
          fill="none"
          stroke={accent}
          strokeWidth="2"
        >
          <path d="M-39-22Q-42-34-29-34h58q13 0 10 12l-8 43q-3 15-15 4L5 12h-10l-11 13q-12 11-15-4z" />
          <path d="M-20-18v16m-8-8h16m27-4h.1m9 10h.1" strokeLinecap="round" strokeWidth="5" />
        </g>
      ) : category === "應用程式與行動" ? (
        <g
          className="animate-[float_6.5s_ease-in-out_infinite] motion-reduce:animate-none"
          transform={`translate(${centerX + 95} ${centerY})`}
          fill="none"
          stroke={accent}
          strokeWidth="2"
        >
          <rect x="-29" y="-48" width="58" height="96" rx="12" />
          <path d="M-12-36h24m-20 68h16" strokeLinecap="round" />
          <circle cy="17" r="18" fill={accent} fillOpacity=".15" />
        </g>
      ) : category === "資料庫與查詢" ? (
        <g
          className="animate-[float_5.8s_ease-in-out_infinite] motion-reduce:animate-none"
          transform={`translate(${centerX + 95} ${centerY})`}
          fill="none"
          stroke={accent}
          strokeWidth="2"
        >
          <ellipse cy="-28" rx="36" ry="13" />
          <path d="M-36-28v56c0 8 16 14 36 14s36-6 36-14v-56M-36 0c0 8 16 14 36 14S36 8 36 0" />
        </g>
      ) : category === "Web 與全端" ? (
        <g
          className="animate-[float_6s_ease-in-out_infinite] motion-reduce:animate-none"
          transform={`translate(${centerX + 95} ${centerY})`}
          fill="none"
          stroke={accent}
          strokeWidth="2"
        >
          <rect x="-43" y="-32" width="86" height="64" rx="8" />
          <path d="M-43-14h86M-29-24h.1m10 0h.1m10 0h.1M-15 2l-10 8 10 8m30-16 10 8-10 8m-5-20-10 24" strokeLinecap="round" />
        </g>
      ) : category === "系統與效能" ? (
        <g
          className="animate-[float_5.2s_ease-in-out_infinite] motion-reduce:animate-none"
          transform={`translate(${centerX + 95} ${centerY})`}
          fill="none"
          stroke={accent}
          strokeWidth="2"
        >
          <path d="M-42 28 0-35 42 28z" />
          <path d="M-22 8h44M-12-7h24M-2-22h4M0-35v63" opacity=".8" />
          <circle r="6" fill={accent} />
        </g>
      ) : (
        <g transform={`translate(${centerX + 95} ${centerY})`} fill="none" stroke={accent} strokeWidth="2">
          <circle r="35" />
          <path d="M-35 0h70M0-35v70M-25-25l50 50m0-50-50 50" />
        </g>
      )}
      <g
        className="origin-center animate-[spin_44s_linear_infinite] motion-reduce:animate-none"
        style={{ transformBox: "fill-box" }}
      >
        <ellipse
          cx="250"
          cy="160"
          fill="none"
          rx={110 + (seed % 70)}
          ry={54 + ((seed >>> 4) % 45)}
          stroke={`hsl(${hue} 82% 76% / 0.42)`}
          strokeDasharray="3 8"
          strokeWidth="1.2"
          transform={`rotate(${seed % 180} 250 160)`}
        />
        <circle
          cx={centerX}
          cy={centerY}
          fill={`hsl(${(hue + 90) % 360} 86% 76% / 0.8)`}
          r="4"
        />
      </g>
      <path
        d={nodePath}
        fill="none"
        stroke={`hsl(${(hue + 110) % 360} 72% 78% / 0.35)`}
        strokeDasharray="2 7"
        strokeWidth="1"
      />
      {nodes.map((node, index) => (
        <circle
          className={index % 2 === 0 ? "animate-pulse motion-reduce:animate-none" : undefined}
          cx={node.x}
          cy={node.y}
          fill={`hsl(${(hue + index * 19) % 360} 83% 75% / 0.78)`}
          key={`${node.x}-${node.y}`}
          r={node.radius}
          style={{ animationDelay: `${index * 170}ms` }}
        />
      ))}
    </svg>
  );
}
