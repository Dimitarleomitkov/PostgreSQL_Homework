const definitions = `
  type Warehouse {
    id: Int
    address: String
    size: Int
    hazard: Boolean
  }
  type Product {
    id: Int
    name: String
    size: Int
    hazard: Boolean
  }
  type Stock {
    id: Int
    quantity: Int
    Product: Product
  }
  type Import {
    id: Int
    date: String
    Stock: Stock
    Warehouse: Warehouse
    is_exported: Boolean
  }
  type Export {
    id: Int
    date: String
    Stock: Stock
    Warehouse: Warehouse
  }
  type WarehouseSummary {
  	id: Int
  	address: String
  	remaining: Int
  	sum: Int
  }

  type Query {
    getWarehouses: [Warehouse]
    getWarehouse(id: Int!): Warehouse

    getProducts: [Product]
    getProduct(id: Int!): Product

    getStocks: [Stock]
    getSpaceInfoPerWarehouse(warehouse_fk_id: Int!): [WarehouseSummary]
    getStock(id: Int!): Stock

    getImports: [Import]
    getImport(id: Int!): Import
    getHistoricImports(date: String!, warehouse_fk_id: Int): [Import]

    getExports: [Export]
    getExport(id: Int!): Export
    getHistoricExports(date: String!, warehouse_fk_id: Int): [Export]
  }

  type Mutation {
    createWarehouse(address: String!, size: Int!, hazard: Boolean!): Warehouse
    updateWarehouse(id: Int!, address: String, size: Int, hazard: Boolean): Warehouse
    deleteWarehouse(id: Int!): Boolean

    createProduct(name: String!, size: Int!, hazard: Boolean!): Product
    updateProduct(id: Int!, name: String, size: Int, hazard: Boolean): Product
    deleteProduct(id: Int!): Boolean

    createStock(quantity: Int!, product_fk_id: Int!): Stock
    updateStock(id: Int!, quantity: Int, warehouse_fk_id: Int, product_fk_id: Int): Stock
    deleteStock(id: Int!): Boolean

    createImport(date: String!, stock_fk_id: Int!, warehouse_fk_id: Int!): Import
    updateImport(id: Int!, date: String, stock_fk_id: Int): Import
    deleteImport(id: Int!): Boolean

    createExport(date: String!, stock_fk_id: Int!, warehouse_fk_id: Int!): Export
    # TODO partialExport(date: String!, stock_fk_id: Int!, warehouse_fk_id: Int!): Export
    updateExport(id: Int!, date: String, stock_fk_id: Int): Export
    deleteExport(id: Int!): Boolean
  }
`

module.exports = definitions;