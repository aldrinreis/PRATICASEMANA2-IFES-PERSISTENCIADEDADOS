// Importando as biliotecas
const { Sequelize, Model, DataTypes } = require("sequelize");

//Abrindo conexão com o Banco de dados ou criando um novo caso não exista
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "empresa.sqlite",
});

// Definindo a classe setor
class Setor extends Model {
  static init(sequelize) {
    super.init(
      {
        idsetor: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        nome: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        ramal: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(30),
        },
      },
      { sequelize, modelname: "setor", tableName: "setores" },
    );
  }
}

// Inicializando o modelo create table setor
Setor.init(sequelize);


// Sincronismo

(async () => {
  await sequelize.sync({ force: true });
  // Usando o Create

  //   Utilizando o ORM Sequelize, insira 3 novos setores (Contabilidade, Diretoria e Recursos humanos na tabela setor do banco de dados criado com todas as informações referentes a tabela setor.

  const setor_create_C = await Setor.create({
    nome: "Contabilidade",
    ramal: "2137",
    email: "contabilidade@empresa.com",
  });

  const setor_create_D = await Setor.create({
    nome: "Diretoria ",
    ramal: "2138",
    email: "diretoria@empresa.com",
  });

  const setor_create_RH = await Setor.create({
    nome: "Recursos humanos",
    ramal: "2136",
    email: "genteegestao@empresa.com",
  });

  // Read - LISTAR SERTORES ORIGINAL
  const setores_listar = await Setor.findAll();
  console.log(
    "Lista de setores Inicialmente Criados: \n",
    JSON.stringify(
      setores_listar,
      ["idsetor", "nome", "ramal", "email"],
      2,
    ),
    "\n\n",);


  // Exclua o setor Contabilidade do banco de dados.

  const setor_delete = await Setor.findByPk(1);
  setor_delete.destroy();

  // Read - Lista APÓS EXLUSÃO

  const setores_listar_excluido = await Setor.findAll();
  console.log(
    "Lista de setores Após a exclusão: \n",
    JSON.stringify(
      setores_listar_excluido,
      ["idsetor", "nome", "ramal", "email"],
      2,
    ),
    "\n\n",);


  // Altere o nome do setor Recursos Humanos para Departamento Pessoal.

  const setor_chave = await Setor.findByPk(3);
  setor_chave.nome = " Departamento Pessoal";

  const resultado = await setor_chave.save();

  // Liste todos os setores da tabela na tela.
  // LISTAGEM FINAL

  const setores_listar_final = await Setor.findAll();
  console.log(
    "Lista Final de setores : \n",
    JSON.stringify(
      setores_listar_final,
      ["idsetor", "nome", "ramal", "email"],
      2,
    ),
    "\n\n",);


})();