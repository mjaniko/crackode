export default {
  icon: "🌐",
  title: "Graph Patterns",
  color: "#38BDF8",
  techniques: [
    {
      name: "Graph DFS",
      usedFor: ["Connected components", "Cycle detection", "Island counting (grid DFS)", "Clone graph", "Path finding"],
      codes: {
        python: `# Adjacency list DFS
def dfs(graph, node, visited):
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

# Grid DFS (e.g., Number of Islands)
def dfs_grid(grid, r, c):
    if (r < 0 or r >= len(grid) or c < 0 or
        c >= len(grid[0]) or grid[r][c] == '0'):
        return
    grid[r][c] = '0'  # mark visited
    for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
        dfs_grid(grid, r + dr, c + dc)`,
        java: `// Adjacency list DFS
void dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited) {
    visited.add(node);
    for (int neighbor : graph.getOrDefault(node, List.of())) {
        if (!visited.contains(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}

// Grid DFS (Number of Islands)
void dfsGrid(char[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 ||
        c >= grid[0].length || grid[r][c] == '0') return;
    grid[r][c] = '0';
    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    for (int[] d : dirs) dfsGrid(grid, r + d[0], c + d[1]);
}`,
        go: `// Adjacency list DFS
func dfs(graph map[int][]int, node int, visited map[int]bool) {
    visited[node] = true
    for _, neighbor := range graph[node] {
        if !visited[neighbor] {
            dfs(graph, neighbor, visited)
        }
    }
}

// Grid DFS (Number of Islands)
func dfsGrid(grid [][]byte, r, c int) {
    if r < 0 || r >= len(grid) || c < 0 ||
        c >= len(grid[0]) || grid[r][c] == '0' {
        return
    }
    grid[r][c] = '0'
    dirs := [][2]int{{0,1},{0,-1},{1,0},{-1,0}}
    for _, d := range dirs {
        dfsGrid(grid, r+d[0], c+d[1])
    }
}`,
      },
      tip: "Use visited set or mark in-place. Grid DFS: 4 directions. O(V+E) time.",
    },
    {
      name: "Graph BFS",
      usedFor: ["Shortest path (unweighted)", "Multi-source BFS (rotten oranges)", "Word ladder", "01 matrix nearest zero"],
      codes: {
        python: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    distance = {start: 0}

    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                distance[neighbor] = distance[node] + 1
                queue.append(neighbor)
    return distance

# Multi-source BFS: add ALL sources to queue initially
queue = deque()
for r in range(len(grid)):
    for c in range(len(grid[0])):
        if grid[r][c] == 2:
            queue.append((r, c, 0))`,
        java: `public Map<Integer, Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    Map<Integer, Integer> dist = new HashMap<>();

    visited.add(start);
    queue.offer(start);
    dist.put(start, 0);

    while (!queue.isEmpty()) {
        int node = queue.poll();
        for (int neighbor : graph.getOrDefault(node, List.of())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                dist.put(neighbor, dist.get(node) + 1);
                queue.offer(neighbor);
            }
        }
    }
    return dist;
}`,
        go: `func bfs(graph map[int][]int, start int) map[int]int {
    visited := map[int]bool{start: true}
    queue := []int{start}
    dist := map[int]int{start: 0}

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        for _, neighbor := range graph[node] {
            if !visited[neighbor] {
                visited[neighbor] = true
                dist[neighbor] = dist[node] + 1
                queue = append(queue, neighbor)
            }
        }
    }
    return dist
}`,
      },
      tip: "BFS guarantees shortest path in unweighted graphs. Multi-source: add ALL sources initially.",
    },
    {
      name: "Topological Sort (Kahn's BFS)",
      usedFor: ["Course schedule / prerequisites", "Build order / task scheduling", "Cycle detection in DAG", "Alien dictionary"],
      codes: {
        python: `from collections import deque, defaultdict

def topological_sort(n, edges):
    graph = defaultdict(list)
    indegree = [0] * n

    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    queue = deque([i for i in range(n) if indegree[i] == 0])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    if len(order) == n:
        return order  # valid topological order
    return []  # cycle detected!`,
        java: `public List<Integer> topologicalSort(int n, int[][] edges) {
    List<List<Integer>> graph = new ArrayList<>();
    int[] indegree = new int[n];
    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());

    for (int[] e : edges) {
        graph.get(e[0]).add(e[1]);
        indegree[e[1]]++;
    }

    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < n; i++)
        if (indegree[i] == 0) queue.offer(i);

    List<Integer> order = new ArrayList<>();
    while (!queue.isEmpty()) {
        int node = queue.poll();
        order.add(node);
        for (int nei : graph.get(node)) {
            if (--indegree[nei] == 0) queue.offer(nei);
        }
    }
    return order.size() == n ? order : List.of();
}`,
        go: `func topologicalSort(n int, edges [][]int) []int {
    graph := make([][]int, n)
    indegree := make([]int, n)

    for _, e := range edges {
        graph[e[0]] = append(graph[e[0]], e[1])
        indegree[e[1]]++
    }

    queue := []int{}
    for i := 0; i < n; i++ {
        if indegree[i] == 0 { queue = append(queue, i) }
    }

    order := []int{}
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        order = append(order, node)
        for _, nei := range graph[node] {
            indegree[nei]--
            if indegree[nei] == 0 {
                queue = append(queue, nei)
            }
        }
    }
    if len(order) == n { return order }
    return nil // cycle!
}`,
      },
      tip: "Start with indegree 0 nodes. If result < n nodes → cycle exists. O(V+E).",
    },
    {
      name: "Union-Find (Disjoint Set Union)",
      usedFor: ["Connected components", "Redundant connection", "Accounts merge", "Kruskal's MST", "Number of provinces"],
      codes: {
        python: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        self.components -= 1
        return True`,
        java: `class UnionFind {
    int[] parent, rank;
    int components;

    UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        components = n;
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]); // path compression
        return parent[x];
    }

    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank[px] < rank[py]) { int t = px; px = py; py = t; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        components--;
        return true;
    }
}`,
        go: `type UnionFind struct {
    parent, rank []int
    components   int
}

func NewUnionFind(n int) *UnionFind {
    parent := make([]int, n)
    for i := range parent { parent[i] = i }
    return &UnionFind{parent, make([]int, n), n}
}

func (uf *UnionFind) Find(x int) int {
    if uf.parent[x] != x {
        uf.parent[x] = uf.Find(uf.parent[x])
    }
    return uf.parent[x]
}

func (uf *UnionFind) Union(x, y int) bool {
    px, py := uf.Find(x), uf.Find(y)
    if px == py { return false }
    if uf.rank[px] < uf.rank[py] { px, py = py, px }
    uf.parent[py] = px
    if uf.rank[px] == uf.rank[py] { uf.rank[px]++ }
    uf.components--
    return true
}`,
      },
      tip: "Path compression + union by rank = nearly O(1) per operation. Track component count.",
    },
    {
      name: "Dijkstra's Algorithm",
      usedFor: ["Shortest path (weighted, non-negative)", "Network delay time", "Path with minimum effort"],
      codes: {
        python: `import heapq

def dijkstra(graph, start, n):
    dist = [float('inf')] * n
    dist[start] = 0
    heap = [(0, start)]  # (distance, node)

    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue  # skip outdated

        for v, w in graph[u]:  # (neighbor, weight)
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))

    return dist`,
        java: `public int[] dijkstra(List<int[]>[] graph, int start, int n) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;

    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.offer(new int[]{0, start});

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];
        if (d > dist[u]) continue;

        for (int[] edge : graph[u]) {
            int v = edge[0], w = edge[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}`,
        go: `func dijkstra(graph [][][2]int, start, n int) []int {
    dist := make([]int, n)
    for i := range dist { dist[i] = math.MaxInt32 }
    dist[start] = 0

    // Min-heap: [distance, node]
    h := &IntHeap{{0, start}}
    heap.Init(h)

    for h.Len() > 0 {
        curr := heap.Pop(h).([2]int)
        d, u := curr[0], curr[1]
        if d > dist[u] { continue }

        for _, edge := range graph[u] {
            v, w := edge[0], edge[1]
            if dist[u]+w < dist[v] {
                dist[v] = dist[u] + w
                heap.Push(h, [2]int{dist[v], v})
            }
        }
    }
    return dist
}`,
      },
      tip: "Min-heap of (distance, node). Skip if already found shorter. O((V+E) log V). No negative weights!",
    },
  ],
};
