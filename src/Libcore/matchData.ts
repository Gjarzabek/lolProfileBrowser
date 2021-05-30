interface PlayerData {
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
}

export interface MatchData {
    startTimestamp: number,
    gameDuration: number,
    SummonerInfo: PlayerData | undefined,
    OtherPlayers: Map<string, PlayerData>
}

function getPlayersData(data: any): Map<string, PlayerData> {
    return new Map();
}

export const MatchDataFromRiotApiJson = (data: any, summonerName: string): MatchData {
    const playersMap: Map<string, PlayerData> = getPlayersData(data);
    let result: MatchData = {
        startTimestamp: data.info.gameCreation,
        gameDuration: data.info.gameDuration,
        SummonerInfo: playersMap.get(summonerName),
        OtherPlayers: playersMap.delete(summonerName)
    };
    return result;
}