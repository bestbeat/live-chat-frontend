import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm,AtInput,AtButton } from 'taro-ui'
import './register.scss'

export default class Register extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '圈子-注册'
  }

  constructor() {
    super(...arguments)
    this.state = {
      loginName: '',
      userName: '',
      password: '',
      verifyPassword: '',
      mobilePhone:''
    }
  }

  register (e) {
    console.log(this.state);
    Taro.request({
        url: process.env.BACKEND_URL+'/login/user',
        header:{
          'Content-type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(this.state),
        method: 'POST',
        success: function(res){
          console.log(res);
          if (res.statusCode == 200) {
            // 跳转到目的页面，打开登录页面
            Taro.navigateTo({
              url: '/pages/index/index'
            })
          }
        },
        fail: function(err){
          console.log(err);
        },
        complete: function(){
            console.log("请求中");
        }
    });
    return;
  }
  changeLoginName (v) {
    if (!v) {
      console.log("LoginName is Null");
      return;
    }
    this.setState({
        loginName: v,
        userName: v
    });
  }
  changeMobilPhone (v) {
    if (!v) {
      console.log("mobilePhone is Null");
      return;
    }
    this.setState({
        mobilePhone: v
    });
  }
  changePassword (v) {
    if (!v) {
      console.log("password is Null");
      return;
    }
    this.setState({
        password: v
    });
  }
  changeVerifyPassword(v){
    if (!v) {
      console.log("verifyPassword is Null");
      return;
    }
    this.setState({
      verifyPassword: v
  });
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
                title='用户名'
                type='text'
                placeholder='用户名/登陆号'
                value={this.state.userName}
                onChange={this.changeLoginName.bind(this)}
              />
            </View>
            <View className='at-col at-col-1'></View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
                <View className='at-col'>
                    <AtInput
                    name='mobilePhone'
                    title='手机号'
                    type='text'
                    placeholder='11位手机号'
                    value={this.state.mobilePhone}
                    onChange={this.changeMobilPhone.bind(this)}
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
                onChange={this.changePassword.bind(this)}
              />
            </View>
            <View className='at-col at-col-1'></View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col'>
                <AtInput
                name='verify-password'
                title='确认密码'
                type='password'
                placeholder='6位以上'
                value={this.state.verifyPassword}
                onChange={this.changeVerifyPassword.bind(this)}
              />
            </View>
            <View className='at-col at-col-1'></View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col'>
              <AtButton type='primary' onClick={this.register.bind(this)}>注册</AtButton>
            </View>
            <View className='at-col at-col-1'></View>
          </View> 
        </AtForm>
      </View>
    )
  }
}
