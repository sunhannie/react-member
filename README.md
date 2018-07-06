# react-member
it can use to pay

# 现象

QandA中碰到的问题：
```
let newData = {};
    ajax('http://localhost:9000/memberData').then(data => {
        return Promise.resolve({data:data});
    }).then(data => {
        newData = Object.assign({}, data);    
        this.setState({data:data});
        console.log(this.state);
    }).catch(e => {
        console.log(e);
        alert(`Error: ${e}`);
    });
```
在render中  const data = this.state.data; 
data第一次默认为构造函数中的值，所以渲染默认为空


// 发现一现象：input中的值inputVal，不会根据自己输入的值变化，页面中会一直显示设置的2，因为是最终render的
```
三种写法
<input value={inputVal} onChange={this.handleChange}/>
<input value={inputVal} onChange={(e)=> {console.log('1');}}/>
<input value={inputVal} onChange={this.handleChange.bind(this)}/>
handleChange(event) {
  // handleChange = (e) => {  //这种写法为什么写错了，难道是必须写在input标签中吗？

}
```
## 
https://reactjs.org/docs/lists-and-keys.html#keys  
使用key就能消除下面warning，可以根据props值获取key后面的值，所以应该传到组件中

Warning: Each child in an array or iterator should have a unique "key" prop.

// 为什么会出现2遍数据?因为生命周期中渲染第一次为空，

QandA.js:1 Uncaught Error: Module build failed: SyntaxError: Adjacent JSX elements must be wrapped in an enclosing tag (26:72)   
必须有一个wrap标签

第一次都为空，为什么map能渲染出来呢

```
let responses = response.index.map((item,index)=>{
    return <div key={index}><li key={index}>{item.title}{item.price}</li></div>
})
let response1 = response.index.map((item,index)=>{
    return <div key={index}><li key={index}>{item.title}{item.price}</li></div>
})
let response1 = (()=>{
    return <div><li>11{response.index[0].title}</li></div>
})
```

## 配置问题
如果css-loader写在sass-loader之后，会出现以下错误

ERROR in ./node_modules/sass-loader/lib/loader.js??ref--8-1!./node_modules/css-loader??ref--8-2!./client/component/nav/nav.scss
Module build failed:

css-loader 解释(interpret) @import 和 url() ，会 import/require() 后再解析(resolve)它们。
引用资源的合适 loader 是 file-loader 和 url-loader，您应该在配置中指定（查看如下设置）。
import css from 'file.css';

http://www.css88.com/doc/webpack/loaders/css-loader/

http://www.css88.com/doc/webpack/loaders/sass-loader/

建议将 style-loader 与 css-loader 结合使用

顺序一定要：'style-loader'   'css-loader'  'sass-loader'

通过将 style-loader 和 css-loader 与 sass-loader 链式调用，可以立刻将样式作用在 DOM 元素。

node-sass 和 webpack 是 sass-loader 的 peerDependency，因此能够精确控制它们的版本。

线上最好能将css文件不依赖于js文件，成为一个单独的文件


https://segmentfault.com/q/1010000013564212/a-1020000014100311

blob:http://localhost:9000/cc7ae692-6a3a-4f18-a0e7-8f9c5232efc5  生成的css文件名
https://www.npmjs.com/package/extract-text-webpack-plugin  (插件用法)
```
test: /\.css$/,
use: ExtractTextPlugin.extract({
    fallback: "style-loader", // 编译后用什么loader来提取css文件
    use: "css-loader" // 指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
})
```

## 最终文件布局
一个组件，一个css文件。
好像extract-text-webpack-plugin没有生效