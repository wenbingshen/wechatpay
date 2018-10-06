// 1. 完成页面结构、布局、样式
// 2. 设计数据结构
// 3. 完成数据绑定
// 4. 设计交互操作事件
// 5. 数据存储
var app = getApp()   //实例化小程序，从而获取全局数据或者使用全局函数
// console.log(app.globalData)
var MD5Util = require('../../utils/md5.js');

Page({
  // ===== 页面数据对象 =====
  data: {
    input: '',
    todos: [],
    leftCount: 0,
    allCompleted: false,
    logs: [],
    price: 0.01,
    number: 18820000000,
    deviceNo: 10080925
  },

  // ===== 页面生命周期方法 =====
  onLoad: function () {

  },
  // ===== 事件处理函数 =====
  wechatpay: function (e) {
    var code = ''     //传给服务器以获得openId
    var timestamp = String(Date.parse(new Date()))   //时间戳
    var nonceStr = ''   //随机字符串，后台返回
    var prepayId = ''    //预支付id，后台返回
    var paySign = ''     //加密字符串

    //获取用户登录状态
    wx.login({
      success: function (res) {
        if (res.code) {
          code = res.code
          //发起网络请求,发起的是HTTPS请求，向服务端请求预支付
          wx.request({
            url: 'http://sellbin.natapp1.cc/prepay',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res.data);
              if (res.data.result == true) {
                nonceStr = res.data.nonceStr
                prepayId = res.data.prepayId
                // 按照字段首字母排序组成新字符串
                var payDataA = "appId=" + app.globalData.appId + "&nonceStr=" + res.data.nonceStr + "&package=prepay_id=" + res.data.prepayId + "&signType=MD5&timeStamp=" + timestamp;
                var payDataB = payDataA + "&key=" + app.globalData.key;
                // 使用MD5加密算法计算加密字符串
                paySign = MD5Util.MD5(payDataB).toUpperCase();
                // 发起微信支付
                wx.requestPayment({
                  'timeStamp': timestamp,
                  'nonceStr': nonceStr,
                  'package': 'prepay_id=' + prepayId,
                  'signType': 'MD5',
                  'paySign': paySign,
                  'success': function (res) {
                    // 保留当前页面，跳转到应用内某个页面，使用wx.nevigeteBack可以返回原页面
                    wx.navigateTo({
                      url: '../pay/pay'
                    })
                  },
                  'fail': function (res) {
                    console.log(res.errMsg)
                  }
                })
              } else {
                console.log('请求失败' + res.data.info)
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  refund: function (openId) {
    var that = this;
    wx.request({
      url: 'http://sellbin.natapp1.cc/refund',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        'openid': openId,
        'orderId': '036b2f8a56904804b3eb1da907735bc1',
        'deposit': '1'
      },
      success: function (res) {
        console.log('refund:' + JSON.stringify(res.data));
      }
    })
  }
})