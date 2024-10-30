import React from "react";

function Header() {
    return (
        <header className="bg-black py-4">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-teal-400 to-pink-500 text-transparent bg-clip-text">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                Spot
            </span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                Lister
            </span>
          </h1>
        </header>
      )
}

export default Header