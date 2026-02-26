export default {
  icon: "🏔",
  title: "Heap Patterns",
  color: "#34D399",
  techniques: [
    {
      name: "Top K Elements",
      usedFor: ["Top K frequent elements", "K closest points to origin", "Sort characters by frequency"],
      codes: {
        python: `import heapq
from collections import Counter

# Top K Frequent (min-heap of size K)
def top_k_frequent(nums, k):
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)

# Alternative: maintain min-heap of size k
def top_k_heap(nums, k):
    count = Counter(nums)
    heap = []
    for num, freq in count.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)
    return [num for freq, num in heap]`,
        java: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int n : nums) count.merge(n, 1, Integer::sum);

    // Min-heap of size k
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    for (var entry : count.entrySet()) {
        pq.offer(new int[]{entry.getKey(), entry.getValue()});
        if (pq.size() > k) pq.poll();
    }

    int[] result = new int[k];
    for (int i = 0; i < k; i++) result[i] = pq.poll()[0];
    return result;
}`,
        go: `func topKFrequent(nums []int, k int) []int {
    count := map[int]int{}
    for _, n := range nums { count[n]++ }

    // Use min-heap of size k
    h := &FreqHeap{}
    for num, freq := range count {
        heap.Push(h, [2]int{freq, num})
        if h.Len() > k { heap.Pop(h) }
    }

    result := make([]int, k)
    for i := 0; i < k; i++ {
        result[i] = heap.Pop(h).([2]int)[1]
    }
    return result
}`,
      },
      tip: "For top K: use min-heap of size K (pop smallest). For bottom K: use max-heap of size K.",
    },
    {
      name: "Median Finder (Two Heaps)",
      usedFor: ["Find median from data stream", "Sliding window median", "Balance two halves"],
      codes: {
        python: `import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []  # max-heap (negate values)
        self.hi = []  # min-heap

    def addNum(self, num):
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))

        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self):
        if len(self.lo) > len(self.hi):
            return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2`,
        java: `class MedianFinder {
    PriorityQueue<Integer> lo; // max-heap
    PriorityQueue<Integer> hi; // min-heap

    MedianFinder() {
        lo = new PriorityQueue<>(Collections.reverseOrder());
        hi = new PriorityQueue<>();
    }

    void addNum(int num) {
        lo.offer(num);
        hi.offer(lo.poll());
        if (hi.size() > lo.size()) lo.offer(hi.poll());
    }

    double findMedian() {
        if (lo.size() > hi.size()) return lo.peek();
        return (lo.peek() + hi.peek()) / 2.0;
    }
}`,
        go: `type MedianFinder struct {
    lo *MaxHeap // lower half
    hi *MinHeap // upper half
}

func (mf *MedianFinder) AddNum(num int) {
    heap.Push(mf.lo, num)
    heap.Push(mf.hi, heap.Pop(mf.lo).(int))

    if mf.hi.Len() > mf.lo.Len() {
        heap.Push(mf.lo, heap.Pop(mf.hi).(int))
    }
}

func (mf *MedianFinder) FindMedian() float64 {
    if mf.lo.Len() > mf.hi.Len() {
        return float64((*mf.lo)[0])
    }
    return float64((*mf.lo)[0]+(*mf.hi)[0]) / 2.0
}`,
      },
      tip: "Max-heap for lower half, min-heap for upper. Balance sizes. Median = top of max-heap or average.",
    },
  ],
};
