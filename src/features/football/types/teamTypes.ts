export type ApiFootballResponseTeam = {
  id: number
  name: string
  code: string
  country: string
  founded: number
  national: boolean
  logo: string
}

export type ApiFootballResponseVenue = {
  id: number
  name: string
  address: string
  city: string
  capacity: number
  surface: string
  image: string
}

export type ApiFootballTeamsResponse =
  | {
      response: { team: ApiFootballResponseTeam; venue: ApiFootballResponseVenue }[]
    }
  | { message: string }

export type TheSportsDBTeam = {
  idTeam: string
  idSoccerXML: string
  idAPIfootball: string
  intLoved: string
  strTeam: string
  strTeamAlternate: string
  strTeamShort: string
  intFormedYear: string
  strSport: string
  strLeague: string
  idLeague: string | null
  strLeague2: string
  idLeague2: string | null
  strLeague3: string
  idLeague3: string | null
  strLeague4: string
  idLeague4: string | null
  strLeague5: string
  idLeague5: string | null
  strLeague6: string
  idLeague6: string | null
  strLeague7: string
  idLeague7: string | null
  strDivision: string | null
  idVenue: string
  strStadium: string
  strKeywords: string
  strRSS: string
  strLocation: string
  intStadiumCapacity: string
  strWebsite: string
  strFacebook: string
  strTwitter: string
  strInstagram: string
  strDescriptionEN: string | null
  strDescriptionDE: string | null
  strDescriptionFR: string | null
  strDescriptionCN: string | null
  strDescriptionIT: string | null
  strDescriptionJP: string | null
  strDescriptionRU: string | null
  strDescriptionES: string | null
  strDescriptionPT: string | null
  strDescriptionSE: string | null
  strDescriptionNL: string | null
  strDescriptionHU: string | null
  strDescriptionNO: string | null
  strDescriptionIL: string | null
  strDescriptionPL: string | null
  strColour1: string
  strColour2: string
  strColour3: string
  strGender: string
  strCountry: string
  strBadge: string
  strLogo: string
  strFanart1: string
  strFanart2: string
  strFanart3: string
  strFanart4: string
  strBanner: string
  strEquipment: string
  strYoutube: string
  strLocked: string
}

export type TheSportsDBTeamsResponse = {
  teams: TheSportsDBTeam[]
}

export type TeamMappingEntry = {
  thesportsdb_team_id: number
  api_football_team_id: number
  team_name: string
}

export type VenueMappingEntry = {
  thesportsdb_venue_id: number
  api_football_venue_id: number
  venue_name: string
  id: number
}
