const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);

router.route("/")
.get(controller.getContacts)
.post(controller.createContacts);

router.route("/:id")
.get(controller.getContactById)
.delete(controller.deleteContactById)
.put(controller.updateContactById);

module.exports = router;
