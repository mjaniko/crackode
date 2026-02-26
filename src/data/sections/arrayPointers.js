export default {
  icon: "🧱",
  title: "Array & Pointer Patterns",
  color: "#00E5A0",
  techniques: [
    {
      name: "Two Pointers (Opposite Ends)",
      usedFor: ["Pair sum problems (Two Sum II)", "Container with most water", "Trapping rain water", "Palindrome checking"],
      codes: {
        python: `def two_pointers(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        curr = nums[left] + nums[right]
        if curr == target:
            return [left, right]
        elif curr < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]`,
        java: `public int[] twoPointers(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int curr = nums[left] + nums[right];
        if (curr == target) {
            return new int[]{left, right};
        } else if (curr < target) {
            left++;
        } else {
            right--;
        }
    }
    return new int[]{-1, -1};
}`,
        go: `func twoPointers(nums []int, target int) []int {
    left, right := 0, len(nums)-1
    for left < right {
        curr := nums[left] + nums[right]
        if curr == target {
            return []int{left, right}
        } else if curr < target {
            left++
        } else {
            right--
        }
    }
    return []int{-1, -1}
}`,
      },
      tip: "Array must be sorted (or use indices). O(n) time, O(1) space.",
    },
    {
      name: "Two Pointers (Same Direction / Slow–Fast)",
      usedFor: ["Cycle detection in linked list", "Finding middle of linked list", "Duplicate detection (Floyd's)", "Remove duplicates from sorted array"],
      codes: {
        python: `# Linked List Cycle Detection
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# Find Middle of Linked List
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # middle node`,
        java: `// Linked List Cycle Detection
public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}

// Find Middle of Linked List
public ListNode findMiddle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
        go: `// Linked List Cycle Detection
func hasCycle(head *ListNode) bool {
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
        if slow == fast {
            return true
        }
    }
    return false
}

// Find Middle of Linked List
func findMiddle(head *ListNode) *ListNode {
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }
    return slow
}`,
      },
      tip: "Fast moves 2x speed. If they meet → cycle. When fast reaches end → slow is at middle.",
    },
    {
      name: "Sliding Window (Fixed Size)",
      usedFor: ["Max sum subarray of size K", "String anagram matching", "Average of subarrays of size K"],
      codes: {
        python: `def fixed_window(nums, k):
    window_sum = sum(nums[:k])
    result = window_sum

    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]  # slide
        result = max(result, window_sum)

    return result`,
        java: `public int fixedWindow(int[] nums, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i];
    int result = windowSum;

    for (int i = k; i < nums.length; i++) {
        windowSum += nums[i] - nums[i - k]; // slide
        result = Math.max(result, windowSum);
    }
    return result;
}`,
        go: `func fixedWindow(nums []int, k int) int {
    windowSum := 0
    for i := 0; i < k; i++ {
        windowSum += nums[i]
    }
    result := windowSum

    for i := k; i < len(nums); i++ {
        windowSum += nums[i] - nums[i-k] // slide
        if windowSum > result {
            result = windowSum
        }
    }
    return result
}`,
      },
      tip: "Window size never changes. Add right, remove left. O(n) time.",
    },
    {
      name: "Sliding Window (Dynamic Size)",
      usedFor: ["Longest substring without repeating chars", "Minimum window substring", "Longest with at most K distinct", "Smallest subarray with sum ≥ target"],
      codes: {
        python: `def dynamic_window(s):
    left = 0
    window = {}  # or set, counter
    result = 0

    for right in range(len(s)):
        # 1. Expand: add s[right] to window
        window[s[right]] = window.get(s[right], 0) + 1

        # 2. Shrink: while window is invalid
        while is_invalid(window):
            window[s[left]] -= 1
            if window[s[left]] == 0:
                del window[s[left]]
            left += 1

        # 3. Update result
        result = max(result, right - left + 1)

    return result`,
        java: `public int dynamicWindow(String s) {
    int left = 0, result = 0;
    Map<Character, Integer> window = new HashMap<>();

    for (int right = 0; right < s.length(); right++) {
        // 1. Expand
        char c = s.charAt(right);
        window.merge(c, 1, Integer::sum);

        // 2. Shrink
        while (isInvalid(window)) {
            char lc = s.charAt(left);
            window.merge(lc, -1, Integer::sum);
            if (window.get(lc) == 0) window.remove(lc);
            left++;
        }

        // 3. Update
        result = Math.max(result, right - left + 1);
    }
    return result;
}`,
        go: `func dynamicWindow(s string) int {
    left, result := 0, 0
    window := make(map[byte]int)

    for right := 0; right < len(s); right++ {
        // 1. Expand
        window[s[right]]++

        // 2. Shrink
        for isInvalid(window) {
            window[s[left]]--
            if window[s[left]] == 0 {
                delete(window, s[left])
            }
            left++
        }

        // 3. Update
        if right-left+1 > result {
            result = right - left + 1
        }
    }
    return result
}`,
      },
      tip: "Expand right always. Shrink left only when invalid. Track state with hashmap/counter.",
    },
    {
      name: "Prefix Sum",
      usedFor: ["Range sum queries", "Subarray sum equals K", "Count subarrays with given sum", "2D prefix sum for matrix queries"],
      codes: {
        python: `# Build prefix sum
prefix = [0] * (len(nums) + 1)
for i in range(len(nums)):
    prefix[i + 1] = prefix[i] + nums[i]

# Range sum [l, r] inclusive
range_sum = prefix[r + 1] - prefix[l]

# Subarray sum equals K (using hashmap)
def subarray_sum(nums, k):
    count = 0
    curr_sum = 0
    prefix_counts = {0: 1}

    for num in nums:
        curr_sum += num
        count += prefix_counts.get(curr_sum - k, 0)
        prefix_counts[curr_sum] = prefix_counts.get(curr_sum, 0) + 1

    return count`,
        java: `// Build prefix sum
int[] prefix = new int[nums.length + 1];
for (int i = 0; i < nums.length; i++)
    prefix[i + 1] = prefix[i] + nums[i];

// Range sum [l, r] inclusive
int rangeSum = prefix[r + 1] - prefix[l];

// Subarray sum equals K
public int subarraySum(int[] nums, int k) {
    int count = 0, currSum = 0;
    Map<Integer, Integer> prefixCounts = new HashMap<>();
    prefixCounts.put(0, 1);

    for (int num : nums) {
        currSum += num;
        count += prefixCounts.getOrDefault(currSum - k, 0);
        prefixCounts.merge(currSum, 1, Integer::sum);
    }
    return count;
}`,
        go: `// Build prefix sum
prefix := make([]int, len(nums)+1)
for i := 0; i < len(nums); i++ {
    prefix[i+1] = prefix[i] + nums[i]
}

// Range sum [l, r] inclusive
rangeSum := prefix[r+1] - prefix[l]

// Subarray sum equals K
func subarraySum(nums []int, k int) int {
    count, currSum := 0, 0
    prefixCounts := map[int]int{0: 1}

    for _, num := range nums {
        currSum += num
        count += prefixCounts[currSum-k]
        prefixCounts[currSum]++
    }
    return count
}`,
      },
      tip: "prefix[i] = sum of nums[0..i-1]. Subarray sum = prefix[r+1] - prefix[l]. HashMap trick for O(n).",
    },
    {
      name: "Kadane's Algorithm (Max Subarray)",
      usedFor: ["Maximum subarray sum", "Maximum circular subarray", "Maximum product subarray (variant)"],
      codes: {
        python: `def max_subarray(nums):
    max_sum = curr_sum = nums[0]

    for num in nums[1:]:
        curr_sum = max(num, curr_sum + num)
        max_sum = max(max_sum, curr_sum)

    return max_sum

# Circular variant:
# max(normal_kadane, total_sum - min_subarray)`,
        java: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0], currSum = nums[0];

    for (int i = 1; i < nums.length; i++) {
        currSum = Math.max(nums[i], currSum + nums[i]);
        maxSum = Math.max(maxSum, currSum);
    }

    return maxSum;
}`,
        go: `func maxSubArray(nums []int) int {
    maxSum, currSum := nums[0], nums[0]

    for _, num := range nums[1:] {
        if currSum+num > num {
            currSum = currSum + num
        } else {
            currSum = num
        }
        if currSum > maxSum {
            maxSum = currSum
        }
    }
    return maxSum
}`,
      },
      tip: "At each step: extend current subarray or start new one. O(n) time, O(1) space.",
    },
  ],
};
