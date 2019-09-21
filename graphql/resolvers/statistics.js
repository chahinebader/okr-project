const Team = require('../../model/team');
const User = require('../../model/user');
const Mission = require('../../model/mission');
const Objectif = require('../../model/objectif');
const KeyResult = require('../../model/keyResult');
const BestDeveloper = require('../../model/bestDeveloper');
const Log =require('../../model/logs');
const CompanyLog = require('../../model/companyLog');
module.exports = {
dashbordAdmin: async ({company}) =>{
    try {
        const log= await Log.find({company:company});
        const missions = await Mission.find({company:company});
        const objectifs= await Objectif.find({company:company});
        const teams = await Team.find({company:company});
        const keyResults = await KeyResult.find({company:company});
        let date= new Date();
        const mois =date.getMonth()+1;
        let progressTeam = (   (teams.length/ mois )  /  ( log[0].teams/12 ) ) -1;
        let progressMission = (  (missions.length/ mois)  / (log[0].missions/12))-1 ;
        let progressObjectif = ( (objectifs.length/ mois) / (log[0].objectifs/12) )-1 ;
        let progressKeyResult = ( ( keyResults.length/ mois) / (log[0]. keyResults/12)-1 );
        let n=0;
        let taux=0;
        let missionComplet=0;
        let missionEnCour=0;
        let missionEnAttend=0;
        for(item of missions){
            if(item.date_begin>date){
                 missionEnAttend++;
            }else if(item.date_end < date){
                missionComplet++;
            } else{
                missionEnCour++;
            }  
         taux+= item.progression;
         n++;
        }  
        if(taux!==0){
        taux= taux/n;
        }
        const totale =  missionComplet+missionEnCour+missionEnAttend;
        let result={
            numberMission: missions.length,
            numberObjectif: objectifs.length,
            numberKeyResult: keyResults.length,
            numberTeam: teams.length,
            taux : taux,
            missionComplet:(100/totale)*missionComplet,
            missionEnCour:(100/totale)*missionEnCour,
            missionEnAttend:(100/totale)*missionEnAttend,
            progressTeam:  progressTeam*100,
            progressMission: progressMission*100,
            progressObjectif: progressObjectif*100,
            progressKeyResult: progressKeyResult*100
        }
        return result;
    }catch(err){
            throw err ;
            }    
},
dashbordSuperviseur: async ({id,company}) =>{
    try {
        const log= await Log.find({company:company});
        const mP = await Mission.find({company:company});
        const tP = await Team.find({company:company});
        const kP = await KeyResult.find({company:company});
        const objectifs= await Objectif.find({company:company});
        const teams = await Team.find({creator: id});
        let keyResults= 0;
        let missions=[]; 
        let level=0; 
        let n=0;
        let date= new Date();
        const mois =date.getMonth()+1;
        let progressTeam = ((tP.length/mois)/(log[0].teams/12)) -1;
        let progressMission = ((mP.length/mois)/(log[0].missions/12))-1;
        let progressObjectif = ((objectifs.length/mois)/(log[0].objectifs/12))-1;
        let progressKeyResult = ((kP.length/mois)/(log[0]. keyResults/12))-1;
        let taux=0;
        let objectifComplet=0;
        let objectifEnCour=0;
        let objectifEnAttend=0;
        for(item of objectifs){
            let existe= false;
              for(team of teams ){
                  if(team._id+'' === item.team+''){
                      existe=true; 
                      break;
                    }
                }
           
           if(existe){
            if(item.date_begin>date){
                 objectifEnAttend++;
            }else if(item.date_end < date){
                objectifComplet++;
            } else{
                objectifEnCour++;
            }  
            taux+= item.progression* item.level;
            level+=item.level;
            n++;
            if(missions.indexOf(item.mission)){missions.push(item.mission)}
             keyResults+=item.keyResult.length;
          }
        }  
        if(taux!==0){
        taux= taux/level;
        }
        const totale =  objectifComplet+objectifEnCour+objectifEnAttend;
        let result={
            numberMission: missions.length,
            numberObjectif: n,
            numberKeyResult: keyResults,
            numberTeam: teams.length,
            taux : taux,
            missionComplet:(100/totale)* objectifComplet,
            missionEnCour:(100/totale)*objectifEnCour,
            missionEnAttend:(100/totale)*objectifEnAttend,
            progressTeam:  progressTeam*100,
            progressMission: progressMission*100,
            progressObjectif: progressObjectif*100,
            progressKeyResult: progressKeyResult*100
        }
        return result;
    }catch(err){
            throw err ;
            }    
},
dashbordMember: async ({id,company})=>{
    try {
        const log= await Log.find({company:company});
        const mP = await Mission.find({company:company});
        const tP = await Team.find({company:company});
        const kP = await KeyResult.find({company:company});
        const oP= await Objectif.find({company:company});
        const user = await User.findById(id);
        let objectifs=[];
        let missions=[];
        let level=0;
        let date= new Date();
        const mois =date.getMonth()+1;
        let progressTeam = ((tP.length/mois)/(log[0].teams/12))-1;
        let progressMission = ((mP.length/mois)/(log[0].missions/12))-1;
        let progressObjectif = ((oP.length/mois)/(log[0].objectifs/12))-1 ;
        let progressKeyResult = ((kP.length/mois)/(log[0]. keyResults/12))-1;
        let taux=0;
        let keyResultComplet=0;
        let keyResultEnCour=0;
        let keyResultEnAttend=0;
        for(idkey of user.keyResult){
            const key = await KeyResult.findById(idkey);
            if(key.date_begin>date){
                keyResultEnAttend++;
            }else if(key.date_end < date){
                keyResultComplet++;
            } else{
                keyResultEnCour++;
            }  
         taux+= key.progression* key.level;
         level+=key.level;
         if(objectifs.indexOf(key.objectif)===-1){objectifs.push(key.objectif)};
        }  
        if(taux!==0){
        taux= taux/level;
        }
        for(obj in objectifs){
            if(missions.indexOf(obj.mission)===-1){missions.push(obj.mission)};
        }
         

        const totale =   keyResultComplet+keyResultEnCour+keyResultEnAttend;
        let result={
            numberMission: missions.length,
            numberObjectif: objectifs.length,
            numberKeyResult: user.keyResult.length,
            numberTeam: user.team.length,
            taux : taux,
            missionComplet: (100/totale)*keyResultComplet,
            missionEnCour:  (100/totale)*keyResultEnCour,
            missionEnAttend: (100/totale)*keyResultEnAttend,
            progressTeam:  progressTeam*100,
            progressMission: progressMission*100,
            progressObjectif: progressObjectif*100,
            progressKeyResult: progressKeyResult*100
        }
        return result;
    }catch(err){
            throw err ;
            }       
},
bestDeveloper: async ({company})=>{
    try {
     const best = await BestDeveloper.find({company:company});
     if(!best){throw new Error(" error...")};
     return best[(best.length-1)];
    }catch(err){
        throw err ;
        }       
},
RapportOfMois: async ({company}) =>{
    try {
        const users = await User.find({company:company});
        const data = await CompanyLog.find({company:company});
        if(!data){throw new Error(" error...")};
        const date = new Date();
        const mois= date.getMonth()+1
        let resultat=[];
        for(user of users){
            if(user.status==="membre"){
          let prog=0;
          let level=0;
            for(item of data){
              
              if((item.user+''=== user._id+'')&&((item.date.getMonth()+1)===mois)){
                  prog+=item.progression*item.level;
                  level+=item.level;
               }
            }
            let totale= 0;;
            if((prog!==0) &&(level!==0)){ 
                totale=prog/level
            }  
            let obj ={
             userId:user._id,
             progression:totale.toFixed(2),
             name:user.name  
            };
       
          
        
        resultat.push(obj);
        }}
        return resultat;
       }catch(err){
           throw err ;
           }    
},
RapportOfYear: async ({company}) =>{
    try {
        const users = await User.find({company:company});
        const data = await CompanyLog.find({company:company});
        if(!data){throw new Error(" error...")};
        const date = new Date();
        const mois= date.getFullYear()+1
        let resultat=[];
        for(user of users){
            if(user.status==="membre"){
          let prog=0;
          let level=0;
            for(item of data){
              if((item.user+''=== user._id+'')&&((item.date.getFullYear()+1)===mois)){
                  prog+=item.progression*item.level;
                  level+=item.level;
               }
            }
            let totale= 0;;
            if((prog!==0) &&(level!==0)){ 
                totale=prog/level
            }  
            let obj ={
             userId:user._id,
             progression:totale.toFixed(2),
             name:user.name  
            };
       
          
        
        resultat.push(obj);
        }
        }
        return resultat;
       }catch(err){
           throw err ;
           }    
}

}    