export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: 'How do I know which services are right for my brand?',
    answer:
      'Start with a discovery call. We diagnose your brand positioning, growth goals, and current performance to recommend a tailored mix of branding, digital marketing, and content services.'
  },
  {
    question: 'Can I combine multiple services into a custom package?',
    answer:
      'Absolutely. Our team often bundles brand identity, web development, and ongoing marketing retainers so you have one integrated squad. We can structure retainers or project-based engagements.'
  },
  {
    question: 'How does the Razorpay payment process work?',
    answer:
      'When you book a service, you will fill in your brand details. We create a secure Razorpay order and redirect you to complete payment. You will receive a confirmation receipt via email instantly.'
  },
  {
    question: 'Do you work with startups and established enterprises?',
    answer:
      'Yes. We partner with startups launching their first product to enterprise teams refreshing global campaigns. The engagement size adapts to your needs and resources.'
  },
  {
    question: 'What happens after I make a booking?',
    answer:
      'Once payment is confirmed, you receive an onboarding questionnaire and kickoff call invite within 24 hours. We then set up shared workspaces, finalize deliverable timelines, and get to work.'
  }
];
