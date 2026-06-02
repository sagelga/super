import React from "react";

type IconProps = React.SVGAttributes<SVGSVGElement> & {
    size?: number;
    strokeWidth?: number;
};

const baseProps = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
};

export function SettingsIcon({
    size = 24,
    strokeWidth = 2,
    ...rest
}: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            {...baseProps}
            {...rest}
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

export function CloseIcon({
    size = 24,
    strokeWidth = 2,
    ...rest
}: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            {...baseProps}
            {...rest}
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    );
}

export function MenuIcon({
    size = 24,
    strokeWidth = 2,
    ...rest
}: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            {...baseProps}
            {...rest}
        >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
    );
}

export function ArrowUpRightIcon({
    size = 24,
    strokeWidth = 2,
    ...rest
}: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            {...baseProps}
            {...rest}
        >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
        </svg>
    );
}

export function ChevronDownIcon({
    size = 24,
    strokeWidth = 2,
    ...rest
}: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            {...baseProps}
            {...rest}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

export function AwardIcon({
    size = 24,
    strokeWidth = 2,
    ...rest
}: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            {...baseProps}
            {...rest}
        >
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
    );
}

export function BookOpenIcon({
    size = 24,
    strokeWidth = 2,
    ...rest
}: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            {...baseProps}
            {...rest}
        >
            <path d="M12 7v14" />
            <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
        </svg>
    );
}

export function GraduationCapIcon({
    size = 24,
    strokeWidth = 2,
    ...rest
}: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            {...baseProps}
            {...rest}
        >
            <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
            <path d="M22 10v6" />
            <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
        </svg>
    );
}

export function SnowflakeIcon({
    size = 24,
    strokeWidth = 2,
    ...rest
}: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            {...baseProps}
            {...rest}
        >
            <path d="M2 12h20" />
            <path d="m12 2 0 20" />
            <path d="m20 16-4-4 4-4" />
            <path d="m4 8 4 4-4 4" />
            <path d="m17 4-5 5-5-5" />
            <path d="m7 20 5-5 5 5" />
        </svg>
    );
}
