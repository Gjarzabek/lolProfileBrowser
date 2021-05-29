import {API_KEY} from './apiKey'

export const getLasstNMatches = (region: string, puuid: string, callback: any, n: number = 10): void => {
    fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${n}&api_key=${API_KEY}`)
    .then((res) => {
        console.log("res", res.status, res.statusText);
        res.json().then((data)=>{
            console.log("playersIds:", data);
            fetch(`https://${region}.api.riotgames.com/lol/match/v5/matches/${data[0]}?api_key=${API_KEY}`).then(res=>res.json())
            .then(data => callback(data)); //checkedData
        });
    })
}