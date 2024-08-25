'use client'

export default function ClientComponent() {
  console.log('hello from client component')
  return (
    <main>
      <h1
        className="text-4xl font-bold"
        onClick={() => {
          console.log('hey')
        }}
      >
        Client Component
      </h1>
      <div className="mt-5">Client Component</div>
    </main>
  )
}
