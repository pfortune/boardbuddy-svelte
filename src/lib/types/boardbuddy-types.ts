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
  img?: string;
  colour?: string;
  userId: string;
  games?: Game[];
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
