import FileCard from "@/components/file-card";
import MessagesContainer from "@/components/messages-container";
import PressableIcon from "@/components/pressable-icon";
import { buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import useChat from "@/hooks/use-chat";
import usePrompt from "@/hooks/use-prompt";
import { toast } from "@/hooks/use-toast";
import { Prompts } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Paperclip, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const inputFormSchema = z.object({
    question: z.string().min(1, { message: "יש לנסח הודעה ולא לשלוח משימה ריקה" }).max(2500, { message: "עברתם את האורך המקסימלי להודעה זו!" }),
    file: z.instanceof(File).optional().nullable()
});

const allowedExtensions = ['.js', '.ts', '.py', '.docx', '.pdf', '.xlsx', '.csv', '.txt', '.json'];
const maxSizeMB = 10;
const maxSizeBytes = maxSizeMB * 1024 * 1024;

const validateFile = (file: File) => {
    if (!file) return;

    const fileExtension = '.' + file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
    console.log(fileExtension)
    const fileSize = file.size;

    if (!allowedExtensions.includes(`${fileExtension}`)) {
        return new Error('סוג קובץ לא נתמך, נא לעלות מהקבצים הבאים: .js, .ts, .py, .docx, or .pdf file.');
    }

    if (fileSize > maxSizeBytes) {
        return new Error('התיקיה עברה את מגבלת ה10 מגה בייטים');
    }
};

type inputFormValues = z.infer<typeof inputFormSchema>;

export default function Chat() {
    const { id } = useParams();
    if (!id) return <div>עמוד לא תקין, אנא חזור למסך הבית</div>

    const { chatResult, promptsResult, isLoading, error, refetch } = useChat({ id });

    const { promptChat } = usePrompt(id);

    const form = useForm<inputFormValues>({
        resolver: zodResolver(inputFormSchema),
        defaultValues: {
            question: "",
            file: null
        }
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [promptsState, setPromptsState] = useState<Prompts>([]);

    const navigate = useNavigate();


    useEffect(() => {
        if (!isLoading && !error) {
            setPromptsState(promptsResult.data as Prompts);
        }
    }, [isLoading, promptsResult.data, error])


    function handleRemoveFile() {
        form.setValue("file", null);
    }

    const currentFile = form.watch("file");

    function InputForm() {
        async function handleSubmit(values: inputFormValues) {
            form.reset();
            setLoading(true);
            try {
                const formData = new FormData();
                if (values.file) {
                    formData.set("file", values.file);
                }
                formData.set("question", values.question);
                setPromptsState(prev => [...prev, { chatId: id as string, question: values.question, response: "&loader;", createdAt: new Date(Date.now()), updatedAt: new Date(Date.now()) }])
                const response = await promptChat(formData);
                if (response instanceof Error) return toast({ title: "לא רציניים", description: response.message });
                setPromptsState(prev => {
                    return prev.map(prompt => {
                        if (prompt.question === values.question) {
                            return { ...prompt, response: (response as any).response }
                        }
                        return prompt;
                    })
                })
            } catch (err: any) {
                if (err instanceof z.ZodError) {
                    form.setError("root", { message: err.errors[0].message });
                } else {
                    console.error(err);
                }
            } finally {
                refetch()
                setLoading(false);
            }
        }

        useEffect(() => {
            if (chatResult.data === null || error) {
                return navigate("/")
            }
        }, [chatResult, error])


        return (
            <Form { ...form }>
                <form className='w-full flex flex-row justify-center items-center gap-5' onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField name='question' control={form.control} render={({ field }) => (
                        <FormItem className='w-full gap-4'>
                            <FormControl className='w-full'>
                                <Textarea
                                    disabled={loading}
                                    placeholder='נסח משימה כאן...'
                                    onInput={(e: React.MouseEvent<HTMLTextAreaElement>) => e.currentTarget.focus()}
                                    className='w-full border-2 shadow-sm resize-none'
                                    { ...form.register(field.name, { required: true }) }
                                />
                            </FormControl>
                            <FormMessage />
                            {form.formState.errors.file && <p className='text-md text-red-700'>{form.formState.errors.file.message}</p>}
                        </FormItem>
                    )} />
                    <FormField name="file" control={form.control} render={() => {
                        return (
                            <FormItem>
                                <FormLabel htmlFor='file' className={buttonVariants({
                                    variant: "ghost",
                                    className: "w-16 h-16 rounded-full cursor-pointer"
                                })}><Paperclip /></FormLabel>
                                <FormControl>
                                    <Input onChange={(e) => {
                                        e.preventDefault();
                                        if (e.target.files) {
                                            const file = e.target.files[e.target.files.length - 1];
                                            const error = validateFile(file);
                                            if (error) {
                                                return form.setError("file", { message: error.message });
                                            }
                                            return form.setValue("file", file);
                                        }
                                    }} id='file' className='hidden' type='file' />
                                </FormControl>
                            </FormItem>
                        )
                    }} />
                    <PressableIcon loading={loading} type='submit' icon={<Send />} />
                </form>
            </Form>
        );
    }

    if (isLoading) {
        return <div>טוען צ'אט...</div>
    }

    if (error) {
        return <div>שגיאה בעת טעינת צ'אט: {(error as Error).message}</div>
    }



    return (
        <div>
          <div className='flex flex-col justify-center items-center gap-4 w-full'>
            <div className="text-start text-xl text-muted-foreground font-bold">
                {chatResult.data ? (chatResult.data as any).title : ""}
            </div>
            <ScrollArea dir="rtl" className="w-full h-[65vh] px-2">
                <MessagesContainer prompts={promptsState} />
            </ScrollArea>
            <div className="px-2.5 sm:px-10 md:px-20 py-4 sm:py-5 md:py-6 w-full fixed bottom-0 left-[50%] translate-x-[-50%]">
            {currentFile && <FileCard file={currentFile} handleRemoveFile={handleRemoveFile} />}
            <InputForm />
            </div>
        </div>
    </div>
    )
}
