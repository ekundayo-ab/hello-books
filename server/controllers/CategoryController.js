import model from '../models';

const { Book, Category } = model;

/**
 * @class CategoryController
 *
 * @description Book Category operations
 */
class CategoryController {
  /**
   * @static
   *
   * @description Adds new category to the library
   *
   * @param {object} req - The request payload sent to the controller
   * @param {object} res - The request payload sent from the contorller
   *
   * @returns {object} - Message
   *
   * @memberOf CategoryController
   */
  static addCategory(req, res) {
    const { title } = req.body;

    // Searches if Category exists in the database
    return Category.findOne({ where: { title } })
      .then((foundCat) => {
        if (foundCat) {
          return res.status(409).send({
            message: `Conflict! ${req.body.title} exists already`,
            foundCat });
        }
        // If book does not exist, create new book.
        return Category
          .create({ title })
          .then(category => res.status(201).send({
            message: `${category.title}, successfully added`,
            category
          }))
          .catch(() =>
            res.status(500).send({ message: 'Internal Server Error' }));
      });
  }

  /**
   * @static
   *
   * @description Lists all books in the library
   *
   * @param {object} req - The request payload sent to the controller
   * @param {object} res - The request payload sent from the contorller
   *
   * @returns {object} - List of Categories
   *
   * @memberOf BookController
   */
  static listCategory(req, res) {
    return Category
      .findAll({
        order: [
          ['title', 'ASC'],
        ],
        include: [
          { model: Book, as: 'cat', required: false },
        ]
      })
      .then((categories) => {
        if (categories[0] === undefined) {
          return res.status(204).send({
            message: 'Categories not available, check back later.',
            categories: []
          });
        }
        return res.status(200).send({ categories });
      })
      .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
  }
}

export default CategoryController;
