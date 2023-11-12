//** Interface for User Object */
interface UserInterface {
  username: string;
  hobbies: string;
  interests: string;
  location: number;
  radius: number;
  image_urls?: string[]
}

interface MatchInterface extends UserInterface {
  distance: number;
}

interface LoginInterface {
  username: string;
  password: string
}

interface SignupInterface extends LoginInterface {
  hobbies: string;
  interests: string;
  location: number | null;
  radius: number | null;
}

interface UpdateInterface {
  hobbies: string;
  interests: string;
  location: number;
  radius: number;
}

export type {
  UserInterface,
  SignupInterface,
  LoginInterface,
  UpdateInterface
}