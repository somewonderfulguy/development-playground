import { Metadata } from 'next'
import { Separator } from '@radix-ui/react-dropdown-menu'

import Chat from './components/Chat'

export const metadata: Metadata = {
  title: 'ChatGPT'
}

export default async function GhatGPTPage() {
  // const session = await auth()

  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Welcome To GPT Chat</h1>
      {/* !session?.user?.email */}
      {/* eslint-disable-next-line no-constant-condition */}
      {true ? (
        <div>You need to log in to use this chat.</div>
      ) : (
        <>
          <Separator className="my-5" />
          <Chat />
        </>
      )}
    </main>
  )
}
