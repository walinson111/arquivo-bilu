/**
 * proxy-server.js
 * Roda localmente para resolver o bloqueio de CORS da API le-systeme-solaire.net
 * quando o app é executado via Expo Web (localhost).
 *
 * Como usar:
 *   1. Coloque este arquivo na raiz do projeto (junto ao package.json)
 *   2. Execute: node proxy-server.js
 *   3. Em outro terminal, rode normalmente: npx expo start --web
 */

const http = require("http");
const https = require("https");

const PORT = 8090;
const TARGET_HOST = "api.le-systeme-solaire.net";

const server = http.createServer((req, res) => {
  // Libera CORS para qualquer origem local
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Monta headers limpos — remove Authorization e headers específicos do browser
  // que causam o 401 na API pública
  const cleanHeaders = {
    host: TARGET_HOST,
    accept: "application/json",
    "accept-encoding": "gzip, deflate",
    "user-agent": "node-proxy/1.0",
    "authorization": "Bearer SUA_NOVA_CHAVE_AQUI",  // ← adicionar
    };

  const options = {
    hostname: TARGET_HOST,
    path: req.url,
    method: req.method,
    headers: cleanHeaders,
  };

  const proxyReq = https.request(options, (proxyRes) => {
    // Remove headers que podem causar problemas no browser
    const responseHeaders = { ...proxyRes.headers };
    delete responseHeaders["access-control-allow-origin"];
    delete responseHeaders["x-frame-options"];

    res.writeHead(proxyRes.statusCode, responseHeaders);
    proxyRes.pipe(res);
  });

  proxyReq.on("error", (err) => {
    console.error("Erro no proxy:", err.message);
    res.writeHead(502);
    res.end("Proxy error");
  });

  req.pipe(proxyReq);
});

server.listen(PORT, () => {
  console.log(`\n🚀 Proxy rodando em http://localhost:${PORT}`);
  console.log(`   Redirecionando para https://${TARGET_HOST}\n`);
});