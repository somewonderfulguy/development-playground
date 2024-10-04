'use client'

import { UserIcon } from 'lucide-react'

import { TooltipGroup } from '@/components/ui/tooltip'
import { getFirstTwoCapitalLetters } from '@/utils/getFirstTwoCapitalLetters'

import AppControlButton from '../AppControlButton'

type Props = {
  onSignIn: () => Promise<void>
  onSignOut: () => Promise<void>
  image?: string | null
  name?: string | null
}

export default function UserButtonClient({ onSignIn, onSignOut, name }: Props) {
  return (
    <>
      {!name ? (
        // TODO: Localize
        <TooltipGroup tooltipContent={<p>Log in</p>}>
          <AppControlButton onClick={() => onSignIn()}>
            <UserIcon className="h-4 w-4" />
          </AppControlButton>
        </TooltipGroup>
      ) : (
        // TODO: Localize
        <TooltipGroup tooltipContent={<p>User menu</p>}>
          <AppControlButton onClick={() => onSignOut()}>{getFirstTwoCapitalLetters(name)}</AppControlButton>
        </TooltipGroup>
      )}
    </>
  )
}

//  <DropdownMenu>
//    <DropdownMenuTrigger asChild>
//      <Avatar>
//        <AvatarImage src={session?.user?.image!} />
//        <AvatarFallback>{getFirstTwoCapitalLetters(session?.user?.name)}</AvatarFallback>
//      </Avatar>
//    </DropdownMenuTrigger>
//    <DropdownMenuContent>
//      <DropdownMenuItem
//        onClick={() => {
//          onSignOut()
//        }}
//      >
//        Sign Out
//      </DropdownMenuItem>
//    </DropdownMenuContent>
//  </DropdownMenu>
