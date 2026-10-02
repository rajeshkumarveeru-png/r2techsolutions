import { useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Barcode, BarChart3, Boxes, CheckCircle2,
  Code2, CreditCard, Globe2, Headphones, HeartPulse, HardDrive, Menu,
  MessageCircle, Package, Phone, ShoppingCart, Smartphone, Sparkles,
  Store, Users, X, Zap
} from 'lucide-react'
import { company } from './config/company'
import './enterprise-v3.css'

const phone2 = '+91 80567 12993'
const whatsapp = `https://wa.me/${phone2.replace(/\D/g, '')}?text=Hello%20R2Tech%20Solutions,%20I%20would%20like%20to%20discuss%20a%20software%20or%20website%20requirement.`

const products = [
  { icon: ShoppingCart, name: 'SmartBill', tag: 'AVAILABLE', title: 'Smart billing. Simple business.', text: 'A practical billing, POS, inventory and business management platform for growing businesses.', features: ['GST billing & payments', 'Inventory & stock control', 'Customers & expenses', 'Reports & WhatsApp invoice'] },
  { icon: Sparkles, name: 'Jewell360', tag: 'COMING SOON', title: 'Jewellery business management.', text: 'A focused platform planned for jewellery stores with billing, stock, customer and business operations.', features: ['Jewellery billing', 'Stock management', 'Customer management', 'Reports & operations'] },
  { icon: Package, name: 'Textile360', tag: 'COMING SOON', title: 'Textile business management.', text: 'A dedicated software platform planned for textile and garment businesses.', features: ['Product management', 'Sales & billing', 'Inventory control', 'Customers & reports'] },
]

const services = [
  { icon: Globe2, title: 'Web Design & Development', text: 'Professional, responsive business websites and landing pages designed to present your brand clearly and generate enquiries.' },
  { icon: Code2, title: 'Custom Application Development', text: 'Business applications, workflow systems, integrations and automation built around the way your business actually works.' },
  { icon: ShoppingCart, title: 'Business Software Solutions', text: 'Billing, POS, inventory and management products designed for practical day-to-day business operations.' },
  { icon: Headphones, title: 'Support & Maintenance', text: 'Ongoing technical support, troubleshooting, upgrades, enhancements and maintenance after your application or website goes live.' },
]

const clients = [
  { name: 'MadeHealthcare', meta: 'Healthcare Solutions', icon: HeartPulse },
  { name: 'Thiru Krishna Traders', meta: 'Trading Solutions', icon: BarChart3 },
  { name: 'Sam Mobiles', meta: 'Mobile Solutions', icon: Smartphone },
  { name: 'ASP Hardwares', meta: 'Hardware Solutions', icon: HardDrive },
]

const capabilities = ['Web Design & Development', 'Custom Applications', 'Mobile Applications', 'POS & Billing', 'Inventory & Business Systems', 'Automation & Integration', 'Cloud Deployment', 'Support & Maintenance']

export default function App() {
  const [menu, setMenu] = useState(false)
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenu(false) }

  return <div className="site" style={{ '--brand': company.theme.primary, '--brand-dark': company.theme.dark, '--accent': company.theme.accent } as React.CSSProperties}>
    <header className="header">
      <div className="container nav">
        <button className="brand" onClick={() => go('home')}><img src={company.logoPlain} alt="R2Tech Solutions" /><span><b>R2Tech</b><small>Smart solutions</small></span></button>
        <nav className={menu ? 'nav-links open' : 'nav-links'}>
          <button onClick={() => go('home')}>Home</button><button onClick={() => go('products')}>Products</button><button onClick={() => go('services')}>Services</button><button onClick={() => go('clients')}>Clients</button><button onClick={() => go('about')}>About</button><button onClick={() => go('contact')}>Contact</button>
          <button className="nav-cta" onClick={() => go('contact')}>Get a Demo <ArrowRight size={15}/></button>
        </nav>
        <button className="menu-button" onClick={() => setMenu(v => !v)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="hero-glow one"/><div className="hero-glow two"/>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span/> R2TECH SOLUTIONS · SOFTWARE & DIGITAL SERVICES</div>
            <h1>Simple technology.<br/><em>Powerful business.</em></h1>
            <p>We design professional websites, build custom applications and create practical business software that helps companies work smarter.</p>
            <div className="hero-actions"><button className="btn primary" onClick={() => go('contact')}>Start a Project <ArrowRight size={17}/></button><button className="btn secondary" onClick={() => go('products')}>Explore Products <ArrowUpRight size={16}/></button></div>
            <div className="hero-points"><span><CheckCircle2/> Web & Software</span><span><CheckCircle2/> Business Products</span><span><CheckCircle2/> Ongoing Support</span></div>
          </div>
          <div className="hero-card">
            <div className="card-top"><div><span>R2TECH</span><strong>Business Software</strong></div><b><i/> LIVE</b></div>
            <div className="dashboard-preview"><div className="dash-head"><span>SMARTBILL</span><span>Dashboard</span></div><div className="metric-grid"><div><small>Sales</small><strong>₹ 3.30L</strong><span>Today</span></div><div><small>Products</small><strong>100+</strong><span>Managed</span></div><div><small>Customers</small><strong>250+</strong><span>Organized</span></div><div><small>Reports</small><strong>24/7</strong><span>Visibility</span></div></div><div className="chart"><div className="chart-bars"><i/><i/><i/><i/><i/><i/><i/><i/></div><div><b>Business overview</b><span>Clear information for better decisions</span></div></div><div className="quick"><span><Barcode/> Barcode billing</span><span><Boxes/> Inventory</span><span><Users/> Customers</span></div></div>
            <div className="card-bottom"><Sparkles size={14}/> Built for practical business operations <Zap size={14}/></div>
          </div>
        </div>
      </section>

      <section className="trust-strip"><div className="container trust"><span>WHAT WE DO</span><i/> Web Design <i/> Custom Software <i/> POS & Billing <i/> Mobile Apps <i/> Support & Maintenance</div></section>

      <section id="products" className="section products-section"><div className="container">
        <div className="section-head"><div><label>OUR PRODUCTS</label><h2>Software products built<br/>for real businesses.</h2></div><p>R2Tech is building a focused family of business products. SmartBill is available today, with Jewell360 and Textile360 planned as future platforms.</p></div>
        <div className="product-grid">{products.map((p, i) => { const Icon=p.icon; return <article className={`product-card ${i===0?'featured':''}`} key={p.name}><div className="product-top"><div className="product-icon"><Icon/></div><span className={i===0?'available':''}>{p.tag}</span></div><h3>{p.name}</h3><h4>{p.title}</h4><p>{p.text}</p><div className="feature-list">{p.features.map(f=><span key={f}><CheckCircle2/> {f}</span>)}</div><button onClick={() => go('contact')}>{i===0?'Request SmartBill Demo':'Discuss Product Development'} <ArrowRight/></button>{i===0 && <div className="product-image"><img src="/images/smart-billing-pos.png" alt="SmartBill interface"/></div>}</article> })}</div>
      </div></section>

      <section id="services" className="section services-section"><div className="container"><div className="section-head light-head"><div><label>OUR SERVICES</label><h2>Everything you need to<br/>build and support digital products.</h2></div><p>From a simple business website to a complete custom application, we can support the full journey.</p></div><div className="service-grid">{services.map((s,i)=>{const Icon=s.icon;return <article className="service-card" key={s.title}><span className="service-no">0{i+1}</span><div className="service-icon"><Icon/></div><h3>{s.title}</h3><p>{s.text}</p><ArrowUpRight className="service-arrow"/></article>})}</div></div></section>

      <section className="section capabilities"><div className="container capability-layout"><div><label>CAPABILITIES</label><h2>Technology that fits<br/><em>your way of working.</em></h2><p>We keep solutions practical, scalable and easy for business teams to use.</p><button className="text-btn" onClick={() => go('contact')}>Tell us what you need <ArrowRight/></button></div><div className="cap-grid">{capabilities.map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b><ArrowUpRight/></div>)}</div></div></section>

      <section id="clients" className="section clients"><div className="container"><div className="section-head"><div><label>OUR CLIENTS</label><h2>Trusted by businesses<br/>we have worked with.</h2></div><p>Existing client information is retained as part of the R2Tech portfolio.</p></div><div className="client-grid">{clients.map(c=>{const Icon=c.icon;return <article key={c.name}><div className="client-icon"><Icon/></div><div><small>CLIENT</small><h3>{c.name}</h3><p>{c.meta}</p></div><ArrowUpRight/></article>})}</div></div></section>

      <section id="about" className="about"><div className="container about-grid"><div className="about-image"><img src={company.aboutImage} alt="R2Tech business technology"/><div className="floating"><strong>R2</strong><span>Smart solutions<br/>for growing businesses</span></div></div><div className="about-copy"><label>ABOUT R2TECH</label><h2>Professional technology without unnecessary complexity.</h2><p>R2Tech Solutions helps businesses turn ideas into useful digital products — from websites and custom applications to billing, business systems and ongoing technical support.</p><div className="about-points"><span><CheckCircle2/> Clear requirements</span><span><CheckCircle2/> Practical delivery</span><span><CheckCircle2/> Long-term support</span><span><CheckCircle2/> Business-focused solutions</span></div><button className="text-btn" onClick={() => go('contact')}>Work with R2Tech <ArrowRight/></button></div></div></section>

      <section id="contact" className="contact"><div className="container contact-grid"><div className="contact-copy"><label>LET'S TALK</label><h2>Have a project<br/><em>in mind?</em></h2><p>Tell us what you are planning. Whether it is a website, custom application, business software or support requirement, we can start with a simple conversation.</p><div className="contact-lines"><a href={`tel:${company.phone.replace(/\s/g,'')}`}><Phone/><span><small>PHONE</small>{company.phone}</span></a><a href={`tel:${phone2.replace(/\s/g,'')}`}><Phone/><span><small>PHONE</small>{phone2}</span></a><a href={`mailto:${company.email}`}><span className="mail-icon">@</span><span><small>EMAIL</small>{company.email}</span></a><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle/><span><small>WHATSAPP</small>Chat with R2Tech</span></a></div></div><form className="contact-form" onSubmit={e=>{e.preventDefault();window.open(whatsapp,'_blank')}}><div className="form-title"><span>PROJECT ENQUIRY</span><strong>Let's discuss your requirement.</strong></div><div className="form-row"><input required placeholder="Your name"/><input required type="email" placeholder="Email address"/></div><div className="form-row"><input placeholder="Phone number"/><input placeholder="Company / business"/></div><select defaultValue=""><option value="" disabled>Select a service</option><option>Web Design & Development</option><option>Custom Application Development</option><option>SmartBill Demo</option><option>Jewell360</option><option>Textile360</option><option>Support & Maintenance</option></select><textarea required rows={5} placeholder="Briefly describe your requirement"/><button className="btn primary" type="submit">Send Enquiry via WhatsApp <ArrowRight/></button><small>We will use your enquiry to start the conversation on WhatsApp.</small></form></div></section>
    </main>

    <footer><div className="container footer-main"><div className="footer-brand"><img src={company.logo} alt=""/><strong>R2Tech Solutions</strong><p>Smart solutions for growing businesses.</p></div><div><b>Products</b><button onClick={()=>go('products')}>SmartBill</button><button onClick={()=>go('products')}>Jewell360</button><button onClick={()=>go('products')}>Textile360</button></div><div><b>Company</b><button onClick={()=>go('services')}>Services</button><button onClick={()=>go('clients')}>Clients</button><button onClick={()=>go('about')}>About</button><button onClick={()=>go('contact')}>Contact</button></div><div><b>Contact</b><span>{company.phone}</span><span>{phone2}</span><span>{company.email}</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} R2Tech Solutions. All rights reserved.</span><span>Smart solutions. Practical technology.</span></div></footer>
  </div>
}
