// main.js

const { initGameInsights1 } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameInsights1");
const { getTurnCastled, getCastleType, getWinner, getWinnerColor, getMoveCount, getCaptureCount, getMovesByColor, getCapturesByColor, getCheckCount, getChecksByColor, getFirstCaptureTurn, getPromotionCount, getPromotionsByColor, hasCastled, initGameMetrics1 } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameMetrics1");
const { parsePgns } = require("./Layers/2_AnalysisLayer/1_Preprocessing/Parsing");
const { fetchAllUsersGames } = require("./Layers/1_ProxyLayer/Fetchers");
const { Pipeline } = require("./Util/Pipeline");

//test run 
(async () => {


    console.log('Starting pipeline...');

    const usernames = ['ffffattyyyy']  // ['ffatty190','ffatty200','ffatty180','ffatty170','ffatty160','ffatty150','ffatty130','ffatty120','ffatty110','ffatty110','ffatty100','ffattyyyy','ffffatty','fffatty','fffattyy','ffattyy','fffattyy','ffatty','ffffattyyyy']

    const mainPipeline = new Pipeline('Root',
        [
            async () => {
                console.log("Fetching games...")
                const games = await fetchAllUsersGames(usernames)
                
                console.log(games.length + ' games fetched.');
                return games;
            },
            (arr) => {
                console.log("Parsing PGNs...")
                const parsed = parsePgns(arr);
                return parsed;
            },
            (arr) => {
                console.log("Getting GameMetrics1...")
                arr.forEach(game => initGameMetrics1(game) );
                return arr;
            },
            (arr) => {
                console.log("Getting GameInsights1...");
                arr.forEach(game => initGameInsights1(game, usernames) );
                return arr;
            },
            (arr) => {
                console.log(arr[1].metrics)
                console.log(arr[3].metrics)
                console.log(arr[5].metrics)
                console.log(arr[9].metrics)
                console.log(arr[7].metrics)
                return data;
            },
            //(arr) => { return data; },
            //(arr) => { return data; },
        ]
    )

    let out = await mainPipeline.invoke()
    //console.log(out.map(it => it.metrics))


}
)();