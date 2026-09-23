const items = [
  {
    tag: "Local models",
    title: "Ollama that sizes itself to your GPU",
    body: "Native Ollama API, VRAM detection on NVIDIA and Apple Silicon, and a num_ctx that shrinks on memory pressure instead of hanging.",
    cmd: "codetrace set-ctx --backoff 0.75",
  },
  {
    tag: "IDE",
    title: "A real MCP server, registered per project",
    body: "Stdio server your IDE launches, with one entry per project in .mcp.json, .cursor/mcp.json and .vscode/mcp.json.",
    cmd: "codetrace register-mcp .",
  },
  {
    tag: "Any LLM",
    title: "Bring any endpoint",
    body: "The custom provider speaks both the OpenAI and Anthropic protocols — DeepSeek, vLLM, LM Studio, corporate gateways. Keys optional for local servers.",
    cmd: "codetrace config  # → custom",
  },
  {
    tag: "Governance",
    title: "Answers that cite or abstain",
    body: "Every structural claim is graded CONFIRMED, INFERRED or UNRESOLVED and carries a live file:line citation. Output is normalized across providers.",
    cmd: "codetrace chat",
  },
  {
    tag: "Security",
    title: "Hardened by default",
    body: "API-key config written atomically and owner-only, stricter project-path checks, writes outside the project refused before you're asked.",
    cmd: "~/.codetrace/config.json  (0600)",
  },
  {
    tag: "Reliability",
    title: "Fixes that matter day to day",
    body: "git_diff no longer returns empty, re-indexing keeps inbound call edges, timeouts show a real error, and CPU-only machines stop running out of memory while re-ranking.",
    cmd: "pytest  # 55 passing",
  },
];

const edges = [
  { k: "Install", v: "pip install — no Docker, no graph server" },
  { k: "Models", v: "6 providers + any OpenAI/Anthropic-style endpoint" },
  { k: "Local", v: "GPU-aware context sizing for Ollama" },
];

export default function WhatsNew() {
  return (
    <section className="whatsnew-section" id="whats-new">
      <div className="container">
        <div className="whatsnew-head reveal-on-scroll">
          <div className="section-label">What&apos;s new in v1.0.3</div>
          <h2 className="section-heading">Built to run on your laptop, talk to any model, and plug into your IDE.</h2>
          <p className="section-subheading">
            The biggest release since launch: roughly 4,100 lines of new code across the agent loop, token manager, MCP server and indexer.
          </p>
        </div>

        <div className="whatsnew-grid">
          {items.map((it) => (
            <article key={it.title} className="whatsnew-card reveal-on-scroll">
              <span className="whatsnew-tag">{it.tag}</span>
              <h3 className="whatsnew-title">{it.title}</h3>
              <p className="whatsnew-body">{it.body}</p>
              <code className="whatsnew-cmd">{it.cmd}</code>
            </article>
          ))}
        </div>

        <dl className="whatsnew-edges reveal-on-scroll">
          {edges.map((e) => (
            <div key={e.k} className="whatsnew-edge">
              <dt>{e.k}</dt>
              <dd>{e.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
