Essentially it is a big data transformation pipeline.


The pipeline passes a single, mutable reference object though 5 broad layers with strong separations of concern:

1. **Source Layer** *(external Chess.com API)*
2. **Proxy Layer** *(fetching, rate limits, caching)*
3. **Analysis/Processing Layer** *(preprocess data, derive all metrics)*
   1. Pre-processing
   2. Position metrics *(1D)*
   3. Game metrics *(2D)*
   4. User metrics *(3D)*
5. **REST API Layer** *(final exposed API endpoints)*
6. **UI Layer**


The pipeline is *backwards-dependant*, meaning:

- data moves in only one direction
- latter layers utilize former layers
- earlier pipeline steps may not be easily ordered/changed
- testing may require running previous steps *(or mock data)*


|  | |
|------|------------|
| CPL | Centipawn loss |
| Metric | Any piece of data derived from the source data |
| Vector | Chronologically-related list of metrics *(a type of metric itself)* |
| Objective metric | Neutral aspect of the position |
| Subjective metric | Must include user perspective |




Data pipeline rough draft:

```md
1. **Source Layer** *(external Chess.com API)*
2. **Proxy Layer**
	1. Fetch user archives URI list
	2. Fetch & cache all games from each month's archive
	3. Organize data to uniform array
	4. Allow exporting all PGNs here 
	5. Preferably continue the pipeline now with PGNs 
3. **Analysis Layer**
	1. Pre-processing
		1. Prune unnecessary fields
		2. Bootstrap source attribute fields fields from PGNs? *(so the pipeline derives fully from PGN strings)*
		3. Parse PGNs
		4. Build all FENs of games
		5. ​Label *(turn number & player, winner)*
	2. Position metrics *(1D data)*
		1. Objective:
			1. Turn number
			2. Move was premoved
			3. Openness/Closedness
			4. Total pawns
			5. Total development
			6. Open ranks & files
			7. Open diagonals
			8. Open center
		2. Subjective
			1. Using previous position:
				1. Previous piece type moved *(or safely write into the previous position?)*
				2. CPL *(Δ score from previous turn; always ≤0)*
				3. More delta metrics? 
			2. In check
			3. Score:
				1. Material
				2. Positional
				3. Composite
			4. Tactical:
				1. Mobility
				2. Outposts
				3. Fianchettos
				4. Development
				5. Center control
				6. Pawn structure & advances
				7. King safety
				8. Queen power
				9. Knight power
				10. Bishop power
				11. Piece synergy
				12. Hanging pieces
				13. Connected rooks
				14. Attack
				15. Defense
	3. Game metrics *(2D data)*
		1. Organize the vectors of all game position metrics 
		2. Objective:
			1. Castled on opposite sides
			2. Checkmate metrics (type, square, sudden)
			3. Game metadata:
				1. Date & time
				2. Games played in last 12 hours
				3. Player *(country, sample games, avatar, ELO rating)
		3. Subjective:
			 1. Side castled
			2. Turn castled
			3. Game ACPL
			4. Winner
		4. Sharpness
		5. Turn number of first occurrences *(i.e queen tapped, king moved, etc.*
	4. User metrics *(3D data)*
		1. *(ability to cross any 2 metrics? query language?)*
		2. User ACPL avgs
		3. ACPL per piece type moved
		4. Vectors avged per day 
		5. Correlation matrices
		6. Win/draw/lose rate vs:
			1. Game metrics
```


### Credits & Thanks
- Sunfish _(I heavily modified their chess engine into evaluation functions & converted it to JS)_


