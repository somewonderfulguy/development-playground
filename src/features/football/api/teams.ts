import { TeamsResponse } from '../types/teams'

const currentYear = new Date().getFullYear()

// TODO: try to use custom `request` method
export const getTeamsByLeague = (league: number) =>
  fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?league=${league}&season=${currentYear}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': process.env.RAPIDAPI_KEY as string
    }
  }).then((response) => response.json()) as Promise<TeamsResponse>
