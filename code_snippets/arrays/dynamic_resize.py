import sys

import matplotlib.pyplot as plt

if __name__ == "__main__":
    my_list = []
    x_values = []
    y_values = []

    for _ in range(26):
        x_values.append(len(my_list))
        y_values.append(sys.getsizeof(my_list))
        my_list.append(None)

    plt.bar(x_values, y_values)

    plt.xlabel("Length")
    plt.ylabel("Size in Bytes")
    plt.title("Memory Usage of Python List")

    # Hide the spines
    plt.gca().spines["top"].set_visible(False)
    plt.gca().spines["right"].set_visible(False)
    plt.gca().spines["bottom"].set_visible(False)
    plt.gca().spines["left"].set_visible(False)

    plt.figtext(
        1,
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
    plt.savefig("../../images/memory-usage-dynamic-array.png", dpi=400)
