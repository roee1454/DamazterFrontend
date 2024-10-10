import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { Prompts } from "@/types";
import { Fragment } from "react/jsx-runtime";
import AvatarImage from '@/assets/favicon.png'
import { BeatLoader } from 'react-spinners';

interface MessagesContainerProps {
    prompts: Prompts
}

export default function MessagesContainer({prompts}: MessagesContainerProps) {
    return (
        <>
        <ChatMessageList>
            {prompts.map((prompt, index) => {
                return (
                    <Fragment key={index}>
                        <ChatBubble>
                            <ChatBubbleMessage variant={"sent"}>
                                {prompt.question}
                            </ChatBubbleMessage>
                        </ChatBubble>
                        <ChatBubble variant={"sent"}>
                            <ChatBubbleAvatar src={AvatarImage} />
                            <ChatBubbleMessage>{prompt.response === "&loader;" ? <BeatLoader /> : prompt.response}</ChatBubbleMessage>
                        </ChatBubble>
                    </Fragment>
                )
            })}
        </ChatMessageList>
        </>
    )
}
