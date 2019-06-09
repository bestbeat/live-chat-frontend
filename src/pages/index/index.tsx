import Taro, { Component, Config } from '@tarojs/taro'
import { View,Image } from '@tarojs/components'
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
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      value: ''
    }
  }

  onSubmit (event) {
    console.log(event)
  }
  onReset (event) {
    console.log(event)
  }
  handleChange () {

  }

  render() {
    return (
      <View className='components-page margin-top-v'>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col'>
                <AtInput
                name='value'
                title='文本'
                type='text'
                placeholder='单行文本'
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
              />
            </View>
            <View className='at-col at-col-1'></View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col'>
                <AtInput
                name='value'
                title='文本'
                type='text'
                placeholder='单行文本'
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
              />
            </View>
            <View className='at-col at-col-1'></View>
          </View>
          <View className='at-row'>
            <View className='at-col at-col-1'></View>
            <View className='at-col'>
              <AtButton formType='submit'>提交</AtButton>
            </View>
            <View className='at-col at-col-1'></View>
          </View>
        </AtForm>
      </View>
    )
  }
}
