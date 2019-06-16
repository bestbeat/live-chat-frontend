import Taro, { Component, Config } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { AtAccordion,AtList,AtListItem,AtNavBar,AtDrawer } from 'taro-ui'
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
      // 手风琴状态
      accordionOpen: true
    }
  }
  // 去用户操作列表
  toOpList = ()=> {
    this.setState({
      drawerShow: true
    });
  }

  // 返回
  goback = () => {
    console.info('go back');
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
    
  }

  videoCall = () => {
    // 跳转到目的页面，打开主页页面
    Taro.navigateTo({
      url: '/pages/videoCall/videoCall?key=123'
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
                  <AtAccordion 
                    open={this.state.accordionOpen}
                    onClick={this.clickAccordion}
                    title='默认列表' icon={{ value: 'chevron-down', color: 'red', size: '15' }}>
                    <AtList hasBorder={false}>
                      <AtListItem
                        onClick={this.videoCall}
                        title='好友一'
                        extraText='点击通话'
                        arrow='right'
                        thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
                      />
                      <AtListItem
                        title='好友二'
                        extraText='点击通话'
                        arrow='right'
                        thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
                      />
                      <AtListItem
                        title='好友三'
                        extraText='点击通话'
                        arrow='right'
                        thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                      />
                    </AtList>
                  </AtAccordion> 
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
