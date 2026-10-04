import {useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent} from 'react'
import {ArrowRight, BarChart3, Barcode, Boxes, Check, CheckCircle2, Compass, CreditCard, Hammer, LifeBuoy, MessageCircle, Palette, Rocket} from 'lucide-react'
import {company} from '../../config/company'
import {Photo, prefersReducedMotion, spotlight, useReveal} from './shared'

/* The four steps come straight from your "About our approach" paragraph.
   Titles + the first sentence are your words; the short "what happens" bullets and the sample screens are illustrative (edit freely). */
const STEPS = [
    {
        key: 'understand', icon: Compass, title: 'Understand',
        text: 'We begin with the requirement, not the software - understanding your process first.',
        points: ['Start with the requirement, not the software', 'Understand how your business actually works', 'Agree what matters most before anything is built'],
        you: 'A clear requirement'
    },
    {
        key: 'design', icon: Palette, title: 'Design',
        text: 'Designing the right experience for the people who will use it every day.',
        points: ['Plan screens around daily use', 'Keep it simple for the people using it', 'Review the direction together'],
        you: 'An experience made for your team'
    },
    {
        key: 'build', icon: Hammer, title: 'Build',
        text: 'Building the solution around the way your business works.',
        points: ['Build around your workflow', 'Keep you informed as it takes shape', 'Hand over a solution you can use'],
        you: 'A working solution'
    },
    {
        key: 'support', icon: LifeBuoy, title: 'Support',
        text: 'Staying available when it needs support, updates and improvements.',
        points: ['Fixes and updates', 'Improvements as your business grows', 'A real person to call or message'],
        you: 'Ongoing support'
    }
] as const

const STEP_MS = 6000
/* one colour, one icon and two small tags per principle (tags use words from your own descriptions; edit freely) */
const PRINCIPLES = [
    {icon: CreditCard, tone: 'blue', tags: ['POS', 'Fast checkout'], feature: 'billing'},
    {icon: Boxes, tone: 'emerald', tags: ['Stock', 'Fewer mistakes'], feature: 'inventory'},
    {icon: Barcode, tone: 'violet', tags: ['Scan', 'Quick search'], feature: 'barcode'},
    {icon: BarChart3, tone: 'amber', tags: ['Sales', 'Top sellers'], feature: 'insights'}
] as const

/* ---------- tiny sample screens, one per step (aria-hidden, illustrative) ---------- */
function ShotUnderstand() {
    return (
        <div className="rv5-shot rv5-shot-notes">
            <b>Requirement notes</b>
            {[['Process mapped', true], ['Priorities agreed', true], ['Scope confirmed', false]].map(([t, done], i) => (
                <span key={t as string} className={done ? 'done' : ''} style={{'--i': i} as CSSProperties}><i>{done && <Check size={11}/>}</i>{t}</span>
            ))}
        </div>
    )
}
function ShotDesign() {
    return (
        <div className="rv5-shot rv5-shot-wire">
            <i className="bar"/><div><i className="card"/><i className="card"/></div><i className="line"/><i className="line s"/><i className="btn"/>
        </div>
    )
}
function ShotBuild() {
    return (
        <div className="rv5-shot rv5-shot-build">
            <b>Building…</b>
            {[['Billing', 100], ['Inventory', 82], ['Reports', 56]].map(([t, w], i) => (
                <span key={t as string} style={{'--i': i} as CSSProperties}><em>{t}</em><u><s style={{width: `${w}%`}}/></u></span>
            ))}
        </div>
    )
}
function ShotSupport() {
    return (
        <div className="rv5-shot rv5-shot-chat">
            <span className="in">Can you add a new report?</span>
            <span className="out">Done - it is live. <Check size={12}/></span>
            <span className="in s">Thank you!</span>
        </div>
    )
}
const SHOTS = [ShotUnderstand, ShotDesign, ShotBuild, ShotSupport]

export function About({enquire}: {enquire: (service: string, message?: string) => void}) {
    const [imgRef, imgIn] = useReveal<HTMLDivElement>()
    const [copyRef, copyIn] = useReveal<HTMLDivElement>()
    const [flowRef, flowIn] = useReveal<HTMLDivElement>()
    const [step, setStep] = useState(0)
    const [paused, setPaused] = useState(false)
    const picked = useRef(false)
    const reduced = useMemo(prefersReducedMotion, [])
    const tabs = useRef<Array<HTMLButtonElement | null>>([])

    useEffect(() => {
        if (reduced || picked.current || paused) return
        const t = window.setTimeout(() => setStep(s => (s + 1) % STEPS.length), STEP_MS)
        return () => window.clearTimeout(t)
    }, [step, paused, reduced])

    const choose = (i: number) => { picked.current = true; setStep(i) }
    const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
        const last = STEPS.length - 1
        let next = step
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = step === last ? 0 : step + 1
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = step === 0 ? last : step - 1
        else if (e.key === 'Home') next = 0
        else if (e.key === 'End') next = last
        else return
        e.preventDefault()
        choose(next)
        tabs.current[next]?.focus()
    }

    /** open the SmartBill preview on a given tab (events handled in ProductsShowcase) */
    const seeInSmartBill = (feature: string) => {
        window.dispatchEvent(new CustomEvent('r2:select-product', {detail: 'smartbill'}))
        window.setTimeout(() => {
            window.dispatchEvent(new CustomEvent('r2:select-feature', {detail: feature}))
            document.getElementById('solutions')?.scrollIntoView({behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start'})
        }, 80)
    }

    const current = STEPS[step]
    const CurrentIcon = current.icon
    const Shot = SHOTS[step]

    return (
        <section id="about" className="rv-about rv5-about" aria-labelledby="rv-about-title">
            <div className="v3-container rv5-about-grid">
                <div className={`rv5-media rv-fade${imgIn ? ' in' : ''}`} ref={imgRef}>
                    <div className="rv5-photo">
                        <Photo src={company.aboutImage} alt="Our digital solutions"/>
                        <div className="rv-photo-shine" aria-hidden="true"/>
                    </div>
                    <div className="rv-image-badge"><Rocket size={17}/><span><strong>Build.</strong> Improve. Support.</span></div>
                    <ul className="rv5-stat-chips" aria-label="Highlights">
                        {company.stats.slice(0, 3).map((s, i) => (
                            <li key={s.label} style={{'--i': i} as CSSProperties}><b>{s.value}</b><small>{s.label}</small></li>
                        ))}
                    </ul>
                </div>

                <div className={`rv5-copy rv-fade${copyIn ? ' in' : ''}`} ref={copyRef} style={{'--d': '.1s'} as CSSProperties}>
                    <span className="rv-label">ABOUT OUR APPROACH</span>
                    <h2 id="rv-about-title">Good technology should make business easier.</h2>
                    <p>
                        We begin with the requirement, not the software. That means understanding your process, designing the right experience,
                        building the solution and staying available when it needs support.
                    </p>
                    <div className="rv5-principles">
                        {(company.reasons || []).slice(0, 4).map((reason, index) => {
                            const meta = PRINCIPLES[index % PRINCIPLES.length]
                            const Icon = meta.icon
                            return (
                                <article className={`rv6-p tone-${meta.tone}`} key={reason.title} onMouseMove={spotlight} style={{'--i': index} as CSSProperties}>
                                    <span className="rv6-p-mark" aria-hidden="true"><Icon size={92} strokeWidth={1.2}/></span>
                                    <div className="rv6-p-top">
                                        <span className="rv6-p-icon"><Icon size={22}/></span>
                                        <span className="rv6-p-no">{String(index + 1).padStart(2, '0')}</span>
                                    </div>
                                    <strong>{reason.title}</strong>
                                    <p>{reason.description}</p>
                                    <ul className="rv6-p-tags">{meta.tags.map(t => <li key={t}>{t}</li>)}</ul>
                                    <button type="button" className="rv6-p-link" onClick={() => seeInSmartBill(meta.feature)}>See it in SmartBill <ArrowRight size={14}/></button>
                                    <i className="rv6-p-line" aria-hidden="true"/>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="v3-container">
                <div
                    className={`rv5-flow rv-fade${flowIn ? ' in' : ''}`}
                    ref={flowRef}
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                >
                    <div className="rv5-flow-head">
                        <div><span className="rv-label">HOW WE WORK</span><h3>From first conversation to ongoing support.</h3></div>
                        <span className="rv5-flow-count">Step {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}</span>
                    </div>

                    <div className="rv5-stepper" role="tablist" aria-label="How we work" onKeyDown={onKey} style={{'--fill': `${(step / (STEPS.length - 1)) * 100}%`} as CSSProperties}>
                        <span className="rv5-rail" aria-hidden="true"><i/></span>
                        {STEPS.map((s, i) => {
                            const Icon = s.icon
                            return (
                                <button
                                    key={s.key}
                                    ref={el => { tabs.current[i] = el }}
                                    id={`rv5-step-${s.key}`}
                                    type="button"
                                    role="tab"
                                    aria-selected={step === i}
                                    aria-controls="rv5-step-panel"
                                    tabIndex={step === i ? 0 : -1}
                                    className={`rv5-node${step === i ? ' on' : ''}${i < step ? ' done' : ''}`}
                                    onClick={() => choose(i)}
                                >
                                    <span className="rv5-node-dot">{i < step ? <Check size={16}/> : <Icon size={18}/>}</span>
                                    <span className="rv5-node-label"><small>{String(i + 1).padStart(2, '0')}</small><b>{s.title}</b></span>
                                    {step === i && !picked.current && !reduced && <i className="rv5-node-progress" key={`${step}-${paused}`} style={{'--dur': `${STEP_MS}ms`} as CSSProperties}/>}
                                </button>
                            )
                        })}
                    </div>

                    <div className="rv5-panel" id="rv5-step-panel" role="tabpanel" aria-labelledby={`rv5-step-${current.key}`} key={current.key}>
                        <div className="rv5-panel-copy">
                            <span className="rv5-panel-icon"><CurrentIcon size={26}/></span>
                            <h4>{current.title}</h4>
                            <p>{current.text}</p>
                            <ul>{current.points.map(p => <li key={p}><CheckCircle2 size={15}/> {p}</li>)}</ul>
                            <div className="rv5-panel-foot">
                                <span className="rv5-you"><small>YOU GET</small><b>{current.you}</b></span>
                                <button type="button" className="rv-btn rv-btn-primary" onClick={() => enquire('', step === 0 ? 'I would like to start with a conversation about my requirement.' : `I would like to talk about ${current.title.toLowerCase()} for my project.`)}>
                                    {step === 0 ? 'Start with step 1' : `Talk about ${current.title.toLowerCase()}`} <ArrowRight size={16}/>
                                </button>
                                <a className="rv-btn rv5-wa" href={`https://wa.me/${String(company.phone || '').replace(/\D/g, '')}?text=${encodeURIComponent(`Hello, I would like to talk about ${current.title.toLowerCase()} for my project.`)}`} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a>
                            </div>
                        </div>
                        <div className="rv5-panel-visual" aria-hidden="true">
                            <span className="rv5-visual-label">Illustration · sample</span>
                            <div className="rv5-visual-stage"><Shot/></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
