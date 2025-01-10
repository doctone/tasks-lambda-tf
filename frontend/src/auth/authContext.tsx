import { firebaseAuth } from "./firebase";
import { createContext, useContext, useEffect, useState } from "react";
import {
  firebaseSignOut,
  LoginFormValues,
  UserFormValues,
} from "./firebase/signup";
import { useNavigate } from "react-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { firebaseSignUp } from "./firebase/signup";
import { firebaseSignIn } from "./firebase/signup";

interface AuthContext {
  user: User | null;
  loading: boolean;
  signIn: (creds: LoginFormValues) => Promise<void>;
  signUp: (creds: UserFormValues) => void;
  signOut: () => Promise<void>;
  error: string;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  //Sign up
  const signUp = (creds: UserFormValues) => {
    setIsLoading(true);
    firebaseSignUp(creds)
      .then(async (signUpResult) => {
        const { user } = signUpResult; //object destructuring
        if (user) {
          setCurrentUser(user);
          navigate("/dashboard", { replace: true });
        } else {
          console.log("no User"); //do something if user is empty like an alert
        }
        setIsLoading(false);
      })
      .catch((error) => {
        //check for error
        if (error.code === "auth/email-already-in-use") {
          //show an alert or console
        } else if (error.code === "auth/too-many-requests") {
          //do something like an alert
        }
        // you can check for more error like email not valid or something
        setIsLoading(false);
      }); //implement sign up here - which is implemented below
  };

  //Sign in
  const signIn = async (creds: LoginFormValues) => {
    setIsLoading(true);
    firebaseSignIn(creds)
      .then((signInResult) => {
        const { user } = signInResult;
        if (user) {
          setCurrentUser(user);
          setError("");
          navigate("/dashboard", { replace: true });
        } else {
          //do something
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setError("Invalid credentials");
        } else if (error.code === "auth/too-many-requests") {
          //show error
        }
        setIsLoading(false);
      });
  };

  //Sign out
  const signOut = async () => {
    setIsLoading(true);
    try {
      await firebaseSignOut();
      setCurrentUser(null);
      navigate("/signin", { replace: true });
    } catch {
      setIsLoading(false);
      //show error alert
    }
  };

  //create Auth Values
  const authValues = {
    user: currentUser,
    loading: isLoading,
    signIn,
    signUp,
    signOut,
    error,
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin", { replace: true });
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  //If loading for the first time when visiting the page
  if (isAuthLoading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
