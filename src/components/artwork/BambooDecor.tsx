import React from 'react';

interface Props {
    className?: string;
}

const BambooDecor: React.FC<Props> = ({ className }) => (
    <svg
        viewBox="0 0 240 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        <defs>
            {/* Fade mask: transparent at top → opaque at 35% */}
            <linearGradient id="bm-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="white" stopOpacity="0" />
                <stop offset="35%"  stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <mask id="bm">
                <rect x="0" y="0" width="240" height="500" fill="url(#bm-fade)" />
            </mask>

            {/* Brush displacement */}
            <filter id="bf" x="-4%" y="-2%" width="108%" height="104%">
                <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="5" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2"
                    xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* Stalk: near-black at bottom → grey → brand primary at top */}
            <linearGradient id="stalk-col" gradientUnits="userSpaceOnUse" x1="0" y1="500" x2="0" y2="0">
                <stop offset="0%"   stopColor="#111111" />
                <stop offset="45%"  stopColor="#3A3A3A" />
                <stop offset="100%" stopColor="#3B4A8C" />
            </linearGradient>

            {/* Leaf gradients: primary → grey → transparent */}
            <linearGradient id="lf1" gradientUnits="userSpaceOnUse" x1="49" y1="90" x2="10" y2="14">
                <stop offset="0%"   stopColor="#3B4A8C" stopOpacity="0.85" />
                <stop offset="55%"  stopColor="#555555" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lf2" gradientUnits="userSpaceOnUse" x1="49" y1="90" x2="90" y2="22">
                <stop offset="0%"   stopColor="#2E3A70" stopOpacity="0.8" />
                <stop offset="55%"  stopColor="#4A4A4A" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lf3" gradientUnits="userSpaceOnUse" x1="50" y1="225" x2="8" y2="155">
                <stop offset="0%"   stopColor="#3B4A8C" stopOpacity="0.85" />
                <stop offset="55%"  stopColor="#555555" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lf4" gradientUnits="userSpaceOnUse" x1="50" y1="225" x2="98" y2="163">
                <stop offset="0%"   stopColor="#2E3A70" stopOpacity="0.8" />
                <stop offset="55%"  stopColor="#4A4A4A" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lf5" gradientUnits="userSpaceOnUse" x1="149" y1="108" x2="110" y2="38">
                <stop offset="0%"   stopColor="#3B4A8C" stopOpacity="0.85" />
                <stop offset="55%"  stopColor="#555555" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lf6" gradientUnits="userSpaceOnUse" x1="149" y1="108" x2="190" y2="48">
                <stop offset="0%"   stopColor="#2E3A70" stopOpacity="0.8" />
                <stop offset="55%"  stopColor="#4A4A4A" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lf7" gradientUnits="userSpaceOnUse" x1="147" y1="214" x2="108" y2="148">
                <stop offset="0%"   stopColor="#3B4A8C" stopOpacity="0.8" />
                <stop offset="55%"  stopColor="#555555" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lf8" gradientUnits="userSpaceOnUse" x1="147" y1="214" x2="190" y2="154">
                <stop offset="0%"   stopColor="#2E3A70" stopOpacity="0.75" />
                <stop offset="55%"  stopColor="#4A4A4A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </linearGradient>
        </defs>

        <g mask="url(#bm)" filter="url(#bf)">
            {/* Stalk 1 */}
            <path
                d="M52 500 C50 455 54 410 51 365 C48 320 53 275 50 230 C47 185 52 140 49 95 C47 58 50 22 48 4"
                stroke="url(#stalk-col)" strokeWidth="10" strokeLinecap="round"
            />
            <path d="M41 365 Q50 361 60 365" stroke="url(#stalk-col)" strokeWidth="3"   strokeLinecap="round" />
            <path d="M40 230 Q49 226 59 230" stroke="url(#stalk-col)" strokeWidth="3"   strokeLinecap="round" />
            <path d="M40  95 Q49  91 59  95" stroke="url(#stalk-col)" strokeWidth="3"   strokeLinecap="round" />

            <path d="M49 90 C26 68 8 40 12 14 C18 40 29 65 49 90Z"  fill="url(#lf1)" />
            <path d="M49 90 C73 72 90 48 89 22 C80 48 68 68 49 90Z" fill="url(#lf2)" />
            <path d="M50 225 C25 205 6 180 9 155 C17 180 29 202 50 225Z"  fill="url(#lf3)" />
            <path d="M50 225 C77 210 94 188 96 163 C84 188 71 207 50 225Z" fill="url(#lf4)" />

            {/* Stalk 2 */}
            <path
                d="M143 500 C147 452 141 405 145 358 C149 311 143 264 148 220 C152 180 146 148 150 112"
                stroke="url(#stalk-col)" strokeWidth="8" strokeLinecap="round"
            />
            <path d="M135 358 Q145 354 155 358" stroke="url(#stalk-col)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M136 220 Q146 216 156 220" stroke="url(#stalk-col)" strokeWidth="2.5" strokeLinecap="round" />

            <path d="M149 108 C124 88 108 62 112 38 C120 62 131 85 149 108Z"  fill="url(#lf5)" />
            <path d="M149 108 C176 94 192 72 190 48 C180 72 166 91 149 108Z"  fill="url(#lf6)" />
            <path d="M147 214 C122 196 106 172 109 148 C118 172 130 193 147 214Z" fill="url(#lf7)" />
            <path d="M147 214 C174 200 190 178 190 154 C178 178 164 197 147 214Z" fill="url(#lf8)" />
        </g>
    </svg>
);

export default BambooDecor;
