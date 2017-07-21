import React,{Component} from 'react';

//引入头部
import NewsHeader from './news_header';


//引入pc-css样式
import '../componentCss/pc.css';

//组件--根路由
class App extends Component{
  render(){
    return(
      <div>
        <NewsHeader/>

        {this.props.children}
          <div>footer</div>
      </div>
    )
  }
}
//暴露
export default App;
