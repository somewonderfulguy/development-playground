import Image from 'next/image'
import Link from 'next/link'

import { getTeamsByLeague } from '@/features/football/api/teamsApi'
import { TheSportsDBTeamsResponse } from '@/features/football/types/teamTypes'

const handleResponse = (response: TheSportsDBTeamsResponse) => {
  return response.teams.map((team) => ({
    id: team.idTeam,
    name: team.strTeam,
    founded: +team.intFormedYear,
    logo: team.strBadge,
    venue: team.strStadium,
    city: team.strLocation
  }))
}

const oneHour = 60 * 60 * 1000
export const revalidate = oneHour * 24

async function getTeams() {
  const teams = await Promise.all([
    getTeamsByLeague('English%20Premier%20League').then(handleResponse),
    getTeamsByLeague('English%20League%20Championship').then(handleResponse)
  ]).then((responses) => responses.flat())
  return teams
}

export default async function FCClubsPage() {
  const teams = await getTeams()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Premier League & EFL Championship Clubs</h1>
      <div className="flex flex-wrap">
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/fc-clubs/${team.id}`}
            className="bg-secondary rounded-lg shadow-md overflow-hidden flex flex-col w-[300px] h-[340px] m-4 group hover:shadow-lg transition-all duration-300 relative"
          >
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative h-[150px] w-full scale-95 group-hover:scale-100 transition-scale duration-300">
                <Image src={team.logo} alt={`${team.name} logo`} objectFit="contain" layout="fill" />
              </div>
            </div>
            <div className="p-4 h-[88px]" />
            <div className="p-4 bg-primary/[0.05] text-left transition-all duration-300 absolute bottom-0 left-0 right-0 translate-y-[22px] group-hover:translate-y-[0px] h-[110px]">
              <h2 className="text-xl font-bold mb-2">{team.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-1">
                {team.venue}, {team.city}
              </p>
              <p className="pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-400">
                est. {team.founded}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
