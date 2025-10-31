(function () {
function postWish(text) {
const API_BASE = 'https://<your-worker-subdomain>.workers.dev'; // Cloudflare Worker 部署后替换
return fetch(API_BASE + '/wish', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ text, ua: navigator.userAgent, ts: Date.now() })
}).catch(() => Promise.resolve());
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
postWish(text).finally(() => {
const targetUrl = new URL('wish.html', window.location.href).toString();
const newWin = window.open(targetUrl, '_blank', 'noopener');
if (!newWin) window.location.href = targetUrl;
try { if (audio) audio.play().catch(() => {}); } catch (_) {}
});
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
const newWin = window.open(targetUrl, '_blank', 'noopener');
if (!newWin) window.location.href = targetUrl;
});
}
})();
