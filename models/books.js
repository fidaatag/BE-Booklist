'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      books.belongsToMany(models.categories, {
        through: models.book_category, // Mengarahkan asosiasi ke model perantara book_category
        foreignKey: "id_book",
        as: 'categories',
      })
    }
  }
  books.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    pub_date: DataTypes.DATE,
    publiser: DataTypes.STRING,
    number_page: DataTypes.INTEGER,
    review: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};