// main.js

const { analyzeWinRates, analyzeWinRatesByMetrics } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameInsights1");
const { initGameMetrics1 } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameMetrics1");
const { parsePgns } = require("./Layers/2_AnalysisLayer/1_Preprocessing/Parsing");
const { fetchAllUsersGames } = require("./Layers/1_ProxyLayer/Fetchers");
const { Pipeline } = require("./Util/Pipeline");

const printMetricStats = (title, stats) => {
    console.log(`\n${title}:`);
    Object.entries(stats).forEach(([key, value]) => {
        console.log(`  ${key}: ${value.wins}/${value.games} (${value.winRate}%)`);
    });
};

(async () => {
    console.log('Starting pipeline...');

    const usernames = ['ffffattyyyy', 'ffatty100', 'ffatty190', 'ffatty120', 'ffatty', 'ffatty140'];

    const mainPipeline = new Pipeline('Root', [
        async () => {
            console.log("Fetching games...")
            const games = await fetchAllUsersGames(usernames);
            console.log(`${games.length} games fetched.`);
            return games;
        },
        (games) => {
            console.log("\nParsing PGNs...");
            return parsePgns(games);
        },
        (games) => {
            console.log("\nComputing game metrics...");
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
        },
        (games) => {
            console.log("\n=== WIN RATES BY GAME METRICS ===");
            const metricStats = analyzeWinRatesByMetrics(games, usernames);
            
            printMetricStats("By Castle Timing", metricStats.byCastleTurn);
            printMetricStats("By Castle Type", metricStats.byCastleType);
            printMetricStats("By Queen Tap Timing", metricStats.byQueenTapTurn);
            printMetricStats("By First Capture Timing", metricStats.byFirstCaptureTurn);
            printMetricStats("By Total Captures", metricStats.byTotalCaptures);
            printMetricStats("By Total Checks", metricStats.byTotalChecks);
            printMetricStats("By Promotions", metricStats.byPromotions);
            
            return games;
        }
    ]);

    await mainPipeline.invoke();
})();