// code-insight-api — Real-time AI security insights for your codebase.
// Zero-dependency Cloudflare Worker JSON API. Deploys as-is to *.workers.dev.

/** Seed data for GET /vulnerabilities. Replace with real content when building. */
const vulnerabilities: unknown[] = [{"id":1,"cve":"CVE-2026-90690","description":"Weakness in 0x4m4 HexStrike AI","severity":"High"},{"id":2,"cve":"GHSA-wvf6-r87g-jh87","description":"Cross-site scripting vulnerability","severity":"Medium"}];

const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

export default {
  async fetch(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === "/" || pathname === "/health") {
      return json({ ok: true, service: "code-insight-api", now: Date.now() });
    }

    if (pathname === "/vulnerabilities") {
      return json({ vulnerabilities });
    }

    if (pathname === "/echo") {
      const body = request.method === "GET" ? null : await request.text();
      return json({ method: request.method, body });
    }

    return json({ error: "not found", path: pathname }, 404);
  },
};
