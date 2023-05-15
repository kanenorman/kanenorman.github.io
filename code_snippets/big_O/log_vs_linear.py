import random
import time
import numpy as np
import matplotlib.pyplot as plt

def linear_search(array, value):
    for i in range(len(array)):
        if array[i] == value:
            return i
    return -1

def binary_search(array, value):
    low = 0
    high = len(array) - 1
    while low <= high:
        middle = (low + high) // 2
        if array[middle] == value:
            return middle
        if array[middle] < value:
            low = middle + 1
        if array[middle] > value:
            high = middle - 1
    return -1

def time_binary_search(n):
    SAMPLE_SIZE = 100
    total_time_binary = 0
    total_time_linear = 0
    arr = [i for i in range(n)]
    search_element = arr[-1]
    for _ in range(SAMPLE_SIZE):
        start_time = time.perf_counter()
        binary_search(arr, search_element)
        end_time = time.perf_counter()
        total_time_binary += end_time - start_time

        start_time = time.perf_counter()
        linear_search(arr, search_element)
        end_time = time.perf_counter()
        total_time_linear += end_time - start_time

    avg_time_binary = total_time_binary / SAMPLE_SIZE * 1000
    avg_time_linear = total_time_linear / SAMPLE_SIZE * 1000

    return avg_time_binary, avg_time_linear

# Calculate the average times for arrays of different lengths
array_lengths = list(range(10, 700, 30))
avg_times_binary = []
avg_times_linear = []
for n in array_lengths:
    binary_time, linear_time = time_binary_search(n)
    avg_times_binary.append(binary_time)
    avg_times_linear.append(linear_time)

# Create a line plot using matplotlib to visualize the results
plt.plot(array_lengths, avg_times_binary, label="Binary Search", color="blue")
plt.plot(array_lengths, avg_times_linear, label="Linear Search", color="red")
plt.xlabel("Array Length")
plt.ylabel("Average Execution Time (ms)")
plt.title("Performance of Binary Search vs Linear Search")
plt.legend()

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
plt.savefig("../../images/binary_vs_linear_search.png", dpi=300)
plt.show()
