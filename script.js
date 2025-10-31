(function () {
const wishToggleButton = document.getElementById('wish-toggle');
const wishSection = document.getElementById('wish-section');
const submitWishButton = document.getElementById('submit-wish');
const finalMessage = document.getElementById('final-message');
const audio = document.getElementById('happy-audio');

if (!wishToggleButton || !wishSection || !submitWishButton || !finalMessage || !audio) {
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
finalMessage.hidden = false;
try {
await audio.play();
} catch (err) {
alert('点击页面任意位置以播放音乐~');
const resume = () => {
audio.play().catch(() => {});
document.removeEventListener('click', resume);
};
document.addEventListener('click', resume);
}
});
})();
