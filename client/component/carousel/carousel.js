import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import   './carousel.scss';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1 ,
            isNext:false    
        }
        this.dotIndex = this.dotIndex.bind(this);
    }
/**
 * 轮播思路：
1、首先要有个盛放图片的容器，设置为单幅图片的宽高，且overflow：hidden，这样保证每次可以只显示一个图片 
2、Container内有个放图片的list进行position的定位 ，其中的图片采用float的方式，同时当图片进行轮播时，改变list的Left值使得其显示的图片发生变化。 
3、图片的轮播使用定时器，通过定时器改变list的Left值是的图片循环展示 
4、当鼠标滑动到图片上时，清除定时器，图片停止轮播，当鼠标移出时继续进行轮播 
5、图片上有一组小圆点用于与当前显示的图片相对应，同时可以通过点击的方式查看对应的图片 
6、图片可以通过点击进行左右滑动显示 
 */
    _dotActive(){
        var dots = document.getElementsByClassName("dot");
        var len = dots.length;
        for(var i=0 ;i<len ;i++){
            dots[i].className = "dot";
        }
        for(var i=0;i<len;i++){
            if(this.state.index === parseInt(dots[i].getAttribute("index"))){
                dots[i].className = "dot active";
            }
        }
        console.log('_dotActive this.state.index'+this.state.index); //因为没有相等，获取被点击的对象
      
    }

    dotIndex(add){
        // 往下点up和down值都一样，证明没那么快响应，没有累加动作。我觉得是刚放上去还没到1000s，那步还没有执行
        console.log('dotIndex up this.state.index'+this.state.index);
        if(add){
            this.setState({
                index:Number(this.state.index)+1
            },() => {
                if(this.state.index > 6){
                    this.setState({
                        index:1
                    })
                }else if(this.state.index < 1){
                    this.setState({
                        index:6
                    })
                } 
            })
        }
        else{
            this.setState({
                index:Number(this.state.index)-1
            },() => {
                if(this.state.index > 6){
                    this.setState({
                        index:1
                    })
                }else if(this.state.index < 1){
                    this.setState({
                        index:6
                    })
                } 
            })
        }
        // 如果是异步，可能此处还不能获取到this.state.index，应该用函数形式。但是此例子获取到了，可是不用函数this.state.index会到7
        // if(this.state.index > 6){
        //     this.setState({
        //         index:1
        //     })
        // }else if(this.state.index < 1){
        //     this.setState({
        //         index:6
        //     })
        // } 

        console.log('dotIndex down this.state.index'+this.state.index);
    }

    componentWillMount() {

    }
    componentWillUnmount(){
        clearInterval(this.interval);
    }    
    // 能获取到行内标签，但是获取不到行外标签
    componentDidMount() {
        this.isNext = false;
        this.autoPlay();
        // console.log( ReactDOM.findDOMNode(this.refs.container).style.width); 
        this.listEle.style.color = 'red';
    }

    autoPlay(){
        // var dots = document.getElementsByClassName("dot");
        // var len = dots.length;
        // 需要使用箭头函数
        this.interval = setInterval( () => {
            this.animation(-600);
            this.dotIndex(true);
            this._dotActive();

            console.log(this.state.index);
        },1000)
    }

    stopAutoPlay() {
        clearInterval(this.interval);
    }
// 图片往下走，但是按钮是跟state对应着。第一次点击放上去没有反映。
    animation(offset){
        var lists = document.getElementsByClassName("list")[0];
        var left = parseInt(lists.style.left.slice(0,lists.style.left.indexOf("p"))) + offset;
        if(left<-3000){
            lists.style.left = "0px";
        }else if(left>0){
            lists.style.left = "-3000px";
        }else{
            lists.style.left = left+"px";
        }
    }
    // 当点击需要做更新样式和动画
    dotClick(event){
        event.preventDefault();
        var dots = document.getElementsByClassName("dot");
        var len = dots.length;
        for(var i=0 ;i<len ;i++){
            dots[i].className = "dot";
        }

        let index = event.target.getAttribute("index");    
        let index1 = this.state.index;

        if(this.state.index === index){
                event.target.className = "dot active";
        }

        this.setState({
            index:index
        })
        this.animation(( this.state.index - index)*(-600));
        
        // this._dotActive() ;
        console.log('index:'+index);
    }

    // 得出结论，click动作中不能再获取函数，不然出错。
    // 鼠标放上去，先获取不到index
    preClick(){
        this.animation(600);
        this.dotIndex(false);
        this._dotActive();
    }
    nextCilck(){
        
        this.isFirstNext = true;
        this.animation(-600);
        this.dotIndex(true);
        
        this._dotActive();
        
        // 点击右边图片有立马更新，但是指引没有立马更新，再点一次才更新
    }
    /*容器的hover事件*/
    mouseover(){
        this.stopAutoPlay();
    }
    mouseout(){
        this.autoPlay();
    }

    render() {
        //  ref={ele => {this.liEle = ele; }}
        var numbers = [1,2,3,4,5,6,7,8,9];
    //     const dotsEle = numbers.map(function(item,i){
    // 　　　　　　　return <li key={i} index={i} className="dot" onClick={this.dotClick}></li>})
        return (

   <div className = {"carousel-container"} onMouseOver={this.mouseover.bind(this)} onMouseOut={this.mouseout.bind(this)} ref={"container"} style={{color:'red'}}>
        <div className="list" ref={ele => {this.listEle = ele; }}style={{left:'0px'}} >
            <img src="http://www.ftacademy.cn/subscription.jpg"/>
            <img src="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fi.ftimg.net%2Fpicture%2F5%2F000079465_piclink.jpg?source=ftchinese&width=500&height=282&fit=cover&from=next001"/>
            <img src="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fi.ftimg.net%2Fpicture%2F8%2F000063428_piclink.jpg?source=ftchinese&width=500&height=282&fit=cover&from=next001"/>
            <img src="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fi.ftimg.net%2Fpicture%2F3%2F000068223_piclink.jpg?source=ftchinese&width=500&height=282&fit=cover&from=next001"/>
            <img src="http://www.ftacademy.cn/subscription.jpg"/>
            <img src="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fi.ftimg.net%2Fpicture%2F5%2F000069135_piclink.jpg?source=ftchinese&width=500&height=282&fit=cover&from=next001"/>
            <img src="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fi.ftimg.net%2Fpicture%2F0%2F000054320_piclink.jpg?source=ftchinese&width=500&height=282&fit=cover&from=next001"/>
        </div>

        <ul className="dots">
            <li index='1' className="active dot" onClick={this.dotClick.bind(this)}></li>
            <li index='2' className="dot"  onClick={this.dotClick.bind(this)}></li>
            <li index='3' className="dot"  onClick={this.dotClick.bind(this)}></li>
            <li index='4' className="dot"  onClick={this.dotClick.bind(this)}></li>
            <li index='5' className="dot"  onClick={this.dotClick.bind(this)}></li>
            <li index='6' className="dot"  onClick={this.dotClick.bind(this)}></li>
        </ul>
        <div className="pre" onClick={this.preClick.bind(this)}> 《 </div>
        <div className="next" onClick={this.nextCilck.bind(this)}> 》 </div>
 </div> 
        );
    }

}
export default Carousel;
