import {ArrowRight, ArrowUp, Mail, MapPin, MessageCircle, Phone} from 'lucide-react'
import {company} from '../../config/company'
import {companyAddress, Logo, mapsLink, useReveal, waLink} from './shared'

const PRODUCT_LINKS = [['SmartBill', 'smartbill'], ['Jewell360', 'jewell360'], ['Restro/Hotel360', 'resto360'], ['Textile360', 'textile360'], ['Mobile360', 'mobile360'], ['Medical360', 'medical360']] as const
const COMPANY_LINKS = [['services', 'Services'], ['clients', 'Clients'], ['about', 'About'], ['contact', 'Contact']] as const

export function Footer({scrollTo}: {scrollTo: (id: string) => void}) {
    const [ctaRef, ctaIn] = useReveal<HTMLDivElement>()
    const [mainRef, mainIn] = useReveal<HTMLDivElement>(0.08)
    const openProduct = (key: string) => {
        window.dispatchEvent(new CustomEvent('r2:select-product', {detail: key}))
        scrollTo('solutions')
    }
    return (
        <footer className="rv-footer">
            <div className="rv-footer-glow" aria-hidden="true" data-parallax=".14" data-parallax-max="70"/>
            <div className={`v3-container rv-footer-cta rv-fade${ctaIn ? ' in' : ''}`} ref={ctaRef}>
                <div>
                    <h3>Ready to build something useful?</h3>
                    <p>Tell us about your requirement. We will help you choose the simplest way forward.</p>
                </div>
                <button type="button" className="rv-btn rv-btn-light" onClick={() => scrollTo('contact')}>Start a Project <ArrowRight size={16}/></button>
            </div>

            <div className={`v3-container rv-footer-main rv-stagger${mainIn ? ' in' : ''}`} ref={mainRef}>
                <div className="rv-footer-brand">
                    <div className="rv-footer-logo"><Logo src={company.logo} alt=""/><strong>{company.shortName}</strong></div>
                    <p>Digital products, websites, custom software and dependable software support for modern businesses.</p>
                    <div className="rv-footer-social">
                        <a href={waLink('Hello, I would like to discuss a project')} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18}/></a>
                        <a href={`mailto:${company.email}`} aria-label="Email"><Mail size={18}/></a>
                        <a href={`tel:${company.phone}`} aria-label="Call"><Phone size={18}/></a>
                        <a href={mapsLink} target="_blank" rel="noreferrer" aria-label="Find us on the map"><MapPin size={18}/></a>
                    </div>
                </div>

                <div className="rv-footer-links">
                    <strong>Products</strong>
                    {PRODUCT_LINKS.map(([label, key]) => <button key={key} type="button" onClick={() => openProduct(key)}>{label}</button>)}
                </div>
                <div className="rv-footer-links">
                    <strong>Company</strong>
                    {COMPANY_LINKS.map(([id, label]) => <button key={id} type="button" onClick={() => scrollTo(id)}>{label}</button>)}
                </div>
                <div className="rv-footer-links">
                    <strong>Contact</strong>
                    <a href={`tel:${company.phone}`}>{company.phone}</a>
                    <a href={`tel:${company.secondaryPhone}`}>{company.secondaryPhone}</a>
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                    <span className="rv-footer-addr">{companyAddress.replace(/\n/g, ', ')}</span>
                </div>
            </div>

            <div className="v3-container rv-footer-bottom">
                <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
                <span>Digital technology for better business.</span>
                <button type="button" onClick={() => scrollTo('home')}>Back to top <ArrowUp size={14}/></button>
            </div>
        </footer>
    )
}
