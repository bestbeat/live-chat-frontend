import Taro, { Component, Config } from '@tarojs/taro'
import { View,Swiper, SwiperItem } from '@tarojs/components'
import { AtGrid,AtNavBar,AtTabBar,AtDrawer } from 'taro-ui'
import './home.scss'

export default class Home extends Component {

  config: Config = {
    navigationBarTitleText: '主页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      // 用户操作列表弹出开关
      drawerShow: false,
      // 底部TAB当前选中索引
      tabCurrent: -1
    }
  }
  // 去用户操作列表
  toOpList = ()=> {
    this.setState({
      drawerShow: true
    });
  }
  // 处理底部TAB点击事件
  handleTabClick = (tabIndex) => {
    this.setState({
      tabCurrent: tabIndex
    });
    // console.log(tabIndex);
    if (tabIndex == 1) {
      // 跳转到目的页面，打开直播页面
      Taro.navigateTo({
        url: '/pages/live/live'
      })
    }

  }
  // 返回
  goback = () => {
    console.info('go back');
  }
  // 用户列表关闭出发时间
  closeOpList (e) {
    console.info('close drawer');
  }

  toWatch = (item,index) => {
    // 跳转到目的页面，打开观看直播页面
    Taro.navigateTo({
      url: '/pages/watch/watch'
    })
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
                    <AtGrid onClick={this.toWatch} columnNum={2} data={
                        [
                        {
                            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                            value: '直播1'
                        },
                        {
                            image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
                            value: '直播2'
                        },
                        {
                            image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
                            value: '直播3'
                        },
                        {
                            image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png',
                            value: '直播4'
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
                        { title: '订阅', iconType: 'star' },
                        { title: '直播', iconType: 'video' },
                        { title: '信息', iconType: 'bell', text: '100', max: '99' }
                    ]}
                    onClick={this.handleTabClick}
                    current={this.state.tabCurrent}
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
