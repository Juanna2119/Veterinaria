import { Router } from "express";
import { title } from "process";
import { conn } from "../conect.js";
import nodemailer  from "nodemailer";
import express from 'express';

const router = Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cubidesjohanna@gmail.com',
        pass: 'wnwn btag xwip zcqm'
    } 
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', (req, res) => res.render('index', {title:'Veterinaria'}))
router.get('/servicios', (req, res) => res.render('servicios', {title:'Servicios -> Veterinaria'}))
router.get('/productos', (req, res) => res.render('productos', {title: 'Productos'}))
router.get('/guarderia', (req, res) => res.render('guarderia',{title: 'Guarderia'}))
router.get('/promociones',(req,res) => res.render('promociones',{title:'Promociones'}))

router.post('/', (req, res) => {
    console.log(req.body);
    const { nombre, raza, edad, fecha, hora, dueno } = req.body;

    const query = 'INSERT INTO citas (nombre_mascota, raza_mascota, edad_mascota, fecha_cita, hora_cita, nombre_dueno) VALUES (?,?,?,?,?,?)'; 
    conn.query(query, [nombre, raza, edad, fecha, hora, dueno], (err, result) => {
        console.log(err, result);
        
        if (err){
            console.error('Error de registro', err);
            res.status(500).send('Error al registrar la cita');
        }
        else{
            console.log('Dato insertado', result);
            res.status(200).send('La cita fue creada');
            enviarNotificacion('cubidesjohanna@gmail.com', dueno, fecha, hora);
        }
    })
})



function enviarNotificacion(email, nombre, fecha, hora){
    const mailOptions = {
        from: 'cubidesjohanna@gmail.com',
        to: email,
        subject: 'Confirmacion de la cita para tu mascota',
        text: `Hola ${nombre}, \n \n \n La cita de tu mascota esta confirmada para el dia ${fecha} a las ${hora}.`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.log('error enviando el mail', err);
        }
        else{
            console.log('Mail enviado', info.response);
        }
    });
}

export default router