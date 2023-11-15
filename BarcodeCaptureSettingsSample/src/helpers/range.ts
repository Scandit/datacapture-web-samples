export function range(minimum: number, maximum: number, step: number = 1): number[] {
  const values: number[] = [];
  for (let value = minimum; value <= maximum; value += step) {
    values.push(value);
  }
  return values;
}
