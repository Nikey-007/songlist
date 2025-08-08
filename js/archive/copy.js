document.addEventListener('click', function (e) {
  if (e.target.classList.contains('copy-btn')) {
    const text = e.target.getAttribute('data-copy-text');
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      const toast = document.getElementById('toast');
      toast.textContent = `已复制: ${text}`;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2000);
    });
  }
});