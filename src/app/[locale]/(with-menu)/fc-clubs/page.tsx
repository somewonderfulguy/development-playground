import Image from 'next/image'
import Link from 'next/link'

import { getTeamsByLeague, getTeamsMapping } from '@/features/football/api/teamsApi'
import { TheSportsDBTeamsResponse } from '@/features/football/types/teamTypes'
import { setStaticParamsLocale } from 'next-international/server'
import { getScopedI18n, getStaticParams } from '@/locales/server'

// TODO: move to utils
function toCamelCase(str: string) {
  return str
    .trim()
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('')
}

const handleSportsDBResponse = (response: TheSportsDBTeamsResponse) => {
  return response.teams.map((team) => ({
    id: team.idTeam,
    founded: +team.intFormedYear,
    logo: team.strBadge,
    venue: team.strStadium,
    city: team.strLocation
  }))
}

const oneHour = 60 * 60 * 1000
export const revalidate = oneHour * 24

export function generateStaticParams() {
  return getStaticParams()
}

async function getTeams() {
  const sportsDBTeams = await Promise.all([
    getTeamsByLeague('English%20Premier%20League').then(handleSportsDBResponse),
    getTeamsByLeague('English%20League%20Championship').then(handleSportsDBResponse)
  ]).then((responses) => responses.flat())

  const teamsMapping = await getTeamsMapping()

  const t = await getScopedI18n('football')

  return sportsDBTeams
    .map((team) => {
      const mapping = teamsMapping.find((mapping) => mapping.thesportsdb_team_id === +team.id)

      return {
        ...team,
        name: t(`clubNames.${mapping?.team_name}` as 'clubNames.arsenal')
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

type Props = {
  params: { locale: string }
}

export default async function FCClubsPage({ params: { locale } }: Props) {
  setStaticParamsLocale(locale)

  const t = await getScopedI18n('football')

  const teams = await getTeams()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{t('homeTitle')}</h1>
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
              <h2 className="text-xl font-bold mb-2 text-primary">{team.name}</h2>
              <p className="text-sm line-clamp-1 text-primary/60">
                {team.venue}, {team.city}
              </p>
              <p className="pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-primary/40">
                est. {team.founded}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
