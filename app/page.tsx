import PdfDownloadButton from "../components/PdfDownloadButton";
import WebGLBackdrop from "../components/WebGLBackdrop";

const expertise = [
  "Python",
  "FastAPI",
  "Next.js",
  "Node.js",
  "Agentic Workflows",
  "RAG",
  "LangChain",
  "OpenAI",
  "Anthropic",
  "Gemini",
  "Salesforce Agentforce",
  "Custom MCP Servers",
  "AWS",
  "Google Cloud Platform (GCP)",
  "Vercel",
  "CI/CD Pipelines",
  "Salesforce (Administrator, Developer)",
  "Jira Automation",
];

const experience = [
  {
    company: "Assent",
    title: "AI Solutions Architect",
    location: "Canada",
    dates: "February 2025 - Present",
    bullets: [
      "Designed and implemented secure, auditable GenAI architectures for a compliance platform using Python, connecting internal apps to models like OpenAI and Anthropic via custom MCP servers.",
      "Saved the company over 20,000 man-hours in a single year and generated over $1 million in savings by deploying agentic workflows that replaced manual labor.",
      "Drove internal AI adoption from 47% to 97% by establishing clear governance, documentation, and reusable patterns for admins and developers.",
      "Managed multi-cloud deployments across AWS, GCP, and Vercel to ensure high availability for AI tools.",
    ],
  },
  {
    company: "Sesh | AI Solutions",
    title: "AI Solutions Architect",
    location: "Toronto, Ontario",
    dates: "November 2021 - Present",
    bullets: [
      "Designed the architecture for over 120 GenAI applications and 90+ chatbots solving real-world day-to-day problems for clients.",
      "Lead a community of 100+ people, teaching AI news, tutorials, and technical implementation strategies to help members extrapolate AI tech into their daily work.",
      "Conducted webinars and talks for organizations such as Latinas in Tech and Somos Latinos in Tech Ottawa.",
      "Helped 40+ small businesses implement GenAI-powered workflows to connect CRMs and operations tools.",
    ],
  },
  {
    company: "Online Business Systems",
    title: "Salesforce Consultant",
    location: "Toronto, Ontario",
    dates: "June 2024 - November 2024",
    bullets: [
      "Configured AI assistants and copilot-style experiences, defining use cases and wiring data access safely for enterprise clients.",
      "Aligned sales and marketing teams by integrating Marketing Cloud Account Engagement with intelligent automation patterns.",
    ],
  },
  {
    company: "Globalization Partners",
    title: "Salesforce Manager",
    location: "Ontario, Canada",
    dates: "November 2018 - November 2023",
    bullets: [
      'Developed "GIA," an internal chatbot, and GenAI-powered workflows for Jira and Salesforce before they were industry standards.',
      "Managed a 1,000+ license org, overseeing the transition from basic configuration to complex, code-heavy automation and AI-assisted development.",
      "Utilized LLMs to support development patterns while adhering to strict compliance and governance standards.",
    ],
  },
];

export default function Home() {
  return (
    <main className="page" id="resume-root">
      <section className="hero">
        <WebGLBackdrop />
        <div className="hero-inner">
          <div className="intro">
            <p className="role">AI Solutions Architect</p>
            <h1 className="name">Alejandro De La Mora</h1>
            <p className="summary">
              AI Solutions Architect with deep expertise in designing and deploying
              scalable GenAI systems. I have architected over{" "}
              <strong>120 production-grade applications</strong> and{" "}
              <strong>90+ chatbots</strong>, utilizing Python, Agents, and Cloud
              infrastructure (AWS, GCP, Vercel). My work focuses on bridging the
              gap between &quot;demo&quot; and &quot;production,&quot; building
              robust Gateway architectures, custom MCP servers, and Agentic
              Workflows. I have successfully driven AI adoption from{" "}
              <strong>47% to 97%</strong> in enterprise environments and delivered
              over <strong>$1 million in savings</strong> by automating complex
              operational tasks.
            </p>
          </div>
          <aside className="contact-card" aria-label="Contact details">
            <PdfDownloadButton />
            <div className="contact-item">
              <span>Email</span>
              <a href="mailto:alex@seshwithfriends.org">
                alex@seshwithfriends.org
              </a>
            </div>
            <div className="contact-item">
              <span>Phone</span>
              <a href="tel:+14372433693">+1 437 243 3693</a>
            </div>
            <div className="contact-item">
              <span>LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/amorac/"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/amorac
              </a>
            </div>
            <div className="contact-item">
              <span>Website</span>
              <a
                href="https://www.eloruga.com/about/index.html"
                target="_blank"
                rel="noreferrer"
              >
                eloruga.com
              </a>
            </div>
            <div className="contact-item">
              <span>GitHub</span>
              <a
                href="https://github.com/Oruga420"
                target="_blank"
                rel="noreferrer"
              >
                github.com/Oruga420
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" aria-labelledby="expertise">
        <h2 className="section-title" id="expertise">
          Areas of Expertise
        </h2>
        <div className="chip-grid">
          {expertise.map((skill) => (
            <span className="chip" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="experience">
        <h2 className="section-title" id="experience">
          Work Experience
        </h2>
        <div className="experience-list">
          {experience.map((role) => (
            <article className="experience-card" key={`${role.company}-${role.dates}`}>
              <div className="experience-header">
                <div>
                  <h3>{role.title}</h3>
                  <p className="company">
                    {role.company} | {role.location}
                  </p>
                </div>
                <p className="dates">{role.dates}</p>
              </div>
              <ul>
                {role.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="education">
        <h2 className="section-title" id="education">
          Education
        </h2>
        <div className="education-grid">
          <div className="education-card">
            <h3>Ingenieria en Sistemas (Systems Engineering)</h3>
            <p>Universidad Marista de MAcrida | 2004 - 2007</p>
          </div>
          <div className="education-card">
            <h3>Certifications</h3>
            <ul>
              <li>Salesforce Certified AI Associate</li>
              <li>Salesforce Certified Administrator (SCA)</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
