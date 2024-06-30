import Router from 'express';

import userController from '../controller/userController.js';


const um = new userController();


const router = Router();

router.get("/premium/:uid",async (req, res) => {
    try{
        await um.changeRole(req.params.uid);
        res.status(200).send("Role changed to premium")
    }catch(err){
        console.error(err)
        res.status(400).send({error: "Error al cambiar el rol"})
    }
    
    
});

export default router;