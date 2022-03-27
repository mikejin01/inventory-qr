const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;


//if (process.env.NODE_ENV === "production") {
	app.use(express.static('build'))
	app.get('*', (req, res) => {
		req.sendFile(path.resolve(__dirname, 'buikd', 'index.html'));
	})/**/
//}

/*app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/',function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
});*/

app.listen(port, (err) => {
	if (err) return console.log(err);
	//console.log('Server running on port: !', port);
	console.log('Server running on port: ', port);
})