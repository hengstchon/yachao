var util = require("../../../utils/util.js");
var api = require("../../../config/api.js");
var check = require("../../../utils/check.js");

var app = getApp();
Page({
  data: {
    address: {
      id: 0,
      areaCode: 0,
      addressExtra: "",
      name: "",
      tel: "",
      isDefault: 0,
      city: "",
      postalCode: "",
      street: "",
      strNr: ""
    },
    addressId: 0
  },
  bindinputName(event) {
    let address = this.data.address;
    address.name = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputMobile(event) {
    let address = this.data.address;
    address.tel = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputCity(event) {
    let address = this.data.address;
    address.city = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputPostalCode(event) {
    let address = this.data.address;
    address.postalCode = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputStreet(event) {
    let address = this.data.address;
    address.street = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputStrNr(event) {
    let address = this.data.address;
    address.strNr = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindinputAddressExtra(event) {
    let address = this.data.address;
    address.addressExtra = event.detail.value;
    this.setData({
      address: address
    });
  },
  bindIsDefault() {
    let address = this.data.address;
    address.isDefault = !address.isDefault;
    this.setData({
      address: address
    });
  },
  getAddressDetail() {
    let that = this;
    util
      .request(api.AddressDetail, {
        id: that.data.addressId
      })
      .then(function(res) {
        if (res.errno === 0) {
          if (res.data) {
            that.setData({
              address: res.data
            });
          }
        }
      });
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    if (options.id && options.id != 0) {
      this.setData({
        addressId: options.id
      });
      this.getAddressDetail();
    }
  },
  onReady: function() {},
  cancelAddress() {
    wx.navigateBack();
  },
  saveAddress() {
    console.log(this.data.address);
    let address = this.data.address;

    if (address.name == "") {
      util.showErrorToast("请输入姓名");

      return false;
    }

    if (address.tel == "") {
      util.showErrorToast("请输入手机号码");
      return false;
    }

    if (address.city == "") {
      util.showErrorToast("请输入城市名称");
      return false;
    }

    if (address.postalCode == "") {
      util.showErrorToast("请输入邮编");
      return false;
    }

    if (address.street == "") {
      util.showErrorToast("请输入街道名");
      return false;
    }

    if (address.strNr == "") {
      util.showErrorToast("请输入门牌号");
      return false;
    }

    if (!check.isValidPhone(address.tel)) {
      util.showErrorToast("手机号不正确");
      return false;
    }

    let that = this;
    util
      .request(
        api.AddressSave,
        {
          id: address.id,
          name: address.name,
          tel: address.tel,
          city: address.city,
          postalCode: address.postalCode,
          street: address.street,
          strNr: address.strNr,
          addressExtra: address.addressExtra,
          isDefault: address.isDefault
        },
        "POST"
      )
      .then(function(res) {
        console.log(res);
        console.log(api.AddressSave);
        if (res.errno === 0) {
          //返回之前，先取出上一页对象，并设置addressId
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          console.log(prevPage);
          if (prevPage.route == "pages/checkout/checkout") {
            prevPage.setData({
              addressId: res.data
            });

            try {
              wx.setStorageSync("addressId", res.data);
            } catch (e) {}
            console.log("set address");
          }
          wx.navigateBack();
        }
      });
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
});
