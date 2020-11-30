const db = require('../../config/mysql2/db');

exports.getReviews = () => {
    const query = `SELECT review._id as review_id, review.rate, review.date, review.message, meal._id as meal_id, meal.name,
            meal.description, visitor._id as visitor_id, visitor.firstName, visitor.lastName
        FROM Review review 
        left join Visitor visitor on review.visitor_id = visitor._id
        left join Meal meal on review.meal_id = meal._id`
    return db.promise().query(query)
        .then( (results, fields) => {
            const reviews = [];
            for(let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                const review = {
                    _id: row.review_id,
                    rate: row.rate,
                    date: row.date,
                    message: row.message,
                    meal: {
                        _id: row.meal_id,
                        name: row.name,
                        description: row.description
                    },
                    visitor: {
                        _id: row.visitor_id,
                        firstName: row.firstName,
                        lastName: row.lastName
                    }
                };
                reviews.push(review);
            }
            console.log(reviews);
            return reviews;
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getReviewById = (reviewId) => {
    const query = `SELECT review._id as review_id, review.rate, review.date, review.message, meal._id as meal_id, meal.name,
            meal.description, visitor._id as visitor_id, visitor.firstName, visitor.lastName
        FROM Review review 
        left join Visitor visitor on review.visitor_id = visitor._id
        left join Meal meal on review.meal_id = meal._id
        where review._id = ?`
    return db.promise().query(query, [reviewId])
        .then( (results, fields) => {
            const row = results[0][0];
            if(!row) {
                return {};
            }
            const review = {
                _id: reviewId,
                rate: row.rate,
                date: row.date,
                message: row.message,
                meal: {
                    _id: row.meal_id,
                    name: row.name,
                    description: row.description
                },
                visitor: {
                    _id: row.visitor_id,
                    firstName: row.firstName,
                    lastName: row.lastName
                }
            };
            console.log(review);
            return review;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createReview = (data) => {
    data.message = data.message ? data.message : null;
    console.log('createReview');
    console.log(data);
    const sql = 'INSERT into Review (visitor_id, meal_id, rate, date, message) VALUES (?, ?, ?, ?, ?)';
    return db.promise().execute(sql, [data.visitorId, data.mealId, data.rate, data.date, data.message]);
};

exports.updateReview = (reviewId, data) => {
    data.message = data.message ? data.message : null;
    const sql = `UPDATE Review set visitor_id = ?, meal_id = ?, rate = ?, date = ?, message = ? where _id = ?`;
    return db.promise().execute(sql, [data.visitorId, data.mealId, data.rate, data.date, data.message, reviewId]);
}

exports.deleteReview = (reviewId) => {
    const sql = 'DELETE FROM Review where _id = ?'
    return db.promise().execute(sql, [reviewId]);
}

exports.deleteManyReviews = (reviewIds) => {
    const sql = 'DELETE FROM Review where _id IN (?)'
    return db.promise().execute(sql, [reviewIds]);
}