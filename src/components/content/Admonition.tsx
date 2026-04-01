import React from 'react'

interface AdmonitionProps {
  type: 'tip' | 'info' | 'note' | 'warning' | 'caution' | 'danger'
  title?: string
  children: React.ReactNode
}

const config: Record<AdmonitionProps['type'], { label: string; borderClass: string; iconClass: string; bgClass: string }> = {
  tip:     { label: 'Tip',     borderClass: 'border-brand',  iconClass: 'text-brand',  bgClass: 'bg-brand/5' },
  info:    { label: 'Info',    borderClass: 'border-brand',  iconClass: 'text-brand',  bgClass: 'bg-brand/5' },
  note:    { label: 'Note',    borderClass: 'border-brand',  iconClass: 'text-brand',  bgClass: 'bg-brand/5' },
  warning: { label: 'Warning', borderClass: 'border-accent', iconClass: 'text-accent', bgClass: 'bg-accent/5' },
  caution: { label: 'Caution', borderClass: 'border-accent', iconClass: 'text-accent', bgClass: 'bg-accent/5' },
  danger:  { label: 'Danger',  borderClass: 'border-red-500/70', iconClass: 'text-red-400', bgClass: 'bg-red-500/5' },
}

export default function Admonition({ type, title, children }: AdmonitionProps) {
  const { label, borderClass, iconClass, bgClass } = config[type] ?? config.info

  return (
    <div className={`my-6 rounded-r-md border-l-4 px-4 py-3 ${borderClass} ${bgClass}`}>
      <div className={`mb-1 text-xs font-semibold uppercase tracking-widest font-sans ${iconClass}`}>
        {title || label}
      </div>
      <div className="text-sm text-muted [&>p]:mb-1 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
