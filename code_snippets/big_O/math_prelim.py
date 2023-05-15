import matplotlib.pyplot as plt
import numpy as np
import math

# Create an array of x values
x = np.linspace(0.1, 8, 1000)

# Define the functions
constant = lambda x: np.ones_like(x)  # f(x) = 1
linear = lambda x: x  # f(x) = x
quadratic = lambda x: x**2  # f(x) = x^2
logarithmic = lambda x: np.log(x)  # f(x) = log(x)
exponential = lambda x: np.exp(x)  # f(x) = e^x
factorial = lambda x: [math.factorial(int(i)) for i in x]  # f(x) = x!

# Create a 2x3 grid of subplots
fig, axs = plt.subplots(2, 3, figsize=(12, 8))

# Plot each function on the subplots
functions = [constant, linear, quadratic, logarithmic, exponential, factorial]
function_names = [
    "Constant",
    "Linear",
    "Quadratic",
    "Logarithmic",
    "Exponential",
    "Factorial",
]

for i, ax in enumerate(axs.flatten()):
    ax.plot(x, functions[i](x))
    ax.set_title(function_names[i])
    ax.set_xlabel("x")
    ax.set_ylabel("f(x)")

    # Hide top and right spines
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)




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
plt.savefig("../../images/math-functions.png", dpi=400)
