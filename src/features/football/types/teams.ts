export type ResponseTeam = {
  id: number
  name: string
  code: string
  country: string
  founded: number
  national: boolean
  logo: string
}

export type ResponseVenue = {
  id: number
  name: string
  address: string
  city: string
  capacity: number
  surface: string
  image: string
}

export type TeamsResponse =
  | {
      response: { team: ResponseTeam; venue: ResponseVenue }[]
    }
  | { message: string }
