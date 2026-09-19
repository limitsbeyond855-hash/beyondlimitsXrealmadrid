// =========================
// BEYOND LIMITS
// CART SYSTEM
// =========================

let cart = [];

const cartDisplay = document.getElementById("cart-count");
const addButtons = document.querySelectorAll(".add-button");

const bagButton = document.querySelector(".bag");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartClose = document.getElementById("cart-close");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


// =========================
// ADD PRODUCT
// =========================

addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const product = button.closest(".product");

        const name = product.querySelector("h3").textContent;
        const priceText = product.querySelector("strong").textContent;

        const price = Number(
            priceText.replace("₦", "").replace(/,/g, "")
        );

        cart.push({
            name: name,
            price: price
        });

        updateCart();

        button.textContent = "✓";

        setTimeout(() => {
            button.textContent = "+";
        }, 700);
    });

});


// =========================
// UPDATE CART
// =========================

function updateCart() {

    cartDisplay.textContent = cart.length;

    renderCart();
}


// =========================
// RENDER CART
// =========================

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your bag is empty.</p>';

        cartTotal.textContent = "₦0";

        return;
    }


    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>BEYOND LIMITS</p>

                <button
                    class="remove-item"
                    data-index="${index}">
                    REMOVE
                </button>
            </div>

            <span class="cart-item-price">
                ₦${item.price.toLocaleString()}
            </span>
        `;

        cartItems.appendChild(cartItem);
    });


    const total = cart.reduce(
        (sum, item) => sum + item.price,
        0
    );

    cartTotal.textContent =
        `₦${total.toLocaleString()}`;


    // Remove buttons

    document.querySelectorAll(".remove-item").forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(
                button.dataset.index
            );

            cart.splice(index, 1);

            updateCart();
        });

    });
}


// =========================
// OPEN CART
// =========================

function openCart() {

    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");

    document.body.classList.add("cart-open");
}


// =========================
// CLOSE CART
// =========================

function closeCart() {

    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");

    document.body.classList.remove("cart-open");
}


// =========================
// BAG BUTTON
// =========================

bagButton.addEventListener("click", openCart);

cartClose.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


// =========================
// ESC KEY
// =========================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeCart();
    }

});

// =========================
// PRODUCT DETAILS
// =========================

const productDetail = document.getElementById("product-detail");
const productOverlay = document.getElementById("product-overlay");
const productDetailClose = document.getElementById("product-detail-close");

const detailNumber = document.getElementById("product-detail-number");
const detailCategory = document.getElementById("detail-category");
const detailName = document.getElementById("detail-name");
const detailDescription = document.getElementById("detail-description");
const detailPrice = document.getElementById("detail-price");
const detailGarmentText = document.getElementById("detail-garment-text");
const detailAddButton = document.getElementById("detail-add-button");


// Product information

const products = [
    {
        number: "01",
        name: "THE STANDARD HOODIE",
        category: "HEAVYWEIGHT HOODIE",
        price: 185000,
        description:
            "A heavyweight statement piece built around the Beyond Limits identity. Designed with an oversized silhouette and a clean, premium finish.",
        garment: "BEYOND<br>LIMITS"
    },

    {
        number: "02",
        name: "LIMITLESS JACKET",
        category: "TECHNICAL OUTERWEAR",
        price: 235000,
        description:
            "A structured technical layer made for movement. Sharp proportions meet a utility-inspired silhouette.",
        garment: "BL<br>01"
    },

    {
        number: "03",
        name: "ROYAL QUARTER-ZIP",
        category: "PERFORMANCE LAYER",
        price: 165000,
        description:
            "A refined quarter-zip combining performance-inspired construction with the understated language of Beyond Limits.",
        garment: "BEYOND"
    },

    {
        number: "04",
        name: "NO CEILING OVERSHIRT",
        category: "STATEMENT LAYER",
        price: 210000,
        description:
            "A statement overshirt built around the idea that there is no ceiling. Relaxed, versatile and designed to stand alone.",
        garment: "NO<br>CEILING"
    }
];


// =========================
// OPEN PRODUCT
// =========================

function openProduct(index) {

    const product = products[index];

    if (!product) return;

    detailNumber.textContent = product.number;

    detailCategory.textContent = product.category;

    detailName.textContent = product.name;

    detailDescription.textContent = product.description;

    detailPrice.textContent =
        `₦${product.price.toLocaleString()}`;

    detailGarmentText.innerHTML = product.garment;


    productDetail.classList.add("active");

    productOverlay.classList.add("active");

    document.body.classList.add("cart-open");
}


// =========================
// CLOSE PRODUCT
// =========================

function closeProduct() {

    productDetail.classList.remove("active");

    productOverlay.classList.remove("active");

    document.body.classList.remove("cart-open");
}


productDetailClose.addEventListener(
    "click",
    closeProduct
);

productOverlay.addEventListener(
    "click",
    closeProduct
);


// =========================
// CLICK PRODUCT CARD
// =========================

document.querySelectorAll(".product").forEach((product, index) => {

    product.addEventListener("click", (event) => {

        // Don't open the detail panel when
        // clicking the + button.

        if (event.target.closest(".add-button")) {
            return;
        }

        openProduct(index);

    });

});


// =========================
// ADD FROM PRODUCT DETAIL
// =========================

detailAddButton.addEventListener("click", () => {

    const currentName = detailName.textContent;

    const product = products.find(
        (item) => item.name === currentName
    );

    if (!product) return;

    cart.push({
        name: product.name,
        price: product.price
    });

    updateCart();

    detailAddButton.innerHTML = `
        ADDED TO BAG
        <span>✓</span>
    `;

    setTimeout(() => {

        detailAddButton.innerHTML = `
            ADD TO BAG
            <span>+</span>
        `;

    }, 900);

});


// =========================
// ESC KEY
// =========================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeProduct();
    }

});
/* =========================
   ACCOUNT DRAWER
========================= */

const accountOpen = document.getElementById("account-open");
const accountClose = document.getElementById("account-close");
const accountDrawer = document.getElementById("account-drawer");
const accountOverlay = document.getElementById("account-overlay");

const signinTab = document.getElementById("signin-tab");
const signupTab = document.getElementById("signup-tab");

const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");


function openAccount() {
    accountDrawer.classList.add("active");
    accountOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}


function closeAccount() {
    accountDrawer.classList.remove("active");
    accountOverlay.classList.remove("active");
    document.body.style.overflow = "";
}


accountOpen.addEventListener("click", openAccount);

accountClose.addEventListener("click", closeAccount);

accountOverlay.addEventListener("click", closeAccount);


signinTab.addEventListener("click", () => {

    signinTab.classList.add("active");
    signupTab.classList.remove("active");

    signinForm.classList.remove("hidden");
    signupForm.classList.add("hidden");

});


signupTab.addEventListener("click", () => {

    signupTab.classList.add("active");
    signinTab.classList.remove("active");

    signupForm.classList.remove("hidden");
    signinForm.classList.add("hidden");

});
/* =========================
   SUPABASE AUTHENTICATION
========================= */

const SUPABASE_URL = "https://tuxjlnmhuejldrsuvoip.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_NQiebbnjw2jwF3L9Xry1Gg_-fCSR6LC";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* =========================
   CREATE ACCOUNT
========================= */

signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const username = document.getElementById("signup-username").value.trim();
const email = document.getElementById("signup-email").value.trim();
const password = document.getElementById("signup-password").value;

   const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
        emailRedirectTo:
            "https://limitsbeyond855-hash.github.io/beyondlimitsXrealmadrid/",
        data: {
            username: username
        }
    }
});

    if (error) {
    console.error("Supabase signup error:", error);
    alert("Signup failed:\n\n" + error.message);
    return;
}

    if (data.user) {
        alert(
            "Account created successfully. Check your email to confirm your account."
        );

        signupForm.reset();

        signinTab.click();
    }

});


/* =========================
   SIGN IN
========================= */

signinForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert(error.message);
        return;
    }

    if (data.user) {

        alert("Welcome back to Beyond Limits.");

        signinForm.reset();

        closeAccount();
    }

});