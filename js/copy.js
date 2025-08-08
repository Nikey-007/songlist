function copyText(text) { 
    navigator.clipboard.writeText(text).then(function() {
        showToast("已复制: " + text);
    }, function(err) {
        showToast("复制失败: " + err);
    });
}

// 非阻断式提示（Toast）
function showToast(msg) {
    const toast = document.createElement("div");
    toast.innerText = msg;
    toast.style.position = "fixed";
    toast.style.bottom = "40px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#333";
    toast.style.color = "#fff";
    toast.style.padding = "8px 16px";
    toast.style.borderRadius = "6px";
    toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    toast.style.zIndex = "9999";
    toast.style.fontSize = "14px";
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.copy-btn').forEach(el => {
    el.addEventListener('click', () => {
      const text = el.getAttribute('data-copy-text');
      if (text) {
        copyText(text);
      }
    });
  });
});