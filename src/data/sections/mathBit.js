export default {
  icon: "🔢",
  title: "Math & Bit Patterns",
  color: "#FB923C",
  techniques: [
    {
      name: "Bit Manipulation Tricks",
      usedFor: ["Single number (XOR)", "Count set bits", "Power of 2 check", "Missing number", "Subsets using bitmask"],
      codes: {
        python: `# XOR tricks: a ^ a = 0, a ^ 0 = a
# Single Number: XOR all elements

# Count set bits (Brian Kernighan)
def count_bits(n):
    count = 0
    while n:
        n &= n - 1  # clear lowest set bit
        count += 1
    return count

# Power of 2: n & (n-1) == 0
def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0

# Get/Set/Clear bit at position i
get_bit   = (n >> i) & 1
set_bit   = n | (1 << i)
clear_bit = n & ~(1 << i)
toggle    = n ^ (1 << i)

# Subsets using bitmask
def subsets_bitmask(nums):
    n = len(nums)
    result = []
    for mask in range(1 << n):
        subset = [nums[i] for i in range(n) if mask & (1 << i)]
        result.append(subset)
    return result`,
        java: `// Count set bits (Brian Kernighan)
public int countBits(int n) {
    int count = 0;
    while (n != 0) {
        n &= n - 1; // clear lowest set bit
        count++;
    }
    return count;
}

// Or: Integer.bitCount(n)

// Power of 2
public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

// Bit operations at position i
int getBit  = (n >> i) & 1;
int setBit  = n | (1 << i);
int clearBit = n & ~(1 << i);

// Subsets using bitmask
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    for (int mask = 0; mask < (1 << nums.length); mask++) {
        List<Integer> subset = new ArrayList<>();
        for (int i = 0; i < nums.length; i++)
            if ((mask & (1 << i)) != 0) subset.add(nums[i]);
        result.add(subset);
    }
    return result;
}`,
        go: `// Count set bits (Brian Kernighan)
func countBits(n int) int {
    count := 0
    for n != 0 {
        n &= n - 1 // clear lowest set bit
        count++
    }
    return count
}

// Or: bits.OnesCount(uint(n))

// Power of 2
func isPowerOfTwo(n int) bool {
    return n > 0 && (n & (n-1)) == 0
}

// Subsets using bitmask
func subsets(nums []int) [][]int {
    n := len(nums)
    result := [][]int{}
    for mask := 0; mask < (1 << n); mask++ {
        subset := []int{}
        for i := 0; i < n; i++ {
            if mask & (1 << i) != 0 {
                subset = append(subset, nums[i])
            }
        }
        result = append(result, subset)
    }
    return result
}`,
      },
      tip: "XOR: find unique. n & (n-1): clear lowest bit. Bitmask: enumerate all subsets in O(2^n).",
    },
    {
      name: "GCD / LCM & Sieve",
      usedFor: ["GCD of array", "LCM calculations", "Find primes up to N", "Prime factorization"],
      codes: {
        python: `import math

# GCD (Euclidean)
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a
# Or: math.gcd(a, b)

# LCM
def lcm(a, b):
    return a * b // gcd(a, b)

# Sieve of Eratosthenes
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    return [i for i in range(n + 1) if is_prime[i]]`,
        java: `// GCD (Euclidean)
public int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// LCM
public long lcm(int a, int b) {
    return (long) a / gcd(a, b) * b;
}

// Sieve of Eratosthenes
public List<Integer> sieve(int n) {
    boolean[] isPrime = new boolean[n + 1];
    Arrays.fill(isPrime, true);
    isPrime[0] = isPrime[1] = false;

    for (int i = 2; i * i <= n; i++)
        if (isPrime[i])
            for (int j = i * i; j <= n; j += i)
                isPrime[j] = false;

    List<Integer> primes = new ArrayList<>();
    for (int i = 2; i <= n; i++)
        if (isPrime[i]) primes.add(i);
    return primes;
}`,
        go: `// GCD (Euclidean)
func gcd(a, b int) int {
    for b != 0 {
        a, b = b, a%b
    }
    return a
}

// LCM
func lcm(a, b int) int {
    return a / gcd(a, b) * b
}

// Sieve of Eratosthenes
func sieve(n int) []int {
    isPrime := make([]bool, n+1)
    for i := range isPrime { isPrime[i] = true }
    isPrime[0], isPrime[1] = false, false

    for i := 2; i*i <= n; i++ {
        if isPrime[i] {
            for j := i * i; j <= n; j += i {
                isPrime[j] = false
            }
        }
    }

    primes := []int{}
    for i := 2; i <= n; i++ {
        if isPrime[i] { primes = append(primes, i) }
    }
    return primes
}`,
      },
      tip: "GCD: O(log min(a,b)). Sieve: O(n log log n). Start marking from i*i.",
    },
  ],
};
