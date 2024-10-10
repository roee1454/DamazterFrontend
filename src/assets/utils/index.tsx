import { HelperCardProps } from "@/components/helper-card";
import { Paperclip } from "lucide-react";

export const HelperCardsData: HelperCardProps[]  = [
    {
        icon: <Paperclip className='text-[#e8494f]' />,
        title: 'נסח לי דמ"צ על פי הטמפלייט והטקסט שאני מזין לך',
    },
    {
        icon: <Paperclip className='text-[#449f6d]' />,
        title: 'תסכם לי את הדמ"צ שאני מזין לך',
    },
    {
        icon: <Paperclip className='text-[#006bab]' />,
        title: 'בדוק אם ישנן בעיות בניסוח הדמ"צ שאני מזין לך',
    },
    {
        icon: <Paperclip className='text-[#eeda39]' />,
        title: 'נסח לי דמ"צ מתוקן לפי הדמ"צ הפגום שאני מזין לך',
    },
]
