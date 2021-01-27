export default {
  port: process.env.PORT || 3000,
  DB: {
    URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/restapijwttspassport_db',
    USER: process.env.MONGO_USER,
    PASSWORD: process.env.MONGO_PASSWORD
  },
  secretKey: process.env.SECRET_KEY || 'T_LHqi1hEFpsxPZ2heE.wkUKn3k3QSw.DdEK4EQ'
}