import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from './ui/skeleton';
import useChatsInfo from '@/hooks/use-chat-info';
import { Link } from 'react-router-dom';
import { MessageCircleCode } from 'lucide-react';

interface ChatsSheetProps {
    open: boolean,
    onOpenChange: (open: boolean) => any
}

export default function ChatsSheet({ open, onOpenChange }: ChatsSheetProps) {

    const { chats, isLoading, } = useChatsInfo();

    const SkeletonLoader = () => {
        return (
            <Skeleton className='w-full h-full p-6'></Skeleton>
        )
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent dir='rtl' className='w-full h-full' side={"left"}>
                <SheetHeader>
                    <SheetTitle>
                        צ'אטים אחרונים
                    </SheetTitle>
                    <SheetDescription>
                        כל הצ'אטים האחרונים שהתרחשו במערכת
                    </SheetDescription>
                </SheetHeader>
                {isLoading ? <SkeletonLoader /> : (
                    <div className='w-full h-full flex flex-col py-4 justify-start items-center'>
                        {chats && chats.length > 0 ? chats.map((chat, index) => {
                            return (
                                <Link onClick={() => onOpenChange(!open)} key={index} to={`/chat/${chat.id}`} className='cursor-pointer flex flex-row justify-between items-center p-2 transition-all hover:bg-slate-300 hover:bg-opacity-50 rounded-md w-full'>
                                    <div className='font-bold' >{chat.title.slice(0, 20) + "..."}</div>
                                    <MessageCircleCode size={32} />
                                </Link>
                            )
                        }) : (
                            <div className='text-xl text-muted-foreground'>אין צ'אטים קיימים כרגע</div>
                        )}
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
