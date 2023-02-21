import * as fcl from "@onflow/fcl";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    //State Variable to keep track of the current user
    const [currentUser, setUser] = useState({
        loggedIn: false,
        addr: undefined,
    });

    // Use FCL to subscribe to changes in the user (login, logout, etc)
    // Tell FCL to call `setUser` and update our state variables
    // if anything changes
    useEffect(() => fcl.currentUser.subscribe(setUser), []);

    // If currentUser is set, i.e. user is logged in print
    useEffect(() => {
        if (currentUser.addr) {
            console.log('User Signed In!')
        }
    }, [currentUser]);

    // Helper function to log the user out of the dApp
    const logOut = async () => {
        fcl.unauthenticate();
        setUser({ loggedIn: false, addr: undefined });
    };

    // Helper function to log the user in to the dApp
    const logIn = () => {
        fcl.logIn();
    };

    // Values
    const value = {currentUser, logOut, logIn};

    // Return the Context Provider with all the values we want our pages to have...renders all child pages
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}