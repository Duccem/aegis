export type Meta = {
  total: number;
  page: number;
  size: number;
  pages: number;
};
export type Collection<T> = {
  items: T[];
  meta: Meta;
};
