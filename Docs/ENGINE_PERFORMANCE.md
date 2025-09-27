### Performance Benchmark (1000 iterations)

**FEN:** `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR`

| Evaluation Type | Average (ms)    | Min (ms) | Max (ms) | Median (ms) |
| --------------- | --------------- | -------- | -------- | ----------- |
| Material        | 0.0063 (6.3 μs) | 0.0020   | 0.4325   | 0.0042      |
| Positional      | 0.0049 (4.9 μs) | 0.0019   | 0.0923   | 0.0044      |
| Aggregate       | 0.0047 (4.7 μs) | 0.0040   | 0.0838   | 0.0043      |

---

### Single Evaluation with Detailed Timings

**Testing FEN:** `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR`

| Evaluation Type | Result                              | FEN Parsing (ms) | Evaluation (ms) | Total (ms) |
| --------------- | ----------------------------------- | ---------------- | --------------- | ---------- |
| Material        | White=63891, Black=63891, Balance=0 | 0.0811           | 0.1318          | 0.2129     |
| Positional      | White=-289, Black=-289, Balance=0   | 0.0122           | 0.1246          | 0.1368     |
| Aggregate       | Balance=0                           | —                | —               | 0.0736*    |

* Aggregate timings breakdown: Material=0.0299ms, Positional=0.0213ms, Aggregate=0.0224ms

---

### Chess Evaluation Benchmark

**Positions:** 4
**Iterations per position:** 10,000

| Position | FEN Start                  | Material (avg ms) | Positional (avg ms) | Aggregate (avg ms) |
| -------- | -------------------------- | ----------------- | ------------------- | ------------------ |
| 1        | rnbqkbnr/pppppppp/8/8/8/8/ | 0.0027            | 0.0024              | 0.0043             |
| 2        | rnbqkbnr/pppppppp/8/8/4P3  | 0.0021            | 0.0020              | 0.0039             |
| 3        | r1bqkb1r/pppp1ppp/2n2n2/1B | 0.0020            | 0.0020              | 0.0041             |
| 4        | 8/8/8/8/8/8/8/4K2R         | 0.0005            | 0.0005              | 0.0010             |

**Summary**

| Metric                    | Value     |
| ------------------------- | --------- |
| Total benchmark time      | 277.31 ms |
| Material evaluation avg   | 0.0018 ms |
| Positional evaluation avg | 0.0017 ms |
| Aggregate evaluation avg  | 0.0033 ms |
| Total evaluations         | 120,000   |

