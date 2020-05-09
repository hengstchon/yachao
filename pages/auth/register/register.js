var api = require('../../../config/api.js');
var check = require('../../../utils/check.js');

var app = getApp();
Page({
  data: {
    username: '',
    password: '',
    confirmPassword: '',
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成

  },
  onReady: function() {

  },
  onShow: function() {
    // 页面显示

  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  requestRegister: function(wxCode) {
    let that = this;
    wx.request({
      url: api.AuthRegister,
      data: {
        username: that.data.username,
        password: that.data.password,
        mobile: that.data.mobile,
        code: that.data.code,
        wxCode: wxCode
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.errno == 0) {
          app.globalData.hasLogin = true;
          wx.setStorageSync('userInfo', res.data.data.userInfo);
          wx.setStorage({
            key: "token",
            data: res.data.data.token,
            success: function() {
              wx.switchTab({
                url: '/pages/ucenter/index/index'
              });
            }
          });
        } else {
          wx.showModal({
            title: '错误信息',
            content: res.data.errmsg,
            showCancel: false
          });
        }
      }
    });
  },
  startRegister: function() {
    var that = this;

    if (this.data.password.length < 6 || this.data.username.length < 6) {
      wx.showModal({
        title: '错误信息',
        content: '用户名和密码不得少于6位',
        showCancel: false
      });
      return false;
    }

    if (this.data.password != this.data.confirmPassword) {
      wx.showModal({
        title: '错误信息',
        content: '确认密码不一致',
        showCancel: false
      });
      return false;
    }

    wx.login({
      success: function(res) {
        if (!res.code) {
          wx.showModal({
            title: '错误信息',
            content: '注册失败',
            showCancel: false
          });
        }

        that.requestRegister(res.code);
      }
    });
  },
  bindUsernameInput: function(e) {

    this.setData({
      username: e.detail.value
    });
  },
  bindPasswordInput: function(e) {

    this.setData({
      password: e.detail.value
    });
  },
  bindConfirmPasswordInput: function(e) {

    this.setData({
      confirmPassword: e.detail.value
    });
  },
  clearInput: function(e) {
    switch (e.currentTarget.id) {
      case 'clear-username':
        this.setData({
          username: ''
        });
        break;
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-confirm-password':
        this.setData({
          confirmPassword: ''
        });
        break;
      case 'clear-mobile':
        this.setData({
          mobile: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
})
