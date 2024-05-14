const User = require("../models/user.model");
const Cars = require("../models/cars.model");
const spareParts = require("../models/spareparts.model");
const Admin = require("../models/admin.models");
const Bikes = require("../models/bikes.models");
const Insurance = require("../models/insurance.models");
const Feedbacks = require("../models/feedback.model");
const Cookies = require("cookies");
const jwtToken = require("jsonwebtoken");
const sequelize = require("../config");
const {Op} = require('sequelize');
const errorHandler = require("../utlis/errorhandler")



const multer = require("multer");
  
  const storage = multer.diskStorage({
    destination:function (req, file ,cb) {
      return cb(null, "./uploads");
    },
    filename:function (req, file ,cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
  })

  const upload = multer({ storage })

  const nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "f201028@cfd.nu.edu.pk",
      pass: "iotuonepnecvxdai" // generated ethereal password
    }
  });


const nodemailerfunction = async (req, res) => {
  const { email , message } = req.body;

  const mailOptions = {
    from: "f201028@nu.edu.pk",
    to: "tahirchoudhary600@gmail.com",
    subject: "Contact Form Submission",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("<script>alert('mail sended');</script>");
    }
  });

  try{
    await sequelize
    .sync()
      .then(async() => {
        console.log("Users table created successfully!");
  
          await Feedbacks.create({
            Email:req.body.myEmailID,
            feedback: req.body.message
        })
          .then((user) => {
            if (!user) {
              res.redirect("/user/ContactUs");
              console.log("Cannot add record.");
            } else {
              console.log("Successfully added record.");
              res.send("<script>alert('feedback added');</script>");
            }
          })
          .catch((error) => {
            console.error("Failed to create a new record : ", error);
            res.status(500).send(error.message);
            //res.send(new errorHandler(" data couldnt add " , 400))
          });
      })
      .catch((error) => {
        console.error("Unable to create table : ", error);
      });
    }catch{
      console.error("Failed to create a new record : ", error);
      res.status(500).send(error.message);
    }




}




const signInUser =async (req, res) => {
  try{
    await sequelize
    .sync()
    .then(async() => {
      await User.findOne({
        where: {
          Password: req.body.myPasswordID,
          Email: req.body.myEmailID,
        },
      })
        .then((data) => {
          if(!data)
          {
            res.send("<script>alert('Invalid');</script>")
          }
          else{
            console.log(data);
            res.redirect("/user/userhome");
          //const token = jwtToken.sign({ Role : "admin"}, 'rtyui')
          }         
        })
        .catch((error) => {
          console.error("Failed to sign in : ", error);
          res.status(500).send(error.message);
        });
    })
    .catch((error) => {
      console.error("Failed to sign in : ", error);
          res.status(500).send(error.message);
    });
  }catch{
    console.error("Failed to sign in : ", error);
          res.status(500).send(error.message);
  }
};


const signUpUser = async(req, res) => {
  try{
  await sequelize
  .sync()
    .then(async() => {
      console.log("Users table created successfully!");

        await User.create({
        PhoneNumber: req.body.userPhone,
        Name: req.body.userName,
        Email: req.body.userEmail,
        Password: req.body.userPassword
      })
        .then((user) => {
          if (!user) {
            res.redirect("/signup");
            console.log("Cannot add record.");
          } else {
            console.log("Successfully added record.");
            //res.send("<script>alert('user added');</script>");
            res.render("user/signIn")
          }

         
        })
        .catch((error) => {
          console.error("Failed to create a new record : ", error);
          res.status(500).send(error.message);
          //res.send(new errorHandler(" data couldnt add " , 400))
        });
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
  }catch{
    console.error("Failed to create a new record : ", error);
    res.status(500).send(error.message);
  }
  
};




//----------------paginate----------

const paginatebikes =async (req, res) => {
  const { page } = req.query || 0;
  const { limit, offset } = getPagination(page);
 try{
  await sequelize
   .sync()
   .then(async() => {
     await Bikes.findAll( { limit , offset})
       .then((data) => {      
        res.render("user/Bikes", { Bikesdata: data})
        console.log(data)
       })
       .catch((error) => {
        console.error("page do not exist : ", error);
        res.status(500).send(error.message);
       });
   })
   .catch((error) => {
    console.error("page do not exist : ", error);
    res.status(500).send(error.message);
   });
  }catch{
    console.error("page do not exist : ", error);
          res.status(500).send(error.message);
  }
};

const paginatespareparts = (req, res) => {
  const { page } = req.query || 0;
  const { limit, offset } = getPagination(page);
 sequelize
   .sync()
   .then(() => {
     spareParts.findAll( { limit , offset})
       .then((data) => {      
        res.render("user/Spareparts", { SPdata: data})
        console.log(data)
       })
       .catch((error) => {
         console.error("Failed to retrieve data : ", error);
       });
   })
   .catch((error) => {
     console.error("Unable to create table : ", error);
   });
};

const paginatecars = (req, res) => {
  
  const { page } = req.query || 0;
  const { limit, offset } = getPagination(page);
  
  sequelize
    .sync()
    .then(() => {
      Cars.findAll({ limit, offset })
        .then((data) => { 
          res.render("user/Cars", { Carsdata: data });
          console.log(data);
        })
        .catch((error) => {
          console.error("Failed to retrieve data: ", error);
        });
    })
    .catch((error) => {
      console.error("Unable to create table: ", error);
    });
};

const getPagination = (page) => {
  const limit = 5;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};



//-------------------------add---------------


const addInBikesTable = async (req, res) => {
  try {
    await upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error("Failed to upload file: ", err);
        res.status(500).send(err.message);
        return;
      }

      try {
        await sequelize.sync();
        console.log("Bikes table created successfully!");

        await Bikes.create({
          bikeName: req.body.mybikeNameID,
          companyName: req.body.mycompanyNameID,
          color: req.body.mycolorID,
          model: req.body.myModel,
          price: req.body.myprice,
          picture: req.file.path,
          phonenumber : req.body.userPhone
        })
        .then((rs) => {
          if (!rs) {
            res.redirect("/user/addbikes");
            console.log("Cannot add record.");
          } else {
            console.log("Successfully added record.");
            res.redirect("/user/Bikes")
          }
        })
        .catch((error) => {
          console.error("Failed to create a new record: ", error);
          res.status(500).send(error.message);
        });
      } catch (error) {
        console.error("Failed to create a new record: ", error);
        res.status(500).send(error.message);
      }
    });
  } catch (error) {
    console.error("Failed to create a new record: ", error);
    res.status(500).send(error.message);
  }

};




const addInCarsTable = async (req, res) => {
  try {
    await upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error("Failed to upload file: ", err);
        res.status(500).send(err.message);
        return;
      }

      try {
        await sequelize.sync();
        console.log("CARS table created successfully!");

        await Cars.create({
          carName: req.body.mycarNameID,
          companyName: req.body.mycompanyNameID,
          color: req.body.mycolorID,
          model: req.body.myModel,
          price: req.body.myprice,
          picture: req.file.path,
          phonenumber : req.body.userPhone
        })
        .then((rs) => {
          if (!rs) {
            res.redirect("/user/addcars");
            console.log("Cannot add record.");
          } else {
            console.log("Successfully added record.");
            res.redirect("/user/Cars");
          }
        })
        .catch((error) => {
          console.error("Failed to create a new record: ", error);
          res.status(500).send(error.message);
        });
      } catch (error) {
        console.error("Failed to create a new record: ", error);
        res.status(500).send(error.message);
      }
    });
  } catch (error) {
    console.error("Failed to create a new record: ", error);
    res.status(500).send(error.message);
  }
};

const addInSparePartsTable = async (req, res) => {
  try {
    await upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error("Failed to upload file: ", err);
        res.status(500).send(err.message);
        return;
      }

      try {
        await sequelize.sync();
        console.log("SpareParts table created successfully!");

        await spareParts.create({
          Name: req.body.mysparepartNameID,
          typeOfPart: req.body.mycompanyNameID,
          model: req.body.myModel,
          picePkr: req.body.myprice,
          picture: req.file.path,
          phonenumber : req.body.userPhone
        })
        .then((rs) => {
          if (!rs) {
            res.redirect("/user/addspareparts");
            console.log("Cannot add record.");
          } else {
            console.log("Successfully added record.");
            res.redirect("/user/Spareparts");
          }
        })
        .catch((error) => {
          console.error("Failed to create a new record: ", error);
          res.status(500).send(error.message);
        });
      } catch (error) {
        console.error("Failed to create a new record: ", error);
        res.status(500).send(error.message);
      }
    });
  } catch (error) {
    console.error("Failed to create a new record: ", error);
    res.status(500).send(error.message);
  }
};




////----------------retrive by id--------
const retriveteBikesByID = (req, res) => {
  sequelize
    .sync()
    .then(() => {
      Bikes.findOne({
        where: {
          id: req.body.SearchCCarbyID,
        },
      })
        .then((rs) => {
          console.log(rs);
          res.render("user/getBikeByPrice");
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        });
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
};

const retriveteCarsByID = (req, res) => {
  
  sequelize
  .sync()
  .then(() => {
    Cars.findOne({
      where: {
        id: req.body.SearchCCarbyID,
      },
    })
      .then((data) => { 
        res.render("user/getCarByID");
        console.log(data);
      })
      .catch((error) => {
        console.error("Failed to retrieve data: ", error);
      });
  })
  .catch((error) => {
    console.error("Unable to create table: ", error);
  });
};


const retriveteSparePartsByID = async (req, res) => {
  try {
    await sequelize
    .sync()
    .then(async() => {
      await spareParts.findOne({
        where: {
          id: req.body.SearchCCarbyID,
        },
      })
        .then((data) => {
          if(!data)
          {
            res.send(new errorHandler("id do not exist " , 404))
          }
          else{
          console.log(data);
          res.render("user/GetSPbyID")
          
          }
          
        })
        .catch((error) => {
          console.error("Failed to sign in : ", error);
          res.status(500).send(error.message);
        });
    })
    .catch((error) => {
      console.error("Failed to sign in : ", error);
          res.status(500).send(error.message);
    });
  }catch{
    console.error("Failed to sign in : ", error);
          res.status(500).send(error.message);
  }
};



/////---------------------filterusers-----------------

const filterCars = async (req, res) => {
  try{
    await sequelize
    .sync()
    .then(async() => {
        await Cars.findAll({
        where: {
          price: {
            [Op.between]: [req.body.FromPrice, req.body.ToPrice]
          }
        }
      })
        .then((cardata) => {
          res.render("user/getCarByPrice")
          console.log(cardata)
        })
        .catch((error) => {
          console.error("Failed to filter record : ", error);
          res.status(500).send(error.message);
        });
    })
    .catch((error) => {
      console.error("Failed to filter record : ", error);
    res.status(500).send(error.message);
    });
  }catch{
    console.error("Failed to filter record : ", error);
    res.status(500).send(error.message);
  }
};


const filterBikes = (req, res) => {
  sequelize
    .sync()
    .then(() => {
        Bikes.findAll({
        where: {
          price: {
            [Op.between]: [req.body.FromPrice, req.body.ToPrice]
          }
        }
      })
        .then((data) => {
          console.log(data);
          res.render("user/getBikeByID")
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        });
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
};

const filterSpareParts = async (req, res) => {
  try{
  await sequelize
    .sync()
    .then(async() => {
        await spareParts.findAll({
        where: {
          picePkr: {
            [Op.between]: [req.body.FromPrice, req.body.ToPrice]
          }
        }
      })
        .then((data) => {
          if(!data)
          {
            res.send(new errorHandler("canot filter data " , 404))
          }
          else{
          console.log(data);
          res.render("user/getSPbyPrice")
          }
        })
        .catch((error) => {
          console.error("Failed to update record : ", error);
          res.status(500).send(error.message);
        });
    })
    .catch((error) => {
      console.error("Failed to update record : ", error);
      res.status(500).send(error.message);
    });
  }catch{
    console.error("Failed to update record : ", error);
    res.status(500).send(error.message);
  }
};

const logout = async (req, res) => {
  jwtToken = null;
  
  localStorage.removeItem('jwtToken');
  
  window.location.href = '/landing';
}


module.exports = {
  
  paginatecars,
  paginatebikes,
  paginatespareparts,
  signInUser,
  signUpUser,
  addInBikesTable,
  addInCarsTable,
  addInSparePartsTable,
  retriveteBikesByID,
  retriveteCarsByID,
  retriveteSparePartsByID,
  filterBikes,
  filterCars,
  filterSpareParts,
  nodemailerfunction,
  logout

  
};



