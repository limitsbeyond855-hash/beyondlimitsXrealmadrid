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

    cartDisplay.textContent = cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your bag is empty.</p>';

        cartTotal.textContent = "₦0";

        return;
    }

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>BEYOND LIMITS</p>
            </div>

            <span class="cart-item-price">
                ₦${item.price.toLocaleString()}
            </span>

            <button
                class="remove-item"
                data-index="${index}"
                type="button"
                aria-label="Remove item"
            >
                ×
            </button>
        `;

        cartItems.appendChild(cartItem);

    });


    const total =
        cart.reduce(
            (sum, item) => sum + item.price,
            0
        );

    cartTotal.textContent =
        `₦${total.toLocaleString()}`;


    document
        .querySelectorAll(".remove-item")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);

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

const DELIVERY_METHOD = "Standard Delivery";
const DELIVERY_FEE = 0;


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

        const accountStatus = document.getElementById("account-status");

        accountStatus.textContent = error.message;
        accountStatus.className = "account-status error";

        return;
    }

    if (data.user) {
        const accountStatus = document.getElementById("account-status");

        accountStatus.textContent =
            "Account created. Check your email to confirm your account.";

        accountStatus.className = "account-status success";

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
        console.error("Supabase sign-in error:", error);

        const signinStatus = document.getElementById("signin-status");

        signinStatus.textContent = error.message;
        signinStatus.className = "account-status error";

        return;
    }

    if (data.user) {

        const signinStatus = document.getElementById("signin-status");

        signinStatus.textContent = "Welcome back.";
        signinStatus.className = "account-status success";

        signinForm.reset();

        closeAccount();
    }

});


/* =========================
   USER ACCOUNT MENU
========================= */

const userMenu = document.getElementById("user-menu");
const userInitial = document.getElementById("user-initial");
const userDropdown = document.getElementById("user-dropdown");

const userDropdownName =
    document.getElementById("user-dropdown-name");

const userDropdownEmail =
    document.getElementById("user-dropdown-email");

const signoutButton =
    document.getElementById("signout-button");


function showUserInitial(user) {

    if (!user || !userInitial) return;

    const username =
        user.user_metadata?.username ||
        user.email ||
        "";

    if (!username) return;

    const cleanUsername =
        username.replace("@", "");

    userInitial.textContent =
        cleanUsername.charAt(0).toUpperCase();

    userDropdownName.textContent =
        cleanUsername;

    userDropdownEmail.textContent =
        user.email || "";

    userInitial.classList.add("active");
}


function hideUserInitial() {

    if (!userInitial) return;

    userInitial.textContent = "";

    userInitial.classList.remove("active");

    userDropdown.classList.remove("active");
}


userInitial.addEventListener("click", (event) => {

    event.stopPropagation();

    userDropdown.classList.toggle("active");

});


document.addEventListener("click", (event) => {

    if (
        userMenu &&
        !userMenu.contains(event.target)
    ) {
        userDropdown.classList.remove("active");
    }

});


signoutButton.addEventListener("click", async () => {

    const { error } =
        await supabaseClient.auth.signOut();

    if (error) {

        console.error(
            "Supabase sign-out error:",
            error
        );

        return;
    }

    hideUserInitial();

});


async function checkUserSession() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    if (session?.user) {

        showUserInitial(session.user);

    } else {

        hideUserInitial();

    }
}


supabaseClient.auth.onAuthStateChange(
    (event, session) => {

        if (session?.user) {

            showUserInitial(session.user);

        } else {

            hideUserInitial();

        }

    }
);

const bagView =
    document.getElementById("bag-view");

checkUserSession();


/* =========================
   CHECKOUT
========================= */

const checkoutButton =
    document.getElementById("checkout-button");

const checkoutView =
    document.getElementById("checkout-view");

const backToBag =
    document.getElementById("back-to-bag");

const checkoutForm =
    document.getElementById("checkout-form");

const checkoutSummary =
    document.getElementById("checkout-summary");

const checkoutTotal =
    document.getElementById("checkout-total");

const checkoutStatus =
    document.getElementById("checkout-status");


function openCheckout() {

    if (cart.length === 0) {
        return;
    }

    bagView.classList.add("hidden");
    checkoutView.classList.remove("hidden");

    renderCheckout();
}


function closeCheckout() {

    checkoutView.classList.add("hidden");
    bagView.classList.remove("hidden");

    checkoutStatus.textContent = "";

}


function renderCheckout() {

    checkoutSummary.innerHTML = "";

    const groupedItems = {};

    cart.forEach((item) => {

        if (!groupedItems[item.name]) {

            groupedItems[item.name] = {
                name: item.name,
                price: item.price,
                quantity: 0
            };

        }

        groupedItems[item.name].quantity++;
    });


    Object.values(groupedItems).forEach((item) => {

        const itemTotal =
            item.price * item.quantity;

        const summaryItem =
            document.createElement("div");

        summaryItem.className =
            "checkout-summary-item";

        summaryItem.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <span>QTY ${item.quantity}</span>
            </div>

            <span>
                ₦${itemTotal.toLocaleString()}
            </span>
        `;

        checkoutSummary.appendChild(summaryItem);

    });


    const total =
        cart.reduce(
            (sum, item) => sum + item.price,
            0
        );

    checkoutTotal.textContent =
        `₦${(total + DELIVERY_FEE).toLocaleString()}`;
}


checkoutButton.addEventListener(
    "click",
    openCheckout
);


backToBag.addEventListener(
    "click",
    closeCheckout
);


checkoutForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        if (cart.length === 0) {
            checkoutStatus.textContent =
                "Your bag is empty.";

            checkoutStatus.className =
                "checkout-status error";

            return;
        }


        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();


        if (userError || !user) {

            checkoutStatus.textContent =
                "Please sign in before placing your order.";

            checkoutStatus.className =
                "checkout-status error";

            return;
        }


        const customerName =
            document
                .getElementById("checkout-name")
                .value
                .trim();

        const email =
            document
                .getElementById("checkout-email")
                .value
                .trim();

        const phone =
            document
                .getElementById("checkout-phone")
                .value
                .trim();

        const address =
            document
                .getElementById("checkout-address")
                .value
                .trim();

        const city =
            document
                .getElementById("checkout-city")
                .value
                .trim();

        const state =
            document
                .getElementById("checkout-state")
                .value
                .trim();


        const total =
            cart.reduce(
                (sum, item) => sum + item.price,
                0
            );


        const items =
            cart.map((item) => ({
                name: item.name,
                price: item.price
            }));


        checkoutStatus.textContent =
            "Creating your order...";

        checkoutStatus.className =
            "checkout-status";


        /* =========================
           CREATE ORDER
        ========================= */

        const {
            data: order,
            error: orderError
        } =
            await supabaseClient
                .from("orders")
                .insert([
                    {
                        user_id: user.id,
                        customer_name: customerName,
                        email: email,
                        phone: phone,
                        address: address,
                        delivery_address: address,
                        city: city,
                        state: state,
                        items: items,
                        subtotal: total,
                        delivery_fee: DELIVERY_FEE,
                        total: total + DELIVERY_FEE,
                        delivery_method: DELIVERY_METHOD,
                        logistics_status: "Processing",
                        payment_status: "unpaid",
                        status: "pending"
                    }
                ])
                .select("id")
                .single();


        if (orderError) {

            console.error(
                "Order creation error:",
                orderError
            );

            checkoutStatus.textContent =
                "We couldn't create your order.";

            checkoutStatus.className =
                "checkout-status error";

            return;
        }


        /* =========================
           INITIALIZE PAYSTACK
        ========================= */

        checkoutStatus.textContent =
            "Connecting to secure payment...";


        const functionUrl =
            `${SUPABASE_URL}/functions/v1/initialize-payment`;


        const paymentResponse =
            await fetch(
                functionUrl,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        apikey:
                            SUPABASE_PUBLISHABLE_KEY,

                        Authorization:
                            `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
                    },

                    body: JSON.stringify({
                        email: email,
                        amount: total + DELIVERY_FEE,
                        orderId: order.id
                    })
                }
            );


        const paymentData =
            await paymentResponse.json();


        if (
            !paymentResponse.ok ||
            !paymentData.authorization_url
        ) {

            console.error(
                "Payment initialization error:",
                paymentData
            );

            checkoutStatus.textContent =
                paymentData.error ||
                "We couldn't start the payment.";

            checkoutStatus.className =
                "checkout-status error";

            return;
        }


        /* =========================
           SEND CUSTOMER TO PAYSTACK
        ========================= */

        window.location.href =
            paymentData.authorization_url;

    }
);


/* =========================
   ORDER CONFIRMATION
========================= */

async function showOrderConfirmation() {

    const params =
        new URLSearchParams(window.location.search);

    const reference =
        params.get("reference") ||
        params.get("trxref");

    if (!reference) return;


    const confirmation =
        document.createElement("div");

    confirmation.id =
        "order-confirmation";

    confirmation.innerHTML = `
        <div class="order-confirmation-backdrop"></div>

        <div class="order-confirmation-panel">

            <button
                type="button"
                class="order-confirmation-close"
                aria-label="Close"
            >
                ×
            </button>

            <div class="order-confirmation-mark">
                ✓
            </div>

            <p class="order-confirmation-eyebrow">
                BEYOND LIMITS
            </p>

            <h2>
                ORDER<br>CONFIRMED
            </h2>

            <p class="order-confirmation-message">
                Your payment has been received and your order is confirmed.
            </p>

            <div class="order-confirmation-details">

                <p class="order-confirmation-loading">
                    Confirming your order...
                </p>

            </div>

            <button
                type="button"
                class="order-confirmation-continue"
            >
                CONTINUE SHOPPING
            </button>

        </div>
    `;


    const style =
        document.createElement("style");


    style.textContent = `

        #order-confirmation {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }

        .order-confirmation-backdrop {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,.82);
            backdrop-filter: blur(10px);
        }

        .order-confirmation-panel {
            position: relative;
            z-index: 2;
            width: min(620px, 100%);
            max-height: 90vh;
            overflow-y: auto;
            padding: 48px;
            background: #111114;
            border: 1px solid rgba(255,255,255,.12);
            color: #f5f3ef;
            box-shadow: 0 30px 100px rgba(0,0,0,.5);
        }

        .order-confirmation-close {
            position: absolute;
            top: 18px;
            right: 20px;
            border: 0;
            background: transparent;
            color: #f5f3ef;
            font-size: 28px;
            cursor: pointer;
        }

        .order-confirmation-mark {
            width: 52px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 28px;
            border: 1px solid #c9aa72;
            color: #c9aa72;
            font-size: 24px;
        }

        .order-confirmation-eyebrow {
            margin: 0 0 12px;
            color: #c9aa72;
            font-size: 11px;
            letter-spacing: .2em;
        }

        .order-confirmation-panel h2 {
            margin: 0 0 22px;
            font-size: clamp(38px, 7vw, 68px);
            line-height: .9;
            letter-spacing: -.04em;
        }

        .order-confirmation-message {
            margin: 0 0 30px;
            color: #8b898f;
            line-height: 1.6;
        }

        .order-confirmation-details {
            padding: 20px 0;
            border-top: 1px solid rgba(255,255,255,.12);
            border-bottom: 1px solid rgba(255,255,255,.12);
        }

        .order-confirmation-section {
            padding: 18px 0;
            border-bottom: 1px solid rgba(255,255,255,.07);
        }

        .order-confirmation-section:last-child {
            border-bottom: 0;
        }

        .order-confirmation-section-title {
            margin: 0 0 12px;
            color: #c9aa72;
            font-size: 10px;
            letter-spacing: .18em;
        }

        .order-confirmation-row {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            padding: 9px 0;
            font-size: 14px;
        }

        .order-confirmation-row span:first-child {
            color: #8b898f;
        }

        .order-confirmation-item {
            padding: 12px 0;
            border-bottom: 1px solid rgba(255,255,255,.07);
        }

        .order-confirmation-item-name {
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
        }

        .order-confirmation-item-price {
            color: #8b898f;
            font-size: 13px;
        }

        .order-confirmation-total {
            margin-top: 8px;
            padding-top: 15px;
            font-size: 18px;
        }

        .order-confirmation-reference {
            max-width: 60%;
            color: #8b898f;
            font-size: 12px;
            word-break: break-all;
            text-align: right;
        }

        .order-confirmation-continue {
            width: 100%;
            margin-top: 28px;
            padding: 16px 20px;
            border: 1px solid #c9aa72;
            background: #c9aa72;
            color: #09090b;
            font-weight: 700;
            letter-spacing: .08em;
            cursor: pointer;
        }

        .order-confirmation-error {
            color: #c9aa72;
            line-height: 1.6;
        }

        @media (max-width: 600px) {

            .order-confirmation-panel {
                padding: 34px 24px;
            }

            .order-confirmation-row {
                flex-direction: column;
                gap: 4px;
            }

            .order-confirmation-reference {
                max-width: 100%;
                text-align: left;
            }

        }

    `;


    document.head.appendChild(style);
    document.body.appendChild(confirmation);


    const details =
        confirmation.querySelector(
            ".order-confirmation-details"
        );


    const close =
        () => confirmation.remove();


    confirmation
        .querySelector(
            ".order-confirmation-close"
        )
        .addEventListener(
            "click",
            close
        );


    confirmation
        .querySelector(
            ".order-confirmation-backdrop"
        )
        .addEventListener(
            "click",
            close
        );


    confirmation
        .querySelector(
            ".order-confirmation-continue"
        )
        .addEventListener(
            "click",
            () => {

                close();

                history.replaceState(
                    {},
                    document.title,
                    window.location.pathname
                );

            }
        );


    for (
        let attempt = 0;
        attempt < 12;
        attempt++
    ) {

        try {

            const {
                data: { user }
            } =
                await supabaseClient.auth.getUser();


            if (!user) {

                details.innerHTML = `

                    <p class="order-confirmation-error">

                        Your payment was completed.
                        Please sign in to view
                        the order details.

                    </p>

                `;

                return;
            }


            const {
                data: orders,
                error
            } =
                await supabaseClient
                    .from("orders")
                    .select("*")
                    .eq("user_id", user.id)
                    .eq(
                        "payment_reference",
                        reference
                    )
                    .eq(
                        "status",
                        "paid"
                    )
                    .limit(1);


            if (error) {

                console.error(
                    "Order confirmation lookup error:",
                    error
                );

            }


            if (
                !error &&
                orders &&
                orders.length > 0
            ) {

                const order =
                    orders[0];


                let items =
                    order.items;


                if (
                    typeof items === "string"
                ) {

                    try {

                        items =
                            JSON.parse(items);

                    } catch {

                        items = [];

                    }

                }


                if (!Array.isArray(items)) {

                    items = [];

                }


                const itemsHTML =
                    items.map((item) => `

                        <div
                            class="order-confirmation-item"
                        >

                            <span
                                class="order-confirmation-item-name"
                            >
                                ${item.name.trim()}
                            </span>

                            <span
                                class="order-confirmation-item-price"
                            >
                                ₦${Number(
                                    item.price
                                ).toLocaleString()}
                            </span>

                        </div>

                    `).join("");


                details.innerHTML = `

                    <div
                        class="order-confirmation-section"
                    >

                        <p
                            class="order-confirmation-section-title"
                        >
                            ORDER
                        </p>

                        ${itemsHTML}


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                SUBTOTAL
                            </span>

                            <strong>
                                ₦${Number(
                                    order.subtotal ??
                                    order.total
                                ).toLocaleString()}
                            </strong>

                        </div>


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                DELIVERY
                            </span>

                            <strong>
                                ₦${Number(
                                    order.delivery_fee || 0
                                ).toLocaleString()}
                            </strong>

                        </div>


                        <div
                            class="order-confirmation-row
                            order-confirmation-total"
                        >

                            <span>
                                TOTAL
                            </span>

                            <strong>
                                ₦${Number(
                                    order.total
                                ).toLocaleString()}
                            </strong>

                        </div>

                    </div>


                    <div
                        class="order-confirmation-section"
                    >

                        <p
                            class="order-confirmation-section-title"
                        >
                            DELIVERY DETAILS
                        </p>


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                NAME
                            </span>

                            <strong>
                                ${order.customer_name || "—"}
                            </strong>

                        </div>


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                PHONE
                            </span>

                            <strong>
                                ${order.phone || "—"}
                            </strong>

                        </div>


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                EMAIL
                            </span>

                            <strong>
                                ${order.email || "—"}
                            </strong>

                        </div>


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                ADDRESS
                            </span>

                            <strong>
                                ${
                                    order.delivery_address ||
                                    order.address ||
                                    "—"
                                }
                            </strong>

                        </div>


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                CITY / STATE
                            </span>

                            <strong>
                                ${
                                    order.city || "—"
                                },
                                ${
                                    order.state || "—"
                                }
                            </strong>

                        </div>


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                DELIVERY METHOD
                            </span>

                            <strong>
                                ${
                                    order.delivery_method ||
                                    DELIVERY_METHOD
                                }
                            </strong>

                        </div>

                    </div>


                    <div
                        class="order-confirmation-section"
                    >

                        <p
                            class="order-confirmation-section-title"
                        >
                            STATUS
                        </p>


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                PAYMENT
                            </span>

                            <strong>
                                PAID ✓
                            </strong>

                        </div>


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                LOGISTICS
                            </span>

                            <strong>
                                ${
                                    order.logistics_status ||
                                    "Processing"
                                }
                            </strong>

                        </div>


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                ORDER
                            </span>

                            <strong>
                                CONFIRMED
                            </strong>

                        </div>


                        <div
                            class="order-confirmation-row"
                        >

                            <span>
                                REFERENCE
                            </span>

                            <span
                                class="order-confirmation-reference"
                            >
                                ${
                                    order.payment_reference ||
                                    reference
                                }
                            </span>

                        </div>

                    </div>

                `;


                cart = [];

                updateCart();


                history.replaceState(
                    {},
                    document.title,
                    window.location.pathname
                );


                return;
            }

        } catch (error) {

            console.error(
                "Order confirmation lookup error:",
                error
            );

        }


        await new Promise(
            (resolve) =>
                setTimeout(
                    resolve,
                    1500
                )
        );

    }


    details.innerHTML = `

        <p class="order-confirmation-error">

            Your payment was received.
            We're still confirming your order.
            Your order is safely recorded
            in the system.

        </p>


        <div
            class="order-confirmation-row"
        >

            <span>
                REFERENCE
            </span>

            <span
                class="order-confirmation-reference"
            >
                ${reference}
            </span>

        </div>

    `;

}


showOrderConfirmation();