'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // book_category.belongsTo(models.books, {
      //   foreignKey: "id_book",
      //   targetKey: "id"
      // })

      // book_category.belongsTo(models.categories, {
      //   foreignKey: "id_Category",
      //   targetKey: "id"
      // })
    }
  }
  book_category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_book: DataTypes.INTEGER,
    id_category: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book_category',
  });
  return book_category;
};