-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

create database avanti_palestra;

use avanti_palestra;

create table usuario(
id int primary key auto_increment,
nome varchar(150) not null,
email varchar(150) not null unique,
senha varchar(150) not null
);

create table quiz(
id int primary key auto_increment,
titulo varchar(45) not null,
descricao varchar(200)
);

create table questao(
id int primary key auto_increment,
numero int not null,
pergunta varchar(100) not null,
alternativa_correta char(1) not null,
alternativa_a varchar(100) not null,
alternativa_b varchar(100) not null,
alternativa_c varchar(100) not null,
alternativa_d varchar(100) not null,
dificuldade varchar(45) not null,
fk_quiz int not null,
constraint cfk_quiz_questao foreign key (fk_quiz) references quiz(id)
);

create table desempenho(
id int primary key auto_increment,
qtd_acertos int not null,
classificacao varchar(45) not null,
dt_realizacao datetime default now() not null,
fk_quiz int not null,
fk_usuario int not null,
constraint cfk_quiz_desempenho foreign key (fk_quiz) references quiz(id),
constraint cfk_usuario_desempenho foreign key (fk_usuario) references usuario(id)
);

create table resposta(
id int primary key auto_increment,
alternativa_selecionada varchar(45) not null,
fk_questao int not null,
fk_desempenho int not null,
constraint cfk_questao_resposta foreign key (fk_questao) references questao(id),
constraint cfk_desempenho_resposta foreign key (fk_desempenho) references desempenho(id)
);


INSERT INTO quiz (titulo, descricao) VALUES
('Quiz Geral','Teste seus conhecimentos sobre a história do Palmeiras, desde sua fundação como Palestra Italia até sua trajetória e transformações ao longo dos anos.'),
('Quiz Internacional','Teste seus conhecimentos sobre a trajetória internacional do Palmeiras, com destaque para a Copa Libertadores, Copa Rio, Copa Mercosul e Recopa Sul-Americana.'),
('Quiz Nacional','Teste seus conhecimentos sobre os títulos nacionais do Palmeiras, com destaque para o Campeonato Brasileiro, a Copa do Brasil e outras competições.');


INSERT INTO questao(numero, pergunta, alternativa_correta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, dificuldade, fk_quiz) VALUES
(1, 'Em que ano o Palmeiras conquistou sua primeira Libertadores?', 'C', '1994', '1997', '1999', '2000', 'Fácil', 2),

(2, 'Qual clube o Palmeiras enfrentou na final da Copa Rio de 1951?', 'A','Juventus', 'Real Madrid', 'Barcelona', 'Benfica', 'Média', 2),

(3, 'Quem marcou o gol do título da Libertadores de 2020?', 'B','Raphael Veiga', 'Breno Lopes', 'Rony', 'Dudu', 'Média', 2),

(4, 'Qual clube o Palmeiras derrotou na final da Recopa Sul-Americana de 2022?', 'D','Flamengo', 'Santos', 'Grêmio', 'Athletico-PR', 'Média', 2),

(5, 'Como foi decidida a final da Libertadores de 1999?', 'C', 'Gol de ouro', 'Prorrogação', 'Disputa de pênaltis', 'Vitória por W.O.', 'Difícil', 2),

(6, 'Quantos gols Rony marcou na Libertadores pelo Palmeiras?', 'A', '23 gols', '18 gols', '20 gols', '25 gols', 'Difícil', 2);
 
 
 INSERT INTO questao (numero, pergunta, alternativa_correta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, dificuldade, fk_quiz) VALUES
(1, 'Em que ano o Palmeiras foi fundado?', 'A','1914', '1915', '1920', '1942', 'Fácil', 1),

(2, 'Qual era o nome original do Palmeiras?', 'C', 'Palestra Paulista', 'Sociedade Italiana', 'Palestra Italia', 'Sport Club Italia', 'Média', 1),

(3, 'Em que ano ocorreu a mudança definitiva para Sociedade Esportiva Palmeiras?', 'B', '1933', '1942', '1945', '1951', 'Média', 1),

(4, 'Qual foi o placar da vitória na Arrancada Heroica contra o São Paulo?', 'D', '2 a 0', '2 a 1', '3 a 0', '3 a 1', 'Média', 1),

(5, 'Qual seleção o Palmeiras enfrentou quando representou oficialmente o Brasil em 1965?', 'C', 'Argentina', 'Itália', 'Uruguai', 'Alemanha', 'Difícil', 1),

(6, 'Em qual ano começou a parceria histórica entre Palmeiras e Parmalat?', 'A', '1992', '1993', '1995', '1998', 'Difícil', 1);
 
 
INSERT INTO questao (numero, pergunta, alternativa_correta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, dificuldade, fk_quiz) VALUES
(1, 'Quantos títulos do Campeonato Brasileiro o Palmeiras possui?', 'D','8 títulos', '10 títulos', '11 títulos', '12 títulos', 'Fácil', 3),

(2, 'Quais competições nacionais o Palmeiras conquistou em 1967?', 'B','Brasileirão e Copa do Brasil', 'Taça Brasil e Robertão','Copa dos Campeões e Robertão', 'Taça Brasil e Copa do Brasil', 'Média', 3),

(3, 'Qual treinador comandou o Palmeiras nas conquistas brasileiras de 1993 e 1994?', 'A','Vanderlei Luxemburgo', 'Luiz Felipe Scolari','Abel Ferreira', 'Cuca', 'Média', 3),

(4, 'Contra qual clube o Palmeiras conquistou sua primeira Copa do Brasil?', 'C', 'Santos', 'Grêmio', 'Cruzeiro', 'Corinthians', 'Média', 3),

(5, 'Em quais anos o Palmeiras conquistou o Brasileiro sob o comando da Segunda Academia?', 'D','1967 e 1969', '1970 e 1971', '1973 e 1974', '1972 e 1973', 'Difícil', 3),

(6, 'Qual foi o placar da final da Supercopa do Brasil de 2023?', 'B','3 a 1 contra o Flamengo', '4 a 3 contra o Flamengo','2 a 0 contra o Flamengo', '3 a 2 contra o Flamengo', 'Difícil', 3);