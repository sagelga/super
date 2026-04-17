export type GalleryCategory = "projects" | "photography" | "design";

export interface GalleryItem {
    id: number;
    seed: string;
    category: GalleryCategory;
    title: string;
    width: number;
    height: number;
}

export const GALLERY_ITEMS: GalleryItem[] = [
    { id: 1,  seed: "trashmelody",  category: "projects",     title: "TrashMelody",          width: 1200, height: 800  },
    { id: 2,  seed: "kumamoto1",    category: "photography",  title: "Kumamoto Castle",       width: 800,  height: 1100 },
    { id: 3,  seed: "mahjong",      category: "projects",     title: "Mahjong Hands",         width: 1200, height: 750  },
    { id: 4,  seed: "kyoto2",       category: "photography",  title: "Kyoto Streets",         width: 900,  height: 1200 },
    { id: 5,  seed: "portfolio1",   category: "design",       title: "Portfolio v3",          width: 1400, height: 900  },
    { id: 6,  seed: "osaka3",       category: "photography",  title: "Osaka at Night",        width: 1200, height: 800  },
    { id: 7,  seed: "telegram",     category: "projects",     title: "Telegram Thai Bot",     width: 1000, height: 700  },
    { id: 8,  seed: "typography1",  category: "design",       title: "Type Study",            width: 800,  height: 1050 },
    { id: 9,  seed: "nara4",        category: "photography",  title: "Nara Deer Park",        width: 1100, height: 780  },
    { id: 10, seed: "salesforce1",  category: "projects",     title: "Salesforce Dashboard",  width: 1400, height: 880  },
    { id: 11, seed: "palette2",     category: "design",       title: "Color Systems",         width: 900,  height: 1200 },
    { id: 12, seed: "hiroshima5",   category: "photography",  title: "Hiroshima Peace Park",  width: 1200, height: 800  },
    { id: 13, seed: "statuspage",   category: "projects",     title: "Status Page",           width: 1100, height: 720  },
    { id: 14, seed: "icons3",       category: "design",       title: "Icon Set",              width: 1000, height: 1000 },
    { id: 15, seed: "fukuoka6",     category: "photography",  title: "Fukuoka Morning",       width: 800,  height: 1100 },
];

export function imageUrl(seed: string, w: number, h: number) {
    return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}
