interface LogoUnicosProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LogoUnicos({ className = "", size = "md" }: LogoUnicosProps) {
  const sizes = {
    sm: { main: "1.4rem", sub: "0.65rem", star: 10 },
    md: { main: "1.9rem", sub: "0.8rem", star: 13 },
    lg: { main: "2.6rem", sub: "1rem", star: 16 },
  };
  const s = sizes[size];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="flex items-start gap-0.5">
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: s.main,
            fontWeight: 700,
            color: "#f3eee2",
            letterSpacing: "0.06em",
            lineHeight: 1,
          }}
        >
          ÚNICOS
        </span>
        {/* Estrela de 4 pontas decorativa */}
        <svg
          width={s.star}
          height={s.star}
          viewBox="0 0 16 16"
          fill="none"
          style={{ marginTop: "2px", flexShrink: 0 }}
        >
          <path
            d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z"
            fill="#a9802f"
          />
        </svg>
      </div>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: s.sub,
          fontWeight: 400,
          color: "rgba(243, 238, 226, 0.6)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginTop: "2px",
        }}
      >
        Leadership Club
      </span>
    </div>
  );
}
