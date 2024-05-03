/**
 * Type Definitions
 * 
 *
 * @author Peter Fortune
 * @date 04/05/2024
 */

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  permission: string;
}

export type Location = {
  _id: string;
  title: string;
  category: string;
  x: number;
  y: number;
  img: string;
  userid: string;
  games?: Game[]
}

export type Game = {
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

