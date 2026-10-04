import {useEffect, useRef, useState, type MouseEvent} from 'react'
import {company} from '../../config/company'

/* ------------------------------------------------------------------------------------------
   Small shared helpers used by every redesigned section
   ------------------------------------------------------------------------------------------ */
export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** true once the element has scrolled into view (state, so React re-renders never wipe it) */
export function useReveal<T extends HTMLElement>(threshold = 0.12) {
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
            if (entries.some(e => e.isIntersecting)) {
                setVisible(true)
                io.disconnect()
            }
        }, {threshold})
        io.observe(el)
        return () => io.disconnect()
    }, [threshold])
    return [ref, visible] as const
}

/** id of the section currently under the reading line (used to highlight the nav) */
export function useActiveSection(ids: string[]) {
    const [active, setActive] = useState(ids[0])
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return
        const visible = new Map<string, number>()
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio)
                else visible.delete(e.target.id)
            })
            if (visible.size) {
                const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0]
                setActive(best)
            }
        }, {rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]})
        ids.forEach(id => {
            const el = document.getElementById(id)
            if (el) io.observe(el)
        })
        return () => io.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ids.join('|')])
    return active
}

/** scroll position -> {scrolled, progress 0..1}; throttled with requestAnimationFrame */
export function useScrollState(threshold = 24) {
    const [state, setState] = useState({scrolled: false, progress: 0, y: 0})
    useEffect(() => {
        let raf = 0
        const read = () => {
            raf = 0
            const doc = document.documentElement
            const max = Math.max(1, doc.scrollHeight - window.innerHeight)
            const y = window.scrollY || doc.scrollTop
            setState(prev => {
                const next = {scrolled: y > threshold, progress: Math.min(1, y / max), y}
                return prev.scrolled === next.scrolled && Math.abs(prev.progress - next.progress) < 0.004 && Math.abs(prev.y - next.y) < 40 ? prev : next
            })
        }
        const onScroll = () => { if (!raf) raf = window.requestAnimationFrame(read) }
        read()
        window.addEventListener('scroll', onScroll, {passive: true})
        window.addEventListener('resize', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
            if (raf) window.cancelAnimationFrame(raf)
        }
    }, [threshold])
    return state
}

/** writes --mx/--my (pointer position inside the card) so CSS can paint a spotlight under the cursor */
export const spotlight = (event: MouseEvent<HTMLElement>) => {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

/* ------------------------------------------------------------------------------------------
   Contact helpers
   ------------------------------------------------------------------------------------------ */
export const phoneDigits = String(company.phone || '').replace(/\D/g, '')
export const waLink = (message: string) => `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`
export const companyAddress = `No# 30,
Shanmuga Garden,
Near Asife Biryani,
Vadakuthu,
Neyveli - 607308`
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyAddress.replace(/\n/g, ' '))}`

export type EnquiryPrefill = {service?: string; message?: string; nonce: number}

/** the list of things a visitor can ask for (identical to the old <select>, plus "Business Software Solutions") */
export const ENQUIRY_SERVICES = [
    'SmartBill', 'Jewell360', 'Textile360', 'Resto/Hotel360', 'Lodge360',
    'Web Design & Development', 'Custom Application Development', 'Business Software Solutions',
    'Mobile App Development', 'Support & Maintenance'
]

/** brand logo with a graceful fallback if /images/*.png is missing */
export function Logo({src, alt, className}: {src: string; alt: string; className?: string}) {
    const [ok, setOk] = useState(true)
    if (!ok) return <span className={`rv-logo-fallback ${className || ''}`} role="img" aria-label={alt}>R2</span>
    return <img className={className} src={src} alt={alt} onError={() => setOk(false)}/>
}

/** image with a gradient fallback (the demo photos are remote URLs) */
export function Photo({src, alt, className}: {src: string; alt: string; className?: string}) {
    const [ok, setOk] = useState(true)
    if (!ok) return <div className={`rv-photo-fallback ${className || ''}`} role="img" aria-label={alt}/>
    return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setOk(false)}/>
}
