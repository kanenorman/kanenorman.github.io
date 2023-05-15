import random
import time
import numpy as np
import matplotlib.pyplot as plt

def fibonacci(n):
    if n == 0 or n == 1:
        return n
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

# Define a function to calculate the average time taken to execute fibonacci()
def time_fibonacci(n):
    SAMPLE_SIZE = 10
    total_time = 0

    for _ in range(SAMPLE_SIZE):
        start_time = time.perf_counter()
        fibonacci(n)
        end_time = time.perf_counter()
        total_time += end_time - start_time

    avg_time = total_time / SAMPLE_SIZE * 1000
    return avg_time

# Calculate the average time for values of n
n_values = np.arange(20)
avg_times = [time_fibonacci(n) for n in n_values]

# Create a line plot using matplotlib to visualize the results
plt.plot(n_values, avg_times, color='blue')
plt.xlabel('n')
plt.ylabel('Average Execution Time (ms)')
plt.title('Performance of fibonacci()')

plt.gca().spines["top"].set_visible(False)
plt.gca().spines["right"].set_visible(False)
plt.gca().spines["left"].set_visible(False)
plt.gca().spines["bottom"].set_visible(False)

plt.text(
    1,
    -0.12,
    "© kanenorman.com 2023",
    transform=plt.gca().transAxes,
    fontsize=8,
    color="gray",
    ha="right",
    va="bottom",
)

plt.tight_layout()
plt.savefig('../../images/exponential_complexity.png', dpi=300)
plt.show()
