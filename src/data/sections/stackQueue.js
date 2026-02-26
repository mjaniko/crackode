export default {
  icon: "📦",
  title: "Stack & Queue Patterns",
  color: "#FBBF24",
  techniques: [
    {
      name: "Monotonic Stack (Next Greater/Smaller)",
      usedFor: ["Next greater element", "Daily temperatures", "Largest rectangle in histogram", "Stock span problem"],
      codes: {
        python: `# Next Greater Element
def next_greater(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # indices, decreasing order

    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)

    return result

# Largest Rectangle in Histogram
def largest_rectangle(heights):
    stack = []
    max_area = 0
    heights.append(0)  # sentinel

    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)

    return max_area`,
        java: `// Next Greater Element
public int[] nextGreater(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    return result;
}

// Largest Rectangle in Histogram
public int largestRectangle(int[] heights) {
    Deque<Integer> stack = new ArrayDeque<>();
    int maxArea = 0;

    for (int i = 0; i <= heights.length; i++) {
        int h = (i == heights.length) ? 0 : heights[i];
        while (!stack.isEmpty() && heights[stack.peek()] > h) {
            int height = heights[stack.pop()];
            int width = stack.isEmpty() ? i : i - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}`,
        go: `// Next Greater Element
func nextGreater(nums []int) []int {
    n := len(nums)
    result := make([]int, n)
    for i := range result { result[i] = -1 }
    stack := []int{}

    for i := 0; i < n; i++ {
        for len(stack) > 0 && nums[i] > nums[stack[len(stack)-1]] {
            idx := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            result[idx] = nums[i]
        }
        stack = append(stack, i)
    }
    return result
}`,
      },
      tip: "Maintain stack in monotonic order. Pop when violated → answer found for popped element.",
    },
    {
      name: "Parentheses Matching",
      usedFor: ["Valid parentheses", "Generate valid parentheses", "Minimum remove to make valid"],
      codes: {
        python: `# Valid Parentheses
def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in mapping:
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        else:
            stack.append(char)

    return len(stack) == 0`,
        java: `public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    Map<Character, Character> map = Map.of(')', '(', '}', '{', ']', '[');

    for (char c : s.toCharArray()) {
        if (map.containsKey(c)) {
            if (stack.isEmpty() || stack.peek() != map.get(c))
                return false;
            stack.pop();
        } else {
            stack.push(c);
        }
    }
    return stack.isEmpty();
}`,
        go: `func isValid(s string) bool {
    stack := []byte{}
    pairs := map[byte]byte{')': '(', '}': '{', ']': '['}

    for i := 0; i < len(s); i++ {
        if match, ok := pairs[s[i]]; ok {
            if len(stack) == 0 || stack[len(stack)-1] != match {
                return false
            }
            stack = stack[:len(stack)-1]
        } else {
            stack = append(stack, s[i])
        }
    }
    return len(stack) == 0
}`,
      },
      tip: "Matching: stack + hashmap. Generate: open < n → add '(', close < open → add ')'.",
    },
  ],
};
