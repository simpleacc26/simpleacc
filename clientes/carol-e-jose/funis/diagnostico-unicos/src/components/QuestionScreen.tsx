import { useEffect, useState } from "react";
import type { Question } from "../data/questions";
import { Brand } from "./Brand";
import { Progress } from "./Progress";
import { OptionButton } from "./Option";

interface Props {
  question: Question;
  index: number;      // 1-based
  total: number;
  answer?: string;
  secondAnswer?: string;
  otherText?: string;
  onAnswer: (value: string, secondValue?: string, other?: string) => void;
  onBack: () => void;
  canGoBack: boolean;
}

export function QuestionScreen({
  question, index, total, answer, secondAnswer, otherText, onAnswer, onBack, canGoBack,
}: Props) {
  const [sel, setSel] = useState<string | undefined>(answer);
  const [sel2, setSel2] = useState<string | undefined>(secondAnswer);
  const [other, setOther] = useState<string>(otherText || "");

  useEffect(() => {
    setSel(answer); setSel2(secondAnswer); setOther(otherText || "");
  }, [question.id, answer, secondAnswer, otherText]);

  const isDouble = !!question.secondPart;
  const needsOther = question.allowOther && sel === "outro";
  const ready =
    !!sel &&
    (!isDouble || !!sel2) &&
    (!needsOther || other.trim().length > 1);

  // Auto-avanço só quando a tela tem uma única seleção e não exige campo aberto.
  const handleSingle = (v: string) => {
    setSel(v);
    if (!isDouble && !(question.allowOther && v === "outro")) {
      onAnswer(v);
    }
  };

  const advance = () => {
    if (!ready) return;
    onAnswer(sel!, isDouble ? sel2 : undefined, needsOther ? other.trim() : undefined);
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
            <OptionButton key={o.value} option={o} selected={sel === o.value} onSelect={handleSingle} />
          ))}
        </div>

        {needsOther && (
          <div className="field" style={{ marginTop: 12 }}>
            <label htmlFor="outro">Qual?</label>
            <input id="outro" value={other} onChange={(e) => setOther(e.target.value)} placeholder="Digite o setor" />
          </div>
        )}

        {isDouble && question.secondPart && (
          <div style={{ marginTop: 26 }}>
            <h2 className="q-title" style={{ fontSize: 20 }}>{question.secondPart.question}</h2>
            <div className="options">
              {question.secondPart.options.map((o) => (
                <OptionButton key={o.value} option={o} selected={sel2 === o.value} onSelect={setSel2} />
              ))}
            </div>
          </div>
        )}

        {question.footer && <p className="q-footer">{question.footer}</p>}

        <div className="nav-row">
          {canGoBack ? (
            <button className="btn btn-ghost" onClick={onBack} type="button">← Voltar</button>
          ) : <span />}
          {(isDouble || needsOther) && (
            <button className="btn btn-primary" onClick={advance} disabled={!ready} type="button"
              style={{ opacity: ready ? 1 : 0.5 }}>
              Continuar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
