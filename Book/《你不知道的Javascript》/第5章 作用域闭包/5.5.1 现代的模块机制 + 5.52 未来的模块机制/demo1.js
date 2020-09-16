/*
大多数模块依赖加载器/管理器本质上都是将这种模块定义封装进一个友好的API。
这里并不会研究某个具体的库，为了宏观了解我会简单地介绍一些核心概念：
*/

var MyModules = (function Manager() {
    var modules = {};

    function define(name, deps, impl) {
        for (var i=0; i<deps.length; i++) {
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply( impl, deps );
    }
    function get(name) {
        return modules[name];
    }

    return {
        define: define,
        get: get
    };
})();

// 下面展示了如何使用它来定义模块：
MyModules.define( "bar", [], function() {
    function hello(who) {
        return "Let me introduce: " + who;
    }

    return {
        hello: hello
    };
} );
// 该示例因使用apply限制只能使用["bar"] 引用一个，不能多引用 MyModules.define( "foo", ["bar","cc"])
MyModules.define( "foo", ["bar"], function(bar) {
    var hungry = "hippo";

    function awesome() {
        console.log( bar.hello( hungry ).toUpperCase() );
    }

    return {
        awesome: awesome
    };
} );

var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );


/*
* ES6中为模块增加了一级语法支持。但通过模块系统进行加载时，ES6会将文件当作独立的模块来处理。
* 每个模块都可以导入其他模块或特定的API成员，同样也可以导出自己的API成员。
* */

/*bar.js*/
function hello(who) {
    return "Let me introduce: " + who;
}

export hello;

/*foo.js*/

// 仅从"bar"模块导入hello()
import hello from "bar";

var hungry = "hippo";

function awesome() {
    console.log(
        hello( hungry ).toUpperCase()
    );
}

export awesome;

/*baz.js*/

// 导入完整的"foo"和"bar"模块
module foo from "foo";
module bar from "bar";