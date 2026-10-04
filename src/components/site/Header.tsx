import {useEffect, useRef, useState, type CSSProperties} from 'react'
import {ArrowRight, ArrowUp, Mail, Menu, MessageCircle, Phone, X} from 'lucide-react'
import {company} from '../../config/company'
import {Logo, useScrollState, waLink} from './shared'

export const NAV = [
    ['home', 'Home'],
    ['solutions', 'Products'],
    ['services', 'Services'],
    ['clients', 'Clients'],
    ['about', 'About'],
    ['contact', 'Contact']
] as const

type HeaderProps = {
    active: string
    scrollTo: (id: string) => void
}

/** Fixed header: transparent over the hero, solid once scrolled, progress bar, active link, mobile drawer. */
export function Header({active, scrollTo}: HeaderProps) {
    const {scrolled, progress} = useScrollState()
    const [open, setOpen] = useState(false)
    const burgerRef = useRef<HTMLButtonElement>(null)
    const drawerRef = useRef<HTMLDivElement>(null)

    // drawer: lock page scroll, close with Esc, move focus inside and back again
    useEffect(() => {
        if (!open) return
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
            if (e.key === 'Tab' && drawerRef.current) {
                const items = drawerRef.current.querySelectorAll<HTMLElement>('button, a[href]')
                if (!items.length) return
                const first = items[0]
                const last = items[items.length - 1]
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
            }
        }
        window.addEventListener('keydown', onKey)
        const t = window.setTimeout(() => drawerRef.current?.querySelector<HTMLElement>('button')?.focus(), 50)
        const button = burgerRef.current
        return () => {
            document.body.style.overflow = previous
            window.removeEventListener('keydown', onKey)
            window.clearTimeout(t)
            button?.focus()
        }
    }, [open])

    const go = (id: string) => {
        setOpen(false)
        // wait for the scroll lock to be released before scrolling
        window.setTimeout(() => scrollTo(id), 30)
    }

    return (
        <>
            <div className="rv-progress" aria-hidden="true"><i style={{transform: `scaleX(${progress})`}}/></div>
            <header className={`rv-header${scrolled ? ' is-scrolled' : ''}`}>
                <div className="v3-container rv-nav">
                    <button type="button" className="rv-brand" onClick={() => scrollTo('home')} aria-label={`${company.name} - back to top`}>
                        <Logo className="rv-brand-logo" src={company.logoPlain} alt={`${company.name} logo`}/>
                        <span className="rv-brand-words"><strong>{company.shortName}</strong><small>Digital Solutions</small></span>
                    </button>

                    <nav className="rv-links" aria-label="Primary navigation">
                        {NAV.map(([id, label]) => (
                            <button key={id} type="button" className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined} onClick={() => scrollTo(id)}>
                                <span>{label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="rv-nav-end">
                        <span className="rv-status" title="Available for new projects"><i aria-hidden="true"/><span>Available for new projects</span></span>
                        <button type="button" className="rv-cta" onClick={() => scrollTo('contact')}>
                            <span>Start a Project</span><ArrowRight size={15}/>
                        </button>
                        <button ref={burgerRef} type="button" className="rv-burger" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open} aria-controls="rv-drawer">
                            <Menu size={22}/>
                        </button>
                    </div>
                </div>
            </header>

            <div className={`rv-drawer-wrap${open ? ' open' : ''}`} aria-hidden={!open}>
                <div className="rv-drawer-backdrop" onClick={() => setOpen(false)}/>
                <div id="rv-drawer" className="rv-drawer" role="dialog" aria-modal="true" aria-label="Navigation" ref={drawerRef}>
                    <div className="rv-drawer-head">
                        <span className="rv-brand-words"><strong>{company.shortName}</strong><small>Digital Solutions</small></span>
                        <button type="button" className="rv-drawer-close" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={20}/></button>
                    </div>
                    <nav className="rv-drawer-links" aria-label="Mobile navigation">
                        {NAV.map(([id, label], i) => (
                            <button key={id} type="button" className={active === id ? 'on' : ''} onClick={() => go(id)} style={{'--i': i} as CSSProperties}>
                                <small>{String(i + 1).padStart(2, '0')}</small><span>{label}</span><ArrowRight size={18}/>
                            </button>
                        ))}
                    </nav>
                    <div className="rv-drawer-foot">
                        <a href={`tel:${company.phone}`}><Phone size={16}/> {company.phone}</a>
                        <a href={`mailto:${company.email}`}><Mail size={16}/> {company.email}</a>
                        <a className="wa" href={waLink('Hello, I would like to discuss a project')} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Chat on WhatsApp</a>
                        <button type="button" className="rv-cta" onClick={() => go('contact')}><span>Start a Project</span><ArrowRight size={15}/></button>
                    </div>
                </div>
            </div>
        </>
    )
}

/** Floating WhatsApp button + back-to-top (with a progress ring). */
export function FloatingActions({scrollTo}: {scrollTo: (id: string) => void}) {
    const {y, progress} = useScrollState()
    const showTop = y > 700
    const C = 2 * Math.PI * 20
    return (
        <div className="rv-float">
            <button type="button" className={`rv-top${showTop ? ' show' : ''}`} onClick={() => scrollTo('home')} aria-label="Back to top" tabIndex={showTop ? 0 : -1}>
                <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="20"/><circle className="ring" cx="24" cy="24" r="20" style={{strokeDasharray: C, strokeDashoffset: C * (1 - progress)}}/></svg>
                <ArrowUp size={18}/>
            </button>
            <a className="rv-wa" href={waLink('Hello, I would like to discuss a project')} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp">
                <MessageCircle size={24}/>
                <span className="rv-wa-tip">Chat with us</span>
                <i aria-hidden="true"/>
            </a>
        </div>
    )
}
