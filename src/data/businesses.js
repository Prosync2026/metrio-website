import metrioLogo from '../assets/logos/metrio-logo.png';
import alunanAsasLogo from '../assets/logos/alunan-asas-logo.png';
import myformLogo from '../assets/logos/myform-logo.png';
import prosyncLogo from '../assets/logos/prosync-logo.png';
import { asset } from '../utils/asset';

export const businesses = [
  {
    slug: 'property-development',
    name: 'Property Development',
    subsidiary: 'Metrio Development',
    logo: metrioLogo,
    logoClass: 'h-36 md:h-48',
    image: asset('/images/businesses/property-header.jpg'),
    tagline: 'Building Homes and Spaces That Last.',
    description:
      'We develop properties that enrich lives — not just addresses. From concept to completion, every project reflects our commitment to quality, trust and community.',
    whoWeAre:
      "Metrio Development is Metrio Group's property development arm, dedicated to creating residential and commercial spaces that stand the test of time.\n\nWe focus on more than construction — we focus on the lives that unfold inside every space we build. From concept to handover, every project reflects our commitment to quality, liveability and long-term value for the communities we serve.\n\nWe are not just developers. We are partners in building places people are proud to call home.",
    servicesLabel: 'Our Focus',
    services: [
      {
        title: 'Residential Development',
        desc: 'We design and deliver homes built around comfort, functionality and long-term value — created for the way people actually live.',
        image: asset('/images/projects/residency-cendana.jpg'),
      },
      {
        title: 'Commercial & Mixed-Use Development',
        desc: 'We develop integrated spaces that bring together living, working and lifestyle — designed to grow in value alongside the communities around them.',
        image: asset('/images/businesses/metrioplace-forescape.jpeg'),
      },
      {
        title: 'Project Planning & Quality Control',
        desc: "Every development is guided by rigorous planning and quality checkpoints, ensuring what's promised at launch is what's delivered at handover.",
        image: asset('/images/projects/forescape/sales-gallery-interior.jpg'),
      },
      {
        title: 'Community-Centred Design',
        desc: 'We design with the end user in mind — creating spaces that enrich daily life, not just fill a skyline.',
        image: asset('/images/taman-mengkuang-jaya.jpeg'),
      },
    ],
    /* Featured project — add more album images to `album` as they come in */
    featuredProject: {
      name: 'Forescape @ MetrioPlace',
      tagline: 'Your Green Haven In The Heart Of Progress',
      overview:
        'Forescape @ MetrioPlace is a low-density serviced apartment development at the gateway of Batu Kawan Industrial Park 3. Its dual-key layouts pair a main suite with a self-contained studio under one title — supporting multi-generational living, a home office, or rental income. Residents share nature-led facilities including an infinity pool, meditation deck and forest pavilions.',
      facts: [
        { label: 'Location', value: 'Batu Kawan, Penang' },
        { label: 'Development', value: '398 Dual-Key Serviced Apartments' },
        { label: 'Built-Up', value: '904 – 1,098 sq ft · 3 – 4 Bedrooms' },
        { label: 'Status', value: 'Selling Fast' },
      ],
      url: 'https://forescape.com.my',
      ctaLabel: 'Visit Forescape Website',
      album: [
      { src: asset('/images/projects/forescape/tower-dusk.jpg'), alt: 'The Forescape tower at dusk, seen from the approach road' },
      { src: asset('/images/projects/forescape/arrival-drop-off.jpg'), alt: 'Covered arrival drop-off and lobby entrance in the evening' },
      { src: asset('/images/projects/forescape/podium-facade.jpg'), alt: 'Illuminated podium facade and landscaped entrance at night' },
      { src: asset('/images/projects/forescape/courtyard-deck.jpg'), alt: 'Landscaped courtyard deck with mature tree, lounge seating and pool' },
      { src: asset('/images/projects/forescape/lobby-lounge.jpg'), alt: 'Double-height lobby lounge with timber fins and garden outlook' },
      { src: asset('/images/projects/forescape/show-unit-bedroom.jpg'), alt: 'Show unit main bedroom with full-height sheer curtains' },
      { src: asset('/images/projects/forescape/show-unit-dining.jpg'), alt: 'Show unit dining area and open kitchen' },
      { src: asset('/images/projects/forescape/show-unit-studio.jpg'), alt: 'Dual-key studio with fitted wardrobe and ensuite bathroom' },
      { src: asset('/images/projects/forescape/sales-gallery-interior.jpg'), alt: 'Metrio Group sales gallery interior with the Forescape scale model' },
      { src: asset('/images/projects/forescape/sales-gallery-exterior.jpg'), alt: 'Metrio Group sales gallery at Vorteks Business Park' },
      ],
    },
    advantagesImage: asset('/images/businesses/property-backdrop.jpg'),
    advantages: {
      title: 'The Case for Metrio Development',
      description:
        'Looking for a development partner who delivers on quality, not just promises? Metrio Development is ready to build what\'s next.',
      items: [
        { title: 'Quality You Can Walk Through', desc: 'Every unit reflects design and build standards verified at every stage, not just at handover.' },
        { title: 'Value That Grows With Time', desc: 'Thoughtful planning means our developments are built to hold and grow in value for owners.' },
        { title: 'Trusted From Groundbreaking to Handover', desc: 'Clients and partners work with one accountable team throughout the entire project lifecycle.' },
        { title: 'Communities, Not Just Buildings', desc: 'Our developments are designed around how people live, connect and grow together.' },
        { title: 'A Track Record You Can Verify', desc: 'Every completed project stands as proof of what we deliver.' },
      ],
    },
    cta: {
      title: 'Get In Touch',
      text: 'Looking for a development partner who delivers on quality, not just promises? Metrio Development is ready to build what\'s next.',
    },
    seo: {
      title: 'Property Development Malaysia | Metrio Group',
      description:
        "Metrio Group delivers quality-driven property development across Northern and Central Malaysia, backed by Metrio Development's commitment to lasting value.",
    },
  },
  {
    slug: 'retail-management',
    name: 'Retail Management',
    subsidiary: 'MetrioPlace',
    image: asset('/images/businesses/retail-header.jpg'),
    tagline: 'Spaces That Bring Communities Together.',
    description:
      'We curate, lease and manage commercial spaces designed to thrive — not just open.',
    whoWeAre:
      "Metrio Group's retail management business curates, leases and manages commercial spaces designed to thrive — not just open.\n\nOur flagship, MetrioPlace in Batu Kawan, Penang, reflects our approach: spaces planned around footfall, tenant mix and long-term community engagement, not just square footage. We manage every retail asset with the same care from launch through to daily operations.\n\nWe don't just fill spaces with tenants — we build destinations people return to.",
    whoWeAreImage: asset('/images/businesses/metrioplace-forescape.jpeg'),
    whoWeAreCaption: 'MetrioPlace, Batu Kawan, Penang — Metrio Group\u2019s flagship retail destination.',
    servicesLabel: 'Our Focus',
    services: [
      {
        title: 'Retail Leasing & Tenant Mix',
        desc: 'We curate tenant mixes that balance variety, relevance and footfall — built to keep destinations active and growing.',
        image: asset('/images/mrdiy-metrioplace.png'),
      },
      {
        title: 'Asset & Facility Management',
        desc: 'We manage day-to-day operations, maintenance and tenant relations to keep every retail space running smoothly.',
        image: asset('/images/businesses/retail.png'),
      },
      {
        title: 'Marketing & Footfall Strategy',
        desc: 'We plan campaigns and events that bring communities into our spaces and keep them coming back.',
        image: asset('/images/projects/metrioplace.jpeg'),
      },
      {
        title: 'Commercial Destination Planning',
        desc: 'We design the retail experience from the ground up — anchoring each project around what makes a destination, not just a mall.',
        image: asset('/images/projects/forescape-metrioplace.jpg'),
      },
    ],
    advantagesImage: asset('/images/businesses/retail-backdrop.jpg'),
    advantages: {
      title: 'The Case for Our Retail Spaces',
      description:
        "Looking to lease, partner or visit MetrioPlace? Let's bring your business into a destination people already love.",
      items: [
        { title: 'A Destination, Not Just a Development', desc: 'MetrioPlace is planned around experience and community, not just floor space.' },
        { title: 'Curated for Relevance', desc: 'Tenant mix is chosen deliberately to serve the surrounding community.' },
        { title: 'Hands-On Management', desc: 'We manage our spaces directly, ensuring consistent quality for tenants and visitors alike.' },
        { title: 'Built for Long-Term Footfall', desc: 'Our marketing and events strategy keeps destinations active year-round.' },
        { title: "Anchored in Penang's Growth", desc: "MetrioPlace is positioned at the heart of Batu Kawan's expanding community." },
      ],
    },
    cta: {
      title: 'Enquire Now',
      text: "Looking to lease, partner or visit MetrioPlace? Let's bring your business into a destination people already love.",
    },
    seo: {
      title: 'Retail Management Malaysia | MetrioPlace | Metrio Group',
      description:
        "Metrio Group's retail management business curates and manages vibrant commercial destinations, anchored by MetrioPlace in Batu Kawan, Penang.",
    },
  },
  {
    slug: 'construction-engineering',
    name: 'Construction Engineering',
    subsidiary: 'Alunan Asas',
    logo: alunanAsasLogo,
    logoClass: 'h-28 md:h-36',
    image: asset('/images/businesses/construction-header.jpg'),
    tagline: 'Built on Precision. Delivered with Confidence.',
    description:
      'We deliver construction works with precision, speed and consistency — combining IBS technology and digital construction systems for stronger foundations.',
    whoWeAre:
      "Alunan Asas is Metrio Group's construction engineering arm, dedicated to delivering construction works with precision, speed and consistency.\n\nWe bring together Industrialised Building System (IBS) technology and digital construction systems to give every project a stronger foundation — both literally and operationally. This combination allows us to plan with greater accuracy, build with greater consistency, and deliver with greater confidence.\n\nWe are not defined by one method alone — we are defined by how well every project comes together.",
    servicesLabel: 'Our Focus',
    services: [
      {
        title: 'IBS Construction',
        desc: 'We apply Industrialised Building System methods to improve build quality, reduce on-site variability and accelerate project timelines.',
        image: asset('/images/businesses/construction.png'),
      },
      {
        title: 'Digitally Coordinated Delivery',
        desc: 'Our projects are planned and tracked through digital systems that connect design, site progress and quality control in one coordinated process.',
        image: asset('/images/businesses/bim-landscape.jpg'),
      },
      {
        title: 'Structural & Civil Works',
        desc: 'We deliver core structural and civil engineering works to the standards required for long-term safety and performance.',
        image: asset('/images/businesses/construction-backdrop.jpg'),
      },
      {
        title: 'Quality & Progress Monitoring',
        desc: 'Every stage of construction is monitored against clear benchmarks, giving clients confidence in both timeline and workmanship.',
        image: asset('/images/accountability.jpg'),
      },
    ],
    advantagesImage: asset('/images/businesses/construction-backdrop.jpg'),
    advantages: {
      title: 'The Case for Alunan Asas',
      description:
        'Need a construction partner that delivers precision at scale? Alunan Asas is ready to build it right.',
      items: [
        { title: 'Consistency by Design', desc: 'IBS methods reduce variability, so quality is built in, not inspected in afterward.' },
        { title: 'Faster, More Predictable Timelines', desc: 'Digitally coordinated planning keeps projects on schedule.' },
        { title: 'Built-In Accountability', desc: 'Every stage is tracked and verified, not assumed.' },
        { title: 'A Stronger Foundation, Every Time', desc: 'Our methods are chosen to deliver lasting structural integrity.' },
        { title: 'One Team, Full Coordination', desc: 'Design, site and progress are managed together, not in silos.' },
      ],
    },
    cta: {
      title: 'Ready to Build With Confidence?',
      text: 'Need a construction partner that delivers precision at scale? Alunan Asas is ready to build it right.',
    },
    seo: {
      title: 'Construction Engineering Malaysia | IBS & Digital Systems | Metrio Group',
      description:
        "Metrio Group's construction engineering business, carried by Alunan Asas, combines IBS technology and digital construction systems for faster, more reliable project delivery.",
    },
  },
  {
    slug: 'aluminium-formwork-system',
    name: 'Aluminium Formwork System',
    subsidiary: 'Myform',
    logo: myformLogo,
    logoClass: 'h-16 md:h-20',
    image: asset('/images/businesses/formwork-header.jpg'),
    tagline: 'Engineered for Speed. Built to Last.',
    description:
      'We supply and support reusable aluminium formwork systems that give contractors faster cycle times, consistent finishes and long-term reusability across multiple projects.',
    whoWeAre:
      "Myform is Metrio Group's aluminium formwork arm, dedicated to supplying and supporting reusable formwork systems for the construction industry.\n\nOur systems are engineered to give contractors faster cycle times, consistent finishes and long-term reusability across multiple projects. From design and fabrication through to on-site technical support, Myform is built to keep formwork from becoming a bottleneck.\n\nWe don't just supply formwork — we support the build, project after project.",
    servicesLabel: 'Our Focus',
    services: [
      {
        title: 'Formwork Design & Fabrication',
        desc: "We design and fabricate aluminium formwork systems tailored to each project's structural layout and timeline.",
        image: asset('/images/businesses/formwork.png'),
      },
      {
        title: 'System Supply & Rental',
        desc: 'We provide flexible supply and rental options, giving contractors access to quality formwork without the full capital outlay.',
        image: asset('/images/businesses/construction.png'),
      },
      {
        title: 'On-Site Technical Support',
        desc: 'Our team provides hands-on guidance during installation and use, helping contractors get the most out of every system.',
        image: asset('/images/businesses/formwork-backdrop.jpg'),
      },
      {
        title: 'Reuse & Lifecycle Management',
        desc: 'We help clients plan for formwork reuse across multiple projects, maximising value and minimising waste.',
        image: asset('/images/sustainability.jpg'),
      },
    ],
    advantagesImage: asset('/images/businesses/formwork-backdrop.jpg'),
    advantages: {
      title: 'The Case for Myform',
      description:
        'Ready to build faster without compromising on quality? Myform is ready to equip your next project.',
      items: [
        { title: 'Faster Build Cycles', desc: 'Aluminium systems are designed for quicker assembly and turnaround on site.' },
        { title: 'Consistent, Quality Finishes', desc: 'Precision-engineered systems mean fewer surface defects and less rework.' },
        { title: 'Built for Reuse', desc: 'Our formwork is designed to perform across multiple projects, extending its value.' },
        { title: 'Support Beyond Supply', desc: 'Our team stays involved on-site, not just at delivery.' },
        { title: 'A System That Scales With You', desc: 'From single projects to multi-phase developments, Myform adapts to your needs.' },
      ],
    },
    cta: {
      title: "Let's Talk Formwork",
      text: 'Ready to build faster without compromising on quality? Myform is ready to equip your next project.',
    },
    seo: {
      title: 'Aluminium Formwork System Malaysia | Myform | Metrio Group',
      description:
        "Metrio Group's aluminium formwork business, carried by Myform, supplies and supports reusable formwork systems built for speed, precision and durability.",
    },
  },
  {
    slug: 'digital-construction',
    name: 'Digital Construction Solution',
    subsidiary: 'Prosync',
    logo: prosyncLogo,
    logoClass: 'h-11 md:h-14',
    image: asset('/images/businesses/digital-header.jpg'),
    tagline: 'Where Construction Meets Intelligence.',
    description:
      'We bring together BIM capability and purpose-built digital systems to give developers and contractors full control over their projects — from design coordination through to on-site execution.',
    whoWeAre:
      "Prosync is Metrio Group's technology arm, dedicated to transforming how construction projects are managed and delivered.\n\nBeyond BIM, Prosync also designs and develops digital systems built specifically for application on the construction site — including defect management and time and progress tracking systems used directly by project teams.\n\nProsync brings together BIM capability and purpose-built digital systems to give developers and contractors full control over their projects — from design coordination through to on-site execution.\n\nIncreasingly, our systems are supported by AI — helping teams spot patterns, flag risks earlier and turn site data into clearer, faster decisions. AI works quietly in the background of what we build; it supports our systems, it doesn't replace our people.\n\nWe are not a software vendor. We are a construction technology partner — embedded in your project and committed to your outcomes.",
    servicesLabel: 'Our Services',
    services: [
      {
        title: 'BIM Modelling & Coordination',
        desc: 'We produce full 3D BIM models across architectural, structural and MEP disciplines — identifying and resolving clashes in the model before they become costly problems on site.',
        image: asset('/images/businesses/bim-landscape.jpg'),
      },
      {
        title: 'BIM Implementation',
        desc: 'We work alongside construction teams and developers to adopt BIM workflows, standards and processes — building the systems and culture needed for digital project delivery.',
        image: asset('/images/businesses/digital.png'),
      },
      {
        title: 'Construction Technology Consulting',
        desc: 'Our team provides strategic advisory for developers and contractors looking to digitise their operations, adopt new technologies and build long-term digital capability.',
        image: asset('/images/adaptability.jpg'),
      },
      {
        title: 'Digital Construction Systems',
        desc: 'We deliver purpose-built digital systems specialised for the construction industry — including defect management and time management systems, increasingly supported by AI to surface risks and progress insights in real time.',
        image: asset('/images/businesses/construction.png'),
      },
    ],
    advantagesImage: asset('/images/businesses/digital-backdrop.jpg'),
    advantages: {
      title: 'The Case for Smarter Building',
      description:
        "Construction remains one of the world's least digitised industries — and that gap is costing projects time, money and quality. Prosync is here to change that.",
      items: [
        { title: 'Fewer Clashes, Less Rework', desc: 'BIM coordination catches design conflicts before they become costly on-site problems.' },
        { title: 'Better Decisions, Faster', desc: 'AI-supported analytics surface risks and insights that would otherwise take weeks to identify manually, helping teams act sooner.' },
        { title: 'Full Project Visibility', desc: 'All stakeholders — owner, consultant, contractor — work from a single source of truth.' },
        { title: 'Smarter Asset Management', desc: 'Digital twins extend the value of BIM beyond construction into long-term operations.' },
        { title: 'Future-Ready Teams', desc: 'We build internal capability, not dependency. Our clients grow stronger with every project.' },
      ],
    },
    cta: {
      title: 'Build Smarter. Start Here.',
      text: 'If your next project deserves better coordination, clearer visibility and smarter delivery — Prosync is ready to show you what digital construction looks like in practice.',
    },
    seo: {
      title: 'Digital Construction Solution Malaysia | BIM & Digital Systems | Prosync | Metrio Group',
      description:
        "Metrio Group's digital construction business, led by Prosync, delivers BIM modelling, defect management and time tracking systems built for contractors and developers.",
    },
  },
];
  