// main.js

const { initGameInsights1 } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameInsights1");
const { getTurnCastled, getCastleType, getWinner, getWinnerColor, getMoveCount, getCaptureCount, getMovesByColor, getCapturesByColor, getCheckCount, getChecksByColor, getFirstCaptureTurn, getPromotionCount, getPromotionsByColor, hasCastled, initGameMetrics1 } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameMetrics1");
const { parsePgns } = require("./Layers/2_AnalysisLayer/1_Preprocessing/Parsing");
const { fetchAllUsersGames } = require("./Layers/1_ProxyLayer/Fetchers");
const { Pipeline } = require("./Util/Pipeline");

//test run 
(async () => {


    console.log('Starting pipeline...');

    const mainPipeline = new Pipeline('Root',
        [
            async (_) => {
                console.log("Fetching games...")
                const games = await fetchAllUsersGames(['ffffattyyyy'])
                //const games = await fetchAllUsersGames(['ffatty190','ffatty200','ffatty180','ffatty170','ffatty160','ffatty150','ffatty130','ffatty120','ffatty110','ffatty110','ffatty100','ffattyyyy','ffffatty','fffatty','fffattyy','ffattyy','fffattyy','ffatty','ffffattyyyy'])
                console.log(games.length + ' games fetched.');
                return games;
            },
            (data) => {
                console.log("Parsing PGNs...")
                const parsed = parsePgns(data);
                return parsed;
            },
            (data) => {
                console.log("Getting GameMetrics1...")
                data.forEach(game => initGameMetrics1(game) );
                return data;
            },
            (data) => {
                console.log("Getting GameInsights1...");
                data.forEach(game => initGameInsights1(game) );
                return data;
            }
            //(data) => { return data; },
            //(data) => { return data; },
            //(data) => { return data; },
        ]
    )

    let out = await mainPipeline.invoke()
    //console.log(out.map(it => it.metrics))


}
)();