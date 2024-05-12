const express = require('express')
const router = express.Router()
const {isAdmin} = require('../midlleWare/authJwt.Md')
const fuction = require('../controllers/admin.Controllers')
const check = require("../midlleWare/checkDuplicate")



router.get("/signIn", (req, res) => { res.render("admin/signIn"); });

router.get("/adminhome", (req, res) => { res.render("admin/adminhome"); })


router.post('/signIn' , fuction.signInAdmin);

router.post('/addusers'  , fuction.signUpUser)
router.post('/addcars'  , fuction.addInCarsTable)
router.post('/addbikes' ,  fuction.addInBikesTable)
router.post('/addspareparts' , fuction.addInSparePartsTable)


router.get("/retrivecarsbyid", (req, res) => { res.render("admin/getCarByID"); });
router.post('/retrivecarsbyid' , fuction.retriveteCarsByID)

router.get("/retrivebikesbyid", (req, res) => { res.render("admin/getBikeByID"); });
router.post('/retrivebikesbyid' , fuction.retriveteBikesByID)

router.get("/searchCarsbyPrice", (req, res) => { res.render("admin/getCarByPrice"); })
router.post('/searchCarsbyPrice', fuction.filterCars)

router.get("/searchBikesbyPrice", (req, res) => { res.render("admin/getBikeByPrice"); })
router.post('/searchBikesbyPrice', fuction.filterBikes)

router.get("/retrivesparepartsbyid", (req, res) => { res.render("admin/GetSPbyID"); })
router.post('/retrivesparepartsbyid', fuction.retriveteSparePartsByID)

router.get("/searchSparePartsbyPrice", (req, res) => { res.render("admin/getSPbyPrice"); });
router.post('/searchSparePartsbyPrice', fuction.filterSpareParts)

router.get("/searchUsers", (req, res) => { res.render("admin/getUserByID"); });
router.post('/searchUsers' , fuction.filterUsers)

router.get("/updateusers", (req, res) => { res.render("admin/updateUser"); });
router.post('/updateusers', fuction.upadteUsers)

router.get("/updatecars", (req, res) => { res.render("admin/updateCar"); });
router.post('/updatecars', fuction.upadteCars)

router.get("/updatebikes", (req, res) => { res.render("admin/updateBike"); });
router.post('/updatebikes', fuction.upadteBikes)

router.get("/updatespareparts", (req, res) => { res.render("admin/updateSpareparts"); });
router.post('/updatespareparts', fuction.upadteSpareParts)




router.get("/addcars", (req, res) => { res.render("admin/addCar"); });
router.get("/addusers", (req, res) => { res.render("admin/addUser"); });
router.get("/addbikes", (req, res) => { res.render("admin/addBike"); });
router.get("/addspareparts", (req, res) => { res.render("admin/addSpareparts"); });

router.get("/deletecars", (req, res) => { res.render("admin/delCar"); });
router.get("/deleteusers", (req, res) => { res.render("admin/delUser"); });
router.get("/deletebikes", (req, res) => { res.render("admin/delBike"); });
router.get("/deletespareparts", (req, res) => { res.render("admin/delSpareparts"); });

router.get("/Feedbacks", fuction.paginateFeedback)
router.get('/Cars'  , fuction.paginatecars)
router.get('/Bikes'  , fuction.paginatebikes)
router.get('/Spareparts' , fuction.paginatespareparts)
router.get('/Users' , fuction.paginateuser)

router.post('/deleteusers' ,  fuction.deleteFomUser)
router.post('/deletecars' ,  fuction.deleteFomCars)
router.post('/deletebikes' ,  fuction.deleteFomBikes)
router.post('/deletespareparts' , fuction.deleteFomSpareParts)

router.post("/logout" , fuction.logout)

router.get('*', function(req, res){
    res.status(404).send('404 error: page not found');
  });

module.exports = router