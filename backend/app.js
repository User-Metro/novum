const express = require("express");
const router = express();
const http = require('http');
const cors = require('cors');

// const https = require('https');
// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
// const jwt = require('jsonwebtoken');
// const fs = require('fs');
// const fakeLocal = require('./fakeLocal.json');

// var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');

// const JWTStrategy = require('passport-jwt').Strategy;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require('dotenv').config();

router.use(express.static('public'));
router.use(express.urlencoded({ extended:false }));
router.use(express.json());
router.use(cors());


router.get('/', async (req,res,next) => {
  const listaTipos = await prisma.typesusers.findMany({
    select: {
      typeuser_id: true,
      typeuser: true
    },
  });

  res.json({listaTipos});
});

router.post('/crearUsuario', async (req,res, next) => {
  //let fecha = new Date().toISOString();
  const nuevoUsuario = await prisma.users.create({
    data:{
      email: req.body.hdEmail,
      password: req.body.hdContrasenia,
      typeuser_id : 2,
      activo: 1
    }
  });

  res.json({"usuario_id":nuevoUsuario.user_id});
});

router.post('/crearCliente', async (req,res, next) => {
  let fecha = new Date().toISOString();
  const nuevoCliente = await prisma.clientes.create({
    data:{
      nombre: req.body.hdNombre,
      apellido: req.body.hdApellido,
      puesto: req.body.hdPuesto,
      celular: req.body.hdCelular,
      empresa: req.body.hdEmpresa,
      dedica_empresa: req.body.hdDedica,
      num_empleados: parseInt(req.body.hdNumEmpleados),
      fecha:fecha,
      user_id: req.body.hdUser_id,
      activo: 1
    }
  });

  res.json({"cliente_id":nuevoCliente.cliente_id});
});

router.post('/altaCajaBanco', async (req,res, next) => {
  //let fecha = new Date().toISOString();
  const nuevoCajaBanco = await prisma.cajas_bancos.create({
    data:{
      nombre_cuenta: req.body.txtNombre,
      tipo_pago_id : parseInt(req.body.stTipo),
      cantidad_actual:  parseInt(req.body.txtCantidadActual),
      user_id:  parseInt(req.body.user_id),
      activo: 1
    }
  });

  res.json({"cajas_bancos_id":nuevoCajaBanco.cajas_bancos_id});
});

router.post('/editarCajaBanco', async (req,res,next) => {
  const id = parseInt(req.body.caja_banco_id);
  //console.log("->"+id);

  const actualizarCajaBanco = await prisma.cajas_bancos.update({
    where: {
      cajas_bancos_id : parseInt(id),
    },
    data: {
      nombre_cuenta: req.body.txtNombre,
      tipo_pago_id : parseInt(req.body.stTipo),
      cantidad_actual:  parseInt(req.body.txtCantidadActual),
    }
  });
  res.json({"status":"exito"});
});

router.post('/altaIngresoFuturo', async (req,res, next) => {
  let fecha = new Date(req.body.txtFechaTentativaCobro+' 00:00:00').toISOString();
  let fechaCreacion = new Date().toISOString();
  const nuevoIngresoFuturo = await prisma.ingresos_futuros.create({
    data:{
      nombre_persona_empresa: req.body.txtNombre,
      concepto: req.body.txtConcepto,
      tipo_pago_id: parseInt(req.body.stTipo),
      categoria_id: parseInt(req.body.stCategoria),
      monto: parseInt(req.body.txtMonto),
      fecha_tentativa_cobro: fecha,
      user_id: parseInt(req.body.user_id),
      fecha_creacion: fechaCreacion,
      activo: true
    }
  });

  res.json({"ingresos_futuros_id":nuevoIngresoFuturo.ingresos_futuros_id});
});

router.post('/altaEgresoFuturo', async (req,res, next) => {
  let fecha = new Date(req.body.txtFechaTentativaPago+' 00:00:00').toISOString();
  let fechaCreacion = new Date().toISOString();
  const nuevoEgresoFuturo = await prisma.egresos_futuros.create({
    data:{
      nombre_persona_empresa: req.body.txtNombre,
      concepto: req.body.txtConcepto,
      tipo_pago_id: parseInt(req.body.stTipo),
      categoria_id: parseInt(req.body.stCategoria),
      monto: parseInt(req.body.txtMonto),
      fecha_tentativa_pago: fecha,
      user_id: parseInt(req.body.user_id),
      fecha_creacion: fechaCreacion,
      activo: true
    }
  });

  res.json({"egresos_futuros_id":nuevoEgresoFuturo.egresos_futuros_id});
});

router.post('/loguear', async (req,res, next) => {
  try{
    console.log(req.body.email+" "+req.body.password);
    let user = await findUser(req.body.email,req.body.password);
    console.log(user);
    res.json({"usuario_id":user});
  }catch(e) {
    res.json({"usuario_id":0});
  }
});

async function findUser(email,password) {
  const users = await prisma.users.findFirst({
    where: {
      email,
      password
    },
    select: {
      user_id:true
    }});

    if(users == null)
      return 0;

    return users.user_id;
}


router.post('/listCajasBancos', async (req,res,next) => {
  const id = req.body.user_id;//req.query.ordenPago;

  const listCajasBancos = await prisma.cajas_bancos.findMany({
    where: {
      user_id : parseInt(id)
    },
    select: {
      cajas_bancos_id: true,
      nombre_cuenta: true,
      tipo_pago_id:true,
      cantidad_actual: true,
      tipos_pagos: {
        select: {
          tipo_pago:true
        },
      },
    },
  });
  res.json({listCajasBancos});
});

router.post('/listCajasBancosB', async (req,res,next) => {
  const id = req.body.user_id;
  const nombre = req.body.busqueda;

  const listCajasBancos = await prisma.cajas_bancos.findMany({
    where: {
      user_id : parseInt(id),
      nombre_cuenta : {
        contains: nombre,
      },
    },
    select: {
      cajas_bancos_id: true,
      nombre_cuenta: true,
      tipo_pago_id:true,
      cantidad_actual: true,
      tipos_pagos: {
        select: {
          tipo_pago:true
        },
      },
    },
  });

  res.json({listCajasBancos});
});


router.post('/listIngresosFuturos', async (req,res,next) => {
  const id = req.body.user_id;

  const listIngresosFuturos = await prisma.ingresos_futuros.findMany({
    where: {
      user_id : parseInt(id)
    },
    select: {
      ingresos_futuros_id: true,
      nombre_persona_empresa: true,
      concepto: true,
      tipo_pago_id:true,
      categoria_id:true,
      monto: true,
      fecha_tentativa_cobro: true,
      fecha_creacion: true,
      fecha_cobro: true,
      tipos_pagos: {
        select: {
          tipo_pago:true
        },
      },
      categorias: {
        select: {
          categoria:true
        },
      },
    },
  });
  //console.log(listIngresosFuturos);
  res.json({listIngresosFuturos});
});

router.post('/listIngresosFuturosB', async (req,res,next) => {
  const id = req.body.user_id;
  const nombre = req.body.busqueda;

  const listIngresosFuturos = await prisma.ingresos_futuros.findMany({
    where: {
      user_id : parseInt(id),
      nombre_persona_empresa : {
        contains: nombre,
      },
    },
    select: {
      ingresos_futuros_id: true,
      nombre_persona_empresa: true,
      concepto: true,
      tipo_pago_id:true,
      categoria_id:true,
      monto: true,
      fecha_tentativa_cobro: true,
      fecha_creacion: true,
      fecha_cobro: true,
      tipos_pagos: {
        select: {
          tipo_pago:true
        },
      },
      categorias: {
        select: {
          categoria:true
        },
      },
    },
  });
  //console.log(listIngresosFuturos);
  res.json({listIngresosFuturos});
});






router.post('/listEgresosFuturos', async (req,res,next) => {
  const id = req.body.user_id;

  const listEgresosFuturos = await prisma.egresos_futuros.findMany({
    where: {
      user_id : parseInt(id)
    },
    select: {
      egresos_futuros_id: true,
      nombre_persona_empresa: true,
      concepto: true,
      tipo_pago_id:true,
      categoria_id:true,
      monto: true,
      fecha_tentativa_pago: true,
      fecha_creacion: true,
      fecha_pago: true,
      tipos_pagos: {
        select: {
          tipo_pago:true
        },
      },
      categorias: {
        select: {
          categoria:true
        },
      },
    },
  });
  console.log(listEgresosFuturos);
  res.json({listEgresosFuturos});
});

router.post('/listEgresosFuturosB', async (req,res,next) => {
  const id = req.body.user_id;
  const nombre = req.body.busqueda;

  const listEgresosFuturos = await prisma.egresos_futuros.findMany({
    where: {
      user_id : parseInt(id),
      nombre_persona_empresa : {
        contains: nombre,
      },
    },
    select: {
      egresos_futuros_id: true,
      nombre_persona_empresa: true,
      concepto: true,
      tipo_pago_id:true,
      categoria_id:true,
      monto: true,
      fecha_tentativa_pago: true,
      fecha_creacion: true,
      fecha_pago: true,
      tipos_pagos: {
        select: {
          tipo_pago:true
        },
      },
      categorias: {
        select: {
          categoria:true
        },
      },
    },
  });
  //console.log(listIngresosFuturos);
  res.json({listEgresosFuturos});
});


// Servidor HTTP
// const serverHttp = http.createServer(router);
// serverHttp.listen(process.env.HTTP_PORT, process.env.IP);
// serverHttp.on('listening', () => console.info(`Notes App running at http://${process.env.IP}:${process.env.HTTP_PORT}`));
router.listen(3001, () => {
  console.log("Aplicación ejecutandose ....");
});



// Servidor HTTP
// const httpsServer = https.createServer(options, router);
// httpsServer.listen(443, process.env.IP);

