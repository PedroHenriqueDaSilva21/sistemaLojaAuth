// ORM - Sequelize
import Sequelize from "sequelize";
// Configuração do Sequelize
import connection from "../config/sequelize-config.js"

// .define cria a tabela no banco
const ClienteMDC = connection.define('clientes',{
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },

    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
ClienteMDC.sync({force: false})
export default ClienteMDC