import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import "./App.css";

type User = {
  name: string;
  email: string;
};

// Theme Context

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}


// Error Boundary


type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong while loading the profile.</h2>;
    }

    return this.props.children;
  }
}


// Profile Component

function Profile() {
  const theme = useContext(ThemeContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: "Azfar",
        email: "azfar@example.com",
      });

      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Wait for mock API
  if (loading) {
    return <h2>Loading profile...</h2>;
  }

  // Error Boundary catches this if API returns null
  if (user === null) {
    throw new Error("User data is null");
  }

  return (
    <div className={theme?.darkMode ? "page dark" : "page"}>
      <h1>User Profile</h1>

      <button onClick={theme?.toggleTheme}>
        Toggle {theme?.darkMode ? "Light" : "Dark"} Mode
      </button>

      <div>
        <label>Name</label>
        <input ref={inputRef} defaultValue={user.name} />
      </div>

      <div>
        <label>Email</label>
        <input defaultValue={user.email} />
      </div>

      <button onClick={() => alert("Profile saved!")}>
        Save
      </button>
    </div>
  );
}

// --------------------
// App
// --------------------

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Profile />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
