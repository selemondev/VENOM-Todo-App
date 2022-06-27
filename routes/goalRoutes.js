const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getGoals, setGoal, updateGoal, deleteGoal, findUpdatedGoal } = require("../controllers/goalController");
router.route("/").get(protect, getGoals).post(protect,setGoal);
router.route("/:id").get(findUpdatedGoal).put(protect, updateGoal).delete(protect,deleteGoal);
module.exports = router;