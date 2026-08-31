function isTruthy(value: string): boolean {
  const trimmed = value?.trim().toLowerCase();
  return trimmed === "true" || trimmed === "1" || trimmed === "yes" || trimmed === "y";
}

export function isE2E_TESTS(): boolean {
  return isTruthy(process.env.E2E_TESTS ?? "");
}
