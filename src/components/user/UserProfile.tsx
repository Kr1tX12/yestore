import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Progress } from '../ui/progress'

const UserProfile = () => {
  return (
    <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
            <Avatar className="size-8">
            <AvatarImage
                className="object-cover cursor-pointer"
                src="https://steamuserimages-a.akamaihd.net/ugc/2100422066956953334/BCFFD0DB0C56F71CD288304540E39FC2FADFD155/?imw=512&imh=341&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
                />
            <AvatarFallback>AB</AvatarFallback>
            </Avatar>

            <p className='truncate max-w-[80px]'>
                Карим
            </p>
        </div>
        <div className='flex flex-col items-center justify-center w-full max-w-20 gap-0 pb-2'>
            <p className='text-[8px] text-zinc-400 text-center h-4'>
                2GB / 4GB
            </p>
            <Progress value={50} className='[&>*]:bg-lime-400' />
        </div>
    </div>
  )
}

export default UserProfile