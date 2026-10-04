import {useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactElement} from 'react'
import {
    ArrowRight,
    BarChart3,
    Barcode,
    Bell,
    Boxes,
    CalendarCheck,
    Check,
    CheckCircle2,
    Coffee,
    CreditCard,
    Mail,
    MessageCircle,
    Package,
    ScanLine,
    ShoppingCart,
    Sparkles,
    Store
} from 'lucide-react'
import {company} from '../config/company'
import {IncludedBento} from './IncludedBento'
import '../css/products-v4.css'

type Props = {
    scrollTo: (id: string) => void
    requestDemo: () => void
}

/* ------------------------------------------------------------------------------------------
   DATA (all copy comes from the existing site; nothing new is promised)
   ------------------------------------------------------------------------------------------ */
const smartBillingImage = '/images/smart-billing-pos.png'

const PRODUCTS = [
    {
        key: 'smartbill', number: '01', name: 'SmartBill', status: 'AVAILABLE' as const, tone: 'blue', icon: ShoppingCart,
        short: 'Billing & POS',
        text: 'A modern business billing platform for fast checkout, inventory, customers, payments, QR/barcode scanning and reports.',
        tags: ['Billing', 'POS', 'Inventory']
    },
    {
        key: 'jewell360', number: '02', name: 'Jewell360', status: 'COMING SOON' as const, tone: 'gold', icon: Sparkles,
        short: 'Jewellery',
        text: 'Jewellery billing, stock and business management.',
        tags: ['Jewellery', 'Billing', 'Stock']
    },
    {
        key: 'textile360', number: '03', name: 'Textile360', status: 'COMING SOON' as const, tone: 'violet', icon: Package,
        short: 'Textile & garments',
        text: 'Textile and garment business management.',
        tags: ['Textile', 'Sales', 'Stock']
    },
    {
        key: 'resto360', number: '04', name: 'Resto/Hotel360', status: 'COMING SOON' as const, tone: 'green', icon: Coffee,
        short: 'Restaurant & hotel',
        text: 'Restaurant and hotel billing and business management.',
        tags: ['Restaurant', 'Hotel', 'Billing']
    },
    {
        key: 'lodge360', number: '05', name: 'Lodge360', status: 'COMING SOON' as const, tone: 'rose', icon: Store,
        short: 'Lodge & rooms',
        text: 'Simple lodge, room and guest management.',
        tags: ['Rooms', 'Guests', 'Bookings']
    }
]

const FEATURES = [
    {
        key: 'billing', icon: CreditCard, title: 'Fast Billing',
        description: 'Create bills quickly with a clean POS interface designed for busy business environments.',
        points: ['Search or scan, tap to add', 'Cash, card and UPI payments', 'GST-ready invoices']
    },
    {
        key: 'inventory', icon: Boxes, title: 'Accurate Inventory',
        description: 'Keep track of available stock and reduce mistakes caused by manual inventory management.',
        points: ['Live stock on every sale', 'Low-stock and out-of-stock alerts', 'Purchases update stock']
    },
    {
        key: 'barcode', icon: Barcode, title: 'Barcode Support',
        description: 'Use barcode scanners to search and add products quickly during billing.',
        points: ['Works with USB scanners', 'Camera scanning on mobile', 'Find any product in seconds']
    },
    {
        key: 'insights', icon: BarChart3, title: 'Business Insights',
        description: 'See sales performance, product movement and useful business reporting in one place.',
        points: ['Sales trend by day', 'Top-selling products', 'Pending dues at a glance']
    }
] as const

const ROTATE_MS = 6500
const WAITLIST_KEY = 'r2_product_waitlist'

const phoneDigits = String(company.phone || '').replace(/\D/g, '')
const waLink = (message: string) => `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`

/* ------------------------------------------------------------------------------------------
   SMALL HOOKS
   ------------------------------------------------------------------------------------------ */
const prefersReducedMotion = () =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** true once the element has scrolled into view (state, not classList: React re-renders would otherwise wipe a manually added class) */
function useReveal<T extends HTMLElement>() {
    const ref = useRef<T>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
            setVisible(true)
            return
        }
        const io = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                setVisible(true)
                io.disconnect()
            }
        }, {threshold: 0.12})
        io.observe(el)
        return () => io.disconnect()
    }, [])
    return [ref, visible] as const
}

const readWaitlist = (): Record<string, string> => {
    try {
        return JSON.parse(localStorage.getItem(WAITLIST_KEY) || '{}')
    } catch {
        return {}
    }
}

/* ------------------------------------------------------------------------------------------
   CSS-BUILT PRODUCT MOCKS (sample data, clearly labelled)
   ------------------------------------------------------------------------------------------ */
export function MockBilling() {
    return (
        <div className="pv-mock pv-mock-billing" aria-hidden="true">
            <div className="pv-pos-left">
                <div className="pv-pos-search"><i/> Search product / scan barcode</div>
                <div className="pv-pos-tiles">
                    {[['Rice 5 kg', '₹320'], ['Sugar 1 kg', '₹46'], ['Tea 250 g', '₹118'], ['Soap', '₹38'], ['Oil 1 L', '₹165'], ['Salt', '₹22']].map(([n, p], i) => (
                        <span key={n} style={{'--i': i} as CSSProperties}><b>{n}</b><em>{p}</em></span>
                    ))}
                </div>
            </div>
            <div className="pv-pos-right">
                <div className="pv-pos-title">Cart <em>3 items</em></div>
                <ul>
                    <li style={{'--i': 0} as CSSProperties}><span>Rice 5 kg</span><b>₹320</b></li>
                    <li style={{'--i': 1} as CSSProperties}><span>Tea 250 g</span><b>₹236</b></li>
                    <li style={{'--i': 2} as CSSProperties}><span>Oil 1 L</span><b>₹165</b></li>
                </ul>
                <div className="pv-pos-total"><span>GST</span><b>₹36.10</b></div>
                <div className="pv-pos-total grand"><span>Total</span><b>₹757.10</b></div>
                <div className="pv-pos-pay"><Check size={15}/> Pay now</div>
            </div>
        </div>
    )
}

export function MockInventory() {
    const rows: Array<[string, number, string]> = [['Rice 5 kg', 86, 'ok'], ['Sugar 1 kg', 54, 'ok'], ['Tea 250 g', 12, 'low'], ['Soap', 70, 'ok'], ['Cooking oil 1 L', 0, 'out']]
    return (
        <div className="pv-mock pv-mock-inventory" aria-hidden="true">
            <div className="pv-inv-kpis">
                <span><b>148</b><em>Products</em></span>
                <span className="warn"><b>3</b><em>Low stock</em></span>
                <span className="bad"><b>1</b><em>Out of stock</em></span>
            </div>
            <ul className="pv-inv-list">
                {rows.map(([name, qty, state], i) => (
                    <li key={name} style={{'--i': i} as CSSProperties}>
                        <span className="pv-inv-name">{name}</span>
                        <span className="pv-meter"><i className={state} style={{width: `${Math.max(4, Math.min(100, qty))}%`}}/></span>
                        <b className={state}>{state === 'out' ? 'Out' : qty}</b>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function MockBarcode() {
    return (
        <div className="pv-mock pv-mock-barcode" aria-hidden="true">
            <div className="pv-scan-frame">
                <div className="pv-bars">{Array.from({length: 34}).map((_, i) => <i key={i} style={{'--w': `${[2, 4, 3, 6, 2, 5, 3, 2, 6, 4][i % 10]}px`} as CSSProperties}/>)}</div>
                <span className="pv-laser"/>
                <b className="pv-corner tl"/><b className="pv-corner tr"/><b className="pv-corner bl"/><b className="pv-corner br"/>
            </div>
            <div className="pv-scan-result">
                <span className="pv-scan-icon"><ScanLine size={18}/></span>
                <div><b>Surf Excel 1 kg</b><small>8901030 · ₹210.00 · 89 in stock</small></div>
                <em><Check size={14}/> Added</em>
            </div>
        </div>
    )
}

export function MockInsights() {
    return (
        <div className="pv-mock pv-mock-insights" aria-hidden="true">
            <div className="pv-ins-head">
                <span><small>Sales · 7 days</small><b>₹14,780</b></span>
                <span className="chip"><BarChart3 size={13}/> Sample data</span>
            </div>
            <div className="pv-ins-chart">{[38, 62, 45, 80, 58, 92, 70].map((h, i) => <i key={i} style={{'--h': `${h}%`, '--i': i} as CSSProperties}/>)}</div>
            <ul className="pv-ins-top">
                {[['Rice 5 kg', 74], ['Tea 250 g', 52], ['Cooking oil 1 L', 38]].map(([n, v], i) => (
                    <li key={n as string} style={{'--i': i} as CSSProperties}><span>{i + 1}</span><b>{n}</b><span className="pv-meter"><i style={{width: `${v}%`}}/></span></li>
                ))}
            </ul>
        </div>
    )
}

const MOCKS: Record<string, () => ReactElement> = {
    billing: MockBilling, inventory: MockInventory, barcode: MockBarcode, insights: MockInsights
}

/* ------------------------------------------------------------------------------------------
   SMARTBILL FEATURE EXPLORER
   ------------------------------------------------------------------------------------------ */
function FeatureExplorer() {
    const [active, setActive] = useState(0)
    const [paused, setPaused] = useState(false)
    const [view, setView] = useState<'mock' | 'real'>('mock')
    const [imageOk, setImageOk] = useState(true)
    const stopped = useRef(false)            // the visitor chose a tab: stop auto-rotating
    const reduced = useMemo(prefersReducedMotion, [])

    useEffect(() => {
        if (paused || stopped.current || reduced || view === 'real') return
        const t = window.setTimeout(() => setActive(i => (i + 1) % FEATURES.length), ROTATE_MS)
        return () => window.clearTimeout(t)
    }, [active, paused, reduced, view])

    const choose = (i: number) => {
        stopped.current = true
        setActive(i)
        setView('mock')
    }

    // the "What's included" cards can jump to a tab of this preview: window.dispatchEvent(new CustomEvent('r2:select-feature', {detail: 'inventory'}))
    useEffect(() => {
        const onSelect = (event: Event) => {
            const index = FEATURES.findIndex(f => f.key === String((event as CustomEvent).detail ?? ''))
            if (index >= 0) choose(index)
        }
        window.addEventListener('r2:select-feature', onSelect)
        return () => window.removeEventListener('r2:select-feature', onSelect)
    }, [])
    const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
        const last = FEATURES.length - 1
        let next = active
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = active === last ? 0 : active + 1
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = active === 0 ? last : active - 1
        else if (e.key === 'Home') next = 0
        else if (e.key === 'End') next = last
        else return
        e.preventDefault()
        choose(next)
        ;(e.currentTarget.querySelectorAll('[role="tab"]')[next] as HTMLElement | undefined)?.focus()
    }

    const feature = FEATURES[active]
    const Mock = MOCKS[feature.key]

    return (
        <div
            className={`pv-explorer${paused ? ' is-paused' : ''}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <div className="pv-tabs" role="tablist" aria-label="SmartBill features" onKeyDown={onKey}>
                {FEATURES.map((f, i) => {
                    const Icon = f.icon
                    return (
                        <button
                            key={f.key}
                            id={`pv-tab-${f.key}`}
                            type="button"
                            role="tab"
                            aria-selected={active === i}
                            aria-controls="pv-panel"
                            tabIndex={active === i ? 0 : -1}
                            className={active === i ? 'on' : ''}
                            onClick={() => choose(i)}
                        >
                            <span className="pv-tab-icon"><Icon size={17}/></span>
                            <span className="pv-tab-text"><b>{f.title}</b></span>
                            {active === i && !stopped.current && !reduced && view === 'mock' && <span className="pv-progress" key={`${active}-${paused}`} style={{'--dur': `${ROTATE_MS}ms`} as CSSProperties}/>}
                        </button>
                    )
                })}
            </div>

            <div className="pv-window" id="pv-panel" role="tabpanel" aria-labelledby={`pv-tab-${feature.key}`}>
                <div className="pv-window-bar">
                    <span className="pv-dots"><i/><i/><i/></span>
                    <strong>SMARTBILL · {view === 'real' ? 'REAL PRODUCT VIEW' : 'SAMPLE PREVIEW'}</strong>
                    <span className="pv-view-switch" role="group" aria-label="Preview type">
                        <button type="button" className={view === 'mock' ? 'on' : ''} onClick={() => setView('mock')}>Preview</button>
                        {imageOk && <button type="button" className={view === 'real' ? 'on' : ''} onClick={() => setView('real')}>Real screen</button>}
                    </span>
                </div>
                <div className="pv-window-body">
                    {view === 'real' && imageOk
                        ? <img className="pv-real" src={smartBillingImage} alt="SmartBill point of sale application" onError={() => { setImageOk(false); setView('mock') }}/>
                        : <div key={feature.key} className="pv-mock-wrap"><Mock/></div>}
                    {/* preload the real screenshot so the toggle is instant, and detect a missing file */}
                    {imageOk && view === 'mock' && <img className="pv-preload" src={smartBillingImage} alt="" onError={() => setImageOk(false)}/>}
                </div>
                <div className="pv-window-foot">
                    <div>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                    </div>
                    <ul>{feature.points.map(p => <li key={p}><CheckCircle2 size={15}/> {p}</li>)}</ul>
                </div>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------------------------------
   COMING-SOON PANEL: blueprint + "notify me"
   ------------------------------------------------------------------------------------------ */
function ComingSoon({product, scrollTo}: {product: typeof PRODUCTS[number]; scrollTo: (id: string) => void}) {
    const Icon = product.icon
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [saved, setSaved] = useState<Record<string, string>>(() => readWaitlist())
    const joined = saved[product.key]

    const submit = (event: {preventDefault: () => void}) => {
        event.preventDefault()
        const value = email.trim()
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setError('Enter a valid email address.')
            return
        }
        setError('')
        const next = {...saved, [product.key]: value}
        setSaved(next)
        try { localStorage.setItem(WAITLIST_KEY, JSON.stringify(next)) } catch { /* private mode */ }
    }
    const message = `Hello, please notify me when ${product.name} is available.${joined ? ` My email: ${joined}` : ''}`

    return (
        <div className="pv-soon">
            <div className="pv-blueprint" aria-hidden="true">
                <div className="pv-bp-core"><Icon size={34}/></div>
                {product.tags.map((tag, i) => <span key={tag} className={`pv-bp-chip c${i}`}>{tag}</span>)}
                <i className="pv-bp-ring r1"/><i className="pv-bp-ring r2"/><i className="pv-bp-ring r3"/>
            </div>
            <div className="pv-soon-card">
                <span className="pv-soon-label"><Bell size={13}/> BE THE FIRST TO KNOW</span>
                <h4>{product.name} is on the way</h4>
                <p>Leave your email and we will tell you when it is ready - or talk to us about what your business needs.</p>
                {joined ? (
                    <div className="pv-joined" role="status">
                        <span className="pv-joined-icon"><Check size={18}/></span>
                        <div>
                            <b>You're on the list</b>
                            <small>{joined}</small>
                        </div>
                        <div className="pv-joined-actions">
                            <a href={waLink(message)} target="_blank" rel="noreferrer"><MessageCircle size={15}/> Send on WhatsApp</a>
                            <a href={`mailto:${company.email}?subject=${encodeURIComponent(`${product.name} - notify me`)}&body=${encodeURIComponent(message)}`}><Mail size={15}/> Send by email</a>
                        </div>
                    </div>
                ) : (
                    <form className="pv-waitlist" onSubmit={submit} noValidate>
                        <label className={error ? 'bad' : ''}>
                            <Mail size={16}/>
                            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }} placeholder="you@business.com" aria-label={`Email to be notified about ${product.name}`} aria-invalid={!!error}/>
                        </label>
                        <button type="submit" className="pv-btn pv-btn-primary">Notify me <ArrowRight size={16}/></button>
                        {error && <small className="pv-form-error" role="alert">{error}</small>}
                    </form>
                )}
                <div className="pv-soon-links">
                    <button type="button" onClick={() => scrollTo('contact')}>Tell us what you need <ArrowRight size={14}/></button>
                </div>
            </div>
        </div>
    )
}

/* ------------------------------------------------------------------------------------------
   MAIN SECTION
   ------------------------------------------------------------------------------------------ */
export default function ProductsShowcase({scrollTo, requestDemo}: Props) {
    const [selected, setSelected] = useState(0)
    const [headRef, headIn] = useReveal<HTMLDivElement>()
    const [stageRef, stageIn] = useReveal<HTMLDivElement>()
    const [gridRef, gridIn] = useReveal<HTMLDivElement>()
    const [ctaRef, ctaIn] = useReveal<HTMLDivElement>()
    // other sections (footer links) can ask for a specific product: window.dispatchEvent(new CustomEvent('r2:select-product', {detail: 'jewell360'}))
    useEffect(() => {
        const onSelect = (event: Event) => {
            const key = String((event as CustomEvent).detail ?? '')
            const index = PRODUCTS.findIndex(p => p.key === key)
            if (index >= 0) setSelected(index)
        }
        window.addEventListener('r2:select-product', onSelect)
        return () => window.removeEventListener('r2:select-product', onSelect)
    }, [])

    const product = PRODUCTS[selected]
    const Icon = product.icon
    const isSmartBill = product.key === 'smartbill'

    /** from a "What's included" card: open SmartBill, select that preview tab and scroll up to it */
    const previewFeature = (key: string) => {
        window.dispatchEvent(new CustomEvent('r2:select-product', {detail: 'smartbill'}))
        window.setTimeout(() => {
            window.dispatchEvent(new CustomEvent('r2:select-feature', {detail: key}))
            document.querySelector('.pv-stage')?.scrollIntoView({behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center'})
        }, 80)
    }

    const onKey = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        const last = PRODUCTS.length - 1
        let next = selected
        if (e.key === 'ArrowRight') next = selected === last ? 0 : selected + 1
        else if (e.key === 'ArrowLeft') next = selected === 0 ? last : selected - 1
        else if (e.key === 'Home') next = 0
        else if (e.key === 'End') next = last
        else return
        e.preventDefault()
        setSelected(next)
        ;(e.currentTarget.querySelectorAll('[role="tab"]')[next] as HTMLElement | undefined)?.focus()
    }, [selected])

    return (
        <section id="solutions" className="v3-section pv-section" aria-labelledby="pv-title">
            <span id="product-portfolio" className="pv-anchor" aria-hidden="true"/>
            <div className="v3-container">
                <div className={`pv-head pv-reveal${headIn ? ' in' : ''}`} ref={headRef}>
                    <div>
                        <span className="v3-label">OUR PRODUCTS</span>
                        <h2 id="pv-title">Simple software for<br/>real business needs.</h2>
                    </div>
                    <p>Practical products for billing, retail, jewellery, textile and hospitality businesses. Start with SmartBill today and watch the family grow.</p>
                </div>

                {/* ------------ product switcher ------------ */}
                <div className="pv-switch" role="tablist" aria-label="Our products" onKeyDown={onKey} style={{'--i': selected, '--n': PRODUCTS.length} as CSSProperties}>
                    {PRODUCTS.map((p, i) => {
                        const PIcon = p.icon
                        return (
                            <button
                                key={p.key}
                                type="button"
                                role="tab"
                                aria-selected={selected === i}
                                tabIndex={selected === i ? 0 : -1}
                                className={`${selected === i ? 'on ' : ''}tone-${p.tone}`}
                                onClick={() => setSelected(i)}
                            >
                                <span className="pv-sw-icon"><PIcon size={18}/></span>
                                <span className="pv-sw-text"><b>{p.name}</b><small>{p.status === 'AVAILABLE' ? p.short : 'Coming soon'}</small></span>
                                {p.status === 'AVAILABLE' && <i className="pv-sw-live" aria-label="Available now"/>}
                            </button>
                        )
                    })}
                </div>

                {/* ------------ stage ------------ */}
                <div className={`pv-stage pv-reveal tone-${product.tone}${stageIn ? ' in' : ''}`} ref={stageRef}>
                    <div className="pv-stage-copy pv-swap" key={`copy-${product.key}`}>
                        <div className="pv-stage-top">
                            <span className="pv-number">{product.number} / PRODUCT</span>
                            <span className={`pv-status ${isSmartBill ? 'live' : 'soon'}`}><i/> {product.status}</span>
                        </div>
                        <div className="pv-product-icon"><Icon size={26}/></div>
                        <h3>{product.name}</h3>
                        <p>{product.text}</p>
                        <div className="pv-tags">{product.tags.map(t => <span key={t}>{t}</span>)}</div>

                        {isSmartBill ? (
                            <>
                                <ul className="pv-checks">
                                    {['Fast billing & payments', 'Inventory & stock control', 'Customer management', 'Reports & business visibility'].map(item => (
                                        <li key={item}><CheckCircle2 size={16}/> {item}</li>
                                    ))}
                                </ul>
                                <div className="pv-actions">
                                    <button type="button" className="pv-btn pv-btn-primary" onClick={requestDemo}><CalendarCheck size={16}/> Request a Demo</button>
                                    <a className="pv-btn pv-btn-ghost" href={waLink('Hello, I would like a SmartBill demo')} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Chat on WhatsApp</a>
                                </div>
                                <button type="button" className="pv-link" onClick={() => scrollTo('contact')}>Enquire about SmartBill <ArrowRight size={15}/></button>
                            </>
                        ) : (
                            <div className="pv-soon-note"><Sparkles size={15}/> Planned modules: {product.tags.join(' · ')}</div>
                        )}
                    </div>

                    <div className="pv-stage-visual pv-swap" key={`visual-${product.key}`}>
                        {isSmartBill ? <FeatureExplorer/> : <ComingSoon product={product} scrollTo={scrollTo}/>}
                    </div>
                </div>

                {/* ------------ what's included ------------ */}
                <div className={`pv-included pv-reveal${gridIn ? ' in' : ''}`} ref={gridRef}>
                    <div className="pv-included-head">
                        <span className="v3-label">WHAT'S INCLUDED</span>
                        <h3>Everything SmartBill gives you</h3>
                    </div>
                    <IncludedBento onPreview={previewFeature} onAsk={requestDemo}/>
                </div>

                {/* ------------ closing call to action ------------ */}
                <div className={`pv-cta pv-reveal${ctaIn ? ' in' : ''}`} ref={ctaRef}>
                    <div>
                        <h3>Not sure which product fits your business?</h3>
                        <p>Tell us what you sell and how you bill today. We will suggest the simplest setup.</p>
                    </div>
                    <div className="pv-actions">
                        <button type="button" className="pv-btn pv-btn-light" onClick={() => scrollTo('contact')}>Talk to us <ArrowRight size={16}/></button>
                        <a className="pv-btn pv-btn-outline" href={waLink('Hello, I would like to discuss a product for my business')} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
