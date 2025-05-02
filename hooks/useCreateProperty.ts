import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropertyService } from "@/services/propertyService";
import { Property } from "@/types/property";

export const useCreateProperty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProperty: Omit<Property, "id">) =>
      PropertyService.create(newProperty),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["properties"]
    })
  });
};
