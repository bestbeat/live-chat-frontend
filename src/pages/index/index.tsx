import Taro, { Component, Config } from '@tarojs/taro'
import { View,Text,Image } from '@tarojs/components'
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
    navigationBarTitleText: '圈子-登录'
  }

  constructor() {
    super(...arguments)
    this.state = {
      loginName: '',
      password: ''
    }
  }

  login () {
    console.log(this.state);
    Taro.request({
        url: process.env.BACKEND_URL+'/login/permission',
        header:{
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        data: this.state,
        method: 'POST',
        success: function(res){
          console.log(res);
          if (res.statusCode == 200) {
            // 跳转到目的页面，打开主页页面
            Taro.navigateTo({
              url: '/pages/home/home'
            })
          }else {
            console.log("用户名密码不正确");
          }
        },
        fail: function(err){
          console.log(err);
        },
        complete: function(){
            console.log("请求中");
        }
    });

    
  }
  loginNameChange (e) {
    console.log(e);
    this.setState({
      loginName: e
    });
  }
  passwordChange (e) {

    this.setState({
      password: e
    });
  }
  register (e) {
    // 跳转到目的页面，打开主页页面
    Taro.navigateTo({
      url: '/pages/register/register'
    })
  }

  render() {
    return (
      <View className='components-page margin-top-v'>
        <View className='at-row row-height'>
          <View className='at-col at-col-1'></View>
            <View className='at-col'>
              <Image
                className='image-style'
                src='https://118.31.108.252/login.jpg'
              />
            </View>
          <View className='at-col at-col-1'></View>
        </View>
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
                onChange={this.loginNameChange.bind(this)}
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
                onChange={this.passwordChange.bind(this)}
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
            <View className='at-col font-position'><Text className='font-style' onClick={this.register.bind(this)}>用户注册</Text></View>
            <View className='at-col at-col-1'></View>
          </View>
        </AtForm>
      </View>
    )
  }
}
