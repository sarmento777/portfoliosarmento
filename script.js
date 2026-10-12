(() => {
  'use strict';
  const baseData = window.PORTFOLIO, locales = window.SITE_I18N;
  const languageKey = 'sarmento7-language';
  let locale = 'en';
  try { const saved = localStorage.getItem(languageKey); if(saved === 'en' || saved === 'pt-BR') locale = saved; } catch {}
  function localizedData(){const translations=locales[locale];return {...baseData,projects:baseData.projects.map(project=>({...project,...translations.projects?.[project.id]})),studies:baseData.studies.map(study=>({...study,...translations.studies?.[study.id]}))};}
  let data = localizedData();
  const t=(key,values={})=>(locales[locale].strings[key]||locales.en.strings[key]||key).replace(/\{(\w+)\}/g,(_,name)=>values[name]??'');
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const header=$('.site-header'), nav=$('#main-nav'), menu=$('.menu-button');
  const stage=$('.avatar-stage'), puppet=$('.avatar-puppet'), knot=$('.puppet-knot');
  const rope=$('.avatar-tether'), ropePath=$('#tether-path'), ropeEnd=$('#tether-end');
  const hero=$('.hero'), journey=$('.hero-journey'), grid=$('#project-grid');
  const dialog=$('.project-dialog'), videoContainer=$('#video-container');
  let lastProjectButton=null, toastTimeout, activeDrag=null, frame=0, lastTime=0;
  let targetX=0, targetY=0, currentX=0, currentY=0, velocityX=0, velocityY=0;
  let stageX=0, stageY=0, opacity=1;

  const element=(tag,className,text)=>{const e=document.createElement(tag);if(className)e.className=className;if(text)e.textContent=text;return e;};
  const icon=(id)=>{const s=document.createElementNS('http://www.w3.org/2000/svg','svg');const u=document.createElementNS('http://www.w3.org/2000/svg','use');u.setAttribute('href',`#${id}`);s.append(u);s.setAttribute('aria-hidden','true');return s;};
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

  function translatePage(){
    document.documentElement.lang=locale;
    $$('[data-i18n]').forEach(node=>node.textContent=t(node.dataset.i18n));
    // Rich text comes only from the bundled translation dictionary.
    $$('[data-i18n-html]').forEach(node=>node.innerHTML=t(node.dataset.i18nHtml));
    for(const [marker,attribute] of [['aria','aria-label'],['alt','alt'],['content','content']])$$(`[data-i18n-${marker}]`).forEach(node=>node.setAttribute(attribute,t(node.getAttribute(`data-i18n-${marker}`))));
    $('#language-select').value=locale;
    menu.setAttribute('aria-label',t(menu.getAttribute('aria-expanded')==='true'?'closeMenu':'openMenu'));
    document.dispatchEvent(new Event('portfolio:language-change'));
  }
  translatePage();

  function positionStage(){
    const y=scrollY, mobile=innerWidth<=640;
    header.classList.toggle('scrolled',y>24);
    if(!mobile&&!reducedMotion.matches){
      const h=hero.offsetHeight, p=clamp(y/h,0,1), eased=p*p*(3-2*p);
      stageX=Math.min(1160,innerWidth-(innerWidth>850?96:48))/2*eased;
      stageY=Math.min(y,h+75);
      opacity=1-clamp((y-h-280)/230,0,1);
      stage.style.transform=`translate3d(${stageX}px,${stageY}px,0)`;
    }else{stageX=0;stageY=0;opacity=1;stage.style.transform='';}
    stage.style.opacity=String(opacity);
    const visible=journey.getBoundingClientRect().bottom>0;
    stage.inert=!visible||opacity<.15;
    requestFrame();
  }
  function drawRope(){
    const point=knot.getBoundingClientRect();
    const x=point.left+point.width/2, y=point.top+point.height/2;
    const mobile=innerWidth<=640;
    const bounds=rope.getBoundingClientRect();
    const startY=mobile?y-80:0;
    const startX=mobile?bounds.width-10:x-currentX+(activeDrag?targetX*.15:0);
    rope.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
    const visible=opacity>.05&&y>0&&y<innerHeight&&journey.getBoundingClientRect().bottom>0;
    rope.style.opacity=visible?String(opacity):'0';
    const controlX=mobile?x+70:x-currentX*.3;
    const controlY=mobile?y-20:y-36;
    ropePath.setAttribute('d',`M ${startX.toFixed(2)} ${startY.toFixed(2)} C ${startX.toFixed(2)} ${(startY+(y-startY)*.5).toFixed(2)}, ${controlX.toFixed(2)} ${controlY.toFixed(2)}, ${x.toFixed(2)} ${y.toFixed(2)}`);
    ropeEnd.setAttribute('cx',x.toFixed(2));ropeEnd.setAttribute('cy',y.toFixed(2));
  }
  function render(time){
    frame=0;
    if(time-lastTime<25){requestFrame();return;}lastTime=time;
    if(reducedMotion.matches){currentX=targetX;currentY=targetY;velocityX=velocityY=0;}
    else{
      velocityX=(velocityX+(targetX-currentX)*.12)*.73;
      velocityY=(velocityY+(targetY-currentY)*.12)*.73;
      currentX+=velocityX;currentY+=velocityY;
    }
    puppet.style.setProperty('--puppet-x',`${currentX.toFixed(2)}px`);
    puppet.style.setProperty('--puppet-y',`${currentY.toFixed(2)}px`);
    puppet.style.setProperty('--puppet-rotation',`${clamp(-currentX*.055-velocityX*.35,-11,11).toFixed(2)}deg`);
    drawRope();
    if(activeDrag||Math.abs(targetX-currentX)+Math.abs(targetY-currentY)+Math.abs(velocityX)+Math.abs(velocityY)>.05)requestFrame();
  }
  function requestFrame(){if(!frame)frame=requestAnimationFrame(render);}
  function releasePuppet(){activeDrag=null;targetX=targetY=0;puppet.classList.remove('dragging');requestFrame();}
  puppet.addEventListener('pointerdown',event=>{
    if(event.button!==0||!event.isPrimary)return;
    activeDrag={x:event.clientX-currentX,y:event.clientY-currentY,pointerId:event.pointerId,type:event.pointerType};
    puppet.setPointerCapture(event.pointerId);puppet.classList.add('dragging');
    if(event.pointerType!=='touch')event.preventDefault();requestFrame();
  });
  puppet.addEventListener('pointermove',event=>{
    if(!activeDrag)return;
    const dx=event.clientX-activeDrag.x,dy=event.clientY-activeDrag.y;
    if(activeDrag.type==='touch'&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>10)return;
    targetX=clamp(dx,innerWidth<=640?-85:-140,innerWidth<=640?85:140);
    targetY=activeDrag.type==='touch'?0:clamp(dy,-70,100);requestFrame();
  });
  puppet.addEventListener('pointerup',releasePuppet);puppet.addEventListener('pointercancel',releasePuppet);puppet.addEventListener('lostpointercapture',releasePuppet);
  puppet.addEventListener('keydown',event=>{
    const moves={ArrowLeft:[-20,0],ArrowRight:[20,0],ArrowUp:[0,-15],ArrowDown:[0,15]};
    if(moves[event.key]){event.preventDefault();targetX=clamp(targetX+moves[event.key][0],-140,140);targetY=clamp(targetY+moves[event.key][1],-70,100);requestFrame();}
    else if(event.key==='Escape'){event.preventDefault();releasePuppet();}
  });
  puppet.addEventListener('blur',()=>{if(!activeDrag)releasePuppet();});
  window.addEventListener('scroll',positionStage,{passive:true});window.addEventListener('resize',positionStage);
  $('.hero-avatar').addEventListener('load',positionStage);reducedMotion.addEventListener('change',positionStage);positionStage();

  function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',t('openMenu'));}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',t(open?'closeMenu':'openMenu'));});
  $$('#main-nav a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('click',event=>{if(!header.contains(event.target))closeMenu();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});

  if('IntersectionObserver'in window){
    if(!reducedMotion.matches){document.body.classList.add('motion-enabled');const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');reveal.unobserve(entry.target);}}),{threshold:.08});$$('.reveal').forEach(e=>reveal.observe(e));}
    const sections=['home','projects','studies','about','contact'].map(id=>document.getElementById(id));
    const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting);if(visible.length){const id=visible[visible.length-1].target.id;$$('#main-nav a').forEach(a=>{const active=a.getAttribute('href')===`#${id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}},{rootMargin:'-15% 0px -55% 0px',threshold:0});sections.forEach(e=>observer.observe(e));
  }

  function caseBlock(title,text,extra=''){const block=element('div',`case-block ${extra}`);block.append(element('h4','',title),element('p','',text));return block;}
  function studyBlocks(study){return [caseBlock(t('caseProblem'),study.problem),caseBlock(t('caseContribution'),study.contribution),caseBlock(t('caseDecision'),study.decision),caseBlock(t('caseResult'),study.result),caseBlock(t('caseLimits'),study.limits,'limit-block')];}
  function renderContent(){
  const existing=$$('.study-card'),openIds=existing.length?new Set(existing.filter(detail=>detail.open).map(detail=>detail.id)):null;
  $('#study-list').replaceChildren();grid.replaceChildren();
  data.studies.forEach((study,index)=>{
    const detail=element('details','study-card');detail.id=`study-${study.id}`;detail.open=openIds?openIds.has(detail.id):index===0;
    const summary=element('summary');const title=element('div');title.append(element('h3','',study.title),element('p','',study.subtitle));summary.append(title);
    const body=element('div','study-body'),flow=element('div','study-flow');
    study.flow.forEach((step,i)=>{if(i)flow.append(element('i','','→'));flow.append(element('span','',step));});
    const layout=element('div','study-layout'),text=element('div','study-text');text.append(...studyBlocks(study));
    const panel=element('div','code-panel'),bar=element('div','code-title');bar.append(element('span','',study.file),element('span','','Luau'));
    const pre=element('pre');pre.append(element('code','',study.code));
    const download=element('a','code-source-link',t('fileDownload'));download.href=study.download;download.download=study.file;
    panel.append(bar,pre,element('p','code-explanation',study.codeExplanation),download);layout.append(text,panel);
    const actions=element('div','study-actions'),watch=element('button','text-link',t('watchDemo'));watch.type='button';watch.style.background='none';watch.style.padding='0';watch.append(icon('play'));watch.addEventListener('click',()=>openProject(data.projects.find(project=>project.id===study.project),watch));
    const source=element('a','text-link',t('checkGitHub'));source.href=data.codeRepository;source.target='_blank';source.rel='noopener noreferrer';source.append(icon('external'));actions.append(watch,source);
    body.append(flow,layout,actions);detail.append(summary,body);$('#study-list').append(detail);detail.addEventListener('toggle',positionStage);
  });
  data.projects.forEach((project,index)=>{
    const card=element('button','project-card');card.type='button';card.dataset.category=project.category;card.dataset.project=project.id;card.setAttribute('aria-label',t('watch',{title:project.title}));card.setAttribute('aria-haspopup','dialog');card.style.animationDelay=`${Math.min(index,2)*.04}s`;
    const media=element('div','project-image');
    const [originX,originY]=project.position.split(' ').map(Number.parseFloat);
    media.style.setProperty('--preview-width',`${project.zoom*100}%`);
    media.style.setProperty('--preview-left',`${(1-project.zoom)*originX}%`);
    media.style.setProperty('--preview-top',`${(1-project.zoom)*originY}%`);
    const image=element('img');image.src=project.image;image.alt=t('preview',{title:project.title});image.width=1280;image.height=720;image.loading='lazy';
    const play=element('div','project-play'),circle=element('span');circle.append(icon('play'));play.append(circle);media.append(image,play);
    const info=element('div','project-info'),title=element('div','project-title-row');title.append(element('h3','',project.title),icon('external'));
    const tags=element('div','tags');project.tags.forEach(tag=>tags.append(element('span','',tag)));
    info.append(element('span','project-category',project.label),title,element('p','project-caption',project.caption),tags);
    if(project.study){const badge=element('span','study-badge',t('studyBadge'));badge.prepend(icon('check'));info.append(badge);}
    card.append(media,info);card.addEventListener('click',()=>openProject(project,card));grid.append(card);
  });
  applyFilter();
  }
  function applyFilter(){const filter=$('.project-filters button.active').dataset.filter;let count=0;$$('.project-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;if(!card.hidden)count++;});$('.project-count').textContent=`${count} ${t(count===1?'demoOne':'demoMany')}`;positionStage();}
  renderContent();
  $('#language-select').addEventListener('change',event=>{
    if(!Object.hasOwn(locales,event.target.value))return;
    locale=event.target.value;data=localizedData();translatePage();renderContent();
    clearTimeout(toastTimeout);$('.toast').classList.remove('visible');$('.toast').textContent='';
    try{localStorage.setItem(languageKey,locale);}catch{}
  });
  $$('[data-project]:not(.project-card)').forEach(button=>button.addEventListener('click',()=>openProject(data.projects.find(p=>p.id===button.dataset.project),button)));
  $$('.project-filters button').forEach(button=>button.addEventListener('click',()=>{
    $$('.project-filters button').forEach(other=>{const active=other===button;other.classList.toggle('active',active);other.setAttribute('aria-pressed',String(active));});
    applyFilter();
  }));
  function openProject(project,button){
    if(!project)return;document.dispatchEvent(new Event('portfolio:demo-open'));lastProjectButton=button;
    $('#dialog-title').textContent=project.title;$('#dialog-category').textContent=project.label;$('#dialog-description').textContent=project.description;$('#dialog-tags').replaceChildren(...project.tags.map(tag=>element('span','',tag)));
    const study=data.studies.find(s=>s.id===project.study);const studyContainer=$('#dialog-study');studyContainer.className=study?'dialog-study-content':'';studyContainer.replaceChildren(...(study?studyBlocks(study):[]));
    $('#dialog-source').href=project.source;$('#dialog-source-label').textContent=project.sourceLabel||t('source');
    const mediaLink=$('#dialog-media');
    let media;const chapters=$('#video-chapters');chapters.replaceChildren();chapters.hidden=true;
    if(project.localVideo){
      media=document.createElement('video');media.src=project.localVideo;media.poster=project.image;media.controls=true;media.playsInline=true;media.preload='metadata';media.setAttribute('aria-label',t('demoTitle',{title:project.title}));
      const cues=project.chapters||[],chapterButtons=[];
      if(cues.length){
        chapters.hidden=false;chapters.setAttribute('aria-label',t('chapterLabel'));chapters.append(element('span','chapter-label',t('chapterLabel')));
        cues.forEach(cue=>{const time=`${Math.floor(cue.time/60)}:${String(cue.time%60).padStart(2,'0')}`,jump=element('button','chapter-button',`${t(cue.key)} · ${time}`);jump.type='button';jump.disabled=true;jump.setAttribute('aria-pressed','false');jump.addEventListener('click',()=>{media.currentTime=cue.time;media.play().catch(()=>{});});chapterButtons.push(jump);chapters.append(jump);});
        media.addEventListener('timeupdate',()=>{let current=-1;cues.forEach((cue,index)=>{if(media.currentTime>=cue.time)current=index;});chapterButtons.forEach((jump,index)=>{const active=index===current;jump.classList.toggle('active',active);jump.setAttribute('aria-pressed',String(active));});});
      }
      media.addEventListener('loadedmetadata',()=>{media.currentTime=project.videoStart||0;chapterButtons.forEach(jump=>jump.disabled=false);},{once:true});
      mediaLink.href=project.localVideo;mediaLink.download='katana-sistemas.mp4';mediaLink.removeAttribute('target');$('#dialog-media-label').textContent=t('mediaDownload');
    }else{
      media=document.createElement('iframe');media.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(project.video)}?rel=0&playsinline=1`;media.title=t('demoTitle',{title:project.title});media.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';media.allowFullscreen=true;media.referrerPolicy='strict-origin-when-cross-origin';
      mediaLink.href=`https://www.youtube.com/watch?v=${project.video}`;mediaLink.removeAttribute('download');mediaLink.target='_blank';$('#dialog-media-label').textContent=t('mediaYouTube');
    }
    videoContainer.replaceChildren(media);dialog.showModal();dialog.scrollTop=0;document.body.classList.add('dialog-open');rope.style.opacity='0';
  }
  $('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
  dialog.addEventListener('close',()=>{const localVideo=videoContainer.querySelector('video');if(localVideo){localVideo.pause();localVideo.removeAttribute('src');localVideo.load();}videoContainer.replaceChildren();$('#video-chapters').replaceChildren();$('#video-chapters').hidden=true;document.body.classList.remove('dialog-open');if(lastProjectButton)lastProjectButton.focus({preventScroll:true});positionStage();});
  function toast(message){clearTimeout(toastTimeout);$('.toast').textContent=message;$('.toast').classList.add('visible');toastTimeout=setTimeout(()=>{$('.toast').classList.remove('visible');$('.toast').textContent='';},3000);}
  async function copy(text){try{if(navigator.clipboard&&isSecureContext)await navigator.clipboard.writeText(text);else{const field=element('textarea');field.value=text;field.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(field);field.select();const copied=document.execCommand('copy');field.remove();if(!copied)return false;}return true;}catch{return false;}}
  $$('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{const key=button.dataset.copy,success=await copy(data[key]);toast(success?(key==='email'?t('copiedEmail'):t('copiedDiscord',{value:data.discord})):t('copyFail',{value:data[key]}));if(success){button.replaceChildren(icon('check'));setTimeout(()=>button.replaceChildren(icon('copy')),1600);}}));
  $('#year').textContent=new Date().getFullYear();
})();
