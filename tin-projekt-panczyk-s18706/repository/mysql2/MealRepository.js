const db = require('../../config/mysql2/db');

exports.getMeals = () => {
    return db.promise().query('SELECT * FROM Meal')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getMealById = (mealId) => {
    const query = `SELECT v._id as _id, v.name, v.description, review._id as review_id,
        review.rate, review.date, visitor._id as visitor_id, review.message, visitor.firstName, visitor.lastName 
    FROM Meal v 
    left join Review review on review.meal_id = v._id
    left join Visitor visitor on review.visitor_id = visitor._id 
    where v._id = ?`
    return db.promise().query(query, [mealId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }
            const meal = {
                _id: parseInt(mealId),
                name: firstRow.name,
                description: firstRow.description,
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
                        visitor: {
                            _id: row.visitor_id,
                            firstName: row.firstName,
                            lastName: row.lastName
                        }
                    };
                    meal.reviews.push(reviews);
                }
            }
            return meal;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createMeal = (newMealData) => {
    const name = newMealData.name;
    const description = newMealData.description;
    const sql = 'INSERT into Meal (name, description) VALUES (?, ?)'
    return db.promise().execute(sql, [name, description]);
};

exports.updateMeal = (mealId, mealData) => {
    const name = mealData.name;
    const description = mealData.description;
    const sql = `UPDATE Meal set name = ?, description = ? where _id = ?`;
    return db.promise().execute(sql, [name, description, mealId]);
};

exports.deleteMeal = (mealId) => {
    const sql1 = 'DELETE FROM Review where meal_id = ?'
    const sql2 = 'DELETE FROM Meal where _id = ?'

    return db.promise().execute(sql1, [mealId])
        .then(() => {
            return db.promise().execute(sql2, [mealId])
        });
};