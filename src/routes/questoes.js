var express = require("express");
var router = express.Router();

var questaoController = require("../controllers/questaoController");

router.get("/listar/:idQuiz", function (req, res) {
    questaoController.listarPorQuiz(req, res);
});


module.exports = router;