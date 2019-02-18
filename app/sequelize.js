const config = require('config');
const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const TodoModel = require('./models/todo');

const dbConfig = config.get('db');

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // This option is needed to avoid a deprecation warning which is a shortcoming
  // of the sequelize project currently. Hopefully it is not needed in the future
  // https://github.com/sequelize/sequelize/issues/8417
  operatorsAliases: false,
});

const User = UserModel(sequelize, Sequelize);
const Todo = TodoModel(sequelize, Sequelize);
const TodoToUser = sequelize.define('todo_to_user', {});

Todo.belongsToMany(User, { through: TodoToUser, unique: false });
User.belongsToMany(Todo, { through: TodoToUser, unique: false });

// use { force: true } to wipe db every time
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = {
  User,
  Todo,
  TodoToUser,
};
