
//网页主体
import React,{Component} from 'react';

//链接
import {Link} from 'react-router';
//antd
import {
  Row,
  Col,
  Carousel,
  Tabs
} from 'antd';

//引入图片
import carousel_1 from '../images/carousel_1.jpg';
import carousel_2 from '../images/carousel_2.jpg';
import carousel_3 from '../images/carousel_3.jpg';
import carousel_4 from '../images/carousel_4.jpg';

import NewsBlock from './news_block';
import NewsProducts from './news_products';
import NewsImageBlock from './news_image_block';

const TabPane = Tabs.TabPane;


//默认路由

//组件
class NewsContainer extends Component{

  render(){

    return(
      <div className="container">
        {/*布局*/}
        <Row>
          <Col span={1}/>
          {/*内容区域*/}
          <Col span={22}>

            <div className="leftContainer" style={{width:"35%"}}>
              {/*轮播图*/}{/*引入图片*/}{/*autoplay=true默认值*/}
              <Carousel autoplay>
                <div>
                  <img src={carousel_1} alt=""/>
                </div>
                <div>
                  <img src={carousel_2} alt=""/>
                </div>
                <div>
                  <img src={carousel_3} alt=""/>
                </div>
                <div>
                  <img src={carousel_4} alt=""/>
                </div>
              </Carousel>
              <NewsImageBlock type="guoji" count={6} cardTitle="国际新闻" cardWidth="400px" imageWidth="112px"/>

            </div>
          {/*切换新闻页*/}
          <Tabs className='tabs_news' style={{width:"35%"}}>
            <TabPane  tab="头条新闻" key="1">
              {/*type="top"哪种新闻类型，count={20}显示列表新闻的数量*/}
              <NewsBlock type="top" count={20}/>
            </TabPane>

            <TabPane tab="国际新闻" key="2">
              <NewsBlock type="guoji" count={20}/>
            </TabPane>
          </Tabs>
          {/*产品新闻*/}
          <Tabs className="tabs_product" style={{width:"30%"}}>
            <TabPane tab="News Prodicts" key="1">
              <NewsProducts/>

            </TabPane>


          </Tabs>

            <div>
              <NewsImageBlock type="guonei" count={8} cardTitle="国内新闻" cardWidth="100%" imageWidth="132px"/>
              <NewsImageBlock type="yule" count={16} cardTitle="娱乐新闻" cardWidth="100%" imageWidth="132px"/>

            </div>

          </Col>
          <Col span={1}/>
        </Row>
      </div>


      // <div>
      //   <ul>
      //     <li>
      //       <Link to="/detail/111">新闻一</Link>
      //     </li>
      //     <li>
      //       <Link to="/detail/22">新闻二</Link>
      //     </li>
      //
      //     <br/>
      //
      //     <li>
      //       <Link to="/usercenter">个人中心</Link>
      //     </li>
      //
      //
      //   </ul>
      // </div>

    )
  }
}
//暴露
export default NewsContainer;

