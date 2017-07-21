
/*
新闻列表，文字新闻
 */

import React,{Component,PropTypes} from 'react';
import axios from 'axios';
import {Card} from 'antd';
import {Link} from 'react-router';

class NewsBlock extends Component{

  static propTypes = {
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired

  };

  //显示列表数据
  constructor(props){
    super(props);
    //初始化状态
    this.state = {
      newsArr:[]
    }

  }
  //获取数据
  componentDidMount(){
    const {type,count} = this.props;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
    axios.get(url)
      .then((response)=>{
        // 获取结果数据
        const  result = response.data;
        //更新状态
        this.setState({
          newsArr:result
        });
      });
  }
  //渲染
  render(){

    const {newsArr} = this.state;
    const newsList = newsArr.length
        ?(
          // 生成动态新闻列表
            <ul>
              {
                newsArr.map((news,index)=>{
                  const {title,uniquekey} = news;
                  return (
                    <li key={index}>
                      <Link to={`/detail/${uniquekey}`}>{news.title}</Link>
                    </li>
                  )
                 })
              }
            </ul>
          )
        :"no news";

    return(
      <Card className="topNewsList">
        {newsList}
      </Card>
    )
  }
}

//暴露
export default NewsBlock;
