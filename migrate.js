import { Sequelize } from 'sequelize';
import { sequelize } from './config/connection.js'; // Adjust the path as per your project structure

async function migrate() {
  try {
    // Assuming sequelize is correctly imported and instantiated in './config/connection.js'

    // Define your models here (if not already imported)
    const User = require('./models/user.js')(sequelize, Sequelize);
    const Book = require('./models/book.js')(sequelize, Sequelize);
    const Review = require('./models/review.js')(sequelize, Sequelize);

    // Create tables
    await User.sync({ force: true });
    await Book.sync({ force: true });
    await Review.sync({ force: true });

    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    // Close the connection
    if (sequelize) {
      await sequelize.close();
      console.log('Database connection closed');
    }
  }
}

migrate();
