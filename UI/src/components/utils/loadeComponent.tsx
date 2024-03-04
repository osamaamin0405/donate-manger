import PageLoader from "../Loaders/PageLoader";
import { Suspense } from "react";

type LoadeComponentProps = {
  Component: JSX.ElementType;
}

export default  function LoadeComponent({Component}: LoadeComponentProps) {
  return (
      <>
        <Suspense fallback={<PageLoader/>}>
          <Component />
        </Suspense>
      </>
    )
}