"use client"

import { createContext, useEffect, useState } from "react"

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
    mode: ThemeMode,
    toggle: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
    const [mode, setMode] = useState<ThemeMode>('light')    
    
    const toggle = () => {
        setMode(prev => prev === 'dark' ? 'light' : 'dark')
    }

    return (
        <ThemeContext.Provider value={ { mode, toggle }}>
            <div className={`theme ${mode}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    )

}