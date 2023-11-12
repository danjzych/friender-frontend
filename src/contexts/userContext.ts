import { createContext } from "react";
import { UserInterface } from "../types/interfaces";

const defaultContext: {
  user: UserInterface | null,
} = {
  user: null,
}

const userContext = createContext(defaultContext);

export default userContext;