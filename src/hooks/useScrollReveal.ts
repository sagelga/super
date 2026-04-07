import { useEffect, useMemo, useRef, useState } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
    threshold = 0.08,
    rootMargin = "0px 0px -40px 0px",
) {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    const options = useMemo(
        () => ({ threshold, rootMargin }),
        [threshold, rootMargin],
    );

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(el);
            }
        }, options);

        observer.observe(el);
        return () => observer.disconnect();
    }, [options]);

    return { ref, isVisible };
}
