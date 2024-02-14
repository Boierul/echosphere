import { useState, useEffect } from "react";

// Handler to call on window resize
function handleResize(setWindowSize: Function) {
    // Set window width/height to state
    setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
    });
}

// Hook for checking window size
const useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        // only execute all the code below in client side
        if (typeof window !== "undefined") {
            // Add event listener
            window.addEventListener("resize", () => handleResize(setWindowSize));

            // Call handler right away so state gets updated with initial window size
            handleResize(setWindowSize);

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", () => handleResize(setWindowSize));
        }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
};

export default useWindowSize;
