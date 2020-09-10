// 创建对象
class Enlarge {
    // 静态属性写在 constructor()内
    constructor(ele, data) {
        this.ele = document.querySelector(ele);
        this.data = data;

        this.init();
    }

    // 动态方法
    // 初始化
    init() {
        // 把要显示的内容添加到 box 中
        this.ele.appendChild(this.renderShow());
        this.ele.appendChild(this.renderList());
        this.ele.appendChild(this.renderEnlarge());
        this.setStyle();
        // console.log(this.ele)
        // 给小盒子 show 添加绑定事件 当鼠标移入时显示遮罩层和右边放大镜内容
        this.show.onmouseover = () => this.mask.style.display = this.enlarge.style.display = 'block';

        // 当鼠标移出 隐藏遮罩层和右边放大镜
        this.show.onmouseout = () => this.mask.style.display = this.enlarge.style.display = 'none';

        this.show.onmousemove = this.move;

        this.p = this.list.querySelectorAll('p');
        // 循环遍历换图
        this.p.forEach((item, index) => {
            item.onclick = () => {
                this.change(item, index)
            }
        })
        console.log(this.enlarge)
    }

    // 根据数据渲染盒子show的标签
    renderShow() {
        // 入如果后面还需要这个元素的时候，尽量把这个元素绑定在 this对象
        this.show = document.createElement('div');
        this.show.classList.add('show');

        this.showImg = document.createElement('img');
        // 默认情况下，show盒子显示第一张图片
        this.showImg.src = this.data[0].medium;
        this.show.appendChild(this.showImg);

        // 创建mask标签
        this.mask = document.createElement('div');
        this.mask.classList.add('mask');
        this.show.appendChild(this.mask);

        // 把盒子show 返回
        return this.show
    }

    // 根据数据渲染小图
    renderList() {
        this.list = document.createElement('div');
        this.list.classList.add('list');

        // 让div显示在页面
        this.list.innerHTML = this.data.map((item, index) => {
            return index === 0 ? `<p class="active"><img src="${item.small}"></p>` : `<p><img src="${item.small}"></p>`
        }).join('')

        return this.list;
    }

    // 渲染放大镜盒子的图片
    renderEnlarge() {
        this.enlarge = document.createElement('div');
        this.enlarge.classList.add('enlarge');

        // 给enlarge这个盒子添加背景图，默认为第一张
        this.enlarge.style.backgroundImage = `url(${this.data[0].big})`;
        return this.enlarge;

    }

    // 设置放大镜盒子的宽高
    setStyle() {
        // 放大镜盒子的大小 = 遮罩层的大小 * 背景图的大小 / show盒子大小
        // 求遮罩层的大小 maskWidth = 0 ,当调用 setStyle的时候，mask是隐藏的状态
        let maskWidth = parseInt(getStyle(this.mask, 'width'));
        let maskHeight = parseInt(getStyle(this.mask, 'height'));


        // 背景图的大小
        let bgx = getStyle(this.enlarge, 'background-size').split(' ')[0];
        this.bgx = parseInt(bgx);
        let bgy = getStyle(this.enlarge, 'background-size').split(' ')[1];
        this.bgy = parseInt(bgy);


        // 求show盒子的大小，因为后面还需要用的这个变量，所以把这个变量存储在 this对象中
        this.showWidth = this.show.offsetWidth;
        this.showHeight = this.show.offsetHeight;

        let enlargeWidth = maskWidth * this.bgx / this.showWidth;
        let enlargeHeight = maskHeight * this.bgy / this.showHeight;

        // 把enlargeWidth 和 enlargeHeight 赋值到 enlarge 盒子上
        this.enlarge.style.width = enlargeWidth + 'px';
        this.enlarge.style.height = enlargeHeight + 'px';
    }

    // 小盒子mask移动的时候右边的放大镜盒子的内容也要跟着变化
    move = (e) => {
        // 遮罩层拖拽
        // 计算鼠标的位置  需要减去 this.ele盒子左边和上边的偏移量
        let maskLeft = e.pageX - this.ele.offsetLeft - this.mask.offsetWidth / 2;
        let maskTop = e.pageY - this.ele.offsetTop - this.mask.offsetHeight / 2;

        // 判断拖拽范围
        if (maskLeft <= 0) {
            maskLeft = 0
        }
        if (maskTop <= 0) {
            maskTop = 0
        }
        // 拖拽时右边的范围判断
        if (maskLeft >= this.showWidth - this.mask.offsetWidth) {
            maskLeft = this.showWidth - this.mask.offsetWidth;
        }
        // 拖拽时下面的范围判断
        if (maskTop >= this.showHeight - this.mask.offsetHeight) {
            maskTop = this.showHeight - this.mask.offsetHeight;
        }

        this.mask.style.left = maskLeft + 'px';
        this.mask.style.top = maskTop + 'px';

        // 背景图移动的距离 = 背景图的大小 * 遮罩层移动的距离 / show盒子的大小
        // background-position
        let bgpX = parseInt(this.bgx * maskLeft / this.showWidth);
        let bgpY = parseInt(this.bgy * maskTop / this.showHeight);

        // 遮罩层往右移动，背景图需要往左移动
        this.enlarge.style.backgroundPosition = `${-bgpX}px ${-bgpY}px`;
    }

    // 点击list下的小图片更改box上显示的图片
    change(ele, idx) {
        // 当前点击的这个元素 添加active，其他元素移出
        for (let i = 0; i < this.p.length; i++) {
            this.p[i].classList.remove('active');
        }
        ele.classList.add('active');

        // 给show盒子设置 当前点击的这个元素的对应的中图
        this.showImg.src = this.data[idx].medium;

        // 给放大镜设置当前点击的这个元素的 对应的大图
        this.enlarge.style.backgroundImage = `url(${this.data[idx].big})`;
    }
}