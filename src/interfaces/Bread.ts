export type IBread = {
  name: string;
  origin: string;
  description: string;
  alt: string[];
  ingredients: {
    [key: string]: number;
  };
  instructions: string;
};
