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
        speed: 300, //滚动速度
        currentIndex: 1, //上一次中奖索引,默认1,同siteNum对比,也是当前的索引
        passIndex: 0, //已经走过的步长
        priceNum: 0, //中奖索引
        trunsNum: 5, //所转圈数
        lock: true //防止重复抽奖,默认能抽

    },

    //该函数会获取中奖信息、计算总步长、获取奖品名
    start: function () {
        var lock = this.data.lock,
            totalNum, //总步长
            trunsNum = this.data.trunsNum, //转的圈数
            awards = this.data.awards, //奖品列表
            len = awards.length, //奖品长度
            currentIndex = this.data.currentIndex, //上一次中奖索引
            priceNum = this.data.priceNum; //所中奖品

        if (priceNum == null || priceNum == '' || !priceNum) { //如果获取的奖品为空或者0,就随机一个
            priceNum = (Math.random() * len) >>> 0; //获取奖品
            if (!priceNum) { //如果随机的奖品为0就加1
                priceNum = priceNum + 1; //如果取到0就加1
            }
        }
        for (var i in awards) {
            if (awards[i].siteNum == priceNum) { //根据索引去对比奖品的siteNum,相同就取得奖品名
                var priceName = awards[i].name;
            }
        }
        totalNum = trunsNum * (len - 1) + priceNum - currentIndex; //默认转的圈数 * 奖品数量 + 中奖步长 - 上一次的中奖索引(或者当前的中奖索引)
        if (lock) {
            lock = false;
            this.setData({
                lock: lock,
                passIndex: 0 //初始化走过的步长为0
            })
            this.runningFun(totalNum, priceName);
        }
    },

    // 跑马灯滚动交互
    runningFun: function (totalNum, priceName) {
        var that = this,
            currentIndex = this.data.currentIndex, //滚动中的索引
            passIndex = this.data.passIndex, //已经走过的步长
            speed = this.data.speed; //滚动速度

        this.data.timer = setTimeout(function () {
            that.runningFun(totalNum, priceName);
        }, speed)
        currentIndex += 1; //滚动中的索引,不停的加1,控制跑马灯效果
        passIndex += 1; //记录已经走过的值
        if (currentIndex == this.data.awards.length) {
            currentIndex = 1;
        }
        if (passIndex >= totalNum) {    //中奖
            clearTimeout(this.data.timer);
            this.setData({
                lock: true              //开锁
            })
            var timer = setTimeout(function(){
                wx.showModal({
                    title: '提示',
                    content: '恭喜您获得' + priceName,
                    showCancel: false,
                    complete:function(){
                        clearTimeout(timer);
                    }
                })
            },500)
        } else if (passIndex <= (totalNum / 3) * 2) { //已走步长小于总步长的三分之二就逐渐加速,最小40
            speed -= 30;
            speed = speed <= 40 ? 40 : speed;
        } else if (totalNum - passIndex <= 8) { //剩余8步就大幅度减速
            speed += 30;
        } else {                                //介于2/3与8步之间就缓慢减速
            speed += 10;
            speed = speed >= 100 ? 100 : speed;
        }
        this.setData({
            passIndex: passIndex,
            currentIndex: currentIndex,
            speed: speed
        })
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