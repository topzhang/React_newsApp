
//个人中心


import React, {Component} from 'react'
//用户中心组件
import {
  Row,
  Col,
  Tabs,
  Card,
  Icon,
  Upload,
  Modal
  
} from 'antd'

//ajax
import axios from 'axios';


const TabPane = Tabs.TabPane;


class UserCenter extends Component{
  constructor(props){
    super(props)
    //初始化数据
    this.state = {
      collections: [],
      comments: [],
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }]
    }
  }
  //ajax请求
  componentDidMount(){
    const userId = localStorage.getItem('userId');
    //收藏数据
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
    axios.get(url)
      .then(response=>{
        const collections = response.data
        this.setState = ({collections})
      });
    //评论数据
     url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
    axios.get(url)
      .then((response)=>{
        const comments = response.data;
        this.setState = ({comments});
      });


  }

  //预览窗口
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  //跟新列表
  handleChange = ({ fileList }) => {
    this.setState({fileList})
  }

  //关闭预览窗口
  handleCancel = ()=>{
    this.setState({previewVisible:false})

  }


  render(){
    const {collections,comments} = this.state;
    //获取收藏
    const collectionList = collections.length ===0
      ?'you have no collectionList'
      : collections.map((collection,index)=>{
          //获取显示的评论内容
          const {uniquekey,Title} = collection;
          return(
            <Card key={index} title={uniquekey} extra={<a href={`#/detail/${uniquekey}`}>查看</a>}>
              <p>{Title}</p>
            </Card>
          )
        });
    //获取评论
    const commentList = comments.length ===0
      ?'you have no commentList'
      : comments.map((comment,index)=>{
        //获取显示的评论内容
        const {datetime,uniquekey,Comments} = comment;
        return(
          <Card key={index} title={`于${datetime}评论${uniquekey}文章`} extra={<a href={`#/detail/${uniquekey}`}>查看</a>}>
            <p>{Comments}</p>
          </Card>
        )

      });

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return(
      <div>
          <Row>
            <Col span={1}></Col>
            <Col span={22}>
              <Tabs>
                {/*获取的内容添加到各个tabs*/}
                <TabPane key="1" tab="收藏列表">
                  {collectionList}
                </TabPane>
                <TabPane key="2" tab="评论列表">
                  {commentList}
                </TabPane>
                <TabPane key="3" tab="头像设置">
                  <div className="clearfix">
                    <Upload
                      action="http://jsonplaceholder.typicode.com/posts/"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}>
                      {uploadButton}
                    </Upload>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                      <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                  </div>

                </TabPane>
              </Tabs>
            </Col>
            <Col span={1}></Col>
          </Row>
      </div>
    )
  }

}

export default UserCenter;