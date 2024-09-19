import { getTeamsByLeague } from '@/features/football/api/teamsApi'
import { TheSportsDBTeam } from '@/features/football/types/teamTypes'
import { notFound } from 'next/navigation'

const handleResponse = (teams: TheSportsDBTeam[], teamId: string) => {
  const team = teams.find((team) => team.idTeam === teamId)

  if (!team) return null

  return {
    id: team.idTeam,
    name: team.strTeam,
    founded: +team.intFormedYear,
    logo: team.strBadge,
    venue: team.strStadium,
    instagram: team.strInstagram,
    facebook: team.strFacebook,
    twitter: team.strTwitter,
    youtube: team.strYoutube,
    website: team.strWebsite
  }
}

const oneHour = 60 * 60 * 1000
export const revalidate = oneHour * 24

async function getTeam(teamId: string) {
  const teams = await Promise.all([
    getTeamsByLeague('English%20Premier%20League'),
    getTeamsByLeague('English%20League%20Championship')
  ])
    .then((responses) => responses.flatMap((response) => response.teams))
    .then((teams) => handleResponse(teams, teamId))
  return teams
}

type Props = {
  params: { teamId: string }
}

export default async function TeamPage({ params: { teamId } }: Props) {
  const team = await getTeam(teamId)

  if (!team) return notFound()

  return (
    <div>
      Team Page - {team.name}
      <pre>{JSON.stringify(team, null, 2)}</pre>
      <div>TODOs</div>
      <ul>
        <li>
          highlights
          <ul>
            <li>last fixture</li>
            <li>next fixture</li>
            <li>top player</li>
            <li>coach</li>
            <li>stadium</li>
          </ul>
        </li>
        <li>links (website, social media)</li>
        <li>stats</li>
        <li>players</li>
      </ul>
    </div>
  )
}
