export default {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    jwt: process.env.JWT || 'stubJWT'
  },
  api: {
    base_url: process.env.BASE_URL || 'https://powerful-lake-14918.herokuapp.com/api'
  }
};
