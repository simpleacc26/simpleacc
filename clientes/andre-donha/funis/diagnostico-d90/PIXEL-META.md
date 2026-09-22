# Pixel da Meta — Diagnóstico D-90

Combinado na call de 22/09: o Renan cria o pixel no gerenciador, com os eventos
configurados, e manda o código para o André instalar na página do quiz dentro da
plataforma.

A conta de anúncios já está resolvida: nome ajustado, cartão final 8120
cadastrado e acesso total atribuído à BM01 Simple.

## Parte do Renan: criar o pixel

1. Gerenciador de Negócios → **Fontes de dados** → **Conjuntos de dados** →
   **Criar**.
2. Nome sugerido: `Musikalis — Site e Quiz`.
3. Vincular à conta de anúncios **Musikalis Produções** e à página da Musikalis.
4. Método de conexão: **instalação manual do código**, porque a página vive
   dentro do Lovable e não tem integração de um clique.
5. Copiar o **ID do pixel** (15 a 16 dígitos) e substituir `SEU_PIXEL_ID` no
   código abaixo e no `PROMPT-LOVABLE.md`.
6. Cadastrar os eventos personalizados em **Eventos personalizados**:
   `QuizIniciado` e `QuizMetade`.
7. Em **Configurar eventos da Web**, priorizar na ordem: `CompleteRegistration`,
   `Lead`, `InitiateCheckout`, `QuizMetade`, `QuizIniciado`, `ViewContent`,
   `PageView`. A Meta só otimiza com clareza se a prioridade estiver definida.
8. Depois de o André instalar, validar com a extensão **Meta Pixel Helper** e
   com o **Testar eventos** do gerenciador, respondendo o quiz inteiro uma vez.

## Parte do André: instalar

Colar no `<head>` da página do quiz, trocando `SEU_PIXEL_ID` pelo número que o
Renan enviar:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'SEU_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=SEU_PIXEL_ID&ev=PageView&noscript=1"/></noscript>
<!-- End Meta Pixel Code -->
```

E disparar os eventos nos momentos certos do fluxo:

```js
// a página do quiz abriu
fbq('track', 'ViewContent', { content_name: 'Diagnóstico D-90' });

// respondeu a primeira pergunta
fbq('trackCustom', 'QuizIniciado');

// respondeu a quinta pergunta
fbq('trackCustom', 'QuizMetade');

// chegou na tela de captura
fbq('track', 'InitiateCheckout', { content_name: 'Diagnóstico D-90' });

// formulário validado e enviado
fbq('track', 'Lead', {
  content_name: 'Diagnóstico D-90',
  value: vazamento_max,
  currency: 'BRL',
  indice: indice_d90,
  faixa: faixa,
  elo: elo_dominante
});

// conta free criada
fbq('track', 'CompleteRegistration', { content_name: 'Conta free Musikalis' });
```

## Por que isso importa

O pixel é o que permite à Meta aprender **quem** converte. Sem ele, a campanha
otimiza por clique e traz curioso. Com ele, e com o índice indo junto no evento
`Lead`, a Meta passa a procurar gente parecida com quem tem produção de verdade
e orçamento de verdade.

É também o que torna possível o remarketing dos dois públicos que mais valem
aqui: quem começou o quiz e não terminou, e quem terminou e não criou conta.

## Pendências

- [ ] Renan: criar o pixel e enviar o ID ao André
- [ ] Renan: configurar os eventos personalizados e a prioridade
- [ ] André: instalar o código na página do quiz
- [ ] Os dois: validar com o Pixel Helper, respondendo o quiz ponta a ponta
- [ ] Renan: instalar o mesmo pixel na página em `musikalis-diagnostico.vercel.app`
      enquanto ela for o destino do tráfego
