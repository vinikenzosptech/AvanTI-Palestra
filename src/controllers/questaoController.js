var questaoModel = require("../models/questaoModel");

function listarPorQuiz(req, res) {
    var idQuiz = req.params.idQuiz;

    questaoModel.listarPorQuiz(idQuiz)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar as questões: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarPorQuiz
}