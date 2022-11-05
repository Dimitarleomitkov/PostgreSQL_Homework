const { ApolloServer, ApolloServerOptions, BaseContext } = require(`@apollo/server`);
const { startStandaloneServer } = require(`@apollo/server/standalone`);
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:856525@localhost:5432/warehouseDB');
module.exports = { sequelize };

// Import models
const { Warehouse } = require(`./models/warehouse`);
// const { Product } = require(`./models/product`);
// const { Stock } = require(`./models/stock`);
// const { Import } = require(`./models/import`);
// const { Export } = require(`./models/export`);


async function test_posgress () {
	try {
	  await sequelize.authenticate();
	  console.log('Connection has been established successfully.');
	} catch (error) {
	  console.error('Unable to connect to the database:', error);
	}
}

async function main() {
	await test_posgress();



	process.exit();
}

main();