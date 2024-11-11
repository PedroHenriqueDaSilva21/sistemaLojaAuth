//Importando o express
import express from "express";
//Escolhendo a variavel para ser o router
const router = express.Router();
//Importando models de pedidos
import PedidoMDC from "../models/Pedido.js";
import Auth from "../middleware/Auth.js"

// ROTA PEDIDOS
router.get("/pedidos", Auth,(req, res) => {
  PedidoMDC.findAll()
    .then((pedido) => {
      res.render("pedidos", {
        pedido: pedido,
      });
    })
    .catch((error) => {
      console.log(error);
    });

  router.post("/pedidos/new", Auth,(req, res) => {
    const nump = req.body.nump;
    const valor = req.body.valor;
    PedidoMDC.create({
      nump: nump,
      valor: valor,
    })
      .then(() => {
        res.redirect("/pedidos");
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

router.get("/pedidos/delete/:id", Auth,(req, res) => {
  const id = req.params.id;
  PedidoMDC.destroy({
    where: { id: id },
  })
    .then(() => {
      res.redirect("/pedidos");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/pedidos/edit/:id", Auth,(req, res) => {
  const id = req.params.id;
  PedidoMDC.findByPk(id)
    .then((pedido) => {
      res.render("pedidoEdit", {
        pedido: pedido,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/pedidos/update", Auth,(req, res) => {
  const id = req.body.id;
  const nump = req.body.nump;
  const valor = req.body.valor;
  PedidoMDC.update(
    {
      nump: nump,
      valor: valor,
    },
    { where: { id: id } }
  )
    .then(() => {
      res.redirect("/pedidos");
    })
    .catch((error) => {
      console.log(error);
    });
});
export default router;