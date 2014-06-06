Meteor.publish("hosquestions",function(){
  return hosQuestions.find();
})

Meteor.startup(function () {
  if(hosQuestions.find().count()===0){
    var data=[{
      type:"1",question:"什么吸引您来清远市第二人民医院？",
      items:["广告宣传吸引","员工服务好","医疗技术好","价格便宜"]},
      {type:"1",question:"您最喜欢哪个医生的服务?",
        items:["张医生","赵医生","李医生","王医生"]}];

    for(var i=0;i<data.length;i++){
     hosQuestions.insert(data[i]);
    }
  }
 });