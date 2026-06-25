// Paleta do funil da Pâmella Mello — clínica de hipnoterapia + neurociência.
// Tom acolhedor e premium: índigo profundo (calma/mente) + âmbar quente
// (cuidado/segurança). PROVISÓRIA — ajustar quando vier o brand kit da clínica.
export const COLORS = {
  bg: "#191427", // fundo geral (índigo noturno)
  card: "#241C3C", // cartões
  accent: "#E1B07E", // âmbar quente (títulos, CTAs)
  textHigh: "rgba(255, 255, 255, 0.92)",
  textBody: "rgba(255, 255, 255, 0.82)",
  textMuted: "rgba(255, 255, 255, 0.6)",
  error: "rgba(255, 130, 130, 0.85)",
} as const;

export const accentSoft = (alpha: number) => `rgba(225, 176, 126, ${alpha})`;

export const displayHeading: React.CSSProperties = {
  fontFamily: "Fraunces, Georgia, serif",
  fontWeight: 500,
  letterSpacing: "-0.01em",
  color: COLORS.accent,
  lineHeight: 1.2,
};
