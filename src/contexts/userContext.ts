import { createContext } from "react";
import { UserInterface } from "../types/interfaces";

const defaultContext: {
  user: UserInterface | null,
  isLoaded: Boolean
} = {
  user: null,
  isLoaded: false
}

const userContext = createContext(defaultContext);

export default userContext;