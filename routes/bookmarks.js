var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	console.log(req.body.url);	
	if (req.body) {
		
		res.send(req.body);

	}	
	else {
		res.send('sup');;
	}
});

router.get('/', function(req, res, next) {
        console.log(req.body.url);
        res.send('find your bookmarks here');
});

module.exports = router;
