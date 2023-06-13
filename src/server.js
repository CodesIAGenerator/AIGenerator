const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));

// Aquí puedes definir tus rutas...

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
