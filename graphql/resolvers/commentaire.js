const Keyresult = require('../../model/keyResult');
const Commentaire = require('../../model/commentaire');
const {transformCommentaire} = require('../resolvers/merge');

module.exports = {
    Commentaires: async ({keyresultid}) => {
        try {
       const comments = await Commentaire.find({keyResult:keyresultid });
            return comments.map(comment=> {
                return transformCommentaire(comment)
            });
           }
           catch(err){
               throw err ;
           }      
    } ,
    createCommentaire: async args => {
  
        commentaire = new Commentaire ({
        content: args.commentaireInput.content,
        creator: args.commentaireInput.creator,
        keyResult: args.commentaireInput.keyResult,
        });
        let createdcommentaire ;
        try {
      const result = await commentaire.save()
      createdcommentaire = transformCommentaire(result);
           const keyresultassociated = await Keyresult.findById(args.commentaireInput.keyResult) ;            
            if (!keyresultassociated) {
                throw new Error (' the keyresult doesnt exist anymore');
            }
            keyresultassociated.commentaire.push(commentaire);
            await keyresultassociated.save();
            return createdcommentaire ;
        }                  
        catch(err) {
            throw err ;
        }      

    },
    updateCommentaire: async ({idcomment,content}) => {
        const res = await Commentaire.findOneAndUpdate({_id: idcomment},{content: content});
        if (!res) {
           throw new Error('comment does not exist!');
       }
         return { ...res._doc, _id: res.id };
        
      },
      deleteCommentaire: async ({idcomment}) =>{
        let keyResult = await Keyresult.findOne({"commentaire" : idcomment} );
           
        let commentaires = keyResult.commentaire ;
        let indexcommentaire = commentaires.indexOf(idcomment);
        commentaires.splice(indexcommentaire,1);
        await Keyresult.findOneAndUpdate({_id: keyResult._id},{commentaire: commentaires});


          const res = await Commentaire.findOneAndDelete({_id: idcomment});
          if (!res) {
            throw new Error('comment does not exist!');
        }
          return { ...res._doc, _id: res.id };

      }

}