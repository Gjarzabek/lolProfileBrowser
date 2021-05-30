export interface MatchData {
    startTimestamp: number,
    gameDuration: number,
    SummonerInfo: {
        championName: string,
        level: number,
        cs: number,
        kills: number,
        deaths: number,
        assists: number,
        summoner1: string,
        summoner2: string,
        itemsIds: [number],
        win: boolean
    },
    IngamePlayers: [
        {
            playerName: string,
            championName: string,
            kills: number,
            deaths: number,
            assists: number
        }
    ]
}