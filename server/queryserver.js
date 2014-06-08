Meteor.publish("questionTypes",function(){
	return QuestionTypes.find();
});

Meteor.publish("hquestions",function(){
	return HQuestions.find();
});
Meteor.publish("hitems",function(){
	return HItems.find();
});
Meteor.publish("headinformation",function(){
	return HeadInformation.find();
});
Meteor.publish("answers",function(){
	return Answers.find();
});
Meteor.publish("userinfo",function(){
	return UserInfo.find();
});

 Meteor.startup(function () {
    if(QuestionTypes.find().count()===0){
    	QuestionTypes.insert({typename:"多选项问题",typevalue:"1"});
    	QuestionTypes.insert({typename:"问答题",typevalue:"2"});
    }
    if(!HeadInformation.findOne()){
    	var text="您好，我们是艾力彼管理顾问公司，受医院委托进行调研，目的是了解医院在病人心目中的形象，帮助医院提供更好的服务。调查不留姓名，我们保证对您的回答保守秘密。"
    	HeadInformation.insert({text:text});
    }
  });
