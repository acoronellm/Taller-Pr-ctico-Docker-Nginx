import express from "express";
import type { Request, Response } from "express";
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

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Backend API funcionando"
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "backend-api"
  });
});

app.get("/api/products", (req: Request, res: Response) => {
  res.json(products);
});

app.get("/api/products/:id", (req: Request, res: Response) => {
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