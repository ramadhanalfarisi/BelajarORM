'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoryArticle = sequelize.define('CategoryArticle', {
    category_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  CategoryArticle.associate = function(models) {
    // associations can be defined here
  };
  return CategoryArticle;
};