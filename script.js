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

submitWishButton.addEventListener('click', async () => {
// 在用户手势内先尝试播放，提升自动播放成功率
try { await audio.play(); } catch (_) {}

// 优先尝试新开页，如被拦截则在本页跳转
const newWin = window.open('wish.html', '_blank', 'noopener,noreferrer');
if (!newWin) {
window.location.href = 'wish.html';
}
});
})();
