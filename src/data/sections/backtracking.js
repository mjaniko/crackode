export default {
  icon: "🔁",
  title: "Backtracking Patterns",
  color: "#F472B6",
  techniques: [
    {
      name: "Subsets",
      usedFor: ["Generate all subsets", "Subsets with duplicates", "Power set"],
      codes: {
        python: `def subsets(nums):
    result = []

    def backtrack(start, path):
        result.append(path[:])  # add every state
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()  # undo choice

    backtrack(0, [])
    return result

# With duplicates: sort first
# skip if nums[i] == nums[i-1] and i > start`,
        java: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

void backtrack(int[] nums, int start, List<Integer> path,
               List<List<Integer>> result) {
    result.add(new ArrayList<>(path)); // add every state
    for (int i = start; i < nums.length; i++) {
        path.add(nums[i]);
        backtrack(nums, i + 1, path, result);
        path.remove(path.size() - 1); // undo
    }
}`,
        go: `func subsets(nums []int) [][]int {
    result := [][]int{}

    var backtrack func(start int, path []int)
    backtrack = func(start int, path []int) {
        tmp := make([]int, len(path))
        copy(tmp, path)
        result = append(result, tmp)

        for i := start; i < len(nums); i++ {
            path = append(path, nums[i])
            backtrack(i+1, path)
            path = path[:len(path)-1]
        }
    }

    backtrack(0, []int{})
    return result
}`,
      },
      tip: "Add path at every node (not just leaves). Skip duplicates: sort + check previous.",
    },
    {
      name: "Permutations",
      usedFor: ["Generate all permutations", "Permutations with duplicates", "Next permutation"],
      codes: {
        python: `def permutations(nums):
    result = []

    def backtrack(path, used):
        if len(path) == len(nums):
            result.append(path[:])
            return
        for i in range(len(nums)):
            if used[i]: continue
            # Skip duplicates (sort first)
            if i > 0 and nums[i] == nums[i-1] and not used[i-1]:
                continue
            used[i] = True
            path.append(nums[i])
            backtrack(path, used)
            path.pop()
            used[i] = False

    nums.sort()
    backtrack([], [False] * len(nums))
    return result`,
        java: `public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    Arrays.sort(nums);
    backtrack(nums, new ArrayList<>(), new boolean[nums.length], result);
    return result;
}

void backtrack(int[] nums, List<Integer> path, boolean[] used,
               List<List<Integer>> result) {
    if (path.size() == nums.length) {
        result.add(new ArrayList<>(path));
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        if (i > 0 && nums[i] == nums[i-1] && !used[i-1]) continue;
        used[i] = true;
        path.add(nums[i]);
        backtrack(nums, path, used, result);
        path.remove(path.size() - 1);
        used[i] = false;
    }
}`,
        go: `func permute(nums []int) [][]int {
    sort.Ints(nums)
    result := [][]int{}
    used := make([]bool, len(nums))

    var backtrack func(path []int)
    backtrack = func(path []int) {
        if len(path) == len(nums) {
            tmp := make([]int, len(path))
            copy(tmp, path)
            result = append(result, tmp)
            return
        }
        for i := 0; i < len(nums); i++ {
            if used[i] { continue }
            if i > 0 && nums[i] == nums[i-1] && !used[i-1] { continue }
            used[i] = true
            backtrack(append(path, nums[i]))
            used[i] = false
        }
    }

    backtrack([]int{})
    return result
}`,
      },
      tip: "Use 'used' boolean array. For duplicates: sort + skip same value if prev unused.",
    },
    {
      name: "Combination Sum",
      usedFor: ["Combination sum (with/without reuse)", "Phone letter combinations", "Factor combinations"],
      codes: {
        python: `# Elements can be reused
def combination_sum(candidates, target):
    result = []

    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        if remaining < 0:
            return
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i, path, remaining - candidates[i])
            path.pop()

    backtrack(0, [], target)
    return result

# Without reuse: backtrack(i + 1, ...) instead of (i, ...)`,
        java: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, target, new ArrayList<>(), result);
    return result;
}

void backtrack(int[] cands, int start, int remaining,
               List<Integer> path, List<List<Integer>> result) {
    if (remaining == 0) { result.add(new ArrayList<>(path)); return; }
    if (remaining < 0) return;

    for (int i = start; i < cands.length; i++) {
        path.add(cands[i]);
        backtrack(cands, i, remaining - cands[i], path, result);
        path.remove(path.size() - 1);
    }
}`,
        go: `func combinationSum(candidates []int, target int) [][]int {
    result := [][]int{}

    var backtrack func(start, remaining int, path []int)
    backtrack = func(start, remaining int, path []int) {
        if remaining == 0 {
            tmp := make([]int, len(path))
            copy(tmp, path)
            result = append(result, tmp)
            return
        }
        if remaining < 0 { return }

        for i := start; i < len(candidates); i++ {
            backtrack(i, remaining-candidates[i],
                append(path, candidates[i]))
        }
    }

    backtrack(0, target, []int{})
    return result
}`,
      },
      tip: "Reuse allowed → recurse from i. No reuse → recurse from i+1. Prune when remaining < 0.",
    },
  ],
};
