const app = require('./server');
require('./database');


app.listen(app.get('port'), () => {
   console.clear()
   console.log(`Server on http://localhost:${app.get('port')}`)
})