import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/fwks-libs")({
  component: FrameworksLibrariesLayout,
});

function FrameworksLibrariesLayout() {
  return <Outlet />;
}
