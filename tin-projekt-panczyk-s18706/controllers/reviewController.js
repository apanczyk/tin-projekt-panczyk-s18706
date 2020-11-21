exports.showReviewList = (req, res, next) => {
    res.render('pages/review/list', { navLocation: 'review' });
}

exports.showReviewAdd = (req, res, next) => {
    res.render('pages/review/form', { navLocation: 'review' });
}

exports.showReviewDetails = (req, res, next) => {
    res.render('pages/review/details', { navLocation: 'review' });
}

exports.showReviewEdit = (req, res, next) => {
    res.render('pages/review/edit', { navLocation: 'review' });
}

