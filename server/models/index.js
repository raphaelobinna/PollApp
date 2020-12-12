const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
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
