import { cacheLife } from "next/cache";

// Con Cache Components, `new Date()` debe ir dentro de un ámbito cacheado para prerenderizarse.
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
