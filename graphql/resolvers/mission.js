const Mission = require('../../model/mission');
const User = require('../../model/user');
const {transformMission,transformMissiontree} = require('../resolvers/merge');
const {deleteObjectif} =require('./objectif');

module.exports = {
    missiontreebyid: async ({id})=> {
        try {
            const mission = await Mission.findById(id);
            return transformMissiontree(mission);

        }
        catch (err)
        {
            throw err ;
        }

    },
    missiontree: async ({company}) => {
        try {
       const missions = await Mission.find({ company: company });
            return missions.map(mission=> {
                return transformMissiontree(mission)
            });
           }
           catch(err){
               throw err ;
           }     
    } ,
    missions: async ({company}) => {
        try {
       const missions = await Mission.find({ company: company });
            return missions.map(mission=> {
                return transformMission(mission)
            });
           }
           catch(err){
               throw err ;
           }     
    } ,
    missioncalendar: async ({userid}) => {
        try {
            let ListColor1=['#BCF5A9','#58ACFA','#FF8000','#A9A9F5','#F781BE','#A5DF00','#A9F5D0','#D0A9F5','#2EFEC8','#819FF7'];
            let ListColor=['#FF8A47','#FC6170','#8CEEEE','#26BFBF','#FFD747','#82EDD6','#3BA7EF','#DAE560','#D89CD0','#819FF7'];
            // calendar admin
            
            const missions = [];
            const user = await User.findById(userid);
            let arraymissions = user.mission ;
            let x=0;
            for (let item of arraymissions) {
                let mission = await Mission.findById(item);
                missions.push(mission);                
            }
            return missions.map(mission=> {
               
                let obj ={
                    title:mission.title,
                    start: new Date(mission.date_begin).toISOString(),
                    end:new Date(mission.date_end).toISOString(),
                    color :ListColor[x]
                }
                x++;
                return obj;
            });
                }
                catch(err){
                    throw err ;
                } 
    },
    missionbyid: async ({id}) => {
        try {
            const mission = await Mission.findById(id);
            return mission;

        }
        catch(err){
            throw err ;
        }  

    },
    createMission: async args => {
        mission = new Mission ({
        title: args.missionInput.title,
        description: args.missionInput.description,
        date_begin: new Date(args.missionInput.date_begin),
        date_end: new Date(args.missionInput.date_end),
        creator: args.missionInput.userid,
        company: args.missionInput.company,
        });
        let createdmission ;
        try {
      const result = await mission.save()
      createdmission = transformMission(result);
           const usercreator = await User.findById(args.missionInput.userid) ;              
            if (!usercreator) {
                throw new Error ('you must sign in !');
            }
            usercreator.mission.push(mission);
            await usercreator.save();

            return createdmission ;
        }                 
        catch(err) {
            throw err ;
        }
        
    },
    updateMission: async args => {
        const res = await Mission.findOneAndUpdate({_id: args.missionInputUpdate._id},args.missionInputUpdate);
        if (!res) {
           throw new Error('Mission does not exist!');
       }
         return { ...res._doc, _id: res.id };
        
      },
      deleteMission: async ({id}) => {
        try {
            const mission = await Mission.findById(id);
            const idMission = mission.creator ;
            const user= await User.findById(idMission);
            const missions = user.mission;
            const index=missions.indexOf(id);
            missions.splice(index,1);             
            await User.findOneAndUpdate({_id: idMission},{mission: missions}); 
          
          // delete on cascade 
          const listobjectif = mission.objective ;
          for (let objectifid of listobjectif) {
           
            const  res = await deleteObjectif({id: objectifid}) ;
        }
        const result = await Mission.findOneAndDelete({_id: id});
        return result ;
 }
 catch (err) {
     throw err ;
 }
},

};