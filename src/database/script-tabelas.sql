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