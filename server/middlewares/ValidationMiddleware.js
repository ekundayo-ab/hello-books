import Helper from '../helpers/Helper';

/**
 * @class ValidationMiddleware
 *
 * @description Validates various inputs sent to the application
 */
class ValidationMiddleware {
  /**
   * @description Checks and ensures a book exists
   *
   * @param {object} req - The request payload sent to the route
   * @param {object} res - The response payload sent back from controller
   * @param {object} next - The next action
   *
   * @returns {next} - verifies and allows route continue to endpoint
   */
  static checkIfDefinedAndValid(req, res, next) {
    const { allValid, allDefined, message } = Helper.badRequestHandler(req);
    if (!allDefined || !allValid) return res.status(400).send({ message });
    return next();
  }
}

export default ValidationMiddleware;
