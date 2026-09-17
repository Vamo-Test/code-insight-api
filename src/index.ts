// code-insight-api — Get instant AI-powered insights into your codebase and job matches.
// Zero-dependency Cloudflare Worker JSON API. Deploys as-is to *.workers.dev.

/** Seed data for GET /insights. Replace with real content when building. */
const insights: unknown[] = [{"id":1,"description":"Your code has high maintainability.","score":95},{"id":2,"description":"Consider adding more tests.","score":78}];

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

    if (pathname === "/insights") {
      return json({ insights });
    }

    if (pathname === "/echo") {
      const body = request.method === "GET" ? null : await request.text();
      return json({ method: request.method, body });
    }

    return json({ error: "not found", path: pathname }, 404);
  },
};
