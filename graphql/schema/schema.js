const { buildSchema } = require('graphql');

module.exports = buildSchema(`


type User {
  _id: ID!
  name: String!
  email: String!
  password: String
  status: String!
  avatar: String
  expired: Boolean!
  team: [Team!]
  notification: [Notification!]
  company: Company
}
type Reunion {
  _id :ID!
  title : String!
  start: String!
  end: String
  creator: User!
  team: Team!
  company: Company
  }

type Team {
    _id: ID!
    name: String!
    color:String
    users: [User!]!
    creator: User
    company: Company
}

type Notification {
    _id: ID!
    title: String!
    description: String!
    destination: String!
    date_send: String!
}

type Reclamation {
    _id: ID!
    objet: String!
    description: String!
    date: String!
    admin: User!

}

input ReclamationInput {
    objet: String!
    description: String!
    date: String!
 
}

input NotificationInput {
    title: String!
    description: String!
    destination: String!
    date_send: String!
}

input ReclamationUpdate {
    _id: ID!
    objet: String!
    description: String!
    date: String!
   
}

input ReunionInput {
title :String!
start: String!
end: String
creator: String!
team: String!
company: String!
}

input UserInput {
    name: String
    email: String!
    password: String
    status: String!
    avatar: String  
    company : String!
}

input UserEdit {
  name: String
  email: String!
  expired: Boolean!
  status: String!
  avatar: String  
}

input TeamInput {
    name: String!
    color: String
    users:[String!]  
    creator: String!
    company: String!
  }

input TeamUpdate{
    _id: String!
    color: String
    name: String!
    users:[String!]  
}




type AuthData {
    _id: ID!
    name: String
    email: String!
    password: String
    status: String!
    avatar: String
    token: String!
    tokenExpiration: Int!
    company: String
}

type MemberList {
   _id: String
   creator: String
   teamName: String!
   color: String
   users: [User!]!
   
}
type Missiontree {
  _id: ID!
  name: String!
  progression: Float
  description: String!
  date_begin: String!
  date_end: String!
  children : [Objectiftree!]
  creator: User!
  company: String


}
type Objectiftree {
  _id: ID!
  name: String!
  progression: Float
  description: String
  date_begin: String!
  date_end: String!
  children : [Keyresulttree!]
  creator: User!
  company: String
  supervisor: User!
  team: Team
}
type Keyresulttree {
  _id: ID!
  name: String!
  progression: Int
  description: String
  date_begin: String!
  date_end: String!
  children : [Keyresulttree!]
  creator: User!
  company: String
  member: User!
}
type Mission {
    _id: ID!
    title: String!
    description: String!
    date_begin: String!
    date_end: String!
    progression: Float
    creator: User!
    objectifs:[Objectif!]
    company : String!
  
  }
  input MissionInput {
    title: String!
    description: String!
    date_begin: String!
    date_end: String!
    userid: String!
    company : String!
  }
  input MissionInputUpdate {
    _id: String !
    title: String!
    description: String!
    date_begin: String!
    date_end: String!
  }
  
  type Objectif {
    _id: ID!
    title: String!
    description: String!
    date_begin: String!
    date_end: String!
    level: Int!
    progression: Float
    visibility: Boolean!
    creator: User!
    mission: Mission!
    keyResults: [Keyresult!]
    team: Team
    company: String
    supervisor: User!
  
  }
  
  input ObjectifInput {
    title: String!
    description: String!
    date_begin: String!
    date_end: String!
    level: Int!
    progression: Int
    mission: String!
    visibility: Boolean!
    supervisor: String!
    userid: String!
    company: String!

  }

  input UserProfil{
    id: String!
    passwordCurrent: String
    passwordNew: String
    avatar :String
  }

  input ObjectifInputUpdate {
    _id: String!
    title: String!
    description: String!
    date_begin: String!
    date_end: String!
    level: Int!
    progression: Int
    visibility: Boolean!
  }
  
  type Keyresult {
    _id: ID!
    title: String!
    description: String!
    date_begin: String!
    date_end: String!
    progression: Int
    level: Int!
    visibility: Boolean!
    creator: User!
    objectif: Objectif!
    commentaires: [Commentaire!]
    company: Company!
    member: User!
  }
  
  input KeyresultInput {
    title: String!
    description: String!
    date_begin: String!
    date_end: String!
    level: Int!
    visibility: Boolean!
    objective: String!
    userassociated : String!
    userid: String!
    company: String!
    member: String!
  }
  
  input KeyresultInputUpdate {
    _id: String!
    title: String!
    description: String!
    date_begin: String!
    date_end: String!
    progression: Int
    level: Int!
    visibility: Boolean!
  }
  
  type Commentaire {
    _id: ID!
    content: String!
    date: String!
    creator: User!
    keyResult: Keyresult!
  }
  input CommentaireInput {
    content: String!
    creator : String!
    keyResult: String!
  }

  type Calendar {
    title:String!
    start: String!
    end:String!
    color: String!
  }
  
  type BestDev {
    name: String!
    avatar: String!
    email:String!
    status: String!
  }
  

  type Statistic {
    numberMission: Int,
    numberObjectif: Int,
    numberKeyResult: Int,
    numberTeam: Int,
    taux : Float,
    missionComplet: Float,
    missionEnCour:  Float,
    missionEnAttend: Float,
    progressTeam: Float,
    progressMission :Float,
    progressObjectif: Float,
    progressKeyResult: Float
  }
type Rapport{
  userId: String,
  name : String,
  progression: String,
}
type Progression{
  total: Float,
  sum :String
}
type Resource {
  libre: [Rapport],
  occupe: [Rapport],
  partiellement: [Rapport]
}
type NewClosed{
  New : [Int!]!,
  closed :[Int!]!
}
type CompanyLog {
  progression: Int!
  date: String
  user: User!
  keyResult: Keyresult!

}


type Company {
  companyName: String!
  interval:String
  domain: String!
  companyAvatar: String
  ceo: User!
}

input CompanyInput {
  companyName: String!
  interval:String
  domain: String!
  companyAvatar: String
  email: String!
  name: String!
  password: String!
}
type Population {
  user: Int!
  company: Int!
  reclamation: Int!
}

type RootQuery {
    population: Population!
    companies: [Company!]
    reunions(company: String!): [Reunion!]!
    users(company: String!): [User!]!
    Membres(company: String!): [User!]!
    login(email: String!, password: String!): AuthData!
    loginSuperAdmin(email: String!, password: String!): AuthData!
    getUser(id: ID!): User!
    getSupervisors(company: String!): [User!]
    teams(company: String!): [Team!]!
    notifications: [Notification!]!
    reclamations: [Reclamation!]!
    reclamationsUser(id: ID!): [Reclamation!]!
    myTeam(id: ID!):[MemberList!]!
    missions(company: String!): [Mission!]
    missiontree(company: String!): [Missiontree!]
    missioncalendar(userid: String!): [Calendar!]
    missiontreebyid (id: String!): Missiontree!
    missionbyid(id: String!): Mission!
    objectifs(company: String!): [Objectif!]
    objectiftreebyid (id: String!): Objectiftree!
    objectifsbymissionid(id : String!): [Objectif!]
    objectifbyuserid(userid: String!): [Objectif!]
    keyresultbyobjectifid(id : String!): [Keyresult!]
    keyresults(company: String!): [Keyresult!]
    keyresultsbyuserid(userid: String!): [Keyresult!]
    keyresultsbycreator(userid: String!): [Calendar!]
    keyresultsmember(userid: String!): [Calendar!]
    AllMemberTeam(company: String!) : [Team!]!
    topFiveNotfications(id: ID!):[Notification!]!
    dashbordAdmin(company: String!): Statistic
    dashbordSuperviseur(id:String!, company: String!): Statistic
    dashbordMember(id:String!, company: String!): Statistic
    bestDeveloper(company: String!): BestDev! 
    RapportOfMois(company: String!): [Rapport!]!
    RapportOfYear(company: String!): [Rapport!]!
    getMembre(company: String!): [User!]!
    MyProgression(id:String!): Progression
    reunionsbyMembre(id: String!): [Reunion]!
    reunionsbyCreator(id: String!): [Reunion]!
    UserResource(company: String!):Resource
    ReunionInWeek(company: String!): [Reunion]
    TeamProgression:[Rapport!]!
    newClosedObjectif(company: String!): NewClosed!
    Logchart(company: String!):[CompanyLog!]
    Commentaires(keyresultid: String!): [Commentaire!]
    keyresultsofmembers(userid: String!): [Keyresult!]
    supervisorkeyresults(userid: String!): [Keyresult!]
}

type RootMutation {
  createUser(userInput: UserInput): User
  deleteUser(id: ID!): User
  updateUser(userInput:  UserEdit): User
  updateProfil(userProfil: UserProfil):User
  createTeam(teamInput: TeamInput): Team
  deleteTeam(id: ID!): Team
  updateTeam(teamUpdate: TeamUpdate): Team
  lockedCompte(id: ID!): User!
  
  createReunion(reunionInput: ReunionInput): Reunion
  createNotification(notificationInput: NotificationInput): Notification
  deleteNotification(id: ID!): Notification
  
  createReclamation(reclamationInput: ReclamationInput): Reclamation
  deleteReclamation(id: ID!): Reclamation
  updateReclamation( reclamationUpdate:  ReclamationUpdate): Reclamation
  
  createMission(missionInput: MissionInput!):Mission!
  updateMission(missionInputUpdate: MissionInputUpdate!):Mission!
  deleteMission(id: ID!): Mission!
  
  createObjectif(objectifInput: ObjectifInput!):Objectif!
  updateObjectif(objectifInputUpdate: ObjectifInputUpdate!):Objectif!
  deleteObjectif(id: ID!): Objectif!
  associateteamtoobjectif(idobjectif: ID!,idteam: ID!): Objectif!

  
  createKeyresult(keyresultInput: KeyresultInput!):Keyresult!
  updateKeyresult(keyresultInputUpdate: KeyresultInputUpdate!,userid: String!,mycompany: String!):Keyresult!
  deletekeyresult(id: ID!):Keyresult!
  
  createCommentaire(commentaireInput: CommentaireInput!):Commentaire!
  updateCommentaire(idcomment: ID!,content: String!):Commentaire!
  deleteCommentaire(idcomment: String!):Commentaire!
  
  createCompany(companyInput: CompanyInput!):Company!
  deletecompany(companyId: ID!):Company!
  
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
