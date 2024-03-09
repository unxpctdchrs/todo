'use client'
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const Navbar = () =>{
    const { theme, setTheme } = useTheme()
    const [ isDarkMode, setIsDarkMode ] = useState(theme === "dark");

    const toggleTheme = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setTheme(newTheme);
        setIsDarkMode(!isDarkMode);
    };

    return(
        <nav className="navbar">
            <h1 className="glitch" data-text="Todo" style={{color: isDarkMode? 'inherit' : 'black'}}>Todo</h1>
            <Button className="btn-theme" onClick={toggleTheme} variant="outline" size="icon">
                {isDarkMode ? (
                    <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
                    ) : (
                    <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all " />
                    )}
                <span className="sr-only">Toggle theme</span>
            </Button>
        </nav>
    )
}

export default Navbar