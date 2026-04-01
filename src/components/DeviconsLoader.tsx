"use client";

import { useEffect } from "react";

export default function DeviconsLoader() {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
            "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css";
        document.head.appendChild(link);
    }, []);
    return null;
}
