
//新闻详情--包含各个新闻组件
import React,{Component} from 'react';
import {
  Row,//行
  Col,//列
  BackTop //回到顶部



} from 'antd';

import {Link} from 'react-router'
import axios from 'axios';
//引入图片列表
import NewsImageBlock from './news_image_block';
import NewsComments from './news_comments';


class NewsDetail extends Component{

  //构造函数
  constructor(props){
    super(props);

    //初始化状态
    this.state = {
      news:{}
    }
  }

//方式一

 //发送ajax请求
  componentDidMount(){ //初始化显示
    // const uniquekey = this.props.params.uniqueKey;或者结构赋值写法
    const {uniqueKey} = this.props.params;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`
    axios.get(url)
      .then((response)=>{
        const news = response.data;
        //更新状态
        this.setState({news});
      });
  }
  componentWillReceiveProps(newProps){//切换新闻时调用
    const {uniqueKey} = newProps.params;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`
    axios.get(url)
      .then((response)=>{
        const news = response.data;
        //更新状态
        this.setState({news});
      });
  }
//方式二，单独封装ajax请求
  /*
  componentDidMount(){
    this.showNewsDetail(this.props)
  }
  componentWillReceiveProps(){
    this.showNewsDetail(newProps)
  }
  showNewsDetail=(props)=>{
   const {uniqueKey} = props.params;
   const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniqueKey}`
   axios.get(url)
     .then((response)=>{
       const news = response.data;
       //更新状态
       this.setState({news});
     });
 };
  */




  render(){
    //获取数据
    const {pagecontent} = this.state.news;
    const {uniqueKey}  = this.props.params;

    return(

      <div>

        {/*<Link href="#bottom" title="Basic demo" />*/}

        {/*测试----新闻详情 ： uniqueKey  :{this.props.params.uniqueKey}*/}
        <Col span={1}></Col>
        <Col span={16} className="container">
          <div dangerouslySetInnerHTML={{__html:pagecontent}}></div>
          <hr/>
          <NewsComments uniquekey={uniqueKey}></NewsComments>

        </Col>

        <Col span={6}>
          <NewsImageBlock type="top" count={20} cardTitle="相关新闻" cardWidth="100%" imageWidth="132px"/>

        </Col>
        <Col span={1}></Col>
        <BackTop/>
        <div className="bottom"></div>
      </div>
    )

  }

}

export default  NewsDetail;
