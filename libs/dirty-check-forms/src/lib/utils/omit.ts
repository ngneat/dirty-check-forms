export function omit<T, K extends Array<keyof T>>(obj: T, omit: K) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !omit.includes(key as keyof T))
  );
}
