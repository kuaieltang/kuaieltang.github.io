/* 站点导航：资源库下拉（鼠标悬停由 CSS 处理，这里管触摸/点击与键盘） */
(function () {
  var drops = [].slice.call(document.querySelectorAll('.nav-drop'));

  function closeAll(except) {
    drops.forEach(function (d) {
      if (d !== except) {
        d.classList.remove('is-open');
        var b = d.querySelector('.nav-drop-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });
  }

  drops.forEach(function (d) {
    var btn = d.querySelector('.nav-drop-btn');
    if (!btn) return;
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
