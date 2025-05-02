import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Property } from "@/types/property";
import { PropertyService } from "@/services/propertyService";

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updatedProperty,
    }: {
      id: number;
      updatedProperty: Partial<Property>;
    }) => PropertyService.update(id, updatedProperty),
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
