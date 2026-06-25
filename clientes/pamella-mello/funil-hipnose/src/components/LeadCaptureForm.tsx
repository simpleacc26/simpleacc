import { useState } from "react";
import { Lock } from "lucide-react";
import { COLORS, accentSoft, displayHeading } from "../theme";
import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";

export interface LeadData {
  name: string;
  phone: string;
  email: string;
}

interface LeadCaptureFormProps {
  totalSteps: number;
  onSubmit: (data: LeadData) => void;
  onBack: () => void;
}

const inputBaseStyle: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.05)",
};

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function isValidEmail(value: string): boolean {
  if (!value || value.trim() === "") return true; // e-mail é opcional
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string): boolean {
  if (!value || value.trim() === "") return false;
  return value.replace(/\D/g, "").length === 11;
}

function isValidName(value: string): boolean {
  return Boolean(value && value.trim().length >= 3);
}

export function LeadCaptureForm({ totalSteps, onSubmit, onBack }: LeadCaptureFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const canContinue = isValidName(name) && isValidPhone(phone) && isValidEmail(email);

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(event.target.value));
  };

  const handleSubmit = (event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    if (!isValidName(name)) {
      alert("Por favor, preencha seu nome (mínimo 3 caracteres)");
      return;
    }
    if (!isValidPhone(phone)) {
      alert("Por favor, preencha um WhatsApp válido com DDD (11 dígitos)");
      return;
    }
    if (!isValidEmail(email)) {
      alert("O e-mail informado parece inválido");
      return;
    }
    onSubmit({ name: name.trim(), phone, email: email.trim() });
  };

  const borderFor = (valid: boolean, touched: boolean) =>
    touched && !valid ? "rgba(255, 100, 100, 0.5)" : accentSoft(0.3);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <ProgressBar current={totalSteps} total={totalSteps} />
          <div className="mt-3 text-sm" style={{ color: accentSoft(0.8) }}>
            Quase lá...
          </div>
        </div>

        <div className="rounded-3xl p-8 sm:p-10 shadow-xl" style={{ backgroundColor: COLORS.card }}>
          <h2 className="mb-3" style={{ ...displayHeading, fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}>
            Sua leitura personalizada está pronta.
          </h2>
          <p className="mb-8 text-lg" style={{ color: COLORS.textBody }}>
            Deixe seus dados para receber o resultado e, se fizer sentido,
            conversar com nossa equipe sobre o próximo passo.
          </p>

          <div className="flex flex-col gap-5">
            <div>
              <label className="block mb-2 text-white">
                Nome <span style={{ color: COLORS.accent }}>*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                minLength={3}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors text-white"
                style={{ ...inputBaseStyle, borderColor: borderFor(isValidName(name), Boolean(name)) }}
                onFocus={(event) => (event.target.style.borderColor = COLORS.accent)}
                onBlur={(event) =>
                  (event.target.style.borderColor = borderFor(isValidName(name), Boolean(name)))
                }
                placeholder="Como você gostaria de ser chamado(a)"
              />
              {name && !isValidName(name) && (
                <p className="mt-1 text-sm" style={{ color: COLORS.error }}>
                  Digite seu nome (mínimo 3 caracteres)
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-white">
                WhatsApp com DDD <span style={{ color: COLORS.accent }}>*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={15}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors text-white"
                style={{ ...inputBaseStyle, borderColor: borderFor(isValidPhone(phone), Boolean(phone)) }}
                onFocus={(event) => (event.target.style.borderColor = COLORS.accent)}
                onBlur={(event) =>
                  (event.target.style.borderColor = borderFor(isValidPhone(phone), Boolean(phone)))
                }
                placeholder="(31) 99999-9999"
              />
              {phone && !isValidPhone(phone) && (
                <p className="mt-1 text-sm" style={{ color: COLORS.error }}>
                  Digite um WhatsApp válido com DDD (11 dígitos)
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-white">E-mail (opcional)</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors text-white"
                style={{ ...inputBaseStyle, borderColor: borderFor(isValidEmail(email), Boolean(email)) }}
                onFocus={(event) => (event.target.style.borderColor = COLORS.accent)}
                onBlur={(event) =>
                  (event.target.style.borderColor = borderFor(isValidEmail(email), Boolean(email)))
                }
                placeholder="seuemail@exemplo.com"
              />
              {email && !isValidEmail(email) && (
                <p className="mt-1 text-sm" style={{ color: COLORS.error }}>
                  Digite um e-mail válido
                </p>
              )}
            </div>
          </div>

          <div
            className="mt-6 flex items-start gap-2 text-sm"
            style={{ color: COLORS.textMuted }}
          >
            <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: COLORS.accent }} />
            <p>
              Seus dados são confidenciais e usados apenas para o seu
              atendimento. Nada de spam.
            </p>
          </div>

          <NavigationButtons
            onBack={onBack}
            onContinue={handleSubmit}
            canContinue={canContinue}
            continueText={canContinue ? "Ver minha leitura personalizada" : "Preencha nome e WhatsApp"}
          />
        </div>
      </div>
    </div>
  );
}
