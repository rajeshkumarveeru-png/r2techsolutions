# BIZ360 Reusable React Business Website

A clean, professional and reusable business website template built with:

- React
- TypeScript
- Vite
- CSS
- Lucide React icons

## Run

```bash
npm install
npm run dev
````

Then open the URL shown by Vite.

## Production build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

# Reusing the website for another company

The most important file is:

```text
src/config/company.ts
```

The same website can be reused for different customers simply by changing the company configuration.

You can change:

* Company name
* Short name
* Logo
* Tagline
* Hero title
* Hero description
* About content
* Hero image
* About image
* Phone
* Email
* Address
* Services
* Clients
* Client logos
* Products
* Statistics
* Why choose us
* Testimonials
* Theme colors

## Client logos

Create:

```text
public/clients/
```

For example:

```text
public/clients/client-a.png
public/clients/client-b.png
public/clients/client-c.png
```

Then configure:

```ts
clients: [
  {
    name: 'Company A',
    logo: '/clients/client-a.png'
  },
  {
    name: 'Company B',
    logo: '/clients/client-b.png'
  }
]
```

## Company theme

Change:

```ts
theme: {
  primary: '#2563eb',
  dark: '#0f172a',
  accent: '#f59e0b'
}
```

The website automatically uses the configured primary and dark colors.

## Website sections

1. Header
2. Hero
3. About Us
4. Services
5. Clients
6. Business Statistics
7. Products & Solutions
8. Why Choose Us
9. Testimonials
10. Contact
11. Footer

## Contact form

The current contact form is frontend-only.

Before production, connect it to:

* Your Spring Boot backend
* Email service
* CRM
* Contact API
* WhatsApp integration

## Images

The sample website uses remote Unsplash images.

For a real customer website, replace them with the customer's own images.

## Recommended customer structure

For each customer, keep the same React application and create a different:

```text
src/config/company.ts
```

This allows the same design to be reused for:

* Manufacturing companies
* IT companies
* Traders
* Distributors
* Construction companies
* Agriculture businesses
* Consultants
* Service companies
* Small businesses
* Corporate websites

without rebuilding the complete frontend.
