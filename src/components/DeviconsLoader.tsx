"use client";

import { useEffect } from "react";

export default function DeviconsLoader() {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/devicons-subset.css";
        document.head.appendChild(link);
    }, []);
    return null;
}
