"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: "light" | "dark";
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme-preference";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === "undefined") return "system";
        const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
        if (stored === "light" || stored === "dark" || stored === "system")
            return stored;
        return "system";
    });
    const [mounted, setMounted] = useState(false);
    const [systemPreference, setSystemPreference] = useState<"light" | "dark">(
        () => {
            if (typeof window === "undefined") return "dark";
            return window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        },
    );

    // Detect system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => {
            setSystemPreference(e.matches ? "dark" : "light");
        };
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Resolve the actual theme based on theme setting and system preference
    const resolvedTheme = theme === "system" ? systemPreference : theme;

    // Update document class and localStorage when theme changes
    useEffect(() => {
        if (!mounted) return;

        // Apply dark class to html element for Tailwind dark mode
        const html = document.documentElement;
        if (resolvedTheme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme, resolvedTheme, mounted]);

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => {
            if (prev === "light") return "dark";
            if (prev === "dark") return "system";
            return "light";
        });
    }, []);

    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
    }, []);

    return (
        <ThemeContext.Provider
            value={{ theme, resolvedTheme, toggleTheme, setTheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
