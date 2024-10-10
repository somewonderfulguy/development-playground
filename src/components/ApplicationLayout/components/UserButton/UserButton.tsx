'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { UserIcon } from 'lucide-react'

import { TooltipGroup } from '@/components/ui/tooltip'
import { getFirstTwoCapitalLetters } from '@/utils/getFirstTwoCapitalLetters'

import AppControlButton from '../AppControlButton'

export default function UserButton() {
  const { data: session, status } = useSession()
  // status === "authenticated"
  // status === "unauthenticated"
  // session?.user?.image
  // session?.user?.name

  return (
    <>
      {status === 'unauthenticated' && (
        // TODO: Localize
        <TooltipGroup tooltipContent={<p>Log in</p>}>
          <AppControlButton onClick={() => signIn()}>
            <UserIcon className="h-4 w-4" />
          </AppControlButton>
        </TooltipGroup>
      )}
      {status === 'authenticated' && (
        // TODO: Localize
        <TooltipGroup tooltipContent={<p>User menu</p>}>
          <AppControlButton onClick={() => signOut()}>
            {getFirstTwoCapitalLetters(session?.user?.name)}
          </AppControlButton>
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
