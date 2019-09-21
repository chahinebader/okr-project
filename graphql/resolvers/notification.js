const Notif = require('../../model/notification');
const User =  require('../../model/user');
const { dateToString } = require('../../helpers/date');


module.exports = {
  notifications: async () => {
    try {
      const notifs = await Notif.find();
        return notifs.map(notif => {
        return { ...notif._doc,date_send: dateToString(notif._doc.date_send), _id: notif.id };
       });
    } catch (err) {
      throw err;
    }
  },

  createNotification: async args => {
    try {
     
      let notif = new Notif({
        title: args.notificationInput.title,
        description : args.notificationInput.description,
        destination: args.notificationInput.destination,
        date_send: new Date(args.notificationInput.date_send) 
        
      });
       
      user = await User.findById(args.notificationInput.destination);
      if(!user){
        throw new Error('User exists already.');  
      }
      user.notification.push(notif);
      await user.save();
     
      const result = await notif.save();
      return { ...result._doc,date_send: dateToString(result._doc.date_send), _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  
  deleteNotification: async ({id}) =>{
     try{
     //delete Notification  from user
     const notification = await Notif.findById(id);
     if(!notification){
      throw new Error('Notification does not existe!');
    }
     const idUser = notification.destination;
     const user= await User.findById(idUser);
     const notifications = user.notification;
     const index=notifications.indexOf(id);
     notifications.splice(index,1);
     const res= await User.findOneAndUpdate({_id: idUser},{notification: notifications}); 
     
     //delete Notfication
     const result = await Notif.findByIdAndDelete({_id: id});
    
    if (!result) {
      throw new Error('Notification does not exist!');
    }
    return result;
     }catch(err){
         throw err;
     }
   
  },
  topFiveNotfications: async ({id}) =>{
    try {
      const notifs = await Notif.find({destination: id});
     
      let n=5;
      if(notifs.length<5) n= notifs.length; 
      let notif=[];
        for(let i =0; i< n ; i++){
         notif.push(notifs[i]);
        }
        return notif.map(not => {
          return { ...not._doc,date_send: dateToString(not._doc.date_send), _id: not.id };
         });
    } catch (err) {
      throw err;
    }
  }

};