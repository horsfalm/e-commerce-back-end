const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Product_Tag extends Model {}

Product_Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      field: "id",
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tags",
  },
);

module.exports = Product_Tag;
