export const defaultHomeSections = [
  { id: 'hero', label: 'Hero' },
  { id: 'features', label: 'Features' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'cta', label: 'CTA' },
  { id: 'footer', label: 'Footer' },
];

export const pageHierarchy = [
  {
    id: 'home',
    label: 'Home',
    children: ['about', 'services', 'blog', 'contact'],
    sections: defaultHomeSections, 
  },
  { id: 'about', label: 'About', parent: 'home' },
  {
    id: 'services',
    label: 'Services',
    parent: 'home',
    children: ['service1', 'service2'],
  },
  { id: 'service1', label: 'Service Detail 1', parent: 'services' },
  { id: 'service2', label: 'Service Detail 2', parent: 'services' },
  {
    id: 'blog',
    label: 'Blog',
    parent: 'home',
    children: ['blog1', 'blog2', 'author'],
  },
  { id: 'blog1', label: 'Blog Post 1', parent: 'blog' },
  { id: 'blog2', label: 'Blog Post 2', parent: 'blog' },
  { id: 'author', label: 'Author Page', parent: 'blog' },
  {
    id: 'contact',
    label: 'Contact',
    parent: 'home',
    children: ['location', 'support'],
  },
  { id: 'location', label: 'Location Info', parent: 'contact' },
  { id: 'support', label: 'Support Page', parent: 'contact' },
];