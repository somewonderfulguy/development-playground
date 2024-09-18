// export async function generateStaticParams() {
//   let posts: Post[] = await fetch('https://api.vercel.app/blog').then((res) => res.json())
//   return posts.map((post) => ({
//     id: post.id
//   }))
// }

import { getTeamsByLeague } from '@/features/football/api/teamsApi'
import { TheSportsDBTeamsResponse } from '@/features/football/types/teamTypes'

// export default async function Page({ params }: { params: { id: string } }) {
//   let post = await fetch(`https://api.vercel.app/blog/${params.id}`).then((res) => res.json())
//   return (
//     <main>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//     </main>
//   )
// }

const handleResponse = (response: TheSportsDBTeamsResponse) => {
  return response.teams.map((team) => team.idTeam)
}

export async function generateStaticParams() {
  const teamIds = await Promise.all([
    getTeamsByLeague('English%20Premier%20League').then(handleResponse),
    getTeamsByLeague('English%20League%20Championship').then(handleResponse)
  ]).then((responses) => responses.flat())
  return teamIds
}

type Props = {
  params: { teamId: string }
}

export default function TeamPage({ params: { teamId } }: Props) {
  return <div>Team Page - {teamId}</div>
}
