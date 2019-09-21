const Mission = require('../../model/mission');
const Objectif = require('../../model/objectif');
const User = require('../../model/user');
const Team = require('../../model/team');
const Commentaire = require('../../model/commentaire');
const Keyresult = require('../../model/keyResult');


const usermission = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      missions: missions.bind(this, user._doc.mission),

    };
  } catch (err) {
    throw err;
  }
};
const users = async userid => {
  try {
 const users = await User.find({ _id: { $in: userid } })
  
      return users.map (user=> {
          return transformUser(user) ;
      });
  }
  catch(err) {
      throw err ;
  }
};
const mission = async missionId => {
  try {
    const mission = await Mission.findById(missionId);
    return {
      ...mission._doc,
      _id: mission.id,
      objectifs: objectifs.bind(this, mission._doc.objective), // we need it 
      creator: usermission.bind(this,mission._doc.creator),
    };
  } catch (err) {
    throw err;
  }
};
 const objectif = async objectifid => {
    try {
      const objectif = await Objectif.findById(objectifid);
      return {
        ...objectif._doc,
        _id: objectif.id,
        creator: usermission.bind(this,objectif._doc.creator),
        mission: mission.bind(this,objectif._doc.mission),
        keyResults: keyresults.bind(this,objectif._doc.keyResult),
        team: team.bind(this,objectif._doc.team)
      };
    } catch (err) {
      throw err;
    }
  };
  const team = async teamid => {

      const team = await Team.findById(teamid);
      if (team !==null) {
        return {...team._doc,
          _id: team.id,
          creator: usermission.bind(this,team._doc.creator),
          users: users.bind(this,team._doc.users)
        
        };

      }

 
  };
  const keyresult = async keyresultid => {
    try {
      const keyresult = await Keyresult.findById(keyresultid);
      return {
        ...keyresult._doc,
        _id: keyresult.id,
        creator: usermission.bind(this,keyresult._doc.creator),
        objectif: objectif.bind(this,keyresult._doc.objective),
        commentaires: commentaires.bind(this,keyresult._doc.commentaire)
      };
    } catch (err) {
      throw err;
    }
  };
const missions = async missionid => {
    try {
   const missions = await Mission.find({ _id: { $in: missionid } })
    
        return missions.map (mission=> {
            return transformMission(mission) ;
        });
    }
    catch(err) {
        throw err ;
    }
};

const objectifs = async objectifid => {
    try {
   const objectifs = await Objectif.find({ _id: { $in: objectifid } })
    
        return objectifs.map (objectif=> {
            return transformObjectif(objectif) ;
        });
    }
    catch(err) {
        throw err ;
    }
  };
  const objectifstree = async objectifid => {
    try {
   const objectifs = await Objectif.find({ _id: { $in: objectifid } })
    
        return objectifs.map (objectif=> {
            return transformObjectiftree(objectif) ;
        });
    }
    catch(err) {
        throw err ;
    }
  };
  const keyresultstree = async keyresultid => {
    try {
   const keyresults = await Keyresult.find({ _id: { $in: keyresultid } })
    
        return keyresults.map (keyresult=> {
            return transformKeyresulttree(keyresult) ;
        });
    }
    catch(err) {
        throw err ;
    }
  };

const keyresults = async keyresultid => {
    try {
   const keyresults = await Keyresult.find({ _id: { $in: keyresultid } })
    
        return keyresults.map (keyresult=> {
            return transformKeyresult(keyresult) ;
        });
    }
    catch(err) {
        throw err ;
    }
  };
  const commentaires = async commentaireid => {
    try {
   const commentaires = await Commentaire.find({ _id: { $in: commentaireid } })
    
        return commentaires.map (commentaire=> {
            return transformCommentaire(commentaire) ;
        });
    }
    catch(err) {
        throw err ;
    }
  };

  const transformUser  = user => {
    return {
        ...user._doc,
                _id: user._id,
    };
};


const transformMission  = mission => {
    return {
        ...mission._doc,
                _id: mission._id,
                date_begin : new Date(mission._doc.date_begin).toISOString(),
                date_end : new Date(mission._doc.date_end).toISOString(),
                creator: usermission.bind(this, mission._doc.creator),
                objectifs : objectifs.bind(this,mission._doc.objective)
    };
};
const transformMissiontree =  mission => {
  return {
      ...mission._doc,
              _id: mission._id,
              name: mission.title,
              date_begin : new Date(mission._doc.date_begin).toISOString(),
              date_end : new Date(mission._doc.date_end).toISOString(),
              creator: usermission.bind(this, mission._doc.creator),
              children : objectifstree.bind(this,mission._doc.objective)
  };
};
const transformObjectiftree  = objectif => {
  return {
      ...objectif._doc,
              _id: objectif._id,
              name: objectif.title,
              progression: objectif.progression,
              date_begin : new Date(objectif._doc.date_begin).toISOString(),
              date_end : new Date(objectif._doc.date_end).toISOString(),
              creator: usermission.bind(this, objectif._doc.creator),
              supervisor: usermission.bind(this, objectif._doc.supervisor),
              children: keyresultstree.bind(this,objectif._doc.keyResult),
              team: team.bind(this,objectif._doc.team)
  };
};
const transformKeyresulttree = keyresult => {
  return {
      ...keyresult._doc,
              _id: keyresult._id,
              name: keyresult.title,
              date_begin : new Date(keyresult._doc.date_begin).toISOString(),
              date_end : new Date(keyresult._doc.date_end).toISOString(),
              creator: usermission.bind(this, keyresult._doc.creator),
              progression: keyresult.progression,
              member: usermission.bind(this, keyresult._doc.member)

            //  member:
  };
};
const transformObjectif  = objectif => {
    return {
        ...objectif._doc,
                _id: objectif._id,
                date_begin : new Date(objectif._doc.date_begin).toISOString(),
                date_end : new Date(objectif._doc.date_end).toISOString(),
                creator: usermission.bind(this, objectif._doc.creator),
                mission: mission.bind(this,objectif._doc.mission),
                keyResults: keyresults.bind(this,objectif._doc.keyResult),
                team: team.bind(this,objectif._doc.team)

    };
};

  const transformKeyresult  = keyresult => {

    return {
        ...keyresult._doc,
                _id: keyresult._id,
                date_begin : new Date(keyresult._doc.date_begin).toISOString(),
                date_end : new Date(keyresult._doc.date_end).toISOString(),
                creator: usermission.bind(this, keyresult._doc.creator),
                objectif: objectif.bind(this,keyresult._doc.objective),
                commentaires: commentaires.bind(this, keyresult._doc.commentaire),
              //  member:
    };
};
const transformCommentaire  = commentaire => {
  return {
      ...commentaire._doc,
              _id: commentaire._id,
              date : new Date(commentaire._doc.date).toISOString(),
              creator: usermission.bind(this, commentaire._doc.creator),
              keyResult: keyresult.bind(this,commentaire._doc.keyResult),
  };
};
exports.transformObjectiftree = transformObjectiftree
exports.transformMissiontree = transformMissiontree
exports.transformMission = transformMission ;
exports.transformObjectif = transformObjectif ;
exports.transformKeyresult = transformKeyresult ;
exports.transformCommentaire = transformCommentaire