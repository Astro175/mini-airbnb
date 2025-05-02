import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // In milliseconds
            refetchOnWindowFocus: false,
            retry: 1 
        }
    }
})

export default queryClient