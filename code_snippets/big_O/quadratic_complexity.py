import random
import time
import matplotlib.pyplot as plt

def find_pairs_with_sum(array, target_sum):
    pairs = []
    for i in range(len(array)):
        for j in range(i + 1, len(array)):
            if array[i] + array[j] == target_sum:
                pairs.append((array[i], array[j]))
    return pairs

def time_sum_array(n):
    SAMPLE_SIZE = 1000
    total_time = 0
    arr = [random.randint(1, 100) for _ in range(n)]

    for _ in range(SAMPLE_SIZE):
        start_time = time.perf_counter()
        find_pairs_with_sum(arr, 10)
        end_time = time.perf_counter()
        total_time += end_time - start_time

    avg_time = total_time / SAMPLE_SIZE
    return avg_time * 1000

array_lengths = list(range(10, 1000, 50))
avg_times = [time_sum_array(n) for n in array_lengths]

plt.plot(array_lengths, avg_times, color='blue')
plt.xlabel('Array Length')
plt.ylabel('Average Execution Time (ms)')
plt.title('Performance of find_pairs_with_sum()')


# hide spines
plt.gca().spines["top"].set_visible(False)
plt.gca().spines["right"].set_visible(False)
plt.gca().spines["left"].set_visible(False)
plt.gca().spines["bottom"].set_visible(False)

plt.figtext(
    1.045,
    -0.14,
    "© kanenorman.com 2023",
    transform=plt.gca().transAxes,
    fontsize=8,
    color="gray",
    ha="right",
    va="bottom",
)

# Adjust spacing between subplots
plt.tight_layout()

# Display the plot
plt.savefig("../../images/quadratic-complexity.png", dpi=400)
plt.show()