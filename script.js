(function () {
const wishToggleButton = document.getElementById('wish-toggle');
const wishSection = document.getElementById('wish-section');
const submitWishButton = document.getElementById('submit-wish');
const audio = document.getElementById('happy-audio');

if (!wishToggleButton || !wishSection || !submitWishButton || !audio) {
return;
}

wishToggleButton.addEventListener('click', () => {
wishSection.hidden = !wishSection.hidden;
if (!wishSection.hidden) {
const textarea = document.getElementById('wish-text');
if (textarea) textarea.focus();
}
});

submitWishButton.addEventListener('click', () => {
// 构造绝对地址，兼容 GitHub Pages 子路径与自定义域根路径
const targetUrl = new URL('wish.html', window.location.href).toString();
const newWin = window.open(targetUrl, '_blank', 'noopener');
if (!newWin) {
window.location.href = targetUrl;
return;
}
try { audio.play().catch(() => {}); } catch (_) {}
});
})();
