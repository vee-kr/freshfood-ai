  const scanResult = {
            name: "Milk",
            expirationDate: "2026-09-07"
        };

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
        localStorage.setItem("scanResult", JSON.stringify(scanResult));
        window.location.href = "result.html";
    });
}

function getStatus(expirationDate) {
    const today = new Date();
    const expiration = new Date(expirationDate);

     const difference = expiration - today;
     const leftDays = Math.floor(difference / (3600 * 1000 * 24));


     if (today > expiration) {
         return "Expired";
     }
     else if (leftDays <= 3) {
         return "Expiring soon!";
     }
     else {
         return "Fresh";
     }

  }


                                    /* Result page */

const addFoodButton = document.getElementById("add-food");

const resultProduct = document.getElementById("result-product");
const resultDate = document.getElementById("result-date");
const resultStatus = document.getElementById("result-status");

const savedScan = localStorage.getItem("scanResult");
const food = JSON.parse(savedScan);


if (resultProduct) {
    resultProduct.textContent = food.name;
    resultDate.textContent = food.expirationDate;
    resultStatus.textContent = getStatus(food.expirationDate);

}


if (addFoodButton) {
    addFoodButton.addEventListener("click", () => {

        const savedFood = localStorage.getItem("food");

        let foodList = [];

        if (savedFood) {
            foodList = JSON.parse(savedFood);
            console.log(foodList);
        }


        foodList.push(food);

        localStorage.setItem("food", JSON.stringify(foodList));
    });
}





                                    /* My Food List page */

const foodListContainer = document.getElementById("food-list-container");

if (foodListContainer) {
    const savedFood = localStorage.getItem("food");
    if (savedFood) {
        const foodList = JSON.parse(savedFood);


        foodList.forEach((food) => {

            const expirationDate = new Date(food.expirationDate);

            const formatDate = expirationDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });


            const status = getStatus(food.expirationDate);

            foodListContainer.innerHTML += `
        <h2>${food.name}</h2>
        <p>Expiration Date: ${formatDate}</p>
        <p>Status: ${status}</p>
        `;
        });
    }
}
