import PropertiesClientPage from "@/components/ClientPages/PropertiesClientPage";
import { PropertyService } from "@/services/propertyService";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function PropertiesPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["properties"],
    queryFn: () => PropertyService.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PropertiesClientPage />
    </HydrationBoundary>
  );
}
