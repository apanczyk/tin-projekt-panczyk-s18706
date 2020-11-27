const db = require('../../config/mysql2/db');

exports.getVisitors = () => {
    return db.promise().query('SELECT * FROM Visitor')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getVisitorById = (visitorId) => {
    const query = `SELECT v._id as _id, v.firstName, v.lastName, review._id as review_id,
        review.rate, review.date, meal._id as meal_id, review.message, meal.name, meal.description 
    FROM Visitor v 
    left join Review review on review._id = v._id
    left join Meal meal on review._id = meal._id 
    where v._id = ?`
    return db.promise().query(query, [visitorId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const visitor = {
                _id: parseInt(visitorId),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                reviews: []
            }
            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.review_id) {
                    const reviews = {
                        _id: row.review_id,
                        rate: row.rate,
                        date: row.date,
                        message: row.message,
                        meal: {
                            _id: row.meal_id,
                            name: row.name,
                            description: row.description
                        }
                    };
                    visitor.reviews.push(reviews);
                }
            }
            return visitor;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createVisitor = (newVisitorData) => {
    const firstName = newVisitorData.firstName;
    const lastName = newVisitorData.lastName;
    const sql = 'INSERT into Visitor (firstName, lastName) VALUES (?, ?)'
    return db.promise().execute(sql, [firstName, lastName]);
};

exports.updateVisitor = (visitorId, visitorData) => {
    const firstName = visitorData.firstName;
    const lastName = visitorData.lastName;
    const sql = `UPDATE Visitor set firstName = ?, lastName = ? where _id = ?`;
    return db.promise().execute(sql, [firstName, lastName, visitorId]);
};

exports.deleteVisitor = (visitorId) => {
    const sql1 = 'DELETE FROM Review where visitor_id = ?'
    const sql2 = 'DELETE FROM Visitor where _id = ?'

    return db.promise().execute(sql1, [visitorId])
        .then(() => {
            return db.promise().execute(sql2, [visitorId])
        });
};