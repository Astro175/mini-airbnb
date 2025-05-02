import { useQuery } from "@tanstack/react-query";
import { PropertyService } from "@/services/propertyService";

export const useProperties = () => {
    return useQuery({
        queryKey: ["properties"],
        queryFn:  () => PropertyService.getAll()
    })
}