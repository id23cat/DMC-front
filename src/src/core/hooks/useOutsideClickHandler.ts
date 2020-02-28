import { useEffect } from "react";

export function useOutsideClickHandler(element: HTMLElement | undefined | null, handler: () => void) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (element && !element.contains(event.target as any)) {
                handler();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handler, element]);
}
