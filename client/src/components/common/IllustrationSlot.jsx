import React from 'react';

export const IllustrationSlot = ({ name, className = '', alt = '' }) => {
  switch (name) {
    case 'hero-valley':
      return (
        <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
          {/* Rich SVG Landscape Illustration matching the mock (hills, river, pine trees, traveler on rock) */}
          <svg viewBox="0 0 1200 680" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF3DC" />
                <stop offset="50%" stopColor="#FDE6C8" />
                <stop offset="100%" stopColor="#E2F0E6" />
              </linearGradient>
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#89C4D4" />
                <stop offset="50%" stopColor="#5B9BB0" />
                <stop offset="100%" stopColor="#3F7E94" />
              </linearGradient>
              <linearGradient id="mountainBack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B3CDBC" />
                <stop offset="100%" stopColor="#89A893" />
              </linearGradient>
              <linearGradient id="mountainMid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6E947A" />
                <stop offset="100%" stopColor="#4A7057" />
              </linearGradient>
              <linearGradient id="mountainFront" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3C5C45" />
                <stop offset="100%" stopColor="#253D2D" />
              </linearGradient>
              <linearGradient id="rockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8E7864" />
                <stop offset="100%" stopColor="#5C4A3A" />
              </linearGradient>
            </defs>

            {/* Sky */}
            <rect width="1200" height="680" fill="url(#skyGrad)" />

            {/* Soft Clouds & Sun rays */}
            <circle cx="680" cy="180" r="160" fill="#FFE8C0" opacity="0.4" />
            <path d="M200 120 Q300 90 450 130 T700 110" stroke="#FFFFFF" strokeWidth="24" strokeLinecap="round" opacity="0.5" fill="none" />
            <path d="M750 160 Q850 140 1000 170" stroke="#FFFFFF" strokeWidth="18" strokeLinecap="round" opacity="0.4" fill="none" />

            {/* Distant Mountains */}
            <path d="M0 380 Q250 200 500 320 T950 220 Q1100 280 1200 360 L1200 680 L0 680 Z" fill="url(#mountainBack)" opacity="0.7" />

            {/* Mid Hills & Forest Ridge */}
            <path d="M0 420 Q200 280 460 380 T900 340 Q1080 300 1200 440 L1200 680 L0 680 Z" fill="url(#mountainMid)" />

            {/* Winding Blue River flowing through the valley */}
            <path d="M520 340 C 580 400, 480 440, 560 490 C 640 540, 440 580, 580 680 L 460 680 C 340 590, 520 540, 460 480 C 400 420, 500 370, 500 340 Z" fill="url(#riverGrad)" />

            {/* River Shimmer Ripples */}
            <path d="M520 420 Q550 425 570 420" stroke="#D1EFF8" strokeWidth="3" strokeLinecap="round" opacity="0.8" fill="none" />
            <path d="M500 460 Q530 465 560 460" stroke="#D1EFF8" strokeWidth="4" strokeLinecap="round" opacity="0.8" fill="none" />
            <path d="M520 520 Q560 528 600 520" stroke="#D1EFF8" strokeWidth="5" strokeLinecap="round" opacity="0.8" fill="none" />
            <path d="M480 580 Q530 590 580 580" stroke="#D1EFF8" strokeWidth="6" strokeLinecap="round" opacity="0.8" fill="none" />

            {/* Foreground Lush Trees on the left */}
            <path d="M-60 260 Q80 240 160 340 T220 560 Q180 680 0 680 Z" fill="url(#mountainFront)" />
            {/* Pine tree silhouettes */}
            <polygon points="120,440 90,520 150,520" fill="#1C3022" />
            <polygon points="120,400 95,460 145,460" fill="#1C3022" />
            <polygon points="180,470 150,550 210,550" fill="#182A1E" />
            <polygon points="180,430 158,490 202,490" fill="#182A1E" />

            {/* Foreground Cliff Rock on the right (Where learner sits) */}
            <path d="M720 680 Q780 480 940 440 Q1100 460 1220 540 L1220 680 Z" fill="url(#rockGrad)" />
            <path d="M820 680 L880 540 L1020 520 L1150 680 Z" fill="#4A3B2D" opacity="0.5" />

            {/* Learner Sitting on Rock with Backpack */}
            <g transform="translate(860, 360)">
              {/* Backpack */}
              <rect x="2" y="48" width="28" height="38" rx="8" fill="#1F4E5B" />
              <rect x="8" y="54" width="16" height="14" rx="4" fill="#3D7B8C" />
              {/* Torso & Jacket */}
              <path d="M24 42 Q32 38 42 42 L48 86 L20 86 Z" fill="#C26D45" />
              {/* Legs sitting over ledge */}
              <path d="M24 84 L48 84 L56 120 L44 124 L36 96 L20 118 L8 114 Z" fill="#2B3A4A" />
              {/* Head & Hair */}
              <circle cx="34" cy="26" r="14" fill="#543825" />
              <circle cx="34" cy="24" r="12" fill="#2B1A0E" />
            </g>
          </svg>
        </div>
      );

    case 'desk-learner':
      return (
        <div className={`w-full h-full flex items-center justify-center bg-[#FDF7EE] rounded-2xl p-4 select-none ${className}`}>
          <svg viewBox="0 0 240 180" className="w-full h-full max-h-40">
            <rect width="240" height="180" rx="16" fill="#FBF3E4" />
            {/* Window with sun */}
            <rect x="150" y="20" width="60" height="70" rx="8" fill="#E8F4F8" stroke="#D8C6A5" strokeWidth="2" />
            <circle cx="180" cy="50" r="14" fill="#FFDC8B" />
            {/* Desk */}
            <rect x="30" y="115" width="180" height="10" rx="4" fill="#B68B5E" />
            <rect x="45" y="125" width="10" height="40" fill="#9F7549" />
            <rect x="185" y="125" width="10" height="40" fill="#9F7549" />
            {/* Laptop */}
            <polygon points="120,85 160,85 165,115 115,115" fill="#34483D" />
            <rect x="124" y="88" width="32" height="22" rx="2" fill="#89C4D4" />
            {/* Learner */}
            <circle cx="85" cy="70" r="14" fill="#3D261A" />
            <path d="M72 86 C 72 86, 85 80, 98 86 L 95 125 L 75 125 Z" fill="#687C6B" />
            <path d="M88 95 L 125 108" stroke="#C88E68" strokeWidth="5" strokeLinecap="round" />
            {/* Small potted plant on desk */}
            <rect x="42" y="100" width="14" height="15" rx="3" fill="#C9822B" />
            <circle cx="49" cy="94" r="7" fill="#687C6B" />
          </svg>
        </div>
      );

    case 'discipline-mountain':
      return (
        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-b from-[#F5D8BA] to-[#B98160] rounded-2xl relative overflow-hidden select-none ${className}`}>
          <svg viewBox="0 0 200 260" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="sunsetSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F9E2AF" />
                <stop offset="60%" stopColor="#E89B72" />
                <stop offset="100%" stopColor="#9C5A48" />
              </linearGradient>
            </defs>
            <rect width="200" height="260" fill="url(#sunsetSky)" />
            <circle cx="100" cy="90" r="38" fill="#FFF0D0" opacity="0.6" />
            {/* Mountains */}
            <polygon points="0,260 60,150 130,260" fill="#5F3B36" opacity="0.7" />
            <polygon points="70,260 140,130 200,260" fill="#4A2A28" opacity="0.85" />
            <polygon points="20,260 100,180 180,260" fill="#301A1B" />
            {/* Standing traveler on peak */}
            <circle cx="150" cy="115" r="4" fill="#1A1010" />
            <rect x="147" y="119" width="6" height="12" rx="1" fill="#1A1010" />
            <rect x="144" y="121" width="3" height="7" rx="1" fill="#1A1010" />
          </svg>
        </div>
      );

    case 'thinking-learner':
      return (
        <div className={`w-full h-full flex items-center justify-center p-3 select-none ${className}`}>
          <svg viewBox="0 0 200 180" className="w-full h-full max-h-44">
            {/* Soft background aura */}
            <circle cx="100" cy="95" r="65" fill="#FDF3E3" />
            {/* Lightbulb idea spark */}
            <circle cx="145" cy="40" r="14" fill="#FFDC73" />
            <path d="M145 22 L145 16 M160 30 L166 26 M130 30 L124 26" stroke="#B68B5E" strokeWidth="2.5" strokeLinecap="round" />
            {/* Female Learner thinking with hand on chin */}
            <circle cx="100" cy="72" r="22" fill="#2E1C14" />
            <circle cx="100" cy="74" r="18" fill="#D99B77" />
            {/* Hair */}
            <path d="M78 68 C 78 50, 122 50, 122 68 C 122 85, 116 100, 116 100 L 84 100 Z" fill="#2E1C14" />
            <path d="M80 75 Q100 62 120 75" fill="#2E1C14" />
            {/* Eyes looking up */}
            <circle cx="94" cy="72" r="2.5" fill="#1F2A24" />
            <circle cx="106" cy="72" r="2.5" fill="#1F2A24" />
            <path d="M96 82 Q100 86 104 82" stroke="#1F2A24" strokeWidth="1.5" fill="none" />
            {/* Shirt / Shoulders */}
            <path d="M70 120 C 70 100, 130 100, 130 120 L 130 150 L 70 150 Z" fill="#4B6F58" />
            {/* Hand thinking */}
            <path d="M110 115 L 105 88" stroke="#D99B77" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'small-sprout':
      return (
        <div className="w-16 h-16 flex items-center justify-center bg-[#E5ECE6] rounded-2xl shadow-sm">
          <svg viewBox="0 0 64 64" className="w-10 h-10">
            {/* Clay pot */}
            <polygon points="18,38 46,38 42,56 22,56" fill="#B68B5E" />
            <rect x="16" y="34" width="32" height="5" rx="2" fill="#9F7549" />
            {/* Sprout stem and 2 leaves */}
            <path d="M32 34 Q32 20 32 16" stroke="#4A7057" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M32 22 Q42 16 44 26 Q36 28 32 24" fill="#687C6B" />
            <path d="M32 18 Q22 12 20 22 Q28 24 32 20" fill="#4A7057" />
          </svg>
        </div>
      );

    default:
      return (
        <div className={`bg-clay-cream rounded-2xl flex items-center justify-center text-clay-olive font-display text-xs p-4 ${className}`}>
          {alt || 'Illustration'}
        </div>
      );
  }
};
