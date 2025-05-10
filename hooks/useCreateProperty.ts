import {
  useMutation,
} from "@tanstack/react-query";
import { PropertyService } from "@/services/propertyService";
import { Property } from "@/types/property";


// Accept options and spread into useMutation
export const useCreateProperty = () => {
  return useMutation<Property, Error, Omit<Property, "id">, unknown>({
    mutationFn: (newProperty) => PropertyService.create(newProperty),

  });
};
