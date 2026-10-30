export const leftLinks = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about-us',
  },
  {
    label: 'Our Businesses',
    href: '/#businesses',
    children: [
      { label: 'Property Development', href: '/businesses/property-development' },
      { label: 'Construction Engineering', href: '/businesses/construction-engineering' },
      { label: 'Retail Management', href: '/businesses/retail-management' },
      { label: 'Aluminium Formwork', href: '/businesses/aluminium-formwork-system' },
      { label: 'Digital Construction', href: '/businesses/digital-construction' },
    ],
  },
];

export const rightLinks = [
  {
    label: 'Projects',
    href: '/projects',
    children: [
      { label: 'Northern Region', href: '/projects?region=northern' },
      { label: 'Central Region', href: '/projects?region=central' },
      { label: 'View All Projects', href: '/projects' },
    ],
  },
  {
    label: 'Media & Achievements',
    href: '/awards-achievements',
    children: [
      { label: 'News', href: '/news' },
      { label: 'Achievements', href: '/awards-achievements' },
    ],
  },
  {
    label: 'Contact Us',
    href: '/contact-us',
    children: [
      { label: 'Contact Us', href: '/contact-us' },
      { label: 'Careers', href: '/careers' },
    ],
  },
];

export const allLinks = [...leftLinks, ...rightLinks];
