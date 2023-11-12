import { createContext } from "react";
import { UserInterface } from "../interfaces";

const defaultContext: {
  user: UserInterface | null,
} = {
  user: null,
}

const userContext = createContext(defaultContext);

export default userContext;