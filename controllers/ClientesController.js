import express from "express";
const router = express.Router();
// Importando o model de Cliente
import ClienteMDC from "../models/Cliente.js";
import Auth from "../middleware/Auth.js"

// ROTA CLIENTES
router.get("/clientes", Auth,(req, res) => {
  ClienteMDC.findAll().then((clientes) => {
    res.render("clientes", {
      clientes: clientes,
    });
  }).catch((error) => {
    console.log(error);
  })
});

// ROTA DE CADASTRO DE CLIENTES
router.post("/clientes/new", Auth,(req, res) => {
  // RECEBENDO OS DADOS DO FORMULÁRIO E GRAVANDO NAS VARIÁVEIS
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  ClienteMDC.create({
    nome: nome,
    cpf: cpf,
    endereco: endereco,
  })
    .then(() => {
      res.redirect("/clientes");
    })
    .catch((error) => {
      console.log(error);
    });
});
// ROTA DE EXCLUSÃO DE CLIENTES
// ESSA ROTA POSSUI UM PARÂMETRO ID
router.get("/clientes/delete/:id", Auth,(req, res) => {
  const id = req.params.id;
  ClienteMDC.destroy({ where: { id: id } })
    .then(() => {
      res.redirect("/clientes");
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE EDIÇÃO DE CLIENTE
router.get("/clientes/edit/:id", Auth,(req, res) => {
  const id = req.params.id;
  ClienteMDC.findByPk(id)
    .then((cliente) => {
      res.render("clienteEdit", {
        cliente: cliente,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// ROTA DE ALTERAÇÃO DE CLIENTE
router.post("/clientes/update", Auth,(req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const endereco = req.body.endereco;
  ClienteMDC.update(
    {
      nome: nome,
      cpf: cpf,
      endereco: endereco,
    },
    { where: { id: id } }
  )
    .then(() => {
      res.redirect("/clientes");
    })
    .catch((error) => {
      console.log(error);
    });
});
export default router;
