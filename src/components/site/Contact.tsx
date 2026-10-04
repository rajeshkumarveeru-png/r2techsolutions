import {useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent} from 'react'
import {
    ArrowRight, Check, CheckCircle2, ChevronDown, Copy, ExternalLink, Loader2, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck
} from 'lucide-react'
import {company} from '../../config/company'
import {ENQUIRY_SERVICES, mapsLink, companyAddress, type EnquiryPrefill, useReveal, waLink} from './shared'

type Props = {
    prefill: EnquiryPrefill
    /** optional URL (Formspree, Getform, your own API...). When set, enquiries are POSTed there as JSON. */
    endpoint?: string
}

const DRAFT_KEY = 'r2_enquiry_draft'
const MAX_MESSAGE = 600
const METHODS = ['WhatsApp', 'Phone call', 'Email'] as const

type Form = {name: string; email: string; phone: string; business: string; service: string; method: string; message: string; website: string}
const EMPTY: Form = {name: '', email: '', phone: '', business: '', service: '', method: 'WhatsApp', message: '', website: ''}

const FAQ = [
    {q: 'What do you build?', a: 'Professional websites, custom applications, mobile apps and business software products - plus ongoing technical support.'},
    {q: 'Do you provide support after delivery?', a: 'Yes. We provide ongoing support, updates, fixes and improvements so your software keeps working for your business.'},
    {q: 'Does SmartBill work with barcode scanners?', a: 'Yes. SmartBill supports barcode scanners so you can search and add products quickly during billing.'},
    {q: 'How do we get started?', a: 'Usually the first step is simply understanding what you need. Send the enquiry form, call us or message us on WhatsApp.'}
]

const loadDraft = (): Form => {
    try {
        return {...EMPTY, ...JSON.parse(sessionStorage.getItem(DRAFT_KEY) || '{}'), website: ''}
    } catch {
        return EMPTY
    }
}

export function Contact({prefill, endpoint}: Props) {
    const [form, setForm] = useState<Form>(loadDraft)
    const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
    const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')
    const [copied, setCopied] = useState('')
    const [openFaq, setOpenFaq] = useState(0)
    const [leftRef, leftIn] = useReveal<HTMLDivElement>()
    const [rightRef, rightIn] = useReveal<HTMLFormElement>()
    const first = useRef<HTMLInputElement>(null)

    // "Enquire about this" buttons elsewhere on the page fill the service / message and bring the visitor here
    useEffect(() => {
        if (!prefill.nonce) return
        setForm(f => ({...f, service: prefill.service ?? f.service, message: prefill.message ? prefill.message : f.message}))
        setStatus('idle')
        const t = window.setTimeout(() => first.current?.focus({preventScroll: true}), 700)
        return () => window.clearTimeout(t)
    }, [prefill.nonce, prefill.service, prefill.message])

    useEffect(() => {
        try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify({...form, website: ''})) } catch { /* private mode */ }
    }, [form])

    const set = <K extends keyof Form>(key: K, value: Form[K]) => {
        setForm(f => ({...f, [key]: value}))
        if (errors[key]) setErrors(e => ({...e, [key]: undefined}))
    }

    const validate = () => {
        const next: Partial<Record<keyof Form, string>> = {}
        if (form.name.trim().length < 2) next.name = 'Please enter your name.'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.'
        if (form.phone.trim() && !/^[+\d][\d\s-]{6,}$/.test(form.phone.trim())) next.phone = 'Check the phone number.'
        if (form.message.trim().length < 10) next.message = 'Tell us a little about what you need (at least 10 characters).'
        setErrors(next)
        return Object.keys(next).length === 0
    }

    const summary = useMemo(() => {
        const lines: string[] = [
            `Project enquiry - ${company.shortName}`,
            `Name: ${form.name.trim()}`,
            `Email: ${form.email.trim()}`
        ]
        if (form.phone.trim()) lines.push(`Phone: ${form.phone.trim()}`)
        if (form.business.trim()) lines.push(`Business: ${form.business.trim()}`)
        if (form.service) lines.push(`Needs: ${form.service}`)
        lines.push(`Prefers: ${form.method}`, '', form.message.trim())
        return lines.join('\n')
    }, [form])

    const submit = async (event: FormEvent) => {
        event.preventDefault()
        if (form.website) return                       // honeypot: bots fill this hidden field
        if (!validate()) {
            const firstBad = document.querySelector<HTMLElement>('.rv-field.bad input, .rv-field.bad textarea')
            firstBad?.focus()
            return
        }
        if (!endpoint) {                               // no backend configured: let the visitor pick how to send it
            setStatus('done')
            return
        }
        setStatus('sending')
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', Accept: 'application/json'},
                body: JSON.stringify({...form, website: undefined, summary})
            })
            if (!response.ok) throw new Error(String(response.status))
            setStatus('done')
            try { sessionStorage.removeItem(DRAFT_KEY) } catch { /* ignore */ }
        } catch {
            setStatus('failed')
        }
    }

    const copy = async (text: string, key: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(key)
            window.setTimeout(() => setCopied(''), 1600)
        } catch { /* clipboard blocked */ }
    }

    const delivered = !!endpoint && status === 'done'
    const field = (key: keyof Form) => `rv-field${errors[key] ? ' bad' : ''}`

    return (
        <section id="contact" className="rv-contact" aria-labelledby="rv-contact-title">
            <div className="rv-dark-bg" aria-hidden="true"><i className="rv-orb o1"/><i className="rv-orb o2"/><div className="rv-hero-grid"/><i className="rv-orbit a"/><i className="rv-orbit b"/></div>

            <div className="v3-container rv-contact-grid">
                <div className={`rv-contact-left rv-fade${leftIn ? ' in' : ''}`} ref={leftRef}>
                    <div className="rv-eyebrow"><span className="rv-pulse"/> PROJECT STUDIO · OPEN FOR NEW WORK</div>
                    <span className="rv-project-label"><i aria-hidden="true"/> START A PROJECT <b>↗</b></span>
                    <h2 id="rv-contact-title">Have a requirement?<br/><span>Let's build it.</span></h2>
                    <p>Tell us what you need - website, software, mobile app or support.</p>

                    <div className="rv-contact-cards">
                        {[
                            {key: 'p1', icon: Phone, label: 'CALL US', value: company.phone, href: `tel:${company.phone}`, copy: company.phone},
                            {key: 'p2', icon: Phone, label: 'CALL US', value: company.secondaryPhone, href: `tel:${company.secondaryPhone}`, copy: company.secondaryPhone},
                            {key: 'em', icon: Mail, label: 'EMAIL', value: company.email, href: `mailto:${company.email}`, copy: company.email},
                            {key: 'wa', icon: MessageCircle, label: 'WHATSAPP', value: 'Chat with us', href: waLink('Hello, I would like to discuss a project'), wa: true}
                        ].map(c => {
                            const Icon = c.icon
                            return (
                                <div className={`rv-contact-card${c.wa ? ' wa' : ''}`} key={c.key}>
                                    <a href={c.href} target={c.wa ? '_blank' : undefined} rel={c.wa ? 'noreferrer' : undefined}>
                                        <span className="rv-contact-icon"><Icon size={17}/></span>
                                        <span><small>{c.label}</small><strong>{c.value}</strong></span>
                                        <ArrowRight size={15}/>
                                    </a>
                                    {c.copy && (
                                        <button type="button" className="rv-copy" onClick={() => void copy(c.copy!, c.key)} aria-label={`Copy ${c.value}`} title="Copy">
                                            {copied === c.key ? <Check size={15}/> : <Copy size={15}/>}
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div className="rv-address">
                        <span className="rv-address-pin"><MapPin size={18}/></span>
                        <div>
                            <small>OFFICE ADDRESS</small>
                            <address>{companyAddress.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</address>
                            <div className="rv-address-actions">
                                <a href={mapsLink} target="_blank" rel="noreferrer"><ExternalLink size={14}/> Open in Maps</a>
                                <button type="button" onClick={() => void copy(companyAddress.replace(/\n/g, ', '), 'addr')}>{copied === 'addr' ? <Check size={14}/> : <Copy size={14}/>} {copied === 'addr' ? 'Copied' : 'Copy address'}</button>
                            </div>
                        </div>
                    </div>

                    <div className="rv-trust">
                        {['Clear requirements', 'Practical delivery', 'Ongoing support'].map(t => <span key={t}><CheckCircle2 size={14}/> {t}</span>)}
                    </div>

                    <div className="rv-faq" role="region" aria-label="Frequently asked questions">
                        <strong>Common questions</strong>
                        {FAQ.map((item, i) => (
                            <div className={`rv-faq-item${openFaq === i ? ' open' : ''}`} key={item.q}>
                                <button type="button" aria-expanded={openFaq === i} aria-controls={`rv-faq-${i}`} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                                    <span>{item.q}</span><ChevronDown size={17}/>
                                </button>
                                <div id={`rv-faq-${i}`} className="rv-faq-answer"><p>{item.a}</p></div>
                            </div>
                        ))}
                    </div>
                </div>

                {status === 'done' ? (
                    <div className={`rv-form rv-done rv-fade${rightIn ? ' in' : ''}`} style={{'--d': '.1s'} as CSSProperties} role="status">
                        <span className="rv-done-icon"><Check size={30}/></span>
                        <h3>{delivered ? 'Thank you - enquiry sent' : 'Your enquiry is ready'}</h3>
                        <p>{delivered ? 'We have received your enquiry and will get back to you soon.' : 'Choose how you would like to send it to us. It only takes one tap.'}</p>
                        <pre className="rv-summary">{summary}</pre>
                        <div className="rv-done-actions">
                            {!delivered && (
                                <>
                                    <a className="rv-btn rv-btn-wa" href={waLink(summary)} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Send on WhatsApp</a>
                                    <a className="rv-btn rv-btn-light" href={`mailto:${company.email}?subject=${encodeURIComponent(`Project enquiry - ${form.service || 'General'}`)}&body=${encodeURIComponent(summary)}`}><Mail size={17}/> Send by email</a>
                                </>
                            )}
                            <button type="button" className="rv-btn rv-btn-outline" onClick={() => void copy(summary, 'sum')}>{copied === 'sum' ? <Check size={16}/> : <Copy size={16}/>} {copied === 'sum' ? 'Copied' : 'Copy details'}</button>
                        </div>
                        <button type="button" className="rv-link-btn inv" onClick={() => { setStatus('idle'); if (delivered) setForm(EMPTY) }}>{delivered ? 'Send another enquiry' : 'Edit my enquiry'}</button>
                    </div>
                ) : (
                    <form className={`rv-form rv-fade${rightIn ? ' in' : ''}`} ref={rightRef} onSubmit={event => void submit(event)} noValidate style={{'--d': '.1s'} as CSSProperties}>
                        <div className="rv-form-title">
                            <span>PROJECT ENQUIRY</span>
                            <strong>Let's discuss your requirement.</strong>
                            <small>Usually the first step is simply understanding what you need.</small>
                        </div>

                        <div className="rv-row">
                            <label className={field('name')}><span>Your name <i>*</i></span><input ref={first} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" autoComplete="name" aria-invalid={!!errors.name}/>{errors.name && <em role="alert">{errors.name}</em>}</label>
                            <label className={field('email')}><span>Email address <i>*</i></span><input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="name@company.com" autoComplete="email" aria-invalid={!!errors.email}/>{errors.email && <em role="alert">{errors.email}</em>}</label>
                        </div>
                        <div className="rv-row">
                            <label className={field('phone')}><span>Phone number</span><input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 ..." inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone}/>{errors.phone && <em role="alert">{errors.phone}</em>}</label>
                            <label className="rv-field"><span>Company / business</span><input value={form.business} onChange={e => set('business', e.target.value)} placeholder="Business name" autoComplete="organization"/></label>
                        </div>

                        <fieldset className="rv-chipset">
                            <legend>What do you need?</legend>
                            <div className="rv-chips">
                                {ENQUIRY_SERVICES.map(s => (
                                    <button key={s} type="button" className={form.service === s ? 'on' : ''} aria-pressed={form.service === s} onClick={() => set('service', form.service === s ? '' : s)}>
                                        {form.service === s && <Check size={13}/>}{s}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset className="rv-chipset">
                            <legend>How should we reach you?</legend>
                            <div className="rv-chips small">
                                {METHODS.map(m => (
                                    <button key={m} type="button" className={form.method === m ? 'on' : ''} aria-pressed={form.method === m} onClick={() => set('method', m)}>{form.method === m && <Check size={13}/>}{m}</button>
                                ))}
                            </div>
                        </fieldset>

                        <label className={`${field('message')} full`}>
                            <span>Requirement <i>*</i></span>
                            <textarea rows={5} maxLength={MAX_MESSAGE} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Briefly describe your requirement" aria-invalid={!!errors.message}/>
                            <small className={form.message.length > MAX_MESSAGE - 40 ? 'warn' : ''}>{form.message.length} / {MAX_MESSAGE}</small>
                            {errors.message && <em role="alert">{errors.message}</em>}
                        </label>

                        {/* honeypot: hidden from people, visible to simple bots */}
                        <input className="rv-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={e => set('website', e.target.value)} name="website"/>

                        <button className="rv-btn rv-btn-primary rv-submit" type="submit" disabled={status === 'sending'}>
                            {status === 'sending' ? <><Loader2 className="rv-spin" size={17}/> Sending…</> : <>Send Project Enquiry <Send size={16}/></>}
                        </button>
                        {status === 'failed' && (
                            <div className="rv-form-error" role="alert">
                                We could not send this right now. Please use WhatsApp instead:
                                <a href={waLink(summary)} target="_blank" rel="noreferrer"> Send on WhatsApp</a>
                            </div>
                        )}
                        <div className="rv-form-foot"><ShieldCheck size={15}/><span>Your enquiry stays focused on the project you want to build.</span></div>
                    </form>
                )}
            </div>
        </section>
    )
}
