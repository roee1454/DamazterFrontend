import { Button } from "@/components/ui/button";

interface PressableIconProps {
    icon: React.JSX.Element,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any,
    type?: "button" | "submit" | "reset",
    loading?: boolean
}

const PressableIcon: React.FC<PressableIconProps> = ({ loading, type, icon, onClick }) => {
    return (
        <Button onClick={onClick ? onClick : () => {}} type={type} className='p-2 w-12 h-12 rounded-full bg-background text-foreground transition-all hover:bg-slate-400 hover:bg-opacity-50'>
            {loading ? (
                <div className='flex items-center justify-center'>
                    <div className='w-4 h-4 border-2 border-t-2 border-t-transparent border-gray-300 rounded-full animate-spin'></div>
                </div>
            )
            :
            icon
        }
        </Button>
    );
};

export default PressableIcon
