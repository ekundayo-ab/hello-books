import model from '../models';
import helper from '../helpers/index';

const Category = model.Category;

/**
 * @class CatController
 * @description Book Category operations
 */
class CatController {
  /**
   * @static
   * @description Adds new category to the library
   * @param {any} req
   * @param {any} res
   * @returns {object} // Success, Message
   * @memberOf CatController
   */
  static create(req, res) {
    // Ensure user has administrative priviledges to create book
    if (!helper.isAdmin(req)) {
      return res.status(403).send({
        success: false,
        message: 'Permission Denied' });
    }

    // Error(s) is/are outputted if any
    if (req.body.title === (undefined || null || '')
    || /^\s+$/.test(req.body.title)) {
      return res.status(400).send({
        success: false,
        message: 'All fields must exist' });
    }

    // Searches if Category exists in the database
    return Category.findOne({
      where: { title: req.body.title },
    })
      .then((foundCat) => {
        if (foundCat) {
          return res.status(409).send({
            success: false,
            message: `Conflict! ${req.body.title} exists already`,
            foundCat });
        }
        // If book does not exist, create new book.
        return Category
          .create({
            title: req.body.title,
          })
          .then((category) => {
            res.status(201).send({
              success: true,
              message: `${category.title}, successfully added`,
              category
            });
          })
          .catch(() =>
            res.status(500).send({
              success: false,
              message: 'Internal Server Error'
            }));
      });
  }

  /**
   * @static
   * @description Lists all books in the library
   * @param {any} req
   * @param {any} res
   * @returns {object} // Categories
   * @memberOf BookController
   */
  static list(req, res) {
    return Category
      .findAll({
        order: [
          ['createdAt', 'ASC'],
        ],
      })
      .then((categories) => {
        if (categories[0] === undefined) {
          return res.status(301).send({
            success: false,
            message: 'Categories not available, check back later.'
          });
        }
        return res.status(200).send({
          success: true,
          categories
        });
      })
      .catch(() => res.status(500).send({
        success: false,
        message: 'Internal Server Error' }));
  }
}

export default CatController;
