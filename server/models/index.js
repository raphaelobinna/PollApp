const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://poll:poll@cluster0.vd0hv.mongodb.net/poll?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log(`MongoDB is running on ${conn.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
module.exports = connectDB;
