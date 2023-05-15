import timeit
import matplotlib.pyplot as plt

# list that looks like [0, 1, 2, 3, ...97, 98, 99]
numbers = [number for number in range(100)]

# specific elements in array to use as inputs
first = 0
middle = 50
last = 99

# Calculate time measurements for each case
best_time = timeit.timeit(lambda: numbers.index(first), number=1000) * 1000
average_time = timeit.timeit(lambda: numbers.index(middle), number=1000) * 1000
worst_time = timeit.timeit(lambda: numbers.index(last), number=1000) * 1000

# Plotting the results
plt.bar(
    ["Best Case", "Average Case", "Worst Case"],
    [best_time, average_time, worst_time],
    color=["#77DD77", "#FFFF66", "#FF6961"],
)
plt.ylabel("Time (ms)")
plt.title("Execution Time for Best, Average, and Worst Cases")

# hide spines
plt.gca().spines["top"].set_visible(False)
plt.gca().spines["right"].set_visible(False)
plt.gca().spines["left"].set_visible(False)
plt.gca().spines["bottom"].set_visible(False)

plt.text(
    0.98,
    -0.12,
    "© kanenorman.com 2023",
    transform=plt.gca().transAxes,
    fontsize=8,
    color="gray",
    ha="right",
    va="bottom",
)

plt.savefig("../../images/best-average-worst-case.png", dpi=300)
plt.show()
