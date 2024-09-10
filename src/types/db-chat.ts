export type Chat = {
  id: string
  name: string
  user_email: string
  timestamp: Date
}

export type Message = {
  role: 'user' | 'assistant'
  content: string
}

export type StoredMessage = Message & {
  id: number
  chat_id: number
}

export type ChatWithMessages = Chat & {
  messages: StoredMessage[]
}
