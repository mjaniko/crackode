export default {
  icon: "🌲",
  title: "Tree Traversal Patterns",
  color: "#A78BFA",
  techniques: [
    {
      name: "DFS (Preorder / Inorder / Postorder)",
      usedFor: ["Tree serialization (preorder)", "BST sorted order (inorder)", "Bottom-up calc (postorder)", "Expression tree evaluation"],
      codes: {
        python: `# Recursive DFS
def preorder(node):
    if not node: return
    visit(node)          # ROOT first
    preorder(node.left)
    preorder(node.right)

def inorder(node):
    if not node: return
    inorder(node.left)
    visit(node)          # ROOT middle (sorted for BST)
    inorder(node.right)

def postorder(node):
    if not node: return
    postorder(node.left)
    postorder(node.right)
    visit(node)          # ROOT last (children first)`,
        java: `// Preorder: root → left → right
void preorder(TreeNode node) {
    if (node == null) return;
    visit(node);              // ROOT first
    preorder(node.left);
    preorder(node.right);
}

// Inorder: left → root → right (sorted for BST)
void inorder(TreeNode node) {
    if (node == null) return;
    inorder(node.left);
    visit(node);              // ROOT middle
    inorder(node.right);
}

// Postorder: left → right → root
void postorder(TreeNode node) {
    if (node == null) return;
    postorder(node.left);
    postorder(node.right);
    visit(node);              // ROOT last
}`,
        go: `// Preorder: root → left → right
func preorder(node *TreeNode) {
    if node == nil { return }
    visit(node)            // ROOT first
    preorder(node.Left)
    preorder(node.Right)
}

// Inorder: left → root → right (sorted for BST)
func inorder(node *TreeNode) {
    if node == nil { return }
    inorder(node.Left)
    visit(node)            // ROOT middle
    inorder(node.Right)
}

// Postorder: left → right → root
func postorder(node *TreeNode) {
    if node == nil { return }
    postorder(node.Left)
    postorder(node.Right)
    visit(node)            // ROOT last
}`,
      },
      tip: "Preorder: root→left→right. Inorder: left→root→right (BST gives sorted). Postorder: left→right→root.",
    },
    {
      name: "BFS (Level Order Traversal)",
      usedFor: ["Level order traversal", "Zigzag level order", "Right side view", "Minimum depth of tree"],
      codes: {
        python: `from collections import deque

def level_order(root):
    if not root: return []
    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)

    return result`,
        java: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null)  queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}`,
        go: `func levelOrder(root *TreeNode) [][]int {
    if root == nil { return nil }
    result := [][]int{}
    queue := []*TreeNode{root}

    for len(queue) > 0 {
        size := len(queue)
        level := []int{}
        for i := 0; i < size; i++ {
            node := queue[0]
            queue = queue[1:]
            level = append(level, node.Val)
            if node.Left != nil  { queue = append(queue, node.Left) }
            if node.Right != nil { queue = append(queue, node.Right) }
        }
        result = append(result, level)
    }
    return result
}`,
      },
      tip: "Process level by level using queue. level_size = len(queue) before inner loop. O(n).",
    },
    {
      name: "Tree Height / Diameter",
      usedFor: ["Maximum depth of binary tree", "Diameter of binary tree", "Balanced binary tree check"],
      codes: {
        python: `# Height
def height(node):
    if not node: return 0
    return 1 + max(height(node.left), height(node.right))

# Diameter (longest path between any two nodes)
def diameter(root):
    result = [0]

    def dfs(node):
        if not node: return 0
        left = dfs(node.left)
        right = dfs(node.right)
        result[0] = max(result[0], left + right)
        return 1 + max(left, right)

    dfs(root)
    return result[0]`,
        java: `int maxDiameter = 0;

public int diameter(TreeNode root) {
    dfs(root);
    return maxDiameter;
}

private int dfs(TreeNode node) {
    if (node == null) return 0;
    int left = dfs(node.left);
    int right = dfs(node.right);
    maxDiameter = Math.max(maxDiameter, left + right);
    return 1 + Math.max(left, right);
}`,
        go: `func diameter(root *TreeNode) int {
    result := 0

    var dfs func(*TreeNode) int
    dfs = func(node *TreeNode) int {
        if node == nil { return 0 }
        left := dfs(node.Left)
        right := dfs(node.Right)
        if left+right > result {
            result = left + right
        }
        if left > right { return 1 + left }
        return 1 + right
    }

    dfs(root)
    return result
}`,
      },
      tip: "Diameter at each node = left_height + right_height. Return height upward, track diameter globally.",
    },
    {
      name: "Path Sum Pattern",
      usedFor: ["Path sum (root to leaf)", "Path sum II (all paths)", "Max path sum (any to any)"],
      codes: {
        python: `# Path Sum (root to leaf)
def has_path_sum(root, target):
    if not root: return False
    if not root.left and not root.right:
        return root.val == target
    return (has_path_sum(root.left, target - root.val) or
            has_path_sum(root.right, target - root.val))

# Max Path Sum (any node to any node)
def max_path_sum(root):
    result = [float('-inf')]

    def dfs(node):
        if not node: return 0
        left = max(0, dfs(node.left))    # ignore negatives
        right = max(0, dfs(node.right))
        result[0] = max(result[0], left + right + node.val)
        return max(left, right) + node.val

    dfs(root)
    return result[0]`,
        java: `int maxSum = Integer.MIN_VALUE;

public int maxPathSum(TreeNode root) {
    dfs(root);
    return maxSum;
}

private int dfs(TreeNode node) {
    if (node == null) return 0;
    int left = Math.max(0, dfs(node.left));
    int right = Math.max(0, dfs(node.right));
    maxSum = Math.max(maxSum, left + right + node.val);
    return Math.max(left, right) + node.val;
}`,
        go: `func maxPathSum(root *TreeNode) int {
    result := math.MinInt32

    var dfs func(*TreeNode) int
    dfs = func(node *TreeNode) int {
        if node == nil { return 0 }
        left := max(0, dfs(node.Left))
        right := max(0, dfs(node.Right))
        if left+right+node.Val > result {
            result = left + right + node.Val
        }
        return max(left, right) + node.Val
    }

    dfs(root)
    return result
}`,
      },
      tip: "Root-to-leaf: subtract going down. Any-to-any: max(0, child) to ignore negative branches.",
    },
  ],
};
