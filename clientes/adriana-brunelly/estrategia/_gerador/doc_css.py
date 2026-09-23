CSS = r"""
:root{
  --bg:#08070A; --bg-2:#0E0D11;
  --surface:rgba(255,252,246,.045); --surface-2:rgba(255,252,246,.075);
  --text:#F4F1EA; --muted:#A79E8D;
  --primary:#C9A24A; --primary-700:#E2C782; --primary-900:#8C6C26;
  --accent-soft:rgba(201,162,74,.14);
  --border:rgba(201,162,74,.26); --border-soft:rgba(244,241,234,.12);
  --font:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  --font-serif:"Iowan Old Style","Palatino Linotype","Book Antiqua",Palatino,"Hoefler Text",Georgia,"Times New Roman",serif;
}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{background:#050408;font-family:var(--font);color:var(--text);
  font-size:10.4pt;line-height:1.42;-webkit-font-smoothing:antialiased}

/* ---- a folha ---- */
.page{
  position:relative; width:210mm; height:297mm; overflow:hidden;
  margin:0 auto 8mm; padding:14mm 15mm 13mm;
  background:
    radial-gradient(820px 460px at 50% -10%, rgba(201,162,74,.11), transparent 62%),
    radial-gradient(620px 420px at 96% 4%, rgba(226,199,130,.05), transparent 60%),
    linear-gradient(180deg,#0E0D11 0%, #08070A 46%, #050408 100%);
  border:1px solid rgba(201,162,74,.12);
}
@media print{
  body{background:none}
  .page{margin:0;border:0;page-break-after:always;break-after:page}
  .page:last-child{page-break-after:auto}
}
@page{size:A4;margin:0}

/* ---- cabeca e pe correntes ---- */
.runhead{position:absolute;top:6.5mm;left:15mm;right:15mm;
  display:flex;justify-content:space-between;align-items:baseline;
  font-size:7.2pt;letter-spacing:.14em;text-transform:uppercase;color:#6E6759;
  border-bottom:1px solid rgba(201,162,74,.16);padding-bottom:2.4mm}
.runhead b{color:var(--primary);font-weight:600;letter-spacing:.14em}
.runfoot{position:absolute;bottom:7mm;left:15mm;right:15mm;
  display:flex;justify-content:space-between;
  font-size:7pt;color:#5E584C;border-top:1px solid rgba(201,162,74,.12);padding-top:2.2mm}

/* ---- capa ---- */
.capa{display:flex;flex-direction:column;justify-content:center;height:100%}
.capa .monograma{font-family:var(--font-serif);font-size:30pt;line-height:1;
  width:20mm;height:20mm;display:grid;place-items:center;border:1px solid var(--border);
  border-radius:50%;color:var(--primary-700);margin-bottom:9mm;
  background:radial-gradient(circle at 50% 30%, rgba(201,162,74,.18), transparent 70%)}
.capa .selo{font-size:7.6pt;letter-spacing:.24em;text-transform:uppercase;color:var(--primary);
  margin-bottom:6mm}
.capa h1{font-family:var(--font-serif);font-size:31pt;line-height:1.1;margin:0 0 5mm;
  font-weight:600;letter-spacing:-.4px}
.capa h1 em{font-style:italic;
  background:linear-gradient(92deg,#B8892F,#F0DCA8 52%,#B8892F);
  -webkit-background-clip:text;background-clip:text;color:transparent}
.capa .sub{font-size:12pt;color:var(--muted);line-height:1.5;max-width:145mm;margin:0 0 9mm}
.capa .meta{font-size:8.6pt;color:#6E6759;line-height:1.75;letter-spacing:.02em}
.capa .meta b{color:var(--text);font-weight:600}

/* ---- tipografia de secao ---- */
.kicker{font-size:7.4pt;letter-spacing:.22em;text-transform:uppercase;color:var(--primary);
  margin:0 0 1.6mm}
h2{font-family:var(--font-serif);font-size:18pt;line-height:1.15;margin:0 0 3mm;font-weight:600}
h3{font-family:var(--font-serif);font-size:12.4pt;line-height:1.2;margin:5mm 0 2mm;
  font-weight:600;color:var(--primary-700)}
h4{font-size:8.6pt;letter-spacing:.12em;text-transform:uppercase;color:var(--primary);
  margin:4mm 0 1.6mm;font-weight:600}
p{margin:0 0 2.4mm}
.lead{font-size:11pt;color:var(--muted);line-height:1.5;margin-bottom:4mm}
.rule{height:1px;border:0;margin:4mm 0;
  background:linear-gradient(90deg,var(--primary-900),rgba(201,162,74,.12) 60%,transparent)}
strong{color:var(--primary-700);font-weight:600}
em{color:var(--text)}
.mini{font-size:8.4pt;color:#7A7365;line-height:1.45}

/* ---- caixas de cristal ---- */
.cristal{background:var(--surface);border:1px solid var(--border-soft);border-radius:10px;
  padding:4mm 5mm;margin:3mm 0}
.ouro{background:var(--accent-soft);border:1px solid var(--border);border-radius:10px;
  padding:4mm 5mm;margin:3mm 0}
.ouro h4,.cristal h4{margin-top:0}

/* ---- listas ---- */
ul,ol{margin:0 0 2.6mm;padding-left:4.6mm}
li{margin-bottom:1.1mm}
ul.limpa{list-style:none;padding-left:0}
ul.limpa li{position:relative;padding-left:5mm;margin-bottom:1.6mm}
ul.limpa li::before{content:"";position:absolute;left:0;top:1.55mm;width:2.2mm;height:2.2mm;
  border-radius:50%;background:linear-gradient(135deg,#E4C97F,#B8892F)}

/* ---- tabelas ---- */
table{width:100%;border-collapse:collapse;margin:2.5mm 0 3mm;font-size:9pt}
th{text-align:left;font-size:7.4pt;letter-spacing:.14em;text-transform:uppercase;
  color:var(--primary);border-bottom:1px solid var(--border);padding:1.8mm 2.4mm 1.6mm;font-weight:600}
td{padding:1.9mm 2.4mm;border-bottom:1px solid rgba(244,241,234,.08);vertical-align:top;line-height:1.36}
tr:last-child td{border-bottom:0}
td.n{color:var(--primary-700);font-weight:600;white-space:nowrap}

/* ---- perguntas do quiz ---- */
.q{margin:0 0 3.4mm;padding-left:9mm;position:relative;break-inside:avoid}
.q .qn{position:absolute;left:0;top:-.4mm;font-family:var(--font-serif);font-size:13pt;
  color:var(--primary-900);font-weight:700;width:8mm}
.q .qetapa{font-size:7pt;letter-spacing:.16em;text-transform:uppercase;color:#6E6759}
.q .qtexto{font-size:10.6pt;font-weight:600;line-height:1.3;margin:.4mm 0 1.4mm}
.q .qops{display:flex;flex-wrap:wrap;gap:1.4mm}
.q .qop{font-size:8.5pt;color:var(--muted);background:var(--surface);
  border:1px solid var(--border-soft);border-radius:20px;padding:.9mm 3mm;line-height:1.3}
.q .qnota{font-size:8pt;color:#6E6759;margin-top:1.2mm;font-style:italic}

/* ---- interseccao ---- */
.inter{border-left:2px solid var(--primary-900);padding:1mm 0 1mm 5mm;margin:3mm 0}
.inter .num{font-family:var(--font-serif);font-size:15pt;line-height:1.1;margin:0 0 1.4mm;
  background:linear-gradient(92deg,#B8892F,#F0DCA8 52%,#B8892F);
  -webkit-background-clip:text;background-clip:text;color:transparent}
.inter .fonte{font-size:7.8pt;color:#6E6759;letter-spacing:.06em;margin-top:1.2mm}

/* ---- numero grande ---- */
.numerao{text-align:center;border:1px solid var(--border);border-radius:12px;
  padding:5mm 4mm;margin:3.5mm 0;background:var(--accent-soft)}
.numerao .rot{font-size:7.4pt;letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}
.numerao .val{font-family:var(--font-serif);font-size:30pt;line-height:1.05;margin:1.6mm 0 .8mm;
  background:linear-gradient(92deg,#B8892F,#F0DCA8 52%,#B8892F);
  -webkit-background-clip:text;background-clip:text;color:transparent}
.numerao .ano{font-size:10pt;color:var(--primary-700);font-weight:600}

/* ---- fluxo ---- */
.fluxo{display:flex;align-items:stretch;gap:2mm;margin:3mm 0 4mm}
.fluxo .et{flex:1;background:var(--surface);border:1px solid var(--border-soft);
  border-radius:9px;padding:3mm 2.6mm;text-align:center}
.fluxo .et b{display:block;font-size:8.8pt;color:var(--primary-700);margin-bottom:1mm}
.fluxo .et span{font-size:7.6pt;color:var(--muted);line-height:1.3;display:block}
.fluxo .seta{align-self:center;color:var(--primary-900);font-size:11pt}

/* ---- duas colunas ---- */
.duas{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.duas.larga{grid-template-columns:1.25fr 1fr}

/* ---- copy do diagnostico ---- */
.copy{background:var(--surface);border:1px solid var(--border-soft);border-left:2px solid var(--primary-900);
  border-radius:0 9px 9px 0;padding:3.4mm 4.4mm;margin:2.4mm 0 3.6mm}
.copy p{margin:0 0 1.8mm;font-size:9.6pt;line-height:1.45}
.copy p:last-child{margin-bottom:0}
.copy .rot{font-size:7.2pt;letter-spacing:.18em;text-transform:uppercase;color:var(--primary);
  margin:0 0 1.8mm}
.copy ol,.copy ul{font-size:9.6pt}
.copy .pergunta{color:var(--primary-700);font-weight:600}
.copy .principio{font-family:var(--font-serif);font-style:italic;font-size:11pt;color:var(--primary-700)}

/* ---- pilulas de estado ---- */
.tag{display:inline-block;font-size:7.4pt;letter-spacing:.1em;text-transform:uppercase;
  border-radius:20px;padding:.7mm 2.4mm;border:1px solid var(--border);color:var(--primary-700);
  background:var(--accent-soft);white-space:nowrap}
.tag.ok{border-color:rgba(160,200,140,.4);color:#B9D3A6;background:rgba(160,200,140,.1)}
.tag.abre{border-color:rgba(226,199,130,.35);color:#E2C782}

/* ---- fichas de feedback (duas colunas) ---- */
.fichas{display:grid;grid-template-columns:1fr 1fr;gap:2.5mm;margin:2.6mm 0 0}
.ficha{background:var(--surface);border:1px solid var(--border-soft);border-radius:9px;padding:2.8mm 3.2mm}
.ficha .ft{font-size:9.6pt;font-weight:600;color:var(--primary-700);line-height:1.25;margin:0 0 1.2mm}
.ficha .fo{font-size:8.2pt;color:#7A7365;line-height:1.35;margin:0 0 1.6mm;
  padding-bottom:1.6mm;border-bottom:1px solid rgba(244,241,234,.08)}
.ficha .fr{font-size:8.8pt;line-height:1.38;margin:0;color:var(--text)}
.ficha:last-child:nth-child(odd){grid-column:1 / -1}
"""
