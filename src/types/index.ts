export interface Chat {
    id: string,
    title: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface Prompt {
    question: string,
    response: string,
    chatId: string,
    createdAt: Date,
    updatedAt: Date,
}

export type Prompts = Prompt[];
