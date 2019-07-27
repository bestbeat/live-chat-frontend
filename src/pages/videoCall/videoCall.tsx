import Taro, { Component, Config } from '@tarojs/taro'
import { View,Video } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import './videoCall.scss'
import {videoChat} from '../../extend/videoChat.js'

export default class VideoCall extends Component {

  config: Config = {
    navigationBarTitleText: '视频通话'
  }

  constructor() {
    super(...arguments)
    
  }
  
  componentDidMount() {
    videoChat.init(4,this.$router.params);
  }

  // 结束通话
  hangup = () => {
    console.log("hang up");
    videoChat.close();
    // 跳转到目的页面，打开主页页面
    Taro.navigateTo({
      url: '/pages/home/home'
    })
  }

  render() {
    return (
        <View>
            <View className='at-row'>
                <View className='at-col'>
                    <AtNavBar
                    onClickLeftIcon={this.hangup}
                    color='#000'
                    title='通话中...'
                    leftText='结束'
                    />
                </View>
            </View>
            <View className='at-row '>
                <View className='at-col '>
                    <Video
                    autoplay={true}
                    id='remoteVideo0'
                    loop={false}
                    muted={false}
                    />
                </View>
                <View className='at-col '>
                    <Video
                    autoplay={true}
                    id='remoteVideo1'
                    loop={false}
                    muted={false}
                    />
                </View>
            </View>
            <View className='at-row '>
                <View className='at-col '>
                    <Video
                    autoplay={true}
                    id='remoteVideo2'
                    loop={false}
                    muted={false}
                    />
                </View>
                <View className='at-col '>
                    <Video
                    autoplay={true}
                    id='remoteVideo3'
                    loop={false}
                    muted={false}
                    />
                </View>
            </View>
        </View>
    )
  }
}
