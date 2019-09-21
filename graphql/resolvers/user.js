const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Team =require('../../model/team');
const User = require('../../model/user');
const Mission = require('../../model/mission');
const Objectif = require('../../model/objectif');
const Keyresult = require('../../model/keyResult');
const Company = require('../../model/company');
module.exports = {
  users: async ({company}) => {
    try {
      const users = await User.find({company:company});
     return users.map(user => {
        return { ...user._doc, _id: user.id, password: user.password };
      });
    } catch (err) {
      throw err;
    }
  },
  Membres: async ({company}) => {
    try {
      const users = await User.find({$or:[{company:company,status:(`membre`)},{company:company,status:(`superviseur`)}]});
     return users.map(user => {
        return { ...user._doc, _id: user.id, password: user.password };
      });
    } catch (err) {
      throw err;
    }
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12 );

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        status: args.userInput.status,
        name: args.userInput.name,
        avatar: args.userInput.avatar,
        company: args.userInput.company
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }) => {
    try{
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    if(user.status !=="superAdmin"){
    if(user.expired){
      throw new Error('compte is expired!') 
     }
     const company = await Company.findById(user.company)

     if(company.expired){
      throw new Error('company is expired!')  
     }
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { _id: user.id, email: user.email },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    );
    return { ...user._doc, password: null, _id: user.id, token: token, tokenExpiration: 1 };
    }catch(err){
      throw err;
    }
  //return { ...user._doc, password: null, _id: user.id };
  },
  loginSuperAdmin: async ({ email, password }) => {
    try{
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    if(user.status!="superAdmin"){
      throw new Error('User does not exist!') 
     }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { _id: user.id, email: user.email },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    );
    return { ...user._doc, password: null, _id: user.id, token: token, tokenExpiration: 1 };
    }catch(err){
      throw err;
    }
  },
  deleteUser: async ({id}) => {
    try{
      // first, delete ref user from team  
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User does not exist!');
      } 
     
     
      for(const idTeam of user.team){
         const team= await Team.findById(idTeam);
         const users = team.users;
            const index=users.indexOf(id);
            users.splice(index,1);
         const res= await Team.findOneAndUpdate({_id: idTeam},{users: users}); 
      }
             
        //next, delete user
      const res = await User.findByIdAndDelete({_id: id});
       if (!res) {
         throw new Error('User does not exist!');
       }
    return res;
    }catch(err){
       throw err;
    }
  },

  updateUser: async args => {
    try{
       const exist = await User.findOne({email: args.userInput.email});
        if(!exist) {  throw new Error('User does not exist!');}
        // const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        // args.userInput.password=hashedPassword;
        const res = await User.findOneAndUpdate({email: args.userInput.email},args.userInput);
   
        if (!res) {
         throw new Error('User does not exist!');
         }
     return { ...res._doc, password: null, _id: res.id };
    }catch(err){
    throw err;
    }
  },
  updateProfil: async args =>{
    try{
      const user = await User.findById(args.userProfil.id);
      if(!user) {  throw new Error('User does not exist!');}
      if(args.userProfil.passwordNew){
      const isEqual = await bcrypt.compare(args.userProfil.passwordCurrent, user.password);
       if (!isEqual) {
         throw new Error('Password is incorrect!');
        }
      const hashedPassword = await bcrypt.hash(args.userProfil.passwordNew, 12);
      const res = await User.findByIdAndUpdate(args.userProfil.id,{password:hashedPassword});
      return res;
      }
     if(args.userProfil.avatar){
        const res = await User.findByIdAndUpdate(args.userProfil.id,{avatar:args.userProfil.avatar});
        return res;
      }
      
     }catch(err){
      throw err;
    }
  },
  lockedCompte: async ({id}) => {
    try{
      const user = await User.findById(id);
      if(!user) {  throw new Error('User does not exist!');}
      const expired= !user.expired;
      const res = await User.findByIdAndUpdate(id,{expired: expired});
      return res;
    }catch(err){
      throw err;
    }
  }
  ,
  myTeam: async ({id}) => {
    try{
    const exist = await User.findById(id);
    if(!exist) {  throw new Error('User does not exist!');}
    const listTeam= exist.team;
    var Member=[];
     for(let idTeam of listTeam){
      let team = await Team.findById(idTeam);
         var ListUser = [];
         for(let idUser of team.users){
         let user = await User.findById(idUser);
           var objUser={
            _id: idUser,
            name:user.name,
            email:user.email,
            status:user.status,
            avatar:user.avatar
         };
      ListUser.push(objUser);
     }

     var item ={
       _id: team._id,
       creator: team.creator,
      teamName: team.name,
      color: team.color,
      users: ListUser
      };
     Member.push(item);
   }
   return Member;
   }catch(err){
      throw err;
    }
  },
  AllMemberTeam: async ({company}) => {
    try {
     const teams = await Team.find({company:company});
     var All=[];
    for(const team of teams){
    
      var ListUser = [];
          for(const id of team.users){
            
            let user = await User.findById(id);
           
            var objUser={
              _id: id,
              name:user.name,
              email:user.email,
              status:user.status,
              avatar:user.avatar
             }
          ListUser.push(objUser);
         
         }
       
         let creator= await  User.findById(team.creator);
      
         var objCreator={
          _id: team.creator,
          name:creator.name,
          email:creator.email,
          status:creator.status,
          avatar:creator.avatar
         }
       var item={
        _id : team._id,
        name: team.name,
        color: team.color,
        creator: objCreator,
        users: ListUser
        };
     
        
       All.push(item);
    } 
     return All;
    } catch (err) {
      throw err;
    }
  },
  getUser: async ({id}) =>{
    try{
      const user = await User.findById(id);
      if(!user) {  throw new Error('User does not exist!');}
    
     
      return user;
    }catch(err){
      throw err;
    }
  },
  getSupervisors: async ({company}) =>{
    try{
      const users = await User.find({status: "superviseur",company:company});
      if(!users) {  throw new Error('User does not exist!');}
    
     
      return users;
    }catch(err){
      throw err;
    }
  },
  getMembre: async ({company}) =>{
    try{
      const users = await User.find({company:company});
      if(!users) {  throw new Error('User does not exist!');}
      let All=[]
      for(let user of users){
        if(user.status==="membre"){
           All.push(user);
        }
      }
     
      return All;
    }catch(err){
      throw err;
    }
  },
  MyProgression: async ({id}) =>{
    try{
      let total =0;
      const user = await User.findById(id);
      if(!user) {  throw new Error('User does not exist!');}
      
      if(user.status==="membre"){
      for(let Idkey of user.keyResult){
        key= await Keyresult.findById(Idkey);
       total+=key.progression;
      }
      total=total/user.keyResult.length;
    }
    if(user.status==="superviseur"){
      for(let Idobj of user.objective){
        obj= await Objectif.findById(Idobj);
       total+=obj.progression;
      }
      total=total/user.objective.length;
    }
    if(user.status==="admin"){
      for(let Idmission of user.mission){
        mission= await Mission.findById(Idmission);
       total+=mission.progression;
      }
      total=total/user.mission.length;
    }
  
    
     
     let result={
       total:total.toFixed(2)
     };

      return result;
    }catch(err){
      throw err;
    }
  },
  UserResource: async ({company}) =>{
    try{
      let libre =[];
      let occupe=[];
      let partiellement=[];
      const users = await User.find({company:company});
      
      for(let user of users){
       let progression=0;
       if(user.status==="membre" && user.keyResult.length===0){
        libre.push({userId:user._id,name: user.name, progression: 100});
       }
        if(user.keyResult.length!==0){
         
           for(idkey of user.keyResult){
            let  key = await Keyresult.findById(idkey);
             progression+= key.progression;
            }
            
            let  total=progression/ user.keyResult.length;
            let obj={
              userId:user._id,
              name: user.name,
              progression: total
              };
             if(total===100){
                 libre.push(obj);
             }else if(total < 90){
               occupe.push(obj);
             }else if(total>90){
              partiellement.push(obj);
             }
       }
    }
      let All={
        libre:libre,
        occupe: occupe,
        partiellement: partiellement
      }
      return All;
    }catch(err){
      throw err;
    }
  }


};

