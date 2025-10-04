// main.js

const { analyzeWinRates } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameInsights1");
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
            console.log(`${games.length} games fetched.`);
            return games;
        },
        (games) => {
            console.log("Parsing PGNs...");
            return parsePgns(games);
        },
        (games) => {
            console.log("Computing game metrics...");
            games.forEach(game => initGameMetrics1(game));
            return games;
        },
        (games) => {
            console.log("\n=== WIN RATE ANALYSIS ===");
            const stats = analyzeWinRates(games, usernames);
            console.log(`Total Games: ${stats.totalGames}`);
            console.log(`Wins: ${stats.wins} (${stats.winRate}%)`);
            console.log(`Losses: ${stats.losses} (${stats.lossRate}%)`);
            console.log(`Draws: ${stats.draws} (${stats.drawRate}%)`);
            console.log(`\nAs White: ${stats.asWhite.wins}/${stats.asWhite.games} (${stats.asWhite.winRate}%)`);
            console.log(`As Black: ${stats.asBlack.wins}/${stats.asBlack.games} (${stats.asBlack.winRate}%)\n`);
            return games;
        }
    ]);

    await mainPipeline.invoke();
})();