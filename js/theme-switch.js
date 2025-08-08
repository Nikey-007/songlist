<script>
  const btn = document.getElementById('theme-switch-btn');

  btn.addEventListener('click', () => {
    const body = document.body;
    if (body.classList.contains('bg-theme-1')) {
      body.classList.remove('bg-theme-1');
      body.classList.add('bg-theme-2');
    } else {
      body.classList.remove('bg-theme-2');
      body.classList.add('bg-theme-1');
    }
  });
</script>
