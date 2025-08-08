document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.copy-btn').forEach(el => {
    el.addEventListener('click', () => {
      const text = el.getAttribute('data-copy-text');
      if (!text) return;

      // 只在点击事件中调用
      navigator.clipboard.writeText(text).then(() => {
        alert("已复制：" + text);
      }).catch(err => {
        alert("复制失败：" + err);
      });
    });
  });
});