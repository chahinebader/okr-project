const Company = require('../../model/company');
const User = require('../../model/user');
const Reclamation = require('../../model/reclamation');
const bcrypt = require('bcryptjs');
module.exports = {
    companies: async () => {
        try {
       return companies = await Company.find().populate('ceo');                   
           }
           catch(err){
               throw err ;
           }      
    },
    population: async ()=> {
     try{
      const users= await User.find();
      const companys = await Company.find();
      const reclamation =await Reclamation.find();
      let obj={
          user: users.length,
          company: companys.length,
          reclamation: reclamation.length

      }    
     return obj
     }catch(err){
         throw err;
     }
    },
    createCompany: async args => {
        let existingUser = await User.findOne({ email: args.companyInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      let hashedPassword = await bcrypt.hash(args.companyInput.password, 12 );
      
      ceo = new User ({
        name: args.companyInput.name,
        email: args.companyInput.email,
        password: hashedPassword,
        status: "admin",
        avatar: "default.png",
    });
     let userCreated = await ceo.save();

        let ceoid = userCreated._doc._id;
        company = new Company ({
            companyName: args.companyInput.companyName,
            interval: args.companyInput.interval,
            domain: args.companyInput.domain,
            companyAvatar: args.companyInput.companyAvatar,
            ceo: ceoid

            });
        try {
            let companyResult = await company.save();
            let companyId = companyResult._id ;
            await User.findByIdAndUpdate({_id: ceoid }, {company: companyId });
            return companyResult;              
           }
           catch(err){
               throw err ;
           }      
    },
    deletecompany: async ({companyId}) => {

      let company = await Company.findById(companyId);
      if (!company) {
        throw new Error('Company does not exist!');
      }     
      let ceoId = company.ceo ;
      let ceo = await User.findById(ceoId);
      console.log(ceo);
      ceo.company = null ;
      await User.findOneAndUpdate({_id: ceoId},ceo);
      let companyDeleted = await Company.findOneAndDelete({_id: companyId});
      return companyDeleted;

      }


    



}
