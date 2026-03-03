let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

function showSection(id) {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("products").style.display = "none";
    document.getElementById(id).style.display = "block";

    updateDashboard();
    renderProducts();
}

// SAVE PRODUCT
function saveProduct() {
    let name = document.getElementById("name").value.trim();
    let price = Number(document.getElementById("price").value);
    let stock = Number(document.getElementById("stock").value);

    // Proper validation
    if (name === "" || isNaN(price) || isNaN(stock)) {
        alert("Fill all fields correctly");
        return;
    }

    if (editIndex === null) {
        products.push({ name, price, stock });
    } else {
        products[editIndex] = { name, price, stock };
        editIndex = null;
    }

    localStorage.setItem("products", JSON.stringify(products));

    // Clear inputs
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";

    renderProducts();
    updateDashboard();
}

// RENDER TABLE
function renderProducts() {
    let table = document.getElementById("productTable");
    table.innerHTML = "";

    products.forEach((p, i) => {
        table.innerHTML += `
            <tr>
                <td>${p.name}</td>
                <td>$${p.price}</td>
                <td>${p.stock}</td>
                <td>
                    <button onclick="editProduct(${i})">Edit</button>
                    <button onclick="deleteProduct(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// EDIT
function editProduct(i) {
    document.getElementById("name").value = products[i].name;
    document.getElementById("price").value = products[i].price;
    document.getElementById("stock").value = products[i].stock;
    editIndex = i;
}

// DELETE
function deleteProduct(i) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
    updateDashboard();
}

// DASHBOARD
function updateDashboard() {
    document.getElementById("totalProducts").innerText = products.length;

    let totalValue = products.reduce((sum, p) => {
        return sum + (p.price * p.stock);
    }, 0);

    document.getElementById("totalValue").innerText = `$${totalValue}`;

    let grid = document.getElementById("dashboardProducts");
    grid.innerHTML = "";

    products.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <h4>${p.name}</h4>
                <p>Price: $${p.price}</p>
                <p>Stock: ${p.stock}</p>
            </div>
        `;
    });
}

// Initialize on page load
updateDashboard();
renderProducts();