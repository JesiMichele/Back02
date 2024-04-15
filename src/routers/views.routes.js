import express from 'express'
import ProductManager from '../ProductManager.js';

const router= express.Router();

router.get('/', (req,res)=>{
    const p= new ProductManager();
    const productos= p.getProduct();
    return res.render('home',{productos})
})

router.get('/realtimeproducts', (req,res)=>{
  
    return res.render('RealTimeProducts')
})


export default router;