
export type Coordinates = [number, number];

export interface User {
  id: number;
  name: string;
  location?: Coordinates;
}
