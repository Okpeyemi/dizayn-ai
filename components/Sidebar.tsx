"use client";

import React, { useState, useEffect } from "react";
import { Plus, Home, User, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Sidebar = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Assure que le composant est monté côté client
    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // Évite le problème d'hydratation en ne rendant pas l'icône avant le montage
    if (!mounted) {
        return (
            <div className="w-16 h-screen flex flex-col items-center py-4 space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <button className="p-1 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                        <Plus className="w-6 h-6 text-background" />
                    </button>
                    <div className="text-foreground text-xs font-medium font-dm-sans text-center">
                        <div>Créer</div>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <button className="p-1 w-10 h-10 bg-muted rounded-[10px] flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                        <Home className="w-6 h-6 text-foreground" />
                    </button>
                    <div className="text-foreground text-xs font-medium font-dm-sans text-center">
                        <div>Accueil</div>
                    </div>
                </div>

                <div className="flex-1"></div>

                <button
                    onClick={toggleTheme}
                    className="p-1 w-10 h-10 rounded-[10px] flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer"
                >
                    {/* Icône neutre pendant le chargement */}
                    <div className="w-6 h-6"></div>
                </button>

                <button className="p-1 w-10 h-10 rounded-[10px] flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                    <User className="w-6 h-6 text-foreground" />
                </button>
            </div>
        );
    }

    return (
        <div className="w-16 h-screen flex flex-col items-center py-4 space-y-6">
            <div className="flex flex-col items-center space-y-2">
                <button className="p-1 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                    <Plus className="w-6 h-6 text-background" />
                </button>
                <div className="text-foreground text-xs font-medium font-dm-sans text-center">
                    <div>Créer</div>
                </div>
            </div>

            <div className="flex flex-col items-center space-y-2">
                <button className="p-1 w-10 h-10 bg-muted rounded-[10px] flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                    <Home className="w-6 h-6 text-foreground" />
                </button>
                <div className="text-foreground text-xs font-medium font-dm-sans text-center">
                    <div>Accueil</div>
                </div>
            </div>

            <div className="flex-1"></div>

            <button
                onClick={toggleTheme}
                className="p-1 w-10 h-10 rounded-[10px] flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer"
            >
                {theme === "dark" ? (
                    <Sun className="w-6 h-6 text-foreground" />
                ) : (
                    <Moon className="w-6 h-6 text-foreground" />
                )}
            </button>

            <button className="p-1 w-10 h-10 rounded-[10px] flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
                <User className="w-6 h-6 text-foreground" />
            </button>
        </div>
    );
};

export default Sidebar;
