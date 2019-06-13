import Taro, { Component, Config } from '@tarojs/taro'
import { View,Video } from '@tarojs/components'
import { AtNavBar,AtDrawer } from 'taro-ui'
import './live.scss'
import {mediaInit} from './liveJS.js'

export default class Live extends Component {

  config: Config = {
    navigationBarTitleText: '直播'
  }

  constructor() {
    super(...arguments)
    this.state = {
        drawerShow: false
    }
  }
  
  componentDidMount() {
    mediaInit('video');
  }

  // 去用户操作列表
  toOpList = ()=> {
    this.setState({
      drawerShow: true
    });
  }

  // 用户列表关闭出发时间
  closeOpList (e) {
    console.info('close drawer');
  }

  // 返回
  goback = () => {
    console.info('go back');
  }

  render() {
    return (
        <View>
            <View className='at-row'>
                <View className='at-col'>
                    <AtNavBar
                    onClickRgIconSt={this.toOpList}
                    onClickLeftIcon={this.goback}
                    color='#000'
                    title='主页'
                    leftText='返回'
                    rightFirstIconType='user'
                    />
                </View>
            </View>
            <View className='at-row'>
                <View className='at-col'>
                    <Video
                    controls={true}
                    autoplay={false}
                    poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                    initialTime='0'
                    id='video'
                    loop={false}
                    muted={false}
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
        </View>
    )
  }
}
