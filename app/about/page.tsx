"use client";
// app\about\page.tsx
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaStar, 
  FaChevronRight, 
  FaShieldAlt, 
  FaWarehouse, 
  FaBuilding, 
  FaChartLine, 
  FaHandshake,
  FaCommentDots
} from 'react-icons/fa';
import { HiHeart } from 'react-icons/hi';

// Three.js imports
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Canvas polyfill for roundRect
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x: number, y: number, w: number, h: number, r: number) {
    // Handle undefined or null r
    if (r === undefined || r === null) {
      r = 0;
    }
    // Ensure r is a number
    r = Number(r);
    // Apply the radius limits
    if (r > w / 2) r = w / 2;
    if (r > h / 2) r = h / 2;
    
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    return this;
  };
}

export default function AboutPageContent() {
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const [isThreeReady, setIsThreeReady] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  // Three.js Scene Setup - Optimized with Garbage Collection
  useEffect(() => {
    if (!threeContainerRef.current) return;

    const container = threeContainerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight || 500;
    let animationFrameId: number;

    // Track assets for absolute cleanup
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];
    const texturesToDispose: THREE.Texture[] = [];

    const trackGeometry = (g: THREE.BufferGeometry) => { geometriesToDispose.push(g); return g; };
    const trackMaterial = (m: THREE.Material) => { materialsToDispose.push(m); return m; };
    const trackTexture = (t: THREE.Texture) => { texturesToDispose.push(t); return t; };

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0f19);
    scene.fog = new THREE.Fog(0x0b0f19, 15, 30);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(12, 8, 16);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.set(0, 1.5, 0);
    controls.maxPolarAngle = Math.PI / 2.6;
    controls.minPolarAngle = Math.PI / 4;

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 0.35, 0.3, 0.15);
    composer.addPass(bloomPass);

    // ---- LIGHTS ----
    const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 2.5);
    sunLight.position.set(10, 15, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024; // Balanced for performance
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x4f8cff, 1.2);
    fillLight.position.set(-8, 5, -6);
    scene.add(fillLight);

    const pointLight = new THREE.PointLight(0xff6600, 2, 15);
    pointLight.position.set(0, 4, 0);
    scene.add(pointLight);

    // ---- GROUND PLANE ----
    const groundGeo = trackGeometry(new THREE.PlaneGeometry(30, 30));
    const groundMat = trackMaterial(new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.8,
      metalness: 0.2,
    }));
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(30, 30, 0x1e293b, 0x1e293b);
    gridHelper.position.y = -0.48;
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach(m => { m.transparent = true; m.opacity = 0.2; });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.2;
    }
    scene.add(gridHelper);

    // ---- BUILDINGS STRUCTURES ----
    const buildingGroup = new THREE.Group();

    // 1. Warehouse
    const mainGeo = trackGeometry(new THREE.BoxGeometry(4, 3.5, 6));
    const mainMat = trackMaterial(new THREE.MeshPhysicalMaterial({ color: 0x1e293b, metalness: 0.5, roughness: 0.5 }));
    const mainBuilding = new THREE.Mesh(mainGeo, mainMat);
    mainBuilding.position.set(-2, 1.25, 0);
    mainBuilding.castShadow = true;
    mainBuilding.receiveShadow = true;
    buildingGroup.add(mainBuilding);

    // Roof
    const roofGeo = trackGeometry(new THREE.BoxGeometry(4.4, 0.2, 6.4));
    const roofMat = trackMaterial(new THREE.MeshStandardMaterial({ color: 0x334155 }));
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(-2, 3.1, 0);
    buildingGroup.add(roof);

    // 2. Factory
    const factoryGeo = trackGeometry(new THREE.BoxGeometry(3, 2.5, 4));
    const factoryMat = trackMaterial(new THREE.MeshPhysicalMaterial({ color: 0x334155, metalness: 0.4, roughness: 0.6 }));
    const factory = new THREE.Mesh(factoryGeo, factoryMat);
    factory.position.set(3, 0.75, -0.5);
    factory.castShadow = true;
    buildingGroup.add(factory);

    scene.add(buildingGroup);

    // ---- PARTICLES ----
    const particleCount = 600; // Reduced for flawless mobile frame rates
    const particleGeometry = trackGeometry(new THREE.BufferGeometry());
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = trackMaterial(new THREE.PointsMaterial({
      size: 0.08,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // ---- ANIMATION LOOP ----
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      particleSystem.rotation.y += delta * 0.02;
      pointLight.position.x = Math.sin(elapsed * 0.5) * 3;
      pointLight.position.z = Math.cos(elapsed * 0.5) * 3;

      controls.update();
      composer.render();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    setIsThreeReady(true);

    // ---- RESIZE HANDLER ----
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // ---- CLEANUP METHOD ----
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Safe DOM removal
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose logic
      geometriesToDispose.forEach(g => g.dispose());
      materialsToDispose.forEach(m => m.dispose());
      texturesToDispose.forEach(t => t.dispose());
      
      renderer.dispose();
      composer.dispose();
    };
  }, []);

  // Data Objects
  const properties = [
    {
      id: 1,
      title: "Premium Warehouse Space",
      location: "Sector 63, Noida",
      price: "₹3.5 Lakh/Month",
      type: "Warehouse",
      area: "15,000 Sq.Ft",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
      badge: "Verified",
      badgeColor: "from-emerald-500 to-teal-600"
    },
    {
      id: 2,
      title: "Manufacturing Factory Complex",
      location: "Phase 2, Noida",
      price: "₹7.5 Lakh/Month",
      type: "Factory",
      area: "35,000 Sq.Ft",
      image: "https://images.unsplash.com/photo-1565034946487-077786996e27?auto=format&fit=crop&w=600&q=80",
      badge: "Hot Deal",
      badgeColor: "from-orange-500 to-red-600"
    },
    {
      id: 3,
      title: "Smart Logistics Warehouse",
      location: "Ecotech 3, Greater Noida",
      price: "₹12.5 Lakh/Month",
      type: "Warehouse",
      area: "50,000 Sq.Ft",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
      badge: "RERA Approved",
      badgeColor: "from-blue-500 to-indigo-600"
    },
    {
      id: 4,
      title: "Light Industrial Factory",
      location: "Hosiery Complex, Noida",
      price: "₹4.5 Lakh/Month",
      type: "Factory",
      area: "20,000 Sq.Ft",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
      badge: "New Listing",
      badgeColor: "from-purple-500 to-pink-600"
    }
  ];

  const projects = [
    {
      id: 1,
      name: "Logistics Park Alpha",
      developer: "Noida Industrial Developers",
      location: "Sector 80, Noida",
      type: "Warehouse Hub",
      units: 12,
      status: "Ready",
      image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Mega Production Tower",
      developer: "IndoSpace Clusters",
      location: "Sector 140A, Noida",
      type: "Industrial Facility",
      units: 8,
      status: "Under Construction",
      image: "https://images.unsplash.com/photo-1416339684178-3a239570f315?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Fulfillment Square",
      developer: "Expressway Logistics Group",
      location: "Sector 138, Noida",
      type: "E-commerce Hub",
      units: 24,
      status: "Pre-Launch",
      image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="w-full bg-slate-50 relative overflow-hidden selection:bg-blue-500 selection:text-white">
        
        {/* Background Blur Orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-[15%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10">

          {/* ===== 1. HERO SECTION WITH 3D CANVAS ===== */}
          <section className="relative overflow-hidden bg-slate-950 md:mt-4    shadow-2xl min-h-[620px] flex items-center">
            <div ref={threeContainerRef} className="absolute inset-0 w-full h-full opacity-60 md:opacity-80 z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/70 to-transparent z-10" />
            
            <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full">
              <div className="max-w-2xl">
                <div data-aos="fade-down" className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-[11px] font-bold tracking-wider uppercase mb-6 backdrop-blur-md">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  Industrial & Commercial Compliance Experts
                </div>
                
                <h1 data-aos="fade-up" data-aos-delay="100" className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
                  Lease Verified <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                    Factories & Warehouses
                  </span>
                </h1>
                
                <p data-aos="fade-up" data-aos-delay="200" className="text-slate-300 font-medium leading-relaxed max-w-xl mb-10 text-sm sm:text-base">
                  NoidaPropertyHub simplifies industrial setups. Access unmatched space compliance data, power grid specifications, and structural legal metrics across Noida's top 20 sectors.
                </p>
                
                <div data-aos="fade-up" data-aos-delay="300" className="flex flex-wrap gap-4">
                  <Link href="/contact" className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-600/30 active:scale-95">
                    Submit Requirements
                  </Link>
                  <Link href="#properties" className="px-7 py-3.5 border border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all backdrop-blur-sm">
                    Browse Active Inventory
                  </Link>
                </div>
              </div>
            </div>

            {/* Industrial Spec Strip */}
            <div className="absolute bottom-0 left-0 right-0 z-30 bg-slate-900/40 backdrop-blur-md border-t border-white/5 py-4 px-6 hidden md:block">
              <div className="max-w-7xl mx-auto flex justify-between items-center text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-2"><FaWarehouse className="text-blue-400" /> Pre-Screened High Ceiling Units</span>
                <span className="flex items-center gap-2"><FaShieldAlt className="text-emerald-400" /> 100% Legal & RERA Compliant</span>
                <span className="flex items-center gap-2"><FaChartLine className="text-purple-400" /> Verified Fire Safety Approved Layouts</span>
              </div>
            </div>
          </section>

          {/* ===== 2. SMART SEARCH BAR MODULE ===== */}
          <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-30">
            <div data-aos="zoom-in" className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <select className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                    <option>Select Workspace Category</option>
                    <option>Industrial Warehouse</option>
                    <option>Manufacturing Factory</option>
                    <option>Commercial Complex</option>
                  </select>
                </div>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <select className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm font-semibold outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                    <option>Select Preferred Sector</option>
                    <option>Sector 63, Noida</option>
                    <option>Phase 2, Noida</option>
                    <option>Ecotech 3, Greater Noida</option>
                  </select>
                </div>
                <button className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-md">
                  <FaSearch className="w-3 h-3" /> Search Active Registry
                </button>
              </div>
            </div>
          </section>

         {/* ===== 3. WHY CHOOSE US CARDS ===== */}
    <section className="max-w-7xl mx-auto px-6 py-24 bg-white">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-2 block">
          Operational Framework
        </span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Why Corporate Enterprises Trust Us
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            icon: <FaChartLine className="w-5 h-5 text-white" />, 
            title: "Targeted Market Intelligence", 
            desc: "Access structured real-time price metrics, circle rates, and availability indexes across 20 production sectors.", 
            gradient: "from-orange-500 via-amber-500 to-red-500" // Orange + Yellow + Red Mix
          },
          { 
            icon: <FaShieldAlt className="w-5 h-5 text-white" />, 
            title: "Strict Structural Compliance", 
            desc: "Every listed setup is pre-screened for power load configurations, height clearing, and safety setup frameworks.", 
            gradient: "from-cyan-500 via-blue-500 to-indigo-600" // Blue + Greenish-Cyan Mix
          },
          { 
            icon: <FaHandshake className="w-5 h-5 text-white" />, 
            title: "End-to-End Lease Management", 
            desc: "From local authority sub-leasing documentation to final handover setup, we organize the entire operational chain.", 
            gradient: "from-emerald-500 via-teal-500 to-cyan-600" // Green + Teal/Blue Mix
          }
        ].map((box, i) => (
          <div 
            key={i} 
            data-aos="fade-up" 
            data-aos-delay={i * 100} 
            className={`bg-gradient-to-br ${box.gradient} p-8 rounded-2xl shadow-xl shadow-slate-200/50 flex flex-col justify-between transform transition-transform duration-300 hover:-translate-y-1`}
          >
            <div>
              {/* Icon Wrapper */}
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 bg-white/20 border border-white/30 backdrop-blur-sm">
                {box.icon}
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold text-white mb-2.5 tracking-wide">
                {box.title}
              </h4>

              {/* Description */}
              <p className="text-sm text-white/90 leading-relaxed font-medium">
                {box.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>

          {/* ===== 4. PROPERTY PORTFOLIO HUB ===== */}
          <section id="properties" className="py-20 bg-white border-y border-slate-200/60">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-blue-600 uppercase block">Premium Selection</span>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Featured Active Listings</h2>
                </div>
                <Link href="/properties" className="text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                  View Full Inventory <FaChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {properties.map((property, idx) => (
                  <div key={property.id} data-aos="fade-up" data-aos-delay={idx * 50} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/70 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="relative h-48 bg-slate-200 overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                      <span className={`absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r ${property.badgeColor} text-white text-[9px] font-black uppercase tracking-wider rounded-md`}>
                        {property.badge}
                      </span>
                      <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm transition-all active:scale-90">
                        <HiHeart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-extrabold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">{property.type}</span>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-auto mt-2 line-clamp-1">{property.title}</h4>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-semibold">
                          <FaMapMarkerAlt className="w-2.5 h-2.5 text-slate-400" /> {property.location}
                        </p>
                      </div>
                      
                      <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Lease Rate</p>
                          <p className="text-sm font-black text-slate-900">{property.price}</p>
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 bg-slate-200/70 px-2 py-1 rounded-md">{property.area}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 5. PROJECT BUILD PIPELINES ===== */}
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[11px] font-bold tracking-widest text-blue-600 uppercase block">Project Catalogs</span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Latest Industrial Parks</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {projects.map((project, idx) => (
                  <div key={project.id} data-aos="fade-up" data-aos-delay={idx * 100} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img src={project.image} alt={project.name} loading="lazy" className="w-full h-full object-cover" />
                      <span className="absolute top-4 right-4 px-2.5 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider rounded-md">
                        {project.status}
                      </span>
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-slate-900 text-lg leading-snug">{project.name}</h4>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">{project.developer}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-3 font-medium">
                        <FaMapMarkerAlt className="w-2.5 h-2.5 text-blue-500" /> {project.location}
                      </p>
                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>{project.type}</span>
                        <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{project.units} Slots Left</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 6. FAQ DETAILS INTERFACE ===== */}
          <section className="py-24 bg-white border-t border-slate-200/60">
            <div className="max-w-3xl mx-auto px-6">
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold tracking-widest text-blue-600 uppercase block">Information Bureau</span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-3">
                {[
                  { q: "How does the site selection process work?", a: "We analyze your required space scale, high-tension electrical load requirements (KW), floor structural weights, and heavy transport entry metrics. Then, we match listings seamlessly across Noida's top industrial sectors." },
                  { q: "Do you handle local authority documentation?", a: "Yes. NoidaPropertyHub handles the operational paperwork completely, including Transfer of Memorandum (TM) assets setup, local sub-lease registration permits, and RERA verification map layouts." },
                  { q: "What is the standard lease cycle framework?", a: "Industrial setups utilize long-term corporate leases running for 3, 5, or 9 years. Lock-in metrics and predefined rental compounding terms are pre-drafted clearly within legal agreements." }
                ].map((faq, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden transition-all duration-200 hover:border-slate-300">
                    <details className="group">
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-900 text-sm sm:text-base select-none">
                        <span>{faq.q}</span>
                        <FaChevronRight className="w-3.5 h-3.5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                      </summary>
                      <p className="px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">{faq.a}</p>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== 7. CONVERSION BANNER CALL-TO-ACTION ===== */}
          <section className="max-w-5xl mx-auto px-4 py-20">
            <div data-aos="zoom-in" className="relative rounded-3xl bg-slate-950 p-8 sm:p-14 text-center shadow-2xl border border-slate-900 overflow-hidden">
              <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80" alt="Grid Asset" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
                  Ready to Optimize Your Industrial Footprint?
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto text-xs sm:text-sm font-medium mb-8 leading-relaxed">
                  Connect with our dedicated logistics and manufacturing desk today to lock in customized rental assets with complete legal and structural safety.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
                  <Link href="/contact" className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl text-center shadow-lg shadow-blue-600/20 transition-transform active:scale-95">
                    Talk to an Expert
                  </Link>
                  <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl text-center flex items-center justify-center gap-2 transition-transform active:scale-95">
                    <FaCommentDots className="w-4 h-4" /> WhatsApp Desk
                  </a>
                </div>
              </div>
            </div>
          </section>

          <Footer />

        </div>
      </div>
    </>
  );
}