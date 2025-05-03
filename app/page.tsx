import ServerComponent from "./todo/page";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <ServerComponent />
      </Suspense>
    </main>
  );
}
