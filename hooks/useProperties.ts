import { useQuery } from "@tanstack/react-query";
import { PropertyService } from "@/services/propertyService";
import { Property } from "@/types/property";

export const useProperties = (initialData?: Property[]) => {
    return useQuery({
        queryKey: ["properties"],
        queryFn:  () => PropertyService.getAll(),
        initialData
    })
}