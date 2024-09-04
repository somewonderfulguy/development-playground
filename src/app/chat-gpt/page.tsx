import Chat from '@/app/chat-gpt/components/Chat'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { auth } from '@/auth'

export default async function Home() {
  const session = await auth()

  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Welcome To GPT Chat</h1>
      {!session?.user?.email ? (
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
