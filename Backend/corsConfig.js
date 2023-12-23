// corsConfig.js

const corsOptions = {
    origin: 'http://localhost:8001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  export default corsOptions;
  