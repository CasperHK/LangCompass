import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ScrollTopButton } from "@/components/buttons/ScrollTopButton";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Outlet />
      <ScrollTopButton />
    </>
  );
}
