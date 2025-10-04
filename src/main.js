// main.js

const cliProgress = require('cli-progress');
const { analyzeWinRates, analyzeWinRatesByMetrics } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameInsights1");
const { initGameMetrics1 } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameMetrics1");
const { parsePgns } = require("./Layers/2_AnalysisLayer/1_Preprocessing/Parsing");
const { fetchAllUsersGames } = require("./Layers/1_ProxyLayer/Fetchers");
const { Pipeline } = require("./Util/Pipeline");
const { evaluateGamePositions } = require('./Layers/2_AnalysisLayer/1_Preprocessing/GamePositions');

const printMetricStats = (title, stats) => {
    console.log(`\n${title}:`);
    Object.entries(stats).forEach(([key, value]) => {
        console.log(`  ${key}: ${value.wins}/${value.games} (${value.winRate}%)`);
    });
};

(async () => {
    console.log('\nStarting pipeline...\n');

    const usernames = ['ffffattyyyy'] //,  'ffatty190', 'ffatty120', 'ffatty', 'ffatty140', 'fffatty', 'ffattyyy'];

    const mainPipeline = new Pipeline('Root', [
        async () => {
            console.log("\nFetching games...")
            const games = await fetchAllUsersGames(usernames);
            console.log(`${games.length} games fetched.`);
            return games;
        },
        (games) => {
            console.log("\nParsing PGNs...");
            const parsed = parsePgns(games);
            return parsed;
        },
        (games) => {
            console.log("\nComputing game metrics...");
            const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            bar.start(games.length, 0);

            games.forEach((game, i) => {
                initGameMetrics1(game);
                bar.update(i + 1);
            });

            bar.stop();
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
            console.log("\nAnalyzing game positions...");
            const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
            bar.start(games.length, 0);
            games.forEach((game, i) => {
                evaluateGamePositions(game)
                bar.update(i+1);
            })
            bar.stop();
            console.log(games)
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