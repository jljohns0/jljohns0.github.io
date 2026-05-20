// sections.jsx — page sections

const { useState, useEffect, useRef } = React;

// ────────── Hero ──────────
function Hero() {
  const bootLines = [
    { prompt: "$ ", t: "ssh root@jefferyleejohnson.com", tokens: [["root", "key"], ["jefferyleejohnson.com", "accent"]] },
    { t: "» secure channel: ok — TLS 1.3 / EC-P256 / AES-GCM", tokens: [["ok", "ok"]] },
    { prompt: "$ ", t: "whoami", delay: 250 },
    { t: "jeffery_l_johnson   uid=1001  groups=ops,it,sec,students", tokens: [["uid=1001", "key"], ["ops,it,sec,students", "accent"]] },
    { prompt: "$ ", t: "cat /etc/profile", delay: 200 },
    { t: "ROLE=IT_AND_CYBERSECURITY_PROFESSIONAL", tokens: [["IT_AND_CYBERSECURITY_PROFESSIONAL", "accent"]] },
    { t: "FOCUS=SECURITY_MONITORING, CLOUD_FUNDAMENTALS, COMPLIANCE", tokens: [["SECURITY_MONITORING, CLOUD_FUNDAMENTALS, COMPLIANCE", "accent"]] },
    { t: "LOC=Alabaster, AL  •  TZ=America/Chicago", tokens: [["Alabaster, AL", "accent"]] },
    { prompt: "$ ", t: "stat /opt/career.db", delay: 250 },
    { t: "experience:       9_yrs", tokens: [["9_yrs", "accent"]] },
    { t: "team:             500+ employees", tokens: [["500+", "accent"]] },
    { t: "financial_scope:  $120M / yr", tokens: [["$120M", "accent"]] },
    { t: "uptime:           99.97% [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591]", tokens: [["99.97%", "ok"]] },
    { prompt: "$ ", t: "./scan --skills --recursive", delay: 200 },
    { t: "» scanning… python, sql, aws, azure, hipaa, sox, pci-dss, gdpr", tokens: [["python", "accent"], ["sql", "accent"], ["aws", "accent"], ["azure", "accent"], ["hipaa", "accent"], ["sox", "accent"], ["pci-dss", "accent"], ["gdpr", "accent"]] },
    { t: "» 60+ competencies indexed.", tokens: [["60+", "ok"]] },
    { prompt: "$ ", t: "echo \"ready when you are.\"", delay: 250 },
    { t: "ready when you are.", cls: "ok" },
  ];

  return (
    <section className="hero block" data-screen-label="01 Hero">
      <div className="hero-left">
        <div className="hero-tag"><span className="live" /> Currently online • Birmingham, AL</div>

        <h1 className="hero-name">
          <span className="stack glitch" data-text="JEFFERY">JEFFERY</span>{" "}
          <span className="stack ghost glitch" data-text="L">L</span>
          <br />
          <span className="stack row2 glitch" data-text="JOHNSON">JOHNSON<span className="cursor" /></span>
        </h1>

        <p className="hero-role">
          IT &amp; Cybersecurity Professional
          <span className="div">/</span> Security Monitoring
          <span className="div">/</span> Cloud Fundamentals
          <span className="div">/</span> Compliance Awareness
        </p>

        <div className="hero-meta">
          <span className="kv"><span className="k">SYS</span><span className="v">SNHU.MS / IT.SEC</span></span>
          <span className="kv"><span className="k">OPS</span><span className="v">500+ TEAM • $120M</span></span>
          <span className="kv"><span className="k">UPTIME</span><span className="v">9 YEARS</span></span>
          <span className="kv"><span className="k">CLOCK</span><span className="v"><CentralClock /></span></span>
        </div>

        <div className="hero-cta">
          <a className="btn primary" href="#contact"><i className="fas fa-paper-plane" /> Initiate Contact</a>
          <a className="btn" href="#experience"><i className="fas fa-terminal" /> Inspect Record</a>
          <a className="btn" href="uploads/Jeffery L Johnson - Resume.pdf" target="_blank" rel="noreferrer"><i className="fas fa-download" /> Resume.pdf</a>
        </div>
      </div>

      <div className="hero-right">
        <Terminal lines={bootLines} speed={16} startDelay={400} />
      </div>
    </section>
  );
}

// ────────── OPS Console (stat row) ──────────
function OpsConsole() {
  return (
    <Reveal className="ops-row" as="div">
      <div className="stat">
        <div className="lbl"><span>Team Managed</span><span className="live-dot" /></div>
        <div className="val"><Counter to={500} suffix="+" /></div>
        <div className="sub">Direct & cross-functional</div>
        <Sparkline color="#6ddc8b" />
      </div>
      <div className="stat">
        <div className="lbl"><span>Annual Scope</span><span className="live-dot" /></div>
        <div className="val"><Counter to={120} prefix="$" suffix="M" /></div>
        <div className="sub">Financial responsibility</div>
        <Sparkline color="#88ddff" />
      </div>
      <div className="stat">
        <div className="lbl"><span>Years In Ops</span><span className="live-dot" /></div>
        <div className="val"><Counter to={9} suffix=" yrs" /></div>
        <div className="sub">Since Mar 2016 → now</div>
        <Sparkline color="#f7c66b" />
      </div>
      <div className="stat">
        <div className="lbl"><span>Competencies</span><span className="live-dot" /></div>
        <div className="val"><Counter to={62} /></div>
        <div className="sub">Technical & policy</div>
        <Sparkline color="#ffd479" />
      </div>
    </Reveal>
  );
}

// ────────── Ticker (skills marquee) ──────────
function SkillTicker() {
  const items = [
    "Python", "SQL", "AWS", "Azure", "Linux", "Windows", "Docker",
    "Risk Management", "HIPAA", "SOX", "PCI-DSS", "GDPR",
    "SIEM", "Incident Response", "Threat Detection", "Penetration Testing",
    "Agile", "Scrum", "Jira", "MS Project",
    "Database Design", "Data Analysis", "Machine Learning", "Cost-Benefit Analysis",
    "Cloud Computing", "Access Control", "Ethical Hacking", "Security Auditing"
  ];
  const dup = [...items, ...items];
  return (
    <div className="ticker">
      <div className="ticker-track">
        {dup.map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>
  );
}

// ────────── Profile ──────────
function Profile() {
  return (
    <section className="block" id="profile" data-screen-label="02 Profile">
      <Reveal>
        <div className="section-head">
          <span className="num">// 02</span>
          <h2>Profile</h2>
          <span className="crumb">/usr/local/jlj/profile.md</span>
        </div>
      </Reveal>
      <div className="profile-grid">
        <Reveal className="profile-body">
          <p>
            Dynamic operations leader with proven experience overseeing <strong>500+ employees</strong> and managing <strong>$120M</strong> in annual financial responsibility while driving performance, efficiency, and organizational growth.
          </p>
          <p>
            Combines large-scale leadership with advanced technical expertise, supported by a <strong>Bachelor of Science in Information Technology</strong> and a <strong>Master of Science in Information Technology with a concentration in Information Security</strong>.
          </p>
          <p>
            Adept at optimizing systems, strengthening operational workflows, and applying IT-driven solutions to enhance productivity, security, and business continuity. Recognized for building high-performing teams, improving process reliability, and aligning technology with strategic organizational goals.
          </p>
        </Reveal>
        <Reveal className="profile-side" delay={120}>
          <h4>// Identity</h4>
          <ul className="kvlist">
            <li><span className="k">Name</span><span className="v">Jeffery L Johnson</span></li>
            <li><span className="k">Role</span><span className="v">IT & Cybersecurity Pro</span></li>
            <li><span className="k">Location</span><span className="v">Alabaster, AL 35007</span></li>
            <li><span className="k">Email</span><span className="v">jeffery.johnson4@snhu.edu</span></li>
            <li><span className="k">Phone</span><span className="v">251.363.8066</span></li>
            <li><span className="k">Edu</span><span className="v">BS + MS / SNHU</span></li>
            <li><span className="k">Status</span><span className="v" style={{ color: "#6ddc8b" }}>● ACTIVELY MONITORING</span></li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

// ────────── Experience ──────────
function Experience() {
  const logs = [
    { lvl: "INFO", src: "ops.core",       msg: "Daily standup • 23 stations green" },
    { lvl: "OK",   src: "pos.network",    msg: "POS terminals 142/142 online — latency 18ms" },
    { lvl: "INFO", src: "inventory.svc",  msg: "Cycle count variance −0.4% vs target" },
    { lvl: "OK",   src: "asset.protect",  msg: "Compliance audit closed — 0 critical findings" },
    { lvl: "WARN", src: "handheld.fleet", msg: "Device #C-04 battery degraded, swap queued" },
    { lvl: "INFO", src: "training",       msg: "12 associates upskilled on data-handling policy" },
    { lvl: "OK",   src: "process",        msg: "Shrink down 6.2% MoM — checkpoint workflow live" },
    { lvl: "SEC",  src: "iam.access",     msg: "Permissions reconciled with corporate IT (RBAC)" },
    { lvl: "INFO", src: "vendor.ticket",  msg: "Network appliance RMA resolved — 4h SLA" },
    { lvl: "OK",   src: "dashboard",      msg: "Staffing analytics regenerated — −3% labor waste" },
    { lvl: "INFO", src: "uptime",         msg: "Store ops 99.97% over trailing 30d" },
    { lvl: "OK",   src: "policy.engine",  msg: "Standards adherence: PASS" },
    { lvl: "SEC",  src: "secure.access",  msg: "User permissions hardened — least privilege" },
  ];
  const contributions = [
    "Oversaw operational systems including inventory management, POS terminals, handheld devices, and network-connected equipment, ensuring minimal downtime and rapid issue resolution.",
    "Collaborated with Asset Protection and corporate IT to support secure system access, user permissions, and compliance with data-handling policies.",
    "Utilized data analytics tools and reporting dashboards to identify operational gaps, optimize staffing, and improve productivity.",
    "Implemented process improvements that enhanced accuracy, reduced shrink, and improved system-based workflows.",
    "Trained associates on technology tools, system updates, and secure handling of digital information.",
    "Coordinated with vendors and support teams to resolve hardware, software, and network issues impacting store operations.",
    "Ensured adherence to company policies, safety standards, and operational protocols while maintaining a high-performing, customer-focused environment.",
  ];

  return (
    <section className="block" id="experience" data-screen-label="03 Experience">
      <Reveal>
        <div className="section-head">
          <span className="num">// 03</span>
          <h2>Experience</h2>
          <span className="crumb">tail -f /var/log/ops.log</span>
        </div>
      </Reveal>

      <Reveal>
        <div className="xp-head">
          <h3 className="title">Operations Manager</h3>
          <span className="org">Wal-Mart, Inc. • Bentonville, AR</span>
          <span className="dates"><i className="far fa-clock" style={{ marginRight: "0.4rem" }} />Mar 2016 – Present</span>
        </div>
      </Reveal>

      <div className="xp-grid">
        <Reveal>
          <p className="xp-summary">
            Led daily operations with a strong focus on <strong>technology-driven efficiency</strong>, <strong>system reliability</strong>, and <strong>data-informed decision-making</strong>. Managed cross-functional teams while ensuring operational continuity and compliance with corporate standards. Applied IT expertise to streamline workflows, troubleshoot technical issues, and strengthen digital processes across the store.
          </p>
          <h4 style={{ fontFamily: "Courier New", fontSize: "0.6rem", letterSpacing: "0.22rem", color: "rgba(255,255,255,0.55)", margin: "0 0 0.6rem 0", textTransform: "uppercase" }}>// Key contributions</h4>
          <ul className="xp-contributions">
            {contributions.map((c, i) => (
              <li key={i}>
                <span className="marker">{String(i + 1).padStart(2, "0")}</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="logwin">
          <div className="term-head" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.025)" }}>
            <span className="dots"><i></i><i></i><i></i></span>
            <span className="ttl">ops.log — live stream</span>
          </div>
          <LogStream entries={logs} interval={1200} max={14} />
        </Reveal>
      </div>
    </section>
  );
}

// ────────── Skills ──────────
function Skills() {
  const cats = [
    { name: "Cybersecurity & Compliance", color: "#ff7a85", items: ["Risk Management","Risk Mitigation","Security Auditing","Compliance Auditing","Penetration Testing","Ethical Hacking","Threat Detection","Cyber Threat Analysis","Incident Response","SIEM","HIPAA","SOX","PCI-DSS","GDPR","Regulatory Compliance","Access Control","Policy Development"] },
    { name: "Cloud & Infrastructure",     color: "#88ddff", items: ["AWS","Azure","Cloud Computing","SaaS","PaaS","IaaS","Linux","Mac OS","Microsoft Windows","System Monitoring","IT Infrastructure Planning"] },
    { name: "Data & Engineering",         color: "#ffd479", items: ["Python","SQL","Database Design","Relational Database Design","Database Schema Design","Data Analysis","Data Modeling","Machine Learning","Object-Oriented Programming","Scripting Languages","Version Control"] },
    { name: "Process & Leadership",       color: "#6ddc8b", items: ["Project Management","Agile","Scrum Practices","Agile Frameworks","Jira","Microsoft Project","Stakeholder Engagement","Training Material Development","Technical Writing","Cost-Benefit Analysis","Requirements Elicitation","Operational Flowcharting","Process Workflow Design","Troubleshooting"] },
  ];

  // Build radar blips — sample top skills, distribute angles, set r (closer = stronger)
  const blips = [
    { label: "Risk Management", a: 18, r: 0.35, color: "#ff7a85" },
    { label: "AWS",             a: 55, r: 0.5,  color: "#88ddff" },
    { label: "Python",          a: 92, r: 0.4,  color: "#ffd479" },
    { label: "Project Mgmt",    a: 128, r: 0.45, color: "#6ddc8b" },
    { label: "Incident Resp.",  a: 162, r: 0.6,  color: "#ff7a85" },
    { label: "SQL",             a: 195, r: 0.55, color: "#ffd479" },
    { label: "Linux",           a: 232, r: 0.7,  color: "#88ddff" },
    { label: "HIPAA",           a: 268, r: 0.65, color: "#ff7a85" },
    { label: "Agile",           a: 304, r: 0.75, color: "#6ddc8b" },
    { label: "SIEM",            a: 338, r: 0.5,  color: "#ff7a85" },
    { label: "Penetration",     a: 8,   r: 0.82, color: "#ff7a85" },
    { label: "Azure",           a: 72,  r: 0.8,  color: "#88ddff" },
    { label: "ML",              a: 108, r: 0.85, color: "#ffd479" },
    { label: "Scrum",           a: 145, r: 0.62, color: "#6ddc8b" },
    { label: "GDPR",            a: 285, r: 0.8,  color: "#ff7a85" },
    { label: "Docker",          a: 215, r: 0.88, color: "#88ddff" },
  ];

  return (
    <section className="block" id="skills" data-screen-label="04 Skills">
      <Reveal>
        <div className="section-head">
          <span className="num">// 04</span>
          <h2>Skills</h2>
          <span className="crumb">./scan --recursive --radar</span>
        </div>
      </Reveal>

      <div className="skills-wrap">
        <Reveal className="radar-box">
          <div className="radar-head">
            <span className="t">Threat & Capability Radar</span>
            <span className="live"><span className="d" /> Sweeping</span>
          </div>
          <Radar blips={blips} />
          <div className="legend">
            <div><span className="sw" style={{ background: "#ff7a85" }} />Security & Compliance</div>
            <div><span className="sw" style={{ background: "#88ddff" }} />Cloud & Infra</div>
            <div><span className="sw" style={{ background: "#ffd479" }} />Data & Eng</div>
            <div><span className="sw" style={{ background: "#6ddc8b" }} />Process & Lead</div>
          </div>
        </Reveal>

        <div className="skills-cats">
          {cats.map((c, i) => (
            <Reveal key={c.name} className="skill-cat" delay={80 * i}>
              <div className="head">
                <span className="name" style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
                  <span style={{ width: 8, height: 8, background: c.color, borderRadius: 1 }} />
                  {c.name}
                </span>
                <span className="count">{String(c.items.length).padStart(2, "0")} REGISTERED</span>
              </div>
              <div className="tags">
                {c.items.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────── Education ──────────
function Education() {
  return (
    <section className="block" id="education" data-screen-label="05 Education">
      <Reveal>
        <div className="section-head">
          <span className="num">// 05</span>
          <h2>Education</h2>
          <span className="crumb">snhu.edu / records</span>
        </div>
      </Reveal>
      <div className="edu-grid">
        <Reveal className="edu-card">
          <div className="arc" />
          <span className="level">// degree.01 — undergraduate</span>
          <h3>Bachelor of Science in Information Technology</h3>
          <div className="school">Southern New Hampshire University • Manchester, NH</div>
          <div className="conc">Concentration: General IT</div>
        </Reveal>
        <Reveal className="edu-card" delay={120}>
          <div className="arc" />
          <span className="level">// degree.02 — graduate</span>
          <h3>Master of Science in Information Technology</h3>
          <div className="school">Southern New Hampshire University • Manchester, NH</div>
          <div className="conc">Concentration: Information Security</div>
        </Reveal>
      </div>
    </section>
  );
}

// ────────── Honors & Memberships ──────────
function Honors() {
  const medals = [
    { gly: "NSLS", title: "National Society of Leadership and Success", org: "Sigma Alpha Pi Honor Society",
      body: "Recognized for strong leadership capabilities and academic performance. Completed NSLS's accredited leadership training program — effective communication, team development, and strategic goal execution." },
    { gly: "AΣΛ", title: "Alpha Sigma Lambda", org: "Academic Honor Society",
      body: "Recognized for academic excellence and high scholastic performance while balancing professional and personal responsibilities. Selected for membership based on ranking in the top percentage of eligible students." },
    { gly: "ACM", title: "Association for Computing Machinery", org: "ACM Member",
      body: "Contributing to a global community dedicated to advancing computing as a science and profession. Engaged in collaborative learning, ethical computing discussions, and leadership-oriented development." },
  ];
  return (
    <section className="block" id="honors" data-screen-label="06 Honors">
      <Reveal>
        <div className="section-head">
          <span className="num">// 06</span>
          <h2>Honors &amp; Affiliations</h2>
          <span className="crumb">credentials.unlock</span>
        </div>
      </Reveal>
      <div className="honors-grid">
        {medals.map((m, i) => (
          <Reveal className="medal" key={i} delay={i * 100}>
            <div className="crest"><span className="gly">{m.gly}</span></div>
            <div className="body">
              <h3>{m.title}</h3>
              <div className="org">{m.org}</div>
              <p>{m.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ────────── Publications ──────────
function Publications() {
  const ascii1 = "  ┌─┐\n  │█│\n  └┬┘\n   │\n  ─┴─";
  const ascii2 = " /\\_/\\\n( o.o )\n > ^ <";
  return (
    <section className="block" id="publications" data-screen-label="07 Publications">
      <Reveal>
        <div className="section-head">
          <span className="num">// 07</span>
          <h2>Publications</h2>
          <span className="crumb">grep -r 'cyber' ./papers</span>
        </div>
      </Reveal>
      <div className="pub-grid">
        <Reveal className="pub">
          <pre className="ascii">{`┌──┐
│██│
│▒▒│
└──┘`}</pre>
          <div className="pubmeta">
            <span className="tag-mini">Graduate Project</span>
            <span>SNHU • MS-IT/SEC</span>
          </div>
          <h3>Secure Escape: Cybersecurity Risk Assessment &amp; System Design</h3>
          <p>Developed a comprehensive cybersecurity architecture and risk-mitigation strategy, incorporating threat modeling, access-control design, and cloud-security best practices.</p>
          <div className="actions">
            <a className="btn" href="#contact"><i className="fas fa-envelope-open-text" /> Request Copy</a>
          </div>
        </Reveal>
        <Reveal className="pub" delay={120}>
          <pre className="ascii">{`╔═══╗
║AI ║
╚═══╝`}</pre>
          <div className="pubmeta">
            <span className="tag-mini">Research Paper</span>
            <span>Academic</span>
          </div>
          <h3>Analysis of Modern Cyber Threat Vectors &amp; Defensive Strategies</h3>
          <p>Explored emerging threat trends — AI-driven attacks, privilege escalation techniques, and cloud vulnerabilities — with recommendations for enterprise defense.</p>
          <div className="actions">
            <a className="btn" href="#contact"><i className="fas fa-envelope-open-text" /> Request Copy</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ────────── Contact ──────────
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="block" id="contact" data-screen-label="08 Contact">
      <Reveal>
        <div className="section-head">
          <span className="num">// 08</span>
          <h2>Initiate Contact</h2>
          <span className="crumb">connect --secure-channel</span>
        </div>
      </Reveal>

      <div className="contact-wrap">
        <Reveal className="contact-card">
          <h3>Open a secure channel</h3>
          <div className="sub">All messages encrypted in transit • Response within 24h</div>
          {sent ? (
            <div style={{ fontFamily: "Courier New", color: "#6ddc8b", padding: "1.5rem 0", letterSpacing: "0.15rem", fontSize: "0.85rem" }}>
              » Transmission acknowledged. Channel closed.
            </div>
          ) : (
            <form className="contact-fields" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div>
                <label>Caller</label>
                <input required placeholder="Your name" />
              </div>
              <div>
                <label>Return Address</label>
                <input required type="email" placeholder="you@domain.com" />
              </div>
              <div className="full">
                <label>Subject Line</label>
                <input placeholder="re: opportunity, audit, collab…" />
              </div>
              <div className="full">
                <label>Payload</label>
                <textarea placeholder="What can I help with?"></textarea>
              </div>
              <div className="full" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button className="btn primary" type="submit"><i className="fas fa-paper-plane" /> Send Message</button>
                <button className="btn" type="reset"><i className="fas fa-redo" /> Reset</button>
              </div>
            </form>
          )}
        </Reveal>

        <Reveal className="contact-side" delay={120}>
          <div className="panel">
            <div className="label">// email</div>
            <div className="v">jeffery.johnson4@snhu.edu</div>
          </div>
          <div className="panel">
            <div className="label">// phone</div>
            <div className="v">+1 (251) 363-8066</div>
          </div>
          <div className="panel">
            <div className="label">// location</div>
            <div className="v">Alabaster, AL 35007</div>
          </div>
          <div className="panel">
            <div className="label">// channels</div>
            <div className="icons">
              <a href="#" title="GitHub"><i className="fab fa-github" /></a>
              <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in" /></a>
              <a href="#" title="Medium"><i className="fab fa-medium-m" /></a>
              <a href="mailto:jeffery.johnson4@snhu.edu" title="Mail"><i className="fas fa-at" /></a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, OpsConsole, SkillTicker, Profile, Experience, Skills, Education, Honors, Publications, Contact });
