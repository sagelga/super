import React from 'react';

interface Props {
    className?: string;
}

const WaveDecor: React.FC<Props> = ({ className }) => (
    <svg
        viewBox="0 0 600 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden="true"
    >
        <defs>
            <linearGradient id="wm-fade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="white" stopOpacity="0" />
                <stop offset="15%"  stopColor="white" stopOpacity="1" />
                <stop offset="85%"  stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="wm">
                <rect x="0" y="0" width="600" height="80" fill="url(#wm-fade)" />
            </mask>

            <filter id="wf" x="-3%" y="-20%" width="106%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.025 0.08" numOctaves="3" seed="12" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5"
                    xChannelSelector="R" yChannelSelector="G" />
            </filter>

            <linearGradient id="wave-main" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="0">
                <stop offset="0%"   stopColor="#111111" />
                <stop offset="35%"  stopColor="#3B4A8C" />
                <stop offset="65%"  stopColor="#4A5A9E" />
                <stop offset="100%" stopColor="#1A1A1A" />
            </linearGradient>

            <linearGradient id="wave-back" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="0">
                <stop offset="0%"   stopColor="#1A1A1A" />
                <stop offset="40%"  stopColor="#555555" />
                <stop offset="70%"  stopColor="#3A3A3A" />
                <stop offset="100%" stopColor="#111111" />
            </linearGradient>

            <linearGradient id="wave-front" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="0">
                <stop offset="0%"   stopColor="#0D0D0D" />
                <stop offset="40%"  stopColor="#2E3A70" />
                <stop offset="70%"  stopColor="#3B4A8C" />
                <stop offset="100%" stopColor="#111111" />
            </linearGradient>

            <radialGradient id="curl-col" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#6670AA" />
                <stop offset="100%" stopColor="#3B4A8C" />
            </radialGradient>
        </defs>

        <g mask="url(#wm)" filter="url(#wf)">
            {/* Back wave — grey */}
            <path
                d="M0 38 C40 18 80 18 120 30 C160 42 200 42 240 26 C280 10 318 8 360 28 C402 48 440 48 480 28 C520 8 560 14 600 30"
                stroke="url(#wave-back)" strokeWidth="2" strokeLinecap="round" opacity="0.7"
            />

            {/* Main wave — primary gradient */}
            <path
                d="M-10 52 C30 26 68 18 112 36 C156 54 196 52 238 32 C280 12 320 8 362 30 C404 52 440 54 478 36 C516 18 558 16 610 36"
                stroke="url(#wave-main)" strokeWidth="4" strokeLinecap="round"
            />

            {/* Curl left */}
            <path
                d="M112 30 C122 18 136 10 148 18 C158 24 152 38 140 40 C128 42 116 34 112 30Z"
                fill="url(#curl-col)" opacity="0.8"
            />
            <path d="M112 30 C106 20 104 10 111 7 C118 4 128 12 128 22"
                stroke="url(#wave-main)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Curl right */}
            <path
                d="M358 24 C368 12 382 4 393 12 C402 20 396 34 384 36 C372 38 360 30 358 24Z"
                fill="url(#curl-col)" opacity="0.8"
            />
            <path d="M358 24 C352 14 350 4 357 1 C364 -2 374 7 373 16"
                stroke="url(#wave-main)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Foam dots */}
            <circle cx="94"  cy="40" r="2" fill="#6670AA" opacity="0.55" />
            <circle cx="152" cy="42" r="1.5" fill="#6670AA" opacity="0.55" />
            <circle cx="340" cy="30" r="2" fill="#6670AA" opacity="0.55" />
            <circle cx="405" cy="35" r="1.5" fill="#6670AA" opacity="0.55" />

            {/* Front wave — dark primary */}
            <path
                d="M0 65 C48 46 98 46 148 58 C198 70 245 66 292 52 C340 38 382 38 428 56 C474 74 520 68 568 54 C580 50 595 52 612 57"
                stroke="url(#wave-front)" strokeWidth="3" strokeLinecap="round"
            />
        </g>
    </svg>
);

export default WaveDecor;
