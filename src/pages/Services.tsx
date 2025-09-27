import { useEffect, useState } from 'react'

type Item = {
  id: string
  title: string
  detail: string
}

type Section = {
  id: string
  title: string
  tagline?: string
  items: Item[]
}

const sections: Section[] = [
  {
    id: 'dpe',
    title: 'Digital Product Engineering',
    tagline: 'Engineering your future with breakthrough solutions.',
    items: [
      { id: 'concept', title: 'Concept & Ideation', detail: 'Turn ideas into validated concepts and actionable roadmaps with discovery workshops, PoCs, and MVP scoping.' },
      { id: 'rdd', title: 'Research, Design & Development', detail: 'From discovery to delivery: user research, UX/UI, architecture, and agile implementation to ship features faster.' },
      { id: 'test', title: 'Test Engineering', detail: 'Quality at speed with automation, API/UI tests, performance, security, and continuous testing in CI/CD.' },
      { id: 'sre', title: 'Support & Reliability', detail: 'SRE, monitoring, alerting, and L2/L3 support to ensure reliability, scalability, and uptime.' },
      { id: 'docs', title: 'Documentation and Training', detail: 'Clear developer docs, user guides, and enablement sessions to accelerate adoption.' },
      { id: 'migration', title: 'Migration', detail: 'Modernize and migrate legacy systems with near‑zero downtime and data integrity.' },
      { id: 'reeng', title: 'Re-Engineering', detail: 'Refactor and re‑architect for performance, maintainability, cost, and team velocity.' },
    ],
  },
  {
    id: 'tech',
    title: 'Technology Solutions',
    tagline: 'Transforming businesses with cutting-edge tech solutions.',
    items: [
      { id: 'arch', title: 'Architectural Services', detail: 'Design scalable, secure, and cost‑efficient architectures with reviews, guardrails, and blueprints.' },
      { id: 'bigdata', title: 'Big Data', detail: 'Ingest, process, and analyze large data at scale: pipelines, lakes, warehouses, and governance.' },
      { id: 'bi', title: 'Business Intelligence', detail: 'Self‑service BI, dashboards, and KPIs that drive decisions teams can trust.' },
      { id: 'cloud', title: 'Cloud', detail: 'AWS/Azure/GCP landing zones, networking, security, and IaC with Terraform/CDK.' },
      { id: 'devops', title: 'ALM & DevOps', detail: 'CI/CD, GitOps, observability, and environment automation to ship continuously.' },
      { id: 'mobility', title: 'Mobility', detail: 'Native and cross‑platform mobile apps with delightful UX and reliable performance.' },
    ],
  },
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    tagline: 'Harnessing AI for smarter decisions and endless possibilities.',
    items: [
      { id: 'genai', title: 'Generative AI', detail: 'Chat, summarization, and content generation with safety, evaluation, and RAG over your data.' },
      { id: 'ml', title: 'Data Analytics and AI/ML Solutions', detail: 'Predictive models, feature stores, and MLOps to put ML into production responsibly.' },
    ],
  },
  {
    id: 'dx',
    title: 'Digital Transformation',
    tagline: 'Building tailored solutions for your digital vision.',
    items: [
      { id: 'strategy', title: 'Consulting & Strategy', detail: 'Assessments, roadmaps, and outcome‑driven plans aligned to your business goals.' },
      { id: 'content', title: 'Content Writing', detail: 'Clear, on‑brand content for web and product documentation.' },
      { id: 'creative', title: 'Creative Services', detail: 'Branding, visual design, and assets that elevate your product.' },
      { id: 'marketing', title: 'Digital Marketing', detail: 'SEO/SEM, campaigns, and analytics to grow demand and engagement.' },
      { id: 'ux', title: 'UI/UX Services', detail: 'Research‑driven UX and accessible UI that users love.' },
    ],
  },
  {
    id: 'support',
    title: 'Support Services',
    tagline: 'Safeguarding your success with reliable support.',
    items: [
      { id: 'tas', title: 'Technical and Application Support', detail: 'Proactive monitoring, incident response, and knowledge‑centered support.' },
      { id: 'rim', title: 'Remote Infrastructure Management (RIM)', detail: '24×7 operations for networks, servers, backups, and compliance.' },
    ],
  },
]

export default function Services() {
  const [openSection, setOpenSection] = useState<string>('dpe') // default open: Digital Product Engineering
  const [openItem, setOpenItem] = useState<string | null>(null)

  // If navigated with a hash (e.g., /services#sec-tech), open the matching section
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const match = sections.find((s) => `sec-${s.id}` === hash)
      if (match) setOpenSection(match.id)
    }
  }, [])

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? id : id))
    setOpenItem(null)
  }

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id))
  }

  return (
    <section>
      <h2>Services</h2>
      <div className="accordion">
        {sections.map((sec) => (
          <div className="section" key={sec.id}>
            <button
              className={"section-header" + (openSection === sec.id ? ' open' : '')}
              onClick={() => toggleSection(sec.id)}
              aria-expanded={openSection === sec.id}
              aria-controls={`sec-${sec.id}`}
            >
              <div className="section-header-inner">
                <div className="section-text">
                  <div className="section-title">{sec.title}</div>
                  {sec.tagline && <div className="section-tagline">{sec.tagline}</div>}
                </div>
                <span className={"chevron" + (openSection === sec.id ? ' open' : '')} aria-hidden>⌄</span>
              </div>
            </button>
            <div
              id={`sec-${sec.id}`}
              className={"items collapse" + (openSection === sec.id ? ' open' : '')}
              aria-hidden={openSection !== sec.id}
            >
              {sec.items.map((it) => (
                <div className="item" key={it.id}>
                  <button
                    className={"item-title" + (openItem === it.id ? ' active' : '')}
                    onClick={() => toggleItem(it.id)}
                    aria-expanded={openItem === it.id}
                    aria-controls={`item-${it.id}`}
                  >
                    <span>{it.title}</span>
                    <span className={"chevron" + (openItem === it.id ? ' open' : '')} aria-hidden>⌄</span>
                  </button>
                  <div
                    id={`item-${it.id}`}
                    className={"item-detail collapse" + (openItem === it.id ? ' open' : '')}
                    aria-hidden={openItem !== it.id}
                  >
                    <p>{it.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
