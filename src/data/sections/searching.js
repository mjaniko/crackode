export default {
  icon: "🔍",
  title: "Searching Patterns",
  color: "#FF6B6B",
  techniques: [
    {
      name: "Binary Search (Classic)",
      usedFor: ["Find target in sorted array", "First/last occurrence", "Search insert position"],
      codes: {
        python: `def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1  # or lo for insert position`,
        java: `public int binarySearch(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1; // or lo for insert position
}`,
        go: `func binarySearch(nums []int, target int) int {
    lo, hi := 0, len(nums)-1
    for lo <= hi {
        mid := lo + (hi-lo)/2
        if nums[mid] == target {
            return mid
        } else if nums[mid] < target {
            lo = mid + 1
        } else {
            hi = mid - 1
        }
    }
    return -1 // or lo for insert position
}`,
      },
      tip: "lo <= hi for exact match. Use lo < hi for boundary search. Always use lo + (hi-lo)/2 to avoid overflow.",
    },
    {
      name: "Binary Search on Answer ⭐",
      usedFor: ["Minimize maximum (split array)", "Maximize minimum (aggressive cows)", "Capacity problems (ships, workers)", "Koko eating bananas"],
      codes: {
        python: `def binary_search_on_answer(nums):
    lo, hi = min_possible, max_possible

    while lo < hi:
        mid = lo + (hi - lo) // 2
        if can_achieve(mid):  # feasibility check
            hi = mid       # try smaller (minimize)
            # lo = mid + 1  # try larger (maximize)
        else:
            lo = mid + 1   # need more (minimize)
            # hi = mid      # need less (maximize)

    return lo

def can_achieve(capacity):
    # Greedy check: can we do it with this capacity?
    # Return True/False
    pass`,
        java: `public int binarySearchOnAnswer(int[] nums) {
    int lo = minPossible, hi = maxPossible;

    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (canAchieve(mid)) { // feasibility check
            hi = mid;       // try smaller (minimize)
            // lo = mid + 1; // try larger (maximize)
        } else {
            lo = mid + 1;   // need more (minimize)
            // hi = mid;     // need less (maximize)
        }
    }
    return lo;
}

private boolean canAchieve(int capacity) {
    // Greedy check: can we do it with this capacity?
    return false;
}`,
        go: `func binarySearchOnAnswer(nums []int) int {
    lo, hi := minPossible, maxPossible

    for lo < hi {
        mid := lo + (hi-lo)/2
        if canAchieve(mid) { // feasibility check
            hi = mid       // try smaller (minimize)
            // lo = mid + 1 // try larger (maximize)
        } else {
            lo = mid + 1   // need more (minimize)
            // hi = mid     // need less (maximize)
        }
    }
    return lo
}

func canAchieve(capacity int) bool {
    // Greedy check
    return false
}`,
      },
      tip: "KEY INSIGHT: Binary search the answer space, not the array. Write a feasibility function. O(n log(range)).",
    },
    {
      name: "Lower Bound / Upper Bound",
      usedFor: ["First element ≥ target", "Last element ≤ target", "Count occurrences in sorted array", "bisect_left / bisect_right"],
      codes: {
        python: `# Lower bound: first index where nums[i] >= target
def lower_bound(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo

# Upper bound: first index where nums[i] > target
def upper_bound(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] <= target:
            lo = mid + 1
        else:
            hi = mid
    return lo

# Count of target = upper_bound - lower_bound`,
        java: `// Lower bound: first index where nums[i] >= target
public int lowerBound(int[] nums, int target) {
    int lo = 0, hi = nums.length;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

// Upper bound: first index where nums[i] > target
public int upperBound(int[] nums, int target) {
    int lo = 0, hi = nums.length;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] <= target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}`,
        go: `// Lower bound: first index where nums[i] >= target
func lowerBound(nums []int, target int) int {
    lo, hi := 0, len(nums)
    for lo < hi {
        mid := lo + (hi-lo)/2
        if nums[mid] < target {
            lo = mid + 1
        } else {
            hi = mid
        }
    }
    return lo
}

// Upper bound: first index where nums[i] > target
func upperBound(nums []int, target int) int {
    lo, hi := 0, len(nums)
    for lo < hi {
        mid := lo + (hi-lo)/2
        if nums[mid] <= target {
            lo = mid + 1
        } else {
            hi = mid
        }
    }
    return lo
}`,
      },
      tip: "Lower bound: lo < hi, hi = mid. Upper bound: same but nums[mid] <= target.",
    },
    {
      name: "Search in Rotated Sorted Array",
      usedFor: ["Rotated array search", "Find minimum in rotated array", "Find rotation point"],
      codes: {
        python: `def search_rotated(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target:
            return mid

        # Left half is sorted
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1`,
        java: `public int searchRotated(int[] nums, int target) {
    int lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;

        if (nums[lo] <= nums[mid]) { // left sorted
            if (nums[lo] <= target && target < nums[mid])
                hi = mid - 1;
            else
                lo = mid + 1;
        } else { // right sorted
            if (nums[mid] < target && target <= nums[hi])
                lo = mid + 1;
            else
                hi = mid - 1;
        }
    }
    return -1;
}`,
        go: `func searchRotated(nums []int, target int) int {
    lo, hi := 0, len(nums)-1
    for lo <= hi {
        mid := lo + (hi-lo)/2
        if nums[mid] == target {
            return mid
        }

        if nums[lo] <= nums[mid] { // left sorted
            if nums[lo] <= target && target < nums[mid] {
                hi = mid - 1
            } else {
                lo = mid + 1
            }
        } else { // right sorted
            if nums[mid] < target && target <= nums[hi] {
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        }
    }
    return -1
}`,
      },
      tip: "One half is always sorted. Check if target is in the sorted half → narrow search.",
    },
  ],
};
