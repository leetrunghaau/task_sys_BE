const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Load environment variables from .env file
dotenv.config();

// List of allowed origins (CORS)
const allowedOrigins = ["http://localhost","http://s.com", "http://h.com"];

// CORS options configuration
const corsOptions = {
  origin: (origin, callback) => {

    // cách 1 thêm điều kiện niếu origin bằng undefined thì co nó pass luôn
    // ví dụ:
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Use CORS middleware with the defined options

// Parse JSON body
app.use(express.json());

// Routes
const apiRoutes = require('./v1/routes/index');
const { errorMiddleware } = require('./v1/middlewares/error-middleweara');
app.use(cors(corsOptions));
app.use('/api/v1', apiRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
