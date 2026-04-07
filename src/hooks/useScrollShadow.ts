import { useEffect, useState } from "react";

export interface ScrollShadowState {
    showLeft: boolean;
    showRight: boolean;
}

/**
 * Tracks scroll position of a horizontally-scrollable container and returns
 * whether a left or right shadow/button should be shown.
 */
export function useScrollShadow(
    ref: React.RefObject<HTMLElement | null>,
): ScrollShadowState {
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const update = () => {
            setShowLeft(el.scrollLeft > 8);
            setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
        };

        update();
        el.addEventListener("scroll", update, { passive: true });
        return () => el.removeEventListener("scroll", update);
    }, [ref]);

    return { showLeft, showRight };
}
