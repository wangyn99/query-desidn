Template.normal.events({
	  'click #logout': function(){
      Meteor.logout();
    }
});
Template.head.notes = function(){
	return HeadInformation.findOne();
};
Template.personinfo.events({
	'click #sub': function(e,t){
		var sex = t.find("#fm").value;
		var age = t.find("#age").value;
		var dep = t.find("#dep").value;
		UserInfo.insert({sex:sex,age:age,dep:dep});
	}
});

Template.question_list.questions = function(){
	return HQuestions.find();
};

Template.questionshow.typetwo = function(){
	return (this.type==="2");
};
Template.questionshow.answer = function(){
	return HItems.find({questionid:this._id});
};
Template.questionshow.percent = function(){
	return this.score;
};

Template.questionshow.events({
	'focusout #answerbox':function(e,t){
		var ans = String(e.target.value||"");
		if(ans){
			Answers.insert({owner:Meteor.userId(),questionid:this._id,answer:ans});
		}
	},
	'click #myoption':function(e,t){
		Answers.insert({owner:Meteor.userId(),questionid:this.questionid,answer:this._id});
		var total = Answers.find({questionid:this.questionid}).count();
		var num = Answers.find({questionid:this.questionid,answer:this._id}).count();
		console.log("the total number is:"+total);
		console.log("the current item number is"+num);
		var score = (Math.round(num / total * 10000) / 100.00 + "%");
		HItems.update({_id:this._id},{$set:{score:score}});
	}
});
