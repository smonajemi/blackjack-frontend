import { useState, useEffect } from 'react';

const useSessionStorage = <T>(key: string, initialValue: T) => {
    const [state, setState] = useState<T>(() => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState] as const;
};

export default useSessionStorage;
