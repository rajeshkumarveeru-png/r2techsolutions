import {useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type TouchEvent} from 'react'
import {
    ArrowRight, ArrowUpRight, Boxes, BriefcaseBusiness, ChevronLeft, ChevronRight, Coffee, HardDrive, HeartPulse,
    Quote, ShoppingCart, Smartphone, Store, TrendingUp
} from 'lucide-react'
import {company} from '../../config/company'
import {prefersReducedMotion, spotlight, useReveal} from './shared'

const CLIENTS = [
    {name: 'MadeHealthcare', meta: 'CLIENT · HEALTHCARE SOLUTIONS', icon: HeartPulse},
    {name: 'Thiru Krishna Traders', meta: 'CLIENT · TRADING SOLUTIONS', icon: TrendingUp},
    {name: 'Sam Mobiles', meta: 'CLIENT · MOBILE SOLUTIONS', icon: Smartphone},
    {name: 'ASP Hardwares', meta: 'CLIENT · HARDWARE SOLUTIONS', icon: HardDrive}
]

/* ------------------------------------------------------------------------------------------
   CLIENTS: logo-card marquee (pauses on hover) + testimonial carousel
   ------------------------------------------------------------------------------------------ */
export function Clients() {
    const [headRef, headIn] = useReveal<HTMLDivElement>()
    const [quoteRef, quoteIn] = useReveal<HTMLDivElement>()
    const testimonials = company.testimonials || []
    const [index, setIndex] = useState(0)
    const [paused, setPaused] = useState(false)
    const reduced = useMemo(prefersReducedMotion, [])
    const touchX = useRef<number | null>(null)
    const count = testimonials.length

    const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])

    useEffect(() => {
        if (count < 2 || paused || reduced) return
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

    return (
        <section id="clients" className="rv-clients" aria-labelledby="rv-clients-title">
            <div className="v3-container">
                <div className={`rv-head rv-fade${headIn ? ' in' : ''}`} ref={headRef}>
                    <div>
                        <span className="rv-label">OUR CLIENTS</span>
                        <h2 id="rv-clients-title">Businesses we build with.</h2>
                    </div>
                    <p>Businesses we have worked with across different industries.</p>
                </div>
            </div>

            <div className="rv-client-marquee" aria-label={`${company.shortName} clients`}>
                <div className="rv-client-track">
                    {[0, 1].map(group => (
                        <div className="rv-client-group" key={group} aria-hidden={group === 1}>
                            {CLIENTS.map((c, i) => {
                                const Icon = c.icon
                                return (
                                    <article className="rv-client-card" key={`${group}-${c.name}`} onMouseMove={spotlight}>
                                        <span className="rv-client-no">0{i + 1}</span>
                                        <span className="rv-client-mark"><Icon size={20} strokeWidth={1.9}/></span>
                                        <div><small>{c.meta}</small><h3>{c.name}</h3></div>
                                        <ArrowUpRight size={17}/>
                                    </article>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {count > 0 && (
                <div className="v3-container">
                    <div
                        className={`rv-quotes rv-fade${quoteIn ? ' in' : ''}`}
                        ref={quoteRef}
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onFocus={() => setPaused(true)}
                        onBlur={() => setPaused(false)}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="What clients say"
                    >
                        <span className="rv-quote-mark" aria-hidden="true"><Quote size={30}/></span>
                        <div className="rv-quote-stage">
                            {testimonials.map((t, i) => (
                                <figure key={t.quote} className={`rv-quote${i === index ? ' on' : ''}`} aria-hidden={i !== index}>
                                    <blockquote>“{t.quote}”</blockquote>
                                    <figcaption>
                                        <span className="rv-avatar">{t.name.charAt(0)}</span>
                                        <span><b>{t.name}</b><small>{t.role}</small></span>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                        {count > 1 && (
                            <div className="rv-quote-nav">
                                <button type="button" onClick={() => go(index - 1)} aria-label="Previous testimonial"><ChevronLeft size={18}/></button>
                                <span className="rv-dots" role="tablist" aria-label="Choose testimonial">
                                    {testimonials.map((t, i) => (
                                        <button key={t.quote} type="button" role="tab" aria-selected={i === index} aria-label={`Testimonial ${i + 1}`} className={i === index ? 'on' : ''} onClick={() => go(i)}/>
                                    ))}
                                </span>
                                <button type="button" onClick={() => go(index + 1)} aria-label="Next testimonial"><ChevronRight size={18}/></button>
                            </div>
                        )}
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
    {name: 'Retail', icon: Store, product: 'SmartBill', note: 'Billing, POS, inventory and barcode scanning for everyday selling.'},
    {name: 'Cafés & Restaurants', icon: Coffee, product: 'Resto/Hotel360', note: 'Restaurant billing is planned in Resto/Hotel360. SmartBill covers billing today.'},
    {name: 'Supermarkets', icon: ShoppingCart, product: 'SmartBill', note: 'Fast checkout with barcode search and live stock tracking.'},
    {name: 'Distributors', icon: Boxes, product: 'SmartBill', note: 'Stock, purchases, customers and sales reports in one place.'},
    {name: 'Service Businesses', icon: BriefcaseBusiness, product: 'Custom Application Development', note: 'A custom application shaped around how your service actually runs.'},
    {name: 'Growing Businesses', icon: TrendingUp, product: 'SmartBill', note: 'Start with billing and inventory today and expand as you grow.'}
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
                        {INDUSTRIES.map(({name, icon: Icon}, i) => (
                            <button
                                key={name}
                                type="button"
                                role="tab"
                                aria-selected={selected === i}
                                className={`rv-ind${selected === i ? ' on' : ''}`}
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

                    <aside className="rv-fit" key={pick.name} aria-live="polite">
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
