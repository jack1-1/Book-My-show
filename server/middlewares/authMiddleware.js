const jwt = require("jsonwebtoken");
 const isAuth = async (req, res, next) => {
  console.log("my request",req);
  // console.log("cookie",req.cookies);
    const token = req.cookies?.jwtToken;
    if (!token) {
     console.log("token not found");
        return res.status(401).json({ message: "Not authorized,token validation failed !" });
    }

    try {
      const decoded=  jwt.verify(token, process.env.JWT_SECRET);
      req.userId=decoded.userId;
      next();
      
    } catch (error) {
     // console.log("inside catch block");
        return res.status(401).json({ message: "Not authorized,token validation failed !" })
    }
}
module.exports = isAuth;
