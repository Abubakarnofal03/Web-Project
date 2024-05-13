const User = require("../models/user.model");
const Cars = require("../models/cars.model");
const spareParts = require("../models/spareparts.model");
const Admin = require("../models/admin.models");
const Bikes = require("../models/bikes.models");
const Feedbacks = require("../models/feedback.model");
const Cookies = require("cookies");
const jwtToken = require("jsonwebtoken");
const sequelize = require("../config");
const {Op} = require('sequelize');
const errorHandler = require("../utlis/errorhandler")

app.use("/Images",express.static('Images'))



////---------------------ADD----------------
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
              res.redirect("/admin/addusers");
              console.log("Cannot add record.");
            } else {
              console.log("Successfully added record.");
              //res.send("<script>alert('user added');</script>");
              res.redirect("/admin/Users")
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
            res.redirect("/admin/addbikes");
            console.log("Cannot add record.");
          } else {
            console.log("Successfully added record.");
            res.redirect("/admin/Bikes")
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
            res.redirect("/admin/addcars");
            console.log("Cannot add record.");
          } else {
            console.log("Successfully added record.");
            res.redirect("/admin/Cars");
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
            res.redirect("/admin/addspareparts");
            console.log("Cannot add record.");
          } else {
            console.log("Successfully added record.");
            res.redirect("/admin/Spareparts");
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



//////--------------------------delete--------------------
const deleteFomUser =async (req, res) => {
  try{
    await sequelize
    .sync()
    .then(async() => {
      await User.destroy({
        where: {
          id: req.body.myEmailID,
        },
      })
        .then((data) => {
          if(!data)
          {
            //res.send(new errorHandler("id do not exist " , 404))
            res.redirect("/admin/deleteusers")
            console.log("canot delete")
          }
          else{
          console.log("Successfully deleted record.");
          //res.status(200).send("data deleted");
          res.redirect("/admin/Users")
          }
        })
        .catch((error) => {
          console.error("Failed delete record : ", error);
          res.status(500).send(error.message);
        });
    })
    .catch((error) => {
      console.error("Failed to delete record : ", error);
          res.status(500).send(error.message);
    });
  }catch{
    console.error("Failed to delete record : ", error);
          res.status(500).send(error.message);
  }
};

const deleteFomCars = async (req, res) => {
  try {
    await sequelize
    .sync()
    .then(async() => {
      await Cars.destroy({
        where: {
          id: req.body.mycarID,
        },
      })
        .then((data) => {
          if(!data)
          {

            //res.send(new errorHandler("id do not exist " , 404))
            res.redirect("/admin/deletecars")
            console.log("canot delete")
          }
          else{
          console.log("Successfully deleted record.");
          //res.status(200).send("data deleted");
          res.redirect("/admin/Cars")
          }
        })
        .catch((error) => {
          console.error("Failed to delete record : ", error);
          res.status(500).send(error.message);
        });
    })
    .catch((error) => {
      console.error("Failed to delete record : ", error);
          res.status(500).send(error.message);
    });
  }catch
  {
    console.error("Failed to delete record : ", error);
          res.status(500).send(error.message);
  }
};

const deleteFomSpareParts = async(req, res) => {
  try{
  await sequelize
    .sync()
    .then(async() => {
      await spareParts
        .destroy({
          where: {
            id: req.body.mysparepartID,
          },
        })
        .then((data) => {
          if(!data)
          {
           res.redirect("/admin/deletespareparts")
            console.log("canot delete")
          }
          else{
          console.log("Successfully deleted record.");
          //res.status(200).send("data deleted");
          res.redirect("/admin/Spareparts")
          }
        })
        .catch((error) => {
          console.error("Failed to delete record : ", error);
          res.status(500).send(error.message);
        });
    })
    .catch((error) => {
      console.error("Failed to delete record : ", error);
          res.status(500).send(error.message);
    });
  }catch{
    console.error("Failed to delete record : ", error);
          res.status(500).send(error.message);
  }
};



const deleteFomBikes = async (req, res) => {
  try{
  await sequelize
    .sync()
    .then(async() => {
      await Bikes.destroy({
        where: {
          id: req.body.mybikeID,
        },
      })
        .then((data) => {
          if(!data)
          {
            //res.send("<script>alert('Invalid Id');</script>");
            res.redirect("/admin/deletebikes")
            console.log("canot delete")

          }
          else{
          console.log("Successfully deleted record.");
          res.redirect("/admin/Bikes")
          //res.status(200).send("data deleted");
          }
        })
        .catch((error) => {
          console.error("Failed to delete record : ", error);
          res.status(500).send(error.message);
        });
    })
    .catch((error) => {
      console.error("Failed to delete record : ", error);
          res.status(500).send(error.message);
    });
  }catch{
    console.error("Failed to delete record : ", error);
          res.status(500).send(error.message);
  }
};




/////////----------------------UPDATE------------------
const upadteSpareParts =async (req, res) => {
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

        await spareParts.update({
          Name: req.body.mybikeNameID,
          typeOfPart: req.body.mycompanyNameID,
          model: req.body.myModel,
          pricepkr: req.body.myprice,
          picture: req.file.path,
          phonenumber : req.body.phonenumber
        },
        {
           where:{id : req.body.bikeid}
        })
        .then((rs) => {
          if (!rs) {
            res.send(new errorHandler("id do not exist " , 404))
            console.log("Cannot add record.");
          } else {
            console.log("Successfully added record.");
            res.redirect("/admin/Spareparts")
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


const upadteCars = async(req, res) => {
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

        await Cars.update({
          carName: req.body.mybikeNameID,
          companyName: req.body.mycompanyNameID,
          color: req.body.mycolorID,
          model: req.body.myModel,
          price: req.body.myprice,
          picture: req.file.path,
          phonenumber : req.body.phonenumber
        },
        {
           where:{id : req.body.bikeid}
        })
        .then((rs) => {
          if (!rs) {
            res.send(new errorHandler("id do not exist " , 404))
            console.log("Cannot add record.");
          } else {
            console.log("Successfully added record.");
            res.redirect("/admin/Cars")
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




const upadteUsers = async(req, res) => {
  
  try{
    await sequelize
    .sync()
      .then(async() => {
        console.log("Users table created successfully!");
  
          await User.update(
          {
          PhoneNumber: req.body.userPhone,
          Name: req.body.userName,
          Email: req.body.userEmail,
          Password: req.body.userPassword
           },
          {
            where:{id : req.body.userid}

          }
          )
          .then((user) => {
            if (!user) {
              res.send(new errorHandler("id do not exist " , 404))
              console.log("Cannot update record.");
            } else {
              console.log(user);
              res.send("<script>alert('user updated');</script>");
              res.redirect("/admin/Users")

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

const upadteBikes = async(req, res) => {
  
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

        await Bikes.update({
          bikeName: req.body.mybikeNameID,
          companyName: req.body.mycompanyNameID,
          color: req.body.mycolorID,
          model: req.body.myModel,
          price: req.body.myprice,
          picture: req.file.path,
          phonenumber : req.body.phonenumber
        },
        {
           where:{id : req.body.bikeid}
        })
        .then((rs) => {
          if (!rs) {
            res.send(new errorHandler("id do not exist " , 404))
            console.log("Cannot add record.");
          } else {
            console.log("Successfully added record.");
            res.redirect("/admin/Bikes")
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

////-------------------Retrive by id------------------


const signInAdmin =async (req, res) => {
  try{
    await sequelize
    .sync()
    .then(async() => {
      await Admin.findOne({
        where: {
          Password: req.body.myPasswordID,
          Email: req.body.myEmailID,
        },
      })
        .then((data) => {
          if(!data)
          {
            res.send(new errorHandler("id do not exist " , 404))
          }
          else{
            console.log(data);
            res.redirect("/admin/adminhome");
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
          res.render("admin/getBikeByPrice");
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
        //res.render("admin/getCarByID" , {Cars: data});
        res.render("admin/getCarByID");
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




const retriveteSparePartsByID = (req, res) => {
  
  sequelize
  .sync()
  .then(() => {
    spareParts.findOne({
      where: {
        id: req.body.SearchCCarbyID,
      },
    })
      .then((data) => { 
        //res.render("admin/getCarByID" , {Carsdata: data});
        res.render("admin/getSPbyID");
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


//----------------------pagination
const paginatebikes =async (req, res) => {
  const { page } = req.query;
  const { limit, offset } = getPagination(page);
 try{
  await sequelize
   .sync()
   .then(async() => {
     await Bikes.findAll( { limit , offset})
       .then((data) => {      
        res.render("admin/Bikes", { Bikesdata: data})
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
  const { page } = req.query;
  const { limit, offset } = getPagination(page);
 sequelize
   .sync()
   .then(() => {
     spareParts.findAll( { limit , offset})
       .then((data) => {      
        res.render("admin/Spareparts", { SPdata: data})
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
  
  const { page } = req.query;
  const { limit, offset } = getPagination(page);
  
  sequelize
    .sync()
    .then(() => {
      Cars.findAll({ limit, offset })
        .then((data) => { 
          res.render("admin/Cars", { Carsdata: data });
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

const paginateuser = (req, res) => {

   const { page } = req.query;
   const { limit, offset } = getPagination(page);
  sequelize
    .sync()
    .then(() => {
      User.findAll( { limit , offset})
        .then((data) => {      
          res.render("admin/Users", { Usersdata: data})
          console.log(data);
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        });
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
};


const paginateFeedback = (req, res) => {
  const { page } = req.query || 0;
  const { limit, offset } = getPagination(page);
 sequelize
   .sync()
   .then(() => {
     Feedbacks.findAll( { limit , offset})
       .then((data) => {    
        console.log(data);  
         //res.render("admin/Users", { Feeddata: data})
         res.render("admin/feedback" , {Feedbacksdata: data})
         
       })
       .catch((error) => {
         console.error("Failed to retrieve data : ", error);
       });
   })
   .catch((error) => {
     console.error("Unable to create table : ", error);
   });
};

const getPagination = (page) => {
  const limit = 5;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};



//-----------------------Filteration---------------
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
          res.render("admin/getCarByPrice")
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


const filterUsers = (req, res) => {
  sequelize
    .sync()
    .then(() => {
        User.findAll({
        where: {
          id: {
            [Op.between]: [req.body.FromID, req.body.ToID]
          }
        }
      })
        .then((data) => {
          console.log(data);
          res.render("admin/getUserByID");
        })
        .catch((error) => {
          console.error("Failed to retrieve data : ", error);
        });
    })
    .catch((error) => {
      console.error("Unable to create table : ", error);
    });
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
          res.render("admin/getBikeByID")
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
          res.render("admin/getSPbyPrice")
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
  signUpUser,
  addInCarsTable,
  addInSparePartsTable,
  deleteFomCars,
  deleteFomSpareParts,
  deleteFomUser,
  upadteCars,
  upadteSpareParts,
  upadteUsers,
  retriveteCarsByID,
  retriveteSparePartsByID,
  signInAdmin,
  addInBikesTable,
  retriveteBikesByID,
  deleteFomBikes,
  upadteBikes,
  paginatebikes,
  paginatespareparts,
  paginatecars,
  paginateuser,
  filterBikes,
  filterCars,
  filterSpareParts,
  filterUsers,
  paginateFeedback,
  logout
};
