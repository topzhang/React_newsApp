
//图片新闻列表组件

import React,{Component,PropTypes} from 'react';
import {Card} from 'antd';
import {Link} from 'react-router';
import axios from 'axios';

class NewsImageBlock extends Component {
  //属性
  static propTypes = {
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired,
    cardTitle:PropTypes.string.isRequired,
    cardWidth:PropTypes.string.isRequired,
    imageWidth:PropTypes.string.isRequired
  };

  //初始化数据
  constructor(props){
    super(props);
    this.state={
      newsArr:[]
    }
  }

  //发送ajax请求
  componentDidMount(){
    const {type,count} = this.props;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`;
    axios.get(url)
      .then((response)=>{
        // 获取结果数据
        const  result = response.data;
        //更新状态
        this.setState({
          // result是数组，使用包含图片
          newsArr:result
        });
      });
  }


  //渲染
  render(){
    //获取属性
    const {cardTitle,cardWidth,imageWidth} = this.props;
    //
    const {newsArr} = this.state;
    //定义图片样式
    const imgStyles = {
      width:imageWidth,
      height:'90px',
      display:'block'
    }
    //标题样式
    const titleStyles={
      width:imageWidth,
      whiteSpace: "nowrap",//不能换行
      overflow: "hidden",//超出部分自动隐藏
      textOverflow: "ellipsis"  //显示省略号
    }

    const newsList = newsArr.length === 0
      ?'no news'
      : newsArr.map((news,index)=>{// 判断图片卡片的显示
            const {uniquekey,thumbnail_pic_s,title,author_name} = news;
            return (
              <div className="imageblock">
                <Link to={`/detail/${uniquekey}`}>

                  <div>
                    <img src={thumbnail_pic_s}  style={imgStyles} alt=""/>
                  </div>

                  <div className="custom-card">
                    <h3 style={titleStyles}>{title}</h3>
                    <p>{author_name}</p>
                  </div>

                </Link>
              </div>
            )
          })


    return(
      <Card title="cardTitle" style={{width:cardWidth}} className="topNewsList">
        {newsList}
      </Card>
    )
  };
}

//暴露
export default NewsImageBlock;

