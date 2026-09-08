export type CompanyConfig = {
  name: string
  shortName: string
  tagline: string
  heroTitle: string
  heroText: string

  aboutTitle: string
  aboutText: string

  logo: string
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
  name: 'RR Tech Solutions',

  shortName: 'RR Tech Solutions',

  tagline: 'Quality Products. Trusted Service.',

  heroTitle:
    'Building better solutions for modern businesses.',

  heroText:
    'We deliver dependable products and professional services designed to help businesses grow with confidence.',

  aboutTitle:
    'A trusted partner for your business',

  aboutText:
    'ABC Industries is a professional business focused on quality, reliability and long-term customer relationships. Replace this content with your company story, experience and values.',

  logo:
    '/images/logo-placeholder.svg',

  heroImage:
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85',

  aboutImage:
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85',

  phone:
    '+91 98765 43210',

  email:
    'info@example.com',

  address:
    'Chennai, Tamil Nadu, India',

  services: [
    {
      title: 'Professional Services',
      description:
        'Reliable solutions delivered by an experienced team.',
      icon: 'briefcase'
    },

    {
      title: 'Quality & Manufacturing',
      description:
        'Consistent quality with practical, efficient processes.',
      icon: 'factory'
    },

    {
      title: 'Distribution',
      description:
        'Dependable supply and distribution for your business needs.',
      icon: 'truck'
    },

    {
      title: 'Business Consulting',
      description:
        'Clear guidance to improve operations and business performance.',
      icon: 'chart'
    }
  ],

  clients: [
    {
      name: 'Client One'
    },

    {
      name: 'Client Two'
    },

    {
      name: 'Client Three'
    },

    {
      name: 'Client Four'
    },

    {
      name: 'Client Five'
    },

    {
      name: 'Client Six'
    },

    {
      name: 'Client Seven'
    },

    {
      name: 'Client Eight'
    }
  ],

  products: [
    {
      name: 'Solution One',

      description:
        'A dependable solution for everyday business requirements.',

      image:
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=900&q=80'
    },

    {
      name: 'Solution Two',

      description:
        'Designed for performance, consistency and ease of use.',

      image:
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80'
    },

    {
      name: 'Solution Three',

      description:
        'Practical products that help your business operate better.',

      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80'
    }
  ],

  stats: [
    {
      value: '10+',
      label: 'Years Experience'
    },

    {
      value: '500+',
      label: 'Happy Clients'
    },

    {
      value: '1,000+',
      label: 'Projects Delivered'
    },

    {
      value: '20+',
      label: 'Team Members'
    }
  ],

  reasons: [
    {
      title: 'Experienced Team',
      description:
        'Skilled professionals focused on delivering dependable results.'
    },

    {
      title: 'Quality First',
      description:
        'We maintain consistent standards across products and services.'
    },

    {
      title: 'Customer Focus',
      description:
        'We build lasting relationships through responsive support.'
    },

    {
      title: 'Reliable Delivery',
      description:
        'Clear processes and dependable execution from start to finish.'
    }
  ],

  testimonials: [
    {
      quote:
        'Professional team, excellent communication and dependable service.',
      name: 'Client Name',
      role: 'Business Owner'
    },

    {
      quote:
        'They understood our requirements quickly and delivered exactly what we needed.',
      name: 'Client Name',
      role: 'Operations Manager'
    }
  ],

  theme: {
    primary: '#2563eb',
    dark: '#0f172a',
    accent: '#f59e0b'
  }
}