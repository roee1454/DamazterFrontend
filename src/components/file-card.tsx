import { Card, CardContent, CardDescription } from '@/components/ui/card'
import PressableIcon from './pressable-icon'
import { X } from 'lucide-react'


interface FileCardProps {
    file: File
    handleRemoveFile: () => void
}

export default function FileCard({ file, handleRemoveFile }: FileCardProps) {
    return (
        <Card className='w-full min-h-12 rounded-md'>
            <CardContent className='flex flex-row justify-between items-center px-6 py-2'>
                <div className='flex flex-col justify-start items-start'>
                    <div>{file.name}</div>
                    <CardDescription>{file.size / 1000}kb</CardDescription>
                </div>
                <PressableIcon onClick={handleRemoveFile} type='button' icon={<X />} />
            </CardContent>
        </Card>
    )
}
