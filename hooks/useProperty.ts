import { useQuery } from "@tanstack/react-query";
import { PropertyService } from "@/services/propertyService";

export const useProperty = (id: number) => {
  return useQuery({
    queryKey: ["property"],
    queryFn: () => PropertyService.getById(id),
  });
};
