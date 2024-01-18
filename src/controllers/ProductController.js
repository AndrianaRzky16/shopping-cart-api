import products from "../../product.js";

const getAllProducts = (req, res) => {
  res.json(products);
};

const getproduct = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(products));
};

const getproductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((b) => b.id === id);

  if (product) {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(product));
  } else {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Product not found" }));
  }
};

const addproduct = (req, res) => {
  const newproduct = req.body;

  if (newproduct) {
    newproduct.id = products.length + 1;
    products.push(newproduct);
    res.setHeader("Content-Type", "application/json");
    res.writeHead(201);
    res.end(
      JSON.stringify({
        success: true,
        message: "Product added successfully",
        data: newproduct,
      })
    );
  } else {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Failed to add product" }));
  }
};

const updateproduct = (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((b) => b.id === id);

  if (productIndex !== -1) {
    Object.assign(products[productIndex], req.body);
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(
      JSON.stringify({
        success: true,
        message: "Product updated successfully",
        data: products[productIndex],
      })
    );
  } else {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Product not found" }));
  }
};

const deleteproduct = (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex((b) => b.id === id);

  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(
      JSON.stringify({
        success: true,
        message: "Product deleted successfully",
        data: deletedProduct,
      })
    );
  } else {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Product not found" }));
  }
};

const updateProductQuantity = (productId, quantity) => {
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products[productIndex].quantity -= quantity;
  }
};

export {
  getAllProducts,
  getproduct,
  getproductById,
  addproduct,
  updateproduct,
  deleteproduct,
  updateProductQuantity,
};
