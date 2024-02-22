import { useEffect, RefObject } from 'react';

/**
 * Hook that handles clicks outside the passed ref, customized for dropdowns.
 * @param ref - Reference to the element to detect clicks outside.
 * @param callback - Callback function to be executed when a click outside the element occurs.
 */
const useOutsideClickHandler = <T extends HTMLElement>(
    ref: RefObject<T>,
    callback: () => void
): void => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

export default useOutsideClickHandler;
