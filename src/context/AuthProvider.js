import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [favorites, setFavorites] = useState([]);

    useEffect( () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    useEffect( () => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return(
        <AuthContext.Provider value={{ auth, setAuth, favorites, setFavorites}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;