import numpy as np
import time
import matplotlib.pyplot as plt

MAX = 25
m_range = np.linspace(1, MAX, MAX, dtype=int)
n_range = m_range.copy()


def traverse_matrix(A):
    m, n = A.shape

    benchmark = 0
    for row in range(m):
        for column in range(n):
            benchmark += 1


times = np.empty((MAX, MAX))

for m in range(MAX):
    for n in range(MAX):
        A = np.ones((m, n))
        SAMPLE_SIZE = 1000

        total_time = 0
        for _ in range(SAMPLE_SIZE):
            start = time.perf_counter()
            traverse_matrix(A)
            end = time.perf_counter()

            total_time += end - start

        times[m, n] = total_time / SAMPLE_SIZE * 1000

times = times[::-1]  # Reverse the order of rows in the 'times' array

fig, ax = plt.subplots()
im = ax.imshow(times, cmap="RdYlGn_r", aspect='auto')

ax.set_xticks(np.arange(len(n_range)))
ax.set_yticks(np.arange(len(m_range)))

ax.set_xticklabels(n_range)
ax.set_yticklabels(m_range[::-1])  # Reverse the order of yticklabels

plt.setp(ax.get_xticklabels(), rotation=90, ha="right", rotation_mode="anchor")

ax.set_xlabel("n")
ax.set_ylabel("m")
ax.set_title("Matrix Traversal Speed")

fig.colorbar(im, label="Average Execution Time (ms)")

# Hide spines
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_visible(False)
ax.spines["bottom"].set_visible(False)

plt.text(
    1.3,
    -0.12,
    "© kanenorman.com 2023",
    transform=ax.transAxes,
    fontsize=8,
    color="gray",
    ha="right",
    va="bottom",
)

plt.tight_layout()
plt.savefig("../../images/matrix-traverse.png", dpi=300)
plt.show()
