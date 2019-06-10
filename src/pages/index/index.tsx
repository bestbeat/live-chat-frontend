import Taro, { Component, Config } from '@tarojs/taro'
import { View,Text } from '@tarojs/components'
import { AtForm,AtInput,AtButton } from 'taro-ui'
import './index.scss'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '登录'
  }

  constructor() {
    super(...arguments)
    this.state = {
      loginName: '',
      password: ''
    }
  }

  login (e) {
    console.log(111);
    console.log(e.details)
  }
  handleChange (e) {
    console.log(e);
  }
  register (e) {
    console.log(33);
  }

  render() {
    return (
      <View className='components-page margin-top-v'>
        <AtForm>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col'>
                <AtInput
                name='loginName'
                title='登录号'
                type='text'
                placeholder='手机号/用户名'
                value={this.state.loginName}
                onChange={this.handleChange.bind(this)}
              />
            </View>
            <View className='at-col at-col-1'></View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col'>
                <AtInput
                name='password'
                title='密码'
                type='password'
                placeholder='6位以上'
                value={this.state.password}
                onChange={this.handleChange.bind(this)}
              />
            </View>
            <View className='at-col at-col-1'></View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col'>
              <AtButton type='primary' onClick={this.login.bind(this)}>登录</AtButton>
            </View>
            <View className='at-col at-col-1'></View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col'><Text onClick={this.register.bind(this)}>aaa</Text></View>
            <View className='at-col at-col-1'></View>
          </View>
        </AtForm>
      </View>
    )
  }
}
