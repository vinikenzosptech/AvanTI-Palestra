var database = require("../database/config");

function cadastrar(qtd_acertos, classificacao, fkQuiz, fkUsuario) {
    var instrucao = `
        INSERT INTO desempenho (qtd_acertos, classificacao, fk_quiz, fk_usuario) VALUES ('${qtd_acertos}', '${classificacao}', '${fkQuiz}', ${fkUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarRespostas(fkDesempenho, respostas){
    var dados = [];

    for(let i = 0; i <= respostas.length - 1; i++){
        dados.push(`('${respostas[i].alternativaSelecionada}',${respostas[i].fkQuestao},${fkDesempenho})`)
    }

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

function obterQuizzes(fkUsuario){
    var instrucaoSql = `
        SELECT 
        count(id) as total_quiz
        FROM desempenho
        WHERE fk_usuario = ${fkUsuario}
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function obterAproveitamento(fkUsuario){
    var instrucaoSql = `
        SELECT
        d.qtd_acertos,
        d.fk_quiz,
        d.id,
        count(r.id) as quantidade_questoes
        FROM desempenho d
        JOIN resposta r
        ON r.fk_desempenho = d.id
        WHERE d.fk_usuario = ${fkUsuario}
        GROUP BY d.fk_quiz, d.qtd_acertos, d.id;
        `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);    
}

function obterDadosGrafico(fkUsuario){
    var instrucaoSql = `
        SELECT qtd_acertos, DATE_FORMAT(dt_realizacao, '%d/%m/%Y %H:%i:%s') AS data_realizacao, fk_quiz, fk_usuario
        FROM desempenho
        WHERE fk_usuario = ${fkUsuario};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql); 
}

function obterHistoricoQuiz(fkUsuario){
    var instrucaoSql = `
        SELECT
        d.qtd_acertos,
        qz.titulo,
        count(r.id) as quantidade_questoes,
        DATE_FORMAT(dt_realizacao, '%d/%m/%Y %H:%i:%s') as data_realizacao,
        d.classificacao
        FROM desempenho d
        LEFT JOIN resposta r
        ON r.fk_desempenho = d.id
        JOIN quiz qz
        ON d.fk_quiz = qz.id
        WHERE d.fk_usuario = ${fkUsuario}
        GROUP BY qz.id, d.qtd_acertos, d.id
        ORDER BY data_realizacao desc
        ;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql); 
}


module.exports = {
    cadastrar,
    cadastrarRespostas,
    obterClassificacao,
    obterQuizzes,
    obterAproveitamento,
    obterDadosGrafico,
    obterHistoricoQuiz
};