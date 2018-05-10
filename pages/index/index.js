Page({
    data: {
        awards: [{
                'siteNum': 1,
                'name': '1块钱'
            },
            {
                'siteNum': 2,
                'name': '2块钱'
            },
            {
                'siteNum': 3,
                'name': '3块钱'
            },
            {
                'siteNum': 8,
                'name': '8块钱'
            },
            {
                'siteNum': 0,
                'name': '占位'
            },
            {
                'siteNum': 4,
                'name': '4块钱'
            },
            {
                'siteNum': 7,
                'name': '7块钱'
            },
            {
                'siteNum': 6,
                'name': '6块钱'
            },
            {
                'siteNum': 5,
                'name': '5块钱'
            }
        ],
        selectIndex: 1      //中奖信息及跑马灯ui  默认第一个,同siteNum对比
    },

    start: function () {
        var that = this;
        var awards = this.data.awards; //奖品列表
        var selectIndex = this.data.selectIndex; //中奖信息
        var len = this.data.awards.length;  //奖品长度
        var speed = 500;
        var stopNum = (Math.random() * len) >>> 0; //获取奖品
        stopNum = 5;
        if (!stopNum) {
            stopNum = (Math.random() * len) >>> 0; //如果取到0就重新来一次
        }
        for (var i in awards) {
            if (awards[i].siteNum == stopNum) { //根据索引去对比奖品的siteNum,相同就取得奖品名
                var name = awards[i].name;
            }
        }
        wx.showToast({
            title:name
        })
        stopNum = 3 * (len - 1) + stopNum - selectIndex; //转三圈加上中奖步长,减去上一次的中奖步长
        var timer = null;
        function run(){
            selectIndex += 1; //跑马灯ui
            if (selectIndex == len) {
                selectIndex = 1;
            }
            that.setData({
                selectIndex: selectIndex //赋值操作更改class
            })
            stopNum -= 1;
            if (stopNum <= 0) {
                clearInterval(timer);
                wx.showModal({
                    title: '提示',
                    content: '恭喜您获得' + name,
                    showCancel: false
                })
            }
        }
        console.log( stopNum * 100) //总共花的时长
        timer = setInterval(function () {
            run();
        }, 100)
    },
    onLoad: function (options) {
        //Do some initialize when page load.

    },
    onReady: function () {
        //Do some when page ready.

    },
    onShow: function () {
        //Do some when page show.

    },
    onHide: function () {
        //Do some when page hide.

    },
    onUnload: function () {
        //Do some when page unload.

    },
    onPullDownRefresh: function () {
        //Do some when page pull down.

    }
})