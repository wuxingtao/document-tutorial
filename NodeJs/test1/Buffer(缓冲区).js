/*在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
 */

//写入缓冲区        buf.write(string[, offset][, length][, encoding])
//从缓冲区读取数据  buf.toString([encoding][, start][, end])


//
var buf = new Buffer(256);
var len = buf.write("www.runoob.com");
console.log("写入字节数：" + len);
console.log(buf.toString('utf8', 0, 25) + '\n');



//
buf = new Buffer(26);
for (var i = 0; i < 26; i++) {
    buf[i] = i + 97;
}

// len = buf.write("www.runoob.com","utf-8")    //输出：www.r

console.log(buf.toString('ascii')); // 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString('ascii', 0, 5)); // 输出: abcde
console.log(buf.toString('utf8', 0, 5)); // 输出: abcde
console.log(buf.toString(undefined, 0, 5)); // 使用 'utf8' 编码, 并输出: abcde

console.log("\n")

//将Buffer转换为JSON对象
var buf = new Buffer("jsondata", "4", "utf-8");
var json = buf.toJSON(buf);

console.log(json)

//缓冲区合并    Buffer.concat(list[, totalLength])
var buffer1 = new Buffer('菜鸟教程 ');
var buffer2 = new Buffer('www.runoob.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());

//缓冲区比较     buf.compare(otherBuffer);
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if (result < 0) {
    console.log(buffer1 + " 在 " + buffer2 + "之前"+'\n');
} else if (result == 0) {
    console.log(buffer1 + " 与 " + buffer2 + "相同");
} else {
    console.log(buffer1 + " 在 " + buffer2 + "之后");
}

//拷贝缓冲区     buf.copy(targetBuffer[, targetStart][, sourceStart][, sourceEnd])
var buffer1 = new Buffer("ABC");
var buffer2 = new Buffer(4);
buffer1.copy(buffer2,"0","0","3")
console.log(buffer2.toString());    //buffer2 默认ASCII格式 41 42 43 00
console.log('\n');

//缓冲区裁剪     buf.slice([start][, end])
var buffer1 = new Buffer('runoob');
var buffer2 =buffer1.slice(2,5);
console.log("buffer2 content：" + buffer2.toString());

//缓冲区长度

var buffer = new Buffer('www.runoob.com');
console.log("buffer length："+buffer.length)
console.log('\n')


//Buffer 方法
var b = new Buffer(6);
b.writeUIntBE(1447656645380, 0, 6);
console.log("readUIntBE:"+b.readUIntBE(0, 6));
console.log("readUIntLE:"+b.readUIntLE(0, 6));
console.log("readFloatBE:"+b.readFloatBE(0, 6));
console.log("readFloatLE:"+b.readFloatLE(0, 6));
console.log(b.readUInt16BE(0, 6).toString())
console.log(b.readUInt16LE(0, 6).toString())