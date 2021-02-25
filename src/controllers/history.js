const History = require('../models/History');

module.exports = {
    index: async (req, res) => {
        await History.find({}).sort({date: 'desc'})
          .then(movements => {
            const context = {
                movements: movements.map(movement => {
                    return {
                        date: movement.date,
                        concept: movement.concept,
                        wallet: movement.wallet,
                        user: movement.user,
                        _id: movement._id
                    }
                    
                })
            }
            console.log(context);
            res.render('history/all-movements', {movements: context.movements }) 
        })
    }
};