import React from 'react';

interface Props {
    className?: string;
}

const CranesDecor: React.FC<Props> = ({ className }) => (
    <svg
        viewBox="0 0 460 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        <defs>
            <radialGradient id="cm-fade" cx="50%" cy="55%" r="52%">
                <stop offset="30%"  stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="cm">
                <rect x="0" y="0" width="460" height="170" fill="url(#cm-fade)" />
            </mask>

            <filter id="cf" x="-6%" y="-8%" width="112%" height="116%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="8" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8"
                    xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Large crane — near-black body, wings fade grey → primary → transparent */}
            <radialGradient id="c1-body" cx="54%" cy="58%" r="50%">
                <stop offset="0%"   stopColor="#111111" />
                <stop offset="100%" stopColor="#2E3A70" />
            </radialGradient>
            <linearGradient id="c1-wl" gradientUnits="userSpaceOnUse" x1="220" y1="96" x2="135" y2="48">
                <stop offset="0%"   stopColor="#111111" stopOpacity="1" />
                <stop offset="45%"  stopColor="#3B4A8C" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#3B4A8C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="c1-wlb" gradientUnits="userSpaceOnUse" x1="220" y1="100" x2="145" y2="134">
                <stop offset="0%"   stopColor="#1A1A1A" stopOpacity="0.9" />
                <stop offset="45%"  stopColor="#3B4A8C" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#3B4A8C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="c1-wr" gradientUnits="userSpaceOnUse" x1="250" y1="96" x2="328" y2="48">
                <stop offset="0%"   stopColor="#111111" stopOpacity="0.9" />
                <stop offset="45%"  stopColor="#2E3A70" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3B4A8C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="c1-wrb" gradientUnits="userSpaceOnUse" x1="250" y1="100" x2="322" y2="130">
                <stop offset="0%"   stopColor="#1A1A1A" stopOpacity="0.85" />
                <stop offset="45%"  stopColor="#2E3A70" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#3B4A8C" stopOpacity="0" />
            </linearGradient>

            {/* Small crane */}
            <linearGradient id="c2-wl" gradientUnits="userSpaceOnUse" x1="100" y1="39" x2="54" y2="16">
                <stop offset="0%"   stopColor="#1A1A1A" stopOpacity="0.85" />
                <stop offset="50%"  stopColor="#3B4A8C" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3B4A8C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="c2-wr" gradientUnits="userSpaceOnUse" x1="118" y1="39" x2="163" y2="15">
                <stop offset="0%"   stopColor="#111111" stopOpacity="0.8" />
                <stop offset="50%"  stopColor="#2E3A70" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#3B4A8C" stopOpacity="0" />
            </linearGradient>
        </defs>

        <g mask="url(#cm)" filter="url(#cf)">
            {/* Crane 1 */}
            <path d="M245 98 C228 90 213 87 208 94 C203 101 210 114 228 119 C246 124 264 116 263 106 C262 96 255 103 245 98Z"
                fill="url(#c1-body)" />
            <path d="M220 93 C196 78 168 62 135 48 C170 65 198 81 220 93Z"       fill="url(#c1-wl)" />
            <path d="M220 100 C200 109 174 120 145 134 C175 118 202 107 220 100Z" fill="url(#c1-wlb)" />
            <path d="M250 93 C274 78 298 62 328 48 C296 64 271 79 250 93Z"        fill="url(#c1-wr)" />
            <path d="M250 100 C270 108 294 118 322 130 C292 118 268 107 250 100Z" fill="url(#c1-wrb)" />
            <path d="M258 88 C270 76 282 60 292 46" stroke="url(#c1-wl)" strokeWidth="7" strokeLinecap="round" />
            <circle cx="296" cy="41" r="8" fill="#111111" />
            <ellipse cx="294" cy="33" rx="3.5" ry="2.5" fill="#C03030" opacity="0.7" />
            <path d="M303 41 L322 38" stroke="#111111" strokeWidth="4" strokeLinecap="round" />
            <path d="M212 107 L196 135 L188 150" stroke="url(#c1-wlb)" strokeWidth="3"   strokeLinecap="round" />
            <path d="M220 110 L208 138"           stroke="url(#c1-wlb)" strokeWidth="2.5" strokeLinecap="round" />

            {/* Crane 2 */}
            <path d="M115 42 C104 37 96 35 93 40 C90 45 96 53 108 57 C120 61 131 54 130 47 C129 40 120 45 115 42Z"
                fill="#1A1A1A" opacity="0.85" />
            <path d="M100 39 C86 31 70 23 54 16 C72 25 88 33 100 39Z"      fill="url(#c2-wl)" />
            <path d="M100 44 C88 50 74 57 58 65 C74 55 89 48 100 44Z"      fill="url(#c2-wl)" opacity="0.7" />
            <path d="M118 39 C132 31 146 23 163 15 C145 25 131 33 118 39Z" fill="url(#c2-wr)" />
            <path d="M118 44 C130 50 144 57 160 65 C144 55 129 48 118 44Z" fill="url(#c2-wr)" opacity="0.65" />
            <path d="M125 36 C132 28 140 19 148 12" stroke="#1A1A1A" strokeWidth="4.5" strokeLinecap="round" opacity="0.8" />
            <circle cx="151" cy="8" r="5.5" fill="#1A1A1A" opacity="0.8" />
            <path d="M156 8 L169 6"        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
            <path d="M97 47 L88 65 L83 74" stroke="#1A1A1A" strokeWidth="2"   strokeLinecap="round" opacity="0.7" />
        </g>
    </svg>
);

export default CranesDecor;
