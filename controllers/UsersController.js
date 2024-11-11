import express from "express"
const router = express.Router()
// Importando o model de User
import User from "../models/User.js"
// Importando o Middleware Auth
import bcrypt from "bcrypt"
// ROTA DE LOGIN
router.get("/login", (req,res) => {
    res.render("login", {
        loggedOut:true,
        messages: req.flash()
    });
});

router.get("/logout", (req,res) => {
    req.flash('success',"Usuário fez logout com sucesso!")
    req.session.user = undefined;
    res.redirect("/");
});

// ROTA DE CADASTRO
router.get("/cadastro", (req,res) => {
    res.render("cadastro", {
        loggedOut: true,
        messages: req.flash()
    });
});

// ROTA DE CRIAÇÃO DE USUÁRIO
router.post("/createUser", (req,res) => {
   const email = req.body.email;
   const password = req.body.password;
   // VERIFICAR SE O USUÁRIO JÁ ESTÁ CADASTRADO 
   User.findOne({where: {email: email}}).then((user) => {
    if(user == undefined){
        // AQUI É FEITO O CADASTRO E O HASH DE SENHA
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
      User.create({
        email: email,
        password: hash,
      }).then(() => {
        res.redirect("/login");
      }).catch((error) => {
        console.log(error)
      })
      // CASO O USUÁRIO JÁ ESTEJA CADASTRADO:
    } else {
        req.flash('danger',"O usuário já está cadastrado! Faça o login.")
               res.redirect("/cadastro")
    }
   }).catch((error) => {
    console.log(error)
   });
});

// ROTA DE AUTENTICAÇÃO
router.post("/authenticate", (req,res) => {
    const email = req.body.email
    const password = req.body.password
    // BUSCA O USUÁRIO NO BANCO
    User.findOne({
        where:{
            email: email
        }
    }).then((user => {
      // SE O USUÁRIO TIVER CADASTRADO:
      if(user != undefined){
        // VALIDA A SENHA (VERIFICA O HASH)
        const correct = bcrypt.compareSync(password, user.password)
        if(correct){
            //AUTORIZA O LOGIN
            req.session.user = {
                id: user.id,
                email: user.email
            }
            req.flash('success',"Login efetuado com sucesso!")
            res.redirect("/");
        } else {
            req.flash('danger',"Senha informada está incorreta! Tente novamente.")
            res.redirect("/login")
        }
      } else{
        // SE O USUÁRIO NÃO EXISTE
        req.flash('danger',"Usuário informado não existe! Verifique os dados digitados.")
        res.redirect("/login")
      }
    })).catch((error) => {
        console.log(error);
    });
});

export default router;