import academicsIcon from '../assets/images/academic.svg';
import bicycleIcon from '../assets/images/bicycle.svg';
import clothesIcon from '../assets/images/clothes.svg';
import electronicsIcon from '../assets/images/gadgets.svg';
import toolsIcon from '../assets/images/tools.svg';
import miscIcon from '../assets/images/miscellaneous.svg';
import sportsIcon from '../assets/images/sports.svg';
import accIcon from '../assets/images/accessories.svg';
import eventsIcon from '../assets/images/events.svg';

export const CATEGORIES = [
  { id: 'academics', name: 'Academics', icon: academicsIcon, color: '#fff4bb' },
  { id: 'bicycle', name: 'Bicycle', icon: bicycleIcon, color: '#d8f0e3' },
  { id: 'clothes', name: 'Clothes', icon: clothesIcon, color: '#ffdde5' },
  { id: 'electronics', name: 'Electronics', icon: electronicsIcon, color: '#dcd2ff' },
  { id: 'tools', name: 'Tools', icon: toolsIcon, color: '#ddebff' },
  { id: 'sports', name: 'Sports', icon: sportsIcon, color: '#ffe5c2' },
  { id: 'accessories', name: 'Accessories', icon: accIcon, color: '#e8ddf8' },
  { id: 'events', name: 'Events', icon: eventsIcon, color: '#d9ecf5' },
  { id: 'miscellaneous', name: 'Miscellaneous', icon: miscIcon, color: '#f7e8b0' }
];

export const INITIAL_EQUIPMENT = [
  {
    id: 'eq-1',
    title: 'Sony Alpha A7 III Mirrorless Camera + 28-70mm Lens',
    category: 'electronics',
    pricePerDay: 150,
    deposit: 500,
    rating: 4.9,
    reviewCount: 28,
    status: 'available',
    condition: 'Excellent',
    listedDate: '24 August 2026',
    ownerId: 'u-101',
    ownerName: 'Arjun',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    ownerDepartment: 'Media & Design (Senior)',
    ownerListedCount: 5,
    location: 'North Campus Dormitory, Block B',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Perfect for campus film projects, photography club assignments, or weekend shoots. Comes with dual SD cards (64GB each), 2 batteries, and a protective carrying case.',
    features: ['4K Video Recording', '24.2 MP Full Frame', '2x 64GB Extreme SD Cards', 'Dual Battery Pack + Charger', 'Padded Shoulder Bag'],
    rules: ['Handle with clean hands', 'Keep away from rain/water', 'Return with charged batteries'],
    availableDates: 'Mon - Sun (9:00 AM - 8:00 PM)',
    tags: ['Camera', 'Photography', 'Media', '4K']
  },
  {
    id: 'eq-2',
    title: 'Trek FX 2 Disc Hybrid Commuter Bicycle',
    category: 'bicycle',
    pricePerDay: 80,
    deposit: 250,
    rating: 4.8,
    reviewCount: 42,
    status: 'available',
    condition: 'Excellent',
    listedDate: '22 August 2026',
    ownerId: 'u-102',
    ownerName: 'Chloe Henderson',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    ownerDepartment: 'Mechanical Engineering (3rd Year)',
    ownerListedCount: 3,
    location: 'East Gate Bike Shed #14',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Lightweight aluminum hybrid bike suited for cross-campus commuting and town errands. Includes a heavy-duty Kryptonite U-Lock and LED front/rear safety lights.',
    features: ['Hydraulic Disc Brakes', '24-Speed Shimano Gearing', 'U-Lock + Cable included', 'Front & Back Rechargeable Lights'],
    rules: ['Must lock bike to designated campus racks', 'Helmet strongly recommended', 'Notify if tire pressure gets low'],
    availableDates: 'Daily across the semester',
    tags: ['Bicycle', 'Commute', 'Eco-friendly', 'Sports']
  },
  {
    id: 'eq-3',
    title: 'Texas Instruments TI-Nspire CX II CAS Graphing Calculator',
    category: 'academics',
    pricePerDay: 4,
    deposit: 15,
    rating: 5.0,
    reviewCount: 31,
    status: 'available',
    ownerId: 'u-103',
    ownerName: 'Devon Vance',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    ownerDepartment: 'Applied Mathematics (Sophomore)',
    location: 'Science Library, Study Pod 3',
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Exam-ready CAS graphing calculator with rechargeable battery. Essential for Calculus III, Linear Algebra, and Engineering Physics midterms and finals.',
    features: ['Color Backlit Display', 'CAS Algebraic Engine', 'USB Charging Cable', 'Slide-on Hard Case'],
    rules: ['Do not scratch or stick decals on the screen', 'Return fully charged with cord'],
    availableDates: 'Immediate checkout available',
    tags: ['Calculator', 'Math', 'Engineering', 'Exams']
  },
  {
    id: 'eq-4',
    title: 'Bosch Professional 18V Cordless Drill & Driver Kit',
    category: 'tools',
    pricePerDay: 8,
    deposit: 25,
    rating: 4.7,
    reviewCount: 19,
    status: 'available',
    ownerId: 'u-104',
    ownerName: 'Marcus Sterling',
    ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    ownerDepartment: 'Civil & Architectural Engineering',
    location: 'Makerspace Locker #42, Workshop Hall',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Heavy duty drill & driver complete with 32-piece drill and screwdriver bit set, two lithium-ion batteries, charger, and safety goggles. Great for dorm builds and robotic chassis construction.',
    features: ['Brushless Motor', '2x 2.0Ah Batteries + Fast Charger', '32-piece Bits Set', 'Included Safety Glasses'],
    rules: ['Wear safety glasses while operating', 'Do not submerge or use in rain'],
    availableDates: 'Weekdays & Weekends',
    tags: ['Tools', 'Hardware', 'Makerspace', 'Robotics']
  },
  {
    id: 'eq-5',
    title: 'Anker Nebula Capsule Mini Smart Wi-Fi Projector',
    category: 'electronics',
    pricePerDay: 12,
    deposit: 35,
    rating: 4.9,
    reviewCount: 56,
    status: 'rented',
    ownerId: 'u-105',
    ownerName: 'Maya Lin',
    ownerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    ownerDepartment: 'Film Studies & Communication',
    location: 'West Student Center Lounge',
    images: [
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Soda-can sized pocket projector with 360-degree speaker and built-in Android OS (Netflix, YouTube, HDMI input). Transform any dorm room wall into a cinema screen.',
    features: ['100-inch Picture capability', '4-Hour Battery Life', 'HDMI & Screen Mirroring', 'Tripod included'],
    rules: ['Keep lens clean; use microfiber cloth only', 'Pack inside velvet pouch when not in use'],
    availableDates: 'Rented until tomorrow 2 PM',
    tags: ['Projector', 'Entertainment', 'Movie Night', 'Dorm']
  },
  {
    id: 'eq-6',
    title: 'Chemical-Resistant Unisex White Lab Coat (Size M & L)',
    category: 'clothes',
    pricePerDay: 3,
    deposit: 10,
    rating: 4.6,
    reviewCount: 14,
    status: 'available',
    ownerId: 'u-106',
    ownerName: 'Dr. Sarah Jenkins (TA)',
    ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    ownerDepartment: 'Biochemistry Department',
    location: 'Chemistry Annex, Lab 204',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Freshly laundered, high-grade 100% cotton lab coat meeting standard university biosafety levels. Available in Medium and Large. Free ANSI-approved splash goggles with every rental.',
    features: ['Knee-length Protection', 'Button-up Cuffs', 'Deep Pockets for Notebooks', 'Splash-proof Goggles included'],
    rules: ['Wash or spot clean if non-hazardous spills occur', 'Notify if exposed to biohazardous reagents'],
    availableDates: 'Monday - Friday (8:00 AM - 5:00 PM)',
    tags: ['Lab Coat', 'Chemistry', 'Biology', 'Safety']
  },
  {
    id: 'eq-7',
    title: 'Arduino & Raspberry Pi 4 Ultimate IoT Starter Kit',
    category: 'electronics',
    pricePerDay: 7,
    deposit: 20,
    rating: 4.8,
    reviewCount: 23,
    status: 'available',
    ownerId: 'u-107',
    ownerName: 'Rohan Gupta',
    ownerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    ownerDepartment: 'Computer Science & AI (Junior)',
    location: 'Turing Computer Lab, 3rd Floor',
    images: [
      'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Contains Raspberry Pi 4 (4GB RAM), Arduino Uno R3, over 65 sensors, breadboards, jumper wires, servo motors, LCD screens, and preloaded 32GB SD card with Raspbian.',
    features: ['Raspberry Pi 4 (4GB)', 'Arduino Uno R3', '65+ Sensors and Components', 'Jumper Wires & Breadboards'],
    rules: ['Please keep components organized in their labeled compartments', 'Do not short-circuit GPIO pins'],
    availableDates: 'Instant pickup at CS Helpdesk',
    tags: ['Electronics', 'Coding', 'Robotics', 'Hardware', 'IoT']
  },
  {
    id: 'eq-8',
    title: 'Blue Yeti USB Microphone + Pop Filter & Boom Arm',
    category: 'electronics',
    pricePerDay: 5,
    deposit: 15,
    rating: 4.9,
    reviewCount: 37,
    status: 'available',
    ownerId: 'u-101',
    ownerName: 'Aarav Patel',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    ownerDepartment: 'Media & Design (Senior)',
    location: 'North Campus Dormitory, Block B',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520523839898-507127054976?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Studio-grade microphone setup ideal for podcast recording, voiceovers, remote presentations, and acoustic music recordings. Plug and play with Mac & Windows.',
    features: ['4 Polar Pickup Patterns', 'Heavy Desk Stand & Desk Clamp Arm', 'Pop Filter + Foam Windscreen', 'Headphone Jack for Zero Latency'],
    rules: ['Do not drop or blow directly into capsule without pop filter'],
    availableDates: 'Everyday except Sunday mornings',
    tags: ['Audio', 'Podcast', 'Music', 'Microphone']
  },
  {
    id: 'eq-9',
    title: 'Wilson Evolution Official Game Basketball (Size 7)',
    category: 'miscellaneous',
    pricePerDay: 2,
    deposit: 5,
    rating: 4.9,
    reviewCount: 65,
    status: 'available',
    ownerId: 'u-108',
    ownerName: 'Samira Khan',
    ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    ownerDepartment: 'Sports Science & Kinesiology',
    location: 'Campus Recreation Center Locker #12',
    images: [
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'The preferred indoor game ball with micro-fiber composite grip. Comes with a hand pump and needle in a mesh carry bag for court sessions at the gym.',
    features: ['Cushion Core Technology', 'Official Size 7 (29.5")', 'Dual Action Hand Pump included'],
    rules: ['Indoor gym courts only — please do not use on rough asphalt'],
    availableDates: 'Available daily until 10 PM',
    tags: ['Basketball', 'Sports', 'Gym', 'Fitness']
  },
  {
    id: 'eq-10',
    title: 'DJI Ronin-SC 3-Axis Gimbal Stabilizer',
    category: 'electronics',
    pricePerDay: 10,
    deposit: 30,
    rating: 4.8,
    reviewCount: 15,
    status: 'available',
    ownerId: 'u-101',
    ownerName: 'Aarav Patel',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    ownerDepartment: 'Media & Design (Senior)',
    location: 'North Campus Dormitory, Block B',
    images: [
      'https://images.unsplash.com/photo-1589872782736-a36c8be5748a?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Lightweight and compact 3-axis stabilizer for mirrorless cameras. Ideal for smooth tracking shots and video projects.',
    features: ['3-Axis Stabilization', 'Automated Smart Features', 'ActiveTrack 3.0', '11-hour Battery Life'],
    rules: ['Calibrate balance before turning on motors', 'Store in foam case'],
    availableDates: 'Mon - Fri',
    tags: ['Gimbal', 'Video', 'Filmmaking']
  }
];

export const INITIAL_REQUESTS = [
  {
    id: 'req-1',
    title: 'Looking for a 3D Scanner (Creality CR-Scan or similar) for Architecture capstone',
    category: 'electronics',
    urgency: 'high',
    budgetPerDay: 20,
    requiredDuration: '3 days (Sep 8 - Sep 11)',
    requesterName: 'Elena Rostova',
    requesterAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    requesterDepartment: 'Architecture & Urban Planning',
    description: 'Need to scan high-relief clay topographic models for digital CAD manipulation. Must have minimum 0.1mm accuracy. Willing to pay refundable deposit.',
    responsesCount: 2,
    createdAt: '2 hours ago',
    status: 'open'
  },
  {
    id: 'req-2',
    title: 'Need a heavy-duty Soldering Station & Heat Gun for PCB rework',
    category: 'tools',
    urgency: 'medium',
    budgetPerDay: 10,
    requiredDuration: 'Weekend (Sep 6 - Sep 7)',
    requesterName: 'Tariq Al-Mansoor',
    requesterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    requesterDepartment: 'Electrical & Computer Engineering',
    description: 'Finalizing hardware prototype for the upcoming hackathon. Need Hakko or Weller adjustable temp station with solder wick and flux if available.',
    responsesCount: 4,
    createdAt: '5 hours ago',
    status: 'open'
  },
  {
    id: 'req-3',
    title: 'Borrowing 2x Wireless Lavalier Mics (DJI Mic or Rode Wireless Go II)',
    category: 'electronics',
    urgency: 'high',
    budgetPerDay: 15,
    requiredDuration: '1 day (Sep 9)',
    requesterName: 'Jordan Taylor',
    requesterAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    requesterDepartment: 'Journalism & Media Society',
    description: 'Conducting interviews with guest speakers during the Tech Symposium. Need dual transmitters and lightning/USB-C receivers.',
    responsesCount: 1,
    createdAt: '1 day ago',
    status: 'open'
  }
];

export const INITIAL_USER = {
  id: 'u-current',
  name: 'Alex Rivera',
  email: 'alex.rivera@campus.edu',
  role: 'both', // 'borrower' | 'lender' | 'both'
  currentMode: 'borrower', // initial testing mode
  department: 'Computer Science & Interaction Design',
  studentId: 'CS-2024-8891',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  rating: 4.95,
  reviewsCount: 18,
  joinedDate: 'August 2023',
  walletBalance: 84.50,
  borrowedItemsCount: 7,
  listedItemsCount: 3,
  completedRentalsCount: 24,
  borrowHistory: [
    {
      id: 'rent-101',
      equipmentId: 'eq-1',
      title: 'Sony Alpha A7 III Mirrorless Camera',
      ownerName: 'Aarav Patel',
      startDate: '2026-08-20',
      endDate: '2026-08-22',
      totalCost: 30.00,
      status: 'completed',
      reviewed: true,
      userRatingGiven: 5
    },
    {
      id: 'rent-102',
      equipmentId: 'eq-3',
      title: 'Texas Instruments TI-Nspire CX II CAS',
      ownerName: 'Devon Vance',
      startDate: '2026-08-28',
      endDate: '2026-08-30',
      totalCost: 8.00,
      status: 'completed',
      reviewed: true,
      userRatingGiven: 5
    }
  ],
  myListings: [
    {
      id: 'eq-100',
      title: 'iPad Pro 11" (M2) + Apple Pencil 2 & Magic Keyboard',
      category: 'electronics',
      pricePerDay: 12,
      deposit: 40,
      rating: 5.0,
      reviewCount: 9,
      status: 'available',
      location: 'South Quad Hall 4B',
      earnings: 108.00,
      totalRentals: 9,
      images: [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80'
      ],
      description: 'Ideal for digital art, 3D modeling in Nomad Sculpt, or reading academic papers with Apple Pencil.',
      features: ['M2 Chip', 'Apple Pencil 2', 'Paperlike screen protector', 'Magic Keyboard case']
    },
    {
      id: 'eq-101',
      title: 'DJI Mini 3 Pro Drone + Fly More Combo (Sub-250g)',
      category: 'electronics',
      pricePerDay: 22,
      deposit: 60,
      rating: 4.9,
      reviewCount: 14,
      status: 'rented',
      location: 'South Quad Hall 4B',
      earnings: 308.00,
      totalRentals: 14,
      images: [
        'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80'
      ],
      description: 'Ultra-lightweight camera drone with obstacle avoidance, vertical shooting for Instagram/TikTok, and 3 intelligent flight batteries.',
      features: ['4K/60fps HDR video', '3x 34-min Batteries', 'Remote with Built-in Screen', 'Sub-249g FAA registration exempt']
    },
    {
      id: 'eq-102',
      title: 'Yamaha FG800 Acoustic Guitar with Gig Bag & Capo',
      category: 'miscellaneous',
      pricePerDay: 5,
      deposit: 15,
      rating: 4.8,
      reviewCount: 6,
      status: 'available',
      location: 'South Quad Hall 4B',
      earnings: 30.00,
      totalRentals: 6,
      images: [
        'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop&q=80'
      ],
      description: 'Solid spruce top dreadnought acoustic guitar. Great action and warm tone. Includes tuner, picks, and padded gig bag.',
      features: ['Solid Spruce Top', 'Padded Gig Bag', 'Digital Clip-on Tuner', 'Quick-change Capo']
    }
  ]
};
