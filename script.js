(function () {
const wishToggleButton = document.getElementById('wish-toggle');
const wishSection = document.getElementById('wish-section');
const submitWishButton = document.getElementById('submit-wish');
const finalMessage = document.getElementById('final-message');
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

submitWishButton.addEventListener('click', async () => {
// 打开新页面显示祝福与烟花
window.open('wish.html', '_blank');
// 同时尝试在当前页播放音乐，避免浏览器拦截
try { await audio.play(); } catch (_) {}
});
})();
