import { Router } from 'express';
import { generateUniqueString } from "../utils/generateId.js";
import CartManager from '../cartManager.js';

let cm = new CartManager();

let router = Router()

router.get("/:cart_id", async (req,res) => {
    try{
        let cart = await cm.getProductsFromCart(req.params.cart_id)
        if (cart instanceof Error) return res.status(400).send({error: cart.message})
        res.status(200).send(cart)
    }catch(err){
        res.status(400).send({error: "Error al obtener el carrito"})
    }
})

router.post("/",async (req,res) => {
    try{
        let cart_id = generateUniqueString(8)
        let result = await cm.addCart(cart_id)
        if (result instanceof Error) return res.status(400).send({error: result.message})
        res.status(200).send({message: "Carrito agregado correctamente"})
    }catch(err){
        res.status(400).send({error: "Error al agregar el carrito"})
    }
})

router.post("/:cid/product/:pid",async (req,res) => {
    try{
        let result = await cm.addProductToCart(req.params.cid,req.params.pid)
        if (result instanceof Error) return res.status(400).send({error: result.message})
        res.status(200).send({message: "Producto agregado al carrito correctamente"})
    }catch(err){
        res.status(400).send({error: "Error al agregar el producto al carrito"})
    }
})

export default router;