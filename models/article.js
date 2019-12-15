'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    underscored: true,
  });
  Article.associate = function(models) {
    Article.belongsToMany(models.Category, {
      foreignKey: 'article_id',
      through: models.CategoryArticle
    })
  };
  return Article;
};