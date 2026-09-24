/* 站点导航：资源库下拉（鼠标悬停由 CSS 处理，这里管触摸/点击与键盘） */
(function () {
  var drops = [].slice.call(document.querySelectorAll('.nav-drop'));

  function closeAll(except) {
    drops.forEach(function (d) {
      if (d !== except) {
        d.classList.remove('is-open');
        var b = d.querySelector('.nav-drop-btn');
        if (b && b.tagName === 'BUTTON') b.setAttribute('aria-expanded', 'false');
      }
    });
  }

  drops.forEach(function (d) {
    var btn = d.querySelector('.nav-drop-btn');
    if (!btn) return;

    // 「资源库」是链接型按钮：点击直接进入资源库总览页。
    // 桌面端菜单靠 CSS :hover 展开；触屏点击即跳转到总览页（总览页列了全部资料），
    // 所以这里不拦截默认行为、也不绑定展开逻辑。
    if (btn.tagName === 'A') return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var willOpen = !d.classList.contains('is-open');
      closeAll(d);
      d.classList.toggle('is-open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
    // 键盘 Esc 关闭
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        d.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.nav-drop')) closeAll(null);
  });
})();
