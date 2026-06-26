import { useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

interface PlanData {
  id: number;
  title: string;
  subtitle: string;
  beds: string;
  baths: string;
  living: string;
  kitchen: string;
  image: string;
  borderColor: string;
}

const propertyPlans: PlanData[] = [
  {
    id: 1,
    title: '1 BHK Design Daulat Park 1',
    subtitle: '1 BHK designed specially for comfort living.',
    beds: '01 Bedroom',
    baths: '02 Bathrooms',
    living: 'Living Room Included',
    kitchen: 'Modular Kitchen',
    image: '/img/h1.jpeg', // मेक श्योर यह फाइल public/img/h1.jpeg पाथ पर मौजूद हो
    borderColor: 'border-l-[6px] border-red-700',
  },
  {
    id: 2,
    title: '2 BHK Luxury Suite',
    subtitle: 'Modern and spacious premium layout.',
    beds: '02 Bedrooms',
    baths: '02 Bathrooms',
    living: 'Large Living & Dining',
    kitchen: 'Open Concept Kitchen',
    image: '/img/h1.jpeg',
    borderColor: 'border-l-[6px] border-purple-750',
  },
  {
    id: 3,
    title: '3 BHK Elegant Villa',
    subtitle: 'Perfect blend of luxury and convenience.',
    beds: '03 Bedrooms',
    baths: '03 Bathrooms',
    living: 'Grand Living Hall',
    kitchen: 'Spacious Kitchen + Pantry',
    image: '/img/h1.jpeg',
    borderColor: 'border-l-[6px] border-green-700',
  },
  {
    id: 4,
    title: 'Studio Apartment Smart',
    subtitle: 'Minimalist approach for urban professionals.',
    beds: '01 Studio Bed',
    baths: '01 Bathroom',
    living: 'Integrated Living Space',
    kitchen: 'Compact Kitchenette',
    image: '/img/h1.jpeg',
    borderColor: 'border-l-[6px] border-blue-700',
  },
];

// 3D Image Mesh Component
// useTexture को सुरक्षित रूप से बिना try-catch के इस्तेमाल करें, Suspense इसे हैंडल करेगा
function ThreeDImage({ imgUrl }: { imgUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imgUrl);

  useFrame((state) => {
    if (!meshRef.current) return;
    const x = (state.pointer.x * Math.PI) / 8;
    const y = (state.pointer.y * Math.PI) / 8;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -y, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, x, 0.1);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3.6, 2.4]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

// जब तक 3D टेक्सचर लोड हो रहा है, तब तक दिखने वाला साफ़ लाइट फॉलबैक
function FallbackMesh() {
  return (
    <mesh>
      <planeGeometry args={[3.6, 2.4]} />
      <meshBasicMaterial color="#f1f5f9" />
    </mesh>
  );
}

export default function Property3DGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.plan-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      }
    );
  }, []);

  return (
    // डार्क बैकग्राउंड हटाकर साफ़ और प्रीमियम लाइट बैकग्राउंड (bg-slate-50) दिया है
    <div className="py-20 bg-slate-50 min-h-screen text-slate-800">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mx-auto mb-16 max-w-[600px]">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900">
            Exclusive Floor Plans
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-4 rounded"></div>
          <p className="text-slate-500">
            Explore our state-of-the-art 3D layout architecture designs fine-tuned for high-end modern living.
          </p>
        </div>

        {/* 4 Cards Grid Layout */}
        <div 
          ref={containerRef} 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto"
        >
          {propertyPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`plan-card opacity-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl flex flex-col sm:flex-row transition-all duration-300 border border-slate-100 ${plan.borderColor}`}
            >
              
              {/* 3D Canvas Box */}
              <div className="w-full sm:w-1/2 h-56 sm:h-auto bg-slate-100 relative min-h-[220px]">
                <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                  <ambientLight intensity={1.5} />
                  {/* Suspense से लोडिंग एरर फिक्स हो गया */}
                  <Suspense fallback={<FallbackMesh />}>
                    <ThreeDImage imgUrl={plan.image} />
                  </Suspense>
                </Canvas>
                <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-[10px] px-2 py-0.5 rounded-md pointer-events-none text-slate-600 font-medium shadow-sm">
                  ★ Move Mouse to Tilt
                </div>
              </div>

              {/* Content Box */}
              <div className="p-6 w-full sm:w-1/2 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 italic">
                    {plan.subtitle}
                  </p>
                  
                  {/* Property Specs */}
                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <div className="flex items-center text-sm font-medium text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mr-2.5"></span>
                      {plan.beds}
                    </div>
                    <div className="flex items-center text-sm font-medium text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mr-2.5"></span>
                      {plan.baths}
                    </div>
                    <div className="flex items-center text-sm font-medium text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mr-2.5"></span>
                      {plan.living}
                    </div>
                    <div className="flex items-center text-sm font-medium text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mr-2.5"></span>
                      {plan.kitchen}
                    </div>
                  </div>
                </div>

                <button className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-amber-500 hover:text-white text-white rounded-xl font-semibold text-sm transition-colors duration-300 shadow-sm">
                  View Details
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}