import { useEffect, useMemo } from "react";
import "../styles/pos.css";
import { config } from "../config";
import { track } from "../lib/analytics";
import { getUtm } from "../lib/session";
import type { Balde, Resultado } from "../lib/scoring";

const SITUACOES: { key: Balde; titulo: string; texto: string }[] = [
  {
    key: "oportunidade",
    titulo: "A demanda cresceu mais rápido do que a empresa consegue acompanhar",
    texto:
      "O time trabalha em hora extra com frequência, os prazos vivem apertados e bons negócios passam sem que ninguém consiga assumir. O dinheiro já está na mesa e você só consegue aproveitar uma fatia dele. E quanto mais demanda entra, maior fica o GAP.",
  },
  {
    key: "lideranca",
    titulo: "Falta liderança formada, não mão de obra",
    texto:
      "Contratar mais gente para executar não resolveu. O que falta é gente que se aproprie da entrega e das soluções que a empresa precisa para crescer, e não mais um par de mãos. Enquanto a liderança não é formada, quem puxa tudo continua sendo você.",
  },
  {
    key: "decisao",
    titulo: "As decisões de maior peso você toma sozinho",
    texto:
      "Não é falta de informação. É não ter, no seu nível, alguém com quem trocar antes de decidir. Alguém que amplie a sua visão sobre a oportunidade ou sobre o problema, numa mesa onde você não precise ser a pessoa mais inteligente. Um erro em empresa deste porte não custa uma reunião, custa margem e meses de operação.",
  },
  {
    key: "processo",
    titulo: "Você contratou processo e ferramenta. O que não mudou foi como o time trabalha",
    texto:
      "Consultoria, sistema de gestão, treinamento, processo escrito. Tudo prometeu uma empresa organizada e nada disso mexeu o ponteiro: as ideias e as soluções continuam partindo de você, e as pessoas continuam esperando por você.",
  },
];

function lerResultado(): Resultado | null {
  try {
    const raw = sessionStorage.getItem("unicos_resultado");
    if (raw) return JSON.parse(raw) as Resultado;
  } catch { /* ignore */ }
  return null;
}

function Cta({ label, where }: { label: string; where: string }) {
  const onClick = () => {
    track.agendamentoClick({ origem: where, ...getUtm() });
  };
  const href = config.agendamentoUrl.startsWith("PREENCHER") ? "#agendar" : config.agendamentoUrl;
  return (
    <div className="cta-wrap">
      <a className="cta" href={href} onClick={onClick} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {label}
      </a>
      <p className="cta-micro">Sessão individual e online, com data escolhida por você.</p>
    </div>
  );
}

export function PosDiagnosticoPage() {
  const resultado = useMemo(lerResultado, []);
  const baldeMatch = resultado?.balde;

  useEffect(() => {
    track.resultado({ pagina: "agendamento", balde: baldeMatch || "", aprovacao: resultado?.aprovacao || "" , ...getUtm() });
  }, [baldeMatch, resultado]);

  // situação do lead primeiro
  const ordered = baldeMatch
    ? [...SITUACOES].sort((a, b) => (a.key === baldeMatch ? -1 : b.key === baldeMatch ? 1 : 0))
    : SITUACOES;

  return (
    <div className="pos">
      {/* BLOCO 1 — ABERTURA */}
      <header className="hero">
        <div className="container">
          <span className="label">SEU RESULTADO · DIAGNÓSTICO DE MATURIDADE DO NEGÓCIO</span>
          <h1>Estágio 2: No Limite</h1>
          <p className="sub">"A mesma gestão que trouxe a sua empresa até aqui está com a validade vencida."</p>
          <p>
            Você chegou aos 7 dígitos com equipe montada, demanda entrando e mercado para crescer.
            Você enxerga as oportunidades, mas não consegue aproveitar quase nenhuma delas, porque tudo ainda passa por você.
          </p>
          <p>
            Se você não está em cima, as coisas não andam do jeito que deveriam, e os problemas se acumulam.
            Não porque o time não saiba o que precisa ser feito (ele sabe), só que as pessoas aprenderam que tudo precisa
            da sua validação para funcionar.
          </p>
          <p>
            Nem a melhor estratégia consegue escalar uma operação sobrecarregada. Enquanto essa condição não mudar,
            cada real a mais de faturamento chega como mais peso, e não como mais liberdade.
          </p>
          <p style={{ color: "#fff", fontWeight: 600 }}>
            Em 40 minutos é possível identificar exatamente o que mantém a sua empresa dependente de você,
            e o que precisa mudar para ela crescer sem isso.
          </p>
          <Cta label="Quero agendar minha sessão" where="hero" />
        </div>
      </header>

      {/* BLOCO 2 — AS QUATRO SITUAÇÕES */}
      <section className="section">
        <div className="container">
          <span className="label">O DIAGNÓSTICO</span>
          <h2>O problema deixou de ser vender</h2>
          <p>
            Depois de um certo tamanho, o limite deixa de estar no mercado e passa a estar dentro de casa,
            em alguma destas quatro situações{baldeMatch ? ". Pelas suas respostas, começamos pela sua:" : ":"}
          </p>
          <div className="sit-list">
            {ordered.map((s) => (
              <div key={s.key} className={`sit${s.key === baldeMatch ? " match" : ""}`}>
                {s.key === baldeMatch && <span className="tag">A sua situação</span>}
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            Reconhecer-se em alguma dessas situações não diz nada sobre a sua competência. Você já provou que sabe fazer
            a empresa crescer. O que mudou não foi só a sua empresa, foi o ambiente em volta dela. Os seus padrões não estão
            errados, eles estão desatualizados. Estão com a validade vencida.
          </p>
          <p>
            E manter essa condição tem preço todo mês: entregas que atrasam, oportunidades que passam, margem consumida
            pela operação sem que você perceba, e um time que aprendeu a esperar por você em vez de assumir.
          </p>
        </div>
      </section>

      {/* BLOCO 3 — O QUE ACONTECE NA SESSÃO + reversão de risco */}
      <section className="section soft">
        <div className="container">
          <span className="label">A SESSÃO ESTRATÉGICA</span>
          <h2>Quarenta minutos sobre o seu negócio, com quatro respostas objetivas</h2>
          <p>
            Seu maior ativo é o seu tempo, e nós respeitamos isso. A sessão diagnóstica não é apresentação comercial nem
            conteúdo genérico, é uma análise da sua empresa, com os seus números na frente. Ao final da conversa você sai entendendo:
          </p>
          <ul className="list-check">
            <li><span className="mk">1.</span> O que exatamente faz a empresa parar quando você não está.</li>
            <li><span className="mk">2.</span> Como construir um time engajado e autogerenciável, que assuma a entrega em vez de esperar por você.</li>
            <li><span className="mk">3.</span> Quem, do time que você já tem, tem condição de assumir mais, e o que falta para isso acontecer.</li>
            <li><span className="mk">4.</span> Quanto essa condição está custando por mês no seu negócio, com os seus números na mesa.</li>
          </ul>
          <div className="reversal">
            <strong>Sem risco para o seu tempo:</strong> são 40 minutos com os seus números na mesa. Se você não sair
            com pelo menos um ponto claro para destravar o crescimento da sua empresa, o tempo foi por nossa conta.
          </div>
          <p style={{ marginTop: 16 }}>
            A condução é feita sobre um método construído em quase 20 anos formando empresários e líderes de empresa,
            aplicado individualmente ao seu negócio.
          </p>
          <Cta label="Quero agendar minha sessão" where="sessao" />
        </div>
      </section>

      {/* BLOCO 4 — PROVA */}
      <section className="section">
        <div className="container">
          <span className="label">QUEM JÁ PASSOU POR ESSA CONVERSA</span>
          <div className="proof-big">
            <div className="num">4x o faturamento em 4 meses</div>
          </div>
          <div className="quote">
            <p>"Por mais consolidada que uma empresa possa estar, o mundo sofre transformações muito rápidas e nos exige
              adaptações rápidas. Estar buscando esse acompanhamento é de suma importância para alcançar êxito e não se
              perder no meio do caminho."</p>
            <p className="who">Tamiris Felippin · Empresária, membro do ÚNICOS Club</p>
          </div>
          <div className="quote">
            <p>"Tudo o que eu aprendi aqui é para o meu negócio e para as pessoas ao meu redor, melhorando a comunicação
              e implementando de forma clara a cultura e as transformações que eu busco."</p>
            <p className="who">Patrícia Librelotto · Proprietária da Rede de Lojas Lavanda</p>
          </div>
          <div className="quote">
            <p>"Em um ano tão desafiador como está sendo 2026, principalmente para quem é empresário, a Carol tem sido
              muito importante. Desde o início da minha entrada no ÚNICOS, a Carol e o Zé estão nos auxiliando nesse
              processo de transformação. Não teríamos tido o crescimento que alcançamos sem esse apoio."</p>
            <p className="who">Juliane Marques · Empresária, membro do ÚNICOS Club</p>
          </div>
        </div>
      </section>

      {/* BLOCO 5 — QUEM CONDUZ */}
      <section className="section soft">
        <div className="container">
          <span className="label">QUEM CONDUZ</span>
          <h2>Caroline Batista</h2>
          <h3 style={{ fontWeight: 500 }}>Estrategista em liderança e crescimento de negócios</h3>
          <div className="selos">
            <span className="selo">Quase 20 anos formando quem decide</span>
            <span className="selo">+10 mil horas de atendimento</span>
            <span className="selo">+6 mil líderes desenvolvidos</span>
            <span className="selo">+40 empresas acompanhadas</span>
          </div>
          <p>
            A Carol não estudou empresa de fora. Empreendedora desde os 20 anos, ela construiu, estruturou e vendeu o
            próprio negócio, de modo que a mudança que propõe é uma que ela já fez.
          </p>
          <p>
            O mundo em que você abriu a sua empresa não existe mais. O mercado mudou, o cliente mudou e o time mudou, e é
            por isso que a gestão que fez o negócio nascer não dá conta do negócio que ele é hoje. A dificuldade que você
            enfrenta não é falta de capacidade, é estar conduzindo o futuro da empresa com a forma de gerir do passado.
          </p>
          <div className="authority">
            <div className="brands">Bem Brasil · Sicredi · Dell Technologies · Gerdau · Unimed · AGCO · Mix Alimentos</div>
            <p style={{ margin: "8px 0 0" }}>
              Na Bem Brasil, o trabalho de liderança e cultura acompanhou a empresa de R$1,5 bilhão a mais de R$4 bilhões
              de faturamento.
            </p>
            <p className="note">Empresas que confiam no nosso trabalho. Referência de autoridade, não promessa de resultado.</p>
          </div>
        </div>
      </section>

      {/* BLOCO 6 — FAQ */}
      <section className="section">
        <div className="container">
          <span className="label">PERGUNTAS FREQUENTES</span>
          <div className="faq">
            <details>
              <summary>Essa sessão é para mim?</summary>
              <p>É para o empresário, dono ou sócio de empresa que fatura acima de 7 dígitos, com equipe montada e pouca
                ou nenhuma camada de coordenação abaixo dele. Se hoje quase tudo ainda depende da sua presença para
                acontecer, é exatamente esse o caso. Se a empresa ainda está construindo a sua base, ou se não é você quem
                decide o investimento, esse não é o momento.</p>
            </details>
            <details>
              <summary>Quanto tempo dura?</summary>
              <p>São 40 minutos, individual e online. Se você tem sócio, traga o seu sócio junto. É importante que ele
                esteja nessa conversa, porque a direção que sai dela é sobre o negócio dos dois. Você sai com clareza
                sobre o que ajustar e por onde começar.</p>
            </details>
            <details>
              <summary>Como me preparo?</summary>
              <p>Tenha em mãos o faturamento do último ano, quantas pessoas trabalham com você, quantos cargos de liderança
                existem hoje e quantos dias seguidos a empresa rodou sem você na última vez em que se afastou. Quanto mais
                preciso o número, melhor a conversa.</p>
            </details>
            <details>
              <summary>Quem conduz?</summary>
              <p>A Carol ou um estrategista formado por ela, com o mesmo método e a mesma leitura.</p>
            </details>
          </div>
        </div>
      </section>

      {/* BLOCO 7 — FECHAMENTO */}
      <section className="section navy closing">
        <div className="container">
          <h2 style={{ color: "#fff" }}>Empresa que não cresce, morre.</h2>
          <p>Sem mudar isso, crescer só aumenta os problemas existentes.</p>
          <p>
            Você já sabe onde isso vai dar nos próximos doze meses se nada mudar, porque acabou de viver os doze anteriores.
          </p>
          <p>
            A diferença começa em uma conversa de 40 minutos sobre o que faz a sua empresa depender de você, e sobre o que
            muda para ela voltar a aproveitar as oportunidades que hoje passam.
          </p>
          <Cta label="Quero agendar minha sessão" where="fechamento" />
          <p className="cta-micro">Agenda limitada a poucas sessões por semana.</p>
        </div>
      </section>
    </div>
  );
}
