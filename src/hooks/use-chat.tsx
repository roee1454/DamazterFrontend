import { useQueries } from "react-query";
import axios from 'axios';
import { Chat, Prompts } from "@/types";

interface useChatProps {
    id: string;
}

export default function useChat({ id }: useChatProps) {
    const chatQuery = {
        queryKey: ['chat', id],
        async queryFn() {
            const response = await axios.get(`http://localhost:3000/chat/${id}`);
            return response.data.chat as Chat;
        },
        retry: 1,
    };

    const promptsQuery = {
        queryKey: ['prompts', id],
        async queryFn() {
            const response = await axios.get<{prompts: Prompts}>(`http://localhost:3000/prompts/${id}`);
            return response.data.prompts as Prompts;
        },
        retry: 1,
    };

    const queries = [chatQuery, promptsQuery];

    const results = useQueries(queries);

    const chatResult = results[0];
    const promptsResult = results[1];

    const isLoading = chatResult.isLoading || promptsResult.isLoading;
    const error = chatResult.error || promptsResult.error;
    const refetch = () => {
        chatResult.refetch();
        promptsResult.refetch();
    };

    return {
        chatResult,
        promptsResult,
        isLoading,
        error,
        refetch
    };
}
