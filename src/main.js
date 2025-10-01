// main.js

const { getInsights } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameInsights1");
const { getTurnCastled, getCastleType, getWinner, getWinnerColor, getMoveCount, getCaptureCount, getMovesByColor, getCapturesByColor, getCheckCount, getChecksByColor, getFirstCaptureTurn, getPromotionCount, getPromotionsByColor, hasCastled } = require("./Layers/2_AnalysisLayer/1_Preprocessing/GameMetrics1");
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
                //const games = await fetchAllUsersGames(['ffffattyyyy'])
                const games = await fetchAllUsersGames(['ffatty190','ffatty200','ffatty180','ffatty170','ffatty160','ffatty150','ffatty130','ffatty120','ffatty110','ffatty110','ffatty100','ffattyyyy','ffffatty','fffatty','fffattyy','ffattyy','fffattyy','ffatty','ffffattyyyy'])
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
                data.forEach(game => {
                    // objective: 
                    game.metrics['WinnerColor'] = getWinnerColor(game);
                    game.metrics['Winner'] = getWinner(game);

                    // white:
                    game.metrics['White']['CastleTurn'] = getTurnCastled(game, { color: 'white' });
                    game.metrics['White']['CastleType'] = getCastleType(game, { color: 'white' });
                    game.metrics['White']['MoveCount'] = getMoveCount(game, { color: 'white' });
                    game.metrics['White']['CaptureCount'] = getCaptureCount(game, { color: 'white' });
                    game.metrics['White']['FirstCaptureTurn'] = getFirstCaptureTurn(game, { color: 'white' });
                    game.metrics['White']['CheckCount'] = getCheckCount(game, { color: 'white' });
                    game.metrics['White']['PromotionCount'] = getPromotionCount(game, { color: 'white' });
                    game.metrics['White']['HasCastled'] = hasCastled(game, { color: 'white' });

                    // black:
                    game.metrics['Black']['CastleTurn'] = getTurnCastled(game, { color: 'black' });
                    game.metrics['Black']['CastleType'] = getCastleType(game, { color: 'black' });
                    game.metrics['Black']['MoveCount'] = getMoveCount(game, { color: 'black' });
                    game.metrics['Black']['CaptureCount'] = getCaptureCount(game, { color: 'black' });
                    game.metrics['Black']['FirstCaptureTurn'] = getFirstCaptureTurn(game, { color: 'black' });
                    game.metrics['Black']['CheckCount'] = getCheckCount(game, { color: 'black' });
                    game.metrics['Black']['PromotionCount'] = getPromotionCount(game, { color: 'black' });
                    game.metrics['Black']['HasCastled'] = hasCastled(game, { color: 'black' });
                });
                return data;
            },
            (data) => {
                console.log("Calculating insights...");
                return getInsights(data);
            }
            //(data) => { return data; },
            //(data) => { return data; },
            //(data) => { return data; },
        ]
    )

    let out = await mainPipeline.invoke([])
    //console.log(out.map(it => it.metrics))


}
)();