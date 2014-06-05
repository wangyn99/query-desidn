Session.setDefault("moreanswers","1");
Session.setDefault("oneanswer","2");
Session.setDefault("freeanswer","3");
Session.setDefault("adding_type1",false);
Session.setDefault("adding_type2",false);
Session.setDefault("adding_type3",false);


Template.questions.ques = function(){
	return Questions.find();
};

Template.questions.more_answers = function(){
	return Session.equals("moreanswers",this.type);
};
Template.questions.item = function(){
  return this.items;
};
Template.questions.one_answer = function(){
  return Session.equals("oneanswer",this.type);
};
Template.questions.free_answer = function(){
  return Session.equals("freeanswer",this.type);
};

Template.questionType.new_more_ans = function(){
	return Session.equals("adding_type1",true);
};
Template.questionType.new_one_ans = function(){
  return Session.equals("adding_type2",true);
};
Template.questionType.new_free_ans = function(){
  return Session.equals("adding_type3",true);
};
Template.questionType.events({
	'click #btnNewMore': function(e,t){
    Session.set("adding_type1",true);
    Meteor.flush();
    //set the focus onto the input box
    focusText(t.find("#add-question1"));
  },
   'keyup #add-question1':function(e,t){
    //输入完毕，按下enter键
    if(e.which ===13){
      var catVal = String(e.target.value||"");
       //checks to see if the input field has any value in it
      if(catVal){
        //使用空格对输入数据进行分割
        var questionVal = catVal.split(" ");
        var question = questionVal[0];
        var itemVar = questionVal.slice(1);
        Questions.insert({type:"1",question:question,items:itemVar});
        Session.set('adding_type1',false);
      }
    }
  },
   'focusout #add-question1': function(e,t){
    Session.set('adding_type1',false);
  },
  'click #btnNewOne': function(e,t){
    Session.set("adding_type2",true);
    Meteor.flush();
    //set the focus onto the input box
    focusText(t.find("#add-question2"));
  },
   'keyup #add-question2':function(e,t){
    //输入完毕，按下enter键
    if(e.which ===13){
      var catVal = String(e.target.value||"");
       //checks to see if the input field has any value in it
      if(catVal){
        var questionVal = catVal.split(" ");
        var question = questionVal[0];
        var itemVar = questionVal.slice(1);
        Questions.insert({type:"2",question:question,items:itemVar});
        Session.set('adding_type2',false);
      }
    }
  },
   'focusout #add-question2': function(e,t){
    Session.set('adding_type2',false);
  },
  'click #btnNewFree': function(e,t){
    Session.set("adding_type3",true);
    Meteor.flush();
    //set the focus onto the input box
    focusText(t.find("#add-question3"));
  },
   'keyup #add-question3':function(e,t){
    //输入完毕，按下enter键
    if(e.which ===13){
      var catVal = String(e.target.value||"");
       //checks to see if the input field has any value in it
      if(catVal){
        Questions.insert({type:"3",question:catVal,items:[]});
        Session.set('adding_type3',false);
      }
    }
  },
   'focusout #add-question': function(e,t){
    Session.set('adding_type3',false);
  }
});
  

function focusText(i){
  i.focus();
  i.select();
};
