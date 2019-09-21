const Reunion = require('../../model/reunion');
const User = require('../../model/user');
const Team = require('../../model/team');
const { dateToString } = require('../../helpers/date');

module.exports = {
  reunions: async ({company}) => {
    try {
      const reunions = await Reunion.find({company:company});
     return reunions.map(reunion => {
        return { ...reunion._doc, start: dateToString(reunion._doc.start), _id: reunion.id };
      });
    } catch (err) {
      throw err;
    }
  },
  reunionsbyCreator: async ({id}) => {
    try {
      const reunions = await Reunion.find({creator:id});
     return reunions.map(reunion => {
        return { ...reunion._doc, start: dateToString(reunion._doc.start), _id: reunion.id };
      });
    } catch (err) {
      throw err;
    }
  },
  
  reunionsbyMembre: async ({id}) => {
    try {
      const reunions= await Reunion.find();
      let All=[];
      for(let reunion of reunions){
         const team = await Team.findById(reunion.team);
        for (let userID of team.users){
          if(userID+'' === id+''){
           let obj ={
             title: reunion.title,
             start:  dateToString(reunion.start),
             end: reunion.end,
             creator:reunion.creator
           }
           All.push(obj);
        }
      }
    }
      return All;
    } catch (err) {
      throw err;
    }
  },
  createReunion: async args => {
    try {
      
      let reunion = new Reunion({
        title: args.reunionInput.title,
        team: args.reunionInput.team,
        start: new Date(args.reunionInput.start),
        creator: args.reunionInput.creator,
        company:args.reunionInput.company,
      });
     const result = await reunion.save();;
     return { ...result._doc, start: dateToString(result._doc.start), _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  ReunionInWeek: async ({company:company}) => {
    try {
     const reunions = await Reunion.find({company:company});
     let date= new Date();
     var first = date.getDate() - date.getDay(); 
     var last = first + 6;
     var firstday = new Date(date.setDate(first));
     var lastday = new Date(date.setDate(last));
     All=[];
     for(let reunion of reunions){
          let dateReunion= new Date(reunion.start);
          if((dateReunion>= firstday) && (dateReunion<=lastday)){
            let creator = await User.findById(reunion.creator);
            let team =await Team.findById(reunion.team);
          var obj={
            _id:reunion._id,
            start:dateToString(reunion.start),
            title: reunion.title,
            creator:creator,
            team: team
          };
          All.push(obj)
          }
         
       }
       return All;
    } catch (err) {
      throw err;
    }
  },

};