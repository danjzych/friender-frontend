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

/** Api-Specific Interfaces */

interface FrienderApiResponseInterface {
  error?: string,
}

interface AuthInterface extends FrienderApiResponseInterface {
  token: string
}

// type ApiUserInterface = FrienderApiResponseInterface | UserInterface;

interface RatingBodyInterface extends FrienderApiResponseInterface {
  "user_who_rated": string,
  "user_being_rated": string,
  "is_liked": string
}

interface MessageBodyInterface extends FrienderApiResponseInterface {
  "receiver": string,
  "message": string
}

export type {
  UserInterface,
  MatchInterface,
  SignupInterface,
  LoginInterface,
  UpdateInterface,
  AuthInterface,
  // ApiUserInterface,
  RatingBodyInterface,
  MessageBodyInterface
}