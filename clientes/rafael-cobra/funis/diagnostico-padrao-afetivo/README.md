# Funil · Diagnóstico do Padrão Afetivo · Rafael Cobra

Quiz de 10 perguntas mais página de diagnóstico personalizada. Site estático,
sem build e sem dependências: abre com dois cliques e sobe em qualquer lugar.

- **Copy aprovada:** `../../estrategia/2026-08-13-estrategia.html`, seções 2 e 3.
- **Padrão de referência:** funil da Luana Isse (`quiz-luana-isse` na Vercel).
  Motor, componentes e decisões de conversão vêm de lá.

## Arquivos

| Arquivo | O que é |
| ------- | ------- |
| `index.html` | o quiz |
| `diagnostico.html` | a página de diagnóstico (a peça que faz a pessoa querer conversar) |
| `flow.js` | **toda a copy e a configuração.** É o único arquivo que se mexe para ajustar texto |
| `app.js` | motor do quiz: render, validação, IRP, classificação, tracking, envio do lead |
| `diagnostico.js` | a carta personalizada, montada a partir das respostas |
| `styles.css` | identidade visual |
| `favicon.svg` | ícone |

## Como rodar local

```bash
python3 -m http.server 8000    # e abrir http://localhost:8000
```

Abrir o arquivo direto pelo `file://` também funciona para conferir texto e
layout, mas o `sessionStorage` se comporta melhor servido por HTTP.

## O índice (IRP)

**IRP, Índice de Repetição do Padrão.** Sai das 7 perguntas de diagnóstico que
têm `peso` no `flow.js`. Objetivo e as duas porteiras (perfil e prontidão) não
pontuam.

**Se mexer em qualquer peso, rode a distribuição de novo.** Com os pesos
iniciais, 96,5% das respostas caíam em "Alta" e o número virava enfeite. Os
pesos publicados dão **amplitude de 19% a 100%** e distribuição de **42% Alta,
57% Média, 0,3% Baixa**.

```bash
node -e "
global.window={};require('./flow.js');const F=window.FLOW;
const pont=F.steps.filter(s=>s.options.some(o=>typeof o.peso==='number'));
const max=pont.reduce((t,s)=>t+Math.max(...s.options.map(o=>o.peso||0)),0);
let c=[[]];pont.forEach(s=>{const n=[];c.forEach(x=>s.options.forEach(o=>n.push(x.concat(o.peso||0))));c=n;});
const d={Alta:0,Media:0,Baixa:0};let mn=101,mx=0;
c.forEach(x=>{const p=Math.round(x.reduce((a,b)=>a+b,0)/max*100);mn=Math.min(mn,p);mx=Math.max(mx,p);d[p>=66?'Alta':(p>=33?'Media':'Baixa')]++;});
console.log('amplitude',mn+'-'+mx+'%',d,'de',c.length);"
```

## Classificação do lead

Quatro faixas na planilha, três CTAs na página. A regra mora no código
(`app.js > classificarLead`) e não só no documento de estratégia.

| Faixa | Quem é | O que vê na página |
| ----- | ------ | ------------------ |
| `fila-quente` | prontidão "é prioridade" + perfil no ICP + IRP igual ou acima de 66% | convite para a sessão |
| `qualificado` | o resto de quem quer resolver | convite para a sessão |
| `nutrir` | quer, mas não é o momento financeiro | "quero entender como funciona" |
| `fora` | só queria o diagnóstico | convite para acompanhar o conteúdo, sem oferta de sessão |

O ICP é a profissão (empresária, executiva, liberal), não faturamento:
perguntar renda a uma mulher num diagnóstico afetivo soa comercial e quebra a
confiança da página.

## Pendências antes de mandar tráfego

1. **WhatsApp comercial** em `flow.js > marca.whatsapp` (só dígitos, com o 55).
   Enquanto estiver vazio, os botões não abrem conversa e a página mostra um
   aviso no topo, de propósito.
2. **Pixel da Meta**, em três lugares: `index.html`, `diagnostico.html` e
   `app.js > TRACKING_CONFIG.meta_pixel_id`.
3. **Webhook do Make** em `app.js > LEADS_ENDPOINT`, ligado à planilha de leads
   no Drive do cliente. Sem ele o funil funciona, mas o lead não é registrado.
4. **Depoimentos.** As listas `VIDEOS` e `PRINTS` em `diagnostico.js` estão
   vazias de propósito: ele é psicanalista, e depoimento de paciente exige
   autorização escrita. A seção só aparece quando houver material liberado.
5. **Logotipo do Método Cobra.** Existe (destaque do Instagram), mas o arquivo
   não chegou. Enquanto isso a marca é tipográfica.

## Teste antes de publicar

Responder o quiz inteiro **pelo navegador**, não por curl. O caminho do lead
(`fetch` com `keepalive` e `Content-Type: application/json`) só é exercitado de
verdade assim, e já houve bug de produção que passava no curl e perdia o lead
silenciosamente. Ver o comentário em `app.js > enviarLead`.
