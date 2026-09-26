import express from "express";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 2500000
    },
    {
        id: 2,
        name: "Mouse",
        price: 80000
    },
    {
        id: 3,
        name: "Keyboard",
        price: 150000
    }
];
app.get("/", (req, res) => {
    res.json({
        message: "Backend API funcionando"
    });
});
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "backend-api"
    });
});
app.get("/api/products", (req, res) => {
    res.json(products);
});
app.get("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);
    const product = products.find((product) => product.id === id);
    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }
    res.json(product);
});
app.listen(PORT, () => {
    console.log(`Backend API running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map