const User = require("../models/User");
const checkAdmin = (req, res, next) => {

  try {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

module.exports = checkAdmin;

// const checkAdmin = async (req, res, next) => {

//   try {

//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.json({ message: "User not found" });
//     }

//     if (user.role !== "admin") {
//       return res.json({ message: "Only admin can perform this action" });
//     }

//     next();

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }

// };

// module.exports = checkAdmin;