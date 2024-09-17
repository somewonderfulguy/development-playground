import Image from 'next/image'

import { getTeamsByLeague } from '@/features/football/api/teams'
import { TeamsResponse } from '@/features/football/types/teams'

const handleResponse = (response: TeamsResponse) => {
  if ('message' in response) {
    console.error(response.message)

    throw new Error(
      response.message.toLowerCase() === 'too many requests'
        ? 'Football API limit per day is 100 requests. Please try again later.'
        : response.message
    )
  }

  return response.response.map(({ team, venue }) => ({
    id: team.id,
    name: team.name,
    founded: team.founded,
    logo: team.logo,
    venue: venue.name,
    city: venue.city
  }))
}

const oneHour = 60 * 60 * 1000
export const revalidate = oneHour * 24

async function getProjects() {
  const teams = await Promise.all([
    getTeamsByLeague(39).then(handleResponse),
    getTeamsByLeague(40).then(handleResponse)
  ]).then((responses) => responses.flat())
  return teams
}

export default async function FCClubsPage() {
  const teams = await getProjects()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Premier League & EFL Championship Clubs</h1>
      <div className="flex flex-wrap">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-[300px] h-[340px] m-4 group hover:shadow-lg transition-all duration-300 relative"
          >
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative h-[150px] w-full scale-95 group-hover:scale-100 transition-scale duration-300">
                <Image src={team.logo} alt={`${team.name} logo`} objectFit="contain" layout="fill" />
              </div>
            </div>
            <div className="p-4 bg-gray-100 text-left h-[88px]" />
            <div className="p-4 bg-gray-100 text-left transition-all duration-300 absolute bottom-0 left-0 right-0 group-hover:translate-y-[-22px] h-[88px]">
              <h2 className="text-xl font-bold mb-2">{team.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-1">
                {team.venue}, {team.city}
              </p>
              <p className="pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-400">
                est. {team.founded}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
