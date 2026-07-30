export type Prioridade = "alta" | "media" | "baixa" | "nao_abordar";

export type StatusAbordagem =
  | "pendente"
  | "abordado"
  | "indicou"
  | "sem_indicacao"
  | "indicar_depois"
  | "sem_resposta";

export type StatusComercial =
  | "novo"
  | "contato_feito"
  | "reuniao_agendada"
  | "proposta"
  | "ganho"
  | "perdido";

export type Cliente = {
  id: number;
  nome: string;
  empresa: string;
  telefone: string;
  prioridade: Prioridade;
  motivo: string;
  status: StatusAbordagem;
  data_abordagem: string | null;
  responsavel: string;
  notas: string;
};

export type Indicacao = {
  id: number;
  cliente_id: number | null;
  cliente_nome: string;
  nome: string;
  contato: string;
  responsavel: string;
  status_comercial: StatusComercial;
  convertido: boolean;
  notas: string;
};

export type Tarefa = {
  id: number;
  titulo: string;
  etapa: string;
  prazo: string | null;
  feito: boolean;
  ordem: number;
};

/** Envia uma alteração para a API e recarrega os dados. */
export type Salvar = (caminho: string, metodo: string, corpo?: unknown) => Promise<void>;

export type Dados = {
  clientes: Cliente[];
  indicacoes: Indicacao[];
  tarefas: Tarefa[];
  notas: Record<string, string>;
};

export const PRIORIDADES: { valor: Prioridade; rotulo: string; cor: string; criterio: string }[] = [
  {
    valor: "alta",
    rotulo: "Alta",
    cor: "#1F7A4D",
    criterio:
      "Cliente satisfeito, bom relacionamento, participa das reuniões, confia na empresa, tem bom networking.",
  },
  {
    valor: "media",
    rotulo: "Média",
    cor: "#B8860B",
    criterio: "Bom cliente, mas ainda com pouco relacionamento ou em fase de geração de resultados.",
  },
  {
    valor: "baixa",
    rotulo: "Baixa",
    cor: "#2F5FA8",
    criterio: "Cliente muito recente, pouca interação, ainda em fase inicial da entrega.",
  },
  {
    valor: "nao_abordar",
    rotulo: "Não abordar",
    cor: "#A8433A",
    criterio: "Risco de churn, insatisfeito, inadimplente ou relacionamento desgastado.",
  },
];

export const STATUS_ABORDAGEM: { valor: StatusAbordagem; rotulo: string }[] = [
  { valor: "pendente", rotulo: "Pendente" },
  { valor: "abordado", rotulo: "Abordado — aguardando" },
  { valor: "indicou", rotulo: "Indicou" },
  { valor: "indicar_depois", rotulo: "Vai indicar depois" },
  { valor: "sem_indicacao", rotulo: "Sem indicação" },
  { valor: "sem_resposta", rotulo: "Sem resposta" },
];

export const STATUS_COMERCIAL: { valor: StatusComercial; rotulo: string }[] = [
  { valor: "novo", rotulo: "Novo" },
  { valor: "contato_feito", rotulo: "Contato feito" },
  { valor: "reuniao_agendada", rotulo: "Reunião agendada" },
  { valor: "proposta", rotulo: "Proposta enviada" },
  { valor: "ganho", rotulo: "Ganho" },
  { valor: "perdido", rotulo: "Perdido" },
];

export function rotuloPrioridade(v: string) {
  return PRIORIDADES.find((p) => p.valor === v)?.rotulo ?? v;
}

export function corPrioridade(v: string) {
  return PRIORIDADES.find((p) => p.valor === v)?.cor ?? "#8197B6";
}

export function rotuloStatus(v: string) {
  return STATUS_ABORDAGEM.find((s) => s.valor === v)?.rotulo ?? v;
}
