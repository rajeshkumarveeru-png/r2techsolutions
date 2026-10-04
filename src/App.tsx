import {useCallback, useMemo, useState, type CSSProperties} from 'react'

import {company} from './config/company'
import ProductsShowcase from './components/ProductsShowcase'
import {FloatingActions, Header, NAV} from './components/site/Header'
import {Hero, Ticker} from './components/site/Hero'
import {Services} from './components/site/Services'
import {Clients, Industries} from './components/site/Proof'
import {About} from './components/site/About'
import {Contact} from './components/site/Contact'
import {Footer} from './components/site/Footer'
import {prefersReducedMotion, useActiveSection, type EnquiryPrefill} from './components/site/shared'
import './enterprise-v3.css'
import './css/site-v4.css'

/*
 * Optional: set VITE_ENQUIRY_ENDPOINT in your .env file (for example a Formspree / Getform URL or your own API)
 * and the contact form will POST each enquiry there. Without it the form lets the visitor send the
 * prepared enquiry by WhatsApp or email.
 */
const enquiryEndpoint: string | undefined = (import.meta as unknown as {env?: Record<string, string | undefined>}).env?.VITE_ENQUIRY_ENDPOINT || undefined

export default function App() {
    const [prefill, setPrefill] = useState<EnquiryPrefill>({nonce: 0})
    const active = useActiveSection(useMemo(() => NAV.map(([id]) => id), []))

    const scrollTo = useCallback((id: string) => {
        document.getElementById(id)?.scrollIntoView({behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start'})
    }, [])

    /** "Request a demo", "Enquire about this", "Discuss this" ... all land on the contact form with the right topic selected */
    const enquire = useCallback((service: string, message?: string) => {
        setPrefill(p => ({service: service || undefined, message: message || undefined, nonce: p.nonce + 1}))
        scrollTo('contact')
    }, [scrollTo])

    const requestDemo = useCallback(() => enquire('SmartBill', 'I would like a SmartBill demo.'), [enquire])

    return (
        <div
            className="v3-site rv-site"
            style={{
                '--brand': company.theme.primary,
                '--brand-dark': company.theme.dark,
                '--brand-accent': company.theme.accent
            } as CSSProperties}
        >
            <a className="rv-skip" href="#main">Skip to content</a>
            <Header active={active} scrollTo={scrollTo}/>

            <main id="main">
                <Hero scrollTo={scrollTo} requestDemo={requestDemo}/>
                <Ticker/>
                <ProductsShowcase scrollTo={scrollTo} requestDemo={requestDemo}/>
                <Services scrollTo={scrollTo} enquire={enquire}/>
                <Clients/>
                <Industries enquire={enquire}/>
                <About/>
                <Contact prefill={prefill} endpoint={enquiryEndpoint}/>
            </main>

            <Footer scrollTo={scrollTo}/>
            <FloatingActions scrollTo={scrollTo}/>
        </div>
    )
}
