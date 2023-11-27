import { UserInterface, SignupInterface, LoginInterface,
         UpdateInterface, MatchInterface, RatingBodyInterface, MessageBodyInterface } from "./types/interfaces";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/**
 * Class and methods for interacting with Friender backend.
 */
class FrienderAPI {

  static token = "";

  /** Generic method for making API requests and catching/throwing errors */
  static async request(endpoint: string, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${this.token}`,
      "content-type": "application/json",
    };

    url.search = method === "GET" ? new URLSearchParams(data).toString() : "";

    const body = method !== "GET" ? JSON.stringify(data) : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp.json();
  }

  /** Gets all matches for a given user */
  static async getMatches(username: string): Promise<MatchInterface[]>{
    const response = await this.request(`/users/${username}/matches`);
    return response.matches;
  }

  /** Gets nearby potential matches for a given user */
  static async getNearMe(username: string): Promise<MatchInterface[]>{
    const response = await this.request(`/users/${username}/nearme`);
    return response.eligible;
  }

  /** Signup a new user */
  static async signupUser(formData: SignupInterface): Promise<string> {
    const response = await this.request(`/signup`, formData, "POST");
    return response;
  }

  /** Login an existing user */
  static async loginUser(formData: LoginInterface): Promise<string> {
    const response = await this.request(`/login`, formData, "POST");
    return response;
  }

  /** get user profile for a given user */
  static async getUserInfo(username: string): Promise<UserInterface> {
    const response = await this.request(`/users/${username}`);
    return response;
  }

  /** Update user profile for a given user */
  static async updateUser(formData: UpdateInterface, username: string): Promise<UserInterface> {
    const response = await this.request(`/users/${username}`, formData, "PATCH");
    return response;
  }

  /** Add a profile photo for a given user */
  static async addProfileImage(formData, username: string): Promise<UserInterface> {
    const response = await this.request(`/users/${username}/image`, formData, "POST");
    return response;
  };

  /** Rate a potential friend */
  static async rateUser(body: RatingBodyInterface): Promise<void> {
    const response = await this.request(`/rating`, body, "POST");
    return response;
  }

  /** Get all messages in a chat between one user and another */
  static async getMessages(username: string, otherUsername: string) {
    const response = await this.request(`/users/${username}/messages/${otherUsername}`);
    return response.messages;
  }

  /** Send a message from a user to one of their matches */
  static async addMessage(body: MessageBodyInterface): Promise<void> {
    const response = await this.request(`/users/${body.sender}/message`, body, "POST");
    return response;
  }

}

export default FrienderAPI;