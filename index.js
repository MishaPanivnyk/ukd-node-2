const fs = require("fs");
const csv = require("csv-parser");

// Додавання продукту до списку
function addProduct(product) {
  fs.appendFileSync("products.csv", `${product.name},${product.price}\n`);
}

// Отримання даних про продукт за ID
function getProductById(id) {
  let product;
  fs.createReadStream("products.csv")
    .pipe(csv())
    .on("data", (row) => {
      if (row.id === id) {
        product = row;
      }
    })
    .on("end", () => {
      console.log(product);
    });
}

// Видалення продукту за ID
function deleteProductById(id) {
  let rows = [];
  fs.createReadStream("products.csv")
    .pipe(csv())
    .on("data", (row) => {
      if (row.id !== id) {
        rows.push(row);
      }
    })
    .on("end", () => {
      const csvWriter = createCsvWriter({
        path: "products.csv",
        header: [
          { id: "name", title: "Name" },
          { id: "price", title: "Price" },
        ],
      });
      csvWriter
        .writeRecords(rows)
        .then(() => console.log("Product deleted successfully"));
    });
}

// Зміна продукту за ID
function updateProductById(id, updatedProduct) {
  let rows = [];
  fs.createReadStream("products.csv")
    .pipe(csv())
    .on("data", (row) => {
      if (row.id === id) {
        rows.push(updatedProduct);
      } else {
        rows.push(row);
      }
    })
    .on("end", () => {
      const csvWriter = createCsvWriter({
        path: "products.csv",
        header: [
          { id: "name", title: "Name" },
          { id: "price", title: "Price" },
        ],
      });
      csvWriter
        .writeRecords(rows)
        .then(() => console.log("Product updated successfully"));
    });
}
