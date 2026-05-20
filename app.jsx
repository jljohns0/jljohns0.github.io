// app.jsx — root App with boot sequence, OS bar, and section composition

const { useState, useEffect } = React;

function OSBar({ booted }) {
  const [up, setUp] = useState(0);
  useEffect(() => {
    if (!booted) return;
    const id = setInterval(() => setUp((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [booted]);
  const fmt = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };
  return (
    <div className="os-bar">
      <span className="os-logo">
        <span className="dot" />
        JLJ.SH
      </span>
      <nav className="os-nav">
        <a href="#profile">Profile</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
        <a href="#education">Education</a>
        <a href="#honors">Honors</a>
        <a href="#publications">Publications</a>
        <a href="#contact">Contact</a>
      </nav>
      <span className="os-right">
        <span className="os-pill"><span className="ok">●</span> SECURE</span>
        <span className="os-pill"><i className="fas fa-shield-alt" style={{ fontSize: "0.6rem" }} />&nbsp;TLS 1.3</span>
        <span className="os-pill">UP {fmt(up)}</span>
        <span className="os-pill"><CentralClock /></span>
      </span>
    </div>
  );
}

function Boot({ onDone }) {
  const [lines, setLines] = useState([]);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const seq = [
      { t: "» BIOS / firmware check ……………………………… ok", cls: "ok", at: 80 },
      { t: "» Loading /jlj/profile.kernel ……………………… ok", cls: "ok", at: 220 },
      { t: "» Mounting /opt/career, /var/log/ops ……… ok", cls: "ok", at: 380 },
      { t: "» Resolving identity: Jeffery L. Johnson", cls: "dim", at: 520 },
      { t: "» TLS 1.3 handshake / EC-P256 / AES-GCM …… ok", cls: "ok", at: 680 },
      { t: "» Spinning up SOC widgets …………………………… ok", cls: "ok", at: 860 },
      { t: "» SYSTEM READY — welcome.", cls: "ok", at: 1100 },
    ];
    seq.forEach((s, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, s]);
        setPct(Math.round(((i + 1) / seq.length) * 100));
      }, s.at);
    });
    setTimeout(() => { setDone(true); onDone(); }, 1700);
  }, [onDone]);
  return (
    <div className={`boot ${done ? "done" : ""}`}>
      <div className="boot-inner">
        <div className="boot-line dim">[ JLJ Portfolio Operating System v9.4 ]</div>
        <div className="boot-line dim">© jefferyleejohnson.com 2026 — booting…</div>
        <div style={{ height: "1rem" }} />
        {lines.map((l, i) => (
          <div key={i} className={`boot-line ${l.cls || ""}`}>{l.t}</div>
        ))}
        <div className="boot-bar"><span className="fill" style={{ width: pct + "%" }} /></div>
      </div>
    </div>
  );
}

function App() {
  const [booted, setBooted] = useState(false);
  // skip boot if hash present (deep-link)
  useEffect(() => {
    if (location.hash) setBooted(true);
  }, []);

  return (
    <>
      <MatrixCanvas />
      <GridCanvas />
      <div className="stage-bg" />
      <div className="stage-vignette" />

      {!booted && <Boot onDone={() => setBooted(true)} />}
      <OSBar booted={booted} />

      <main className="shell">
        <Hero />
        <OpsConsole />
        <SkillTicker />
        <Profile />
        <Experience />
        <Skills />
        <Education />
        <Honors />
        <Publications />
        <Contact />

        <footer className="site-foot">
          <span>© jefferyleejohnson.com 2026</span>
          <span><span className="ok">●</span> Session secure • All systems nominal</span>
          <span>Hand-built with HTML, SVG &amp; care</span>
        </footer>
      </main>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
