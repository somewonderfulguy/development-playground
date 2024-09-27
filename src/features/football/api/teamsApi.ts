import { sql } from '@vercel/postgres'

import { request } from '@/utils/request'
import { TeamMappingEntry, TheSportsDBTeamsResponse } from '../types/teamTypes'

export const getTeamsByLeague = (leagueName: 'English%20Premier%20League' | 'English%20League%20Championship') =>
  request<TheSportsDBTeamsResponse>(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueName}`)

export const getTeamsMapping = async () => {
  const { rows: teams } = await sql<TeamMappingEntry>`SELECT * FROM football_teams`
  return teams
}
