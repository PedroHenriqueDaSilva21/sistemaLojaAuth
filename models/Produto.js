import Sequelize from "sequelize"

import connection from "../config/sequelize-config.js"

const ProdutoMDC = connection.define("produtos", {
    img: Sequelize.STRING,
    nomep: Sequelize.STRING,
    pre: Sequelize.DOUBLE,
    cat: Sequelize.STRING
});
ProdutoMDC.sync({force: false});
export default ProdutoMDC;