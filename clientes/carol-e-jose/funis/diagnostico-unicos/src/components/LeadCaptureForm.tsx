import { useState } from "react";
import { Brand } from "./Brand";
import type { LeadData } from "../lib/leads";

interface Props {
  onSubmit: (data: LeadData) => void;
  onBack: () => void;
  submitting: boolean;
}

function maskPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function LeadCaptureForm({ onSubmit, onBack, submitting }: Props) {
  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telComercial, setTelComercial] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});

  const submit = () => {
    const e: Record<string, string> = {};
    if (nome.trim().length < 3) e.nome = "Informe seu nome completo.";
    if (empresa.trim().length < 2) e.empresa = "Informe o nome da empresa.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "E-mail inválido.";
    if (whatsapp.replace(/\D/g, "").length !== 11) e.whatsapp = "WhatsApp com DDD (11 dígitos).";
    setErr(e);
    if (Object.keys(e).length) return;
    onSubmit({
      nome: nome.trim(),
      empresa: empresa.trim(),
      email: email.trim(),
      whatsapp: whatsapp.replace(/\D/g, ""),
      telefoneComercial: telComercial.replace(/\D/g, "") || undefined,
    });
  };

  return (
    <div className="screen">
      <div className="wrap"><Brand /></div>
      <div className="wrap screen-body">
        <span className="label">SEU RESULTADO</span>
        <h1 className="q-title">Estágio 2: No Limite</h1>
        <p className="q-support">
          Preencha os dados abaixo para receber a análise completa do seu estágio no WhatsApp,
          com o que precisa mudar para você construir o futuro do seu negócio.
        </p>

        <div style={{ marginTop: 20 }}>
          <div className="field">
            <label htmlFor="nome">Nome completo</label>
            <input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite seu nome completo" />
            {err.nome && <span className="err">{err.nome}</span>}
          </div>
          <div className="field">
            <label htmlFor="empresa">Nome da empresa</label>
            <input id="empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Razão social ou nome fantasia" />
            {err.empresa && <span className="err">{err.empresa}</span>}
          </div>
          <div className="field">
            <label htmlFor="email">E-mail corporativo</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seunome@suaempresa.com.br" />
            {err.email && <span className="err">{err.email}</span>}
          </div>
          <div className="field">
            <label htmlFor="whatsapp">WhatsApp</label>
            <input id="whatsapp" inputMode="numeric" value={whatsapp} onChange={(e) => setWhatsapp(maskPhone(e.target.value))} placeholder="(51) 99999-9999" />
            <span className="hint">A sua análise é enviada pelo WhatsApp. Use um número válido.</span>
            {err.whatsapp && <span className="err">{err.whatsapp}</span>}
          </div>
          <div className="field">
            <label htmlFor="tel">Telefone comercial (opcional)</label>
            <input id="tel" inputMode="numeric" value={telComercial} onChange={(e) => setTelComercial(maskPhone(e.target.value))} placeholder="(51) 3333-3333" />
          </div>

          <div className="notice">
            A sua análise é enviada pelo WhatsApp. Responda a mensagem automática que você irá receber
            para confirmar que é um número válido.
          </div>

          <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={submit} disabled={submitting} type="button">
            {submitting ? "Enviando..." : "Receber minha análise"}
          </button>
          <p className="privacy">Seus dados são usados apenas para enviar a análise. Não compartilhamos com terceiros.</p>

          <div className="nav-row">
            <button className="btn btn-ghost" onClick={onBack} type="button">← Voltar</button>
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
