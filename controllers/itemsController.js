let queryController = require('../services/databaseQueries');
let users = require('../models/usersModel');
let items = require('../models/itemsModel');
// let debug = require('debug')('spyne:server')
let moment = require('moment-timezone')
let mongoose = require('mongoose')


let jwt = require('jsonwebtoken');

let itemsController = {}

itemsController.getAllItems = async(req,res) =>{
try {


        let reqBody = JSON.parse(JSON.stringify(req.body));
        let query = {
            isActive: true
        }

        if (reqBody.userId) {
            query['_id'] = reqBody.itemId
        }
        if (reqBody.email) {
            query['name'] = reqBody.name
        }
        if (reqBody.username) {
            query['username'] = reqBody.username
        }

        //Find users
        await queryController.findByQuery(items, query)
            .then(docs => {
                if (docs.length == 0) {
                    error = "No data found!!"
                    return res.status(200).type('application/json').send({
                        "statusCode": 404,
                        "statusMsg": "No records found!!!"
                    });

                }

                return res.status(200).type('application/json').send({
                    statusCode: 200,
                    statusMsg: "Success",
                    dataArr: docs
                });

            })
            .catch(error => {
                console.log("Error: ", error);
                return res.status(200).type('application/json').send({
                    "statusCode": 425,
                    "statusMsg": error.message
                });
            });
    } catch (error) {
        console.log("Catch Error: ", error);
        return res.status(200).type('application/json').send({
            statusCode: 400,
            statusMsg: "Failed",
            msg: 'some error occured'

        });

    }

}
itemsController.createItem = function (req, res) {
    let reqBody = JSON.parse(JSON.stringify(req.body));
    console.log(req.body);
    try {
        //create user query
        queryController.createOne(items, reqBody)
            .then(docs => {

                return res.status(200).type('application/json').send({
                    statusCode: 200,
                    statusMsg: "Success",
                });

            })
            .catch(error => {
                console.log("Error: ", error);
                return res.status(200).type('application/json').send({
                    statusCode: 400,
                    statusMsg: "Failed",
                    msg: 'username already taken'

                });

            });
    } catch (error) {
        console.log("Catch Error: ", error);
        return res.status(200).type('application/json').send({
            statusCode: 400,
            statusMsg: "Failed",
            msg: 'some error occured'

        });

    }

}
itemsController.updateItem = async (req, res) => {
    try {
        let today = moment();
        let time = moment().format('hh:mm:ss');

        let reqBody = JSON.parse(JSON.stringify(req.body));
        console.log("userController.updateUser -> reqBody", reqBody)
        let docId = reqBody.query._id;

        let docToBeUpdated = await queryController.findOne(items, {
            _id: mongoose.Types.ObjectId(reqBody.query._id)
        });

        docToBeUpdated = JSON.parse(JSON.stringify(docToBeUpdated))
        docToBeUpdated.updateDetails = docToBeUpdated.updateDetails ?
            docToBeUpdated.updateDetails : []
        docToBeUpdated.updateDetails.push({
            date: today,
            time: time
        });

        let updateObj = Object.assign(docToBeUpdated, reqBody);  //merge objects and update

        queryController.updateOne(items, { '_id': docId }, updateObj)
            .then(docs => {
                if (docs.length == 0) {
                    error = "No data found!!"

                    return res.status(200).type('application/json').send({
                        "statusCode": 404,
                        "statusMsg": error
                    });
                }

            })
            .catch(error => {
                console.log("Error: ", error);

                return res.status(200).type('application/json').send({
                    "statusCode": 425,
                    "statusMsg": error.message
                });
            });
    } catch (error) {
        console.log("Error: ", error);

        return res.status(200).type('application/json').send({
            "statusCode": 425,
            "statusMsg": error.message
        });
    }

}

module.exports = itemsController;
