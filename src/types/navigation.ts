/**
 * Link item for navigation and sitemap
 */
export interface LinkItem {
  name: string;
  href: string;
  iconClass?: string;
  icon?: string;
}

/**
 * Sidebar navigation item for documentation
 */
export interface SidebarItem {
  title: string;
  href?: string;
  children?: SidebarItem[];
  isOpen?: boolean;
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}
