import {useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent} from 'react'
import {
    ArrowRight, ArrowUpRight, Boxes, BriefcaseBusiness, ChevronLeft, ChevronRight, Coffee, HardDrive, HeartPulse,
    Quote, ShoppingCart, Smartphone, Store, TrendingUp
} from 'lucide-react'
import {company} from '../../config/company'
import {prefersReducedMotion, spotlight, useReveal} from './shared'

const CLIENTS = [
    {name: 'MadeHealthcare', meta: 'CLIENT · HEALTHCARE SOLUTIONS', industry: 'Healthcare', tone: 'teal', icon: HeartPulse},
    {name: 'Thiru Krishna Traders', meta: 'CLIENT · TRADING SOLUTIONS', industry: 'Trading', tone: 'amber', icon: TrendingUp},
    {name: 'Sam Mobiles', meta: 'CLIENT · MOBILE SOLUTIONS', industry: 'Mobile', tone: 'violet', icon: Smartphone},
    {name: 'ASP Hardwares', meta: 'CLIENT · HARDWARE SOLUTIONS', industry: 'Hardware', tone: 'blue', icon: HardDrive}
]

/* ------------------------------------------------------------------------------------------
   CLIENTS: industry filter + two-way logo marquee ("build something similar" on hover)
            + testimonial stage (featured quote, quote picker, auto-advance with progress)
   ------------------------------------------------------------------------------------------ */
export function Clients({enquire}: {enquire: (service: string, message?: string) => void}) {
    const [headRef, headIn] = useReveal<HTMLDivElement>()
    const [quoteRef, quoteIn] = useReveal<HTMLDivElement>()
    const testimonials = company.testimonials || []
    const [filter, setFilter] = useState<string>('all')
    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)
    const userPicked = useRef(false)
    const reduced = useMemo(prefersReducedMotion, [])
    const touchX = useRef<number | null>(null)
    const count = testimonials.length

    const go = useCallback((next: number) => { userPicked.current = true; setIndex(((next % count) + count) % count) }, [count])

    useEffect(() => {
        if (count < 2 || paused || reduced || userPicked.current) return
        const t = window.setTimeout(() => setIndex(i => (i + 1) % count), 7000)
        return () => window.clearTimeout(t)
    }, [index, paused, reduced, count])

    const onTouchStart = (e: TouchEvent) => { touchX.current = e.touches[0].clientX }
    const onTouchEnd = (e: TouchEvent) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 48) go(index + (dx < 0 ? 1 : -1))
    }
    const onKey = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
    }

    const industries = CLIENTS.map(c => c.industry)
    const current = testimonials[index]

    return (
        <section id="clients" className="rv-clients rv5-clients" aria-labelledby="rv-clients-title">
            <div className="v3-container">
                <div className={`rv-head rv-fade${headIn ? ' in' : ''}`} ref={headRef}>
                    <div>
                        <span className="rv-label">OUR CLIENTS</span>
                        <h2 id="rv-clients-title">Businesses we build with.</h2>
                    </div>
                    <p>Businesses we have worked with across different industries.</p>
                </div>

                <div className="rv5-filters" role="group" aria-label="Filter clients by industry">
                    <button type="button" className={filter === 'all' ? 'on' : ''} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All industries <em>{CLIENTS.length}</em></button>
                    {industries.map(name => (
                        <button key={name} type="button" className={filter === name ? 'on' : ''} aria-pressed={filter === name} onClick={() => setFilter(filter === name ? 'all' : name)}>{name}</button>
                    ))}
                </div>
            </div>

            <div className="rv5-wall" aria-label={`${company.shortName} clients`}>
                {[false, true].map(reverse => (
                    <div className={`rv5-row${reverse ? ' rev' : ''}`} key={String(reverse)} aria-hidden={reverse}>
                        <div className="rv5-track">
                            {[0, 1].map(group => (
                                <div className="rv5-group" key={group}>
                                    {(reverse ? [...CLIENTS].reverse() : CLIENTS).map((c, i) => {
                                        const Icon = c.icon
                                        const dim = filter !== 'all' && filter !== c.industry
                                        return (
                                            <article className={`rv5-client tone-${c.tone}${dim ? ' dim' : ''}${filter === c.industry ? ' hit' : ''}`} key={`${group}-${c.name}`} onMouseMove={spotlight}>
                                                <span className="rv5-client-no">0{CLIENTS.indexOf(c) + 1}</span>
                                                <span className="rv5-client-mark"><Icon size={22} strokeWidth={1.9}/></span>
                                                <div className="rv5-client-text"><small>{c.meta}</small><h3>{c.name}</h3></div>
                                                <button type="button" className="rv5-client-cta" tabIndex={reverse || group === 1 ? -1 : 0} onClick={() => enquire('', `I run a ${c.industry.toLowerCase()} business and would like a solution like the one built for ${c.name}.`)}>
                                                    Build something similar <ArrowUpRight size={15}/>
                                                </button>
                                                <i className="rv5-client-line" aria-hidden="true"/>
                                            </article>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {count > 0 && current && (
                <div className="v3-container">
                    <div
                        className={`rv5-voices rv-fade${quoteIn ? ' in' : ''}`}
                        ref={quoteRef}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onFocus={() => setPaused(true)}
                        onBlur={() => setPaused(false)}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                        onKeyDown={onKey}
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="What clients say"
                    >
                        <div className="rv5-voice-main">
                            <span className="rv5-quote-art" aria-hidden="true"><Quote size={26}/></span>
                            <small className="rv5-voice-kicker">WHAT CLIENTS SAY</small>
                            <figure className="rv5-voice" key={index} aria-live="polite">
                                <blockquote>“{current.quote}”</blockquote>
                                <figcaption>
                                    <span className="rv-avatar">{current.name.charAt(0)}</span>
                                    <span><b>{current.name}</b><small>{current.role}</small></span>
                                </figcaption>
                            </figure>
                            {count > 1 && (
                                <div className="rv5-voice-nav">
                                    <button type="button" onClick={() => go(index - 1)} aria-label="Previous testimonial"><ChevronLeft size={18}/></button>
                                    <span className="rv5-voice-count">{String(index + 1).padStart(2, '0')} <i/> {String(count).padStart(2, '0')}</span>
                                    <button type="button" onClick={() => go(index + 1)} aria-label="Next testimonial"><ChevronRight size={18}/></button>
                                    {!reduced && !userPicked.current && <span className="rv5-voice-progress" key={`${index}-${paused}`} aria-hidden="true"/>}
                                </div>
                            )}
                        </div>

                        <div className="rv5-voice-side">
                            {testimonials.map((t, i) => (
                                <button key={t.quote} type="button" className={`rv5-pick${i === index ? ' on' : ''}`} aria-pressed={i === index} onClick={() => go(i)}>
                                    <span className="rv-avatar">{t.name.charAt(0)}</span>
                                    <span className="rv5-pick-text"><b>{t.role}</b><small>{t.quote}</small></span>
                                </button>
                            ))}
                            <div className="rv5-voice-cta">
                                <strong>Have a similar business?</strong>
                                <p>Tell us what you need and we will suggest the simplest way forward.</p>
                                <button type="button" className="rv-btn rv-btn-primary" onClick={() => enquire('', '')}>Tell us about it <ArrowRight size={16}/></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

/* ------------------------------------------------------------------------------------------
   INDUSTRIES: pick yours, get a suggested starting point, jump to a prefilled enquiry
   ("starting point" lines are suggestions written from your product descriptions - edit freely)
   ------------------------------------------------------------------------------------------ */
const INDUSTRIES = [
    {name: 'Retail', tone: 'sky', icon: Store, product: 'SmartBill', note: 'Billing, POS, inventory and barcode scanning for everyday selling.'},
    {name: 'Cafés & Restaurants', tone: 'amber', icon: Coffee, product: 'Resto/Hotel360', note: 'Restaurant billing is planned in Resto/Hotel360. SmartBill covers billing today.'},
    {name: 'Supermarkets', tone: 'emerald', icon: ShoppingCart, product: 'SmartBill', note: 'Fast checkout with barcode search and live stock tracking.'},
    {name: 'Distributors', tone: 'violet', icon: Boxes, product: 'SmartBill', note: 'Stock, purchases, customers and sales reports in one place.'},
    {name: 'Service Businesses', tone: 'rose', icon: BriefcaseBusiness, product: 'Custom Application Development', note: 'A custom application shaped around how your service actually runs.'},
    {name: 'Growing Businesses', tone: 'indigo', icon: TrendingUp, product: 'SmartBill', note: 'Start with billing and inventory today and expand as you grow.'}
]

export function Industries({enquire}: {enquire: (service: string, message?: string) => void}) {
    const [selected, setSelected] = useState(0)
    const [headRef, headIn] = useReveal<HTMLDivElement>()
    const [bodyRef, bodyIn] = useReveal<HTMLDivElement>()
    const pick = INDUSTRIES[selected]
    const PickIcon = pick.icon

    return (
        <section id="industries" className="rv-industries" aria-labelledby="rv-ind-title">
            <div className="rv-dark-bg" aria-hidden="true"><i className="rv-orb o1"/><i className="rv-orb o2"/><div className="rv-hero-grid"/></div>
            <div className="v3-container">
                <div className={`rv-head dark rv-fade${headIn ? ' in' : ''}`} ref={headRef}>
                    <div>
                        <span className="rv-label inv">BUSINESS CONTEXT</span>
                        <h2 id="rv-ind-title">Technology that adapts<br/>to different businesses.</h2>
                    </div>
                    <p>Retail, hospitality, services and growing businesses can benefit from solutions shaped around their own workflow.</p>
                </div>

                <div className={`rv-ind-body rv-fade${bodyIn ? ' in' : ''}`} ref={bodyRef}>
                    <div className="rv-ind-grid" role="tablist" aria-label="Choose your business type">
                        {INDUSTRIES.map(({name, tone, icon: Icon}, i) => (
                            <button
                                key={name}
                                type="button"
                                role="tab"
                                aria-selected={selected === i}
                                className={`rv-ind tone-${tone}${selected === i ? ' on' : ''}`}
                                onClick={() => setSelected(i)}
                                onMouseEnter={() => setSelected(i)}
                                onMouseMove={spotlight}
                                style={{'--i': i} as CSSProperties}
                            >
                                <span className="rv-ind-no">0{i + 1}</span>
                                <span className="rv-ind-icon"><Icon size={20} strokeWidth={1.8}/></span>
                                <strong>{name}</strong>
                                <ArrowRight className="rv-ind-arrow" size={16}/>
                            </button>
                        ))}
                    </div>

                    <aside className={`rv-fit tone-${pick.tone}`} key={pick.name} aria-live="polite">
                        <span className="rv-fit-icon"><PickIcon size={26}/></span>
                        <small>SUGGESTED STARTING POINT FOR</small>
                        <h3>{pick.name}</h3>
                        <p>{pick.note}</p>
                        <div className="rv-fit-tag"><i/> {pick.product}</div>
                        <button type="button" className="rv-btn rv-btn-light" onClick={() => enquire(pick.product, `I run a ${pick.name.toLowerCase()} business and would like to discuss ${pick.product}.`)}>
                            Discuss this <ArrowRight size={16}/>
                        </button>
                    </aside>
                </div>
            </div>
        </section>
    )
}
