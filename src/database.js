const mongoose = require('mongoose');

const dbAdress =
  'mongodb+srv://english-notebook-databases:UhOX1Lon4EmVBkzS@cluster0-7nkto.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(dbAdress, {
   
    useNewUrlParser: true,
    
  })
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));
