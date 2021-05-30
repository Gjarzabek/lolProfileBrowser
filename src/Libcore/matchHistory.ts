import {API_KEY} from './apiKey'

let matchN: number = 0;

function fetchMatchData(region: string, matchIdList: string, currentId: number, insertCallback: any) {
    fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchIdList[currentId]}?api_key=${API_KEY}`).then(res=>res.json())
    .then((data) => {
        currentId++;
        console.log(data.metadata.matchId)
        insertCallback(data.metadata);
        if (currentId < matchN) {
            fetchMatchData(region, matchIdList, currentId, insertCallback);
        }
    });
}

export const getLasstNMatches = (region: string, puuid: string, callback: any, n: number): void => {
    fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${n}&api_key=${API_KEY}`)
    .then((res) => {
        console.log("res", res.status, res.statusText);
        res.json().then((data)=>{
            matchN = n;
            fetchMatchData(region, data, 0, callback);
            console.log("playersIds:", data);
        });
    })
}