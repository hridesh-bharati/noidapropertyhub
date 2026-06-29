// data/properties.ts

export interface Property {
    id: number
    image: string
    type: string
    category: string
    price: string
    title: string
    location: string
    sqft: string
    features: string[]
    featured?: boolean
    verified?: boolean
    availability: string
    advisor?: string
    typicalFloor?: string
    floors?: string
    plotArea?: string
    description?: string
    nearby?: {
        metro?: Array<{ name: string; distance: string }>
        airport?: string
        expressway?: string
    }
    certification?: string
    builtUpArea?: string
    floorPlate?: string
}

// All sectors from your list - ONLY THESE
const sectors = [
    'Sector 140A', 'Sector 4', 'Sector 57', 'Sector 58', 'Sector 59',
    'Sector 63', 'Sector 65', 'Sector 67', 'Sector 80', 'Sector 83',
    'Hosiery Complex', 'Phase 2', 'Sector 138', 'Sector 85', 'Sector 140',
    'Sector 155', 'Ecotech 3', 'Sector 8', 'Sector 6', 'Sector 5'
];

// Real properties from estate lion
export const allProperties: Property[] = [
    {
        id: 1,
        image: '/img/property-1.jpg',
        type: 'For Rent',
        category: 'Commercial Building',
        price: '₹120 Cr',
        title: '112,500 sq.ft. IT/ITeS Office Building for Rent – Sector 135, Noida',
        location: 'Sector-135 Noida, Noida',
        sqft: 'Area on request',
        features: [
            'IT/ITeS Building',
            '2 Basement Levels',
            'Ground Floor + 8 Upper Floors',
            '12,500 sq.ft. Typical Floor Plate',
            'Noida-Greater Noida Expressway',
            'Sector 142 Metro Station',
            'Noida International Airport',
            '1:1000 sq.ft. Parking Ratio',
            'Visitor Parking',
            'Maintenance Staff',
            'Waste Disposal',
            'Waiting Lounge',
            'Service/Goods Lift',
            'Water Storage',
            'Power Back-Up',
            '24x7 Security',
            'Reserved Parking',
            'East Facing',
            'Split Air-Conditioning'
        ],
        featured: true,
        verified: true,
        availability: 'Available Now',
        advisor: 'Ashutosh Tripathi',
        typicalFloor: '12,500 sq.ft.',
        floors: '2B + GF + 8 Floors',
        plotArea: '4,000 sq.m',
        certification: 'On request',
        builtUpArea: '112,500 sq.ft.',
        floorPlate: '12,500 sq.ft.',
        description: `A standalone commercial office building is available for Rent in Sector 135, Noida, offering an excellent opportunity for investors, corporate occupiers, IT/ITeS companies, business headquarters, and institutional buyers seeking ownership of a large commercial asset in one of Noida's established IT and commercial corridors.

Developed on a 4,000 sq.m plot, the property offers a total built-up area of approximately 112,500 sq.ft and is configured as 2 Basement Levels, Ground Floor and 8 Upper Office Floors. The building features large floor plates of approximately 12,500 sq.ft, providing flexible layouts suitable for corporate headquarters, IT/ITeS operations, business centres, training facilities, and institutional use. The efficient design allows for open workstations, executive cabins, conference rooms, collaboration areas, and other business functions.

As an independent commercial building, the property offers enhanced visibility, controlled access, operational flexibility, and excellent branding opportunities. Its spacious floor plates and efficient planning ensure optimal space utilization while supporting the evolving requirements of modern businesses.

Strategically located in Sector 135, Noida, the property enjoys excellent connectivity via the Noida-Greater Noida Expressway, providing seamless access to key commercial hubs across Noida, Greater Noida, Delhi, and the wider NCR region. Sector 142 Metro Station (Aqua Line) is located nearby, offering convenient public transportation for employees and visitors. The property also provides easy access to Indira Gandhi International Airport and Noida International Airport, making it an ideal choice for organizations with frequent domestic and international business travel.

Surrounded by established corporate campuses, business parks, residential developments, and supporting social infrastructure, this standalone commercial office building presents an outstanding opportunity for long-term investment, corporate ownership, and business expansion in one of Noida's most prominent commercial destinations.`,
        nearby: {
            metro: [
                { name: 'Sector 142', distance: '11 mins (1.5 km)' },
                { name: 'Sector 137', distance: '9 mins (1.5 km)' },
                { name: 'Sector 143', distance: '24 mins' },
                { name: 'Sector 83', distance: '27 km' }
            ],
            airport: 'Noida International Airport - Easy Access',
            expressway: 'Noida-Greater Noida Expressway'
        }
    },
    {
        id: 2,
        image: '/img/property-2.jpg',
        type: 'For Rent',
        category: 'Warehouse',
        price: '₹65 Cr',
        title: '25,000 sq.ft Warehouse for Rent in Sector 67, Noida',
        location: 'Sector-67 Noida, Noida',
        sqft: 'Area on request',
        features: ['Warehouse', 'Loading Dock', '24/7 Security', 'Power Backup', 'Fleet Parking', 'Office Block'],
        featured: true,
        verified: true,
        availability: 'Available Now',
        advisor: 'Priya Sharma',
        description: 'A premium warehouse space available for Rent in Sector 67, Noida. This well-maintained property offers excellent storage and logistics capabilities in Noida\'s prime industrial corridor.',
        nearby: {
            metro: [
                { name: 'Sector 67 Metro Station', distance: '8 mins (1.2 km)' }
            ],
            airport: 'Indira Gandhi International Airport - 40 mins',
            expressway: 'Noida-Greater Noida Expressway'
        }
    },
    {
        id: 3,
        image: '/img/property-3.jpg',
        type: 'For Rent',
        category: 'Commercial Building',
        price: '₹120 Cr',
        title: 'Premium Rented Commercial Asset for Rent – Sector 142, Noida',
        location: 'Sector-142 Noida, Noida',
        sqft: 'Area on request',
        features: ['Commercial Building', 'Visitor Parking', 'Maintenance Staff', 'Waste Disposal', 'Waiting Lounge', 'Service/Goods Lift', 'Water Storage', 'Power Back-Up', '24x7 Security'],
        featured: true,
        verified: true,
        availability: 'Available Now',
        advisor: 'Rahul Verma',
        description: 'A premium commercial asset with existing rental income available for Rent in Sector 142, Noida. This property offers excellent investment potential in one of Noida\'s most sought-after commercial corridors.',
        nearby: {
            metro: [
                { name: 'Sector 142 Metro Station', distance: '5 mins (0.8 km)' }
            ],
            airport: 'Noida International Airport - 35 mins',
            expressway: 'Noida-Greater Noida Expressway'
        }
    },
    {
        id: 4,
        image: '/img/property-4.jpg',
        type: 'For Rent',
        category: 'Commercial Building',
        price: '₹45 Cr',
        title: 'Commercial Office Building for Rent – Sector 136, Noida',
        location: 'Sector-136 Noida, Noida',
        sqft: 'Area on request',
        features: ['Commercial Building', 'Office Space', 'Parking', 'Security System', 'Power Backup', 'Elevators'],
        featured: false,
        verified: true,
        availability: 'Available Now',
        advisor: 'Sneha Patel',
        description: 'A well-located commercial office building available for Rent in Sector 136, Noida. This property offers excellent visibility and accessibility in Noida\'s growing commercial hub.',
        nearby: {
            metro: [
                { name: 'Sector 136 Metro Station', distance: '10 mins (1.8 km)' }
            ],
            airport: 'Indira Gandhi International Airport - 45 mins',
            expressway: 'Noida-Greater Noida Expressway'
        }
    },
    {
        id: 5,
        image: '/img/property-5.jpg',
        type: 'For Rent',
        category: 'Commercial Building',
        price: '₹100 Cr',
        title: 'Premium IT/ITeS Office Building for Rent – Sector 136, Noida',
        location: 'Sector-136 Noida, Noida',
        sqft: 'Area on request',
        features: ['IT/ITeS Building', 'Data Centers', 'Server Rooms', 'Conference Rooms', 'Meeting Rooms', 'Cafeteria', 'High Speed Internet', 'Backup Generator'],
        featured: true,
        verified: true,
        availability: 'Available Now',
        advisor: 'Ashutosh Tripathi',
        description: 'A premium IT/ITeS office building available for Rent in Sector 136, Noida. This property is designed to meet the requirements of modern technology and business processing companies.',
        nearby: {
            metro: [
                { name: 'Sector 136 Metro Station', distance: '10 mins (1.8 km)' }
            ],
            airport: 'Noida International Airport - 30 mins',
            expressway: 'Noida-Greater Noida Expressway'
        }
    }
];

// Generate properties for all sectors
sectors.forEach((sector, index) => {
    const exists = allProperties.some(p => p.location.includes(sector));
    if (!exists) {
        const categories = ['Warehouse', 'Factory', 'Commercial Building', 'Industrial Shed', 'Office Space'];
        const cat = categories[index % categories.length];
        const sqftOptions = ['15,000 Sqft', '25,000 Sqft', '35,000 Sqft', '50,000 Sqft', '75,000 Sqft', '100,000 Sqft'];
        const sqft = sqftOptions[index % sqftOptions.length];
        const priceOptions = ['₹45 Cr', '₹65 Cr', '₹80 Cr', '₹100 Cr', '₹120 Cr', '₹150 Cr'];
        const price = priceOptions[index % priceOptions.length];
        const typeOptions = ['For Rent', 'For Rent', 'For Lease'];
        const type = typeOptions[index % typeOptions.length];
        const availabilityOptions = ['Available Now', 'Available from Next Month', 'Coming Soon'];
        const availability = availabilityOptions[index % availabilityOptions.length];
        const advisorNames = ['Ashutosh Tripathi', 'Priya Sharma', 'Rahul Verma', 'Sneha Patel'];
        const advisor = advisorNames[index % advisorNames.length];
        const featureSets = {
            'Warehouse': ['Loading Dock', '24/7 Security', 'Power Backup', 'Fleet Parking', 'Office Block', 'Storage', 'Loading Area'],
            'Factory': ['Production Line', 'Staff Quarters', 'Canteen', 'Assembly Line', 'Office Space', 'Parking', 'Heavy Machinery'],
            'Commercial Building': ['Visitor Parking', 'Maintenance Staff', 'Waste Disposal', 'Waiting Lounge', 'Service/Goods Lift', 'Water Storage', 'Power Back-Up'],
            'Industrial Shed': ['Large Floor Space', 'Ventilation', 'Crane Facility', 'Material Storage', 'Security System', 'Fire Safety'],
            'Office Space': ['Conference Rooms', 'Meeting Rooms', 'Cafeteria', 'High Speed Internet', 'Backup Generator', 'Parking']
        };
        const features = featureSets[cat as keyof typeof featureSets] || ['24/7 Security', 'Power Backup', 'Parking'];
        const selectedFeatures = features.slice(0, 4 + (index % 3));
        const prefixes = {
            'Warehouse': ['Premium Warehouse', 'Modern Warehouse', 'Massive Distribution', 'Smart Warehouse'],
            'Factory': ['Industrial Factory', 'Light Manufacturing', 'Heavy Industrial', 'Production Unit'],
            'Commercial Building': ['Commercial Building', 'Office Complex', 'Corporate Tower', 'Business Center'],
            'Industrial Shed': ['Industrial Shed', 'Factory Shed', 'Warehouse Shed', 'Manufacturing Shed'],
            'Office Space': ['Premium Office', 'Corporate Office', 'Business Space', 'Executive Office']
        };
        const prefixList = prefixes[cat as keyof typeof prefixes] || ['Commercial Space'];
        const prefix = prefixList[index % prefixList.length];
        
        allProperties.push({
            id: allProperties.length + 1,
            image: `/img/property-${(index % 5) + 1}.jpg`,
            type: type,
            category: cat,
            price: price,
            title: `${prefix} in ${sector}, Noida`,
            location: `${sector}, Noida`,
            sqft: sqft,
            features: selectedFeatures,
            featured: index % 3 === 0,
            verified: true,
            availability: availability,
            advisor: advisor,
            description: `A premium ${cat.toLowerCase()} space located in ${sector}, Noida. This well-maintained property offers ${sqft} of built-up area with modern amenities and excellent connectivity. Perfect for businesses seeking quality industrial/commercial space in Noida's prime location.`,
            nearby: {
                metro: [
                    { name: `${sector} Metro Station`, distance: `${5 + (index % 10)} mins (${0.8 + (index % 3)} km)` }
                ],
                airport: index % 2 === 0 ? 'Noida International Airport - Easy Access' : 'Indira Gandhi International Airport - 45 mins',
                expressway: index % 2 === 0 ? 'Noida-Greater Noida Expressway' : 'DND Flyway'
            }
        });
    }
});

// Helper functions
export function getPropertiesBySector(sector: string): Property[] {
    return allProperties.filter(p => p.location.includes(sector));
}

export const allSectors = sectors;

export const categories = ['Warehouse', 'Factory', 'Commercial Building', 'IT/ITeS Building', 'Industrial Shed', 'Office Space'];

export function getRelatedProperties(propertyId: number, limit: number = 4): Property[] {
    const property = allProperties.find(p => p.id === propertyId);
    if (!property) return [];
    
    return allProperties
        .filter(p => p.id !== propertyId && (p.category === property.category || p.location.includes('Noida')))
        .slice(0, limit);
}

export function getFeaturedProperties(limit: number = 6): Property[] {
    return allProperties.filter(p => p.featured).slice(0, limit);
}

export function getVerifiedProperties(limit: number = 10): Property[] {
    return allProperties.filter(p => p.verified).slice(0, limit);
}

export function searchProperties(query: string): Property[] {
    const searchLower = query.toLowerCase();
    return allProperties.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.location.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower) ||
        p.features.some(f => f.toLowerCase().includes(searchLower))
    );
}

export function getPropertiesByCategory(category: string): Property[] {
    return allProperties.filter(p => p.category === category);
}

export function getPropertiesByAvailability(availability: string): Property[] {
    return allProperties.filter(p => p.availability === availability);
}