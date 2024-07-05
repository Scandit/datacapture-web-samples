export function isRemoteDebuggingEnabled(): boolean {
  for (const arg of process.argv) {
    if (arg.startsWith('--remote-debugging-port')) {
      return true
    }
  }
  return false
}
