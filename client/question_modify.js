Session.setDefault("modifing-question",false);
Session.setDefault("adding-answer",false);
Session.setDefault("current_question",false);

Template.modify_question.modify_question = function(){
	return Session.equals("modifing-question",true);
};
Template.modify_question.add_answer = function(){
	return Session.equals("adding-answer",true);
};
Template.modify_question.events({
	'click .modifyques': function(e,t){
    Session.set("modifing-question",true);
    Meteor.flush();
    //set the focus onto the input box
    focusText(t.find("#edit-question"),"请输入修改后的问题");
    console.log("this -id "+this._id);
  },
   'keyup #edit-question':function(e,t){
    if(e.which ===13){
      var quesVal = String(e.target.value||"");
      if(quesVal)
        updateQuestion(this._id,quesVal);
     Session.set("modifing-question",false);
    }
  },
   'focusout #edit-question': function(e,t){
    Session.set("modifing-question",false);
  },
  	'click .addanswer': function(e,t){
    Session.set("adding-answer",true);
    Meteor.flush();
    //set the focus onto the input box
    focusText(t.find("#edit-new-answer"),"请输入要添加的答案选项");
    console.log("this -id "+this._id);
  },
  'keyup #edit-new-answer':function(e,t){
    if(e.which ===13){
      var catVal = String(e.target.value||" ");
      if(catVal){
        updateAnswer(this._id,catVal);
        Session.set('adding-answer',false);
      }
    }
  },
   'focusout #edit-new-answerssss': function(e,t){
    Session.set("adding-answer",false);
  },
  'click .deleteques':function(e,t){
    removeQuestion(this._id);
  }
});
function updateQuestion(question_id,newquestion){
  console.log("modify question");
	hosQuestions.update({_id:question_id},{$set:{question:newquestion}});
}
function updateAnswer(question_id,newanswer){
  console.log("this is a new answer option");
	var answers = hosQuestions.findOne({_id:question_id}).items;
  if(!answers)
    answers = new Array(newanswer);
  else
    answers.push(newanswer);
	hosQuestions.update({_id:question_id},{$set:{items:answers}});
}

function removeQuestion(question_id){
	hosQuestions.remove({_id:question_id});
}
function focusText(i,val){
  i.focus();
  i.value = val?val:"";
  i.select();
};

Template.questions.events({
   'click #btnquestion':function(e,t){
    Session.set("current_question",this._id);
  },
  'click .delete_item':function(e,t){
    removeItem(Session.get("current_question"),e.target.id);
  }
}); 
function removeItem(question_id,item){
  console.log("delete item");
  console.log("the delete item is:"+item);
  if(!item&&!question_id)
    return;
  console.log("the question_id is:"+question_id);
  var answers = hosQuestions.findOne({_id:question_id}).items;
  console.log(answers);
  for(var i=0;i<answers.length;i++){
    if(answers[i]===item){
      answers.splice(i,1);
      break;
    }
  }
  hosQuestions.update({_id:question_id},{$set:{items:answers}});
};

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});