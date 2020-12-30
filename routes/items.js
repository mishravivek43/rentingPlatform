const app = require('express');
let router = app.Router();

let itemsController = require('../controllers/itemsController');
let apiService = require('../services/apiKeyVerification'); //middleware to verify apiKey

//------------------------------------ CRUD routers (api) ---------------------------

router.post('/getAllUser', itemsController.getAllItems);
router.post('/updateUser', apiService, itemsController.updateUser);

router.post('/createUser', itemsController.createUser);

module.exports = router;