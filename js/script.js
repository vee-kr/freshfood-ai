const photoInput = document.getElementById("food-photo");
const preview = document.getElementById("preview-food");

const scanButton = document.getElementById("scan-button");

photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    }
});

scanButton.addEventListener("click", () => {
    window.location.href = "result.html";
});