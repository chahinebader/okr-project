const Team = require('../../model/team');
const User = require('../../model/user');


module.exports = {
  teams: async ({company}) => {
    try {
      const teams = await Team.find({company:company});
     return teams.map(team => {
        return { ...team._doc, _id: team.id };
      });
    } catch (err) {
      throw err;
    }
  },
  createTeam: async args => {
    try {
      const existingTeam = await Team.findOne({ name: args.teamInput.name });
      if (existingTeam) {
        throw new Error('Team exists already.');
      }
      let team = new Team({
        name: args.teamInput.name,
        color: args.teamInput.color,
        creator:args.teamInput.creator,
        company:args.teamInput.company,
      });
     
      user = await User.findById(args.teamInput.creator);
      if(user){
      user.team.push(team)
      await user.save();
      }
      for(const id of args.teamInput.users){
        user = await User.findById(id);
        if(!user){
          throw new Error('User exists already.');  
        }
         await team.users.push(user);
         user.team.push(team);
         await user.save();
      }
     const result = await team.save();
     return { ...result._doc, _id: result.id };
    } catch (err) {
      throw err;
    }
  },

  deleteTeam: async ({id}) =>{
     try{
      //Delete en Cascad
      // First Delete ref team from user    
        const team = await Team.findById(id);
        if (!team) {
          throw new Error('Team does not exist!');
        }
        for(const idUser of team.users){
           const user= await User.findById(idUser);
           const teams = user.team;
           const index=teams.indexOf(id);
           teams.splice(index,1);
           const res= await User.findOneAndUpdate({_id: idUser},{team: teams}); 
          
        }
        // Next delete team
        const res = await Team.findByIdAndDelete({_id: id});
        if (!res) {
          throw new Error('Team does not exist!');
        }
   
    return res;
    }catch(err){
         throw err;
    }
   
  },
  
  updateTeam: async args =>{
    try{
      
     const team = await Team.findById(args.teamUpdate._id);
     if (!team) throw new Error('Team does not exist!');
     let listUser = team.users;  
    
      // Add ref team to new users
      for(let i of args.teamUpdate.users){
        if(listUser.indexOf(i+'') == -1){
          let user = await User.findById(i);
          if(!user) throw new Error('User dose not exist!');
          let teams =user.team;
          teams.push(args.teamUpdate._id);
          console.log(teams);
          
          let res =await User.findByIdAndUpdate(i,{team: teams});
         
        }
      }
      
       // delete ref team into old users
      for(let j of listUser){
        if(args.teamUpdate.users.indexOf(j+'') ===-1){
         
          let user = await User.findById(j);
          if(!user) throw new Error('User dose not exist!');
          let teams =user.team;
          let index=teams.indexOf(args.teamUpdate._id);
          teams.splice(index,1);
          let res =await User.findByIdAndUpdate(j,{team: teams});
          
        } 
          
        
       }
      // update team items
      const res = await Team.findOneAndUpdate({_id: args.teamUpdate._id},args.teamUpdate);
      if (!res) {
            throw new Error('Team does not exist!');
       }
        return { ...res._doc, _id: res.id };

    }catch(err){
        throw err;
    }
   
  }

};