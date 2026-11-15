var database = require("../database/config");

function cadastrar(qtdAcertos, classificacao, fkQuiz, fkUsuario, respostas) {
    var instrucaoDesempenho = `
        INSERT INTO desempenho (qtd_acertos, classificacao, dt_realizacao, fk_quiz, fk_usuario)
        VALUES (${qtdAcertos}, '${classificacao}', NOW(), ${fkQuiz}, ${fkUsuario});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoDesempenho);

    return database.executar(instrucaoDesempenho).then(function (resultado) { // depois que o banco executar o primeiro insert, executa a próxima função
        var idDesempenho = resultado.insertId; // pega o id do desempenho que acabou de ser criado no banco com o auto_increment
        var valores = respostas.map(function (resposta) { // separa o array de respostas em varios conjuntos, separados com o critério definido no return, e depois junta todos os conjuntos em um texto só com o join
            return `('${resposta.alternativaSelecionada}', ${resposta.fkQuestao}, ${idDesempenho})`;
        }).join(", ");

        var instrucaoRespostas = `
            INSERT INTO resposta (alternativa_selecionada, fk_questao, fk_desempenho)
            VALUES ${valores};
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoRespostas);

        return database.executar(instrucaoRespostas);
    });
}


module.exports = {
    cadastrar
};




