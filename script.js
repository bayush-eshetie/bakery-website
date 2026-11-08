
const modal = document.getElementById("cake-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalClose = document.getElementById("modal-close");
const modalOrder = document.getElementById("modal-order");
const cakeChoice = document.getElementById("cake-choice");
const orderForm = document.getElementById("order-form");
const orderStatus = document.getElementById("order-status");

let selectedCake = "";

// Open the large preview when a customer clicks a cake photo
document.querySelectorAll(".cake-photo").forEach(function (photo) {
    photo.addEventListener("click", function () {
        selectedCake = photo.dataset.name;

        modalImage.src = photo.dataset.image;
        modalTitle.textContent = selectedCake;

        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        modalClose.focus();
    });
});

// Close the preview
function closeCakeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeCakeModal);

// Close when clicking outside the cake preview
modal.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeCakeModal();
    }
});

// Close with the Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("show")) {
        closeCakeModal();
    }
});

// Select the cake and go to the order form
function chooseCake(cakeName) {
    cakeChoice.value = cakeName;
    orderStatus.textContent =
        "You selected " + cakeName + ". Tell us what you need.";

    closeCakeModal();

    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });
}

// Order buttons on the cake cards
document.querySelectorAll(".order-button").forEach(function (button) {
    button.addEventListener("click", function () {
        chooseCake(button.dataset.cake);
    });
});

// Order button inside the large image preview
modalOrder.addEventListener("click", function () {
    chooseCake(selectedCake);
});

// Send the completed order to WhatsApp
orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name =
        document.getElementById("customer-name").value.trim();

    const cake = cakeChoice.value;

    const quantity = Number(
        document.getElementById("cake-quantity").value
    );

    const message =
        document.getElementById("order-message").value.trim();

    if (!name || !cake) {
        orderStatus.textContent =
            "Please enter your name and select a cake.";
        return;
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
        orderStatus.textContent =
            "Please enter a quantity between 1 and 100.";
        return;
    }

    const orderMessage = [
        "Hello Berry Bliss! 🍰",
        "",
        "I would like to order a cake.",
        "Name: " + name,
        "Cake: " + cake,
        "Quantity: " + quantity,
        "My requirements: " + (message || "Please contact me about options."),
        "",
        "Please tell me the price and availability."
    ].join("\n");

    const whatsappURL =
        "https://wa.me/251948222333?text=" +
        encodeURIComponent(orderMessage);

    orderStatus.textContent = "Opening WhatsApp to send your order...";

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
