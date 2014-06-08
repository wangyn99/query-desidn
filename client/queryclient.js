Meteor.subscribe("hquestions");
Meteor.subscribe("questionTypes");
Meteor.subscribe("hitems");
Meteor.subscribe("answers");
Meteor.subscribe("headinformation");
Meteor.subscribe("userinfo");
Template.list.administrator = function(){
  return(adminUser(Meteor.userId()));
};

function adminUser(userId){
  //console.log("the userId  "+userId);
  var admUser = Meteor.users.findOne({username:"admin"});
  return (userId&&admUser&&userId===admUser._id);
};
Template.list.ordinary = function(){
  if(Meteor.userId()){
    return true;
  }
 else 
   return false;
};

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});