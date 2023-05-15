import random
import time
import matplotlib.pyplot as plt


def sum_array(array):
    total = 0
    for num in array:
        total += num
    return total


def time_sum_array(n):
    SAMPLE_SIZE = 1000
    total_time = 0
    arr = [random.randint(1, 100) for i in range(n)]

    for _ in range(SAMPLE_SIZE):
        start_time = time.perf_counter()
        sum_array(arr)
        end_time = time.perf_counter()
        total_time += end_time - start_time

    avg_time = total_time / SAMPLE_SIZE
    return avg_time * 1000


array_lengths = list(range(10, 1000, 50))
avg_times = [time_sum_array(n) for n in array_lengths]

plt.plot(array_lengths, avg_times, color="blue")
plt.xlabel("Array Length")
plt.ylabel("Average Execution Time (ms)")
plt.title("Performance of sum_array()")

# hide spines
plt.gca().spines["top"].set_visible(False)
plt.gca().spines["right"].set_visible(False)
plt.gca().spines["left"].set_visible(False)
plt.gca().spines["bottom"].set_visible(False)


plt.text(
    1.03,
    -0.12,
    "© kanenorman.com 2023",
    transform=plt.gca().transAxes,
    fontsize=8,
    color="gray",
    ha="right",
    va="bottom",
)


plt.savefig("../../images/linear-complexity.png", dpi=350)
plt.show()
