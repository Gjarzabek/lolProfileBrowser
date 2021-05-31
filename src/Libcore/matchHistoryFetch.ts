import {MatchDataFromRiotApiJson} from './matchData'

let matchN: number = 0;

function fetchMatchData(region: string, matchIdList: string, currentId: number, insertCallback: any, summonerName: string, API_KEY: string) {
    fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchIdList[currentId]}?api_key=${API_KEY}`)
    .then((res)=>{
        if (res.status === 404) {
            insertCallback('emptyMatch');
            return;
        }
        res.json().then((data) => {
            currentId++;
            console.log(data.metadata.matchId)
            insertCallback(MatchDataFromRiotApiJson(data, summonerName));
            if (currentId < matchN) {
                fetchMatchData(region, matchIdList, currentId, insertCallback, summonerName, API_KEY);
            }
        });
    });
}

export const getLasstNMatches = (region: string, puuid: string, callback: any, n: number, summonerName: string, API_KEY: string): void => {
    fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${n}&api_key=${API_KEY}`)
    .then((res) => {
        console.log("res", res.status, res.statusText);
        res.json().then((data)=>{
            matchN = n;
            console.log("playersIds:", data);
            if (!data || data.length === 0) {
                console.log('nohistory');
                callback('noHistory');
                return;
            }
            fetchMatchData(region, data, 0, callback, summonerName, API_KEY);
        });
    })
}