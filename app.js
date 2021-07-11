const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
const items = ['Go to College', 'Eat Lunch', 'Play Badminton'];
const workItems = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res){

  const day = date.getDate();
  res.render('list', {listItem: day, Items: items});
});

app.post('/', function(req, res){
  const item = req.body.NewItem;

  if (req.body.list === 'Work'){
    workItems.push(item);
    res.redirect('/work');
  }

  else{
    items.push(item);
    res.redirect('/');
  }

});

app.get('/work', function(req, res){
  res.render('list', {listItem: 'Work List', Items: workItems});
});

app.post('/work', function(req,res){
  workItems.push(req.body.NewItem);
  res.redirect('/work');
});

app.get('/about', function(req, res){
  res.render('about');
})


app.listen(3000, function(){
  console.log('Server is running on port 3000');
});
