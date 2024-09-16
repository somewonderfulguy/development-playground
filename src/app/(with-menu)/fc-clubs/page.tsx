import Image from 'next/image'

type Team = {
  id: number
  name: string
  code: string
  country: string
  founded: number
  national: boolean
  logo: string
}

type Venue = {
  id: number
  name: string
  address: string
  city: string
  capacity: number
  surface: string
  image: string
}

type TeamsResponse = {
  response: { team: Team; venue: Venue }[]
}

const transformResponse = (response: TeamsResponse) =>
  response.response.map(({ team, venue }) => ({
    name: team.name,
    founded: team.founded,
    logo: team.logo,
    venue: venue.name,
    city: venue.city
  }))

const getTeamsByLeague = (league: number) =>
  fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?league=${league}&season=2024`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': '03df79ef40msh7cb39e7aff79126p189b51jsn678b9ab862b9'
    }
  }).then((response) => response.json()) as Promise<TeamsResponse>

const oneHour = 60 * 60 * 1000
export const revalidate = oneHour * 24

async function getProjects() {
  const teams = await Promise.all([
    getTeamsByLeague(39).then(transformResponse),
    getTeamsByLeague(40).then(transformResponse)
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
            key={team.name}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-[300px] h-[360px] m-4"
          >
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="relative h-[150px] w-full">
                <Image src={team.logo} alt={`${team.name} logo`} objectFit="contain" layout="fill" />
              </div>
            </div>
            <div className="p-4 bg-gray-100 text-left">
              <h2 className="text-xl font-bold mb-2">{team.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-1">
                {team.venue}, {team.city}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
