module.exports = (sequelize, type) => (
  sequelize.define('todo', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: type.STRING,
  })
);
