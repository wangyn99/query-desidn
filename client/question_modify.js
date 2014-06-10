Session.setDefault("addquestion",false);
Session.setDefault("currentType",null);

Template.design.events({
    'click #logout': function(){
      Meteor.logout();
    }
});

Template.questionType.type = function(){
	return QuestionTypes.find();
};
Template.questionType.addquestion = function(){
	return Session.equals("addquestion",true);
};


Template.questionType.events({
	'click .plus': function(e,t){
		Session.set("addquestion",true);
		Meteor.flush();
		Session.set("currentType",this.typevalue);
		focusText(t.find("#add-question"),"请输入要添加的问题");
	},
	'keyup #add-question': function(e,t){
		if(e.which ===13){
      		var catVal = String(e.target.value||"");
      		if(catVal){
       			 HQuestions.insert({type:Session.get("currentType"),question:catVal});
       			 Session.set("addquestion",false);
      		}
    	}
	},
	'focusout #add-question': function(e,t){
		Session.set("addquestion",false);
   		 Session.set('currentType',null);
  }
});
function focusText(i,val){
  i.focus();
  i.value = val?val:"";
  i.select();
};
function focusInput(i){
  i.focus();
  i.select();
};
Template.question_design.ques = function(){
	return HQuestions.find();
};
Template.question.editing_question = function(){
  return Session.get("edit-"+this._id);
};

Template.question.events({
	'click .question':function(e,t){
    Session.set("edit-"+t.data._id,true);
		Meteor.flush();
		focusInput(t.find(".edquestion"));
	},
	'keyup .edquestion': function(e,t){
    	if(e.which===13){
    		var catVal = String(e.target.value||"");
      		if(catVal){
       			 HQuestions.update({_id:this._id},{$set:{question:catVal}});
            Session.set("edit-"+t.data._id,false);
      		}
    	}
  },
  'focusout .edquestion': function(e,t){
		//Session.set("edit-question",false);
    Session.set("edit-"+t.data._id,false);
  },
  'click .del':function(e,t){
  	HQuestions.remove({_id:this._id});
  }
});

Template.showitem.option = function(){
	return HItems.find({questionid:this._id});
};
Template.item.editing_item = function(){
	return Session.get("edit-"+this._id);
};
Template.item.events({
	'click .item':function(e,t){
		Session.set("edit-"+t.data._id,true);
		Meteor.flush();
		focusInput(t.find(".editem"));
	},
	'keyup .editem': function(e,t){
    	if(e.which===13){
    		var catVal = String(e.target.value||"");
      		if(catVal){
       			HItems.update({_id:this._id},{$set:{item:catVal}});
     	 		 Session.set("edit-"+t.data._id,false);
      		}
    }
  },
  'focusout .editem': function(e,t){
		Session.set("edit-"+t.data._id,false);
  },
  'click .itemdel':function(e,t){
  	//console.log("the item to delete is:"+this.item);
  	//console.log("this question's id is del:"+Session.get("currentQuestion"));
  	removeItem(this.questionid,this.item);
  }
});
function removeItem(question_id,itemname){
	var itemid = HItems.findOne({questionid:question_id,item:itemname})._id;
	HItems.remove({_id:itemid});
};
Template.newItem.newitem = function(){
	return Session.get("editing-"+this._id);
};
Template.newItem.typetwo = function(){
  return (this.type==="2");
};
Template.newItem.events({
	'click .newplus':function(e,t){
		 Session.set("editing-"+t.data._id,true);
		Meteor.flush();
		focusInput(t.find(".ednewitem"));
	},
	'keyup .ednewitem': function(e,t){
    	if(e.which===13){
    		var catVal = String(e.target.value||"");
      		if(catVal){
      			//console.log("this question's id is insert:"+Session.get("currentQuestion"));
       			HItems.insert({questionid:this._id,item:catVal,score:"0"});
     	 		Session.set("editing-"+t.data._id,false);
      		}
    }
  },
  'focusout .ednewitem': function(e,t){
		Session.set("editing-"+t.data._id,false);
  },
});