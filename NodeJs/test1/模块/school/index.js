var klass = require('./klass')

// klass.add('Scott',['白富美','高富帅'])     //增加班级

//暴露学校模块
exports.add = function(klasses){
    klasses.forEach(function(item,index){
        var _klass =item;
        var teacherName = item.teacherName;
        var students = item.students

        klass.add(teacherName,students)
    })
}