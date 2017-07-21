
/*
import React from 'react';
import {render} from 'react-dom';
//引入路由
import {Router,Route,IndexRoute,hashHistory} from 'react-router'

//引入路由组件
import NewsContainer from './components/news_container';
import NewsDetail from './components/news_detail';
import App from './components/app';
import UserCenter from './components/user-center2'

 import MobileApp from './components/mobile_app'

render((
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={NewsContainer}></IndexRoute>
      <Route path='/detail/:uniqueKey' component={NewsDetail} />
      <Route path='/usercenter' component={UserCenter} />
    </Route>
  </Router>
), document.getElementById('root'));

*/


import React from 'react'
import {render} from 'react-dom'
import {Router, Route,IndexRoute, hashHistory} from 'react-router'
import MediaQuery from 'react-responsive'
import App from './components/app'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user-center2'

import MobileApp from './components/mobile_app'
import MobileNewsContainer from './components/mobile_news_container'
import MobileNewsDetail from './components/mobile_news_detail'
import MobileUserCenter from './components/mobile_user-center'

render((

  <div>

    {/*pc*/}

    <MediaQuery query='(min-device-width: 1224px)'>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={NewsContainer}></IndexRoute>
          <Route path="/detail/:uniqueKey" component={NewsDetail}/>
          <Route path="/usercenter" component={UserCenter}/>
        </Route>
      </Router>
    </MediaQuery>

    {/*mobile*/}
    <MediaQuery query='(max-device-width: 1224px)'>
      <Router history={hashHistory}>
        <Route path='/' component={MobileApp}>
          <IndexRoute component={MobileNewsContainer} />
          <Route path="/detail/:uniqueKey" component={MobileNewsDetail}/>
          <Route path="/usercenter" component={MobileUserCenter}/>
        </Route>
      </Router>
    </MediaQuery>
  </div>

), document.getElementById('root'))

