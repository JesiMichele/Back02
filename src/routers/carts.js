import { Router } from "express";
import { getCartById, createCart, addProductCart, deleteProductsInCart, deleteAllProductsInCart, updateCart,updateProductQuantityInCart } from "../public/js/cartsManager.js";

const router = Router();


router.get("/:cid", getCartById);

router.post("/", createCart);

router.post("/:cid/product/:pid", addProductCart);

router.delete("/:cid/products/:pid",deleteProductsInCart);

router.delete("/:cid",deleteAllProductsInCart);

router.put("/:cid",updateCart);

router.put("/:cid/products/:pid",updateProductQuantityInCart);










export default router;