"use client";

import { useState, useEffect, ReactNode } from "react";

interface HeaderClientProps {
    children: ReactNode;
}

export default function HeaderClient({ children }: HeaderClientProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // children should be an array of 3 elements: [logo, nav, auth]
    const childArray = Array.isArray(children) ? children : [children];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-white/90 backdrop-blur-md border-b border-gray-200"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4">
                <nav className="flex items-center justify-between h-16">
                    {childArray[0]}
                    {childArray[1]}
                    {childArray[2]}
                </nav>
            </div>
        </header>
    );
}
