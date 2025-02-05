import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useCustomPath = (): string => {
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        sessionStorage.setItem('currentPath', currentPath);
    }, [location]);

    useEffect(() => {
        const storedPath = sessionStorage.getItem('currentPath');
        if (storedPath) {
            window.history.replaceState(null, '', storedPath); 
        }
    }, []);

    return location.pathname; 
};

export default useCustomPath;
