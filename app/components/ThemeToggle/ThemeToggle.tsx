"use client";

import styles from './themeToggle.module.css'
import { motion } from 'framer-motion'
import { ThemeContext } from '@/app/context/ThemeContext';
import { useContext } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeToggle() {
    
    const context = useContext(ThemeContext)
    if(!context) return null

    const { mode, toggle } = context;

    return (
        <button 
            type="button" 
            onClick={toggle}
            aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className={`w-[60px] h-[30px] rounded-full p-[4px] flex items-center cursor-pointer transition-colors duration-300 outline-none
                ${mode === "dark" ? "bg-[#53c28b] justify-end" : "bg-gray-300 border border-gray-100 shadow-sm justify-start"}`
            }
        >
            <motion.div 
                layout 
                // هنا نجعل الدائرة الداخلية تأخذ لون أصفر دافئ لتعبر عن الشمس في الوضع الفاتح
                className={`w-[22px] h-[22px] rounded-full shadow-sm flex items-center justify-center select-none transition-colors duration-300
                    ${mode === "dark" ? "bg-white" : "bg-[#ffb703]"}`
                }
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                {mode === "dark" ? (
                    <DarkModeIcon sx={{ fontSize: '15px', color: '#1e293b' }} />
                ) : (
                    // الأيقونة بيضاء لتتناسق مع الدائرة الصفراء والكبسولة البيضاء
                    <LightModeIcon sx={{ fontSize: '15px', color: '#ffffff' }} />
                )}
            </motion.div>
        </button>
    )
}


/*
    <button 
            type="button" // تحديد نوعه كزر صريح
            onClick={toggle}
            className={`w-[55px] h-[25px] rounded-full p-[4px] flex items-center cursor-pointer transition-colors duration-300 
                ${mode === "dark" ? "bg-[#53c28b] justify-end" : "bg-gray-300 justify-start"}`
            }
        >
            <motion.div 
                layout 
                className="w-[17px] h-[17px] bg-white rounded-full shadow-md flex items-center justify-center text-[12px] user-select-none"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
                {mode === "dark" ? "🌙" : "🔆"}
            </motion.div>
        </button>
*/