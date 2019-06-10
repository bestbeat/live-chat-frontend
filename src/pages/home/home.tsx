import Taro, { Component, Config } from '@tarojs/taro'
import { View,Swiper, SwiperItem } from '@tarojs/components'
import { AtGrid,AtNavBar,AtTabBar } from 'taro-ui'
import './home.scss'

export default class Home extends Component {

  config: Config = {
    navigationBarTitleText: '主页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      loginName: '',
      password: ''
    }
  }

  login (e) {
    // 跳转到目的页面，打开新页面
    Taro.navigateTo({
      url: '/pages/home/home'
    })
  }
  handleChange (e) {
    console.log(e);
  }
  register (e) {
    console.log(33);
  }
  handleClick (e) {

  }

  render() {
    return (
        <View>
            <View className='at-row'>
                <View className='at-col'>
                <AtNavBar
                onClickRgIconSt={this.handleClick}
                onClickRgIconNd={this.handleClick}
                onClickLeftIcon={this.handleClick}
                color='#000'
                title='NavBar 导航栏示例'
                leftText='返回'
                rightFirstIconType='bullet-list'
                rightSecondIconType='user'
                />
                </View>
            </View>
            <View className='at-row'>
                <View className='at-col'>
                    <Swiper
                        className='test-h'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        
                        circular
                        indicatorDots
                        autoplay>
                        <SwiperItem>
                        <View className='demo-text-1'>1</View>
                        </SwiperItem>
                        <SwiperItem>
                        <View className='demo-text-2'>2</View>
                        </SwiperItem>
                        <SwiperItem>
                        <View className='demo-text-3'>3</View>
                        </SwiperItem>
                    </Swiper>
                </View>
            </View>
            <View className='at-row'>
                <View className='at-col'>
                    <AtGrid data={
                        [
                        {
                            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                            value: '领取中心'
                        },
                        {
                            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                            value: '找折扣'
                        },
                        {
                            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                            value: '领会员'
                        },
                        {
                            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                            value: '新品首发'
                        },
                        {
                            image: 'https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png',
                            value: '领京豆'
                        },
                        {
                            image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                            value: '手机馆'
                        }
                        ]
                    } />
                </View>
            </View>
            <View className='at-row'>
                <View className='at-col'>
                    <AtTabBar
                    fixed
                    tabList={[
                        { title: '待办事项', iconType: 'bullet-list', text: 'new' },
                        { title: '拍照', iconType: 'camera' },
                        { title: '文件夹', iconType: 'folder', text: '100', max: '99' }
                    ]}
                    onClick={this.handleClick.bind(this)}
                    current={this.state.current}
                    />
                </View>
            </View>
          </View>
    )
  }
}
