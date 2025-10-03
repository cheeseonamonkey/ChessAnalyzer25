// main.js

const { initGameInsights1, analyzeWinRates } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameInsights1");
const { initGameMetrics1 } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameMetrics1");
const { parsePgns } = require("./Layers/2_AnalysisLayer/1_Preprocessing/Parsing");
const { fetchAllUsersGames } = require("./Layers/1_ProxyLayer/Fetchers");
const { Pipeline } = require("./Util/Pipeline");

(async () => {
    console.log('Starting pipeline...');

    const usernames = ['ffffattyyyy', 'ffatty100', 'ffatty110', 'ffatty190', 'ffatty120', 'ffatty', 'ffatty140'];

    const mainPipeline = new Pipeline('Root', [
        async () => {
            console.log("Fetching games...")
            const games = await fetchAllUsersGames(usernames);
            console.log(games.length + ' games fetched.');
            return games;
        },
        (arr) => {
            console.log("Parsing PGNs...");
            return parsePgns(arr);
        },
        (arr) => {
            console.log("Getting GameMetrics1...");
            arr.forEach(game => initGameMetrics1(game));
            return arr;
        },
        (arr) => {
            console.log("Getting GameInsights1...");
            arr.forEach(game => initGameInsights1(game, usernames));
            return arr;
        },
        (arr) => {
            console.log("\n=== WIN RATE ANALYSIS ===\n");

            
            return arr;
        }
    ]);

    await mainPipeline.invoke();
})();