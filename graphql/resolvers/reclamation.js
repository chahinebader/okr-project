const Reclamation = require('../../model/reclamation');
const User =  require('../../model/user');
const { dateToString } = require('../../helpers/date');


module.exports = {
  reclamations: async () => {
    try {
      const reclamations = await Reclamation.find();
     return reclamations.map(reclamation => {
        return { ...reclamation._doc,date: dateToString(reclamation._doc.date), _id: reclamation.id };
      });
    } catch (err) {
      throw err;
    }
  },
  reclamationsUser: async ({id}) => {
    try {
      const reclamations = await Reclamation.find({admin: id});
     return reclamations.map(reclamation => {
        return { ...reclamation._doc,date: dateToString(reclamation._doc.date), _id: reclamation.id };
      });
    } catch (err) {
      throw err;
    }
  },

  createReclamation: async args => {
    try {
     
      
      let reclamation = new Reclamation({
        objet: args.reclamationInput.objet,
        description : args.reclamationInput.description,
        admin: "5c6bfec8e5001a2c7cb08ad4",
        date: new Date(args.reclamationInput.date) 
        
      });
       
      user = await User.findById(reclamation.admin);
      if(!user){
        throw new Error('User exists already.');  
      }
      user.reclamation.push(reclamation);
      await user.save();
     
      const result = await reclamation.save();
      return { ...result._doc,date: dateToString(result._doc.date), _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  
  deleteReclamation: async ({id}) =>{
     try{
           //delete reclamation from user
           const reclamation = await Reclamation.findById(id);
           if(!reclamation){
             throw new Error('Reclamation does not existe!');
           }
           const idUser = reclamation.admin;
           const user= await User.findById(idUser);
           const reclamations = user.reclamation;
           const index=reclamations.indexOf(id);
           reclamations.splice(index,1);
           const res= await User.findOneAndUpdate({_id: idUser},{reclamation: reclamations}); 
          
          // delete reclamation
           const result = await Reclamation.findByIdAndDelete({_id: id});
           if (!result) {
               throw new Error('Reclamation does not exist!');
           }
           return result;
           }catch(err){
            throw err;
           }
   
  },
  updateReclamation: async args => {
    try{
      const exist = await Reclamation.findById(args.reclamationUpdate._id);
      if(!exist) {  throw new Error('Reclamation does not exist!');}

        const res = await Reclamation.findOneAndUpdate({_id: args.reclamationUpdate._id},args.reclamationUpdate);
   
        if (!res) {
         throw new Error('Reclamation does not exist!');
         }
     return { ...res._doc, _id: res.id };
    }catch(err){
    throw err;
    }
  }
};