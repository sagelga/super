import React from "react";

interface SkillPillProps {
    skill: string;
    iconClass: string;
}

export default function SkillPill({ skill, iconClass }: SkillPillProps) {
    return (
        <span className="inline-flex cursor-default items-center gap-1.5 border border-rim/60 px-3 py-1.5 text-sm text-muted transition-colors duration-200 hover:border-accent/50 hover:text-text">
            {iconClass && <i className={`${iconClass} text-xs`} />}
            {skill}
        </span>
    );
}
