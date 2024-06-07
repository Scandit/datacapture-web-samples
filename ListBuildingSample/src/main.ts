/* eslint-disable no-console */
/* eslint-disable unicorn/prefer-top-level-await */
import { AppView } from "./app/view";

async function main(): Promise<void> {
  await new AppView().connect();
}

main().catch((error: Error) => {
  console.error(error);
});
