import { useEffect, useRef } from "react";

export function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    //setup the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay) {
            const id = setInterval(tick, delay);

            return () => {
                clearInterval(id);
            };
        }
    }, [callback, delay]);
}
