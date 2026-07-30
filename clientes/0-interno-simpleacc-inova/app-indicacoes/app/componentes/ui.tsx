"use client";

import { useEffect, useRef, useState } from "react";

/** Ponto colorido — nunca aparece sozinho, sempre acompanhado do rótulo. */
export function Ponto({ cor }: { cor: string }) {
  return (
    <span
      aria-hidden
      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white"
      style={{ background: cor }}
    />
  );
}

/** Número de destaque do painel. */
export function Numero({
  rotulo,
  valor,
  apoio,
}: {
  rotulo: string;
  valor: string | number;
  apoio?: string;
}) {
  return (
    <div className="cartao">
      <p className="rotulo">{rotulo}</p>
      <p className="mt-1.5 font-serif text-3xl leading-none text-navy">{valor}</p>
      {apoio && <p className="mt-1.5 text-xs text-slate-500">{apoio}</p>}
    </div>
  );
}

export function Barra({ parte, total, cor = "#3E5C8A" }: { parte: number; total: number; cor?: string }) {
  const pct = total > 0 ? Math.round((parte / total) * 100) : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: cor }} />
    </div>
  );
}

/**
 * Campo de texto que salva ao sair (blur) ou com Enter, e não perde o que
 * está sendo digitado quando os dados são recarregados.
 */
export function CampoTexto({
  valor,
  onSalvar,
  placeholder,
  rotulo,
  multilinha,
  className = "",
  rows = 3,
}: {
  valor: string;
  onSalvar: (v: string) => void;
  placeholder?: string;
  /** Descrição do campo para leitores de tela — use quando não houver rótulo visível. */
  rotulo?: string;
  multilinha?: boolean;
  className?: string;
  rows?: number;
}) {
  const [texto, setTexto] = useState(valor);
  const focado = useRef(false);

  useEffect(() => {
    if (!focado.current) setTexto(valor);
  }, [valor]);

  function finalizar() {
    focado.current = false;
    if (texto !== valor) onSalvar(texto);
  }

  const comuns = {
    value: texto,
    placeholder,
    "aria-label": rotulo ?? placeholder,
    onFocus: () => (focado.current = true),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setTexto(e.target.value),
    onBlur: finalizar,
    className: `campo ${className}`,
  };

  if (multilinha) return <textarea {...comuns} rows={rows} />;
  return (
    <input
      {...comuns}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
      }}
    />
  );
}

/**
 * Seletor que muda na hora e só depois confirma com o servidor — em conexão
 * lenta o campo não "volta atrás" na frente de quem está usando.
 */
export function Seletor<T extends string>({
  valor,
  opcoes,
  onMudar,
  descricao,
  className = "",
}: {
  valor: T;
  opcoes: { valor: T; rotulo: string }[];
  onMudar: (v: T) => void;
  /** Descrição para leitores de tela quando não há rótulo visível. */
  descricao?: string;
  className?: string;
}) {
  const [local, setLocal] = useState(valor);
  useEffect(() => setLocal(valor), [valor]);

  return (
    <select
      value={local}
      aria-label={descricao}
      onChange={(e) => {
        const novo = e.target.value as T;
        setLocal(novo);
        onMudar(novo);
      }}
      className={`campo ${className}`}
    >
      {opcoes.map((o) => (
        <option key={o.valor} value={o.valor}>
          {o.rotulo}
        </option>
      ))}
    </select>
  );
}

/** Caixa de marcar com a mesma resposta imediata do Seletor. */
export function Caixa({
  marcado,
  onMudar,
  descricao,
  className = "",
}: {
  marcado: boolean;
  onMudar: (v: boolean) => void;
  descricao?: string;
  className?: string;
}) {
  const [local, setLocal] = useState(marcado);
  useEffect(() => setLocal(marcado), [marcado]);

  return (
    <input
      type="checkbox"
      checked={local}
      aria-label={descricao}
      onChange={(e) => {
        setLocal(e.target.checked);
        onMudar(e.target.checked);
      }}
      className={`h-4 w-4 shrink-0 accent-[#0A1626] ${className}`}
    />
  );
}

/** Monta o link de WhatsApp já com a mensagem base preenchida. */
export function linkWhatsapp(telefone: string, nome: string, modelo: string) {
  const digitos = telefone.replace(/\D/g, "");
  if (digitos.length < 10) return null;
  const numero = digitos.startsWith("55") ? digitos : `55${digitos}`;
  const primeiroNome = nome.trim().split(/\s+/)[0] ?? "";
  const texto = modelo.replaceAll("{{nome}}", primeiroNome);
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

export function baixarCsv(nomeArquivo: string, cabecalho: string[], linhas: (string | number)[][]) {
  const escapar = (v: string | number) => `"${String(v ?? "").replaceAll('"', '""')}"`;
  const conteudo = [cabecalho, ...linhas].map((l) => l.map(escapar).join(";")).join("\n");
  const url = URL.createObjectURL(new Blob(["﻿" + conteudo], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nomeArquivo;
  a.click();
  URL.revokeObjectURL(url);
}
