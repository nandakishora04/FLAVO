import React, { useState } from 'react';
import { Navigation, ZoomIn, ZoomOut, Compass, BatteryCharging, Gauge } from 'lucide-react';
import { LiveOrder } from '../types';

interface BangaloreLiveMapProps {
  order: LiveOrder;
}

export const BangaloreLiveMap: React.FC<BangaloreLiveMapProps> = ({ order }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [centerOnRider, setCenterOnRider] = useState<boolean>(true);

  const restCoords = order.restaurant.areaCoords;
  const riderCoords = order.currentRiderCoords;
  // Fallback destination coordinates based on Bangalore center
  const destCoords = { x: 58, y: 44 };

  // Calculate angle of rider heading
  const deltaX = destCoords.x - restCoords.x;
  const deltaY = destCoords.y - restCoords.y;
  const angleDeg = Math.round((Math.atan2(deltaY, deltaX) * 180) / Math.PI);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] bg-[#121820] rounded-2xl overflow-hidden border border-stone-800 shadow-inner select-none">
      
      {/* Map SVG Canvas */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full transition-transform duration-300"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: centerOnRider ? `${riderCoords.x}% ${riderCoords.y}%` : '50% 50%'
        }}
      >
        <defs>
          {/* Subtle grid pattern for road network background */}
          <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1f2937" strokeWidth="0.4" />
          </pattern>

          {/* Glowing linear gradient for active delivery route */}
          <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4b26" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff8a00" stopOpacity="1" />
          </linearGradient>

          {/* Filter for glow */}
          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Grid Texture */}
        <rect width="100" height="100" fill="#121820" />
        <rect width="100" height="100" fill="url(#gridPattern)" />

        {/* Bangalore Road Network Lines (Major Corridors: Outer Ring Rd, Old Airport Rd, 100ft Rd, Hosur Rd) */}
        <g stroke="#263342" strokeWidth="1.2" strokeLinecap="round">
          {/* Outer Ring Road loop */}
          <path d="M 15 20 Q 50 10 85 25 T 75 85 Q 40 90 20 70 Z" fill="none" stroke="#22303c" strokeWidth="1.8" />
          {/* 100 Feet Road Corridor */}
          <line x1="30" y1="35" x2="70" y2="55" stroke="#2a3a4c" strokeWidth="1.5" />
          {/* Old Airport Road */}
          <line x1="45" y1="20" x2="65" y2="80" stroke="#2a3a4c" strokeWidth="1.5" />
          {/* CMH Road */}
          <line x1="20" y1="45" x2="80" y2="45" stroke="#2a3a4c" strokeWidth="1.4" />
          {/* Intermediate roads */}
          <line x1="50" y1="30" x2="75" y2="35" />
          <line x1="35" y1="60" x2="65" y2="65" />
          <line x1="55" y1="40" x2="55" y2="70" />
        </g>

        {/* Major Bangalore Landmarks Labels */}
        <g fill="#475569" fontSize="2.2" fontFamily="sans-serif" fontWeight="600">
          <text x="56" y="38">Indiranagar Metro</text>
          <text x="46" y="65">Koramangala 4th Block</text>
          <text x="35" y="24">Malleshwaram 8th Cross</text>
          <text x="64" y="82">HSR Layout BDA</text>
          <text x="75" y="48">Domlur Flyover</text>
        </g>

        {/* Active Route Polyline from Restaurant to Customer */}
        <path
          d={`M ${restCoords.x} ${restCoords.y} Q ${(restCoords.x + destCoords.x) / 2 + 3} ${(restCoords.y + destCoords.y) / 2 - 2} ${destCoords.x} ${destCoords.y}`}
          fill="none"
          stroke="#334155"
          strokeWidth="1.6"
          strokeDasharray="2 1.5"
        />

        {/* Glowing Traveled Route Segment */}
        <path
          d={`M ${restCoords.x} ${restCoords.y} Q ${(restCoords.x + riderCoords.x) / 2 + 1.5} ${(restCoords.y + riderCoords.y) / 2 - 1} ${riderCoords.x} ${riderCoords.y}`}
          fill="none"
          stroke="url(#routeGlow)"
          strokeWidth="2.2"
          strokeLinecap="round"
          filter="url(#neonGlow)"
        />

        {/* 1. Restaurant Marker (Origin) */}
        <g transform={`translate(${restCoords.x}, ${restCoords.y})`}>
          {/* Radar ripple if preparing */}
          {order.status === 'preparing' && (
            <circle r="4" fill="none" stroke="#ff4b26" strokeWidth="0.5" opacity="0.8">
              <animate attributeName="r" from="2" to="7" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.8" to="0" dur="1.8s" repeatCount="indefinite" />
            </circle>
          )}
          <circle r="2.8" fill="#ff4b26" stroke="#ffffff" strokeWidth="0.8" />
          <text x="0" y="1" textAnchor="middle" fill="#ffffff" fontSize="1.8" fontWeight="bold">🏪</text>
          {/* Tag */}
          <rect x="-10" y="-7.5" width="20" height="4.5" rx="1" fill="#1e293b" stroke="#334155" strokeWidth="0.4" />
          <text x="0" y="-4.5" textAnchor="middle" fill="#f8fafc" fontSize="1.8" fontWeight="bold">
            {order.restaurant.name.slice(0, 12)}
          </text>
        </g>

        {/* 2. Customer Destination Marker */}
        <g transform={`translate(${destCoords.x}, ${destCoords.y})`}>
          <circle r="2.8" fill="#10b981" stroke="#ffffff" strokeWidth="0.8" />
          <text x="0" y="1" textAnchor="middle" fill="#ffffff" fontSize="1.8" fontWeight="bold">🏠</text>
          {/* Tag */}
          <rect x="-8" y="-7" width="16" height="4" rx="1" fill="#064e3b" stroke="#10b981" strokeWidth="0.4" />
          <text x="0" y="-4.3" textAnchor="middle" fill="#ecfdf5" fontSize="1.6" fontWeight="bold">
            Your Doorstep
          </text>
        </g>

        {/* 3. Real-time Animated Delivery Partner Rider (Scooter) */}
        <g transform={`translate(${riderCoords.x}, ${riderCoords.y})`}>
          {/* Headlight beam */}
          <polygon
            points="0,0 -4,-8 4,-8"
            fill="#facc15"
            opacity="0.15"
            transform={`rotate(${angleDeg + 90})`}
          />
          {/* Rider ping pulse */}
          <circle r="3.2" fill="#ff4b26" opacity="0.3" className="animate-ping" />
          <circle r="2.5" fill="#ffffff" stroke="#ff4b26" strokeWidth="1" />
          <text x="0" y="0.8" textAnchor="middle" fontSize="1.7">🛵</text>
          
          {/* Rider Name Tag with Live Speed */}
          <rect x="-11" y="4" width="22" height="4" rx="1" fill="#0f172a" stroke="#ff4b26" strokeWidth="0.4" />
          <text x="0" y="6.6" textAnchor="middle" fill="#ffffff" fontSize="1.6" fontWeight="bold">
            {order.deliveryPartner.name.split(' ')[0]} · {order.riderSpeedKmh}km/h
          </text>
        </g>
      </svg>

      {/* Top Map HUD overlay: Live Telemetry */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
        <div className="px-3 py-1.5 bg-stone-900/90 backdrop-blur-md rounded-xl border border-stone-700/80 text-white flex items-center gap-3 text-xs shadow-md">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-[#ff4b26]" />
            <span className="font-mono font-bold tabular-nums">{order.riderSpeedKmh} km/h</span>
          </div>
          <span className="text-stone-500">·</span>
          <div className="flex items-center gap-1.5">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px] text-stone-300">Ather EV 78%</span>
          </div>
          <span className="text-stone-500 hidden sm:inline">·</span>
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-stone-300">
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>Heading North-East</span>
          </div>
        </div>

        {/* Live GPS badge */}
        <div className="px-2.5 py-1 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 rounded-xl text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE GPS</span>
        </div>
      </div>

      {/* Map Control Buttons */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.25))}
          className="w-8 h-8 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 flex items-center justify-center transition-colors cursor-pointer shadow-md"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.25))}
          className="w-8 h-8 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 flex items-center justify-center transition-colors cursor-pointer shadow-md"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setCenterOnRider(!centerOnRider)}
          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shadow-md ${
            centerOnRider
              ? 'bg-[#ff4b26] border-[#ff4b26] text-white'
              : 'bg-stone-900/80 hover:bg-stone-800 text-stone-200 border-stone-700'
          }`}
          title="Center on Rider"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Road Name Kicker */}
      <div className="absolute bottom-3 left-3 px-3 py-1 bg-stone-900/90 backdrop-blur-md rounded-lg border border-stone-700 text-[11px] text-stone-300 pointer-events-none">
        Cruising near <strong className="text-white">100ft Road / Domlur Intermediate Ring</strong>
      </div>
    </div>
  );
};
