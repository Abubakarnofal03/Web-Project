const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {  
    let token = req.headers["authtoken"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    jwt.verify(token, "rtyui" , (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      else{
        if(decoded["Role"] == "admin")
        {
            console.log("Verified!");
            next();
        }
        else{
          return res.status(403).send({
              message: "Require Admin Role!"
            });
        }
      }
      
    });
    
  
};

const isUser = (req, res, next) => {   
  let token = req.headers["authtoken"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, "dfghjk" , (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    else{
      if(decoded["Role"] == "user")
      {
          console.log("Verified!");
          next();
      }
      else{
        return res.status(403).send({
            message: "Require User Role!"
          });
      }
    }
    
  });
};


module.exports = {isAdmin , isUser};