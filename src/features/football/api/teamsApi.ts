import { request } from '@/utils/request'
import { TheSportsDBTeamsResponse } from '../types/teamTypes'

export const getTeamsByLeague = (leagueName: 'English%20Premier%20League' | 'English%20League%20Championship') =>
  request<TheSportsDBTeamsResponse>(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueName}`)
