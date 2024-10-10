import { useMutation } from "react-query";
import axios, { type AxiosResponse } from 'axios'
import { toast } from "./use-toast";

export default function usePromptNewChat() {
    const { mutateAsync: promptNewChat, ...other } = useMutation({
        mutationKey: ["newChat"],
        async mutationFn(formData: FormData): Promise<AxiosResponse | Error> {
            try {
                return await axios.post("http://localhost:3000/chat", formData);
            } catch (err: any) {
                return new Error(err);
            }
        },
        onSettled: (response) => {
            if (!(response instanceof Error)) {
                if ("error" in response?.data) {
                    toast({ title: "שגיאה בעת ביצוע המשימה", description: response?.data.error })
                }

                const { response: generatedText } = response?.data
                return generatedText
            } else {
                toast({ title: "שגיאה בעת ביצוע המשימה", description: response.message })
            }
        }
    });
    return { promptNewChat, ...other }
}
