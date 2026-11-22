var desempenhoModel = require("../models/desempenhoModel");

function cadastrar(req, res) {
    var qtdAcertos = req.body.qtdAcertos;
    var classificacao = req.body.classificacao;
    var fkQuiz = req.body.fkQuiz;
    var fkUsuario = req.body.fkUsuario;
    var respostas = req.body.respostas;

 


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
        desempenhoModel.cadastrar(qtdAcertos, classificacao, fkQuiz, fkUsuario)
        .then(
            function(resultado) {
                var idDesempenho = resultado.insertId;
                return desempenhoModel.cadastrarRespostas(idDesempenho, respostas);
    }).then(
        function(resultado){
            res.json(resultado);
            
        }).catch(
        function(erro){
            console.log(erro);
            console.log("Houve um erro ao realizar o cadastro de desempenho! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
    })
    }

    
}

function obterClassificacao(req, res){

    desempenhoModel.obterClassificacao().then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os dados de desempenho para kpi.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });


}

function obterQuizzes(req, res){
    var fkUsuario = req.params.idUsuario;

    desempenhoModel.obterQuizzes(fkUsuario).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        } else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os quizzes do usuário.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterAproveitamento(req, res){
    var fkUsuario = req.params.idUsuario;

    desempenhoModel.obterAproveitamento(fkUsuario).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        } else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os quizzes do usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function obterDadosGrafico(req, res){
    var fkUsuario = req.params.idUsuario;

    desempenhoModel.obterDadosGrafico(fkUsuario).then(function(resultado){
        if(resultado.length > 0){
            res.status(200).json(resultado);
        } else{
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function(erro){
        console.log(erro);
        console.log("Houve um erro ao buscar os quizzes do usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    cadastrar,
    obterClassificacao,
    obterQuizzes,
    obterAproveitamento,
    obterDadosGrafico
}