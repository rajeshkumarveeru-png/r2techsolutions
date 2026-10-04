import {useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent} from 'react'
import {
    ArrowRight, BarChart3, Barcode, Boxes, CalendarCheck, CheckCircle2, ChevronDown, CreditCard, Sparkles, Users, Zap
} from 'lucide-react'
import {company} from '../../config/company'
import {MockBarcode, MockBilling, MockInsights, MockInventory} from '../ProductsShowcase'
import {prefersReducedMotion, useReveal} from './shared'

type HeroProps = {
    scrollTo: (id: string) => void
    requestDemo: () => void
}

const WORDS = ['Websites', 'Custom software', 'Mobile apps', 'POS & billing', 'Business support']
const CONSOLE_TABS = [
    {key: 'overview', label: 'Overview', Mock: MockInsights, note: 'Business at a glance'},
    {key: 'billing', label: 'Billing', Mock: MockBilling, note: 'Fast POS checkout'},
    {key: 'inventory', label: 'Inventory', Mock: MockInventory, note: 'Live stock levels'},
    {key: 'scan', label: 'Scan', Mock: MockBarcode, note: 'QR / barcode ready'}
] as const
const STAT_ICONS = [CreditCard, Boxes, Barcode, Zap]

export function Hero({scrollTo, requestDemo}: HeroProps) {
    const [word, setWord] = useState(0)
    const [tab, setTab] = useState(0)
    const [pausedTabs, setPausedTabs] = useState(false)
    const userPicked = useRef(false)
    const reduced = useMemo(prefersReducedMotion, [])
    const [copyRef, copyIn] = useReveal<HTMLDivElement>(0.05)
    const heroRef = useRef<HTMLElement>(null)
    const consoleRef = useRef<HTMLDivElement>(null)

    // rotating phrase in the headline
    useEffect(() => {
        if (reduced) return
        const t = window.setInterval(() => setWord(w => (w + 1) % WORDS.length), 2600)
        return () => window.clearInterval(t)
    }, [reduced])

    // console tabs auto-cycle until the visitor chooses one
    useEffect(() => {
        if (reduced || userPicked.current || pausedTabs) return
        const t = window.setTimeout(() => setTab(i => (i + 1) % CONSOLE_TABS.length), 5200)
        return () => window.clearTimeout(t)
    }, [tab, pausedTabs, reduced])

    // pointer glow over the whole hero + a gentle 3D tilt on the console
    const onMove = (event: MouseEvent<HTMLElement>) => {
        const hero = heroRef.current
        if (!hero) return
        const r = hero.getBoundingClientRect()
        hero.style.setProperty('--gx', `${event.clientX - r.left}px`)
        hero.style.setProperty('--gy', `${event.clientY - r.top}px`)
        const c = consoleRef.current
        if (c && !reduced && window.matchMedia('(hover: hover)').matches) {
            const cr = c.getBoundingClientRect()
            const px = (event.clientX - (cr.left + cr.width / 2)) / (window.innerWidth / 2)
            const py = (event.clientY - (cr.top + cr.height / 2)) / (window.innerHeight / 2)
            c.style.setProperty('--ry', `${Math.max(-1, Math.min(1, px)) * 5}deg`)
            c.style.setProperty('--rx', `${Math.max(-1, Math.min(1, py)) * -4}deg`)
        }
    }
    const onLeave = () => {
        consoleRef.current?.style.setProperty('--rx', '0deg')
        consoleRef.current?.style.setProperty('--ry', '0deg')
    }

    const Active = CONSOLE_TABS[tab]

    return (
        <section id="home" className="rv-hero" ref={heroRef} onMouseMove={onMove} onMouseLeave={onLeave}>
            <div className="rv-hero-bg" aria-hidden="true">
                <div className="rv-hero-photo" style={{backgroundImage: `url(${company.heroImage})`}}/>
                <div className="rv-hero-shade"/>
                <div className="rv-hero-grid"/>
                <div className="rv-hero-glow"/>
                <i className="rv-orb o1"/><i className="rv-orb o2"/>
            </div>

            <div className="v3-container rv-hero-inner">
                <div className={`rv-hero-copy rv-fade${copyIn ? ' in' : ''}`} ref={copyRef}>
                    <div className="rv-eyebrow"><span className="rv-pulse"/> DIGITAL PRODUCTS • SOFTWARE • SUPPORT</div>

                    <h1>
                        Digital solutions
                        <span className="rv-h1-accent">built around</span>
                        your business.
                    </h1>

                    <div className="rv-building" aria-live="polite">
                        <span>We build</span>
                        <span className="rv-words" aria-hidden={false}>
                            {WORDS.map((w, i) => <b key={w} className={i === word ? 'on' : i === (word + WORDS.length - 1) % WORDS.length ? 'out' : ''}>{w}</b>)}
                        </span>
                    </div>

                    <p>
                        We design professional websites, build custom applications, develop business software products and provide dependable support - built around the way your business works.
                    </p>

                    <div className="rv-actions">
                        <button type="button" className="rv-btn rv-btn-primary" onClick={() => scrollTo('contact')}>Discuss Your Requirement <ArrowRight size={17}/></button>
                        <button type="button" className="rv-btn rv-btn-demo" onClick={requestDemo}><CalendarCheck size={16}/> Request a Demo</button>
                        <button type="button" className="rv-btn rv-btn-glass" onClick={() => scrollTo('solutions')}>Explore What We Build</button>
                    </div>

                    <div className="rv-proof">
                        {['Web Development', 'Custom Software', 'Business Products'].map(t => <span key={t}><CheckCircle2 size={15}/> {t}</span>)}
                    </div>

                    <ul className="rv-statbar" aria-label="Product highlights">
                        {company.stats.map((s, i) => {
                            const SIcon = STAT_ICONS[i % STAT_ICONS.length]
                            return (
                                <li key={s.label} style={{'--i': i} as CSSProperties}>
                                    <span className="rv-stat-icon"><SIcon size={16}/></span>
                                    <span><b>{s.value}</b><small>{s.label}</small></span>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div
                    className={`rv-console-wrap rv-fade${copyIn ? ' in' : ''}`}
                    style={{'--d': '.15s'} as CSSProperties}
                    onMouseEnter={() => setPausedTabs(true)}
                    onMouseLeave={() => setPausedTabs(false)}
                    onFocus={() => setPausedTabs(true)}
                    onBlur={() => setPausedTabs(false)}
                >
                    <div className="rv-console" ref={consoleRef}>
                        <div className="rv-console-head">
                            <div><small>SMART BILLING</small><strong>Business Operations</strong></div>
                            <span className="rv-live"><i/> LIVE</span>
                        </div>

                        <div className="rv-console-tabs" role="tablist" aria-label="SmartBill preview">
                            {CONSOLE_TABS.map((t, i) => (
                                <button
                                    key={t.key}
                                    type="button"
                                    role="tab"
                                    aria-selected={tab === i}
                                    className={tab === i ? 'on' : ''}
                                    onClick={() => { userPicked.current = true; setTab(i) }}
                                >
                                    {t.label}
                                    {tab === i && !userPicked.current && !reduced && <i key={`${tab}-${pausedTabs}`} className="rv-tab-progress"/>}
                                </button>
                            ))}
                        </div>

                        <div className="rv-console-screen" role="tabpanel">
                            <div className="rv-screen-label"><Sparkles size={13}/> {Active.note} · sample data</div>
                            <div key={Active.key} className="rv-screen-body"><Active.Mock/></div>
                        </div>

                        <div className="rv-console-foot">
                            <span><Users size={14}/> Built for practical business operations</span>
                            <span>{String(tab + 1).padStart(2, '0')} / {String(CONSOLE_TABS.length).padStart(2, '0')}</span>
                        </div>
                    </div>
                    <div className="rv-float-chip c1"><BarChart3 size={15}/> Reports</div>
                    <div className="rv-float-chip c2"><Barcode size={15}/> Barcode ready</div>
                </div>
            </div>

            <button type="button" className="rv-scroll-cue" onClick={() => scrollTo('solutions')} aria-label="Scroll to products">
                <span>Scroll</span><ChevronDown size={18}/>
            </button>
        </section>
    )
}

/** infinite ticker ("WHAT WE BUILD") - pauses on hover */
export function Ticker() {
    const items = ['WEBSITE DESIGN', 'SOFTWARE DEVELOPMENT', 'MOBILE & BUSINESS APPS', 'POS & BILLING', 'AUTOMATION', 'SUPPORT & MAINTENANCE']
    return (
        <section className="rv-ticker" aria-label="What we do">
            <div className="rv-ticker-label"><Sparkles size={14}/> WHAT WE BUILD</div>
            <div className="rv-ticker-viewport">
                <div className="rv-ticker-track">
                    {[0, 1].map(g => (
                        <ul key={g} aria-hidden={g === 1}>
                            {items.map(t => <li key={t}><i/>{t}</li>)}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    )
}
