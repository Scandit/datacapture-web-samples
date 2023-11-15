export function camelCaseToTitleCase(camelCaseString: string): string {
  const titleCaseString = camelCaseString.replaceAll(/([a-z])([A-Z]+)/g, "$1 $2");
  return titleCaseString.charAt(0).toUpperCase() + titleCaseString.slice(1);
}
