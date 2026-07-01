import { useState } from "react";
import { Lock } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { NavigationButtons } from "./NavigationButtons";
import { LogoUnicos } from "./LogoUnicos";

export interface LeadData {
  name: string;
  phone: string;
  email: string;
  company?: string;
}

interface LeadCaptureFormProps {
  onSubmit: (data: LeadData) => void;
  onBack: () => void;
  loading?: boolean;
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isValidPhone(v: string) {
  return v.replace(/\D/g, "").length === 11;
}
function isValidName(v: string) {
  return v.trim().length >= 3;
}

const INPUT_BASE: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "12px",
  border: "2px solid rgba(22,49,79,0.15)",
  backgroundColor: "#faf8f4",
  color: "#16314f",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s",
};

function Field({
  label,
  children,
  error,
  optional,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  optional?: boolean;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.85rem",
          fontWeight: 500,
          color: "rgba(22,49,79,0.75)",
          marginBottom: "6px",
        }}
      >
        {label} {!optional && <span style={{ color: "#a9802f" }}>*</span>}
      </label>
      {children}
      {error && (
        <p
          style={{
            marginTop: "4px",
            fontSize: "0.78rem",
            color: "#c0392b",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function LeadCaptureForm({ onSubmit, onBack, loading }: LeadCaptureFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [touched, setTouched] = useState({ name: false, phone: false, email: false, company: false });

  const valid = {
    name: isValidName(name),
    phone: isValidPhone(phone),
    email: isValidEmail(email),
    company: company.trim().length >= 3,
  };
  const canSubmit = valid.name && valid.phone && valid.email && valid.company;

  const handleSubmit = () => {
    setTouched({ name: true, phone: true, email: true, company: true });
    if (!canSubmit) return;
    onSubmit({ name: name.trim(), phone, email: email.trim(), company: company.trim() });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-5 pb-12"
      style={{ backgroundColor: "#faf8f4" }}
    >
      <div
        className="w-full flex justify-center pt-6 pb-5"
        style={{ borderBottom: "1px solid rgba(169,128,47,0.15)" }}
      >
        <LogoUnicos size="sm" />
      </div>

      <div className="max-w-xl w-full mt-6">
        <div className="mb-6">
          <ProgressBar current={7} total={7} />
          <div
            className="mt-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              color: "#a9802f",
              fontWeight: 500,
            }}
          >
            Quase lá, última etapa
          </div>
        </div>

        <div
          className="rounded-2xl p-7"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid rgba(169,128,47,0.15)",
            boxShadow: "0 4px 24px rgba(22,49,79,0.08)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.55rem",
              fontWeight: 700,
              color: "#16314f",
              lineHeight: 1.25,
              marginBottom: "8px",
            }}
          >
            Seu diagnóstico está sendo gerado.
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              color: "rgba(22,49,79,0.55)",
              marginBottom: "24px",
              lineHeight: 1.55,
            }}
          >
            Preencha seus dados para receber a análise completa e agendar sua
            sessão estratégica.
          </p>

          <div className="flex flex-col gap-5">
            <Field
              label="Nome completo"
              error={touched.name && !valid.name ? "Nome deve ter ao menos 3 caracteres" : undefined}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                placeholder="Digite seu nome completo"
                style={{
                  ...INPUT_BASE,
                  borderColor:
                    touched.name && !valid.name
                      ? "rgba(192,57,43,0.5)"
                      : "rgba(22,49,79,0.15)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#a9802f")}
                onBlurCapture={(e) =>
                  (e.target.style.borderColor =
                    touched.name && !valid.name
                      ? "rgba(192,57,43,0.5)"
                      : "rgba(22,49,79,0.15)")
                }
              />
            </Field>

            <Field
              label="WhatsApp com DDD"
              error={
                touched.phone && !valid.phone
                  ? "Informe um número válido com DDD (11 dígitos)"
                  : undefined
              }
            >
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                maxLength={15}
                placeholder="(11) 99999-9999"
                style={{
                  ...INPUT_BASE,
                  borderColor:
                    touched.phone && !valid.phone
                      ? "rgba(192,57,43,0.5)"
                      : "rgba(22,49,79,0.15)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#a9802f")}
                onBlurCapture={(e) =>
                  (e.target.style.borderColor =
                    touched.phone && !valid.phone
                      ? "rgba(192,57,43,0.5)"
                      : "rgba(22,49,79,0.15)")
                }
              />
            </Field>

            <Field
              label="E-mail"
              error={
                touched.email && !valid.email ? "Informe um e-mail válido" : undefined
              }
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                placeholder="seuemail@exemplo.com"
                style={{
                  ...INPUT_BASE,
                  borderColor:
                    touched.email && !valid.email
                      ? "rgba(192,57,43,0.5)"
                      : "rgba(22,49,79,0.15)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#a9802f")}
                onBlurCapture={(e) =>
                  (e.target.style.borderColor =
                    touched.email && !valid.email
                      ? "rgba(192,57,43,0.5)"
                      : "rgba(22,49,79,0.15)")
                }
              />
            </Field>

            <Field
              label="Nome da empresa"
              error={touched.company && !valid.company ? "Nome da empresa deve ter ao menos 3 caracteres" : undefined}
            >
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, company: true }))}
                placeholder="Razão social ou nome fantasia"
                style={{
                  ...INPUT_BASE,
                  borderColor: touched.company && !valid.company ? "rgba(192,57,43,0.5)" : "rgba(22,49,79,0.15)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#a9802f")}
                onBlurCapture={(e) =>
                  (e.target.style.borderColor =
                    touched.company && !valid.company ? "rgba(192,57,43,0.5)" : "rgba(22,49,79,0.15)")
                }
              />
            </Field>
          </div>

          <div
            className="flex items-start gap-2 mt-5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(22,49,79,0.4)",
            }}
          >
            <Lock
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              style={{ color: "#a9802f" }}
            />
            <span>
              Seus dados são usados apenas para enviar o diagnóstico. Não
              compartilhamos com terceiros.
            </span>
          </div>

          <NavigationButtons
            onBack={onBack}
            onContinue={handleSubmit}
            canContinue={canSubmit}
            continueText={loading ? "Enviando..." : "Receber meu Diagnóstico"}
            showContinue
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
