/* =====================================================================
   Engine do deck — render + navegação + scale-to-fit + índice + print
   ===================================================================== */
(function(){
  const SLIDES = window.SLIDES || [];
  const money = window.MONEY;
  const deck = document.getElementById('deck');
  const stage = document.getElementById('stage');

  /* ---------- helpers de render ---------- */
  const esc = (s)=> (s==null?'':String(s));
  const badge = (t)=> t ? `<div class="track-badge">${esc(t)}</div>` : '';
  const head = (s,center)=>`
    <div class="head ${center?'center':''}">
      ${s.kicker?`<div class="kicker ${s.kickerWarn?'warn':''}">${esc(s.kicker)}</div>`:''}
      ${s.title?`<h2 class="title ${s.titleClass||''}">${esc(s.title)}</h2>`:''}
      ${s.lead?`<p class="lead">${esc(s.lead)}</p>`:''}
    </div>`;
  const bullets = (arr)=> arr&&arr.length?`<ul class="bullets">${arr.map(b=>`<li>${b}</li>`).join('')}</ul>`:'';
  const cardHTML = (c,i)=>`
    <div class="card">
      ${c.ico?`<div class="ico">${c.ico}</div>`: (c.num!=null?`<div class="num">${c.num}</div>`:'')}
      <h3>${esc(c.h)}</h3>
      ${c.p?`<p>${esc(c.p)}</p>`:''}
    </div>`;

  const R = {
    cover:(s)=>`<div class="wordmark">${esc(s.wordmark)}</div>${s.tag?`<div class="tag">${esc(s.tag)}</div>`:''}`,

    statement:(s)=>`${head(s,true)}${s.bullets?`<div style="max-width:60ch;margin:8px auto 0">${bullets(s.bullets)}</div>`:''}`,

    divider:(s)=>`<div class="diamond">${esc(s.diamond||'◆ ◆ ◆')}</div><h2 class="title">${esc(s.title)}</h2>${s.sub?`<div class="sub">${esc(s.sub)}</div>`:''}`,

    bio:(s)=>`${badge('Autoridade')}
      <div class="bio">
        <div class="photo">${s.photo?`<img src="${esc(s.photo)}" alt="Daniel Souza">`:'[ FOTO DE DANIEL SOUZA ]'}</div>
        <div>
          ${head(s)}
          ${bullets(s.marcos)}
        </div>
      </div>`,

    proof:(s)=>`${head(s)}
      <div class="proof-grid">${s.items.map(it=>{
        const o=typeof it==='string'?{label:it}:it;
        return o.img
          ? `<figure class="shot"><img src="${esc(o.img)}" alt="${esc(o.label||'')}"><figcaption>${esc(o.label||'')}</figcaption></figure>`
          : `<div class="ph">[ ${esc(o.label)} ]</div>`;
      }).join('')}</div>`,

    list:(s)=>{
      const tone = s.tone==='bad'?'col bad':s.tone==='good'?'col good':'';
      return `${head(s)}
        <div class="${tone}" style="flex:1">
          ${s.tone?`<div class="tag">${s.tone==='bad'?'"Inferno"':'"Céu"'}</div>`:''}
          ${bullets(s.bullets)}
          ${s.foot?`<p class="muted" style="margin-top:18px;font-size:17px;font-style:italic">${esc(s.foot)}</p>`:''}
        </div>`;
    },

    cards:(s)=>`${head(s)}
      <div class="grid c${s.cols||3}" style="flex:1;align-content:center">${s.cards.map(cardHTML).join('')}</div>`,

    deliverable:(s)=>`${badge(s.sec)}${head(s)}
      <div class="grid c${s.cards.length>4?3:(s.cards.length===1?1:2)}" style="flex:1;align-content:center">${s.cards.map(cardHTML).join('')}</div>`,

    mandala:(s)=>`${head(s,true)}
      <div class="mandala">
        ${s.petals.map((p,i)=>`<div class="petal p${i+1}"><div class="pk">${esc(p.k)}</div><p>${esc(p.p)}</p></div>`).join('')}
        <div class="core">${esc(s.core)}</div>
      </div>`,

    pillar:(s)=>`${badge('Os 4 pilares')}
      <div class="two">
        <div>
          <div class="kicker">Pilar ${esc(s.n)}</div>
          <h2 class="title sm" style="margin:12px 0 6px">${esc(s.title)}</h2>
          <p class="lead" style="font-size:21px;margin-bottom:14px">${esc(s.sub)}</p>
          ${s.lead?`<p class="muted" style="font-size:17px;margin-bottom:12px">${esc(s.lead)}</p>`:''}
          ${bullets(s.bullets)}
        </div>
        <div class="panel-illo"><div class="big-num">${esc(s.n)}</div></div>
      </div>`,

    phases:(s)=>`${head(s,true)}
      <div class="timeline">${s.steps.map(st=>`
        <div class="tl-step"><div class="dot">${esc(st.n)}</div><h4>${esc(st.h)}</h4><p>${esc(st.p)}</p></div>`).join('')}</div>`,

    phase:(s)=>`${badge('Implementação')}
      <div class="phase-head">
        <span class="pnum">FASE ${esc(s.n)}</span>
        <h2 class="title sm">${esc(s.name)}</h2>
        ${s.dur?`<span class="muted" style="margin-left:auto;font-family:var(--font-display)">${esc(s.dur)}</span>`:''}
      </div>
      <p class="lead" style="font-size:21px"><b>Objetivo:</b> ${esc(s.objetivo)}</p>
      <div class="kicker" style="margin-top:26px">Metas da fase</div>
      <div class="metas">${s.metas.map((m,i)=>`<div class="card"><div class="num">${String(i+1).padStart(2,'0')}</div><p style="color:inherit;font-size:16px">${esc(m)}</p></div>`).join('')}</div>`,

    cases:(s)=>`${head(s)}
      <table class="cases">
        <thead><tr><th>Projeto</th><th>Faturamento</th><th>Investimento</th><th>CAC</th></tr></thead>
        <tbody>
          ${[1,2,3,4].map(()=>`<tr><td>—</td><td class="num">—</td><td class="num">—</td><td class="num">—</td></tr>`).join('')}
        </tbody>
      </table>
      <p class="muted" style="margin-top:18px;font-size:14px;font-style:italic">${esc(s.note)}</p>`,

    consists:(s)=>`${head(s)}
      <div class="grid c2" style="flex:1;align-content:center">
        ${s.points.map((p,i)=>`<div class="card"><div class="num">${i+1}</div><h3 style="font-size:19px">${esc(p)}</h3></div>`).join('')}
      </div>`,

    ask:(s)=>`<div class="q">${esc(s.q||'?')}</div><h2 class="title">${esc(s.title)}</h2>${s.lead?`<p class="lead" style="text-align:center;margin:18px auto 0">${esc(s.lead)}</p>`:''}`,

    vxp:(s)=>`${badge(s.sec)}
      <div class="head center"><div class="kicker">Antes do preço</div><h2 class="title sm">Existe uma diferença entre preço e valor</h2></div>
      <div class="vxp">
        <div class="box price"><div class="k">Preço</div><p>É quanto algo custa em dinheiro.</p></div>
        <div class="x">×</div>
        <div class="box value"><div class="k">Valor</div><p>É a transformação e o resultado que aquilo gera.</p></div>
      </div>`,

    anchor:(s)=>`${badge(s.sec)}${head(s)}
      <div class="anchor-list">
        ${s.items.map(it=>`<div class="row ${it.group?'group':''} ${it.sub?'sub':''}"><span class="nm">${esc(it.nm)}</span><span class="dots"></span><span class="vl">${money(it.vl)}</span></div>`).join('')}
      </div>
      <div class="total-line"><span class="t">Total recebido</span><span class="v">${money(s.total)}</span></div>
      ${s.question?`<p class="anchor-q">${esc(s.question)}</p>`:''}`,

    testimonials:(s)=>`${badge(s.sec)}
      <div class="head"><div class="kicker">Prova social</div><h2 class="title sm">Quem já vive esse resultado</h2></div>
      <div class="testi-grid">${s.items.map(t=>`
        <div class="testi"><div class="ph">[ ${esc(t.ctx||'depoimento')} ]</div><div class="who">${esc(t.who)}<span>${esc(t.role||'cliente Simple Acc')}</span></div></div>`).join('')}</div>`,

    'price-table':(s)=>{
      const p=s.price;
      return `${badge(s.sec)}
      <div class="head"><div class="kicker">Preço de tabela</div><h2 class="title sm">${esc(s.title)}</h2></div>
      <div class="price-table-wrap">
        <p class="lead">${esc(s.note)}<br><br><span class="muted" style="font-size:16px">Toda a negociação acontece a partir deste valor.</span></p>
        <div class="price-card">
          <div class="k">Investimento</div>
          <div class="pv">${money(p.full)}</div>
          <div class="muted" style="font-family:var(--font-display)">à vista</div>
          <div class="pp" style="margin-top:10px">ou ${esc(p.instal)}</div>
        </div>
      </div>`;
    },

    caf:(s)=>`${badge(s.sec)}
      <div class="caf">
        <div class="kicker">Justificativa para condição especial</div>
        <h2 class="title sm">Economia comercial, administrativa e financeira</h2>
        <div class="timeline-bar"><span class="seg">Custo C.A.F. · 1 a 30 dias de follow-up</span><span class="seg">Decisão agora → 0 custo</span></div>
        <p class="lead" style="text-align:center;max-width:64ch">Fechar agora elimina todo o custo administrativo e financeiro de um follow-up de no mínimo 30 dias. Esse custo evitado é repassado 100% a você como desconto — em agradecimento ao seu poder de decisão.</p>
      </div>`,

    'hero-price':(s)=>{
      const hasDiscount = s.regular && s.hero && s.regular!==s.hero;
      return `${badge(s.sec)}
      <div class="star">✦ ✦ ✦</div>
      ${hasDiscount?`<div class="regular">Preço regular: <s>${money(s.regular)}</s></div>`:`<div class="regular">Condição final</div>`}
      <div class="big">${money(s.hero)}</div>
      <div class="inst">à vista · ou ${esc(s.instal)}</div>
      <p class="note">${esc(s.note)}</p>`;
    },
  };

  /* ---------- montar slides no DOM ---------- */
  SLIDES.forEach((s,i)=>{
    const el=document.createElement('section');
    const cls=['slide'];
    if(s.type==='cover') cls.push('cover');
    if(s.type==='statement') cls.push('statement');
    if(s.type==='divider') cls.push('divider');
    if(s.type==='ask') cls.push('ask');
    if(s.type==='hero-price') cls.push('hero-price');
    if(s.glow) cls.push('glow');
    if(s.light) cls.push('light');
    if(s.type==='deliverable' && s.cards && s.cards.length>4) cls.push('dense');
    if(s.type==='anchor'){ cls.push('anchor-slide'); if(s.items && s.items.length>13) cls.push('tight'); }
    el.className=cls.join(' ');
    el.dataset.idx=i;
    let inner='';
    if(s.grid) inner+='<div class="bg-grid"></div>';
    inner+= (R[s.type]?R[s.type](s):`<div class="head"><h2 class="title">${esc(s.title||s.type)}</h2></div>`);
    el.innerHTML=inner;
    deck.appendChild(el);
  });

  const slidesEl=[...deck.querySelectorAll('.slide')];
  const total=slidesEl.length;

  /* ---------- navegação ---------- */
  let cur=0;
  const counter=document.getElementById('counter');
  const progress=document.getElementById('progress');
  function show(n,push){
    n=Math.max(0,Math.min(total-1,n));
    slidesEl.forEach(el=>el.classList.remove('active','prev'));
    slidesEl[n].classList.add('active');
    cur=n;
    counter.textContent=`${n+1} / ${total}`;
    progress.style.width=((n)/(total-1)*100)+'%';
    if(push!==false) history.replaceState(null,'','#'+(n+1));
  }
  const next=()=>show(cur+1);
  const prev=()=>show(cur-1);

  document.getElementById('next').onclick=next;
  document.getElementById('prev').onclick=prev;

  /* ---------- scale-to-fit ---------- */
  function fit(){
    const pad=0;
    const sw=(window.innerWidth-pad)/1280;
    const sh=(window.innerHeight-pad)/720;
    const sc=Math.min(sw,sh);
    deck.style.transform=`scale(${sc})`;
  }
  window.addEventListener('resize',fit); fit();

  /* ---------- teclado ---------- */
  document.addEventListener('keydown',(e)=>{
    if(document.getElementById('menu').classList.contains('open')){
      if(e.key==='Escape') toggleMenu(false);
      return;
    }
    switch(e.key){
      case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown': e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp': e.preventDefault(); prev(); break;
      case 'Home': show(0); break;
      case 'End': show(total-1); break;
      case 'f': case 'F': toggleFull(); break;
      case 'm': case 'M': toggleMenu(); break;
      case 'p': case 'P': window.print(); break;
    }
  });

  function toggleFull(){
    if(!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  /* ---------- índice / menu (jump por seção e oferta) ---------- */
  const menu=document.getElementById('menu');
  function buildMenu(){
    const wrap=document.getElementById('menu-body');
    const groups=[];
    SLIDES.forEach((s,i)=>{
      if(!s.label) return;
      let g=groups.find(x=>x.sec===s.sec);
      if(!g){ g={sec:s.sec,items:[]}; groups.push(g); }
      g.items.push({i,label:s.label});
    });
    wrap.innerHTML=groups.map(g=>`
      <div class="menu-section">
        <div class="ms-title">${esc(g.sec)}</div>
        <div class="menu-grid">
          ${g.items.map(it=>`<button class="menu-item" data-go="${it.i}"><span class="mi-n">${it.i+1}</span><span>${esc(it.label)}</span></button>`).join('')}
        </div>
      </div>`).join('');
    wrap.querySelectorAll('.menu-item').forEach(b=>b.onclick=()=>{ show(+b.dataset.go); toggleMenu(false); });
  }
  function toggleMenu(force){
    const open = force!==undefined?force:!menu.classList.contains('open');
    menu.classList.toggle('open',open);
  }
  document.getElementById('menu-btn').onclick=()=>toggleMenu();
  document.getElementById('menu-close').onclick=()=>toggleMenu(false);
  buildMenu();

  /* ---------- deep-link por hash (#n) ---------- */
  window.addEventListener('hashchange',()=>{
    const h=parseInt(location.hash.replace('#',''),10);
    if(!isNaN(h) && h-1!==cur) show(h-1,false);
  });
  window.deckGo=(n)=>show(n-1);

  /* ---------- início (hash) ---------- */
  const startHash=parseInt(location.hash.replace('#',''),10);
  show(!isNaN(startHash)?startHash-1:0,false);
})();
