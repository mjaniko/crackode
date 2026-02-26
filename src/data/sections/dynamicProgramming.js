export default {
  icon: "📊",
  title: "Dynamic Programming",
  color: "#818CF8",
  techniques: [
    {
      name: "1D DP (Linear Recurrence)",
      usedFor: ["Climbing stairs", "House robber", "Coin change (min coins)", "Decode ways"],
      codes: {
        python: `# House Robber (can't rob adjacent)
def rob(nums):
    prev2, prev1 = 0, 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2, prev1 = prev1, curr
    return prev1

# Coin Change (min coins)
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
        java: `// House Robber
public int rob(int[] nums) {
    int prev2 = 0, prev1 = 0;
    for (int num : nums) {
        int curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// Coin Change
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++)
        for (int coin : coins)
            if (coin <= i)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
        go: `// House Robber
func rob(nums []int) int {
    prev2, prev1 := 0, 0
    for _, num := range nums {
        curr := max(prev1, prev2+num)
        prev2, prev1 = prev1, curr
    }
    return prev1
}

// Coin Change
func coinChange(coins []int, amount int) int {
    dp := make([]int, amount+1)
    for i := range dp { dp[i] = amount + 1 }
    dp[0] = 0
    for i := 1; i <= amount; i++ {
        for _, coin := range coins {
            if coin <= i && dp[i-coin]+1 < dp[i] {
                dp[i] = dp[i-coin] + 1
            }
        }
    }
    if dp[amount] > amount { return -1 }
    return dp[amount]
}`,
      },
      tip: "Define dp[i] clearly. Find recurrence. Often optimize space to O(1) with two variables.",
    },
    {
      name: "2D DP (Grid Problems)",
      usedFor: ["Unique paths", "Minimum path sum", "Edit distance", "Maximal square"],
      codes: {
        python: `# Unique Paths
def unique_paths(m, n):
    dp = [[1] * n for _ in range(m)]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    return dp[m-1][n-1]

# Minimum Path Sum
def min_path_sum(grid):
    m, n = len(grid), len(grid[0])
    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0: continue
            elif i == 0: grid[i][j] += grid[i][j-1]
            elif j == 0: grid[i][j] += grid[i-1][j]
            else: grid[i][j] += min(grid[i-1][j], grid[i][j-1])
    return grid[m-1][n-1]`,
        java: `// Unique Paths
public int uniquePaths(int m, int n) {
    int[][] dp = new int[m][n];
    for (int[] row : dp) Arrays.fill(row, 1);
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
    return dp[m-1][n-1];
}

// Minimum Path Sum
public int minPathSum(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (i == 0 && j == 0) continue;
            else if (i == 0) grid[i][j] += grid[i][j-1];
            else if (j == 0) grid[i][j] += grid[i-1][j];
            else grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);
        }
    return grid[m-1][n-1];
}`,
        go: `// Unique Paths
func uniquePaths(m, n int) int {
    dp := make([][]int, m)
    for i := range dp {
        dp[i] = make([]int, n)
        for j := range dp[i] { dp[i][j] = 1 }
    }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
        }
    }
    return dp[m-1][n-1]
}`,
      },
      tip: "dp[i][j] depends on dp[i-1][j] and dp[i][j-1]. Fill row by row. Can often use 1D array.",
    },
    {
      name: "Knapsack (0/1)",
      usedFor: ["Subset sum / partition equal subset", "Target sum", "Ones and zeroes", "Last stone weight II"],
      codes: {
        python: `# 0/1 Knapsack
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)

    for i in range(n):
        for w in range(capacity, weights[i] - 1, -1):  # reverse!
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]

# Subset Sum (can we make target?)
def can_partition(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True
    for num in nums:
        for j in range(target, num - 1, -1):  # reverse!
            dp[j] = dp[j] or dp[j - num]
    return dp[target]`,
        java: `// 0/1 Knapsack
public int knapsack(int[] weights, int[] values, int capacity) {
    int[] dp = new int[capacity + 1];
    for (int i = 0; i < weights.length; i++)
        for (int w = capacity; w >= weights[i]; w--)
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    return dp[capacity];
}

// Subset Sum
public boolean canPartition(int[] nums, int target) {
    boolean[] dp = new boolean[target + 1];
    dp[0] = true;
    for (int num : nums)
        for (int j = target; j >= num; j--)
            dp[j] = dp[j] || dp[j - num];
    return dp[target];
}`,
        go: `// 0/1 Knapsack
func knapsack(weights, values []int, capacity int) int {
    dp := make([]int, capacity+1)
    for i := 0; i < len(weights); i++ {
        for w := capacity; w >= weights[i]; w-- { // reverse!
            if dp[w-weights[i]]+values[i] > dp[w] {
                dp[w] = dp[w-weights[i]] + values[i]
            }
        }
    }
    return dp[capacity]
}`,
      },
      tip: "REVERSE iteration for 0/1 (each item once). Forward for unbounded. dp[0] = base case.",
    },
    {
      name: "LIS & LCS",
      usedFor: ["Longest increasing subsequence", "Longest common subsequence", "Edit distance", "Russian doll envelopes"],
      codes: {
        python: `# LIS - O(n log n) with binary search
import bisect
def lis(nums):
    tails = []
    for num in nums:
        pos = bisect.bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    return len(tails)

# LCS
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]`,
        java: `// LIS - O(n log n)
public int lis(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int num : nums) {
        int pos = Collections.binarySearch(tails, num);
        if (pos < 0) pos = -(pos + 1);
        if (pos == tails.size()) tails.add(num);
        else tails.set(pos, num);
    }
    return tails.size();
}

// LCS
public int lcs(String a, String b) {
    int m = a.length(), n = b.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            dp[i][j] = a.charAt(i-1) == b.charAt(j-1)
                ? dp[i-1][j-1] + 1
                : Math.max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}`,
        go: `// LIS - O(n log n)
func lis(nums []int) int {
    tails := []int{}
    for _, num := range nums {
        pos := sort.SearchInts(tails, num)
        if pos == len(tails) {
            tails = append(tails, num)
        } else {
            tails[pos] = num
        }
    }
    return len(tails)
}

// LCS
func lcs(a, b string) int {
    m, n := len(a), len(b)
    dp := make([][]int, m+1)
    for i := range dp { dp[i] = make([]int, n+1) }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if a[i-1] == b[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
            }
        }
    }
    return dp[m][n]
}`,
      },
      tip: "LIS O(n log n): maintain tails + binary search. LCS: match → diagonal+1, else max(skip either).",
    },
  ],
};
