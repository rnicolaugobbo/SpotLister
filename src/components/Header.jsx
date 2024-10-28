import React, { useState, useEffect } from "react";

function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`fixed w-full transition-all duration-300 ${scrolled ? 'bg-black shadow-lg' : 'bg-black/80 backdrop-blur-sm'}`}>
            <div className="container mx-auto px-4 py-6 flex items-center justify-center">
                <h1 className="text-4xl font-extrabold text-white">
                    <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                        Spot
                    </span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                        Lister
                    </span>
                </h1>
            </div>
        </header>
    )
}

export default Header