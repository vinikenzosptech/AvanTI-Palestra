var desempenhoModel = require("../models/desempenhoModel");

function cadastrar(req, res) {
    var nome = req.body.nome;
    var qtdAcertos = req.body.pontuacaoFinal;
    var classificacao = req.body.classificacao;
    var fkQuiz = req.body.ID_QUIZ;
    var fkUsuario = req.body.ID_USUARIO;
    var respostas = respostasDoUsuario;


    if (qtdAcertos == undefined) {
        res.status(400).send("A quantidade de acertos está undefined!");
    } else if(classificacao == undefined){
        res.status(400).send("A classificacao está undefinded!");
    } else if(fkQuiz == undefined){
        res.status(400).send("A fkQuiz está undefined!");
    } else if(fkUsuario == undefined){
        res.status(400).send("A fkUsuario está undefined!");
    } else if(respostas == undefined){
        res.status(400).send("As respostas estão undefined!");
    } else{
        desempenhoModel.cadastrar(qtdAcertos, classificacao, fkQuiz, fkUsuario, respostas)
        .then(
            function(resultado) {
                res.json(resultado);
    }).catch(
        function(erro){
            console.log(erro);
            console.log("Houve um erro ao realizar o cadastro de desempenho! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
    })
    }

    
}

module.exports = {
    cadastrar
}