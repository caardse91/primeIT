export enum ECategory {
  MEAT = "Meat",
  GREEN = "Greens",
  FISH = "Fish",
}

export const getCategories = (): string[] => Object.values(ECategory);
