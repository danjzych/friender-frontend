import { UserInterface, SignupInterface, LoginInterface, UpdateInterface } from "./interfaces";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/**
 * Class and methods for interacting with Friender backend.
 */
class FrienderAPI {

  static token = "";

  static async getUserInfo(username: string): Promise<UserInterface> {
    const response = await fetch(`${BASE_URL}/users/${username}`, {
      method: 'GET',
      headers: { 'token': this.token }
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  }

  static async getMatches(username: string): Promise<UserInterface[]>{
    const response = await fetch(`${BASE_URL}/users/${username}/matches`, {
      method: 'GET',
      headers: {'token': this.token}
    })

    const data = await response.json()
    if (data.error) throw new Error(data.error);

    return data.matches;
  }

  static async getNearMe(username: string): Promise<UserInterface[]>{
    const response = await fetch(`${BASE_URL}/users/${username}/nearme`, {
      method: 'GET',
      headers: {'token': this.token }
    })

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    return data.eligible;
  }

  static async signupUser(formData: SignupInterface): Promise<string> {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (data.token) return data.token;

    throw new Error(data.error);
  }

  static async loginUser(formData: LoginInterface): Promise<string> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    if (data.token) return data.token;

    throw new Error(data.error);
  }

  static async updateUser(formData: UpdateInterface, username: string): Promise<UserInterface> {
    const response = await fetch(`${BASE_URL}/users/${username}`, {
      method: 'PATCH',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json', 'token': this.token }
    });

    const data = await response.json();

    if (data.error) {

      throw new Error(data.error);
    }

    return data;
  }

  static async addProfileImage(formData, username: string): Promise<UserInterface> {
    const response = await fetch(`${BASE_URL}/users/${username}/image`, {
      method: 'POST',
      body: formData,
      headers: {'token': this.token}
    })

    const data = await response.json()

    if(data.error) {
      throw new Error(data.error)
    }

    return data;
  };

  static async rateUser(rater:string , rated: string, isLiked:string): Promise<void> {
    const response = await fetch(`${BASE_URL}/rating`, {
      method: 'POST',
      body: JSON.stringify({
        "user_who_rated": rater,
        "user_being_rated": rated,
        "is_liked": isLiked
      }),
      headers: {'Content-Type': 'application/json', 'token': this.token}
    })
  }

  static async getMessages(username: string, otherUsername: string) {
    const response = await fetch(`${BASE_URL}/users/${username}/messages/${otherUsername}`, {
      method: 'GET',
      headers: {'token': this.token}
    })

    const data= await response.json()

    return data.messages;
  }

  static async addMessage(sender:string , receiver:string , message: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/users/${sender}/message`, {
      method: 'POST',
      body: JSON.stringify({
        sender,
        receiver,
        message
      }),
      headers: {'Content-Type': 'application/json', 'token': this.token}
    })
  }
}

export default FrienderAPI;