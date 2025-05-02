import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PropertyService } from "@/services/propertyService";

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();

  useMutation({
    mutationFn: (id: number) => PropertyService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
