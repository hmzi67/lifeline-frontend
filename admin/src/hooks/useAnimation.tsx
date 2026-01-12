import { useState, useEffect } from 'react';

export const useAnimation = () => {
    const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

    useEffect(() => {
        const animateValue = (key: string, start: number, end: number, duration: number): void => {
            const startTime = performance.now();
            const animate = (currentTime: number): void => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(start + (end - start) * progress);
                setAnimatedValues(prev => ({ ...prev, [key]: current }));
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        };

        const timeoutId = setTimeout(() => {
            animateValue('totalBalance', 0, 459, 2000);
            animateValue('totalSales', 0, 42820, 1800);
            animateValue('totalOrders', 0, 8258, 1500);
            animateValue('expenses', 0, 65, 1200);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    return animatedValues;
};