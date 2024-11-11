// Importando o express
import express from "express";
// Escolhendo a variavel para ser o router
const router = express.Router();
// Importando models de pedidos
import ProdutoMDC from "../models/Produto.js";
import Auth from "../middleware/Auth.js";

// ROTA PRODUTOS
router.get("/produtos", Auth,(req, res) => {
  ProdutoMDC.findAll().then((produto) => {
    res.render("produtos", {
       produto: produto,
      });
    }).catch((error) => {
      console.log(error);
  });  
});

// ROTA DE CADASTRO DE PRODUTOS
router.post("/produtos/new", Auth,(req,res) => {
  const img = req.body.img;
  const nomep = req.body.nomep;
  const pre = req.body.pre;
  const cat = req.body.cat;
  ProdutoMDC.create({
    img: img,
    nomep: nomep,
    pre: pre,
    cat: cat
  }).then(() => {
    res.redirect("/produtos");
  }).catch((error) => {
    console.log(error);
  });
});

// ROTA DE EXCLUSÃO DE PRODUTOS
router.get("/produtos/delete/:id", Auth,(req,res) => {
  const id = req.params.id;
  ProdutoMDC.destroy({
    where: {id: id}
  }).then(() => {
    res.redirect("/produtos");
  }).catch((error) => {
    console.log(error)
  });
});

router.get("/produtos/edit/:id", Auth,(req,res) => {
  const id = req.params.id;
  ProdutoMDC.findByPk(id).then((produto) => {
    res.render("produtoEdit", {
      produto: produto
    })
  }).catch((error) => {
    console.log(error);
  });
});

router.post("/produtos/update", Auth,(req,res) => {
  const id = req.body.id;
  const img = req.body.img;
  const nomep = req.body.nomep;
  const pre = req.body.pre;
  const cat = req.body.cat;
  ProdutoMDC.update(
    {
    img: img,
    nomep: nomep,
    pre: pre,
    cat: cat
  },
  {where: {id: id}}
).then(() => {
  res.redirect("/produtos");
}).catch((error) => {
  console.log(error);
})
})
export default router