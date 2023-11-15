export function camelCaseToTitleCase(camelCaseString: string): string {
  const titleCaseString = camelCaseString.replaceAll(/([a-z])([A-Z]+)/g, "$1 $2");
  return titleCaseString.charAt(0).toUpperCase() + titleCaseString.slice(1);
}

export function range(minimum: number, maximum: number, step: number = 1): number[] {
  const values: number[] = [];
  for (let value = minimum; value <= maximum; value += step) {
    values.push(value);
  }
  return values;
}
