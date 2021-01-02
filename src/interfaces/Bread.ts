export interface IIngredient {
  item: string;
  amount: number;
  measure: string;
}

export type IBread = {
  name: string;
  origin: string;
  alt: string[];
  ingredients: IIngredient[];
  instructions: string;
};
