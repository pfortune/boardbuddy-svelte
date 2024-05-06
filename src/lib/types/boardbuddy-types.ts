/**
 * Type Definitions
 *
 * @author Peter Fortune
 * @date 04/05/2024
 */
export interface Session {
  name: string;
  _id: string;
  token: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  permission: string;
}

export interface Location {
  _id: string;
  title: string;
  category: string;
  x: number;
  y: number;
  img: string;
  userid: string;
  games?: Game[]
}

export interface Game {
  _id: string;
  title: string;
  age: number;
  minPlayers: number;
  maxPlayers: number;
  duration: number;
  description: string;
  category: string;
  locationid: string;
}

