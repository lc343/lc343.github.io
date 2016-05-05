---
layout: post
title: "【JavaScript】offset笔记"
description: "读书笔记"
category: 技术
tags: [JavaScript, 笔记]
---
{% include JB/setup %}

关于offset需要清楚5个属性：<br>
1.offsetParent <br>
2.offsetHeight	<br>
3.offsetWidth <br>
4.offsetLeft <br>
5.offsetTop <br>
由于浏览器的差异性，得到的值并不一致，分别从五个属性开始分析。
<h2>一、offsetParent </h2>
<p>offsetParent属性返回一个对象的引用，是指用来定位的父级，不一定与parentNode的值相等。</p>
<p>1.若当前元素的父级元素没有进行CSS定位（position为absolute或relative，offsetParent为body。</p>
<p>2.若当前元素的父级元素有CSS定位（position为absolute或relative，offsetParent为离元素最近的定位父级元素。</p>
1.第一种没有进行CSS定位，测试代码如下：

	<html>
		<head>
    		<meta charset="UTF-8">
    		<style type="text/css">
        		body {
            			border:10px solid #CCC;
            			padding:40px;
            			background:#EEE;
           				margin: 10px;
            			font-size: 10px;
        		}
        		#myDiv {
            			width:400px;
            			height:200px;
            			padding:20px;
            			background:#fff000;
            			border:5px solid #000;
        		}
        		#test {
            			width:200px;
            			height:100px;
            			padding:10px;
            			background: #ff00f0;
            			border:5px solid #000;
        		}
    		</style>
		</head>
		<body>
			<div id="myDiv">
    			<div id="test"></div>
			<div>
			<script>
				var myDiv = document.getElementById("myDiv");	
				var test = document.getElementById("test");
    			test.innerHTML = "Browser:" + navigator.userAgent + "<br>" +
            		"offsetParent:" + test.offsetParent.tagName + "<br>";
			<script>
		<body>
		</html>

<br>
<br>这段代码在Chrome浏览器中的效果如图：
<br>![](/assets/img/note1/1.png)
<br>2.第二种有CSS定位，在`id=#myDiv`添加代码`position: relative;`
这段代码在Chrome浏览器中的效果如图：<br>
![](/assets/img/note1/2.png)<br>
<h2> 二、offsetHeight和 offsetWidth </h2>
<br>当前元素的父级元素有CSS定位，添加代码如下：

     	test.innerHTML = "Browser:" + navigator.userAgent + "<br>" +
            "offsetParent:" + test.offsetParent.tagName + "<br>"+
            "<p>offsetHeight:"+test.offsetHeight+"</p>"+
            "<p>offsetHeight:"+test.offsetWidth+"</p>"+
            "<p>offsetLeft:"+test.offsetLeft+"</p>"+
            "<p>offsetTop:"+test.offsetTop+"</p>";
<p>
各个浏览器下的效果图如下：<br>
</p>
1.Chrome效果图<br>
1.![](/assets/img/note1/2.1.png)<br>
2.Firefox效果图<br>
2.![](/assets/img/note1/2.2.png)<br>
3.IE7/9效果图效果一样<br>
3.![](/assets/img/note1/2.3.png)<br>
4.IE8效果图效果一样<br>
4.![](/assets/img/note1/2.58.png)<br>
5.Opera效果图<br>
5.![](/assets/img/note1/2.4.png)<br>
<b>综上可得</b>offsetHeight和 offsetWidth的值在各个浏览器中都一样，并且没有CSS定位效果也是一样。<br>
offsetHeight为元素的可视高度，这个高度包括元素的高度，水平滚动条的高度，边框高度和内边距高度。
<p>
	offsetHeight=(border-top-width)+(padding-top)+(height)+(padding-bottom)+(border-top-width)
</p>
offsetWidth为元素的可视宽度，这个宽度包括元素的宽度，垂直滚动条的宽度，边框宽度和内边距宽度。
<p>
	offsetWidth=(border-left-width)+(padding-left)+(width)+(padding-right)+(border-right-width)
</p>
<h2> 三、offsetLeft和 offsetTop </h2>
<br>由二可知offsetWidth与offsetHeight，这两个属性的值只与该元素有关，与周围元素（父级和子级元素无关），但是offsetLeft和 offsetTop这两个属性与offsetParent有关。
<p>
1.当前元素的父级元素有CSS定位，除了IE8效果图效果不一样，Chrome，Firefox,IE7/9，Opera这两个属性值都相等。
offsetLeft指的是元素的左外边框到包含元素的左内边框之间的像素距离。
</p>
<p>
	offsetLeft=padding-left(IE8除外)<br>
	IE8:offsetLeft=(padding-left)+(border-left-width)
</p>
<p>
offsetTop指的是元素的上外边框到包含元素的上内边框之间的像素距离。
	<p>
	offsetTop=padding-top(IE8除外)<br>
	IE8:offsetTop=(padding-top)+(border-top-width)
	</p>
</p>
2.当前元素的父级元素没有CSS定位，即父级为body，这种情况比较特殊<br>

1.IE7效果图<br>
1.![](/assets/img/note1/3.2.png)<br>
与之前父级元素CSS定位时的两个属性值相等。<br>
2.IE8/9效果图<br>
2.![](/assets/img/note1/3.3.png)<br>
与之前父级元素CSS定位时的两个属性值不相等，
<p>
offsetLeft=(body的border-left-width)+(body的padding-left)+(当前元素的margin-left)+(当前元素的前n个padding-left)[当嵌套时加]+(当前元素的border-left-width)。<br>
offsetTop=(body的border-top-width)+(body的padding-top)+(当前元素的margin-top)+(当前元素的前n个padding-top)[当嵌套时加]+(当前元素的border-top-width)两式都满足。<br>
<b>这个公式在当没有一个div嵌套在div中，各个浏览器效果图如下所示。</b>
</p>
offsetLeft=(body的border-left-width)+(body的padding-left)+(当前元素的margin-left)+(当前元素的border-left-width)；IE8/9,Chrome，Opera满足该公式。
offsetTop=(body的border-top-width)+(body的padding-top)+(当前元素的margin-top)+(当前元素的border-top-width)；IE8/9,Chrome，Opera满足该公式。
IE8/9效果图如图所示：<br>
2.1.![](/assets/img/note1/4.1.png)<br>
2.1.Chrome效果图如图所示：<br>
2.2.![](/assets/img/note1/4.2.png)<br>
2.2.Opera效果图如图所示：<br>
2.3.![](/assets/img/note1/4.3.png)<br>
2.3.Firefox效果图如图所示：<br>
2.4.![](/assets/img/note1/4.4.png)<br>
2.4.Firefox的offsetLeft和offsetLeft值不一样
offsetLeft=(body的border-left-width)+(body的padding-left)+(当前元素的margin-left)<br>
offsetTop=(body的border-top-width)+(body的padding-top)+(当前元素的margin-top)<br>
<p>回到之前的整体，有嵌套情况</p><br>
3.Chrome效果图<br>
3.![](/assets/img/note1/3.1.png)<br>
4.Firefox效果图<br>
4.![](/assets/img/note1/4.5.png)<br>
offsetLeft=(body的border-left-width)+(body的padding-left)+(当前元素的margin-left)+(当前元素的前1个padding-left)[当嵌套时加]满足该式。<br>
offsetTop=(body的border-top-width)+(body的padding-top)+(当前元素的margin-top)+(当前元素的前1个padding-top)[当嵌套时加]满足该式。<br>
5.Opera效果图<br>
5.![](/assets/img/note1/3.4.png)<br>
offsetLeft=(body的border-left-width)+(body的padding-left)+(当前元素的margin-left)+(当前元素的前n个padding-left)[当嵌套时加]+(当前元素的border-left-width)满足该式。<br>
offsetTop=(body的border-top-width)+(body的padding-top)+(当前元素的margin-top)+(当前元素的前n个padding-top)[当嵌套时加]+(当前元素的border-top-width)满足该式。<br>
6.Chrome效果图<br>
6.![](/assets/img/note1/3.1.png)<br>
offsetTop=(body的border-top-width)+(body的padding-top)+(当前元素的margin-top)+(当前元素的前n个padding-top)[当嵌套时加]+(当前元素的border-top-width)满足该式。<br>
但是offsetLeft=(body的border-left-width)+(body的padding-left)+(当前元素的margin-left)+(当前元素的前n个padding-left)[当嵌套时加]+(当前元素的border-left-width)-1满足该式。<br>

## 小结 ##
最后，对于offsetParent为body的情况，比较特殊，现在的主流浏览器IE8/9/10和Chrome及Firefox都跟定义不太一样，特别是Chrome在嵌套div的情况下，offsetLeft值与其他IE8/9/10的值相差1，不知道是什么原因。