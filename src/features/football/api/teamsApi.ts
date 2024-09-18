import {
  // ApiFootballTeamsResponse,
  TheSportsDBTeamsResponse
} from '../types/teamTypes'

// const currentYear = new Date().getFullYear()

// const API_FOOTBALL_PREMIERE_LEAGUE = 39 as const
// const API_FOOTBALL_EFC_CHAMPIONSHIP = 40 as const

// TODO: try to use custom `request` method
// export const getTeamsByLeague = (league: number) =>
//   fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?league=${league}&season=${currentYear}`, {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
//       'x-rapidapi-key': process.env.RAPIDAPI_KEY as string
//     }
//   }).then((response) => response.json()) as Promise<ApiFootballTeamsResponse>

// TODO: try to use custom `request` method
export const getTeamsByLeague = (leagueName: 'English%20Premier%20League' | 'English%20League%20Championship') =>
  fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${leagueName}`).then((response) =>
    response.json()
  ) as Promise<TheSportsDBTeamsResponse>
