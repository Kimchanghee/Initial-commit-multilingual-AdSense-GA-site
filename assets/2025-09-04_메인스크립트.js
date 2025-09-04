(function(){
  const sel=document.getElementById('languageSelect');
  const supported=Object.keys(i18nMap);
  const saved=localStorage.getItem('lang');
  let lang=(new URLSearchParams(location.search).get('lang'))||saved||navigator.language||'en';
  lang=lang.toLowerCase();
  if(!supported.includes(lang)) { const base=lang.split('-')[0]; lang=supported.includes(base)?base:'en'; }

  function apply(){
    const t=i18nMap[lang]||i18nMap.en;
    const titleNode=document.querySelector('[data-i18n="title"]');
    if(titleNode) titleNode.textContent=t.title;
    const p=document.querySelector('[data-i18n="cookie_message"]');
    if(p) p.textContent=t.cookie_message;
    const btn=document.getElementById('acceptCookies');
    if(btn) btn.textContent=t.accept;
    sel.value=lang;
  }

  sel.innerHTML=supported.map(l=>`<option value="${l}">${l}</option>`).join('');
  sel.onchange=()=>{lang=sel.value;localStorage.setItem('lang',lang);const u=new URL(location.href);u.searchParams.set('lang',lang);location.href=u;};
  apply();

  // Consent + activation
  window.GA_ID="G-XXXXXXXXXX"; // 교채 필요
  const banner=document.getElementById('cookie-banner');
  const ok=localStorage.getItem('cookie-ok');
  function enable(){
    // GA
    if(window.GA_ID && window.GA_ID!=='G-XXXXXXXXXX'){
      window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date()); gtag('config', window.GA_ID, {anonymize_ip:true});
    }
    // AdSense
    document.querySelectorAll('.adsbygoogle').forEach(()=>{try{(adsbygoogle=window.adsbygoogle||[]).push({});}catch(e){}});
  }
  if(ok==='1'){ enable(); } else { if(banner) banner.style.display='block'; }
  const accept=document.getElementById('acceptCookies');
  if(accept) accept.onclick=()=>{ localStorage.setItem('cookie-ok','1'); if(banner) banner.style.display='none'; enable(); };
})();
