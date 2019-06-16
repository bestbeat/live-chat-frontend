import Taro, { Component, Config } from '@tarojs/taro'
import { View,Video } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import './videoCall.scss'
import {videoCall} from '../../extend/videoCallJS.js'

export default class VideoCall extends Component {

  config: Config = {
    navigationBarTitleText: '视频通话'
  }

  constructor() {
    super(...arguments)
    
  }
  
  componentDidMount() {
    videoCall.init('localVideo','remoteVideo',this.$router.params);
    // videoCall.send({method:'connect',secretKey:this.$router.params['key']});
  }

  // 结束通话
  hangup = () => {
    console.info('hang up');
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
            <View className='at-row'>
                <View className='at-col'>
                    <Video
                    controls={true}
                    autoplay={false}
                    poster='http://misc.aotu.io/booxood/mobile-video/cover_900x500.jpg'
                    initialTime='0'
                    id='localVideo'
                    loop={false}
                    muted={false}
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
                    id='remoteVideo'
                    loop={false}
                    muted={false}
                    />
                </View>
            </View>
        </View>
    )
  }
}
