/**
 * Validation Logics for Book Creation
 * and Modification.
 */
class Helper {
  static validateInput(req, res) {
    if (Object.keys(req.body).length < 5) return res.status(400).send({ success: false, message: 'All fields are required.' });
    const errors = [];
    for (let i = 0; i < 5; i += 1) {
      if (Object.values(req.body)[i] === (undefined || null || '')) {
        errors.push(`${Object.keys(req.body)[i]} field is required`);
      }
    }
    if (typeof (req.body.quantity) !== 'number') { errors.push('quantity must be a number'); }
    if (errors.length > 0) return res.status(400).send(errors);
    return false;
  }

  static isAdmin(req) {
    if (req.decoded.data.role !== 'admin') {
      return false;
    }
    return true;
  }
}

export default Helper;
