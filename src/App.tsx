import { useState } from 'react'

import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Factory,
  Mail,
  Menu,
  Phone,
  Quote,
  Truck,
  Users,
  X
} from 'lucide-react'

import { company } from './config/company'

const icons = {
  briefcase: BriefcaseBusiness,
  factory: Factory,
  truck: Truck,
  chart: BarChart3
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth'
      })

    setMenuOpen(false)
  }

  return (
    <div
      className="site"
      style={
        {
          '--primary': company.theme.primary,
          '--dark': company.theme.dark,
          '--accent': company.theme.accent
        } as React.CSSProperties
      }
    >
      {/* ========================================================
          HEADER
         ======================================================== */}

      <header className="header">
        <div className="container nav">

          <button
            className="brand"
            onClick={() => scrollTo('home')}
          >
            <img
              src={company.logo}
              alt={`${company.name} logo`}
            />

            <span>
              {company.shortName}
            </span>
          </button>


          <nav
            className={
              menuOpen
                ? 'nav-links open'
                : 'nav-links'
            }
          >

            {[
              'home:Home',
              'about:About',
              'services:Services',
              'clients:Clients',
              'products:Products',
              'contact:Contact'
            ].map((item) => {

              const [id, label] =
                item.split(':')

              return (
                <button
                  key={id}
                  onClick={() =>
                    scrollTo(id)
                  }
                >
                  {label}
                </button>
              )
            })}


            <button
              className="nav-cta"
              onClick={() =>
                scrollTo('contact')
              }
            >
              Get Quote

              <ArrowRight
                size={16}
              />
            </button>

          </nav>


          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen(
                (value) => !value
              )
            }
            aria-label="Toggle navigation"
          >
            {menuOpen
              ? <X />
              : <Menu />
            }
          </button>

        </div>
      </header>


      <main>

        {/* ========================================================
            HERO
           ======================================================== */}

        <section
          id="home"
          className="hero"
        >

          <div
            className="hero-image"
            style={{
              backgroundImage:
                `url(${company.heroImage})`
            }}
          />

          <div className="hero-overlay" />


          <div className="container hero-content">

            <span className="eyebrow">
              {company.tagline}
            </span>


            <h1>
              {company.heroTitle}
            </h1>


            <p>
              {company.heroText}
            </p>


            <div className="hero-actions">

              <button
                className="button primary"
                onClick={() =>
                  scrollTo('contact')
                }
              >
                Talk to Us

                <ArrowRight
                  size={18}
                />
              </button>


              <button
                className="button light"
                onClick={() =>
                  scrollTo('services')
                }
              >
                Explore Services
              </button>

            </div>

          </div>

        </section>


        {/* ========================================================
            ABOUT
           ======================================================== */}

        <section
          id="about"
          className="section"
        >

          <div className="container split">

            <div className="section-copy">

              <span className="section-label">
                ABOUT US
              </span>


              <h2>
                {company.aboutTitle}
              </h2>


              <p>
                {company.aboutText}
              </p>


              <div className="check-list">

                {company.reasons
                  .slice(0, 3)
                  .map((reason) => (

                    <div
                      key={reason.title}
                    >

                      <CheckCircle2
                        size={20}
                      />

                      <span>
                        {reason.title}
                      </span>

                    </div>

                  ))}

              </div>


              <button
                className="text-button"
                onClick={() =>
                  scrollTo('contact')
                }
              >
                Learn more

                <ArrowRight
                  size={17}
                />
              </button>

            </div>


            <div className="image-card">

              <img
                src={company.aboutImage}
                alt="About the company"
              />

            </div>

          </div>

        </section>


        {/* ========================================================
            SERVICES
           ======================================================== */}

        <section
          id="services"
          className="section soft"
        >

          <div className="container">

            <SectionHeading
              label="OUR SERVICES"
              title="Solutions built around your needs"
              text="Professional services designed to create practical business value."
            />


            <div className="card-grid four">

              {company.services.map(
                (service) => {

                  const Icon =
                      icons[
                          service.icon as keyof typeof icons
                          ] || BriefcaseBusiness


                  return (
                    <article
                      className="service-card"
                      key={service.title}
                    >

                      <div className="icon-box">

                        <Icon
                          size={24}
                        />

                      </div>


                      <h3>
                        {service.title}
                      </h3>


                      <p>
                        {service.description}
                      </p>


                      <button
                        onClick={() =>
                          scrollTo('contact')
                        }
                      >
                        Learn more

                        <ArrowRight
                          size={16}
                        />
                      </button>

                    </article>
                  )
                }
              )}

            </div>

          </div>

        </section>


        {/* ========================================================
            CLIENTS
           ======================================================== */}

        <section
          id="clients"
          className="section"
        >

          <div className="container">

            <SectionHeading
              label="OUR CLIENTS"
              title="Trusted by businesses"
              text="We are proud to work with businesses across different industries."
            />


            <div className="client-grid">

              {company.clients.map(
                (client) => (

                  <div
                    className="client-logo"
                    key={client.name}
                  >

                    {client.logo ? (

                      <img
                        src={client.logo}
                        alt={client.name}
                      />

                    ) : (

                      <>
                        <Users
                          size={24}
                        />

                        <span>
                          {client.name}
                        </span>
                      </>

                    )}

                  </div>

                )
              )}

            </div>

          </div>

        </section>


        {/* ========================================================
            STATS
           ======================================================== */}

        <section className="stats-section">

          <div className="container stats-grid">

            {company.stats.map(
              (stat) => (

                <div
                  className="stat"
                  key={stat.label}
                >

                  <strong>
                    {stat.value}
                  </strong>

                  <span>
                    {stat.label}
                  </span>

                </div>

              )
            )}

          </div>

        </section>


        {/* ========================================================
            PRODUCTS
           ======================================================== */}

        <section
          id="products"
          className="section"
        >

          <div className="container">

            <SectionHeading
              label="PRODUCTS & SOLUTIONS"
              title="What we offer"
              text="Explore our core products and solutions."
            />


            <div className="product-grid">

              {company.products.map(
                (product) => (

                  <article
                    className="product-card"
                    key={product.name}
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                    />


                    <div>

                      <h3>
                        {product.name}
                      </h3>


                      <p>
                        {product.description}
                      </p>


                      <button
                        onClick={() =>
                          scrollTo('contact')
                        }
                      >
                        Enquire now

                        <ArrowRight
                          size={16}
                        />
                      </button>

                    </div>

                  </article>

                )
              )}

            </div>

          </div>

        </section>


        {/* ========================================================
            WHY CHOOSE US
           ======================================================== */}

        <section className="section soft">

          <div className="container">

            <SectionHeading
              label="WHY CHOOSE US"
              title="A partner you can depend on"
              text="Our approach is simple: understand, deliver and support."
            />


            <div className="reason-grid">

              {company.reasons.map(
                (reason) => (

                  <article
                    key={reason.title}
                  >

                    <CheckCircle2
                      size={22}
                    />


                    <div>

                      <h3>
                        {reason.title}
                      </h3>


                      <p>
                        {reason.description}
                      </p>

                    </div>

                  </article>

                )
              )}

            </div>

          </div>

        </section>


        {/* ========================================================
            TESTIMONIALS
           ======================================================== */}

        <section className="section">

          <div className="container">

            <SectionHeading
              label="TESTIMONIALS"
              title="What our clients say"
              text="Real relationships are built on consistent results."
            />


            <div className="testimonial-grid">

              {company.testimonials.map(
                (testimonial) => (

                  <article
                    className="testimonial"
                    key={
                      testimonial.name +
                      testimonial.role
                    }
                  >

                    <Quote
                      size={28}
                    />


                    <p>
                      “
                      {testimonial.quote}
                      ”
                    </p>


                    <strong>
                      {testimonial.name}
                    </strong>


                    <span>
                      {testimonial.role}
                    </span>

                  </article>

                )
              )}

            </div>

          </div>

        </section>


        {/* ========================================================
            CONTACT
           ======================================================== */}

        <section
          id="contact"
          className="contact-section"
        >

          <div className="container contact-grid">

            <div>

              <span className="section-label">
                CONTACT US
              </span>


              <h2>
                Let's discuss your requirements.
              </h2>


              <p>
                Tell us what you need and our team
                will get back to you.
              </p>


              <div className="contact-details">

                <div>

                  <Phone
                    size={19}
                  />

                  <span>
                    {company.phone}
                  </span>

                </div>


                <div>

                  <Mail
                    size={19}
                  />

                  <span>
                    {company.email}
                  </span>

                </div>

              </div>

            </div>


            <form
              className="contact-form"
              onSubmit={(event) => {

                event.preventDefault()

                alert(
                  'Thank you. Connect this form to your backend or email service.'
                )

              }}
            >

              <div className="form-row">

                <input
                  required
                  placeholder="Your name"
                />

                <input
                  required
                  type="email"
                  placeholder="Email address"
                />

              </div>


              <div className="form-row">

                <input
                  placeholder="Phone number"
                />

                <input
                  placeholder="Company name"
                />

              </div>


              <textarea
                required
                placeholder="Tell us about your requirement"
                rows={5}
              />


              <button
                className="button primary"
                type="submit"
              >
                Send Enquiry

                <ArrowRight
                  size={18}
                />

              </button>

            </form>

          </div>

        </section>

      </main>


      {/* ========================================================
          FOOTER
         ======================================================== */}

      <footer className="footer">

        <div className="container footer-grid">

          <div>

            <div className="footer-brand">
              {company.shortName}
            </div>

            <p>
              {company.tagline}
            </p>

          </div>


          <div>

            <h4>
              Company
            </h4>

            <button
              onClick={() =>
                scrollTo('about')
              }
            >
              About
            </button>

            <button
              onClick={() =>
                scrollTo('services')
              }
            >
              Services
            </button>

            <button
              onClick={() =>
                scrollTo('clients')
              }
            >
              Clients
            </button>

          </div>


          <div>

            <h4>
              Contact
            </h4>

            <span>
              {company.address}
            </span>

            <span>
              {company.email}
            </span>

            <span>
              {company.phone}
            </span>

          </div>

        </div>


        <div className="container copyright">

          © {new Date().getFullYear()}{' '}
          {company.name}.
          {' '}
          All rights reserved.

        </div>

      </footer>

    </div>
  )
}


/* ============================================================
   SECTION HEADING
   ============================================================ */

function SectionHeading({
  label,
  title,
  text
}: {
  label: string
  title: string
  text: string
}) {
  return (
    <div className="section-heading">

      <span className="section-label">
        {label}
      </span>

      <h2>
        {title}
      </h2>

      <p>
        {text}
      </p>

    </div>
  )
}