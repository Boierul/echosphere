"use client"

import {ReactNode, useRef} from "react";
import Link from "next/link";
import {motion, useCycle} from 'framer-motion';
import MenuToggle from "@/components/MenuToggle";
import {useTheme} from "next-themes";
import {usePathname} from "next/navigation";

// Styles of animation for the text in the mobile nav
const variants = {
    open: {
        transition: {staggerChildren: 0.02, delayChildren: 0.15},
    },
    closed: {
        transition: {staggerChildren: 0.01, staggerDirection: -1},
    },
};

// Styles of animation for background bubble in the hamburger menu in the mobile nav
const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(0px at 0% 0)',
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

// Styles of animation for the text in the mobile nav
const MenuItemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: {stiffness: 1000, velocity: -100},
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: {stiffness: 1000},
            duration: 0.02,
        },
    },
};

// Menu Item for the motion.li elements (for re-usability)
const MenuItem = ({
                      className,
                      children,
                  }: {
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <motion.li variants={MenuItemVariants} className={className}>
            {children}
        </motion.li>
    );
};

export default function MobileNavigation() {
    const pathname = usePathname()
    // Ref for the container (keep state of the toggle nav-menu)
    const containerRef = useRef(null);
    // Use State but for visual toggle buttons
    const [isOpen, toggleOpen] = useCycle(false, true);
    // bg-opacity-30
    return (
        <motion.nav
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            className={`fixed inset-0 z-50 w-full h-full sm:hidden  ${isOpen ? 'backdrop-filter backdrop-blur-xl transition duration-200' : 'pointer-events-none transition duration-200'}`}
            ref={containerRef}
        >
            <motion.div
                className={`absolute h-full w-full bg-opacity-60 `}
                variants={sidebar}
            >
                <motion.ul
                    variants={variants}
                    className="absolute grid w-full h-full gap-3 px-14 py-16"
                >
                    <MenuItem>
                        <Link
                            href="/"
                            onClick={() => toggleOpen()}
                            className={`flex w-full pb-2 text-5xl ${pathname === "/" ? "font-semibold" : "font-light"}`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/feed"
                            onClick={() => toggleOpen()}
                            className={`flex w-full pb-2 text-5xl ${pathname === "/feed" ? "font-semibold" : "font-light"}`}
                        >
                            Feed
                        </Link>
                        <Link
                            href="/subscribe"
                            onClick={() => toggleOpen()}
                            className={`flex w-full pb-2 text-5xl ${pathname === "/subscribe" ? "font-semibold" : "font-light"}`}
                        >
                            Subscribe
                        </Link>
                    </MenuItem>
                </motion.ul>
            </motion.div>

            <MenuToggle toggle={toggleOpen}/>
        </motion.nav>
    )
}