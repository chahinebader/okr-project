const Keyresult = require('../../model/keyResult');
const Objectif = require('../../model/objectif');
const Mission = require('../../model/mission');
const User = require('../../model/user');
const Team = require('../../model/team');
const CompanyLog = require('../../model/companyLog');
const Commentaire = require('../../model/commentaire');
const Notification = require('../../model/notification');
const {transformKeyresult} = require('../resolvers/merge');
const axios = require('axios');

module.exports = {
    keyresults: async ({company}) => {
        try {
       const keyresults = await Keyresult.find({company: company});
            return keyresults.map(keyresult=> {
                return transformKeyresult(keyresult)
            });
           }
           catch(err){
               throw err ;
           }      
    },
    keyresultsbyuserid: async ({userid}) => {
        try {
            const keyResult = [];
            const user = await User.findById(userid);
            let arraykeyresult = user._doc.keyResult ;
            for (let item of arraykeyresult) {
                let keyresult = await Keyresult.findById(item);
                keyResult.push(keyresult);                
            }
            return keyResult.map(keyresult=> {
                return transformKeyresult(keyresult)
            });
                }
                catch(err){
                    throw err ;
                } 
    },
    keyresultsbycreator: async ({userid}) => {
        try {
            // calendar supervisor
            let ListColor1=['#2A3F82','#F22E3E','#FC702F','#A454E5','#6FB735','#82EDD6','#3BA7EF','#DAE560','#D89CD0','#819FF7'];
            let ListColor2=['#FF8A47','#FC6170','#8CEEEE','#26BFBF','#FFD747','#82EDD6','#3BA7EF','#DAE560','#D89CD0','#819FF7'];
            // let ListColor=['#4284F3','#DB4437','#F4B400','#0D854B','#AB47BC','#00ACC1','#FF7043','#9E9D24','#5C6BC0','#F06292','#00796B'];
            let ListColor=['#FF8A47','#FC6170','#8CEEEE','#26BFBF','#FFD747','#82EDD6','#3BA7EF','#DAE560','#D89CD0','#819FF7'];
            let KeyResultByCreator = await Keyresult.find({creator: userid});
            let x=0;
            return KeyResultByCreator.map(keyresult=> {
              
                let obj ={

                    title:keyresult.title,
                    start: new Date(keyresult.date_begin).toISOString(),
                    end:new Date(keyresult.date_end).toISOString(),
                    color :ListColor[x]
                }
                x++;
                return obj;
            })
        }
        catch(err){
            throw err ;
        }
    },
    keyresultsmember: async ({userid}) => {
        try {
            // calendar supervisor
            let ListColor1=['#FE2E2E','#01DF01','#0000FF','#FE2EF7','#00FFFF','#F7FE2E','#04B45F','#D0A9F5','#2EFEC8','#819FF7'];
            // let ListColor=['#FF8A47','#FC6170','#8CEEEE','#26BFBF','#FFD747','#82EDD6','#3BA7EF','#DAE560','#D89CD0','#819FF7'];
            let ListColor=['#FF8A47','#FC6170','#8CEEEE','#26BFBF','#FFD747','#82EDD6','#3BA7EF','#DAE560','#D89CD0','#819FF7'];
            const keyResult = [];
            const user = await User.findById(userid);
            let arraykeyresult = user._doc.keyResult ;
            let x=0;
            for (let item of arraykeyresult) {
                let keyresult = await Keyresult.findById(item);
                keyResult.push(keyresult);                
            }
            return keyResult.map(keyresult=> {
              
                let obj ={
                    title:keyresult.title,
                    start: new Date(keyresult.date_begin).toISOString(),
                    end:new Date(keyresult.date_end).toISOString(),
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
    keyresultbyobjectifid: async ({id}) => {
        try {
            const keyresultbyid = await Keyresult.find({'objective': id})
            return keyresultbyid.map(keyresult => {
                return transformKeyresult(keyresult);
            });
        }
        catch (err) {
            throw err ;
        }
    },
    Logchart: async ({company})=> {
        try {
            let logs = await CompanyLog.find({company: company}).sort({ date: -1 }).limit(10).populate('user').populate('keyResult')
            return logs.map(log=> {
                return { ...log._doc, _id: log.id, date: new Date(log.date).getDate() + "-" + (new Date(log.date).getMonth() + 1) + "-" + new Date(log.date).getFullYear()  };
                
            });
        }
        catch (err) {
            throw err ;
        }

    },
    createKeyresult: async args => {
         let keyresult = new Keyresult ({
        title: args.keyresultInput.title,
        description: args.keyresultInput.description,
        date_begin: new Date(args.keyresultInput.date_begin),
        date_end: new Date(args.keyresultInput.date_end),
        visibility: args.keyresultInput.visibility,
        level: args.keyresultInput.level,
        creator: args.keyresultInput.userid,
        objective: args.keyresultInput.objective,
        company: args.keyresultInput.company,
        member: args.keyresultInput.member
        });
        let createdkeyresult ;
        try {
      const result = await keyresult.save()
      createdkeyresult = transformKeyresult(result);
           const usercreator = await User.findById(args.keyresultInput.userassociated) ; 
           const objectifassociated = await Objectif.findById(args.keyresultInput.objective) ;            
            if (!usercreator && !objectifassociated) {
                throw new Error ('user or objectif doesnt exist');
            }
            usercreator.keyResult.push(keyresult);
            objectifassociated.keyResult.push(keyresult);
            await usercreator.save();
            await objectifassociated.save();
            // create notification to member
            let notification = new Notification ({
                title: "new key result associated",
                description: "a new objectif has been associated as " +args.keyresultInput.title,
                date_send: new Date(),
                destination: args.keyresultInput.userassociated,
                });
                await notification.save();
            // notify user by mail when key result is associated
            let userconcerned = await User.findById(args.keyresultInput.userassociated);
            const email = userconcerned._doc.email ;
            let supervisor = await User.findById(args.keyresultInput.userid);
            axios.post('http://localhost:4000/mailNotif', {
     
                email: email,
                text:
                `Un nouveau key result au titre de ${args.keyresultInput.title} vous a été associé de la part de ${supervisor._doc.name}  `,
                subject:"New Key-Result",
              },
            )
            .then(response => {
            })
            .catch((error) => {
             })
            return createdkeyresult ;
        }
                          
        catch(err) {
            throw err ;
        }      
    },
    updateKeyresult: async ({keyresultInputUpdate,userid,mycompany}) => {

        const ancienres = await Keyresult.findById(keyresultInputUpdate._id);
        const res = await Keyresult.findOneAndUpdate({_id: keyresultInputUpdate._id},keyresultInputUpdate);
        let newres = await Keyresult.findById(keyresultInputUpdate._id);
       // update objectif on keyresult
        var sumkeyreslevel = 0
        var sumlvl = 0 ;
       const objectif = await Objectif.findOne({keyResult: keyresultInputUpdate._id})
       for (let idkeyresult of objectif._doc.keyResult ) {
       const keyres = await Keyresult.findOne({_id: idkeyresult}) ;
       sumkeyreslevel += keyres._doc.progression*keyres._doc.level;
       sumlvl += keyres._doc.level;
       const total = sumkeyreslevel/sumlvl ;
       await Objectif.findOneAndUpdate({keyResult: keyresultInputUpdate._id},{progression: total});
    }
    // update mission on objectif
    var sumobjectifproglevel = 0 ;
    var sumlvlmission = 0 ;
    const mission = await Mission.findOne({objective: objectif._doc._id})
    for (let idobjectif of mission._doc.objective ) {
        const objectif = await Objectif.findOne({_id: idobjectif}) ;
        sumobjectifproglevel += objectif._doc.progression*objectif._doc.level;
        sumlvlmission += objectif._doc.level;
     }
     // update progressofmounth for user
     let newprogress = newres._doc.progression-ancienres._doc.progression;   
    let datetoday = new Date();
    // if  the new progress has been updated in a new mounth
    const user = await User.findById(userid);
    let reultat=0;
    let dateprog = new Date(user.dateofprogress);
   
    if ((datetoday.getMonth()+1) ===  (dateprog.getMonth()+1)) {
    reultat=user.progressofmounth+newprogress;
    }else{
        reultat=newprogress;
      
    }
// log Company
let company = new CompanyLog({
   keyResult:  keyresultInputUpdate._id,
   user : userid,
   date : new Date(),
   progression: newprogress,
   level: keyresultInputUpdate.level,
   company: mycompany
})
     company.save();
    const usertoupdate = await User.findByIdAndUpdate(userid,{progressofmounth: reultat,dateofprogress: new Date()});
    const totalmiss = sumobjectifproglevel/sumlvlmission;
    const updatevaluemission = await Mission.findOneAndUpdate({objective: objectif._doc._id},{progression: totalmiss});
        if (!res) {
           throw new Error('Key result does not exist!');
       }
         return { ...updatevaluemission._doc, _id: updatevaluemission._id };
        
      },
      updateprogress: async ({keyresultid,progressvalue})=> {
          const res = await Keyresult.findOneAndUpdate({_id: keyresultid},{progression: progressvalue})
      },
      deletekeyresult : async ({id})=> {
        try {
           
            // deleting comments associated to keyresult
            const keyresult = await Keyresult.findById(id);
            if (!keyresult) {
                throw new Error("key result not found!")
            }
            const keyresultcomments = keyresult.commentaire;
            for (let idcomment of keyresultcomments ) {
                await Commentaire.deleteOne({_id: idcomment}) ;
            }
         //    deleting keyresult associated to objectif ; // mission --> keyresul , user ----> objectif
            const idkeyresult = keyresult.objective ;
            const objectif= await Objectif.findById(idkeyresult);
            const keyresults = objectif.keyResult;
            const index=keyresults.indexOf(id);
            keyresults.splice(index,1);          
            await Objectif.findOneAndUpdate({_id: idkeyresult},{keyResult: keyresults});            
            /* deleting key result associated to user  objectif--> keyresult */ 
            const iduser = keyresult.creator;
            const user= await User.findById(iduser);
            const userkeyresults = user.keyResult;
            const indexuserkeyresult=userkeyresults.indexOf(id);
            userkeyresults.splice(indexuserkeyresult,1);             
            await User.findOneAndUpdate({_id: iduser},{keyResult: userkeyresults});
            result = await Keyresult.findOneAndDelete({_id: id});
            return result ;
 }
 catch (err) {
     throw err ;
 }
      },
      keyresultsofmembers: async ({userid}) => {
          try {
              let keyresults = [];
             let teams = await Team.find({users: userid});
             for (let team of teams ) {
                 let keyresult = await Keyresult.find( { $and:[{objective: await Objectif.find({team:team._id})},{visibility: true}]}).populate('commentaires');
                 keyresults = keyresults.concat(keyresult);
                 return keyresults.map(keyresult=> {
                    return transformKeyresult(keyresult);
                });                
             } 
          }
          catch (err) {
            throw err ;
        }
      },
      supervisorkeyresults : async ({userid}) => {
        try {
            const keyresults = await Keyresult.find({creator: userid});
            return keyresults.map(keyresult=> {
                return transformKeyresult(keyresult)
            });
        }
        catch (err) {
          throw err ;
      }
    }

}
