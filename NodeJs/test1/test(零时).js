function Blog(name,url){
    this.name = name;
    this.url = url;
    this.alertUrl = function(){
        alert(this.url);
    }
}

var blog =new Blog('wuyuchang','http://ww.jb../');
console.log(blog instanceof Blog)