const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/Chat',{
    useNewUrlParser:true,useUnifiedTopology:true,
})

.then(db => console.log("base conectada"))
.catch(err=> console.error(err));

module.exports=mongoose