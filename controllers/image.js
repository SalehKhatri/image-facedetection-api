const clarifai=require('clarifai');

const handleImage=(req,res,db)=>{
  const {id}=req.body;

  db('users').where("id","=",id)
  .increment('entries',1)
  .returning('entries')
  .then(results=>{
    return results.map(result => result.entries);
  })
  .then(entries=>res.json(entries))
    .catch(err=>{
    res.status(400).json("Unable to get entries")
  })

}
module.exports ={
  handleImage
}