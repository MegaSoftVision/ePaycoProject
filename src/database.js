const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/epayco-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db => console.log('DB esta conectado'))
.catch(err => console.error(err));
