Meteor.subscribe("hquestions");
Meteor.subscribe("questionTypes");
Meteor.subscribe("hitems");
Meteor.subscribe("answers");
Meteor.subscribe("headinformation");
Meteor.subscribe("userinfo");
Template.login.administrator = function(){
  return(adminUser(Meteor.userId()));
};

function adminUser(userId){
  //console.log("the userId  "+userId);
  var admUser = Meteor.users.findOne({username:"admin"});
  return (userId&&admUser&&userId===admUser._id);
};
Template.login.creatingAccount = function(){
    return Session.get("creatingAccount");
  };

  Template.login.events({
    'click #loginform': function(e,t){
      Session.set('creatingAccount',false);
    },
    'click #accountform': function(){
      Session.set('creatingAccount',true);
    },
    'click #createaccount': function(e,t){
      Session.set('creatingAccount',false);
      Accounts.createUser({
        username:t.find("#username").value,
        password:t.find("#password").value,
        email:t.find("#email").value,
        profile:{
          name: t.find("#name").value
        }
      });
    },
    'click #login': function(e,t){
      Meteor.loginWithPassword(t.find("#username").value,t.find("#password").value);
    }
  });