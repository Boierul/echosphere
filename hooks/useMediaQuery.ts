import { useEffect, useState } from 'react';

export const useMediaQuery = (query:any) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => {
            setMatches(media.matches);
        };
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};

// import { useState, useEffect, useCallback } from 'react';
//
// /**
//  * `useMediaQuery` is a hook for responding to CSS media queries in JavaScript.
//  * It evaluates a media query string and returns a boolean indicating whether the query matches.
//  *
//  * @return - A boolean value indicating if the media query matches.
//  * @param mediaQuery
//  */
//
// const getMatches = (mediaQuery: string): boolean => {
//     if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
//         return false;
//     }
//
//     return window.matchMedia(mediaQuery).matches;
// };
//
// export default function useMediaQuery(query: string): boolean {
//     const [matches, setMatches] = useState<boolean>(getMatches(query));
//
//     const handleChange = useCallback((event: MediaQueryListEvent) => {
//         setMatches(event.matches);
//     }, []);
//
//     useEffect(() => {
//         if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
//             return;
//         }
//
//         const mediaQueryList = window.matchMedia(query);
//         mediaQueryList.addEventListener('change', handleChange);
//
//         return () => {
//             mediaQueryList.removeEventListener('change', handleChange);
//         };
//     }, [query, handleChange]);
//
//     return matches;
// }
//
