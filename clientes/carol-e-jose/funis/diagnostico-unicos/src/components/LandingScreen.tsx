import { questions, TOTAL_PERGUNTAS } from "../data/questions";
import { Brand } from "./Brand";
import { OptionButton } from "./Option";

// TELA 1 — capa + primeira pergunta na mesma tela (regra de conversão da casa).
export function LandingScreen({ onSelect }: { onSelect: (value: string) => void }) {
  const q = questions[0];
  return (
    <div className="screen">
      <div className="wrap"><Brand /></div>
      <div className="wrap screen-body">
        <span className="label">DIAGNÓSTICO DE MATURIDADE DO NEGÓCIO</span>
        <h1 className="q-title" style={{ fontSize: 27, marginTop: 8 }}>
          Você enxerga as oportunidades e não consegue aproveitar quase nenhuma?
        </h1>
        <p className="q-support">
          Descubra em que estágio o seu negócio está e o que falta para subir o degrau.
          {" "}{TOTAL_PERGUNTAS} perguntas, dois minutos. No final você recebe a leitura do estágio do seu
          negócio e o que precisa mudar para a empresa andar sem depender da sua presença.
        </p>

        <div style={{ marginTop: 26 }}>
          <span className="label">{q.category}</span>
          <h2 className="q-title" style={{ fontSize: 21 }}>{q.question}</h2>
          <div className="options">
            {q.options.map((o) => (
              <OptionButton key={o.value} option={o} selected={false} onSelect={onSelect} />
            ))}
          </div>
          {q.footer && <p className="q-footer">{q.footer}</p>}
        </div>
      </div>
    </div>
  );
}
