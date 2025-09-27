import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

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
  const location = useLocation()
  // Load service images only from src/images/servicess
  const images = useMemo(() => {
    const map = import.meta.glob('../images/servicess/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,svg,SVG}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
    const entries = Object.entries(map).map(([k, v]) => {
      const base = k.split('/').pop() || ''
      return [base.toLowerCase(), v] as const
    })
    return new Map(entries)
  }, [])

  const canonicalAnchor = (title: string) => {
    const parts = title.replace(/&/g, ' ').split(/[^A-Za-z0-9]+/).filter(Boolean)
    const filtered = parts.filter((p) => p.toLowerCase() !== 'and')
    return filtered.join('_')
  }

  
  const buildTitleStems = (title: string): string[] => {
    const lower = title.toLowerCase()
    // Replace ampersands with word boundary spaces so they can be dropped optionally
    const replaced = lower.replace(/&/g, ' ')
    // Tokens (alnum only)
    const tokens = replaced.replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean)
    const noAnd = tokens.filter((t) => t !== 'and')

    const stems = new Set<string>()
    const addForms = (arr: string[]) => {
      if (!arr.length) return
      stems.add(arr.join('-'))
      stems.add(arr.join('_'))
    }
    addForms(tokens)
    addForms(noAnd)
    return Array.from(stems)
  }

  const getImage = (sectionId: string, itemId?: string, title?: string) => {
    const candidates: string[] = []
    if (itemId) {
      candidates.push(`${sectionId}-${itemId}`)
      candidates.push(`${itemId}`)
    }
    if (title) {
      const stems = buildTitleStems(title)
      for (const s of stems) {
        candidates.push(s)
        candidates.push(`${sectionId}-${s}`)
      }
    }
    candidates.push(`${sectionId}`)
    // Search filenames (lowercased) that start with stem + '.'
    for (const stem of candidates) {
      const found = [...images.entries()].find(([name]) => name.startsWith(stem.toLowerCase() + '.'))
      if (found) return found[1]
    }
    return null
  }

  // Open matching section whenever the URL hash changes (including Link navigations)
  useEffect(() => {
    const raw = (location.hash || '').replace('#', '')
    if (!raw) return
    const hash = raw.toLowerCase()
    const secMatch = sections.find((s) => `sec-${s.id}` === raw)
    if (secMatch) {
      setOpenSection(secMatch.id)
      return
    }
    for (const sec of sections) {
      for (const it of sec.items) {
        const anchor = canonicalAnchor(it.title)
        if (
          anchor.toLowerCase() === hash ||
          `item-${sec.id}-${it.id}` === raw ||
          `${sec.id}-${it.id}` === raw
        ) {
          setOpenSection(sec.id)
          // Scroll after render
          setTimeout(() => {
            const el = document.getElementById(anchor)
            el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 0)
          return
        }
      }
    }
  }, [location.hash])

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? id : id))
    // reflect in URL for clarity/sharing
    try {
      window.history.replaceState(null, '', `#sec-${id}`)
    } catch {}
  }

  const activeSection = sections.find((s) => s.id === openSection)

  return (
    <section className="services-page">
      <h2>{activeSection?.title ?? 'Services'}</h2>
      {activeSection?.tagline && (
        <p style={{ marginTop: 0, opacity: 0.9 }}>{activeSection.tagline}</p>
      )}
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
              <div className="service-list">
                {sec.items.map((it) => {
                  const imgUrl = getImage(sec.id, it.id, it.title)
                  const blockClass = 'service-block'
                  const anchor = canonicalAnchor(it.title)
                  return (
                    <div className={blockClass} id={anchor} key={it.id}>
                      <div className="service-media">
                        {imgUrl ? (
                          <img src={imgUrl} alt={`${it.title} illustration`} />
                        ) : (
                          <div className="media-placeholder" aria-hidden />
                        )}
                      </div>
                      <div className="service-content">
                        <h3><a href={`#${anchor}`}>{it.title}</a></h3>
                        <p>{it.detail}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
