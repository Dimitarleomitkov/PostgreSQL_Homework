const { ApolloServer, ApolloServerOptions, BaseContext } = require(`@apollo/server`);
const { startStandaloneServer } = require(`@apollo/server/standalone`);
const DB = require(`../models/index`);

async function main() {
	// Product - name, size, hazard
	// Warehouse - address, size, hazard
	// Stock - quantity, warehouse_fk_id, product_fk_id
	// Import - date, stock_fk_id
	// Export - date, stock_fk_id

	// const new_product = await DB.Product.create({name: 'Tobaco', size: 2, hazard: true});
	// console.log(new_product);
	// const new_stock = await DB.Stock.create({quantity: 50, warehouse_fk_id: 3, product_fk_id: new_product.id});
	// await DB.Import.create({date: '2022-10-29', stock_fk_id: new_stock.id});
	// await DB.Export.create({date: '2022-11-01', stock_fk_id: 4});
	// console.log(DB);

	process.exit();
}

main();