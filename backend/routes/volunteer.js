const express = require("express");
const router = express.Router();

const {
  createVolunteer,
  getAllVolunteers,
  getVolunteerById,
  updateVolunteerById,
  updateVolunteerAvailability,
  deleteVolunteerById,
  loginVolunteer,
  getAvailableVolunteers,
} = require("../controller/volunteer");
const {authenticateMiddleWare ,authenticateMiddleWare_for_ngo,authenticateMiddleWare_for_volunteer} = require("../middleware/auth");

// Routes for volunteer.
router.route("/create").post(createVolunteer);
router.route("/login").post(loginVolunteer);

router.route("/getallvolunteers").get(authenticateMiddleWare, getAllVolunteers);
router.route("/getallvolunteers/available").get(authenticateMiddleWare_for_ngo, getAvailableVolunteers);
router
  .route("/getbyid")
  .get(authenticateMiddleWare_for_volunteer, getVolunteerById)
  .patch(authenticateMiddleWare_for_volunteer, updateVolunteerById);
router.route('/delete').delete(authenticateMiddleWare_for_volunteer,deleteVolunteerById);
router
  .route("/updateavailabilitymode")
  .patch(authenticateMiddleWare_for_volunteer, updateVolunteerAvailability);

module.exports = router;
