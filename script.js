async function fetchProducts() {
    const response = await fetch("https://api.github.com/repos/mwu0226/special-offer/issues");
    const issues = await response.json();

    const products = issues.map(issue => ({
        title: issue.title,
        body: issue.body,
        images: extractImages(issue.body),
        category: extractCategory(issue.body)
    }));

    displayProducts(products);
}

function extractImages(text) {
    const matches = [...text.matchAll(/!\[.*?\]\((.*?)\)/g)];
    return matches
        .map(match => match[1]) 
        .filter(url => !url.includes("github.com/user-attachments/assets")); 
}

function extractCategory(text) {
    const match = text.match(/分类[:：]([\s\S]*?)$/m);
    return match ? match[1].trim() : "未分类";
}

function displayProducts(products) {
    const container = document.getElementById("product-list");
    container.innerHTML = ""; 

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        const title = document.createElement("h3");
        title.textContent = product.title;

        const category = document.createElement("p");
        category.textContent = `分类: ${product.category}`;

        productDiv.appendChild(title);
        productDiv.appendChild(category);

        product.images.forEach(imgUrl => {
            const img = document.createElement("img");
            img.src = imgUrl;
            productDiv.appendChild(img);
        });

        container.appendChild(productDiv);
    });
}

fetchProducts();
