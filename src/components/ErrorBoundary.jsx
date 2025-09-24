import ErrorPage from "@/pages/common/ErrorPage";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorPage error={error} />;
  }

  return <ErrorPage />;
}
