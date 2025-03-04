import { Router } from "express";
import { title } from "process";

const router = Router()

router.get('/', (req, res) => res.render('index', {title:'Veterinaria'}))
router.get('/servicios', (req, res) => res.render('servicios', {title:'Servicios -> Veterinaria'}))
router.get('/productos', (req, res) => res.render('productos', {title: 'Productos'}))
router.get('/guarderia', (req, res) => res.render('guarderia',{title: 'Guarderia'}))
router.get('/promociones',(req,res) => res.render('promociones',{title:'Promociones'}))


export default router