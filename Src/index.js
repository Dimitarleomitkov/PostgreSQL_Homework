const { ApolloServer, ApolloServerOptions, BaseContext } = require(`@apollo/server`);
const { startStandaloneServer } = require(`@apollo/server/standalone`);
const DB = require(`../models/index`);
const { Op } = require('sequelize');
const definition = require(`./definitions/index`);

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = definition;

// TODO: Refactor into multiple files and folders for each model
function createResolvers() {
  const resolvers = {
    Query: {
      getWarehouses: async () => {
        const warehouses = await DB.Warehouse.findAll();
        
        return warehouses;
      },
      getWarehouse: async (_, args) => {
        const warehouse = await DB.Warehouse.findOneByPk(args.id);
        
        return warehouse;
      },

      getProducts: async () => {
        const products = await DB.Product.findAll();
        
        return products;
      },
      getProduct: async (_, args) => {
        const product = await DB.Product.findOneByPk(args.id);
        
        return product;
      },

      getStocks: async () => {
        const stocks = await DB.Stock.findAll({include: DB.Product});
        
        return stocks;
      },
      getSpaceInfoPerWarehouse: async (_, args) => {
      	const warehouses = await DB.Warehouse.findAll({include: {model: DB.Import, include: {model: DB.Stock, include: DB.Product}}});

      	let result = [];
      	let total = 0;

      	warehouses.forEach((warehouse) => {
      		let sum = warehouse.Imports.reduce((accumulator, current_import) => {
	      		const stock = current_import.Stock;
	      		const product = stock.Product;
	      		let total_space = stock.quantity * product.size;

	      		return accumulator + total_space;
      		}, 0);
      		total += sum;
      		const remain = warehouse.size - sum;
      		result.push({id: warehouse.id, address: warehouse.address, remaining: remain, sum});
      	});

      	return result;
      },
      getStock: async (_, args) => {
        const stock = await DB.Stock.findOneByPk(args.id);
        
        return stock;
      },

      getImports: async () => {
        const imports = await DB.Import.findAll({include: [{model: DB.Stock, include: DB.Product}, DB.Warehouse]});
        
        return imports;
      },
      getImport: async (_, args) => {
        const my_import = await DB.Import.findOneByPk(args.id, {include: [{model: DB.Stock, include: DB.Product}, DB.Warehouse]});
        
        return my_import;
      },
      getHistoricImports: async (_, args) => {
      	const current_date = new Date(args.date);
      	const next_date = new Date(new Date(current_date).setDate(current_date.getDate() + 1));

      	const imports = await DB.Import.findAll({where: {date: {[Op.gte]: current_date, [Op.lt]: next_date},
      		...(args.warehouse_fk_id ? {warehouse_fk_id: args.warehouse_fk_id}: {})
      		},
      		include: [{model: DB.Stock, include: DB.Product}, DB.Warehouse]});
      	
      	return imports;
      },

      getExports: async () => {
        const my_exports = await DB.Export.findAll({include: [{model: DB.Stock, include: DB.Product}, DB.Warehouse]});
        
        return my_exports;
      },
      getExport: async (_, args) => {
        const my_export = await DB.Export.findOneByPk(args.id, {include: [{model: DB.Stock, include: DB.Product}, DB.Warehouse]});
        
        return my_export;
      },
      getHistoricExports: async (_, args) => {
      	const my_exports = await DB.Export.findAll(args, {include: [{model: DB.Stock, include: DB.Product}, DB.Warehouse]});
      	
      	return my_exports;
      }

    },

    Mutation: {
      // Warehouses
      createWarehouse: async (_, args) => {
        const new_warehouse = await DB.Warehouse.create(args);
        
        return new_warehouse;
      },
      updateWarehouse: async (_, args) => {
      	await DB.Warehouse.update(args, {where: {id: args.id}});
      	
      	const updated_warehouse = await DB.Warehouse.findByPk(args.id);
      	
      	return updated_warehouse;
      },
	  deleteWarehouse: async (_, args) => {
	  	return await DB.Warehouse.destroy({where: {id: args.id}});
	  },
	  
	  // Products
      createProduct: async (_, args) => {
        const new_product = await DB.Product.create(args);
        
        return new_product;
      },
      updateProduct: async (_, args) => {
      	await DB.Product.update(args, {where: {id: args.id}});
      	
      	const updated_product = await DB.Product.findByPk(args.id);
      	
      	return updated_product;
      },
	  deleteProduct: async (_, args) => {
	  	return await DB.Product.destroy({where: {id: args.id}});
	  },
	  
	  // Stocks
      createStock: async (_, args) => {
        const new_stock = await DB.Stock.create(args);
        
        return new_stock;
      },
      updateStock: async (_, args) => {
      	await DB.Stock.update(args, {where: {id: args.id}});
      	
      	const updated_stock = await DB.Stock.findByPk(args.id);
      	
      	return updated_stock;
      },
	  deleteStock: async (_, args) => {
	  	return await DB.Stock.destroy({where: {id: args.id}});
	  },
	  
	  // Imports
      createImport: async (_, args) => {
      	const warehouse = await DB.Warehouse.findByPk(args.warehouse_fk_id);
      	const stock = await DB.Stock.findByPk(args.stock_fk_id);
      	const product = await DB.Product.findByPk(stock.product_fk_id);

      	if (warehouse.hazard !== product.hazard) {
      		throw new Error("This stock cannot go in that warehouse.");
      	}
        
        const new_import = await DB.Import.create({... args, is_exported: false});
        
        return new_import;
      },
      updateImport: async (_, args) => {
      	const warehouse = await DB.Warehouse.findByPk(args.warehouse_fk_id);
      	const stock = await DB.Stock.findByPk(args.stock_fk_id);
      	const product = await DB.Product.findByPk(stock.product_fk_id);

      	if (warehouse.hazard !== product.hazard) {
      		throw new Error("This stock cannot go in that warehouse.");
      	}

      	await DB.Import.update(args, {where: {id: args.id}});
      	
      	const updated_import = await DB.Import.findByPk(args.id);
      	
      	return updated_import;
      },
	  deleteImport: async (_, args) => {
	  	return await DB.Import.destroy({where: {id: args.id}});
	  },

	  // Exports
      createExport: async (_, args) => {
      	const last_import = await DB.Import.findOne({where:
      		{stock_fk_id: args.stock_fk_id, warehouse_fk_id: args.warehouse_fk_id, is_exported: false}});

      	// Check if there is an existing import
      	if (!last_import?.id) {
      		throw new Error("404 Import does not exist");
      	}

      	await DB.Import.update({is_exported: true}, {where: {id: last_import.id}});
      	// TODO: Check if the export date is after the import date

        const new_export = await DB.Export.create(args);
        
        return new_export;
      },
      updateExport: async (_, args) => {
      	// TODO: Check if there is an existing import
      	// TODO: Check if the export date is after the import date
      	
      	await DB.Export.update(args, {where: {id: args.id}});
      	
      	const updated_export = await DB.Export.findByPk(args.id);
      	
      	return updated_export;
      },
	  deleteExport: async (_, args) => {
	  	return await DB.Export.destroy({where: {id: args.id}});
	  }
    }
  };

  return resolvers;
}

async function main() {
  const resolvers = createResolvers();

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

main();