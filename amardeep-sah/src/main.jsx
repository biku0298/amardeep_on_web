import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/dm-sans";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/caveat/latin-500.css";
import "@fontsource/barlow-condensed/latin-700.css";
import { email, linkedIn, roles, stories } from "./content.js";
import "./style.css";

const icons = {
  diagonal: <><path d="M5 19 19 5M5 5h14v14"/></>,
  down: <><path d="M12 4v16m-6-6 6 6 6-6"/></>,
  pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,
  fleet: <><path d="M2 5h13v12H2zM15 9h4l3 4v4h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18.5" cy="18" r="2"/></>,
  route: <><circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h9a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h9"/></>,
  medal: <><circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/></>,
  close: <><path d="m6 6 12 12m0-12L6 18"/></>,
  menu: <><path d="M3 7h18M3 12h18M3 17h18"/></>
};

function Icon({ name, size = 20 }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const navLinks = [["My work", "work"], ["Experience", "experience"], ["About me", "profile"]];
  useEffect(() => {
    if (!open) return;
    function handleEscape(e) {
      if (e.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);
  return <header className="topbar shell">
    <a href="#home" className="brand" onClick={() => setOpen(false)} aria-label="Amardeep Kumar Sah, home">Amardeep Sah<span>.</span></a>
    <nav id="navigation" aria-label="Main" className={open ? "nav-links open" : "nav-links"}>
      {navLinks.map(([label,id]) => <a href={"#"+id} key={id} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <div className="nav-actions">
      <a className="contact-button" href="#contact" onClick={() => setOpen(false)}>Say hello <Icon name="diagonal" size={14}/></a>
      <button className="nav-toggle" ref={toggle} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"}/></button>
    </div>
  </header>;
}

function Hero() {
  return <section className="hero shell" aria-labelledby="name">
    <div className="hero-copy">
      <p className="greeting">Hi, I’m Amardeep Kumar Sah<span aria-hidden="true">.</span></p>
      <h1 id="name"><span className="freight-line">Keeping freight <img className="parcel-sticker" src="/images/parcel-sticker.webp" alt="" width="300" height="300"/></span><em>in motion.</em></h1>
      <p className="hero-intro">I work in supply chain operations, connecting fleet planning, last-mile delivery and freight finance. I’m currently an SCM Billing Executive at Whirlpool India.</p>
      <div className="hero-actions"><a className="button-primary" href="#work">Explore my work <Icon name="down" size={15}/></a><a className="plain-link" href={linkedIn} target="_blank" rel="noreferrer">LinkedIn <Icon name="diagonal" size={13}/></a></div>
    </div>
    <div className="badge-stage">
      <figure className="id-card">
        <div className="ribbon" aria-hidden="true"/><div className="clasp" aria-hidden="true"/>
        <div className="id-slot" aria-hidden="true"/>
        <img className="id-photo" src="/images/office-badge.webp" alt="Amardeep in his office" width="650" height="433" fetchPriority="high"/>
        <figcaption><strong>Amardeep K. Sah</strong><span>Supply chain operations</span></figcaption>
        <div className="badge-bottom"><span><Icon name="pin" size={12}/> Delhi NCR, India</span><i className="barcode" aria-hidden="true"/></div>
      </figure>
      <span className="green-belt"><Icon name="medal" size={16}/> Six Sigma Green Belt</span>
    </div>
  </section>;
}

function WorkPreview({ type }) {
  if (type === "fleet") return <div className="work-preview fleet-preview" aria-hidden="true">
    <div className="fleet-ticket"><div className="paper-cap"><Icon name="fleet" size={16}/> RIVIGO <b>FLEET PLAN</b></div>
      <div className="fleet-count">3,000<span>+</span></div><small>vehicles in fuel planning</small>
      <div className="route-line"><i/><span/><i/><span/><i/></div>
    </div>
  </div>;
  if (type === "last-mile") return <div className="work-preview delivery-preview" aria-hidden="true">
    <div className="delivery-slip"><div className="paper-cap"><Icon name="route" size={16}/> ECOM EXPRESS</div>
      <b className="slip-title">Last-mile delivery</b>
      <div className="scan-line"><i className="barcode"/> <span>PIN CODE<br/>MAPPING</span></div>
    </div>
  </div>;
  return <div className="work-preview freight-preview" aria-hidden="true">
    <div className="invoice-slip"><div className="paper-cap">FREIGHT ACCOUNTS</div><b className="slip-title">Reconciliation</b>
      <div className="ledger-line">SAP entry<i/></div><div className="ledger-line">Vendor invoice<i/></div>
    </div>
  </div>;
}

function Work() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  useEffect(() => {
    if (!selected) return;
    dialog.current.showModal();
    document.body.classList.add("dialog-open");
    return () => document.body.classList.remove("dialog-open");
  }, [selected]);
  return <section className="shell work-section section" id="work" aria-labelledby="work-title">
    <p className="eyebrow">Selected work</p>
    <div className="section-heading"><h2 id="work-title">Inside the <em>operation.</em></h2><p>Three questions I’ve worked on across the supply chain.</p></div>
    <div className="story-grid">
      {stories.map(story => <button className="story-card" key={story.title} onClick={() => setSelected(story)} aria-haspopup="dialog" aria-label={"Read about "+story.title}>
        <WorkPreview type={story.preview}/>
        <div className="card-body"><span className="micro">{story.company}</span><div className="card-title"><h3>{story.title}</h3><span className="card-arrow"><Icon name="diagonal" size={18}/></span></div><p>{story.question}</p></div>
      </button>)}
    </div>
    <dialog ref={dialog} aria-labelledby="story-title" onClose={() => setSelected(null)} onClick={e => { if (e.target === dialog.current) dialog.current.close(); }}>
      {selected && <article className="case-inner">
        <div className="case-head"><span className="micro">{selected.title}</span><button className="close-button" onClick={() => dialog.current.close()} aria-label="Close work story" autoFocus><Icon name="close"/></button></div>
        <div className="case-content"><p className="eyebrow"><span/>{selected.company} · {selected.period}</p><h2 id="story-title">{selected.question}</h2><p>{selected.intro}</p>
          {selected.actions.map(([title,body]) => <div className="case-point" key={title}><h3>{title}</h3><p>{body}</p></div>)}
          <p className="case-role">{selected.role}</p>
        </div>
      </article>}
    </dialog>
  </section>;
}

function Experience() {
  return <section className="experience section" id="experience" aria-labelledby="career-title">
    <div className="shell experience-layout">
      <div className="career-intro"><p className="eyebrow">Experience</p><h2 id="career-title">My career <em>route.</em></h2>
        <p>I studied mechanical engineering at Lovely Professional University before joining Rivigo in 2016. Since then, I’ve worked with drivers, delivery centres, warehouses and vendors.</p>
        <figure className="office-print"><img src="/images/at-work.webp" alt="Amardeep seated at a laptop" width="610" height="407" loading="lazy"/></figure>
        <div className="tools"><h3>My everyday toolkit</h3><ul><li>SAP</li><li>Power BI</li><li>Excel</li></ul></div>
      </div>
      <div className="role-list">{roles.map((role, i) => <details key={role.company} className="role" name="career" open={i === 0}>
        <summary><span className="stop" aria-hidden="true"/><div><span className="micro">{role.dates}</span><h3>{role.company}</h3><span className="role-title">{role.title}</span></div><span className="toggle-indicator" aria-hidden="true"/></summary>
        <p>{role.summary}</p>
      </details>)}</div>
    </div>
  </section>;
}

function Profile() {
  return <section className="shell profile section" id="profile" aria-labelledby="profile-title">
    <div className="profile-heading"><p className="eyebrow">About me</p><h2 id="profile-title">Off the <em>clock.</em></h2><p>Outside work, I love to travel, follow the markets and make time for cricket.</p></div>
    <div className="hobby-board">
      <figure className="travel-print"><span className="tape" aria-hidden="true"/><img loading="lazy" src="/images/travel.webp" alt="Amardeep on a trip to the mountains" width="450" height="600"/><figcaption>Mountain days</figcaption></figure>
      <div className="hobby travel-hobby"><img src="/images/plane-sticker.webp" loading="lazy" alt="" width="300" height="300"/><h3>Travel</h3></div>
      <div className="hobby stocks-hobby"><img src="/images/stocks-sticker.webp" loading="lazy" alt="" width="300" height="300"/><h3>Stock trading</h3></div>
      <div className="hobby cricket-hobby"><img src="/images/cricket-sticker.webp" loading="lazy" alt="" width="300" height="300"/><h3>Cricket</h3></div>
    </div>
  </section>;
}

function Contact() {
  return <footer id="contact">
    <div className="shell">
      <p className="eyebrow"><span/>Contact</p>
      <div className="contact-layout"><h2>Let’s talk <em>operations.</em></h2><div className="contact-links">
        <p>Have a supply chain opportunity in mind? I’d love to hear from you.</p>
        <a href={"mailto:"+email}><span>{email}</span><Icon name="diagonal"/></a>
        <a href={linkedIn} target="_blank" rel="noreferrer"><span>Connect on LinkedIn</span><Icon name="diagonal"/></a>
      </div></div>
      <div className="footer-baseline"><span>Amardeep Kumar Sah</span><a href="#home">Back to top <span aria-hidden="true">↑</span></a></div>
    </div>
  </footer>;
}

function App() {
  return <div id="home"><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main"><div className="intro-paper"><Hero/></div><Work/><Experience/><Profile/></main><Contact/></div>;
}

createRoot(document.getElementById("root")).render(<App/>);
