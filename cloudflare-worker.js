// Cloudflare Worker: wishes backend with KV and simple admin password
// 1) 在 Cloudflare 创建一个 KV 命名空间 WISHES，并在 worker 里绑定为 WISHES
// 2) 设置环境变量 ADMIN_PASSWORD（Workers -> Settings -> Variables）
// 3) 发布后把 worker 的子域名填入前端 API_BASE
export default {
async fetch(request, env) {
const url = new URL(request.url);
if (request.method === 'OPTIONS') return new Response(null, { headers: cors(env) });
if (url.pathname === '/wish' && request.method === 'POST') {
try {
const data = await request.json();
const entry = {
text: (data && data.text ? String(data.text) : '').slice(0, 1000),
ua: (data && data.ua ? String(data.ua) : ''),
ts: Date.now()
};
const id = crypto.randomUUID();
await env.WISHES.put(wish::, JSON.stringify(entry));
return json({ ok: true }, env);
} catch (e) {
return json({ ok: false, error: 'bad_request' }, env, 400);
}
}
if (url.pathname === '/admin/wishes' && request.method === 'GET') {
const pass = request.headers.get('x-admin-password') || '';
if (!env.ADMIN_PASSWORD || pass !== env.ADMIN_PASSWORD) {
return json({ ok: false, error: 'unauthorized' }, env, 401);
}
const list = await listAll(env.WISHES, 'wish:');
// 最新在前
list.sort((a, b) => b.ts - a.ts);
return json({ ok: true, wishes: list }, env);
}
return new Response('Not Found', { status: 404, headers: cors(env) });
}
};

function cors(env) {
return {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
'Access-Control-Allow-Headers': 'Content-Type, x-admin-password'
};
}

function json(obj, env, status = 200) {
return new Response(JSON.stringify(obj), {
status,
headers: { 'Content-Type': 'application/json', ...cors(env) }
});
}

async function listAll(ns, prefix) {
let cursor; const out = [];
do {
const { keys, list_complete, cursor: c } = await ns.list({ prefix, cursor });
for (const k of keys) {
const v = await ns.get(k.name);
if (!v) continue;
try { out.push(JSON.parse(v)); } catch { /* skip */ }
}
cursor = list_complete ? undefined : c;
} while (cursor);
return out;
}
