export function isRemoteDebuggingEnabled(): boolean {
  for (const argument of process.argv) {
    if (argument.startsWith("--remote-debugging-port")) {
      return true;
    }
  }
  return false;
}
