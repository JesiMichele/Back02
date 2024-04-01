import { Router } from "express";
import CartsManager from "../CartsManager.js";

const router = Router();


router.get("/:cid", (req, res) => {
    const { cid } = req.params;
    const cart = new CartsManager();
    const result = cart.getCartById(Number(cid))

    return res.json({ result });
});



router.post("/", (req, res) => {
    const { cid, pid } = req.params;
    const cart = new CartsManager();
    const result = cart.createCart();

    return res.json({ result });
});



router.post("/:cid/product/:pid", (req, res) => {
    const { cid, pid } = req.params;
    const cart = new CartsManager();
    const result = cart.addProductCart(Number(cid), Number(pid));




    return res.json({ result });
});










export default router;