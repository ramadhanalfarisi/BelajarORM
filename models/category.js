'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    underscored: true,
  });
  Category.associate = function(models) {
    Category.belongsToMany(models.Article, {
      foreignKey: 'category_id',
      through: models.CategoryArticle
    })
  };
  return Category;
};