/* =====================================================================
   Engine do deck — render + navegação + scale-to-fit + índice + print
   Sem sobretítulos/labels pequenos em nenhum slide.
   ===================================================================== */
(function(){
  const SLIDES = window.SLIDES || [];
  const money = window.MONEY;
  const deck = document.getElementById('deck');

  const esc = (s)=> (s==null?'':String(s));
  const head = (s,center)=>`
    <div class="head ${center?'center':''}">
      ${s.title?`<h2 class="title ${s.titleClass||''}">${esc(s.title)}</h2>`:''}
      ${s.lead?`<p class="lead">${esc(s.lead)}</p>`:''}
    </div>`;
  const bullets = (arr)=> arr&&arr.length?`<ul class="bullets">${arr.map(b=>`<li>${b}</li>`).join('')}</ul>`:'';
  const cardHTML = (c)=>`
    <div class="card">
      ${c.num!=null?`<div class="num">${c.num}</div>`:''}
      <h3>${esc(c.h)}</h3>
      ${c.p?`<p>${esc(c.p)}</p>`:''}
    </div>`;

  const R = {
    cover:(s)=>`<div class="wordmark">${esc(s.wordmark)}</div><div class="hair"></div>${s.tag?`<div class="tag">${esc(s.tag)}</div>`:''}`,

    statement:(s)=>`${head(s,true)}${s.bullets?`<div style="max-width:62ch;margin:8px auto 0">${bullets(s.bullets)}</div>`:''}`,

    divider:(s)=>`<div class="rule"></div><h2 class="title">${esc(s.title)}</h2>${s.sub?`<div class="sub">${esc(s.sub)}</div>`:''}`,

    bio:(s)=>`
      <div class="bio">
        <div class="photo">${s.photo?`<img src="${esc(s.photo)}" alt="Daniel Souza">`:'[ FOTO DE DANIEL SOUZA ]'}</div>
        <div>
          <h2 class="title sm" style="margin-bottom:14px">${esc(s.title)}</h2>
          ${(s.paras||[]).map(p=>`<p class="lead" style="font-size:16.5px;margin-bottom:10px">${esc(p)}</p>`).join('')}
          <div style="margin-top:8px">${bullets(s.marcos)}</div>
        </div>
      </div>`,

    proof:(s)=>`${head(s)}
      <div class="proof-grid">${s.items.map(it=>{
        const o=typeof it==='string'?{label:it}:it;
        return o.img
          ? `<figure class="shot"><img src="${esc(o.img)}" alt="${esc(o.label||'')}"></figure>`
          : `<div class="ph">[ ${esc(o.label)} ]</div>`;
      }).join('')}</div>`,

    traj:(s)=>`
      <div class="bio" style="grid-template-columns:1.1fr .9fr">
        <div>
          <h2 class="title" style="margin-bottom:26px">${esc(s.title)}</h2>
          ${bullets(s.marcos)}
        </div>
        <div class="photo" style="min-height:430px">
          ${s.photo?`<img src="${esc(s.photo)}" alt="Daniel no palco">`:'[ FOTO COM TELÃO ]'}
        </div>
      </div>`,

    list:(s)=>`${head(s)}
      <div class="col ${s.theme==='red'?'':'good'}" style="flex:1">
        ${bullets(s.bullets)}
        ${s.foot?`<p class="foot-note">${esc(s.foot)}</p>`:''}
      </div>`,

    cards:(s)=>`${head(s)}
      <div class="grid c${s.cols||3}" style="flex:1;align-content:center">${s.cards.map(cardHTML).join('')}</div>`,

    mandala:(s)=>`${head(s,true)}
      <div class="mandala">
        ${s.petals.map((p,i)=>`<div class="petal p${i+1}"><div class="pk">${esc(p.k)}</div><p>${esc(p.p)}</p></div>`).join('')}
        <div class="core">${esc(s.core)}</div>
      </div>`,

    core:(s)=>`
      <div class="head">
        <h2 class="title">${esc(s.title)}</h2>
        <p class="lead">${esc(s.lead)}</p>
        ${s.para?`<p class="lead" style="font-size:19px">${esc(s.para)}</p>`:''}
      </div>
      ${s.subq?`<h3 class="subq">${esc(s.subq)}</h3>`:''}
      ${bullets(s.bullets)}`,

    pillar:(s)=>`
      <div class="two">
        <div>
          <h2 class="title sm" style="margin:0 0 6px">${esc(s.title)}</h2>
          <p class="lead" style="font-size:21px;margin-bottom:14px;color:var(--blue)">${esc(s.sub)}</p>
          ${s.lead?`<p class="lead" style="font-size:16.5px;margin-bottom:14px">${esc(s.lead)}</p>`:''}
          ${s.listTitle?`<h3 class="subq" style="margin-bottom:10px">${esc(s.listTitle)}</h3>`:''}
          ${bullets(s.bullets)}
        </div>
        <div class="panel-illo">${s.img?`<img src="${esc(s.img)}" alt="">`:`<div class="big-num">${esc(s.n)}</div>`}</div>
      </div>`,

    phases:(s)=>`${head(s,true)}
      <div class="timeline">${s.steps.map(st=>`
        <div class="tl-step"><div class="dot">${esc(st.n)}</div><h4>${esc(st.h)}</h4><p>${esc(st.p)}</p></div>`).join('')}</div>`,

    phase:(s)=>`
      <div class="phase-wrap">
        <h2 class="phase-title"><span class="accent">FASE ${esc(s.n)}</span> — ${esc(s.name)}</h2>
        <p class="phase-obj">Objetivo principal: ${esc(s.objetivo)}</p>
        <h3 class="phase-metas"><span class="accent">Metas</span> da Fase</h3>
        <div class="metas c${Math.min(s.metas.length,4)}">${s.metas.map((m,i)=>`
          <div class="card"><div class="num">${String(i+1).padStart(2,'0')}</div><p style="font-size:16px;color:inherit">${esc(m)}</p></div>`).join('')}</div>
      </div>`,

    imgslide:(s)=>`<img class="full-img" src="${esc(s.img)}" alt="">`,

    consists:(s)=>`${head(s)}
      <div class="grid c2" style="flex:1;align-content:center">
        ${s.points.map((p,i)=>`<div class="card"><div class="num">${i+1}</div><h3 style="font-size:19px">${esc(p)}</h3></div>`).join('')}
      </div>`,

    cargo:(s)=>`
      <div class="head">
        <h2 class="title sm">${esc(s.title)}</h2>
        <p class="lead" style="font-size:18px">${esc(s.lead)}</p>
        ${s.para?`<p class="lead" style="font-size:15.5px">${esc(s.para)}</p>`:''}
      </div>
      <div class="grid c${s.cards.length>4?3:2}" style="flex:1;align-content:center">
        ${s.cards.map(cardHTML).join('')}
      </div>`,

    solo:(s)=>`
      <div class="two">
        <div>
          <h2 class="title ${s.h.length>42?'sm':''}" style="margin-bottom:10px">${esc(s.h)}</h2>
          ${s.d&&!s.bonus?`<p class="lead" style="font-size:21px;color:var(--blue);margin-bottom:14px">${esc(s.d)}</p>`:''}
          <p class="lead" style="font-size:19px">${esc(s.p)}</p>
        </div>
        <div class="panel-illo">
          ${s.img?`<img src="${esc(s.img)}" alt="">`:`
            <div class="solo-meta">
              <div class="solo-cat">${esc(s.cat)}</div>
              <div class="big-num">${String(s.idx).padStart(2,'0')}</div>
              <div class="solo-of">de ${s.total}</div>
            </div>
            <div class="solo-ph">[ print ou foto do entregável ]</div>`}
        </div>
      </div>`,

    deliverable:(s)=>`${head(s)}
      <div class="grid c${s.cards.length>4?3:2}" style="flex:1;align-content:center">
        ${s.cards.map(cardHTML).join('')}
      </div>`,

    ask:(s)=>`<div class="q">?</div><h2 class="title">${esc(s.title)}</h2>${s.lead?`<p class="lead" style="text-align:center;margin:18px auto 0">${esc(s.lead)}</p>`:''}`,

    vxp:(s)=>`
      <div class="head center"><h2 class="title sm">Antes de falarmos em preço, preciso te mostrar uma coisa</h2>
      <p class="lead">Existe uma diferença fundamental entre PREÇO e VALOR.</p></div>
      <div class="vxp">
        <div class="box price"><div class="k">Preço</div><p>É quanto algo custa em dinheiro.</p></div>
        <div class="x">×</div>
        <div class="box value"><div class="k">Valor</div><p>É a transformação e resultado que aquilo gera.</p></div>
      </div>`,

    anchor:(s)=>`${head(s)}
      <div class="anchor-list">
        ${s.items.map(it=>`<div class="row ${it.group?'group':''} ${it.sub?'sub':''}"><span class="nm">${esc(it.nm)}</span><span class="dots"></span><span class="vl">${money(it.vl)}</span></div>`).join('')}
      </div>
      <div class="total-line"><span class="t">Total recebido</span><span class="v">${money(s.total)}</span></div>
      ${s.question?`<p class="anchor-q">${esc(s.question)}</p>`:''}`,

    testimonials:(s)=>`
      <div class="head"><h2 class="title sm">Provas sociais</h2></div>
      <div class="testi-grid">${s.items.map(t=>`
        <div class="testi"><div class="ph">[ ${esc(t.ctx||'depoimento')} ]</div><div class="who">${esc(t.who)}<span>${esc(t.role||'cliente Simple')}</span></div></div>`).join('')}</div>`,

    'price-table':(s)=>{
      const p=s.price;
      return `
      <div class="head"><h2 class="title sm">${esc(s.title)}</h2></div>
      <div class="pt-wrap">
        <div class="anchor-list pt-list">
          ${s.items.map(it=>`<div class="row"><span class="nm">${esc(it.nm)}</span><span class="vl">${money(it.vl)}</span></div>`).join('')}
        </div>
        <div class="price-card">
          <div class="k">Valor</div>
          <div class="pv">${money(p.full)}</div>
          <div class="pc-vista">à vista</div>
          <div class="pp">ou ${esc(p.instal)}</div>
        </div>
      </div>`;
    },

    caf:(s)=>`
      <div class="caf">
        <h2 class="title sm">Economia comercial,<br>administrativa e financeira</h2>
        <p class="lead" style="text-align:center">Desconto repassado no ato da apresentação</p>
        <div class="timeline-bar"><span class="seg">Custos C.A.F. · 1D</span><span class="seg">30D</span></div>
        <p class="lead" style="text-align:center;max-width:62ch">Reduz o custo comercial e, em agradecimento e incentivo, repassamos essa economia gerada 100% ao cliente pelo poder de decisão.</p>
      </div>`,

    'hero-price':(s)=>`
      <div class="rule"></div>
      <div class="regular">Preço regular: <s>${money(s.regular)}</s></div>
      <div class="big">${money(s.hero)}</div>
      <div class="inst">à vista · ou ${esc(s.instal)}</div>
      <p class="note">Valor protagonista — válido apenas com a decisão na call.</p>`,
  };

  /* ---------- montar slides ---------- */
  const NAVY = new Set(['cover','divider','statement','ask','hero-price','caf']);
  SLIDES.forEach((s,i)=>{
    const el=document.createElement('section');
    const cls=['slide'];
    if(s.type==='cover') cls.push('cover');
    if(s.type==='statement') cls.push('statement');
    if(s.type==='divider') cls.push('divider');
    if(s.type==='ask') cls.push('ask');
    if(s.type==='hero-price') cls.push('hero-price');
    if(s.type==='imgslide') cls.push('imgslide');
    const theme = s.theme || (NAVY.has(s.type)?'navy':'light');
    if(theme==='navy') cls.push('navy');
    if(theme==='red') cls.push('red');
    if(s.type==='deliverable' && s.cards && s.cards.length>4) cls.push('dense');
    if(s.type==='cargo' && s.cards && s.cards.length>4) cls.push('dense');
    if(s.type==='anchor'){ cls.push('anchor-slide'); if(s.items && s.items.length>13) cls.push('tight'); }
    el.className=cls.join(' ');
    el.dataset.idx=i;
    if(s.bg) el.style.background=s.bg;
    el.innerHTML=(R[s.type]?R[s.type](s):`<div class="head"><h2 class="title">${esc(s.title||s.type)}</h2></div>`);
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
    slidesEl.forEach(el=>el.classList.remove('active'));
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
    const sc=Math.min(window.innerWidth/1280, window.innerHeight/720);
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

  /* ---------- índice ---------- */
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

  /* ---------- deep-link ---------- */
  window.addEventListener('hashchange',()=>{
    const h=parseInt(location.hash.replace('#',''),10);
    if(!isNaN(h) && h-1!==cur) show(h-1,false);
  });
  window.deckGo=(n)=>show(n-1);
  const startHash=parseInt(location.hash.replace('#',''),10);
  show(!isNaN(startHash)?startHash-1:0,false);
})();
