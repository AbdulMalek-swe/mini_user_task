var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
module.exports.dbConnect = () => {
    mongoose
        .connect(process.env.MONGO_DB_CONNECTION_NAME)
        .then(res => console.log("DATABASE CONNECTED" ))
        .catch(err => console.log(err.message,"not connected"))
}