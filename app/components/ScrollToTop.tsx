"use client"

import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import NavigationIcon from "@mui/icons-material/Navigation"; 
import CircularProgress from "@mui/material/CircularProgress";

export default function ScrollToTop() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            const safeProgress = Math.min(Math.max(Math.round(progress), 0), 100);
            setScrollProgress(safeProgress);

            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={`fixed bottom-12 right-6 z-50 transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <div className="relative flex items-center justify-center">
                <CircularProgress
                    aria-hidden="true"
                    variant="determinate"
                    value={100}
                    size={60}
                    thickness={3}
                    sx={{ color: 'rgba(0,0,0,0.1)', dark: { color: 'rgba(255,255,255,0.1)' }, position: 'absolute' }}
                />
                <CircularProgress
                    aria-label="Page scroll progress"
                    variant="determinate"
                    value={scrollProgress}
                    size={60}
                    thickness={3}
                    sx={{ color: '#2e8b57', position: 'absolute', transition: 'none' }}
                />
                <IconButton
                    onClick={scrollToTop}
                    aria-label="Scroll back to the top of the page"
                    sx={{
                        backgroundColor: 'background.paper',
                        color: '#2e8b57',
                        boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                        '&:hover': {
                            backgroundColor: '#2e8b57',
                            color: 'white',
                            '& .MuiSvgIcon-root': { transform: 'translateY(-2px)' }
                        },
                        width: '46px',
                        height: '46px',
                        transition: 'all 0.3s'
                    }}
                >
                    <NavigationIcon sx={{ fontSize: '1.4rem', transition: 'transform 0.2s' }} />
                </IconButton>
            </div>
        </div>
    );
}

