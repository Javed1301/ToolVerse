"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// Allow the parent to pass a custom class (like 'dropdown-top')
interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "dropdown-end" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    // We combine the default 'dropdown' class with your custom position class
    <div className={`dropdown ${className}`}>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </div>
      <ul tabIndex={0} className="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-box w-52 mb-2">
        <li><button onClick={() => setTheme("light")}>Light Mode</button></li>
        <li><button onClick={() => setTheme("dark")}>Dark Mode</button></li>
        <li><button onClick={() => setTheme("cupcake")}>Cupcake</button></li>
        {/* <li><button onClick={() => setTheme("cyberpunk")}>Cyberpunk</button></li> */}
        <li><button onClick={() => setTheme("retro")}>retro</button></li>
        <li><button onClick={() => setTheme("synthwave")}>synthwave</button></li>
      </ul>
    </div>
  );
}