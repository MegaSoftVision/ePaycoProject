const History = require('../models/History');

module.exports = {
    index: async (req, res) => {
        await History.find({}).sort({date: 'desc'})
          .then(elements => {
            const context = {
                elements: elements.map(element => {
                    return {
                        date: element.date,
                        concept: element.concept,
                        wallet: element.wallet,
                        user: element.user,
                        _id: element._id
                    }
                    
                })
            }
            console.log(context);
            res.render('history/all-movements', {elements: context.elements }) 
        })
    },
    confirm_payment: async(req, res) =>{

    }
};