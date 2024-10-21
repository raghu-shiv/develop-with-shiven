"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { ICourse } from "@/models/course";
import { fetchCourses } from "@/services/courseService";

// Define the initial state and action types
interface CourseState {
  courses: ICourse[];
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  error: null,
};

type Action =
  | { type: "LOAD_COURSES"; payload: ICourse[] }
  | { type: "SET_ERROR"; payload: string };

const courseReducer = (state: CourseState, action: Action): CourseState => {
  switch (action.type) {
    case "LOAD_COURSES":
      return { ...state, courses: action.payload, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const CourseContext = createContext<CourseState | undefined>(undefined);
const CourseDispatchContext = createContext<React.Dispatch<Action> | undefined>(
  undefined
);

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourseContext must be used within a CourseProvider");
  }
  return context;
};

export const useCourseDispatch = () => {
  const context = useContext(CourseDispatchContext);
  if (!context) {
    throw new Error("useCourseDispatch must be used within a CourseProvider");
  }
  return context;
};

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        dispatch({ type: "LOAD_COURSES", payload: data });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: "Failed to load courses" });
      }
    };

    loadCourses();
  }, []);

  return (
    <CourseContext.Provider value={state}>
      <CourseDispatchContext.Provider value={dispatch}>
        {children}
      </CourseDispatchContext.Provider>
    </CourseContext.Provider>
  );
};
