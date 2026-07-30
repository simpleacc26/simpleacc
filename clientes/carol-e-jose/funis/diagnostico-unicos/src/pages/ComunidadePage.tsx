import { useEffect } from "react";
import "../styles/pos.css";
import { config } from "../config";
import { track } from "../lib/analytics";
import { getUtm } from "../lib/session";

// Desqualificados (papel não-dono OU faturamento abaixo do piso).
// Sem formulário (contagem anônima já disparada). Caminho próprio: comunidade / Jornada 1.
export function ComunidadePage() {
  const motivo = new URLSearchParams(window.location.search).get("motivo") || "";

  useEffect(() => {
    track.resultado({ pagina: "comunidade", motivo, ...getUtm() });
  }, [motivo]);

  const onClick = () => track.comunidadeClick({ motivo, ...getUtm() });

  const href = config.comunidadeUrl.startsWith("PREENCHER")
    ? (config.whatsapp.startsWith("PREENCHER") ? "#comunidade" : `https://wa.me/${config.whatsapp}`)
    : config.comunidadeUrl;

  return (
    <div className="pos">
      <header className="hero" style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div className="container">
          <span className="label">ÚNICOS · CONTEÚDO PARA QUEM LIDERA</span>
          <h1>Tem material feito para o seu momento.</h1>
          <p>
            A sessão estratégica é individual e desenhada para o dono ou sócio que decide os rumos de uma empresa já
            estruturada. Pelo que você respondeu, faz mais sentido começar por outro caminho, com o mesmo método e a
            mesma leitura, no ritmo certo para você.
          </p>
          <p style={{ color: "#fff", fontWeight: 600 }}>
            Entre para a nossa comunidade e receba os conteúdos que preparam a próxima fase do seu negócio.
          </p>
          <div className="cta-wrap">
            <a className="cta" href={href} onClick={onClick} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              Quero acessar os conteúdos
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
