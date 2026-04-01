import type { ReactNode } from "react";
import DocNav from "./DocNav";
import type { SidebarItem } from "@/lib/sidebar";

interface ContentLayoutProps {
    sidebarItems: SidebarItem[];
    sidebarTitle?: string;
    children: ReactNode;
}

export default function ContentLayout({
    sidebarItems,
    sidebarTitle,
    children,
}: ContentLayoutProps) {
    return (
        <div className="container mx-auto px-8 py-12 lg:px-16">
            <DocNav items={sidebarItems} title={sidebarTitle} />
            <main>{children}</main>
        </div>
    );
}
