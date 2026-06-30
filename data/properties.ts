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

// All sectors from your list - ONLY THESE 20
const sectors = [
    'Sector 140A', 'Sector 4', 'Sector 57', 'Sector 58', 'Sector 59',
    'Sector 63', 'Sector 65', 'Sector 67', 'Sector 80', 'Sector 83',
    'Hosiery Complex', 'Phase 2', 'Sector 138', 'Sector 85', 'Sector 140',
    'Sector 155', 'Ecotech 3', 'Sector 8', 'Sector 6', 'Sector 5'
];

// Warehouse feature sets
const warehouseFeatures = [
    ['Loading Dock', '24/7 Security', 'Power Backup', 'Fire Safety', 'Fleet Parking', 'CCTV Surveillance'],
    ['Cold Storage', 'Loading Bay', 'Temperature Control', 'Security', 'Power Backup', 'Inventory Area'],
    ['Multiple Docks', 'Warehouse Office', 'Staff Canteen', 'Security System', 'Generator Backup', 'Sprinkler System'],
    ['Ground Level Access', 'Heavy Vehicle Access', '24/7 Power', 'Security Guard', 'Parking Area', 'Washroom'],
    ['High Ceiling', 'Racking System', 'Forklift Access', 'Fire Alarm', 'CCTV', 'Staff Room']
];

// Factory feature sets
const factoryFeatures = [
    ['Production Line', 'Assembly Area', 'Quality Control Lab', 'Staff Quarters', 'Power Backup', 'Fire Safety'],
    ['Heavy Machinery Area', 'Raw Material Store', 'Finished Goods Area', 'Canteen', 'Security', 'Generator'],
    ['Manufacturing Unit', 'Tool Room', 'Inspection Area', 'Worker Facilities', 'Power Backup', 'Loading Bay'],
    ['Processing Plant', 'Storage Shed', 'Packaging Unit', 'Staff Canteen', '24/7 Power', 'Safety Equipment'],
    ['Industrial Unit', 'Machine Floor', 'Utility Area', 'Office Block', 'Fire System', 'Backup Power']
];

// Warehouse titles
const warehouseTitles = [
    'Premium Warehouse Space',
    'Modern Storage Warehouse',
    'Large Distribution Warehouse',
    'Industrial Warehouse Unit',
    'Smart Logistics Warehouse'
];

// Factory titles
const factoryTitles = [
    'Industrial Factory Unit',
    'Manufacturing Factory Space',
    'Production Factory Complex',
    'Heavy Industrial Factory',
    'Light Manufacturing Factory'
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
        sqft: '112,500 Sq.Ft',
        features: [
            'IT/ITeS Building',
            '2 Basement Levels',
            'Ground Floor + 8 Upper Floors',
            '12,500 sq.ft. Typical Floor Plate',
            'Noida-Greater Noida Expressway',
            'Sector 142 Metro Station',
            'Power Back-Up',
            '24x7 Security'
        ],
        featured: true,
        verified: true,
        availability: 'Available Now',
        advisor: 'Ashutosh Tripathi',
        typicalFloor: '12,500 sq.ft.',
        floors: '2B + GF + 8 Floors',
        plotArea: '4,000 sq.m',
        description: 'A standalone commercial office building available for Rent in Sector 135, Noida.',
        nearby: {
            metro: [
                { name: 'Sector 142', distance: '11 mins (1.5 km)' }
            ],
            airport: 'Noida International Airport - Easy Access',
            expressway: 'Noida-Greater Noida Expressway'
        }
    }
];

// Generate ONLY Warehouse and Factory properties for ALL 20 sectors
sectors.forEach((sector, index) => {
    // Generate Warehouse property for each sector
    const warehouseTitleIndex = index % warehouseTitles.length;
    const warehouseFeatureIndex = index % warehouseFeatures.length;
    const warehouseSqftOptions = ['8,000', '12,000', '15,000', '20,000', '25,000', '30,000', '35,000', '40,000', '45,000', '50,000'];
    const warehousePriceOptions = ['₹1.8 Cr', '₹2.2 Cr', '₹2.8 Cr', '₹3.5 Cr', '₹4.2 Cr', '₹5.0 Cr', '₹5.8 Cr', '₹6.5 Cr', '₹7.5 Cr', '₹8.5 Cr'];
    
    allProperties.push({
        id: allProperties.length + 1,
        image: `/img/property-${(index % 5) + 1}.jpg`,
        type: 'For Rent',
        category: 'Warehouse',
        price: warehousePriceOptions[index % warehousePriceOptions.length],
        title: `${warehouseTitles[warehouseTitleIndex]} for Rent in ${sector}, Noida`,
        location: `${sector}, Noida`,
        sqft: `${warehouseSqftOptions[index % warehouseSqftOptions.length]} Sq.Ft`,
        features: warehouseFeatures[warehouseFeatureIndex],
        featured: index % 5 === 0,
        verified: true,
        availability: 'Available Now',
        advisor: ['Ashutosh Tripathi', 'Priya Sharma', 'Rahul Verma', 'Sneha Patel'][index % 4],
        description: `Premium warehouse space available for Rent in ${sector}, Noida. This well-maintained property offers excellent storage and logistics capabilities with modern amenities, loading facilities, and 24/7 security. Perfect for e-commerce, logistics, and distribution businesses looking for quality industrial space in Noida's prime location.`,
        nearby: {
            metro: [
                { name: `${sector} Metro Station`, distance: `${5 + (index % 10)} mins (${0.8 + (index % 3)} km)` }
            ],
            airport: 'Noida International Airport - Easy Access',
            expressway: 'Noida-Greater Noida Expressway'
        }
    });

    // Generate Factory property for each sector
    const factoryTitleIndex = index % factoryTitles.length;
    const factoryFeatureIndex = index % factoryFeatures.length;
    const factorySqftOptions = ['15,000', '20,000', '25,000', '30,000', '35,000', '40,000', '45,000', '50,000', '55,000', '60,000'];
    const factoryPriceOptions = ['₹3.5 Cr', '₹4.5 Cr', '₹5.5 Cr', '₹6.5 Cr', '₹7.5 Cr', '₹8.5 Cr', '₹9.5 Cr', '₹10.5 Cr', '₹11.5 Cr', '₹12.5 Cr'];
    
    allProperties.push({
        id: allProperties.length + 1,
        image: `/img/property-${(index % 5) + 1}.jpg`,
        type: 'For Rent',
        category: 'Factory',
        price: factoryPriceOptions[index % factoryPriceOptions.length],
        title: `${factoryTitles[factoryTitleIndex]} for Rent in ${sector}, Noida`,
        location: `${sector}, Noida`,
        sqft: `${factorySqftOptions[index % factorySqftOptions.length]} Sq.Ft`,
        features: factoryFeatures[factoryFeatureIndex],
        featured: index % 4 === 0,
        verified: true,
        availability: 'Available Now',
        advisor: ['Rahul Verma', 'Sneha Patel', 'Ashutosh Tripathi', 'Priya Sharma'][index % 4],
        description: `Premium factory space available for Rent in ${sector}, Noida. This well-equipped industrial unit offers production-ready infrastructure with modern amenities, power backup, staff facilities, and excellent connectivity. Ideal for manufacturing, processing, and industrial operations in Noida's thriving industrial corridor.`,
        nearby: {
            metro: [
                { name: `${sector} Metro Station`, distance: `${5 + (index % 10)} mins (${0.8 + (index % 3)} km)` }
            ],
            airport: 'Noida International Airport - Easy Access',
            expressway: 'Noida-Greater Noida Expressway'
        }
    });
});

// Helper functions
export function getPropertiesBySector(sector: string): Property[] {
    return allProperties.filter(p => p.location.includes(sector));
}

export const allSectors = sectors;

export const categories = ['All', 'Warehouse', 'Factory', 'Commercial Building', 'IT/ITeS Building', 'Industrial Shed'];

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