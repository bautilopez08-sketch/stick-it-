export type CatalogDesign = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags?: string[];
  status?: "active" | "draft";
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const CATALOG_STORAGE_KEY = "stick-it-catalog-designs";
export const CATALOG_UPDATED_EVENT = "stick-it-catalog-updated";
