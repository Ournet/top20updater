
export type Ratings = {
    alexaBacklinks?: number
    alexaBounceRate?: number
    alexaCountryRank?: number
    alexaCountryCode?: string
    alexaPageviewsPerVisitor?: number
    alexaRank?: number
    alexaSearchVisits?: number
    alexaTimeOnSite?: number
    googleBacklinks?: number
    googlePages?: number
    // GoogleRank: 'GoogleRank',
    yandexRank?: number
    createdAt?: number
    rank?: number
    [index: string]: any
}

export type Website = {
    id: number
    host?: string
    ratings?: any
    country?: string
}
