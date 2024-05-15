export const notEmpty = (arr?: unknown[]): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};