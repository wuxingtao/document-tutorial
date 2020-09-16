var student = require('./student');
var teacher = require('./teacher');

// teacher.add('Scott')             //Add teacher:Scott

function add(teacherName, students) {
    teacher.add(teacherName)

    students.forEach(function(item, index) {
        student.add(item)
    })

}

exports.add = add //传统模块

// module.exports = add
//所以，一句话做个总结：当我们想让模块导出的是一个对象时， exports 和 module.exports 均可使用（但 exports 也不能重新覆盖为一个新的对象），而当我们想导出非对象接口时，就必须也只能覆盖 module.exports