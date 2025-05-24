import { queryClient } from "@/lib/query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<QueryClientProvider client={queryClient}>
			<div className="mx-4 my-8 lg:my-[88px] bg-gray-200">
				<Outlet />
				<TanStackRouterDevtools />
			</div>
		</QueryClientProvider>
	),
});
