export interface IIngredients {
  [key: string]: { amount: number; measure: string };
}

export type IBread = {
  name: string;
  origin: string;
  alt: string[];
  ingredients: IIngredients;
  instructions: string;
};
