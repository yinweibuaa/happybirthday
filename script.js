(function () {
function openIssueWithWish(text) {
var repo = 'yinweibuaa/happybirthday';
var title = '心愿';
var body = (text && text.trim()) ? text.trim() : '（未填写）';
var url = 'https://github.com/' + repo + '/issues/new'
+ '?title=' + encodeURIComponent(title)
+ '&body=' + encodeURIComponent(body + '\n\n 来自生日心愿网页')
+ '&labels=' + encodeURIComponent('wish');
window.open(url, '_blank', 'noopener');
}

function renderWishForm() {
const main = document.querySelector('main.container');
if (!main) return;
main.innerHTML = [
'<section class="wish-section" style="text-align:left; max-width:720px; margin:0 auto;">',
'<label for="wish-text" class="wish-label">在这里写下你的心愿：</label>',
'<textarea id="wish-text" class="wish-text" rows="5" placeholder="愿所有美好如期而至"></textarea>',
'<button id="submit-wish" class="submit-button" style="display:inline-block; margin-top:12px;">提交心愿</button>',
'</section>'
].join('');

const submitWishButton = document.getElementById('submit-wish');
const audio = document.getElementById('happy-audio');
if (submitWishButton) {
submitWishButton.addEventListener('click', () => {
const textarea = document.getElementById('wish-text');
const text = textarea && textarea.value ? String(textarea.value).slice(0, 1000) : '';
// 1) 新标签打开 GitHub Issue 预填页，用户点一次发布即可记录
openIssueWithWish(text);
// 2) 当前页进入祝福烟花页
const targetUrl = new URL('wish.html', window.location.href).toString();
window.location.href = targetUrl;
// 3) 非阻塞尝试播放音乐
try { if (audio) audio.play().catch(() => {}); } catch (_) {}
});
}
}

const wishToggleButton = document.getElementById('wish-toggle');
if (wishToggleButton) {
wishToggleButton.addEventListener('click', () => { renderWishForm(); });
}

const fallbackSubmit = document.getElementById('submit-wish');
if (fallbackSubmit) {
fallbackSubmit.addEventListener('click', () => {
const targetUrl = new URL('wish.html', window.location.href).toString();
window.location.href = targetUrl;
});
}
})();
