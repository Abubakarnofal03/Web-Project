const express = require('express')
const router = express.Router()
const {isUser} = require('../midlleWare/authJwt.Md')
const fuction = require('../controllers/user.Controllers')
const check = require("../midlleWare/checkDuplicate")

app.use("/Images",express.static('Images'))
// router.post('/signUpUser' , check , fuction.signUpUser);
// router.get('/signIn' , check , fuction.signInUser);

router.get("/AboutUs", (req, res) => { res.render("user/AboutUs"); });
router.get("/ContactUs", (req, res) => { res.render("user/ContactUs"); })
router.post("/ContactUs" , fuction.nodemailerfunction)

router.get("/signIn", (req, res) => { res.render("user/signIn"); });
router.post('/signIn' , fuction.signInUser);
router.post('/addusers'  , fuction.signUpUser)

router.get("/userhome", (req, res) => { res.render("user/UsersHome"); })

router.get('/Cars'  , fuction.paginatecars)
router.get('/Bikes'  , fuction.paginatebikes)
router.get('/Spareparts' , fuction.paginatespareparts)

router.get("/addcars", (req, res) => { res.render("user/addCar"); });
router.get("/addbikes", (req, res) => { res.render("user/addBike"); });
router.get("/addspareparts", (req, res) => { res.render("user/addSpareparts"); });
router.post('/addcars'  , fuction.addInCarsTable)
router.post('/addbikes' ,  fuction.addInBikesTable)
router.post('/addspareparts' , fuction.addInSparePartsTable)




router.get("/retrivecarsbyid", (req, res) => { res.render("user/getCarByID"); });
router.post('/retrivecarsbyid' , fuction.retriveteCarsByID)

router.get("/retrivebikesbyid", (req, res) => { res.render("user/getBikeByID"); });
router.post('/retrivebikesbyid' , fuction.retriveteBikesByID)

router.get("/searchCarsbyPrice", (req, res) => { res.render("user/getCarByPrice"); })
router.post('/searchCarsbyPrice', fuction.filterCars)

router.get("/searchBikesbyPrice", (req, res) => { res.render("user/getBikeByPrice"); })
router.post('/searchBikesbyPrice', fuction.filterBikes)

router.get("/retrivesparepartsbyid", (req, res) => { res.render("user/GetSPbyID"); })
router.post('/retrivesparepartsbyid', fuction.retriveteSparePartsByID)

router.get("/searchSparePartsbyPrice", (req, res) => { res.render("user/getSPbyPrice"); });
router.post('/searchSparePartsbyPrice', fuction.filterSpareParts)




router.post("/logout" , fuction.logout)


router.get('*', function(req, res){
    res.status(404).send('404 error: page not found');
  });

module.exports = router