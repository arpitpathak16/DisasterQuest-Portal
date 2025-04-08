import React, { useState, useEffect } from "react";
import { findShortestPathWithMaxScore } from "../utils/dijkstra";

interface Tile {
  x: number;
  y: number;
  isObstacle: boolean;
  isBonus: boolean;
  isPenalty: boolean;
  visited: boolean;
}

interface Node {
  x: number;
  y: number;
  cost: number;
  score: number;
}

export default function EarthquakeGame() {
  const gridSize = 15;
  const [gamePhase, setGamePhase] = useState("rescue");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() =>
    parseInt(localStorage.getItem("bestScore") || "0")
  );
  const [message, setMessage] = useState(
    "🚶 Navigate from 🅰️ to 🅱️ and collect points!"
  );
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [gameEnded, setGameEnded] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [shortestPath, setShortestPath] = useState<Node[]>([]);
  const [maxScore, setMaxScore] = useState(0);

  const goalPosition = { x: gridSize - 1, y: gridSize - 1 };

  const [tiles, setTiles] = useState<Tile[]>(() => {
    let grid: Tile[] = [];
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const isObstacle = Math.random() < 0.08;
        const isBonus = !isObstacle && Math.random() < 0.1;
        const isPenalty = !isObstacle && !isBonus && Math.random() < 0.1;
        grid.push({ x, y, isObstacle, isBonus, isPenalty, visited: false });
      }
    }
    return grid;
  });

  const resetGame = () => {
    setScore(0);
    setPlayerPosition({ x: 0, y: 0 });
    setMessage("🚶 Navigate from 🅰️ to 🅱️ and collect points!");
    setGameEnded(false);
    setStartTime(Date.now());
    setElapsedTime(0);
    setTiles(() => {
      let grid: Tile[] = [];
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          const isObstacle = Math.random() < 0.08;
          const isBonus = !isObstacle && Math.random() < 0.1;
          const isPenalty = !isObstacle && !isBonus && Math.random() < 0.1;
          grid.push({ x, y, isObstacle, isBonus, isPenalty, visited: false });
        }
      }
      return grid;
    });
  };

  const movePlayer = (dx: number, dy: number) => {
    setPlayerPosition((pos) => {
      const newX = Math.max(0, Math.min(gridSize - 1, pos.x + dx));
      const newY = Math.max(0, Math.min(gridSize - 1, pos.y + dy));
      const tile = tiles.find((t) => t.x === newX && t.y === newY);
      if (tile?.isObstacle) return pos;

      if (!tile?.visited) {
        if (tile.isBonus) {
          setScore((s) => s + 10);
          setMessage("🎁 You found a bonus item! +10");
        } else if (tile.isPenalty) {
          setScore((s) => Math.max(0, s - 5));
          setMessage("⚠️ You hit a penalty zone. -5");
        }
        tile.visited = true;
      }

      if (newX === goalPosition.x && newY === goalPosition.y) {
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        setElapsedTime(timeTaken);
        setMessage(
          `🎉 You reached the goal 🅱️! Final Score: ${score} ⏱️ Time: ${timeTaken}s`
        );
        setGameEnded(true);
        if (score > bestScore) {
          setBestScore(score);
          localStorage.setItem("bestScore", score.toString());
        }
      }

      return { x: newX, y: newY };
    });
  };

  const calculateShortestPath = () => {
    const grid = {
      width: gridSize,
      height: gridSize,
      getCost: (x: number, y: number) => {
        const tile = tiles.find((t) => t.x === x && t.y === y);
        return tile?.isObstacle ? Infinity : 1;
      },
      getScore: (x: number, y: number) => {
        const tile = tiles.find((t) => t.x === x && t.y === y);
        return tile?.isBonus ? 10 : tile?.isPenalty ? -5 : 0;
      },
    };

    const start: Node = { x: 0, y: 0, cost: 0, score: 0 };
    const end: Node = { x: gridSize - 1, y: gridSize - 1, cost: 0, score: 0 };

    const result = findShortestPathWithMaxScore(grid, start, end);
    setShortestPath(result.path);
    setMessage(`Shortest path calculated! Total Score: ${result.totalScore}`);
  };

  const calculateMaxScore = () => {
    const grid = {
      width: gridSize,
      height: gridSize,
      getCost: (x: number, y: number) => {
        const tile = tiles.find((t) => t.x === x && t.y === y);
        return tile?.isObstacle ? Infinity : 1;
      },
      getScore: (x: number, y: number) => {
        const tile = tiles.find((t) => t.x === x && t.y === y);
        return tile?.isBonus ? 10 : tile?.isPenalty ? -5 : 0;
      },
    };

    const start: Node = { x: 0, y: 0, cost: 0, score: 0 };
    const end: Node = { x: gridSize - 1, y: gridSize - 1, cost: 0, score: 0 };

    const result = findShortestPathWithMaxScore(grid, start, end);
    setMaxScore(result.totalScore);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gamePhase === "rescue" && !gameEnded) {
        if (e.key === "ArrowUp") movePlayer(0, -1);
        else if (e.key === "ArrowDown") movePlayer(0, 1);
        else if (e.key === "ArrowLeft") movePlayer(-1, 0);
        else if (e.key === "ArrowRight") movePlayer(1, 0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gamePhase, tiles, score, gameEnded]);

  useEffect(() => {
    calculateMaxScore();
  }, [tiles]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-2">QuakeSafe: Navigate the Grid</h1>
      <p className="text-xl mb-2">{message}</p>
      <p className="text-lg">⭐ Score: {score}</p>
      <p className="text-lg">🏆 Best Score: {bestScore}</p>
      {/* <p className="text-lg">🔝 Max Possible Score: {maxScore}</p> */}
      {gameEnded && <p className="text-lg">⏱️ Time Taken: {elapsedTime}s</p>}
      {/* {gameEnded && (
        <p className="text-lg">
          📊 Your Score: {score} / {maxScore} (
          {((score / maxScore) * 100).toFixed(2)}% of max)
        </p>
      )} */}

      {/* <button
        onClick={calculateShortestPath}
        className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-xl shadow">
        🛤️ Find Shortest Path
      </button> */}

      <div
        className="grid gap-1 my-4 mx-auto"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, minmax(1.5rem, 1fr))`,
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
        }}>
        {[...Array(gridSize)].map((_, row) =>
          [...Array(gridSize)].map((_, col) => {
            const isPlayer =
              playerPosition.x === col && playerPosition.y === row;
            const isGoal = goalPosition.x === col && goalPosition.y === row;
            const tile = tiles.find((t) => t.x === col && t.y === row);
            const isInShortestPath = shortestPath.some(
              (node) => node.x === col && node.y === row
            );

            let cellColor = "bg-gray-200";
            let emoji = "";

            if (isPlayer) {
              cellColor = "bg-green-500";
              emoji = "🧍";
            } else if (isGoal) {
              cellColor = "bg-blue-400";
              emoji = "🅱️";
            } else if (tile?.isObstacle) {
              cellColor = "bg-red-500";
              emoji = "🧱";
            } else if (tile?.isBonus) {
              cellColor = "bg-yellow-300";
              emoji = "🎁";
            } else if (tile?.isPenalty) {
              cellColor = "bg-purple-400";
              emoji = "⚠️";
            }

            if (isInShortestPath) {
              cellColor = "bg-green-300";
            }

            return (
              <div
                key={`cell-${row}-${col}`}
                className={`w-7 h-7 border flex items-center justify-center text-xs ${cellColor}`}>
                {emoji}
              </div>
            );
          })
        )}
      </div>

      {gameEnded && (
        <button
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow">
          🔁 Restart Game
        </button>
      )}

      {isMobile && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <button
            onClick={() => movePlayer(0, -1)}
            className="p-4 bg-gray-300 rounded-full text-2xl">
            ⬆️
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => movePlayer(-1, 0)}
              className="p-4 bg-gray-300 rounded-full text-2xl">
              ⬅️
            </button>
            <button
              onClick={() => movePlayer(1, 0)}
              className="p-4 bg-gray-300 rounded-full text-2xl">
              ➡️
            </button>
          </div>
          <button
            onClick={() => movePlayer(0, 1)}
            className="p-4 bg-gray-300 rounded-full text-2xl">
            ⬇️
          </button>
        </div>
      )}

      <p className="text-sm text-gray-500 mt-4">
        <span className="inline-block bg-gray-200 border border-gray-400 rounded px-2 py-1 mx-1">
          ⬆️
        </span>
        <span className="inline-block bg-gray-200 border border-gray-400 rounded px-2 py-1 mx-1">
          ⬇️
        </span>
        <span className="inline-block bg-gray-200 border border-gray-400 rounded px-2 py-1 mx-1">
          ⬅️
        </span>
        <span className="inline-block bg-gray-200 border border-gray-400 rounded px-2 py-1 mx-1">
          ➡️
        </span>
        Use arrow keys or tap buttons to move from 🅰️ (top-left) to 🅱️
        (bottom-right)
      </p>
    </div>
  );
}
