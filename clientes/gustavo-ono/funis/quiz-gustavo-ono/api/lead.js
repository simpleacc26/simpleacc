const MAKE_WEBHOOK = "https://hook.us2.make.com/webrhbzopsinsjep4oxquwrf0m7frfnl";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body ?? {};
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(body)) {
    params.append(key, String(value ?? ""));
  }

  try {
    const makeRes = await fetch(MAKE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    res.status(makeRes.ok ? 200 : 502).json({ ok: makeRes.ok });
  } catch (err) {
    res.status(500).json({ error: "upstream_error" });
  }
}
