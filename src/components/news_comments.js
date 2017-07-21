/*
新闻评论列表组件
 */


import React,{Component,PropTypes} from 'react';
import {Form,Card,Input,Button,notification} from  'antd';
import axios from 'axios';

const FormItem = Form.Item;

class NewsComments extends Component{

  //属性
  static  propTypes = {
    uniqueKey:PropTypes.string.isRequired
  }

  constructor (props){
    //初始化
    super(props)
    this.state = {
      comments:[]   //数据数组
    }
  }

  //发送ajax请求
  componentDidMount (){
    this.getComments();
  };
  //单独封装ajax请求
  getComments =()=>{
    const {uniquekey} = this.props;
    const url =  `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`;
    axios.get(url)
      .then((response)=>{
        const comments = response.data;
        this.setState({comments});
      });
  };



  //提交评论
  submitComment = ()=>{
    //登录状态才能提交评论
    const userId = localStorage.getItem('userId');
    if (!userId){
      alert('请先登录账号再评论')
      return;
    }
    //发送ajax请求
    const {uniquekey} = this.props;
    const {content} = this.props.form.getFieldsValue()
    const url= `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${uniquekey}&commnet=${content}`
    axios.get(url)
      .then((response)=>{
            notification.success({
              message:'提交成功',
              description:''
            });
            //更新列表评论
            this.getComments();

        });
  };
  //收藏文章
  collectArticle = ()=>{
    //登录状态才能收藏
    const userId = localStorage.getItem('userId');
    if (!userId){
      alert('请先登录账号')
      return;
    }
    //发送ajax请求
    const {uniquekey} = this.props;
    const url= `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${uniquekey}`
    axios.get(url)
      .then((response)=>{
        notification.success({
          message:'收藏成功',
          description:''
        });
      });
  }

  //渲染
  render(){
    //根据数据素组生成对应的标签数组
    const {comments} = this.state;
    const commentList = comments.length === 0
        ? 'You have no comment'
        :comments.map((comment,index)=>{{/* 遍历*/}
            const username = comment.UserName;
            const dateTime = comment.datetime;
            const content = comment.Comments;
            return(
              <Card key={index} title={username} extra={`评论发布于${dateTime}`}>
                <p>{content}</p>
              </Card>
            )
          });
    const {getFieldDecorator} = this.props.form;
    //getFieldProps
    //const {getFieldProps} = this.props.form;

    return(
      <div style={{padding:'10px'}}>
        {commentList}
        {/*提交评论*/}
        <Form onSubmit={this.submitComment}>
          <FormItem label="您的评论">
            {
              getFieldDecorator('content')(
                <Input type="textarea" placeholder="请输入评论"/>
              )
            }
          </FormItem>
          <Button type="primary" htmlType="submit">提交评论</Button> &nbsp;
          <Button type="primary" onClick={this.collectArticle}>收藏文章</Button>

        </Form>
      </div>
    )
  }
}
//暴露
export default Form.create()(NewsComments);