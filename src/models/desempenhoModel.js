var database = require("../database/config");

function cadastrar(qtd_acertos, classificacao, fkQuiz, fkUsuario) {
    var instrucao = `
        INSERT INTO desempenho (qtd_acertos, classificacao, fk_quiz, fk_usuario) VALUES ('${qtd_acertos}', '${classificacao}', '${fkQuiz}', ${fkUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarRespostas(fkDesempenho, respostas){
    var dados = respostas.map(function(r) {
        return `('${r.alternativaSelecionada}',${r.fkQuestao},${fkDesempenho})`;
    });

    var instrucao = `INSERT INTO resposta (alternativa_selecionada, fk_questao, fk_desempenho) VALUES ${dados.join(", ")};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function obterClassificacao(){
    var instrucaoSql = `
        SELECT
        u.id,
        u.nome,
        ROUND(AVG(d.qtd_acertos), 2) AS media_acertos
        FROM usuario u
        JOIN desempenho d
        ON d.fk_usuario = u.id
        GROUP BY u.id, u.nome
        ORDER BY media_acertos DESC;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar,
    cadastrarRespostas,
    obterClassificacao
};