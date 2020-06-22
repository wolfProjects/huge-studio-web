import wx from 'weixin-js-sdk'
import sha1 from 'crypto-js/sha1'
import qs from 'qs';

export const APP_CONFIG = ({
  dev: {
      appId: 'wxb7761aa9905ffb33',
      wechat: 'https://testcommon.jzdoctor.com/wechat',
      wechatOauth: 'https://testoauth.jzdoctor.com/wechat/authorize'
  },

  stage: {
      appId: 'wxb7761aa9905ffb33',
      wechat: 'https://testcommon.jzdoctor.com/wechat',
      wechatOauth: 'https://testoauth.jzdoctor.com/wechat/authorize'
  },

  prod: {
      appId: 'wxdec0babc72769ecc',
      wechat: 'https://common.jzdoctor.com/wechat',
      wechatOauth: 'https://oauth.jzdoctor.com/wechat/authorize'
  }
})[location.href.includes('//app') ? 'prod' : 'stage'];

const wxjssdk = {
  init (props) {
    let timestamp = new Date().getTime()
    let nonceStr = sha1(timestamp).toString()
    let appid = APP_CONFIG.appId
    let ticket = ''
    var xhr = new XMLHttpRequest()
    if (process.env.NODE_ENV !== 'development') {
      xhr.withCredentials = true
    }
    let url = APP_CONFIG.wechat + '/js/ticket.json'
    xhr.open('GET', url, false)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && (xhr.status === 200)) {
        let resp = JSON.parse(xhr.responseText)
        if (resp.statusCode === 0) {
          ticket = resp.data.ticket
        } else {
        }
      }
    }
    xhr.send(null)
    // }
    let signStr = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + window.location.href
    let signature = sha1(signStr).toString()
    wx.config({
      debug: qs.parse(window.location.href.split('?')[1]).wechatDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: appid, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature, // 必填，签名，见附录1
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'startRecord',
        'stopRecord',
        'onVoiceRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'onVoicePlayEnd',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'translateVoice',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
      // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      wxjssdk.initDefaultShare();
    })
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log('初始化微信JS-SDK失败', res)
    })
  },
  initDefaultShare: function () {
    wxjssdk.initShare('https://app.jzdoctor.com/ow-mobile-web', '彩虹育儿，专业让妈妈更轻松', '一站式母婴健康医疗平台', 'http://file.jzdoctor.com/ow-mobile-web/ow-share.jpg')
  },
  chooseImage: function (callback) {
    wx.chooseImage({
      count: 4, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        callback(res.localIds)
      }
    })
  },
  uploadImage: function (localId, callback) {
    var serverId = ''
    wx.uploadImage({
      localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
      isShowProgressTips: 1, // 默认为1，显示进度提示
      success: function (res) {
        serverId = res.serverId // 返回图片的服务器端ID
        callback(serverId)
      }
    })
  },
  previewImg: function (url, urls) {
    wx.previewImage({
      current: url,
      urls: urls
    })
  },
  saveImage: function () {
    wx.saveImageToPhotosAlbum({
      success (res) {
        alert(JSON.stringify(res))
      }
    })
  },
  initShare: function (linkUrl, title, des, imgUrl, suc) {
    // 分享到朋友圈
    if (linkUrl.indexOf('unionid') !== -1) {
      let linkUrls = linkUrl.replace('unionid', 'xxx')
      linkUrl = linkUrls.replace('openid', 'xxx')
    }
    
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        console.log('分享到朋友圈成功')
        if (suc && typeof suc === 'function') {
          suc()
        }
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        console.log('取消分享到朋友圈')
      }
    })
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: des, // 分享描述
      link: linkUrl, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        console.log('分享给好友成功', linkUrl)
        if (suc && typeof suc === 'function') {
          suc()
        }
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        console.log('取消分享给好友')
      }
    })
  },
  wx: wx
};

export default wxjssdk;