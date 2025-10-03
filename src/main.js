// main.js

const { initGameInsights1, analyzeWinRates } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameInsights1");
const { initGameMetrics1 } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameMetrics1");
const { parsePgns } = require("./Layers/2_AnalysisLayer/1_Preprocessing/Parsing");
const { fetchAllUsersGames } = require("./Layers/1_ProxyLayer/Fetchers");
const { Pipeline } = require("./Util/Pipeline");

(async () => {
    console.log('Starting pipeline...');

    const usernames = ['ffffattyyyy', 'ffatty120', 'ffatty', 'ffatty150'];

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
            const winRates = analyzeWinRates(arr, usernames);
            
            usernames.forEach(user => {
                const s = winRates[user];
                if (s.totalGames === 0) {
                    console.log(`${user}: No games found`);
                    return;
                }
                
                console.log(`${user}:`);
                console.log(`  Total Games: ${s.totalGames}`);
                console.log(`  Overall: ${s.wins}W / ${s.losses}L / ${s.draws}D (${s.winRate}% win rate)`);
                console.log(`  As White: ${s.asWhite.wins}/${s.asWhite.games} (${s.asWhite.winRate}%)`);
                console.log(`  As Black: ${s.asBlack.wins}/${s.asBlack.games} (${s.asBlack.winRate}%)`);
                console.log();
            });
            
            return arr;
        }
    ]);

    await mainPipeline.invoke();
})();