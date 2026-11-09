export type SupplierCategory =
  | 'cement'
  | 'steel'
  | 'sand'
  | 'aggregate'
  | 'tiles'
  | 'sanitary'
  | 'hardware';

export type Supplier = {
  id: string;
  name: string;
  category: SupplierCategory;
  rating: number;
  distanceKm: number;
  etaMinutes: number;
  phone: string;
  address: string;
  city: string;
  verified: boolean;
  priceBand: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  serviceTags: string[];
};

export const mockSuppliers: Supplier[] = [
  {
    id: 'kota-cement-1',
    name: 'Kota Cement House',
    category: 'cement',
    rating: 4.7,
    distanceKm: 3.8,
    etaMinutes: 12,
    phone: '+91 98290 11732',
    address: 'Talwandi Road, Kota',
    city: 'Kota',
    verified: true,
    priceBand: '₹420–₹480 / bag',
    coordinates: { lat: 25.1828, lng: 75.8525 },
    serviceTags: ['OPC 43', 'Bulk rate', 'Dispatch'],
  },
  {
    id: 'kota-steel-1',
    name: 'Rajasthan Steel Mart',
    category: 'steel',
    rating: 4.8,
    distanceKm: 5.2,
    etaMinutes: 16,
    phone: '+91 94141 20044',
    address: 'Near Gumanpura Market, Kota',
    city: 'Kota',
    verified: true,
    priceBand: '₹88–₹95 / kg',
    coordinates: { lat: 25.1737, lng: 75.8402 },
    serviceTags: ['TMT', 'Cutting', 'Delivery'],
  },
  {
    id: 'kota-sand-1',
    name: 'Shivam River Sand Co.',
    category: 'sand',
    rating: 4.5,
    distanceKm: 7.4,
    etaMinutes: 21,
    phone: '+91 98876 98010',
    address: 'Madanpura, Kota',
    city: 'Kota',
    verified: false,
    priceBand: '₹65–₹90 / cft',
    coordinates: { lat: 25.192, lng: 75.8259 },
    serviceTags: ['River sand', 'Mason mix'],
  },
  {
    id: 'kota-aggregate-1',
    name: 'Kota Aggregates & RMC',
    category: 'aggregate',
    rating: 4.6,
    distanceKm: 9.1,
    etaMinutes: 25,
    phone: '+91 99825 54271',
    address: 'Industrial Area, Kota',
    city: 'Kota',
    verified: true,
    priceBand: '₹58–₹72 / cft',
    coordinates: { lat: 25.1671, lng: 75.9018 },
    serviceTags: ['20mm', 'RMC', 'Mix design'],
  },
  {
    id: 'kota-tile-1',
    name: 'Apex Tiles & Bath Studio',
    category: 'tiles',
    rating: 4.4,
    distanceKm: 4.7,
    etaMinutes: 14,
    phone: '+91 93526 77891',
    address: 'Bhawani Singh Road, Kota',
    city: 'Kota',
    verified: true,
    priceBand: '₹55–₹120 / sqft',
    coordinates: { lat: 25.1782, lng: 75.8587 },
    serviceTags: ['Ceramic', 'Vitrified', 'Dado'],
  },
  {
    id: 'kota-sani-1',
    name: 'Kota Sanitary Source',
    category: 'sanitary',
    rating: 4.3,
    distanceKm: 6.1,
    etaMinutes: 18,
    phone: '+91 90012 33372',
    address: 'Sangod Road, Kota',
    city: 'Kota',
    verified: false,
    priceBand: '₹1.4k–₹8k / set',
    coordinates: { lat: 25.1665, lng: 75.8738 },
    serviceTags: ['Toilets', 'Faucets', 'Pipes'],
  },
  {
    id: 'kota-hardware-1',
    name: 'Urban Hardware Junction',
    category: 'hardware',
    rating: 4.6,
    distanceKm: 3.3,
    etaMinutes: 10,
    phone: '+91 97821 34112',
    address: 'Mahaveer Nagar, Kota',
    city: 'Kota',
    verified: true,
    priceBand: '₹250–₹1.8k / set',
    coordinates: { lat: 25.1894, lng: 75.8674 },
    serviceTags: ['Door fittings', 'Locks', 'Fasteners'],
  },
];

export const supplierCategories = [
  { key: 'all', label: 'All suppliers' },
  { key: 'cement', label: 'Cement' },
  { key: 'steel', label: 'Steel' },
  { key: 'sand', label: 'Sand' },
  { key: 'aggregate', label: 'Aggregate' },
  { key: 'tiles', label: 'Tiles' },
  { key: 'sanitary', label: 'Sanitary' },
  { key: 'hardware', label: 'Hardware' },
] as const;

export const getSupplierResults = (category: string = 'all') => {
  const list = category === 'all' ? mockSuppliers : mockSuppliers.filter((supplier) => supplier.category === category);
  return [...list].sort((a, b) => a.distanceKm - b.distanceKm);
};
