import { PriorityQueue } from "@datastructures-js/priority-queue";

interface Node {
  x: number;
  y: number;
  cost: number;
  score: number;
}

interface Grid {
  width: number;
  height: number;
  getCost: (x: number, y: number) => number;
  getScore: (x: number, y: number) => number;
}

export function findShortestPathWithMaxScore(
  grid: Grid,
  start: Node,
  end: Node
): { path: Node[]; totalCost: number; totalScore: number } {
  const directions = [
    { dx: 0, dy: 1 }, // down
    { dx: 1, dy: 0 }, // right
    { dx: 0, dy: -1 }, // up
    { dx: -1, dy: 0 }, // left
  ];

  const pq = new PriorityQueue<Node>((a, b) => a.cost - b.cost);
  const visited = new Set<string>();
  const pathMap = new Map<string, Node>();

  pq.enqueue({ ...start, cost: 0, score: grid.getScore(start.x, start.y) });

  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    const key = `${current.x},${current.y}`;

    if (visited.has(key)) continue;
    visited.add(key);

    if (current.x === end.x && current.y === end.y) {
      const path = [];
      let node: Node | undefined = current;
      while (node) {
        path.unshift(node);
        node = pathMap.get(`${node.x},${node.y}`);
      }
      return { path, totalCost: current.cost, totalScore: current.score };
    }

    for (const { dx, dy } of directions) {
      const nx = current.x + dx;
      const ny = current.y + dy;
      if (nx >= 0 && ny >= 0 && nx < grid.width && ny < grid.height) {
        const newCost = current.cost + grid.getCost(nx, ny);
        const newScore = current.score + grid.getScore(nx, ny);
        const neighborKey = `${nx},${ny}`;

        if (!visited.has(neighborKey)) {
          pq.enqueue({ x: nx, y: ny, cost: newCost, score: newScore });
          pathMap.set(neighborKey, current);
        }
      }
    }
  }

  return { path: [], totalCost: Infinity, totalScore: 0 };
}
