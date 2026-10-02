import { useState } from 'react'
import {
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    Barcode,
    Boxes,
    CheckCircle2,
    CalendarCheck,
    ChevronRight,
    Coffee,
    Code2,
    CreditCard,
    Globe2,
    Headphones,
    HeartPulse,
    HardDrive,
    Mail,
    MessageCircle,
    Store,
    Menu,
    Package,
    Phone,
    Quote,
    Rocket,
    ShoppingCart,
    Smartphone,
    Sparkles,
    TrendingUp,
    BriefcaseBusiness,
    Users,
    X,
    Zap
} from 'lucide-react'

import { company } from './config/company'
import './enterprise-v3.css'

const serviceContent = [
    {
        number: '01',
        icon: Globe2,
        title: 'Web Design & Development',
        description: 'Professional websites for businesses and brands.'
    },
    {
        number: '02',
        icon: Code2,
        title: 'Custom Application Development',
        description: 'Custom web applications built around your business needs.'
    },
    {
        number: '03',
        icon: BriefcaseBusiness,
        title: 'Business Software Solutions',
        description: 'Billing, POS, inventory and business management solutions.'
    },
    {
        number: '04',
        icon: Smartphone,
        title: 'Mobile App Development',
        description: 'Mobile applications for customers, teams and business operations.'
    },
    {
        number: '05',
        icon: Headphones,
        title: 'Support & Maintenance',
        description: 'Ongoing support, updates, fixes and improvements.'
    }
]


const smartBillingFeatures = [
    {
        number: '01',
        icon: CreditCard,
        title: 'Fast Billing',
        description: 'Create bills quickly with a clean POS interface designed for busy business environments.'
    },
    {
        number: '02',
        icon: Boxes,
        title: 'Accurate Inventory',
        description: 'Keep track of available stock and reduce mistakes caused by manual inventory management.'
    },
    {
        number: '03',
        icon: Barcode,
        title: 'Barcode Support',
        description: 'Use barcode scanners to search and add products quickly during billing.'
    },
    {
        number: '04',
        icon: BarChart3,
        title: 'Business Insights',
        description: 'See sales performance, product movement and useful business reporting in one place.'
    }
]

const clientContent = [
    { name: 'MadeHealthcare', meta: 'CLIENT · HEALTHCARE SOLUTIONS', icon: HeartPulse },
    { name: 'Thiru Krishna Traders', meta: 'CLIENT · TRADING SOLUTIONS', icon: TrendingUp },
    { name: 'Sam Mobiles', meta: 'CLIENT · MOBILE SOLUTIONS', icon: Smartphone },
    { name: 'ASP Hardwares', meta: 'CLIENT · HARDWARE SOLUTIONS', icon: HardDrive }
]

const smartBillingImage = '/images/smart-billing-pos.png'
const whatsappUrl = `https://wa.me/${String(company.phone || '').replace(/\D/g, '')}?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project`
const companyAddress = `No# 30,
Shanmuga Garden,
Near Asife Biryani,
Vadakuthu,
Neyveli - 607308`

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false)

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    const requestDemo = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    return (
        <div
            className="v3-site"
            style={
                {
                    '--brand': company.theme.primary,
                    '--brand-dark': company.theme.dark,
                    '--brand-accent': company.theme.accent
                } as React.CSSProperties
            }
        >
            <header className="v3-header">
                <div className="v3-container v3-nav">
                    <button className="v3-brand" onClick={() => scrollTo('home')}>
                        <img src={company.logoPlain} alt={`${company.name} logo`} />
                        <span className="brandWords">
              <strong>{company.shortName}</strong>
              <small>Digital Solutions</small>
            </span>
                    </button>

                    <nav
                        id="v3-mobile-nav"
                        className={menuOpen ? 'v3-links open' : 'v3-links'}
                        aria-label="Primary navigation"
                    >
                        {[
                            ['home', 'Home'],
                            ['solutions', 'Products'],
                            ['services', 'Services'],
                            ['clients', 'Clients'],
                            ['about', 'About'],
                            ['contact', 'Contact']
                        ].map(([id, label]) => (
                            <button key={id} onClick={() => scrollTo(id)}>
                                {label}
                            </button>
                        ))}
                        <span className="v3-header-status" aria-label="R2 Tech is available for new projects">
              <i aria-hidden="true" />
              <span>Available for new projects</span>
            </span>
                        <button className="v3-nav-cta" onClick={() => scrollTo('contact')}>
                            <span>Start a Project</span>
                            <ArrowRight size={15} />
                        </button>
                    </nav>

                    <button
                        type="button"
                        className="v3-menu"
                        onClick={() => setMenuOpen(v => !v)}
                        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                        aria-expanded={menuOpen}
                        aria-controls="v3-mobile-nav"
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            <main>
                <section id="home" className="v3-hero">
                    <div
                        className="v3-hero-photo"
                        style={{ backgroundImage: `url(${company.heroImage})` }}
                    />
                    <div className="v3-hero-shade" />
                    <div className="v3-hero-grid" />

                    <div className="v3-container v3-hero-inner">
                        <div className="v3-hero-copy">
                            <div className="v3-eyebrow">
                                <span className="v3-pulse" />
                                DIGITAL PRODUCTS • SOFTWARE • SUPPORT
                            </div>

                            <h1>
                                Digital solutions
                                <span>built around</span>
                                your business.
                            </h1>

                            <p>
                                We design professional websites, build custom applications, develop business software products and provide dependable support — with a simple focus: useful technology for your business.
                            </p>

                            <div className="v3-actions">
                                <button type="button" className="v3-btn v3-btn-primary" onClick={() => scrollTo('contact')}>
                                    Discuss Your Requirement <ArrowRight size={17} />
                                </button>
                                <button type="button" className="v3-btn v3-btn-demo" onClick={requestDemo}>
                                    <CalendarCheck size={16} />
                                    Request a Demo
                                </button>
                                <button type="button" className="v3-btn v3-btn-glass" onClick={() => scrollTo('solutions')}>
                                    Explore What We Build
                                </button>
                            </div>

                            <div className="v3-proof-row">
                                <span><CheckCircle2 size={15} /> Web Development</span>
                                <span><CheckCircle2 size={15} /> Custom Software</span>
                                <span><CheckCircle2 size={15} /> Business Products</span>
                            </div>
                        </div>

                        <div className="v3-hero-console">
                            <div className="v3-console-head">
                                <div>
                                    <span>SMART BILLING</span>
                                    <strong>Business Operations</strong>
                                </div>
                                <div className="v3-live"><i /> LIVE</div>
                            </div>

                            <div className="v3-console-tabs">
                                <span className="active">OVERVIEW</span>
                                <span>BILLING</span>
                                <span>INVENTORY</span>
                                <span>REPORTS</span>
                            </div>

                            <div className="v3-console-grid">
                                <div className="v3-console-card v3-large">
                                    <small>TODAY</small>
                                    <strong>Business at a glance</strong>
                                    <div className="v3-line-chart">
                                        <i /><i /><i /><i /><i /><i /><i /><i />
                                    </div>
                                    <div className="v3-chart-foot">
                                        <span>Operational visibility</span>
                                        <b><BarChart3 size={13} /> Reports</b>
                                    </div>
                                </div>

                                <div className="v3-console-card">
                                    <small>WORKFLOW</small>
                                    <div className="v3-mini-stat"><CreditCard size={17} /><strong>Billing</strong><span>Fast</span></div>
                                    <div className="v3-mini-stat"><Boxes size={17} /><strong>Stock</strong><span>Live</span></div>
                                    <div className="v3-mini-stat"><Users size={17} /><strong>Customers</strong><span>Organized</span></div>
                                </div>
                            </div>

                            <div className="v3-scan">
                                <div className="v3-scan-icon"><Barcode size={20} /></div>
                                <div><strong>QR / Barcode ready</strong><span>Speed up product lookup and billing</span></div>
                                <Zap size={17} />
                            </div>

                            <div className="v3-console-footer">
                                <span><Sparkles size={13} /> Built for practical business operations</span>
                                <span>01 / 04</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="v3-marquee" aria-label="What we do">
                    <div className="v3-container v3-marquee-inner">
                        <span>WHAT WE BUILD</span>
                        <i />
                        <b>WEBSITE DESIGN</b>
                        <i />
                        <b>SOFTWARE DEVELOPMENT</b>
                        <i />
                        <b>MOBILE & BUSINESS APPS</b>
                        <i />
                        <b>POS & BILLING</b>
                        <i />
                        <b>AUTOMATION</b>
                        <i />
                        <b>SUPPORT & MAINTENANCE</b>
                    </div>
                </section>

                <section id="solutions" className="v3-section v3-solutions-section">
                    <div className="v3-container">
                        <div className="v3-heading">
                            <div>
                                <span className="v3-label">OUR PRODUCTS</span>
                                <h2>Simple software for<br />real business needs.</h2>
                            </div>
                            <p>
                                Explore our current product and the platforms we are building for different business domains.
                            </p>
                        </div>

                        <div className="v3-solution-layout">
                            <article className="v3-feature-product">
                                <div className="v3-feature-top">
                                    <span>01 / PRODUCT</span>
                                    <span className="v3-status"><i /> AVAILABLE</span>
                                </div>

                                <div className="v3-feature-content">
                                    <div>
                                        <div className="v3-feature-icon"><ShoppingCart size={25} /></div>
                                        <h3>SmartBill</h3>
                                        <p>
                                            A modern business billing platform for fast checkout,
                                            inventory, customers, payments, QR/barcode scanning and reports.
                                        </p>

                                        <div className="v3-feature-list">
                                            {['Fast billing & payments', 'Inventory & stock control', 'Customer management', 'Reports & business visibility'].map(item => (
                                                <span key={item}><CheckCircle2 size={15} /> {item}</span>
                                            ))}
                                        </div>

                                        <div className="v3-product-actions">
                                            <button type="button" className="v3-arrow-btn" onClick={() => scrollTo('contact')}>
                                                Enquire about SmartBill <ArrowRight size={16} />
                                            </button>
                                            <button type="button" className="v3-demo-mini-btn" onClick={requestDemo}>
                                                <CalendarCheck size={15} />
                                                Request a Demo
                                            </button>
                                        </div>
                                    </div>

                                    <div className="v3-product-screen v3-real-product-screen">
                                        <div className="v3-real-image-bar">
                                            <span><i /><i /><i /></span>
                                            <strong>SMART BILLING · LIVE PRODUCT VIEW</strong>
                                            <em>POS</em>
                                        </div>
                                        <div className="v3-real-image-wrap">
                                            <img
                                                src={smartBillingImage}
                                                alt="Smart Billing point of sale application"
                                            />
                                            <div className="v3-image-overlay-badge">
                                                <Sparkles size={13} />
                                                Real product interface
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>

                            <div className="v3-service-stack">
                                {serviceContent.slice(0, 3).map(item => {
                                    const Icon = item.icon
                                    return (
                                        <article className="v3-service-tile" key={item.title}>
                                            <span className="v3-service-number">{item.number}</span>
                                            <div className="v3-service-icon"><Icon size={20} /></div>
                                            <div>
                                                <span className="v3-label">SERVICE</span>
                                                <h3>{item.title}</h3>
                                                <p>{item.description}</p>
                                            </div>
                                            <span className="v3-corner-action"><ArrowUpRight size={13} /></span>
                                            <ChevronRight size={19} />
                                        </article>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="v3-product-feature-grid">
                            {smartBillingFeatures.map(feature => {
                                const Icon = feature.icon
                                return (
                                    <article className="v3-product-feature-card" key={feature.title}>
                                        <div className="v3-product-feature-top">
                                            <span>{feature.number}</span>
                                            <div className="v3-product-feature-icon"><Icon size={18} /></div>
                                        </div>
                                        <span className="v3-label">SMARTBILL</span>
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                        <span className="v3-corner-action"><ArrowUpRight size={13} /></span>
                                        <div className="v3-product-feature-line" />
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="v3-section v3-product-portfolio" id="product-portfolio">
                    <div className="v3-container">
                        <div className="v3-heading">
                            <div>
                                <span className="v3-label">OUR PRODUCTS</span>
                                <h2>Simple software for<br />real business needs.</h2>
                            </div>
                            <p>
                                Practical products for billing, retail, jewellery, textile and hospitality businesses.
                            </p>
                        </div>

                        <div className="r2-product-grid r2-product-grid-five">
                            <article className="r2-product-card r2-product-primary">
                                <div className="r2-product-top"><span>01</span><b>AVAILABLE</b></div>
                                <div className="r2-product-icon"><ShoppingCart size={24} /></div>
                                <h3>SmartBill</h3>
                                <p>Simple billing, POS, inventory and business management.</p>
                                <div className="r2-product-tags"><span>Billing</span><span>POS</span><span>Inventory</span></div>
                                <button onClick={() => scrollTo('contact')}>Request a Demo <ArrowRight size={16} /></button>
                            </article>

                            <article className="r2-product-card">
                                <div className="r2-product-top"><span>02</span><b className="coming">COMING SOON</b></div>
                                <div className="r2-product-icon gold"><Sparkles size={24} /></div>
                                <h3>Jewell360</h3>
                                <p>Jewellery billing, stock and business management.</p>
                                <div className="r2-product-tags"><span>Jewellery</span><span>Billing</span><span>Stock</span></div>
                                <button onClick={() => scrollTo('contact')}>Know More <ArrowRight size={16} /></button>
                            </article>

                            <article className="r2-product-card">
                                <div className="r2-product-top"><span>03</span><b className="coming">COMING SOON</b></div>
                                <div className="r2-product-icon violet"><Package size={24} /></div>
                                <h3>Textile360</h3>
                                <p>Textile and garment business management.</p>
                                <div className="r2-product-tags"><span>Textile</span><span>Sales</span><span>Stock</span></div>
                                <button onClick={() => scrollTo('contact')}>Know More <ArrowRight size={16} /></button>
                            </article>

                            <article className="r2-product-card">
                                <div className="r2-product-top"><span>04</span><b className="coming">COMING SOON</b></div>
                                <div className="r2-product-icon hospitality"><Coffee size={24} /></div>
                                <h3>Resto/Hotel360</h3>
                                <p>Restaurant and hotel billing and business management.</p>
                                <div className="r2-product-tags"><span>Restaurant</span><span>Hotel</span><span>Billing</span></div>
                                <button onClick={() => scrollTo('contact')}>Know More <ArrowRight size={16} /></button>
                            </article>

                            <article className="r2-product-card">
                                <div className="r2-product-top"><span>05</span><b className="coming">COMING SOON</b></div>
                                <div className="r2-product-icon lodge"><Store size={24} /></div>
                                <h3>Lodge360</h3>
                                <p>Simple lodge, room and guest management.</p>
                                <div className="r2-product-tags"><span>Rooms</span><span>Guests</span><span>Bookings</span></div>
                                <button onClick={() => scrollTo('contact')}>Know More <ArrowRight size={16} /></button>
                            </article>
                        </div>
                    </div>
                </section>

                <section id="services" className="v3-dark-section v3-services-section">
                    <div className="v3-container v3-dark-grid">
                        <div className="v3-dark-copy">
                            <span className="v3-label light">OUR SERVICES</span>
                            <h2>Simple services<br />for your business.</h2>
                            <p>
                                From websites and applications to mobile apps and ongoing support.
                            </p>
                            <button className="v3-btn v3-btn-light" onClick={() => scrollTo('contact')}>
                                Start a Conversation <ArrowRight size={17} />
                            </button>
                        </div>

                        <div className="v3-service-list">
                            {serviceContent.map(item => {
                                const Icon = item.icon
                                return (
                                    <article className="v3-service-row" key={item.title}>
                                        <span>{item.number}</span>
                                        <div className="v3-row-icon"><Icon size={19} /></div>
                                        <div>
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                        <ChevronRight size={18} />
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section id="clients" className="v3-client-section">
                    <div className="v3-container">
                        <div className="v3-client-heading">
                            <div>
                                <span className="v3-label">OUR CLIENTS</span>
                                <h2>Businesses we build with.</h2>
                            </div>
                            <p>
                                Businesses we have worked with across different industries.
                            </p>
                        </div>
                    </div>

                    <div className="v3-client-marquee" aria-label="R2 Tech clients">
                        <div className="v3-client-track">
                            {[0, 1].map((group) => (
                                <div className="v3-client-group" key={`client-group-${group}`}>
                                    {clientContent.map((client, index) => (
                                        <article className={`v3-client-card client-${index + 1}`} key={`${group}-${client.name}`}>
                                            <span className="v3-client-number">0{index + 1}</span>
                                            <div className="v3-client-mark"><client.icon size={19} strokeWidth={1.9} aria-hidden="true" /></div>
                                            <div>
                                                <span>{client.meta}</span>
                                                <h3>{client.name}</h3>
                                            </div>
                                            <ArrowUpRight size={17} />
                                        </article>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="v3-industries">
                    <div className="v3-container">
                        <div className="v3-heading dark-heading">
                            <div>
                                <span className="v3-label light">BUSINESS CONTEXT</span>
                                <h2>Technology that adapts<br />to different businesses.</h2>
                            </div>
                            <p>
                                Retail, hospitality, services and growing businesses can
                                benefit from solutions shaped around their own workflow.
                            </p>
                        </div>

                        <div className="v3-industry-grid">
                            {[
                                { name: 'Retail', icon: Store },
                                { name: 'Cafés & Restaurants', icon: Coffee },
                                { name: 'Supermarkets', icon: ShoppingCart },
                                { name: 'Distributors', icon: Boxes },
                                { name: 'Service Businesses', icon: BriefcaseBusiness },
                                { name: 'Growing Businesses', icon: TrendingUp }
                            ].map(({ name, icon: Icon }, i) => (
                                <div key={name}>
                                    <span className="v3-industry-number">0{i + 1}</span>
                                    <span className="v3-industry-icon"><Icon size={20} strokeWidth={1.8} /></span>
                                    <strong>{name}</strong>
                                    <ArrowRight className="v3-industry-arrow" size={16} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="about" className="v3-section v3-about">
                    <div className="v3-container v3-about-grid">
                        <div className="v3-about-image">
                            <img src={company.aboutImage} alt="Our digital solutions" />
                            <div className="v3-image-badge">
                                <Rocket size={17} />
                                <span><strong>Build.</strong> Improve. Support.</span>
                            </div>
                        </div>

                        <div className="v3-about-copy">
                            <span className="v3-label">ABOUT OUR APPROACH</span>
                            <h2>Good technology should make business easier.</h2>
                            <p>
                                We begin with the requirement, not the software. That means
                                understanding your process, designing the right experience,
                                building the solution and staying available when it needs support.
                            </p>

                            <div className="v3-principles">
                                {(company.reasons || []).slice(0, 4).map((reason, index) => (
                                    <div key={reason.title}>
                                        <span>0{index + 1}</span>
                                        <CheckCircle2 size={17} />
                                        <div>
                                            <strong>{reason.title}</strong>
                                            <p>{reason.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="v3-contact">
                    <div className="v3-contact-orbit orbit-one" />
                    <div className="v3-contact-orbit orbit-two" />

                    <div className="v3-container v3-contact-card">
                        <div className="v3-contact-copy">
                            <div className="v3-contact-kicker">
                                <span className="v3-pulse" />
                                PROJECT STUDIO · OPEN FOR NEW WORK
                            </div>

                            <span className="v3-project-label"><i aria-hidden="true" /> START A PROJECT <b>↗</b></span>
                            <h2>Have a requirement?<br /><span>Let's build it.</span></h2>
                            <p>
                                Tell us what you need — website, software, mobile app or support.
                            </p>

                            <div className="v3-contact-details">
                                <a className="v3-contact-detail" href={`tel:${company.phone}`}>
                                    <span className="v3-contact-detail-icon"><Phone size={17} /></span>
                                    <span><small>CALL US</small><strong>{company.phone}</strong></span>
                                    <ArrowRight size={15} />
                                </a>
                                <a className="v3-contact-detail" href={`tel:${company.secondaryPhone}`}>
                                    <span className="v3-contact-detail-icon"><Phone size={17} /></span>
                                    <span><small>CALL US</small><strong>{company.secondaryPhone}</strong></span>
                                    <ArrowRight size={15} />
                                </a>
                                <a className="v3-contact-detail" href={`mailto:${company.email}`}>
                                    <span className="v3-contact-detail-icon"><Mail size={17} /></span>
                                    <span><small>EMAIL</small><strong>{company.email}</strong></span>
                                    <ArrowRight size={15} />
                                </a>
                                <a className="v3-contact-detail" href={whatsappUrl} target="_blank" rel="noreferrer">
                                    <span className="v3-contact-detail-icon v3-whatsapp-icon"><MessageCircle size={17} /></span>
                                    <span><small>WHATSAPP</small><strong>Chat with us</strong></span>
                                    <ArrowRight size={15} />
                                </a>
                            </div>

                            <div className="v3-contact-address">
                                <span className="v3-contact-address-pin">⌖</span>
                                <div>
                                    <small>OFFICE ADDRESS</small>
                                    <strong>
                                        {companyAddress.split('\n').map((line, index) => (
                                            <span key={index}>
        {line}
                                                <br />
      </span>
                                        ))}
                                    </strong>
                                </div>
                            </div>

                            <div className="v3-contact-trust">
                                <span><CheckCircle2 size={14} /> Clear requirements</span>
                                <span><CheckCircle2 size={14} /> Practical delivery</span>
                                <span><CheckCircle2 size={14} /> Ongoing support</span>
                            </div>
                        </div>

                        <form
                            className="v3-form"
                            onSubmit={event => {
                                event.preventDefault()
                                alert('Thank you. Connect this form to your backend or email service.')
                            }}
                        >
                            <div className="v3-form-title">
                                <span>PROJECT ENQUIRY</span>
                                <strong>Let's discuss your requirement.</strong>
                                <small>Usually the first step is simply understanding what you need.</small>
                            </div>

                            <div className="v3-form-row">
                                <label><span>Your name</span><input required placeholder="Your name" /></label>
                                <label><span>Email address</span><input required type="email" placeholder="name@company.com" /></label>
                            </div>

                            <div className="v3-form-row">
                                <label><span>Phone number</span><input placeholder="+91 ..." /></label>
                                <label><span>Company / business</span><input placeholder="Business name" /></label>
                            </div>

                            <label className="v3-form-full">
                                <span>What do you need?</span>
                                <select defaultValue="">
                                    <option value="" disabled>Select a service</option>
                                    <option>SmartBill</option>
                                    <option>Jewell360</option>
                                    <option>Textile360</option>
                                    <option>Resto/Hotel360</option>
                                    <option>Lodge360</option>
                                    <option>Web Design & Development</option>
                                    <option>Custom Application Development</option>
                                    <option>Mobile App Development</option>
                                    <option>Support & Maintenance</option>
                                </select>
                            </label>

                            <label className="v3-form-full">
                                <span>Requirement</span>
                                <textarea required rows={5} placeholder="Briefly describe your requirement" />
                            </label>

                            <button className="v3-btn v3-btn-primary v3-form-submit" type="submit">
                                Send Project Enquiry <ArrowRight size={17} />
                            </button>

                            <div className="v3-form-foot">
                                <ShieldDot />
                                <span>Your enquiry stays focused on the project you want to build.</span>
                            </div>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="v3-footer">
                <div className="v3-container v3-footer-main">
                    <div>
                        <div className="v3-footer-brand">
                            <img src={company.logo} alt="" />
                            <strong>{company.shortName}</strong>
                        </div>
                        <p>
                            Digital products, websites, custom software and dependable
                            software support for modern businesses.
                        </p>
                    </div>

                    <div className="v3-footer-links">
                        <strong>Products</strong>
                        <button onClick={() => scrollTo('solutions')}>SmartBill</button>
                        <button onClick={() => scrollTo('solutions')}>Jewell360</button>
                        <button onClick={() => scrollTo('solutions')}>Textile360</button>
                        <button onClick={() => scrollTo('solutions')}>Resto/Hotel360</button>
                        <button onClick={() => scrollTo('solutions')}>Lodge360</button>
                    </div>

                    <div className="v3-footer-links">
                        <strong>Company</strong>
                        <button onClick={() => scrollTo('services')}>Services</button>
                        <button onClick={() => scrollTo('clients')}>Clients</button>
                        <button onClick={() => scrollTo('about')}>About</button>
                        <button onClick={() => scrollTo('contact')}>Contact</button>
                    </div>

                    <div className="v3-footer-links">
                        <strong>Contact</strong>
                        <a href={`tel:${company.phone}`}>{company.phone}</a>
                        <a href={`tel:${company.secondaryPhone}`}>{company.secondaryPhone}</a>
                        <a href={`mailto:${company.email}`}>{company.email}</a>
                    </div>
                </div>

                <div className="v3-container v3-footer-bottom">
                    <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
                    <span>Digital technology for better business.</span>
                </div>
            </footer>
        </div>
    )
}

function ShieldDot() {
    return (
        <span className="v3-shield-dot">
      <CheckCircle2 size={14} />
    </span>
    )
}