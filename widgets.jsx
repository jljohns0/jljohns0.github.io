// widgets.jsx — reusable visual widgets

const { useEffect, useState, useRef, useMemo } = React;

// ────────── Reveal on scroll ──────────
function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          io.disconnect();
        }
      });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

// ────────── Animated counter ──────────
function Counter({ to, prefix = "", suffix = "", decimals = 0, duration = 1600, format }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const display = format ? format(val) : val.toFixed(decimals);
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ────────── Live clock (Birmingham, AL — Central Time) ──────────
function CentralClock({ className = "" }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  });
  return <span className={className}>{fmt.format(now)} CT</span>;
}

// ────────── Sparkline (random walk, redraws periodically) ──────────
function Sparkline({ color = "#ffffff", points = 30, height = 28, period = 1800 }) {
  const ref = useRef(null);
  const dataRef = useRef(Array.from({ length: points }, () => Math.random() * 0.6 + 0.2));
  const draw = () => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);
    const d = dataRef.current;
    // fill
    ctx.beginPath();
    d.forEach((y, i) => {
      const x = (i / (d.length - 1)) * w;
      const yy = h - y * h;
      if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
    });
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    ctx.fillStyle = color + "22";
    ctx.fill();
    // stroke
    ctx.beginPath();
    d.forEach((y, i) => {
      const x = (i / (d.length - 1)) * w;
      const yy = h - y * h;
      if (i === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  useEffect(() => {
    draw();
    const id = setInterval(() => {
      dataRef.current = [...dataRef.current.slice(1), Math.max(0.05, Math.min(0.95, dataRef.current[dataRef.current.length - 1] + (Math.random() - 0.5) * 0.35))];
      draw();
    }, period);
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => { clearInterval(id); window.removeEventListener("resize", onResize); };
  }, [period, color]);
  return <canvas ref={ref} className="spark" style={{ height }} />;
}

// ────────── Matrix rain canvas (background) ──────────
function MatrixCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, cols, drops, fontSize;
    const chars = "01アイウエオカキクケコサシスセソタチツテト_-=+/<>SECINFOROOTAWS";
    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      fontSize = 14 * dpr;
      cols = Math.floor(w / fontSize);
      drops = new Array(cols).fill(0).map(() => Math.random() * -50);
    };
    setup();
    let raf;
    let last = 0;
    const tick = (t) => {
      if (t - last > 70) {
        last = t;
        ctx.fillStyle = "rgba(8, 10, 12, 0.18)";
        ctx.fillRect(0, 0, w, h);
        ctx.font = `${fontSize}px "Courier New", monospace`;
        for (let i = 0; i < cols; i++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          ctx.fillStyle = Math.random() < 0.02 ? "rgba(220,255,220,0.95)" : "rgba(170,200,180,0.5)";
          ctx.fillText(ch, x, y);
          if (y > h && Math.random() > 0.97) drops[i] = 0;
          drops[i]++;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onResize = () => setup();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="matrix-canvas" />;
}

// ────────── Grid canvas (subtle parallax grid + drift dots) ──────────
function GridCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr;
    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00015,
      r: Math.random() * 1 + 0.5,
    }));
    const setup = () => {
      dpr = window.devicePixelRatio || 1;
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    setup();
    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      // grid
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      const step = 60 * dpr;
      for (let x = 0; x < w; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      // dots
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onResize = () => setup();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="grid-canvas" />;
}

// ────────── Threat Radar (skills constellation) ──────────
function Radar({ blips }) {
  const [angle, setAngle] = useState(0);
  const [hover, setHover] = useState(null);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      setAngle(((t - start) / 4500) * 360 % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cx = 100, cy = 100, R = 92;
  const sweepEnd = angle * Math.PI / 180 - Math.PI / 2;
  const sweepWidth = Math.PI / 4;
  const x1 = cx + Math.cos(sweepEnd - sweepWidth) * R;
  const y1 = cy + Math.sin(sweepEnd - sweepWidth) * R;
  const x2 = cx + Math.cos(sweepEnd) * R;
  const y2 = cy + Math.sin(sweepEnd) * R;

  return (
    <div style={{ position: "relative" }}>
      <svg className="radar" viewBox="0 0 200 200">
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <linearGradient id="sweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(109,220,139,0)" />
            <stop offset="100%" stopColor="rgba(109,220,139,0.45)" />
          </linearGradient>
        </defs>
        {/* base */}
        <circle cx={cx} cy={cy} r={R} fill="url(#rg)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={R * 0.66} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={R * 0.33} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
        <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
        <line x1={cx} y1={cy - R} x2={cx} y2={cy + R} stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
        <line x1={cx - R * 0.707} y1={cy - R * 0.707} x2={cx + R * 0.707} y2={cy + R * 0.707} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <line x1={cx - R * 0.707} y1={cy + R * 0.707} x2={cx + R * 0.707} y2={cy - R * 0.707} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        {/* sweep wedge */}
        <path
          d={`M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`}
          fill="url(#sweep)"
          opacity="0.85"
        />
        {/* sweep line */}
        <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="rgba(109,220,139,0.7)" strokeWidth="1" />
        {/* blips */}
        {blips.map((b, i) => {
          const a = (b.a) * Math.PI / 180 - Math.PI / 2;
          const x = cx + Math.cos(a) * (b.r * R);
          const y = cy + Math.sin(a) * (b.r * R);
          const ad = ((b.a - 90 + 360) % 360);
          const swA = (angle - 90 + 360) % 360;
          const dist = Math.min(Math.abs(ad - swA), 360 - Math.abs(ad - swA));
          const lit = dist < 22 ? 1 : Math.max(0.25, 1 - dist / 90);
          return (
            <g key={i}
               onMouseEnter={() => setHover(b)}
               onMouseLeave={() => setHover(null)}
               style={{ cursor: "default" }}
            >
              <circle cx={x} cy={y} r="3.5" fill={b.color || "#6ddc8b"} opacity={lit} />
              <circle cx={x} cy={y} r="7" fill="none" stroke={b.color || "#6ddc8b"} opacity={lit * 0.4} />
            </g>
          );
        })}
        {/* center */}
        <circle cx={cx} cy={cy} r="2" fill="#fff" />
        {/* crosshair labels */}
        <text x={cx + R + 4} y={cy + 3} fontSize="6" fill="rgba(255,255,255,0.45)" fontFamily="Courier New">E</text>
        <text x={cx - R - 8} y={cy + 3} fontSize="6" fill="rgba(255,255,255,0.45)" fontFamily="Courier New">W</text>
        <text x={cx - 3} y={cy - R - 3} fontSize="6" fill="rgba(255,255,255,0.45)" fontFamily="Courier New">N</text>
        <text x={cx - 3} y={cy + R + 9} fontSize="6" fill="rgba(255,255,255,0.45)" fontFamily="Courier New">S</text>
      </svg>
      {hover && (
        <div style={{
          position: "absolute",
          bottom: 8, left: 8,
          background: "rgba(8,10,12,0.85)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 4,
          padding: "0.35rem 0.55rem",
          fontFamily: "Courier New",
          fontSize: "0.6rem",
          letterSpacing: "0.16rem",
          textTransform: "uppercase",
          color: "#fff",
          pointerEvents: "none",
        }}>
          {hover.label}
        </div>
      )}
    </div>
  );
}

// ────────── Typewriter terminal ──────────
function Terminal({ lines, speed = 14, startDelay = 0, loop = false, className = "" }) {
  const [shown, setShown] = useState([]);
  const [cursorOn, setCursorOn] = useState(true);
  const ref = useRef(null);
  useEffect(() => {
    let mounted = true;
    let timeouts = [];
    const flat = lines;
    const run = async () => {
      await new Promise((r) => timeouts.push(setTimeout(r, startDelay)));
      while (mounted) {
        setShown([]);
        for (let i = 0; i < flat.length; i++) {
          if (!mounted) return;
          const line = flat[i];
          // Wait first (per-line delay)
          if (line.delay) await new Promise((r) => timeouts.push(setTimeout(r, line.delay)));
          // Type
          const text = line.t || "";
          let acc = "";
          for (let c = 0; c < text.length; c++) {
            if (!mounted) return;
            acc += text[c];
            setShown((prev) => {
              const copy = prev.slice();
              copy[i] = { ...line, t: acc };
              return copy;
            });
            await new Promise((r) => timeouts.push(setTimeout(r, line.fast ? 4 : speed)));
          }
        }
        if (!loop) return;
        await new Promise((r) => timeouts.push(setTimeout(r, 2200)));
      }
    };
    run();
    return () => {
      mounted = false;
      timeouts.forEach(clearTimeout);
    };
  }, [lines, speed, startDelay, loop]);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 520);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`term ${className}`}>
      <div className="term-head">
        <span className="dots"><i></i><i></i><i></i></span>
        <span className="ttl">root@jlj:~ — secure shell</span>
      </div>
      <div className="term-body" ref={ref}>
        {shown.map((ln, idx) => (
          <div key={idx} className="term-line">
            {ln.prompt && <span className="prompt">{ln.prompt}</span>}
            <Highlighted t={ln.t} cls={ln.cls} tokens={ln.tokens} />
            {idx === shown.length - 1 && cursorOn && <span style={{ background: "#fff", width: "0.5em", height: "0.95em", display: "inline-block", verticalAlign: "-0.1em", marginLeft: "0.1em" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function Highlighted({ t, cls, tokens }) {
  if (!t) return null;
  if (!tokens) return <span className={cls || ""}>{t}</span>;
  // Tokens: array of [substring, className]
  let remaining = t;
  const out = [];
  let key = 0;
  while (remaining.length) {
    let hitIdx = -1;
    let hitTok = null;
    for (const [s, c] of tokens) {
      const i = remaining.indexOf(s);
      if (i >= 0 && (hitIdx === -1 || i < hitIdx)) { hitIdx = i; hitTok = [s, c]; }
    }
    if (hitIdx === -1) {
      out.push(<span key={key++} className={cls || ""}>{remaining}</span>);
      break;
    }
    if (hitIdx > 0) out.push(<span key={key++} className={cls || ""}>{remaining.slice(0, hitIdx)}</span>);
    out.push(<span key={key++} className={hitTok[1]}>{hitTok[0]}</span>);
    remaining = remaining.slice(hitIdx + hitTok[0].length);
  }
  return <>{out}</>;
}

// ────────── Log stream (auto-scrolling, infinite) ──────────
function LogStream({ entries, interval = 1100, max = 14 }) {
  const [items, items_set] = useState([]);
  const idxRef = useRef(0);
  useEffect(() => {
    const push = () => {
      const k = ++idxRef.current;
      const e = entries[(k - 1) % entries.length];
      const now = new Date();
      const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now);
      items_set((cur) => {
        const next = [...cur, { ...e, ts: fmt, key: k }];
        return next.slice(-max);
      });
    };
    // seed
    for (let i = 0; i < 6; i++) push();
    const id = setInterval(push, interval);
    return () => clearInterval(id);
  }, [entries, interval, max]);
  return (
    <div className="term-body">
      {items.map((it) => (
        <div key={it.key} className="term-line">
          <span className="ts">[{it.ts}]</span>{" "}
          <span className={`lvl ${it.lvl}`}>{it.lvl}</span>{" "}
          <span className="src">{it.src}</span>{" "}
          <span>{it.msg}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Reveal, Counter, CentralClock, Sparkline, MatrixCanvas, GridCanvas, Radar, Terminal, LogStream });
