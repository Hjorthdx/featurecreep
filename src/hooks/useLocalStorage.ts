import { useState, useEffect, useCallback } from 'react';

interface Props<T> {
    key: string;
    defaultValue?: T;
}

export default function useLocalStorage<T>({ key, defaultValue }: Props<T>) {
    const [value, setValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.log(error);
            return defaultValue;
        }
    });

    const setStoredValue = useCallback(
        (val: T) => {
            try {
                const valueToStore = val instanceof Function ? val(value) : val;
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.log(error);
            }
        },
        [value, key]
    );

    useEffect(() => {
        setStoredValue(value);
    }, [value, setStoredValue]);

    return { value, setValue };
}
