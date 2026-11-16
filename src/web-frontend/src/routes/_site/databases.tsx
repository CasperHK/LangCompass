import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/databases")({
  component: DatabasesLayout,
});

function DatabasesLayout() {
  return <Outlet />;
}
