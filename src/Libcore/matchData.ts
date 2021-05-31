export interface PlayerData {
    summonerName: string,
    championName: string,
    level: number,
    cs: number,
    kills: number,
    deaths: number,
    assists: number,
    summoner1Id: string,
    summoner2Id: string,
    itemsIds: Array<any>,
    win: boolean
}

export interface MatchData {
    startTimestamp: number,
    gameDuration: number,
    SummonerInfo: PlayerData | undefined,
    OtherPlayers: Array<PlayerData>
}

function getPlayersData(data: any): Map<string, PlayerData> {
    const result = new Map<string, PlayerData>();
    for (const participant of data) {
        let playerData: PlayerData = {
            summonerName: participant.summonerName,
            championName: participant.championName,
            level: participant.champLevel,
            cs: participant.totalMinionsKilled,
            kills: participant.kills,
            deaths: participant.deaths,
            assists: participant.assists,
            summoner1Id: participant.summoner1Id,
            summoner2Id: participant.summoner2Id,
            itemsIds: [
                participant.item0,
                participant.item1,
                participant.item2,
                participant.item3,
                participant.item4,
                participant.item5,
                participant.item6
            ],
            win: participant.win
        }
        result.set(participant.summonerName, playerData);
    }
    return result;
}

export const MatchDataFromRiotApiJson = (data: any, summonerName: string): MatchData => {
    const playersMap: Map<string, PlayerData> = getPlayersData(data.info.participants);
    const summoner = playersMap.get(summonerName);

    let result: MatchData = {
        startTimestamp: data.info.gameCreation,
        gameDuration: data.info.gameDuration,
        SummonerInfo: summoner,
        OtherPlayers: Array.from(playersMap.values())
    };
    return result;
}