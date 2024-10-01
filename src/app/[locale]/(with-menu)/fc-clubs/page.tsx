import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { setStaticParamsLocale } from 'next-international/server'

import { getTeamsByLeague, getTeamsMapping, getVenuesMapping } from '@/features/football/api/teamsApi'
import { TheSportsDBTeamsResponse } from '@/features/football/types/teamTypes'
import { getScopedI18n, getStaticParams } from '@/locales/server'

export async function generateMetadata() {
  const t = await getScopedI18n('football')
  return {
    title: t('homeTitle')
  } satisfies Metadata
}

// TODO: move outside
function toCamelCase(str: string) {
  return str
    .trim()
    .toLowerCase()
    .split(/[\s-_]+/)
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('')
}

// TODO: move outside
const handleSportsDBResponse = (response: TheSportsDBTeamsResponse) => {
  return response.teams.map((team) => ({
    id: team.idTeam,
    founded: +team.intFormedYear,
    logo: team.strBadge,
    venue: toCamelCase(team.strStadium),
    venueId: team.idVenue,
    city: team.strLocation
  }))
}

const oneHour = 60 * 60 * 1000
export const revalidate = oneHour * 24

export function generateStaticParams() {
  return getStaticParams()
}

// TODO: move outside
async function getTeams() {
  const sportsDBTeams = await Promise.all([
    getTeamsByLeague('English%20Premier%20League').then(handleSportsDBResponse),
    getTeamsByLeague('English%20League%20Championship').then(handleSportsDBResponse)
  ]).then((responses) => responses.flat())

  const [teamsMapping, venuesMapping] = await Promise.all([getTeamsMapping(), getVenuesMapping()])

  const teamsT = await getScopedI18n('football.teamNames')
  const venuesT = await getScopedI18n('football.venues')

  return sportsDBTeams
    .map(({ venueId, ...team }) => {
      const teamMapping = teamsMapping.find((mapping) => mapping.thesportsdb_team_id === +team.id)
      const venueMapping = venuesMapping.find((mapping) => mapping.thesportsdb_venue_id === +venueId)
      const venueName = venueMapping?.venue_name as 'amexStadium'

      return {
        ...team,
        name: teamsT(teamMapping?.team_name as 'arsenal'),
        city: venuesT(`${venueName}.city`),
        venue: venuesT(`${venueName}.name`)
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
      <h1 className="mb-6 text-3xl font-bold">{t('homeTitle')}</h1>
      <div className="flex flex-wrap">
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/fc-clubs/${team.id}`}
            className="group relative m-4 flex h-[340px] w-[300px] flex-col overflow-hidden rounded-lg bg-secondary shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex flex-1 items-center justify-center p-4">
              <div className="transition-scale relative h-[150px] w-full scale-95 duration-300 group-hover:scale-100">
                <Image src={team.logo} alt={`${team.name} logo`} objectFit="contain" layout="fill" />
              </div>
            </div>
            <div className="h-[88px] p-4" />
            <div className="absolute bottom-0 left-0 right-0 h-[110px] translate-y-[22px] bg-primary/[0.05] p-4 transition-all duration-300 group-hover:translate-y-[0px]">
              <h2 title={team.name} className="mb-2 line-clamp-1 text-xl font-bold text-primary">
                {team.name}
              </h2>
              <p title={`${team.venue} ${team.city}`} className="line-clamp-1 text-sm text-primary/60">
                {team.venue}, {team.city}
              </p>
              <p className="pb-4 text-sm text-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {t('established', { year: team.founded })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
