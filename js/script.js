                                    /* Scan page */

const photoInput = document.getElementById("food-photo");
const preview = document.getElementById("preview-food");

const scanButton = document.getElementById("scan-button");

if (photoInput){

    photoInput.addEventListener("change", () => {
        const file = photoInput.files[0];

        if (file) {
            preview.src = URL.createObjectURL(file);
        }
    });
}

if (scanButton) {

    scanButton.addEventListener("click", () => {
        window.location.href = "result.html";
    });
}


                                    /* Result page */

const addFoodButton = document.getElementById("add-food");

if (addFoodButton) {
    addFoodButton.addEventListener("click", () => {
        const food = {
            name: "Cheese",
            expirationDate: "2 September 2026"
        };
        localStorage.setItem("food", JSON.stringify(food));
    });
}


                                    /* My Food List page */

const foodList = document.getElementById("food-list-container");

if (foodList) {
    const savedFood = localStorage.getItem("food");
    if (savedFood) {
        const food = JSON.parse(savedFood);

        foodList.innerHTML = `
        <h2>${food.name}</h2>
        <p>Expiration Date: ${food.expirationDate}</p>
        `;
    }

}