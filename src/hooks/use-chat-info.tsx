import { Chat } from "@/types";
import axios from "axios";
import { useQuery } from "react-query";

export default function useChatsInfo() {
    const query = {
        queryKey: ["chat-info"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:3000/chat");
            console.log(response.data);
            return response.data.chats as Chat[]
        },
        retry: 1,
    }

    const { data: chats, isLoading, error, refetch, ...other } = useQuery(query);

    return { chats, isLoading, error, refetch, ...other };

}
