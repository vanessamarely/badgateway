import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "./../firebaseClient";
import { onAuthStateChanged } from "firebase/auth";

// Create a context for the user data
const UserContext = createContext(null);

// Create a provider component for the user context
export function UserProvider({ children }: any) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes in the user's authentication state

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const uid = user.uid;
        setUser({ id: uid, email: user.email });
      } else {
        // User is signed out
        setUser(null);
        console.log("user is logged out");
      }
    });
  }, []);

}

// Create a hook that uses the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserContext;
