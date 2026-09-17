export type CompanyConfig = {
  name: string
  shortName: string
  tagline: string
  heroTitle: string
  heroText: string
  aboutTitle: string
  aboutText: string
  logo: string
  logoPlain:string
  heroImage: string
  aboutImage: string
  phone: string
  email: string
  address: string

  services: {
    title: string
    description: string
    icon: string
  }[]

  clients: {
    name: string
    logo?: string
  }[]

  products: {
    name: string
    description: string
    image: string
  }[]

  stats: {
    value: string
    label: string
  }[]

  reasons: {
    title: string
    description: string
  }[]

  testimonials: {
    quote: string
    name: string
    role: string
  }[]

  theme: {
    primary: string
    dark: string
    accent: string
  }
}


export const company: CompanyConfig = {

  /* ============================================================
     BRAND
     ============================================================ */

  name: 'R2Tech Solutions',

  shortName: 'R2Tech Solutions',

  tagline:
    'Smart POS. Simple Billing. Better Business.',


  /* ============================================================
     HERO
     ============================================================ */

  heroTitle:
    'Powerful POS and billing software built for modern businesses.',

  heroText:
    'BIZ360 helps businesses manage billing, products, inventory, customers and sales from one simple platform. Create invoices faster, track stock accurately and understand your business with powerful reports.',


  /* ============================================================
     ABOUT
     ============================================================ */

  aboutTitle:
    'Everything you need to run your business in one place.',

  aboutText:
    'BIZ360 is a complete POS and business management platform designed for retail shops, supermarkets, wholesalers and growing businesses. From everyday billing to inventory control and sales insights, BIZ360 helps you manage your business with less manual work and better visibility.',


  /* ============================================================
     BRAND ASSETS
     ============================================================ */

  logo:
    '/images/r2.png',

  logoPlain:
      '/images/r2-plain.png',

  heroImage:
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=85',

  aboutImage:
    'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=85',


  /* ============================================================
     CONTACT
     ============================================================ */

  phone:
    '+91 97919 19500',

  email:
    'rtwotechsolutions@gmail.com',

  address:
    'Tamil Nadu, India',


  /* ============================================================
     CORE FEATURES / SERVICES
     ============================================================ */

  services: [

    {
      title:
        'Smart POS Billing',

      description:
        'Create invoices quickly with a simple POS screen designed for fast day-to-day billing.',

      icon:
        'briefcase'
    },


    {
      title:
        'Inventory Management',

      description:
        'Track stock levels, monitor product availability and keep your inventory under control.',

      icon:
        'factory'
    },


    {
      title:
        'Barcode Billing',

      description:
        'Scan products using a barcode scanner and add items to the bill quickly and accurately.',

      icon:
        'truck'
    },


    {
      title:
        'Sales & Business Reports',

      description:
        'Understand your business with sales insights, top-selling products and useful reports.',

      icon:
        'chart'
    }

  ],


  /* ============================================================
     BUSINESS TYPES / CLIENTS
     ============================================================ */

  clients: [

    {
      name:
        'Retail Shops'
    },

    {
      name:
        'Supermarkets'
    },

    {
      name:
        'Hardware Stores'
    },

    {
      name:
        'Electrical Shops'
    },

    {
      name:
        'Textile Stores'
    },

    {
      name:
        'Wholesale Businesses'
    },

    {
      name:
        'Grocery Stores'
    },

    {
      name:
        'Growing Businesses'
    }

  ],


  /* ============================================================
     PRODUCTS / SOLUTIONS
     ============================================================ */

  products: [

    {
      name:
        'BIZ360 POS',

      description:
        'A fast and easy point-of-sale system for everyday billing, payments and invoice management.',

      image:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80'
    },


    {
      name:
        'BIZ360 Inventory',

      description:
        'Manage products, stock quantities, product categories and inventory movements from one place.',

      image:
        'https://images.unsplash.com/photo-1586528116493-da8b3d7c0e9b?auto=format&fit=crop&w=900&q=80'
    },


    {
      name:
        'BIZ360 Business Dashboard',

      description:
        'Get a clear view of sales, products, customers and business performance through useful dashboards and reports.',

      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80'
    }

  ],


  /* ============================================================
     KEY HIGHLIGHTS
     ============================================================ */

  stats: [

    {
      value:
        'FAST',

      label:
        'POS Billing'
    },


    {
      value:
        'LIVE',

      label:
        'Stock Tracking'
    },


    {
      value:
        'BARCODE',

      label:
        'Ready'
    },


    {
      value:
        '24/7',

      label:
        'Business Access'
    }

  ],


  /* ============================================================
     WHY BIZ360
     ============================================================ */

  reasons: [

    {
      title:
        'Fast Billing',

      description:
        'Create bills quickly with a clean POS interface designed for busy business environments.'
    },


    {
      title:
        'Accurate Inventory',

      description:
        'Keep track of available stock and reduce mistakes caused by manual inventory management.'
    },


    {
      title:
        'Barcode Support',

      description:
        'Use barcode scanners to search and add products quickly during billing.'
    },


    {
      title:
        'Business Insights',

      description:
        'See sales performance, top-selling products and other useful business information.'
    },


    {
      title:
        'Customer Management',

      description:
        'Maintain customer information and connect customers with their sales and invoices.'
    },


    {
      title:
        'Built to Grow',

      description:
        'Start with billing and inventory today and expand into more business management capabilities as your business grows.'
    }

  ],


  /* ============================================================
     TESTIMONIALS
     ============================================================ */

  testimonials: [

    {
      quote:
        'BIZ360 makes our daily billing process much faster and gives us a better understanding of our sales.',

      name:
        'Retail Business Owner',

      role:
        'Retail Store'
    },


    {
      quote:
        'Managing products and stock is much easier when everything is available in one system.',

      name:
        'Business Owner',

      role:
        'Wholesale Business'
    }

  ],


  /* ============================================================
     THEME
     ============================================================ */

  theme: {

    primary:
      '#2563eb',

    dark:
      '#0f172a',

    accent:
      '#f59e0b'

  }

}