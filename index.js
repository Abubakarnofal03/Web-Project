const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const hostname = '127.0.0.1';
const port = 3000;
const path = require("path")
app.use("/Images",express.static('Images'))

const userroute = require('./routes/user.route');
const adminroute = require('./routes/admin.route');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


const public = path.join(__dirname, "/public");
app.use(express.static(public));


app.use('/landing', (req, res) => {
  res.render('landingPage');
});
app.use('/whoseThere', (req, res) => {
  res.render('whoseThere');
});

app.use('/user', userroute)
app.use('/admin', adminroute)

app.use('/signup', (req, res) => {
  res.render('user/addUser');
});

app.get('*', function(req, res){
    res.status(404).send('404 error: page not found');
  });



app.listen(port, hostname, () => {
    console.log(`Running At http://${hostname}:${port}/`);
})