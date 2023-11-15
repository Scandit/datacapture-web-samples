export function valueFromInput(event: Event): string {
  return (event.target as HTMLInputElement).value;
}

export function valueFromCheckbox(event: Event): boolean {
  return (event.target as HTMLInputElement).checked;
}
