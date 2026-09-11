const scanResult = {
            name: "Cheese",
            expirationDate: "2026-09-05"
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
         return "🔴 Expired";
     }
     else if (leftDays <= 3) {
         return "🟡 Expiring soon!";
     }
     else {
         return "🟢 Fresh";
     }

  }


                                    /* Result page */

const addFoodButton = document.getElementById("add-food");
const readAloudButton = document.getElementById("read-aloud");

const resultProduct = document.getElementById("result-product");
const resultDate = document.getElementById("result-date");
const resultStatus = document.getElementById("result-status");

const savedScan = localStorage.getItem("scanResult");
const food = JSON.parse(savedScan);  // typeof = object


if (resultProduct) {
    resultProduct.textContent = food.name;

    const expirationDate = new Date(food.expirationDate);
    const formatDate = expirationDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

    resultDate.textContent = formatDate;
    resultStatus.textContent = getStatus(food.expirationDate);

}


if (addFoodButton) {
    addFoodButton.addEventListener("click", () => {

        const savedFood = localStorage.getItem("food");

        let foodList = [];

        if (savedFood) {
            foodList = JSON.parse(savedFood);  // typeof = object
        }


        food.id = Date.now()
        foodList.push(food);

        localStorage.setItem("food", JSON.stringify(foodList));  // update "food" in localStorage with foodlist

        alert(`${food.name} was added to My Food List!`);
    });
}

if (readAloudButton) {
    readAloudButton.addEventListener("click", () => {
        const text = `${food.name}. Expiration date: ${resultDate.textContent}. Status: ${resultStatus.textContent}`;

        const speech = new SpeechSynthesisUtterance(text);

        speechSynthesis.cancel();
        speechSynthesis.speak(speech);
    });
}





                                    /* My Food List page */

const foodListContainer = document.getElementById("food-list-container");


if (foodListContainer) {


    const savedFood = localStorage.getItem("food");
    if (savedFood) {
        const foodList = JSON.parse(savedFood);

        foodList.sort((a, b) => {
            return new Date(a.expirationDate) - new Date(b.expirationDate);
        });



        foodList.forEach((food) => {

            const expirationDate = new Date(food.expirationDate);

            const formatDate = expirationDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });



            const status = getStatus(food.expirationDate);

            foodListContainer.innerHTML += `
        <div class="food-card">
            <h2>${food.name}</h2>
            <p>Expiration Date: ${formatDate}</p>
            <p>Status: ${status}</p>
            <button class="remove-button" data-id="${food.id}">Remove</button>
        </div>
        `;
        });


        const removeButton = document.querySelectorAll(".remove-button");
    removeButton.forEach((button) => {
        button.addEventListener("click", () => {
            const foodId = Number(button.dataset.id);

            const foodIndex = foodList.findIndex((food) => food.id === foodId);
            foodList.splice(foodIndex, 1);
            localStorage.setItem("food", JSON.stringify(foodList));
            location.reload();
            });
        });

    }

    else {
        foodListContainer.textContent = "Your food list is empty. Scan a product to add it!"

    }
    
}
