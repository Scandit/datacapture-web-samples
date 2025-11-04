export function valueFromInput(event: Event): string {
  return (event.target as HTMLInputElement).value;
}

export function valueFromCheckbox(event: Event): boolean {
  return (event.target as HTMLInputElement).checked;
}

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

export function assertUnreachable(_t: never): never {
  throw new Error("unreachable case");
}

export function parseNullableNumber(input: string): number | null {
  const trimmedValue = input.trim();
  if (trimmedValue === "") {
    return null;
  }
  const parsedNumber = Number(trimmedValue);

  return Number.isNaN(parsedNumber) ? null : parsedNumber;
}
