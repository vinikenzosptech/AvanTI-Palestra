var database = require("../database/config");

function listarPorQuiz(idQuiz) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorQuiz()");
    var instrucaoSql = `
        SELECT 
            id,
            numero,
            pergunta,
            alternativa_correta,
            alternativa_a,
            alternativa_b,
            alternativa_c,
            alternativa_d,
            dificuldade
        FROM questao
        WHERE fk_quiz = ${idQuiz};    
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPorQuiz
}
