// main.js

const { getTurnCastled, getCastleType, getWinner, getWinnerColor } = require("./Layers/AnalysisLayer/Preprocessing/GameMetrics1");
const { parsePgns } = require("./Layers/AnalysisLayer/Preprocessing/Parsing");
const { fetchAllUsersGames } = require("./Layers/ProxyLayer/Fetchers");
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
                data.forEach(game => {

                    // objective: 
                    
                    game.metrics['WinnerColor'] = getWinnerColor(game) //color won
                    game.metrics['Winner'] = getWinner(game) //user won
                    // white:
                    game.metrics['White']['CastleTurn'] = getTurnCastled(game, 'white')
                    game.metrics['White']['CastleType'] = getCastleType(game, 'white')

                    // black:
                    game.metrics['Black']['CastleTurn'] = getTurnCastled(game, 'black')
                    game.metrics['Black']['CastleType'] = getCastleType(game, 'black')

                });

               


                return data;
            },
            //(data) => { return data; }
        ]
    )

    let out = await mainPipeline.invoke([])
    //console.log(out.map(it => it.metrics))


}
)();