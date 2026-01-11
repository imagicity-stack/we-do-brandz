export interface SubService {
  id: string;
  name: string;
  slug: string;
  description: string;
  deliverables: string[];
  deliveryTimeline: string;
  priceLabel: string;
  priceInUSD: number;
  priceNote?: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  summary: string;
  subServices: SubService[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'branding-identity',
    name: 'Branding & Identity',
    slug: 'branding-identity',
    tagline: 'Crafting distinctive, scalable brand systems.',
    summary:
      'From fresh logo concepts to end-to-end brand kits, our team builds visual systems that your audience will remember.',
    subServices: [
      {
        id: 'logo-design',
        name: 'Logo Design',
        slug: 'logo-design',
        description: '2–3 unique logo concepts aligned to your brand personality with clean, scalable design ready for every touchpoint.',
        deliverables: [
          '2–3 unique concepts based on brand personality',
          'Clean, scalable, and professional design',
          'Includes final files for print & digital use'
        ],
        deliveryTimeline: 'Delivery: 3–5 days',
        priceLabel: '$36',
        priceInUSD: 36
      },
      {
        id: 'full-brand-kit',
        name: 'Full Brand Kit',
        slug: 'full-brand-kit',
        description: 'Complete visual identity system, from logo to typography and usage guidelines for consistent brand experiences.',
        deliverables: [
          'Logo + color palette + typography system',
          'Brand usage guide for consistency',
          'Includes business card & social media display design'
        ],
        deliveryTimeline: 'Delivery: 7–10 days',
        priceLabel: '$169',
        priceInUSD: 169
      },
      {
        id: 'rebranding',
        name: 'Rebranding',
        slug: 'rebranding',
        description: 'Refresh your brand with a modernized identity guided by new positioning, complete with rollout templates.',
        deliverables: [
          'Study existing brand visual weaknesses',
          'Modern, fresh visual identity based on new positioning',
          'Updated logo + brand guidelines + rollout templates'
        ],
        deliveryTimeline: 'Delivery: 10–14 days',
        priceLabel: '$193',
        priceInUSD: 193
      },
      {
        id: 'business-collateral-design',
        name: 'Business Collateral Design',
        slug: 'business-collateral-design',
        description: 'Professional collateral kit with visiting card, letterhead, envelope, and ID card in unified brand style.',
        deliverables: [
          'Visiting card, letterhead, envelope, ID card',
          'Print-ready and digital formats included',
          'Consistent look & feel across items'
        ],
        deliveryTimeline: 'Delivery: 2–4 days',
        priceLabel: '$11 per set',
        priceInUSD: 11,
        priceNote: 'Pricing reflects each collateral set.'
      }
    ]
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    tagline: 'Full-funnel growth marketing with intelligent automation.',
    summary:
      'Amplify your reach with performance-first campaigns, full funnel strategies, and data-driven optimization across channels.',
    subServices: [
      {
        id: 'meta-ads-setup',
        name: 'Meta Ads Setup (Facebook + Instagram)',
        slug: 'meta-ads-setup',
        description: 'Campaign setup tuned for leads or awareness with precise targeting, eye-catching creatives, and reporting foundation.',
        deliverables: [
          'Campaign setup for leads or awareness',
          'Custom audience targeting + Ad creatives',
          'Basic performance tracking & reporting'
        ],
        deliveryTimeline: 'Delivery: Setup in 2–3 days',
        priceLabel: '$72 (Ad spend extra)',
        priceInUSD: 72,
        priceNote: 'Ad spend billed separately.'
      },
      {
        id: 'google-ads-campaign',
        name: 'Google Ads Campaign',
        slug: 'google-ads-campaign',
        description: 'Conversion-ready search campaigns with keyword research, persuasive ad copy, and weekly insights.',
        deliverables: [
          'Keyword research & ad group structure',
          'Ad copywriting + extensions',
          'Weekly performance report'
        ],
        deliveryTimeline: 'Delivery: Setup in 2–4 days',
        priceLabel: '$72 (Ad spend extra)',
        priceInUSD: 72,
        priceNote: 'Ad spend billed separately.'
      },
      {
        id: 'social-media-management',
        name: 'Social Media Management',
        slug: 'social-media-management',
        description: 'Monthly social media partnership covering content creation, publishing, engagement, and growth analytics.',
        deliverables: [
          'Content creation + posting 12–20 posts/month',
          'Page management + responding to engagement',
          'Monthly growth and strategy tracking'
        ],
        deliveryTimeline: 'Delivery: Monthly Ongoing',
        priceLabel: '$157/month (depends on volume)',
        priceInUSD: 157,
        priceNote: 'Pricing may vary based on volume requirements.'
      },
      {
        id: 'social-media-strategy',
        name: 'Social Media Marketing Strategy',
        slug: 'social-media-strategy',
        description: 'Strategic monthly roadmap with content calendar, brand tone, creative direction, and competitor insights.',
        deliverables: [
          'Monthly content calendar & campaign plan',
          'Brand tone, messaging, and creative direction',
          'Competitor & trend analysis'
        ],
        deliveryTimeline: 'Delivery: 5–7 days',
        priceLabel: '$120',
        priceInUSD: 120
      },
      {
        id: 'digital-marketing-bundle',
        name: 'Complete Digital Marketing Bundle',
        slug: 'complete-digital-marketing-bundle',
        description: 'Comprehensive always-on marketing bundle combining paid ads, social management, analytics, and optimization.',
        deliverables: [
          'Meta ads + Google ads + Social media management',
          'Monthly content plan + analytics dashboard',
          'Ongoing optimization & weekly review'
        ],
        deliveryTimeline: 'Delivery: Monthly Ongoing',
        priceLabel: '$349/month (Ads Spend Extra)',
        priceInUSD: 349,
        priceNote: 'Ad spend not included in the fee.'
      }
    ]
  },
  {
    id: 'website-development',
    name: 'Website Development',
    slug: 'website-development',
    tagline: 'High-converting, responsive websites engineered for growth.',
    summary:
      'Ship digital experiences that load fast, look polished on every device, and convert visitors into customers.',
    subServices: [
      {
        id: 'basic-business-website',
        name: 'Basic Business Website',
        slug: 'basic-business-website',
        description: 'Professional presence with essential pages, responsive design, and direct contact integrations.',
        deliverables: [
          'Home, About, Services, Contact pages',
          'Mobile responsive + professional UI',
          'WhatsApp & call integration'
        ],
        deliveryTimeline: 'Delivery: 5–10 days',
        priceLabel: '$181',
        priceInUSD: 181
      },
      {
        id: 'ecommerce-website',
        name: 'E-Commerce Website',
        slug: 'ecommerce-website',
        description: 'End-to-end store setup with catalog, cart, secure payments, and operations dashboard.',
        deliverables: [
          'Product catalog + cart + online payment',
          'Admin panel for order & stock management',
          'Customer-friendly UI + training to operate'
        ],
        deliveryTimeline: 'Delivery: 15 days',
        priceLabel: '$241 (platform varies)',
        priceInUSD: 241,
        priceNote: 'Platform choice may impact pricing.'
      },
      {
        id: 'website-mobile-app-package',
        name: 'Website + Mobile App Package',
        slug: 'website-mobile-app-package',
        description: 'Unified web and mobile experience with synchronized content management and native-feel app UI.',
        deliverables: [
          'Website synced with Android/iOS app',
          'Single dashboard for product/content updates',
          'App designed with brand identity UI'
        ],
        deliveryTimeline: 'Delivery: 30–35 days',
        priceLabel: '$711',
        priceInUSD: 711,
        priceNote: 'Integrations may adjust final pricing.'
      },
      {
        id: 'landing-page',
        name: 'Landing Page (Sales / Lead Campaign Page)',
        slug: 'landing-page',
        description: 'Conversion-optimized landing page engineered for paid campaigns and lead capture.',
        deliverables: [
          '1-page high conversion structure',
          'Clear call-to-action + lead capture + tracking',
          'Optimized for ads'
        ],
        deliveryTimeline: 'Delivery: 3 days',
        priceLabel: '$72',
        priceInUSD: 72
      }
    ]
  },
  {
    id: 'content-video',
    name: 'Content & Video Creation',
    slug: 'content-video',
    tagline: 'Scroll-stopping content that translates ideas into impact.',
    summary:
      'Bring your stories to life with motion, live-action, and trend-native edits tailored for modern platforms.',
    subServices: [
      {
        id: 'motion-graphics-ad',
        name: 'VFX / Motion Graphics Ad',
        slug: 'motion-graphics-ad',
        description: 'Animated explainer ad with sleek transitions, brand-aligned visuals, and strong call-to-action.',
        deliverables: [
          'Script-based animated/ad explainer',
          'Clean motion design and smooth transitions',
          'Brand color, fonts, and logo integration'
        ],
        deliveryTimeline: 'Delivery: 3 days',
        priceLabel: '$36 (per 10s video)',
        priceInUSD: 36,
        priceNote: 'Pricing for a 10 second ad spot.'
      },
      {
        id: 'face-cam-video',
        name: 'Face-Cam Video Content',
        slug: 'face-cam-video',
        description: 'Remote-guided founder or brand personality videos with scripts, edits, and branded overlays.',
        deliverables: [
          'Script writing + direction (remote)',
          'Professional edits + subtitles + branding',
          'Suitable for reels/ads/YouTube shorts'
        ],
        deliveryTimeline: 'Delivery: 3–4 days per video',
        priceLabel: '$48',
        priceInUSD: 48
      },
      {
        id: 'reels-editing',
        name: 'Reels & Short-Form Video Editing',
        slug: 'reels-editing',
        description: 'Trend-aware edits with transitions, captions, and music for fast growth on Instagram and Facebook.',
        deliverables: [
          'Cut, sync, transitions, captions, music',
          'Trend-based formats + engaging pacing',
          'Perfect for Instagram / Facebook growth'
        ],
        deliveryTimeline: 'Delivery: 2 days per video',
        priceLabel: '$10 per reel (+$5 for VFX)',
        priceInUSD: 10,
        priceNote: 'Add $5 for VFX-enhanced edits.'
      }
    ]
  }
];

export const findSubService = (serviceSlug: string, subServiceSlug: string) => {
  for (const category of serviceCategories) {
    if (category.slug === serviceSlug) {
      const subService = category.subServices.find((item) => item.slug === subServiceSlug);
      if (subService) {
        return { category, subService } as const;
      }
    }
  }
  return null;
};
