import { useEffect, useState } from "react";
import type { Question } from "../data/questions";
import { Brand } from "./Brand";
import { Progress } from "./Progress";
import { OptionButton } from "./Option";

interface Props {
  question: Question;
  index: number;      // número exibido ("Pergunta {index} de {total}")
  total: number;
  answer?: string;
  otherText?: string;
  onAnswer: (value: string, other?: string) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function QuestionScreen({
  question, index, total, answer, otherText, onAnswer, onBack, canGoBack,
}: Props) {
  const [sel, setSel] = useState<string | undefined>(answer);
  const [other, setOther] = useState<string>(otherText || "");

  useEffect(() => {
    setSel(answer); setOther(otherText || "");
  }, [question.id, answer, otherText]);

  const needsOther = question.allowOther && sel === "outro";

  // Uma pergunta por tela: auto-avanço, exceto quando a opção "Outro" exige texto.
  const handleSelect = (v: string) => {
    setSel(v);
    if (question.allowOther && v === "outro") return; // aguarda o campo + Continuar
    onAnswer(v);
  };

  const advance = () => {
    if (!sel) return;
    if (needsOther && other.trim().length < 2) return;
    onAnswer(sel, needsOther ? other.trim() : undefined);
  };

  return (
    <div className="screen">
      <div className="wrap">
        <Brand />
        <Progress current={index} total={total} />
      </div>
      <div className="wrap screen-body">
        <span className="label">{question.category}</span>
        <h1 className="q-title">{question.question}</h1>
        {question.supportText && <p className="q-support">{question.supportText}</p>}

        <div className="options">
          {question.options.map((o) => (
            <OptionButton key={o.value} option={o} selected={sel === o.value} onSelect={handleSelect} />
          ))}
        </div>

        {needsOther && (
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="outro">Qual?</label>
            <input id="outro" value={other} onChange={(e) => setOther(e.target.value)} placeholder="Digite o setor" />
          </div>
        )}

        <div className="nav-row">
          {canGoBack ? (
            <button className="btn btn-ghost" onClick={onBack} type="button">← Voltar</button>
          ) : <span />}
          {needsOther && (
            <button className="btn btn-primary" onClick={advance} type="button">
              Continuar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
