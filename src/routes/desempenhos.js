var express = require("express");
var router = express.Router();

var desempenhoController = require("../controllers/desempenhoController");

router.post("/cadastrar", function (req, res) {
    desempenhoController.cadastrar(req, res);
});

router.get("/obterClassificacao", function(req, res){
    desempenhoController.obterClassificacao(req, res);
});

router.get("/obterTotalQuizzes/:idUsuario", function(req, res){
    desempenhoController.obterQuizzes(req, res);
});

router.get("/obterAproveitamento/:idUsuario", function(req, res){
    desempenhoController.obterAproveitamento(req, res);
});

router.get("/obterDadosGrafico/:idUsuario", function(req, res){
    desempenhoController.obterDadosGrafico(req, res);
})

router.get("/obterHistoricoQuiz/:idUsuario", function(req, res){
    desempenhoController.obterHistoricoQuiz(req, res);
})


module.exports = router;