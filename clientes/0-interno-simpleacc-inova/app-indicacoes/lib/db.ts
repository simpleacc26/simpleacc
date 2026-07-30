import { Pool } from "pg";
import { SEGREDOS } from "./segredos";

export class SemBanco extends Error {
  constructor() {
    super("Banco de dados não configurado (falta DATABASE_URL).");
  }
}

/** Consulta com template string: sql`select * from clientes where id = ${id}`. */
export type Consulta = (strings: TemplateStringsArray, ...valores: unknown[]) => Promise<any[]>;

let pool: Pool | null = null;

function conexao(): Consulta {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || SEGREDOS.DATABASE_URL;
  if (!url) throw new SemBanco();
  if (!pool) {
    const local = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
    pool = new Pool({
      connectionString: url,
      max: 3,
      ssl: local ? false : { rejectUnauthorized: true },
    });
  }
  const p = pool;
  return async (strings, ...valores) => {
    const texto = strings.reduce(
      (acc, parte, i) => acc + parte + (i < valores.length ? `$${i + 1}` : ""),
      ""
    );
    const res = await p.query(texto, valores);
    return res.rows;
  };
}

let schemaPronto: Promise<void> | null = null;

/**
 * Devolve a função de consulta, criando as tabelas e o conteúdo inicial na
 * primeira chamada. É idempotente: pode rodar em toda requisição.
 */
export async function sql(): Promise<Consulta> {
  const s = conexao();
  if (!schemaPronto) {
    schemaPronto = criarSchema(s).catch((e) => {
      schemaPronto = null;
      throw e;
    });
  }
  await schemaPronto;
  return s;
}

async function criarSchema(s: Consulta) {
  await s`
    create table if not exists clientes (
      id serial primary key,
      nome text not null,
      empresa text not null default '',
      telefone text not null default '',
      prioridade text not null default 'media',
      motivo text not null default '',
      status text not null default 'pendente',
      data_abordagem date,
      responsavel text not null default '',
      notas text not null default '',
      criado_em timestamptz not null default now()
    )`;

  await s`
    create table if not exists indicacoes (
      id serial primary key,
      cliente_id integer references clientes(id) on delete set null,
      cliente_nome text not null default '',
      nome text not null,
      contato text not null default '',
      responsavel text not null default '',
      status_comercial text not null default 'novo',
      convertido boolean not null default false,
      notas text not null default '',
      criado_em timestamptz not null default now()
    )`;

  await s`
    create table if not exists notas (
      chave text primary key,
      valor text not null default ''
    )`;

  await s`
    create table if not exists tarefas (
      id serial primary key,
      titulo text not null,
      etapa text not null default '',
      prazo date,
      feito boolean not null default false,
      ordem integer not null default 0
    )`;

  const [{ total }] = (await s`select count(*)::int as total from tarefas`) as { total: number }[];
  if (total === 0) {
    for (const [i, t] of CRONOGRAMA.entries()) {
      await s`insert into tarefas (titulo, etapa, prazo, ordem)
              values (${t.titulo}, ${t.etapa}, ${t.prazo}::date, ${i})`;
    }
  }

  for (const [chave, valor] of Object.entries(TEXTOS_INICIAIS)) {
    await s`insert into notas (chave, valor) values (${chave}, ${valor})
            on conflict (chave) do nothing`;
  }
}

/** Cronograma do plano de ação de 28/07/2026. */
const CRONOGRAMA = [
  { etapa: "1 — Mapeamento da carteira", titulo: "Levantar todos os clientes ativos", prazo: "2026-07-29" },
  { etapa: "1 — Mapeamento da carteira", titulo: "Classificar todos os clientes por potencial de indicação", prazo: "2026-07-29" },
  { etapa: "1 — Mapeamento da carteira", titulo: "Registrar o motivo de cada classificação", prazo: "2026-07-29" },
  { etapa: "2 — Preparação da abordagem", titulo: "Finalizar o pitch de abordagem", prazo: "2026-07-29" },
  { etapa: "2 — Preparação da abordagem", titulo: "Preparar a mensagem base de WhatsApp", prazo: "2026-07-29" },
  { etapa: "2 — Preparação da abordagem", titulo: "Definir a sequência de contato por prioridade", prazo: "2026-07-29" },
  { etapa: "3 — Execução", titulo: "Iniciar os contatos pelos clientes de alta prioridade", prazo: "2026-07-30" },
  { etapa: "3 — Execução", titulo: "Concluir a abordagem de todos os clientes elegíveis", prazo: "2026-07-31" },
  { etapa: "3 — Execução", titulo: "Registrar todas as respostas", prazo: "2026-07-31" },
  { etapa: "4 — Organização", titulo: "Encaminhar todas as indicações para o comercial", prazo: "2026-07-31" },
  { etapa: "5 — Melhoria contínua", titulo: "Consolidar e fechar o resultado da ação", prazo: "2026-08-06" },
  { etapa: "5 — Melhoria contínua", titulo: "Apresentar o resultado geral para a equipe", prazo: "2026-08-06" },
  { etapa: "5 — Melhoria contínua", titulo: "Registrar aprendizados e atualizar o pitch", prazo: "2026-08-06" },
];

const TEXTOS_INICIAIS: Record<string, string> = {
  pitch: `RASCUNHO — ajuste com as suas palavras.

1. Abertura pelo relacionamento
"Oi {{nome}}, tudo bem? Passando aqui por um motivo diferente do de sempre."

2. Contexto honesto
"A gente está com espaço na agenda para atender alguns clientes novos neste mês
e decidimos abrir isso primeiro para quem já está com a gente, em vez de sair
correndo atrás de gente que não conhece o nosso trabalho."

3. O pedido, específico
"Você conhece alguém — sócio, parceiro, alguém do seu setor — que hoje está no
mesmo ponto em que você estava quando começou com a gente?"

4. Tirar o peso
"Se não vier ninguém à cabeça agora, sem problema nenhum. Se vier, me diz o nome
e o contato que eu falo com a pessoa com todo o cuidado, no seu nome."

5. Fechamento
"Posso falar com ela mencionando que foi você que indicou?"

Observação: sempre que fizer sentido, mandar em ÁUDIO personalizado em vez de
texto. Aumenta muito a taxa de resposta.`,

  mensagem_whatsapp: `Oi {{nome}}, tudo bem?

Passando aqui por um motivo diferente do de sempre. Abrimos algumas vagas para
clientes novos neste mês e decidimos oferecer primeiro para quem já trabalha com
a gente indicar.

Você conhece alguém que hoje está no mesmo ponto em que você estava quando
começou com a gente? Se vier alguém à cabeça, me passa o nome e o contato que eu
falo com a pessoa com todo o cuidado, no seu nome.

Se não vier ninguém agora, tranquilo — qualquer hora que aparecer, me avisa.`,

  aprendizados: `Registre aqui o que funcionou e o que não funcionou nesta ação.

- Abordagens que geraram mais indicação:
- Abordagens que não funcionaram:
- Ajustes para a próxima rodada:`,
};
