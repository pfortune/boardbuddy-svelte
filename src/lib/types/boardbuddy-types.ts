/**
 * Type Definitions
 *
 * @author Peter Fortune
 * @date 04/05/2024
 */
export interface Location {
  _id: string;
  title: string;
  category: string;
  x: number;
  y: number;
  colour?: string;
  userId: string;
  games?: Game[];
  createdAt?: Date;
}

export interface Game {
  _id: string;
  title: string;
  age: number;
  minPlayers: number;
  maxPlayers: number;
  duration: number;
  locationid: string;
  createdAt?: Date;
}

export interface Rating {
  _id: string;
  rating: number;
  userId: string;
  locationId: string;
  createdAt?: Date;
}

export interface Image {
  _id: string;
  imgUrl: string;
  userId: string;
  locationid: string;
  createdAt?: Date;
}

export interface User {
  role: string;
}