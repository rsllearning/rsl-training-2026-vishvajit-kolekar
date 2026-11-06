const assert = require("node:assert/strict");
const { readFile } = require("node:fs/promises");
const path = require("node:path");
const test = require("node:test");
const app = require("../server/server");

const clientDirectory = path.join(__dirname, "..", "client");
let server;
let baseUrl;

test.before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("profile sends only browser safe fields", async () => {
  const response = await fetch(`${baseUrl}/api/profile`);
  const profile = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(Object.keys(profile).sort(), [
    "email",
    "id",
    "name",
    "role",
  ]);
  assert.equal(JSON.stringify(profile).includes("TOKEN"), false);
});

test("settings accept known keys and reject unlisted keys", async () => {
  const validResponse = await fetch(`${baseUrl}/api/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ theme: "dark", language: "fr", fontSize: "large" }),
  });
  const validResult = await validResponse.json();

  assert.equal(validResponse.status, 200);
  assert.deepEqual(validResult.settings, {
    theme: "dark",
    language: "fr",
    fontSize: "large",
  });

  const pollutedResponse = await fetch(`${baseUrl}/api/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: '{"__proto__":{"polluted":true},"theme":"dark"}',
  });

  assert.equal(pollutedResponse.status, 400);
  assert.equal({}.polluted, undefined);
});

test("URL text is rendered without an HTML parsing sink", async () => {
  const script = await readFile(path.join(clientDirectory, "app.js"), "utf8");

  assert.match(script, /params\.get\("name"\)/);
  assert.match(script, /heading\.textContent/);
  assert.doesNotMatch(script, /\.innerHTML\b/);
});

test("CSP blocks inline code and framing on dashboard and account pages", async () => {
  for (const route of ["/", "/account"]) {
    const response = await fetch(`${baseUrl}${route}`);
    const csp = response.headers.get("content-security-policy");
    const html = await response.text();

    assert.match(csp, /script-src 'self'/);
    assert.match(csp, /style-src 'self'/);
    assert.match(csp, /object-src 'none'/);
    assert.match(csp, /frame-ancestors 'none'/);
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    assert.doesNotMatch(csp, /unsafe-inline|unsafe-eval/);
    assert.doesNotMatch(html, /<script(?![^>]*\bsrc\s*=)[^>]*>/i);
    assert.doesNotMatch(html, /<style\b/i);
  }
});
