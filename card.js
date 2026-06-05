/* =====================================================================
   디지털 명함 — 공유 렌더링 로직 (수정 불필요)
   각 폴더의 profile.js 값을 읽어 카드를 그립니다.
   ===================================================================== */
(function () {
  var P = window.PROFILE || {};

  // 미니멀 라인 아이콘 (단색, 에디토리얼 톤)
  var ICONS = {
    phone:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>',
    email:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    kakao:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3C6.8 3 3 6.3 3 10.3c0 2.6 1.8 4.9 4.4 6.1-.2.7-.7 2.6-.8 3 0 0 0 .2.1.3.1 0 .2 0 .3-.1.4-.3 3-2 3.6-2.5.5.1 1 .1 1.5.1 5.2 0 9-3.3 9-7.4S17.2 3 12 3z"/></svg>',
    website:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>',
    pdf:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>',
    download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/></svg>',
    threads:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c-4.5 0-7.5-3-7.5-9S7.5 3 12 3c3.6 0 6 1.8 6.8 4.7M9 13.5c0-2 1.4-3.2 3.3-3.2 2.2 0 3.4 1.5 3.4 4.2 0 2-1.2 3.5-3.1 3.5-1.6 0-2.6-1-2.6-2.3 0-1.4 1.2-2.2 3-2.2 2.6 0 4.5 1.4 4.5 4"/></svg>',
    youtube:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/></svg>',
    link:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>'
  };

  var ARROW = '<svg class="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

  // type별 동작 정의
  function build(link) {
    var t = (link.type || 'link').toLowerCase();
    var v = link.value || '#';
    var a = document.createElement('a');
    a.className = 'lnk';
    a.rel = 'noopener noreferrer';

    if (t === 'phone') {
      a.href = 'tel:' + v.replace(/[^0-9+]/g, '');
    } else if (t === 'email') {
      a.href = 'mailto:' + v;
    } else if (t === 'download') {
      a.href = v; a.setAttribute('download', '');
    } else {
      a.href = v; a.target = '_blank';
    }

    var icon = ICONS[t] || ICONS.link;
    a.innerHTML =
      '<span class="ic" aria-hidden="true">' + icon + '</span>' +
      '<span class="tx"></span>' + ARROW;
    a.querySelector('.tx').textContent = link.label || v;
    a.setAttribute('aria-label', link.label || v);
    return a;
  }

  function init() {
    var root = document.getElementById('card');
    if (!root) return;

    // 문서 제목
    document.title = (P.name ? P.name + ' · ' : '') + (P.company || '명함');

    // 헤더
    var hd = document.createElement('header');
    hd.className = 'hd';

    var avatar = '<div class="avatar">' +
      (P.photo
        ? '<img src="' + P.photo + '" alt="' + (P.name || '') + '">'
        : (P.name ? P.name.trim().charAt(0) : '?')) +
      '</div>';

    hd.innerHTML =
      avatar +
      '<h1 class="name"></h1>' +
      (P.title ? '<p class="title"></p>' : '') +
      (P.company ? '<p class="company"></p>' : '') +
      '<div class="divider"></div>';
    if (P.name)    hd.querySelector('.name').textContent = P.name;
    if (P.title)   hd.querySelector('.title').textContent = P.title;
    if (P.company) hd.querySelector('.company').textContent = P.company;
    root.appendChild(hd);

    // 링크
    var wrap = document.createElement('div');
    wrap.className = 'links';
    (P.links || []).forEach(function (link, i) {
      var el = build(link);
      el.style.animationDelay = (0.30 + i * 0.05) + 's';
      wrap.appendChild(el);
    });
    root.appendChild(wrap);

    // 푸터
    var ft = document.createElement('div');
    ft.className = 'ft';
    ft.textContent = P.company || '';
    root.appendChild(ft);

    // 개인 포인트색 오버라이드
    if (P.accent) document.documentElement.style.setProperty('--accent', P.accent);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
