module.exports = {
  port: process.env.PORT || 8000,
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2',
  sessionSecret: process.env.SESSION_SECRET || 'YghT5s617/1{%sDt'
};
