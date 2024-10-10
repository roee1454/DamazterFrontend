import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';

export interface HelperCardProps {
    icon: React.JSX.Element,
    title: string,
    onClick?: (e: any) => any,
}


export default function HelperCard({ icon, title, onClick }: HelperCardProps) {
    return (
        <Card onClick={onClick ? onClick : () => {}} className='w-full cursor-pointer transition-all hover:bg-muted'>
            <CardContent>
                <CardHeader>
                    <CardTitle className='flex flex-row justify-center items-center gap-5 text-sm sm:text-md md:text-lg lg:text-xl'>
                        <span>{icon}</span>
                        <span>{title}</span>
                     </CardTitle>
                </CardHeader>
            </CardContent>
        </Card>
    )
}
