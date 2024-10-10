import { QueryClient, QueryClientProvider } from "react-query";

export const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchInterval: false,
        }
    }
});

export function QueryProvider({ children }: { children: React.JSX.Element }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
