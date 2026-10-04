import {useRef, useState, type CSSProperties, type KeyboardEvent} from 'react'
import {
    ArrowRight, ArrowUpRight, BriefcaseBusiness, CheckCircle2, ChevronDown, Code2, Globe2, Headphones, Smartphone
} from 'lucide-react'
import {spotlight, useReveal} from './shared'

type ServicesProps = {
    scrollTo: (id: string) => void
    enquire: (service: string, message?: string) => void
}

/* title + description are your existing copy; "points" are short, process-level notes (edit freely) */
const SERVICES = [
    {
        number: '01', icon: Globe2, title: 'Web Design & Development',
        description: 'Professional websites for businesses and brands.',
        points: ['Clear structure that explains your business', 'Layouts that work on phones and desktops', 'Enquiry forms and contact options']
    },
    {
        number: '02', icon: Code2, title: 'Custom Application Development',
        description: 'Custom web applications built around your business needs.',
        points: ['Planned around your own workflow', 'Screens designed for daily use', 'Delivered, explained and supported']
    },
    {
        number: '03', icon: BriefcaseBusiness, title: 'Business Software Solutions',
        description: 'Billing, POS, inventory and business management solutions.',
        points: ['Billing and POS', 'Inventory and stock control', 'Customers, payments and reports']
    },
    {
        number: '04', icon: Smartphone, title: 'Mobile App Development',
        description: 'Mobile applications for customers, teams and business operations.',
        points: ['Apps for your customers or your team', 'Connected to your business data', 'Built to be maintained']
    },
    {
        number: '05', icon: Headphones, title: 'Support & Maintenance',
        description: 'Ongoing support, updates, fixes and improvements.',
        points: ['Fixes and updates', 'Improvements as your needs grow', 'A real person to call']
    }
]

export function Services({scrollTo, enquire}: ServicesProps) {
    const [open, setOpen] = useState(0)
    const [headRef, headIn] = useReveal<HTMLDivElement>()
    const [listRef, listIn] = useReveal<HTMLDivElement>()
    const rows = useRef<Array<HTMLButtonElement | null>>([])

    const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
        const last = SERVICES.length - 1
        let next = open
        if (e.key === 'ArrowDown') next = open === last ? 0 : open + 1
        else if (e.key === 'ArrowUp') next = open === 0 ? last : open - 1
        else if (e.key === 'Home') next = 0
        else if (e.key === 'End') next = last
        else return
        e.preventDefault()
        setOpen(next)
        rows.current[next]?.focus()
    }

    return (
        <section id="services" className="rv-services" aria-labelledby="rv-services-title">
            <div className="rv-dark-bg" aria-hidden="true"><i className="rv-orb o1"/><i className="rv-orb o2"/><div className="rv-hero-grid"/></div>
            <div className="v3-container rv-services-grid">
                <div className={`rv-services-copy rv-fade${headIn ? ' in' : ''}`} ref={headRef}>
                    <span className="rv-label inv">OUR SERVICES</span>
                    <h2 id="rv-services-title">Simple services<br/>for your business.</h2>
                    <p>From websites and applications to mobile apps and ongoing support.</p>
                    <div className="rv-actions">
                        <button type="button" className="rv-btn rv-btn-light" onClick={() => enquire('', '')}>Start a Conversation <ArrowRight size={17}/></button>
                    </div>
                    <ul className="rv-service-quick" aria-label="Jump to a service">
                        {SERVICES.map((s, i) => (
                            <li key={s.title}>
                                <button type="button" className={open === i ? 'on' : ''} onClick={() => { setOpen(i); rows.current[i]?.scrollIntoView({block: 'nearest', behavior: 'smooth'}) }}>
                                    {s.number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`rv-service-list rv-fade${listIn ? ' in' : ''}`} ref={listRef} onKeyDown={onKey} style={{'--d': '.12s'} as CSSProperties}>
                    {SERVICES.map((s, i) => {
                        const Icon = s.icon
                        const isOpen = open === i
                        return (
                            <article key={s.title} className={`rv-service${isOpen ? ' open' : ''}`} onMouseMove={spotlight}>
                                <button
                                    ref={el => { rows.current[i] = el }}
                                    type="button"
                                    className="rv-service-head"
                                    aria-expanded={isOpen}
                                    aria-controls={`rv-service-panel-${i}`}
                                    id={`rv-service-head-${i}`}
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                >
                                    <span className="rv-service-no">{s.number}</span>
                                    <span className="rv-service-icon"><Icon size={19}/></span>
                                    <span className="rv-service-title"><h3>{s.title}</h3><p>{s.description}</p></span>
                                    <ChevronDown className="rv-chevron" size={19}/>
                                </button>
                                <div id={`rv-service-panel-${i}`} role="region" aria-labelledby={`rv-service-head-${i}`} className="rv-service-panel" hidden={false}>
                                    <div className="rv-service-panel-inner">
                                        <ul>{s.points.map(p => <li key={p}><CheckCircle2 size={15}/> {p}</li>)}</ul>
                                        <button type="button" className="rv-link-btn" tabIndex={isOpen ? 0 : -1} onClick={() => enquire(s.title, `I would like to know more about ${s.title}.`)}>
                                            Enquire about this <ArrowUpRight size={15}/>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
            <button type="button" className="rv-sr-only" onClick={() => scrollTo('contact')}>Go to contact</button>
        </section>
    )
}
