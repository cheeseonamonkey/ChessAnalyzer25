# Layers:

Independent modular layers with a strong separation of concerns:
1. **Chess.com API** *(external API - source raw data)*
2. **Proxy Layer** *(Chess.com API fetching, watching rate limits, caching)*
3. **Analysis/Processing Layer** *(derive metrics - parse data & PGNs, identify insights, calculate statistics, etc.)*
4. **REST API Layer** *(exposed API endpoints to serve processed data, stats, etc.)*
5. **UI Layer** *(front-end)*
Layers are backwards-dependant; any layer can have open endpoints, but data only moves sequentially in one direction.

### 1. Chess.com API (external)
 - Chess.com public API, archiving all chess games
 - External
 - Single origin of all data

### 2. Proxy Layer
Fetching and organize data from Chess.com.
 - Aggressive disk-caching for past months *(data will never change)*
 - Politely respect Chess.com rate-limits
 - Preprocess data *(parse PGNs, etc.)*

### 3. Analysis Layer
All calculations & processing - turning raw game data into useful metrics.

It itself has 3 loose sub-layers:
 1. Position metrics *(metrics on a single chess position)*
 2. Game metrics *(metrics on all positions throughout a game)*
 3. User metrics *(metrics on all games throughout a user's games)*
>*(keep these sub-layers?? or just wing it??)*:

#### Position metrics:
 - Metric derived from a single position *(FEN)*
#### Game metrics:
 - Metric derived from 
#### User metrics:
  - Win/loss/draw rates vs. specific metrics:
    - ECO
    - White / black
    - Sharpness
    - Turn castled
    - Castle type
    - etc.

### 4. REST API Layer
Clean API endpoints for the metrics.

### 5. UI Layer
Front-end / UI.



# Remarks
- For comparitive & context purposes, always show values with average/noise values from random users, preferably even grouped by ELO.

### Project-specific dev terminologies:
- **Metric**: Any calculated data, derived in the analysis layer *(i.e. an integer: the material score of a chess position)*. You can derive a metric from a position, a game, one or more series, etc.
- **Series**: A set of sequential metrics *(i.e. an array: a list of all positions' material scores over the course of a game)*; a type of metric itself.
- **Baseline**: Reference metrics for context/comparison *(random user data)*


### Credits & Thanks
- Sunfish _(I heavily modified their chess engine into evaluation functions & converted it to JS)_


