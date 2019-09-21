const Objectif = require('../../model/objectif');
const Team = require('../../model/team');
const User = require('../../model/user');
const Mission = require('../../model/mission');
const Notification = require('../../model/notification');
const {transformObjectif,transformObjectiftree} = require('../resolvers/merge');
const {deletekeyresult} = require ('./keyResult');
const axios = require('axios');

module.exports = {
    objectiftreebyid: async ({id}) => {
        try {
            const objectif = await Objectif.findById(id);
            return transformObjectiftree(objectif);
      

        }
        catch (err)
        {
            throw err ;
        }

    },
    objectifs: async ({company}) => {
        try {
       const objectifs = await Objectif.find({company: company});
            return objectifs.map(objectif=> {
                return transformObjectif(objectif)
            });
           }
           catch(err){
               throw err ;
           }      
    } ,
    objectifbyuserid: async ({userid}) => {
        try {
            const objectifs = [];
            const user = await User.findById(userid);
            let arrayobjectifs = user._doc.objective ;
            for (let item of arrayobjectifs) {
                let objectif = await Objectif.findById(item);
                objectifs.push(objectif);                
            }
            return objectifs.map(objectif=> {
                return transformObjectif(objectif)
            });
                }
                catch(err){
                    throw err ;
                } 
    },
    objectifsbymissionid : async ({id}) => {
        try {
            const objectifbyid = await Objectif.find({'mission': id})
            return objectifbyid.map(objectif => {
                return transformObjectif(objectif);
            });

        }
        catch (err) {
            throw err ;
        }
    },
    associateteamtoobjectif: async ({idobjectif,idteam})=> {
        try {
            const objectifbyid = await Objectif.findById(idobjectif);
            const teambyid = await Team.findById(idteam);
            if (!objectifbyid || !teambyid) {
                throw new Error ('objectif or team doesnt exist');
            }
           await objectifbyid.update({team: idteam});
           return transformObjectif(objectifbyid);

        }
        catch (err) {
            throw err ;
        }

    },
    newClosedObjectif: async ({company})=> {
        try {
            let mounthobjectif = [] ;
            let objectifs = await Objectif.find({company:company});
            let yearnow = new Date ().getFullYear();
            let New=[0,0,0,0,0,0,0,0,0,0,0,0];
            let Closed=[0,0,0,0,0,0,0,0,0,0,0,0];
            for(let objectif of objectifs){
                let date_begin_objectif = new Date (objectif.date_begin);
                let date_end_objectif = new Date (objectif.date_end);
                if(date_begin_objectif.getFullYear() === yearnow ){
                    let i=date_begin_objectif.getMonth();
                    New[i]++;
                }
                if(date_end_objectif.getFullYear() === yearnow ){
                    let i=date_end_objectif.getMonth();
                    Closed[i]++;
                }
            }
              let obj={
               New: New,
               closed: Closed 
              }
              return  obj 
            }
           
            catch(err){
                throw err ;
            }      
    },
    createObjectif: async args => {
        objectif = new Objectif ({
        title: args.objectifInput.title,
        description: args.objectifInput.description,
        date_begin: new Date(args.objectifInput.date_begin),
        date_end: new Date(args.objectifInput.date_end),
        visibility: args.objectifInput.visibility,
        level: args.objectifInput.level,
        creator: args.objectifInput.userid,
        mission: args.objectifInput.mission,
        supervisor: args.objectifInput.supervisor,
        company: args.objectifInput.company,
        });
        let createdobjectif ;
        try {
      const result = await objectif.save()
      createdobjectif = transformObjectif(result);
           const supervisor = await User.findById(args.objectifInput.supervisor) ; 
           const missionassociated = await Mission.findById(args.objectifInput.mission) ;       
            if (!missionassociated && ! supervisor) {
                throw new Error ('user or mission or supervisor doesnt exist');
            }
            supervisor.objective.push(objectif);
            missionassociated.objective.push(objectif);
            await supervisor.save();
            await missionassociated.save();
            // add notification to supervisor
             let notification = new Notification ({
                title: "new objectif associated",
                description: "a new objectif has been associated as" +args.objectifInput.title,
                date_send: new Date(),
                destination: args.objectifInput.supervisor,
                });
                await notification.save();
            // notify supervisor by mail
            axios.post('http://localhost:4000/mailNotif', {
     
                email: supervisor.email,
                text:
                `Un nouveau vous a été associé au titre de ${args.objectifInput.title} vous a été associé de la part de ${supervisor._doc.name}  `,
                subject:"New Objectif",
              },
            )
            .then(response => {
            })
            .catch((error) => {
             })
            
            return createdobjectif ;
        }                  
        catch(err) {
            throw err ;
        }      

    },
    deleteObjectif: async ({id}) => {
        try {
            const objectif = await Objectif.findById(id);
            const idObjectif = objectif.creator ;
            const user= await User.findById(idObjectif);
            const objectives = user.objective;
            const index=objectives.indexOf(id);
            objectives.splice(index,1);             
            await User.findOneAndUpdate({_id: idObjectif},{objective: objectives});

            const idMission = objectif.mission ;
            const mission= await Mission.findById(idMission);
            const objectivesmission = mission.objective;
            const indexmission=objectivesmission.indexOf(id);
            objectivesmission.splice(indexmission,1);             
            await Mission.findOneAndUpdate({_id: idMission},{objective: objectivesmission});
            
            // delete idobjectif from user
            let supervisor = await User.findOne({"objective" : id} );
           
            let objectivesupervisor = supervisor.objective ;
            let indexobjective = objectivesupervisor.indexOf(id);
            objectivesupervisor.splice(indexobjective,1);
            await User.findOneAndUpdate({_id: supervisor._id},{objective: objectivesupervisor});



            /// we need to delete cascade on keyresults ---> comments
            const listkeyresult = objectif.keyResult ;
            for (let keyres of listkeyresult) {
                   const  res = await deletekeyresult({id: keyres}) ;  
            }           
           const result = await Objectif.findOneAndDelete({_id: id});
            return result ;
 }
 catch (err) {
     throw err ;
 }
},
    updateObjectif: async args => {
    const res = await Objectif.findOneAndUpdate({_id: args.objectifInputUpdate._id},args.objectifInputUpdate);
    if (!res) {
       throw new Error('Objectif does not exist!');
   }
     return { ...res._doc, _id: res.id };
    
  },
  TeamProgression: async args => {
    const teams = await Team.find();
    let All=[];
       for(let team of teams){
           let progression=0;
        const objectifs= await Objectif.find({team:team});
            for(let objectif of objectifs ){
                progression+=objectif.progression;
            }
            if(objectifs.length===0){
                progression=0;
            }else{
            progression=progression/objectifs.length;
            }
          
            let obj={
                userId: team._id,
                name: team.name,
                progression: progression.toFixed(2)
            };
            All.push(obj);
         }

     return All;
    
  },
};