// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const Product_Tags = require("./Product_Tags");

// =============ASSOCIATIONS================
// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: {
    key: "product_id",
    allowNull: false,
  },
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: {
    key: "category_id",
    allowNull: false,
  },
});

// Products belongToMany Tags (through Product_Tag)
Product.belongsToMany(Tag, {
  onDelete: "cascade",
  through: "product_tags",
  foreignKey: "product_id",
  as: "tags",
});

// Tags belongToMany Products (through Product_Tag)
Tag.belongsToMany(Product, {
  through: "product_tags",
  foreignKey: "tag_id",
  as: "tags",
});

Product_Tags.belongsTo(Product, { foreignKey: "product_id", as: "products" });
Product_Tags.belongsTo(Tag, { foreignKey: "tag_id", as: "tags" });

module.exports = {
  Product,
  Category,
  Tag,
  Product_Tags,
};