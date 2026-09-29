"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, X, ArrowLeft, ArrowRight, Package, LayoutDashboard, Users, MousePointerClick, Smartphone, Layers, Network, PenTool, Mail, MapPin, Type as TypeIcon, Eye, type LucideIcon } from "lucide-react";
import { projects, type Project } from "@/data/projects";

const GH = "https://github.com/bharti78", LI = "https://www.linkedin.com/in/bhartidhote/";
const NAV = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];
const ROLES = ["Product Designer", "UI/UX Designer", "Interaction Designer", "Frontend Developer"];
const ease = [0.25, 0.46, 0.45, 0.94] as const;

function useTypewriter(words: string[]) {
  const [t, setT] = useState(""); const [w, setW] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const full = words[w];
    const id = setTimeout(() => {
      if (!del) { setT(full.slice(0, t.length + 1)); if (t.length + 1 === full.length) setTimeout(() => setDel(true), 1200); }
      else { setT(full.slice(0, t.length - 1)); if (t.length - 1 === 0) { setDel(false); setW((w + 1) % words.length); } }
    }, del ? 40 : 90);
    return () => clearTimeout(id);
  }, [t, del, w, words]);
  return t;
}

function Preview({ url, title, h = 200 }: { url: string; title: string; h?: number }) {
  const s = 0.3;
  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ height: h }}>
      <iframe src={url} title={`${title} live preview`} loading="lazy" tabIndex={-1} aria-hidden className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
        style={{ width: `${100 / s}%`, height: `${100 / s}%`, transform: `scale(${s})` }} />
    </div>
  );
}

function Section({ id, title, desc, children }: { id: string; title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col items-center px-4 py-20">
      <motion.div className="w-full max-w-[1100px]" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease }}>
        <h2 className="my-5 text-center text-3xl font-semibold md:text-[52px]">{title}</h2>
        {desc && <p className="mx-auto mb-10 max-w-[600px] text-center text-base font-semibold text-ts md:text-lg">{desc}</p>}
        {children}
      </motion.div>
    </section>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-30 flex h-20 items-center justify-center border-b border-white/10 bg-bg/90 backdrop-blur-md">
      <div className="flex w-full max-w-[1200px] items-center justify-between px-6">
        <a href="#about" className="flex items-center text-lg font-medium transition hover:scale-105 hover:text-primary"><span className="text-3xl text-primary">&lt;</span>Bharti<span className="text-primary">/</span>Dhote<span className="text-3xl text-primary">&gt;</span></a>
        <ul className="hidden items-center gap-8 md:flex">{NAV.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`} className="rounded-lg px-4 py-2 font-medium transition hover:-translate-y-0.5 hover:bg-primary/10 hover:text-primary">{n}</a></li>)}</ul>
        <a href={GH} target="_blank" rel="noreferrer" className="btn hidden !py-2 text-primary hover:bg-primary hover:!text-white md:inline-flex"><Github size={18} />GitHub Profile</a>
        <button className="text-2xl md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
      </div>
      <AnimatePresence>{open && (
        <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute left-0 right-0 top-20 bg-bg/95 p-4 md:hidden">
          {NAV.map((n) => <li key={n}><a onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`} className="block rounded-lg px-4 py-3 hover:bg-primary/10 hover:text-primary">{n}</a></li>)}
        </motion.ul>)}</AnimatePresence>
    </nav>
  );
}

function Hero() {
  const text = useTypewriter(ROLES);
  const up = (d: number) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease, delay: d } });
  return (
    <section id="about" className="relative flex min-h-screen justify-center px-6 py-20 [clip-path:polygon(0_0,100%_0,100%_100%,70%_95%,0_100%)]">
      <div className="absolute inset-0" style={{ background: "linear-gradient(38.73deg,rgba(204,0,187,.15) 0%,rgba(201,32,184,0) 50%),linear-gradient(141.27deg,rgba(0,70,209,0) 50%,rgba(0,70,209,.15) 100%)" }} />
      <div className="relative flex w-full max-w-[1100px] flex-col items-center justify-between gap-10 md:flex-row">
        <div className="flex w-full flex-col gap-8 md:order-1">
          <div>
            <motion.h1 {...up(0.1)} className="text-4xl font-bold leading-tight md:text-[50px] md:leading-[68px]">Hi, I am <br /><span className="text-primary">Bharti Dhote</span></motion.h1>
            <motion.div {...up(0.2)} className="flex min-h-[68px] items-center gap-3 text-xl font-semibold md:text-[32px]">I am a <span className="text-primary">{text}<span className="blink font-normal">|</span></span></motion.div>
          </div>
          <motion.p {...up(0.3)} className="text-lg leading-8 text-tp/95 md:text-xl">Product designer with a strong frontend background, focused on creating intuitive interfaces, thoughtful user experiences, and polished digital products.</motion.p>
          <motion.div {...up(0.4)} className="flex flex-wrap gap-4">
            <a href="#projects" className="btn grad text-white">View Work</a>
            <a href={LI} target="_blank" rel="noreferrer" className="btn text-primary hover:bg-primary hover:text-white"><Linkedin size={16} />LinkedIn</a>
          </motion.div>
        </div>
        <motion.div {...up(0.3)} className="float md:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/HeroImage1.png" alt="Bharti Dhote" className="h-[300px] w-[300px] rounded-full border-2 border-primary object-cover md:h-[400px] md:w-[400px]" />
        </motion.div>
      </div>
    </section>
  );
}

const dv = (n: string, f = `${n}-original`) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${f}.svg`;
type Skill = { name: string; icon?: LucideIcon; img?: string; invert?: boolean };
const SKILLS: { title: string; items: Skill[] }[] = [
  { title: "Product & UX", items: [
    { name: "Product Design", icon: Package }, { name: "UX Design", icon: Users },
    { name: "Information Architecture", icon: Network }, { name: "Design Systems", icon: Layers } ] },
  { title: "Interface & Interaction", items: [
    { name: "UI Design", icon: LayoutDashboard }, { name: "Visual Hierarchy", icon: Eye }, { name: "Typography", icon: TypeIcon },
    { name: "Interaction Design", icon: MousePointerClick }, { name: "Responsive Design", icon: Smartphone }, { name: "Prototyping", icon: PenTool } ] },
  { title: "Frontend Implementation", items: [
    { name: "React", img: dv("react") }, { name: "Next.js", img: dv("nextjs"), invert: true }, { name: "JavaScript", img: dv("javascript") },
    { name: "TypeScript", img: dv("typescript") }, { name: "HTML", img: dv("html5") }, { name: "CSS", img: dv("css3") },
    { name: "Tailwind CSS", img: dv("tailwindcss") }, { name: "Node.js", img: dv("nodejs") }, { name: "Python", img: dv("python") } ] },
];
function Skills() {
  return (
    <Section id="skills" title="Skills" desc="Design-first skills, backed by the ability to build what I design.">
      <div className="grid gap-8 md:grid-cols-2">{SKILLS.map(({ title, items }, ci) => (
        <div key={title} className={`card px-9 py-5 ${ci === 2 ? "md:col-span-2" : ""}`}><h3 className="mb-5 text-center text-2xl font-semibold text-ts">{title}</h3>
          <div className="flex flex-wrap justify-center gap-3">{items.map(({ name, icon: Icon, img, invert }) => (
            <span key={name} className="chip flex items-center gap-2">
              {Icon ? <Icon size={20} className="text-primary" /> : /* eslint-disable-next-line @next/next/no-img-element */
                <img src={img} alt="" width={22} height={22} loading="lazy" className={`h-[22px] w-[22px] ${invert ? "invert" : ""}`} onError={(e) => (e.currentTarget.style.display = "none")} />}
              {name}</span>))}</div></div>))}</div>
    </Section>
  );
}

const INDITECH_LOGO = "https://media.licdn.com/dms/image/v2/D4D0BAQEDFqXHKKgdNw/company-logo_200_200/company-logo_200_200/0/1694257912595/inditech_technology_services_private_limited_logo?e=2147483647&v=beta&t=C7vb55wLgkw5hbA-ZhiJ7tCX10lJCN0zyBQkFI49xMk";
const COINCENT_LOGO = "https://media.licdn.com/dms/image/v2/D560BAQEhSFgYhzTpYA/company-logo_200_200/B56Zd34m36GQAI-/0/1750063017899/coincent_ai_logo?e=2147483647&v=beta&t=fHHRvju7PseCYsTThtlvU-9TK9dPtoPNpcVcKpHIw8Q";
function Logo({ src, name }: { src: string; name: string }) {
  const [bad, setBad] = useState(false);
  return bad ? <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-white/5 text-xl font-semibold text-primary">{name[0]}</span>
    : /* eslint-disable-next-line @next/next/no-img-element */ <img src={src} alt={`${name} logo`} width={60} height={60} referrerPolicy="no-referrer" onError={() => setBad(true)} className="h-[60px] w-[60px] shrink-0 rounded-full border-2 border-primary/30 bg-white/5 object-cover" />;
}
type Exp = { img: string; role: string; company: string; date: string; desc: string; skills: string[]; doc?: string };
const EXPERIENCE: Exp[] = [
  { img: INDITECH_LOGO, role: "Product Development Intern", company: "Inditech Technology Services Pvt. Ltd.", date: "Apr 2025 - Jan 2026",
    desc: "Worked at Inditech Technology Services Pvt. Ltd. as a Product Development Intern (Remote). I have developed 3+ real-time healthcare products using Python, Django, and PHP, integrating 20+ secure REST APIs with 99.9% uptime. I collaborate closely with UI/UX, QA, and DevOps teams to deliver scalable, production-ready applications, optimizing backend performance by 30% through efficient Django ORM queries and caching techniques.",
    skills: ["Python", "Django", "PHP", "MySQL", "REST APIs", "Backend Development", "Frontend Development", "Database Management", "Django ORM", "Caching Optimization", "Performance Optimization", "Collaboration with UI/UX, QA, DevOps", "Scalable Product Development"] },
  { img: COINCENT_LOGO, role: "AI with Python Intern", company: "Coincent.ai", date: "Apr 2024 - Jun 2024",
    desc: "Worked at Coincent.ai as an Artificial Intelligence with Python Intern. I architected and fine-tuned a Vision Transformer model for image classification on the Oxford-IIIT Pet dataset, achieving a 15% accuracy improvement. Additionally, I designed and implemented a text classification model using TensorFlow, including data preprocessing, model architecture, training, and evaluation, achieving 92% accuracy on the test data.",
    skills: ["Python", "Machine Learning", "Deep Learning", "Vision Transformers (ViT)", "Text Classification", "TensorFlow", "Keras", "Data Preprocessing", "Feature Engineering", "Model Evaluation", "Accuracy Optimization"],
    doc: "https://drive.google.com/file/d/1dl3juW0xY86bM1gNibmZP0mS7ggsvPbF/view?usp=sharing" },
  { img: "https://miro.medium.com/v2/resize:fit:400/1%2AZfYWXN0zA6TqQQ7wGNJUOg.jpeg", role: "GirlScript Summer of Code 2025 Contributor", company: "GirlScript", date: "Jul 2025 - Present",
    desc: "Worked as an Open Source Contributor in GirlScript Summer of Code (GSSoC), contributing to real-world projects and collaborating with the developer community.",
    skills: ["ReactJS", "HTML", "CSS", "JavaScript", "GitHub", "Team work"] },
];
function Experience() {
  return (
    <Section id="experience" title="Experience" desc="Where I have worked and what I have learned.">
      <div className="mx-auto max-w-3xl border-l-2 border-primary/40 pl-6">{EXPERIENCE.map((e) => (
        <div key={e.company} className="relative"><span className="absolute -left-[33px] top-9 h-4 w-4 rounded-full bg-primary" />
          <div className="card my-4 flex gap-4 p-6"><Logo src={e.img} name={e.company} />
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-semibold">{e.role}</h3><p className="font-medium text-primary">{e.company}</p><p className="mb-3 text-sm text-ts">{e.date}</p>
              <p className="text-sm leading-relaxed text-ts">{e.desc}</p>
              <h4 className="mb-2 mt-4 text-sm font-semibold">Skills</h4>
              <div className="flex flex-wrap gap-2">{e.skills.map((k) => <span key={k} className="rounded-lg border border-white/25 px-2.5 py-1 text-xs text-tp/80">{k}</span>)}</div>
              {e.doc && <a href={e.doc} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"><ExternalLink size={14} />View Document</a>}
            </div></div></div>))}</div>
      <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-ts">LeetCode Knight (1900+) · CodeChef 3★ (1600+) · Flipkart GRiD 8.0 Semifinalist · GHCI Scholar · GirlScript Summer of Code · Amazon Future Engineer Bootcamp · TBO Hackathon Final Round</p>
    </Section>
  );
}

const SCHOOL_LOGO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV8XxQXvcdySPq-4dU-s9ooGWWLkNq2j9xuw&s";
const EDUCATION = [
  { img: "https://cdn.iiitkota.ac.in/site/iiitkota.png", school: "Indian Institute of Information Technology, Kota", degree: "Bachelor of Technology - BTech, Computer Science and Engineering", date: "Aug 2023 - Sep 2027", grade: "6.55 CGPA",
    desc: "I am currently pursuing a Bachelor's degree in Electronics and Communication at Indian Institute of Information Technology, Kota. I have completed 4 semesters and have a CGPA of 6.55. I have taken courses in Data Structures, Algorithms, Object-Oriented Programming in C++, Database Management Systems, Operating Systems, among others." },
  { img: SCHOOL_LOGO, school: "Vijay Jyoti Academy School, Dewas", degree: "State Board(XII), Science", date: "Apr 2021 - Apr 2023", grade: "90.8%", desc: "I completed my class 12 high school education at Vijay Jyoti Academy, Dewas, where I studied Science" },
  { img: SCHOOL_LOGO, school: "Vijay Jyoti Academy School, Dewas", degree: "State Board(X)", date: "Apr 2008 - Apr 2021", grade: "80%", desc: "I completed my class 10 education at Vijay Jyoti Academy School, Dewas." },
];
function Education() {
  return (
    <Section id="education" title="Education" desc="My education has been a journey of self-discovery and growth.">
      <div className="mx-auto max-w-3xl border-l-2 border-primary/40 pl-6">{EDUCATION.map((e) => (
        <div key={e.date} className="relative"><span className="absolute -left-[33px] top-9 h-4 w-4 rounded-full bg-primary" />
          <div className="card my-4 flex gap-4 p-6"><Logo src={e.img} name={e.school} />
            <div className="min-w-0 flex-1">
              <h3 className="text-xl font-semibold">{e.school}</h3><p className="font-medium text-primary">{e.degree}</p><p className="mb-3 text-sm text-ts">{e.date}</p>
              <p className="mb-3 text-sm"><span className="font-semibold">Grade:</span> <span className="text-ts">{e.grade}</span></p>
              <p className="text-sm leading-relaxed text-ts">{e.desc}</p>
            </div></div></div>))}</div>
    </Section>
  );
}

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: (i: number) => void }) {
  return (
    <div role="button" tabIndex={0} onClick={() => onOpen(i)} onKeyDown={(e) => e.key === "Enter" && onOpen(i)} className="card group flex w-full max-w-[400px] cursor-pointer flex-col justify-self-center">
      <div className="relative overflow-hidden"><div className="transition-transform duration-500 group-hover:scale-110"><Preview url={p.live} title={p.title} /></div>
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/70 opacity-0 transition-opacity group-hover:opacity-100">
          <a onClick={(e) => e.stopPropagation()} href={p.live} target="_blank" rel="noreferrer" aria-label="Live" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 hover:bg-primary"><ExternalLink size={16} /></a>
          <a onClick={(e) => e.stopPropagation()} href={p.repo} target="_blank" rel="noreferrer" aria-label="Source" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 hover:bg-primary"><Github size={16} /></a></div></div>
      <div className="flex flex-1 flex-col gap-3 p-5"><span className="text-xs font-medium uppercase tracking-wider text-primary">{p.category}</span>
        <h3 className="text-xl font-semibold">{p.title}</h3><p className="text-sm leading-relaxed text-ts">{p.tagline}</p>
        <div className="flex flex-wrap gap-2">{p.focus.slice(0, 3).map((f) => <span key={f} className="rounded-full border border-primary/40 px-3 py-1 text-xs text-primary">{f}</span>)}</div>
        <span className="mt-auto pt-2 text-sm font-medium text-primary">View case study →</span></div>
    </div>
  );
}

const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };
function Modal({ index, go, close }: { index: number; go: (i: number) => void; close: () => void }) {
  const p = projects[index], prev = projects[index - 1], next = projects[index + 1];
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [close]);
  const h = "text-xs font-semibold uppercase tracking-widest text-primary";
  return (
    <motion.div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
      <motion.div role="dialog" aria-modal="true" aria-label={p.title} onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.5, ease }}
        className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#171721] p-6 md:p-10">
        <button onClick={close} aria-label="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-primary"><X size={18} /></button>
        <AnimatePresence mode="wait">
          <motion.div key={p.id} variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }} initial="hidden" animate="show" exit={{ opacity: 0, x: -30 }}>
            <motion.p variants={item} className={h}>{String(index + 1).padStart(2, "0")} · {p.category}</motion.p>
            <motion.h2 variants={item} className="mt-2 text-3xl font-bold md:text-5xl">{p.title}</motion.h2>
            <motion.p variants={item} className="mt-3 max-w-2xl text-ts">{p.tagline}</motion.p>
            <motion.div variants={{ hidden: { clipPath: "inset(0 0 100% 0)" }, show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.9, ease } } }} className="mt-8 overflow-hidden rounded-xl border border-white/10"><Preview url={p.live} title={p.title} h={380} /></motion.div>
            {[["Overview", p.overview], ["The experience", p.experience]].map(([t, b]) => <motion.section key={t} variants={item} className="mt-8"><h3 className={h}>{t}</h3><p className="mt-2 leading-relaxed">{b}</p></motion.section>)}
            <motion.section variants={item} className="mt-8"><h3 className={h}>Key design decisions</h3>
              <ul className="mt-3 grid gap-3 md:grid-cols-2">{p.decisions.map((d, i) => <li key={d.title} className="card !transform-none p-4"><span className="text-sm text-primary">0{i + 1}</span><h4 className="font-semibold">{d.title}</h4><p className="text-sm text-ts">{d.body}</p></li>)}</ul></motion.section>
            <motion.section variants={item} className="mt-8"><h3 className={h}>What I built</h3><p className="mt-2">{p.built}</p></motion.section>
            <motion.section variants={item} className="mt-6"><h3 className={h}>Design focus</h3><div className="mt-2 flex flex-wrap gap-2">{p.focus.map((t) => <span key={t} className="chip !py-1.5 text-sm">{t}</span>)}</div>
              {p.tech.length > 0 && <p className="mt-4 text-xs text-ts/70">Built with {p.tech.join(" · ")}</p>}</motion.section>
            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3"><a href={p.live} target="_blank" rel="noreferrer" className="btn grad text-white">View Live</a><a href={p.repo} target="_blank" rel="noreferrer" className="btn text-primary hover:bg-primary hover:text-white">View Source</a></motion.div>
            <motion.nav variants={item} className="mt-10 flex justify-between border-t border-white/10 pt-6" aria-label="Case studies">
              <button disabled={!prev} onClick={() => go(index - 1)} className="flex items-center gap-2 text-sm hover:text-primary disabled:opacity-20"><ArrowLeft size={16} />{prev?.title ?? "Previous"}</button>
              <button disabled={!next} onClick={() => go(index + 1)} className="flex items-center gap-2 text-sm hover:text-primary disabled:opacity-20">{next?.title ?? "Next"}<ArrowRight size={16} /></button>
            </motion.nav>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

const EMAIL = "bhartidhote158@gmail.com";
type Status = "idle" | "loading" | "success" | "error";
const field = "w-full rounded-xl border border-primary/30 bg-[#151a27] px-4 py-3 text-sm text-tp outline-none placeholder:text-ts/60 focus:border-primary focus:ring-2 focus:ring-primary/20";
const lbl = "mb-2 block text-xs font-semibold text-tp";

function Contact() {
  const [st, setSt] = useState<Status>("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) { // no key configured: fall back to the visitor's email app, pre-filled
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(`${d.message}\n\n— ${d.name} (${d.email})`)}`;
      return;
    }
    setSt("loading");
    try {
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: key, name: d.name, email: d.email, subject: d.subject, message: d.message, from_name: "Portfolio contact form" }) });
      const j = await r.json();
      if (!j.success) throw new Error("failed");
      setSt("success"); form.reset();
    } catch { setSt("error"); }
    setTimeout(() => setSt("idle"), 3500);
  }
  const btn = { idle: "grad", loading: "bg-primary/70", success: "bg-green-600", error: "bg-red-600" }[st];
  const text = { idle: "Send Message", loading: "Sending…", success: "Message sent ✓", error: "Failed — try again" }[st];
  const iconBox = "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary";
  const social = "flex items-center gap-2 rounded-xl border border-primary/30 px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10";
  return (
    <Section id="contact" title="Contact" desc="Feel free to reach out to me for any questions or opportunities!">
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="text-2xl font-semibold md:text-[28px]">Get in Touch</h3>
          <p className="mt-3 max-w-sm text-sm text-ts">I&apos;m always open to discussing new opportunities and interesting projects.</p>
          <div className="mt-6 space-y-4 text-sm font-semibold">
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 hover:text-primary"><span className={iconBox}><Mail size={18} /></span>{EMAIL}</a>
            <p className="flex items-center gap-4"><span className={iconBox}><MapPin size={18} /></span>Kota, Rajasthan, India</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={GH} target="_blank" rel="noreferrer" className={social}><Github size={20} />GitHub</a>
            <a href={LI} target="_blank" rel="noreferrer" className={social}><Linkedin size={20} />LinkedIn</a>
          </div>
        </div>
        <form onSubmit={onSubmit} className="rounded-3xl border border-primary/25 bg-[#111828] p-6 md:p-8">
          <div className="space-y-5">
            <div><label htmlFor="name" className={lbl}>Name</label><input id="name" name="name" required placeholder="Your Name" className={field} /></div>
            <div><label htmlFor="email" className={lbl}>Email</label><input id="email" name="email" type="email" required placeholder="your.email@example.com" className={field} /></div>
            <div><label htmlFor="subject" className={lbl}>Subject</label><input id="subject" name="subject" required placeholder="Subject" className={field} /></div>
            <div><label htmlFor="message" className={lbl}>Message</label><textarea id="message" name="message" required rows={5} placeholder="Your message..." className={`${field} resize-y`} /></div>
            <button type="submit" disabled={st === "loading"} className={`${btn} w-full rounded-xl py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-wait`} aria-live="polite">{text}</button>
          </div>
        </form>
      </div>
    </Section>
  );
}

export default function Portfolio() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero /><Skills /><Experience />
        <Section id="projects" title="Projects" desc="Click a project to open its case study.">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} onOpen={setOpen} />)}</div>
        </Section>
        <Education /><Contact />
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-ts">© 2026 Bharti Dhote</footer>
      <AnimatePresence>{open !== null && <Modal index={open} go={setOpen} close={() => setOpen(null)} />}</AnimatePresence>
    </MotionConfig>
  );
}
