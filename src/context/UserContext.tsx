//File: src/context/UserContext.tsx

"use client";

import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
} from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: "learner" | "instructor";
}

interface Enrollment {
  courseId: string;
}

interface UserState {
  user: User | null;
  enrollments: Enrollment[];
  loading: boolean;
}

interface UserAction {
  type: "SET_USER" | "SET_ENROLLMENTS" | "LOGOUT";
  payload?: any;
}

const initialState = {
  user: null,
  enrollments: [],
  loading: true,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "SET_ENROLLMENTS":
      return { ...state, enrollments: action.payload, loading: false };
    case "LOGOUT":
      return { ...initialState, loading: false };
    default:
      return state;
  }
};

const UserContext = createContext<{
  state: UserState;
  dispatch: Dispatch<UserAction>;
} | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/user/profile");
        const { user, enrollments } = res.data;
        dispatch({ type: "SET_USER", payload: user });
        dispatch({ type: "SET_ENROLLMENTS", payload: enrollments });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
