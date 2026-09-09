import { useState } from "react";
import { Lock } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";

export interface LeadData {
  name: string;
  phone: string;
  email: string;
}

interface LeadCaptureFormProps {
  onSubmit: (data: LeadData) => void;
  onBack: () => void;
}

const inputBase: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.05)",
};

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function isValidEmail(value: string): boolean {
  if (!value || value.trim() === "") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  if (!value || value.trim() === "") return false;
  return value.replace(/\D/g, "").length === 11;
}

function isValidName(value: string): boolean {
  return Boolean(value && value.trim().length >= 3);
}

export function LeadCaptureForm({ onSubmit, onBack }: LeadCaptureFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const canContinue =
    isValidName(name) && isValidPhone(phone) && isValidEmail(email);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(event.target.value));
  };

  const handleSubmit = (event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    if (!isValidName(name)) {
      alert("Por favor, preencha seu nome completo (mínimo 3 caracteres)");
      return;
    }
    if (!isValidPhone(phone)) {
      alert("Por favor, preencha um WhatsApp válido com DDD (11 dígitos)");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Por favor, preencha um e-mail válido");
      return;
    }
    if (canContinue) {
      onSubmit({ name: name.trim(), phone, email: email.trim() });
    }
  };

  const borderFor = (valid: boolean, touched: boolean) =>
    touched && !valid ? "rgba(255, 100, 100, 0.5)" : "rgba(200, 123, 117, 0.3)";

  const TOTAL_QUESTIONS = 9;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5"
      style={{ backgroundColor: "#1A0900" }}
    >
      <div className="max-w-xl w-full">
        <div className="mb-6">
          <ProgressBar current={TOTAL_QUESTIONS} total={TOTAL_QUESTIONS} />
          <div
            className="mt-2 text-sm"
            style={{ color: "rgba(200, 123, 117, 0.7)" }}
          >
            Quase lá...
          </div>
        </div>

        <div
          className="rounded-3xl p-8 md:p-10 shadow-2xl"
          style={{ backgroundColor: "#2D1108" }}
        >
          <h2
            className="mb-2"
            style={{
              fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
              fontWeight: 600,
              lineHeight: 1.3,
              color: "#FBF1EE",
              fontFamily: "Lora, Georgia, serif",
            }}
          >
            Seu diagnóstico está pronto.
          </h2>
          <p
            className="mb-8"
            style={{ color: "rgba(251, 241, 238, 0.7)", fontSize: "0.95rem" }}
          >
            Informe seus dados para receber a análise personalizada.
          </p>

          <div className="flex flex-col gap-5">
            {/* Nome */}
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: "#FBF1EE" }}>
                Nome completo <span style={{ color: "#C87B75" }}>*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={3}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors text-white"
                style={{
                  ...inputBase,
                  borderColor: borderFor(isValidName(name), Boolean(name)),
                  color: "#FBF1EE",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C87B75")}
                onBlur={(e) =>
                  (e.target.style.borderColor = borderFor(isValidName(name), Boolean(name)))
                }
                placeholder="Digite seu nome completo"
              />
              {name && !isValidName(name) && (
                <p className="mt-1 text-xs" style={{ color: "rgba(255, 100, 100, 0.8)" }}>
                  Nome muito curto (mínimo 3 caracteres)
                </p>
              )}
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: "#FBF1EE" }}>
                WhatsApp com DDD <span style={{ color: "#C87B75" }}>*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={15}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors"
                style={{
                  ...inputBase,
                  borderColor: borderFor(isValidPhone(phone), Boolean(phone)),
                  color: "#FBF1EE",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C87B75")}
                onBlur={(e) =>
                  (e.target.style.borderColor = borderFor(isValidPhone(phone), Boolean(phone)))
                }
                placeholder="(11) 99999-9999"
              />
              {phone && !isValidPhone(phone) && (
                <p className="mt-1 text-xs" style={{ color: "rgba(255, 100, 100, 0.8)" }}>
                  Digite um número válido com DDD (11 dígitos)
                </p>
              )}
            </div>

            {/* E-mail */}
            <div>
              <label className="block mb-2 text-sm font-medium" style={{ color: "#FBF1EE" }}>
                E-mail <span style={{ color: "#C87B75" }}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors"
                style={{
                  ...inputBase,
                  borderColor: borderFor(isValidEmail(email), Boolean(email)),
                  color: "#FBF1EE",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C87B75")}
                onBlur={(e) =>
                  (e.target.style.borderColor = borderFor(isValidEmail(email), Boolean(email)))
                }
                placeholder="seuemail@exemplo.com"
              />
              {email && !isValidEmail(email) && (
                <p className="mt-1 text-xs" style={{ color: "rgba(255, 100, 100, 0.8)" }}>
                  Digite um e-mail válido
                </p>
              )}
            </div>
          </div>

          <div
            className="mt-5 flex items-start gap-2 text-xs"
            style={{ color: "rgba(251, 241, 238, 0.5)" }}
          >
            <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#C87B75" }} />
            <p>Seus dados são confidenciais e usados apenas para enviar o diagnóstico.</p>
          </div>

          <NavigationButtons
            onBack={onBack}
            onContinue={handleSubmit}
            canContinue={canContinue}
            continueText={canContinue ? "Ver meu diagnóstico" : "Preencha todos os campos"}
          />
        </div>
      </div>
    </div>
  );
}
