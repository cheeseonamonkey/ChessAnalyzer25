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
            (data) => {
                const userName = 'ffffattyyyy';
                
                // Count games by result
                const stats = data.reduce((acc, game) => {
                    const winner = game.metrics.Winner;
                    if (winner === userName) acc.wins++;
                    else if (winner === 'Draw') acc.draws++;
                    else acc.losses++;
                    return acc;
                }, { wins: 0, draws: 0, losses: 0 });
                
                const total = stats.wins + stats.draws + stats.losses;
                const winRate = ((stats.wins / total) * 100).toFixed(1);
                
                console.log(`\n=== Win Rate Analysis for ${userName} ===`);
                console.log(`Total Games: ${total}`);
                console.log(`Wins: ${stats.wins} (${winRate}%)`);
                console.log(`Draws: ${stats.draws} (${((stats.draws/total)*100).toFixed(1)}%)`);
                console.log(`Losses: ${stats.losses} (${((stats.losses/total)*100).toFixed(1)}%)`);
                console.log(`Win Rate: ${winRate}%\n`);
                
                return data;
            },
            (data) => {
                const userName = 'ffffattyyyy';
                
                const userGames = data.map(game => {
                    const isWhite = game.getHeaders().White === userName;
                    const userColor = isWhite ? 'White' : 'Black';
                    const won = game.metrics.Winner === userName;
                    
                    return {
                        won,
                        castleTurn: game.metrics[userColor]?.CastleTurn,
                        castleType: game.metrics[userColor]?.CastleType
                    };
                });
                
                const withCastle = userGames.filter(g => g.castleTurn);
                const noCastle = userGames.filter(g => !g.castleTurn);
                
                console.log(`\n=== Castling Impact ===`);
                console.log(`Castled: ${withCastle.filter(g => g.won).length}/${withCastle.length} wins (${(withCastle.filter(g => g.won).length/withCastle.length*100).toFixed(1)}%)`);
                console.log(`No Castle: ${noCastle.filter(g => g.won).length}/${noCastle.length} wins (${(noCastle.filter(g => g.won).length/noCastle.length*100).toFixed(1)}%)`);
                
                return data;
            },
            //(data) => { return data; }
        ]
    )

    let out = await mainPipeline.invoke([])
    //console.log(out.map(it => it.metrics))


}
)();