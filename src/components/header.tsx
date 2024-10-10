import logo from '@/assets/favicon.png';
import { Link } from 'react-router-dom'
import PressableIcon from './pressable-icon'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react';
import ChatsSheet from './chats-sheet';

export default function Header() {
    const [sheet, setSheet] = useState<boolean>(false);
    const handleSheetToggle = (open: boolean) => {
        setSheet(open);
    }
    return (
        <div className='w-full h-full'>
            <ChatsSheet open={sheet} onOpenChange={handleSheetToggle} />
            <div className="flex flex-row justify-between items-center py-4">
                <Link to="/" className='flex flex-row justify-center items-center gap-x-4'>
                    <img className='w-16 h-16 align-middle pointer-events-none' src={logo} alt="לוגו של החטל" />
                    <h1 className='text-4xl md:text-6xl font-bold text-accent-foreground'>דמ"צטר</h1>
                </Link>
                <PressableIcon onClick={() => handleSheetToggle(!sheet)} icon={<MenuIcon />} />
            </div>
        </div>
    )

}
