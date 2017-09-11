'use strict';

const db = require('../db');

module.exports = {
    GetReadings: getReadings
};

function getReadings(req, response, next) {
    console.log("Query params:", req.query);

    var queryString = 'SELECT * FROM energydash';
    if (req.query.startDate) {
        queryString += ` WHERE time >= '${ req.query.startDate }'`;
        if (req.query.endDate) {
            queryString += ` AND time <  '${ req.query.endDate }'`;
        }
    } else if (req.query.endDate) {
        queryString += ` WHERE time < '${ req.query.endDate }'`;
    }

    // safety net
    var limit = 1000;

    if (req.query.limit) {
        limit = req.query.limit;
    }
    queryString += ` LIMIT ${ limit };`;

    console.log("== Sending query:", queryString);
    db.query(queryString, (err, res) => {
        if (err) {
            return next(err);
        }
        response.json(res.rows);
    })
}
