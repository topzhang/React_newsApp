
//头部组件

import React,{Component} from  'react';

//引入布局antd组件  ,,Menu导航相关的组件
import {
  Row,//行
  Col,//列
  Menu,//导航菜单
  Icon,  //导航图标
  Button, //按钮
  Modal, //登录注册对话弹框
  Tabs,  //选项卡切换
  Form, //表单
  Input, //输入框
  message, //提示对象信息  提示succeed和error
} from 'antd';

//引入logo图片
import logo from '../images/logo.png';
//引入Link
import {Link} from 'react-router';
//axios
import axios  from 'axios';


//非import语句必须在import之后编写
const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;//选项卡切换获取
const FormItem = Form.Item; //获取表单

class NewsHeader extends Component{

  constructor(props){
    super(props)
    //初始化状态
    this.state = {
      username:null,  //"tom"
      selectKey:'top', //默认选中哪个导航
      modalShow:false, //注册登录弹框，false默认隐藏

    }
  }

  //读取浏览器本地保存的信息
  componentDidMount(){
    const username = localStorage.getItem('username');
    //判断如果有用户登录的账号信息则更新状态
    //  登录成功后到浏览器Application里查看Local Storage中是否有用户信息
    if(username){
      this.setState({username})
    }

  }



  //动态点击切换导航,menuitem
  handleClickItem = (event)=>{
    //更新selectKey的值
    this.setState({
      selectKey:event.key
    });

    //点击注册登录，弹出注册登录对话框
    if (event.key === 'regist'){
      this.setState({
        modalShow:true
      })

    }


  };
  //关闭对话框
  handleClose = ()=>{
    this.setState({
      modalShow:false
    })
  };
  //退出用户账号
  logout =()=>{
    //清除localStorage中 的数据
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    //更新用户账号状态，username
    this.setState({username:null});

  }


  //点击按钮提交注册的回调 ，发送ajax请求   --定义isRegist判断是否注册
  handleSubmit = (isRegist)=>{
    //alert(isRegist); 检查是否false为登录，true为注册

    //1.带参数url
      //注册  http://newsapi.gugujiankong.com/Handler.ashx?action=register&r_userName=abc&r_password=123123&r_confirmPassword=123123
      //登录  http://newsapi.gugujiankong.com/Handler.ashx?action=login&username=zxfjd3g&password=123123
    let url = 'http://newsapi.gugujiankong.com/Handler.ashx?';
    const action = isRegist ? 'register' : 'login';//判断是登录还是注册
    url += `action=${action}`;  //${action}动态变化
       //getFieldsValue() 返回包含所有输入框数据的集合对象
    const formData = this.props.form.getFieldsValue();

    if(isRegist){//注册
      const {r_username,r_password,r_confirm_password,} = formData;
      //&r_userName=abc&r_password=123123&r_confirmPassword=123123
      url += `&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirm_password}`;

    }else {//登录
      const {username,password} = formData;
      //&username=zxfjd3g&password=123123
      url += `&username=${username}&password=${password}`
    }

    //2.发送ajax
    axios.get(url)
      .then((response)=>{
          const result = response.data;
     //3.请求结束，返回结果，判断注册登录
          if(isRegist){//注册
            if(result === true){
              message.success('注册成功')
            }else {
              message.error('注册失败，请重新注册')
            }
          }else {//登录
            if(result){
              message.success('登录成功')
              //登录成功更新username状态
              const username = result.NickUserName;
              const userId = result.UserId;
              this.setState({username})
              //保存用户信息username ---localStorage把用户信息保存到浏览器本地
              localStorage.setItem('username',username)
              localStorage.setItem('userId',userId)

            }else {
              message.error('登录失败')
            }
          }
      })

    //关闭弹窗
    this.setState({
          modalShow:false
        });
    //清空注册数据，
    this.props.form.resetFields();
  };



  render(){
    //获取初始状态的定义
    const {selectKey,username,modalShow} = this.state;

/*注册登录*/
    //注册登录--三元运算判断
    const userInfo = username
      ? (
        //已登录的状态
        <MenuItem key="logout" className="regist">
            <Button type="primary">{username}</Button>&nbsp;&nbsp;
            <Link to="/usercenter">
              <Button type="dashed">个人中心</Button>
            </Link>
            &nbsp;&nbsp;
            <Button onClick={this.logout}>退出</Button>
        </MenuItem>)
      : (
        <MenuItem key="regist" className="regist">
          <Icon type="appstore-o"/>登录/注册
        </MenuItem>)

    //获取getFieldDecorator，显示输入框，，，form里是一个方法
    const {getFieldDecorator} = this.props.form;

    return(
      //Row行，Col列，span格数
      <header>
{/*布局 */}
        <Row>
          <Col span={1}></Col>
{/*logo*/}
          <Col span={3}>
            <a href='/' className="logo">
              <img src={logo} alt="logo"/>
              <span>HelloNews</span>
            </a>

          </Col>
{/*导航中间部分切换组件 */}
          <Col span={19}>
            <div>
              {/*horizontal水平排列，selectedKeys默认选中*/}
              <Menu mode="horizontal" selectedKeys={[selectKey]} onClick={this.handleClickItem}>
                {/*key是Item的标志*/}
                <MenuItem key="top">
                  <Icon type="folder"/>头条
                </MenuItem>
                <MenuItem key="shehui">
                  <Icon type="folder"/>社会
                </MenuItem>
                <MenuItem key="guonei">
                  <Icon type="folder"/>国内
                </MenuItem>
                <MenuItem key="guoji">
                  <Icon type="folder"/>国际
                </MenuItem>
                <MenuItem key="yule">
                  <Icon type="folder"/>娱乐
                </MenuItem>
                <MenuItem key="tiyu">
                  <Icon type="folder"/>体育
                </MenuItem>
                <MenuItem key="keji">
                  <Icon type="folder"/>科技
                </MenuItem>
                <MenuItem key="shishang">
                  <Icon type="folder"/>时尚
                </MenuItem>

{/*用户登录注册*/}
                {userInfo}

              </Menu>
{/*注册登录弹框 */}
              <Modal title="用户中心"
                     visible={modalShow}
                     onOk={this.handleClose}
                     onCancel={this.handleClose}
                     okText="关闭">
                {/*登录选项卡切换,必须指定key值，否则只能切换一个tab*/}
                   <Tabs type="card">
                      <TabPane tab="登录" key="1">
                        {/*登录输入框*/}
                        <Form onSubmit={this.handleSubmit.bind(this,false)}>
                          {/*label文本输入*/}
                          <FormItem label="用户名">
                            {/*定义输入框,getFieldDecorator是固定写法*/}
                            {
                              getFieldDecorator('username')(
                                  <Input type="text" placeholder="请输入账号"/>
                              )
                            }
                          </FormItem>
                          <FormItem label="密码">
                            {/*定义输入框,getFieldDecorator是固定写法*/}
                            {
                              getFieldDecorator('password')(
                                <Input type="password" placeholder="请输入密码"/>
                              )
                            }
                          </FormItem>
                          <Button type="primary" htmlType="submit">登录</Button>

                        </Form>
                      </TabPane>


                      {/*注册输入框*/}
                      <TabPane tab="注册" key="2">
                            {/*onSubmit={this.handleSubmit}注册提交,bind绑定函数和强制指定参数*/}
                        <Form onSubmit={this.handleSubmit.bind(this,true)}>
                          {/*label文本输入*/}
                          <FormItem label="注册账号">
                            {/*定义输入框,getFieldDecorator是固定写法*/}
                            {
                              getFieldDecorator('r_username')(
                                <Input type="text" placeholder="请输入您要注册的账号"/>
                              )
                            }
                          </FormItem>
                          <FormItem label="注册密码">
                            {/*定义输入框,getFieldDecorator是固定写法*/}
                            {
                              getFieldDecorator('r_password')(
                                <Input type="password" placeholder="请输入密码"/>
                              )
                            }
                          </FormItem>
                          <FormItem label="确认密码">
                            {/*定义输入框,getFieldDecorator是固定写法*/}
                            {
                              getFieldDecorator('r_confirm_password')(
                                <Input type="password" placeholder="请输入确认密码"/>
                              )
                            }
                          </FormItem>
                              {/*htmlType="submit"提交注册*/}
                          <Button type="primary" htmlType="submit">注册</Button>
                        </Form>
                      </TabPane>
                   </Tabs>
              </Modal>

            </div>
          </Col>

          <Col span={1}></Col>
        </Row>
      </header>

    )

  }
};

//所有包含Form组件的类都需要通过Form来包装一下
const FormNewsHeader = Form.create()(NewsHeader);

//暴露
export default FormNewsHeader;


