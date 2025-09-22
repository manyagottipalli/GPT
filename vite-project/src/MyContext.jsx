import { createContext } from "react";
export const MyContext = createContext();
export function MyProvider({ children }) {
  // State
  const [prompt, setPrompt] = useState("");
  const [allThreads, setAllThreads] = useState([]);

  return (
    <MyContext.Provider
      value={{ prompt, setPrompt, allThreads, setAllThreads }}
    >
      {children}
    </MyContext.Provider>
  );
}