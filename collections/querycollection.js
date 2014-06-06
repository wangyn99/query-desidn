hosQuestions = new Meteor.Collection("hosquestion");

function adminUser(userId){
	//console.log("the userId  "+userId);
	var adminUser = Meteor.users.findOne({username:"admin"});
	return (userId&&adminUser&&userId===adminUser._id);
}

hosQuestions.allow({
	insert: function(userId,doc){
		return adminUser(userId);
	},
	update: function(userId,docs,fields,modifer){
		return adminUser(userId);
	},
	remove: function(userId,docs){
		return adminUser(userId);
	}
});
