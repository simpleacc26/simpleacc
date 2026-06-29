interface LogoUnicosProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Logo ÚNICOS Leadership Club em versão clara (para fundo navy).
 * Recria tipograficamente o wordmark: "ÚNICOS" em serif display + estrela de 4 pontas dourada + "Leadership Club".
 * Troque por <img src="/logo-unicos-white.png" /> quando o arquivo PNG real estiver disponível.
 */
export function LogoUnicos({ className = "", size = "md" }: LogoUnicosProps) {
  const cfg = {
    sm: { font: "1.35rem", sub: "0.58rem", starW: 11, starH: 11, gap: 2, spacing: "0.18em" },
    md: { font: "1.8rem",  sub: "0.73rem", starW: 14, starH: 14, gap: 3, spacing: "0.22em" },
    lg: { font: "2.5rem",  sub: "0.92rem", starW: 18, starH: 18, gap: 4, spacing: "0.24em" },
  }[size];

  return (
    <div
      className={`inline-flex flex-col items-center select-none ${className}`}
      style={{ userSelect: "none" }}
    >
      {/* "ÚNICOS" + estrela */}
      <div className="flex items-start" style={{ gap: "3px" }}>
        <span
          style={{
            fontFamily: "'Playfair Display', 'Times New Roman', Georgia, serif",
            fontSize: cfg.font,
            fontWeight: 700,
            color: "#f3eee2",
            letterSpacing: "0.04em",
            lineHeight: 1,
          }}
        >
          ÚNICOS
        </span>
        {/* Estrela de 4 pontas — idêntica ao logotipo original */}
        <svg
          width={cfg.starW}
          height={cfg.starH}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: "1px", flexShrink: 0 }}
          aria-hidden
        >
          {/* Forma de diamante com 4 pontas curvas — aproximação da estrela do logo */}
          <path
            d="M10 0.5 C10 0.5 11.5 7.5 19.5 10 C11.5 12.5 10 19.5 10 19.5 C10 19.5 8.5 12.5 0.5 10 C8.5 7.5 10 0.5 10 0.5Z"
            fill="#c96b1a"
          />
        </svg>
      </div>

      {/* "Leadership Club" */}
      <span
        style={{
          fontFamily: "'Playfair Display', 'Times New Roman', Georgia, serif",
          fontSize: cfg.sub,
          fontWeight: 400,
          fontStyle: "italic",
          color: "rgba(243,238,226,0.55)",
          letterSpacing: cfg.spacing,
          marginTop: `${cfg.gap}px`,
        }}
      >
        Leadership Club
      </span>
    </div>
  );
}
