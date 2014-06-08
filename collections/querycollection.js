HQuestions = new Meteor.Collection("hquestions");
/*question={type:
      question:
      }
*/
HItems = new Meteor.Collection("hitems");
/*item={questionid:
    item:
    score:
    }
*/
Answers = new Meteor.Collection("answers");
/*answer={questionid:
      userid:
      itemid:
    }
*/
QuestionTypes = new Meteor.Collection("questionTypes");
/*{typename:
    typevalue:}
*/
HeadInformation = new Meteor.Collection("headinformation");
//text:
UserInfo = new Meteor.Collection("userinfo");

 function adminUser(userId){
  //console.log("the userId  "+userId);
  var adminUser = Meteor.users.findOne({username:"admin"});
  return (userId&&adminUser&&userId===adminUser._id);
}

HQuestions.allow({
  insert: function(userId,doc){
    return (adminUser(userId));
  },
  update: function(userId,docs,fields,modifer){
    return adminUser(userId);
  },
  remove: function(userId,docs){
    return adminUser(userId);
  }
});

QuestionTypes.allow({
  insert: function(userId,doc){
    return (adminUser(userId));
  },
  update: function(userId,docs,fields,modifer){
    return adminUser(userId);
  },
   remove: function(userId,docs){
    return adminUser(userId);
  }
});

HItems.allow({
  insert: function(userId,doc){
    return adminUser(userId);
  },
  update: function(userId,docs,fields,modifer){
    return userId;
  },
  remove: function(userId,docs){
    return adminUser(userId);
  }
});
Answers.allow({
  insert: function(userId,doc){
    return userId;
  },
  update: function(userId,docs,fields,modifer){
    return userId;
  },
   remove: function(userId,docs){
    return userId;
  }
});
UserInfo.allow({
  insert: function(userId,doc){
    return userId;
  },
  update: function(userId,docs,fields,modifer){
    return userId;
  },
   remove: function(userId,docs){
    return userId;
  }
});

