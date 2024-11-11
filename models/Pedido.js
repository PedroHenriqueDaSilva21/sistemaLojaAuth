// ORM - Sequelize
import Sequelize from "sequelize"
// Configuração do sequelize
import connection from "../config/sequelize-config.js"

// .define cria a tabela no banco
const PedidoMDC = connection.define('pedidos', {
    nump: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});
PedidoMDC.sync({force: false});
export default PedidoMDC
