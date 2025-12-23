// const express = require('express');
// const cors = require('cors');
// const routes = require('./controllers/title.controller.js');

// const app = express();
// require('dotenv').config();
// app.use(cors());
// app.use(express.json());



// app.use('/api', routes);

// app.listen(5000, () => {
//     console.log('Server running on port 5000');
//     console.log("DB URL:", process.env.DATABASE_URL);


// });

const express = require('express');
const app = express();
const cors = require('cors');
const titleRoutes = require('./routes/title.routes');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', titleRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
