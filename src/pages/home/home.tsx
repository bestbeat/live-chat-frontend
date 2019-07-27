import Taro, { Component, Config } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { AtActionSheet,AtActionSheetItem,AtInput,AtAccordion,AtList,AtListItem,AtNavBar,AtDrawer,AtTabBar } from 'taro-ui'
import './home.scss'

export default class Home extends Component {

  config: Config = {
    navigationBarTitleText: '圈子-主页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      // 用户操作列表弹出开关
      drawerShow: false,
      // 手风琴状态
      accordionOpen: true,
      actionSheet: false,
      roomName: '',
      rooms:new Array()
    }
  }

  componentDidMount = () => {
    const that = this;
    Taro.request({
      url: process.env.BACKEND_URL+"/home/room",
      method: "GET",
      success: function(res){
        console.log(res.data);
        if (res.statusCode == 200) {
          that.setState({
            rooms: res.data
          });
        }
      },
      fail: function(e){
        console.log(e);
      }
    });
  }

  // 去用户操作列表
  toOpList = ()=> {
    this.setState({
      drawerShow: true
    });
    return;
  }

  // 用户列表关闭出发时间
  closeOpList (e) {
    console.info('close drawer');
  }

  clickAccordion = () => {
    
    if (this.state.accordionOpen) {
      this.setState({
        accordionOpen: false
      });
    }else {
      this.setState({
        accordionOpen: true
      });
    }
    return ;
    
  }

  videoCall = (roomId) => {
    // 跳转到目的页面，打开房间视频通话页面
    Taro.navigateTo({
      url: '/pages/videoCall/videoCall?roomId='+roomId
    })
  }

  handleTabBar = () => {
    this.setState({
      actionSheet: true
    });
  }

  newRoom = () => {
    
    if (!this.state.roomName) {
      console.log("roomName is null");
      return;
    }
    const that = this;
    Taro.request({
      url: process.env.BACKEND_URL+"/home/room",
      header:{
        'Content-type': 'application/json;charset=UTF-8'
      },
      method: "POST",
      data: JSON.stringify({
              'roomName': this.state.roomName,
              'creater': 'tester'
            }),
      success: function(res){
        console.log(res.data);
        if (res.statusCode == 200) {
          const newRoom = {
            roomName: that.state.roomName,
            roomId: res.data
          }

          const rooms = that.state.rooms;
          rooms.push(newRoom);
          that.setState({
            rooms: rooms,
            actionSheet: false
          });

        }
      },
      fail: function(e){
        console.log(e);
      }
    });
  }

  actionSheetClose = () => {
    this.setState({
      actionSheet: false
    });
  }

  roomNameChange = (e) => {
    console.log(e);
    this.setState({
      roomName: e
    });
  }

  render() {

    const rooms = this.state.rooms.map((room) => {
      return <AtListItem
                onClick={this.videoCall.bind(this,room.roomId)}
                title= {room.roomName}
                extraText='进入房间'
                arrow='right'
              />
    });


    return (
        <View>
            <View className='at-row'>
                <View className='at-col'>
                  <AtNavBar
                  onClickRgIconSt={this.toOpList}
                  color='#000'
                  title='主页'
                  rightFirstIconType='user'
                  />
                </View>
            </View>
            <View className='at-row'>
                <View className='at-col'>
                  <AtAccordion 
                    open={this.state.accordionOpen}
                    onClick={this.clickAccordion}
                    title='默认列表' icon={{ value: 'chevron-down', color: 'red', size: '15' }}>
                    <AtList hasBorder={false}>
                      <AtListItem
                        onClick={this.videoCall.bind(this,'default')}
                        title='默认房间'
                        extraText='进入房间'
                        arrow='right'
                      />
                      {rooms}
                    </AtList>
                  </AtAccordion> 
                </View>
            </View>
            <View className='at-row'>
                <View className='at-col'>
                  <AtTabBar
                    fixed
                    tabList={[

                      { title: '添加房间', iconType: 'add' },
                    ]}
                    onClick={this.handleTabBar}
                  />
                </View>
            </View>
            <AtDrawer 
              show={this.state.drawerShow} 
              right 
              mask 
              onClose={this.closeOpList.bind(this)} 
              items={['设置', '注销']}
            ></AtDrawer>
            <AtActionSheet isOpened={this.state.actionSheet} cancelText='添加' title='添加房间' onCancel={ this.newRoom } onClose={ this.actionSheetClose }>
              <AtActionSheetItem >
                <AtInput
                  name='room-name'
                  type='text'
                  placeholder='房间标题'
                  value={this.state.roomName}
                  onChange={this.roomNameChange}
                />
              </AtActionSheetItem>
            </AtActionSheet>
          </View>
    )
  }
}
