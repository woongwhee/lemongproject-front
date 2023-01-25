import React, {useState, useEffect, useRef} from 'react';

function App() {

    export default function useIntersectionObserver(callback) {
        const observer = useRef(
            new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            callback();
                        }
                    });
                },
                { threshold: 1 }
            )
        );

        const observe = (element) => {
            observer.current.observe(element);
        };

        const unobserve = (element) => {
            observer.current.unobserve(element);
        };

        return [observe, unobserve];
    }
}

export default App;