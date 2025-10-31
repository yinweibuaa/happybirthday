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
// 先立即尝试新开标签，保持在用户手势内执行
const newWin = window.open('wish.html', '_blank', 'noopener');
if (!newWin) {
// 被拦截则直接本页跳转
window.location.href = 'wish.html';
return;
}
// 非阻塞尝试播放音乐（不使用 await）
try { audio.play().catch(() => {}); } catch (_) {}
});
})();
