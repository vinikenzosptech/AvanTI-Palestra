var express = require("express");
var router = express.Router();

var desempenhoController = require("../controllers/desempenhoController");

router.post("/cadastrar", function (req, res) {
    desempenhoController.cadastrar(req, res);
});

router.get("/obterClassificacao", function(req, res){
    desempenhoController.obterClassificacao(req, res);
})


module.exports = router;