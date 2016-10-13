/**************************************************/
//1.解决类名获取的兼容函数
//classname：所要找的类名
//father:通过父元素来找这个类名（若不定义，则通过整个文档来找这个类名）
//通过类名获取元素的兼容问题
function getClass(selector,father){
  father=father||document;
	if(father.getElementsByClassName){
	  return father.getElementsByClassName(selector);
	}else{
	  var all=father.getElementsByTagName("*");
    var newarr=[];
	  for(var i=0;i<all.length;i++){//遍历数组
      if(check(all[i].className,selector)){
        newarr.push(all[i]);
      }
	  }
    return newarr;
	}
}
function check(str,val){
  var arr=str.split(" ");
	for(var i in arr){//将字符串按指定的分隔符分开
    if(arr[i]==val){
      return true;
    }
	}
  return false;
}
/**************************************************/



/**************************************************/
//2.获取样式的兼容函数
//getStyle();
//ele:为要操作document对象
//attr:要获取的属性值
function getStyle(ele,attr){
	if(ele.currentStyle){//IE
    //字符串转换成数值类型的方法
    // Number();
    // parseInt();
    // parseFloat();
    return ele.currentStyle[attr];
	}else{//ff
	  return getComputedStyle(ele,null)[attr];
	}
}
/**************************************************/



/**************************************************/
//3.获取元素的兼容函数
//$(".box");
//$("#box");
//$("li");
//selector:表示选择器，与CSS的选择器一样 
//father:父容器
//正则:(/^[a-z1-6]{1,10}/.test(selector))
//去掉字符串前后的空格:(/^\s*|\s*$/g,"")
function $(selector,father){
  // 给父容器设置默认值
  //document对现有的方法 所以需要提前将".father"转换为document对象
  father=father||document;
  //对selector做判断
  if(typeof selector=="string"){//必须是字符串
    selector=selector.replace(/^\s*|\s*$/g,"");//前面的（/^\s*|\s*$/g）用来去除字符串左右的空格，后面的（""）为用
    if(selector.charAt(0)=="."){//条件为真时，字符串为类名
          //".box" 转换为"box" .slice / .substring /.substr
      return getClass(selector.slice(1),father);
    }else if(selector.charAt(0)=="#"){//是ID名
      return father.getElementById(selector.slice(1));
          //正则的规范：
    }else if(/^[a-z1-6]{1,10}/.test(selector)){
      return father.getElementsByTagName(selector)
    }else if(typeof selector=="function"){
          //是一个函数时，执行window.onload事件
      window.onload=function(){
      selector();
      }
    }
  }
}
/**************************************************/



/**************************************************/
//4、获取子元素的兼容函数
function getChilds(father,type){
  type=type||"a";
  var all=father.childNodes;
  var arr=[];
  for (var i=0; i<all.length; i++) {
    if(type=="a"){//只获取元素子节点
      if(all[i].nodeType==1){
        arr.push(all[i]);
      }
    }else if(type=="b"){//获取元素+文本子节点
      if(all[i].nodeType==1 || (all[i].nodeValue.replace(/^\s*\s*$/g,"")!="" && all[i].nodeType==3)){
        arr.push(all[i]);
      }
    }
  };
  return arr;
}
/**************************************************/



/**************************************************/
//5、获得子节点中的第一个
function getFirst(father){
  return getChilds(father)[0];
}
/**************************************************/



/**************************************************/
//6、获得子节点中的最后一个
function getLast(father){
  return getChilds(father)[(getChilds(father).length)-1];
}
/**************************************************/



/**************************************************/
//7、通过指定下标来获得子节点中的一个
function getNum(father,type,num){
  return getChilds(father,type)[num];
}
/**************************************************/



/**************************************************/
//8、获得指定下标元素的下一个兄弟节点

//找打一个兄弟时，对它判断，如果是空文本或者是注释时，再接着向下找，如果找到的是元素节点时，停止寻找

function getNext(ele){
  var next=ele.nextSibling;//下一个
  if(next==null){
    return false;
  }
  while(next.nodeType==8 || (next.nodeType==3 && next.nodeValue.replace(/^\s*|\s*$/g,"")=="")){//条件满足 接着找(条件为注释节点或者文本节点)
    next=next.nextSibling;
    if(next==null){
      return false;
    }
  }
  return next;
}
/**************************************************/



/**************************************************/
//9、获得指定下标元素的上一个兄弟节点
//ele  一个元素节点
function getUp(ele){
  var up=ele.previousSibling;//上一个
  if(up==null){
    return false;
  }
  while(up.nodeType==8 || (up.nodeType==3 && up.nodeValue.replace(/^\s*|\s*$/g,"")=="")){//条件满足 接着找(条件为注释节点或者文本节点)
    up=up.previousSibling;
    if(up==null){
    return false;
    }
  }
  return up;
}
/**************************************************/

/**************************************************/
//10、插到某一个对象之后
function insertAfter(father,newNode,node){
  var next=getNext(node);
  if(next){
    father.insertBefore(newNode,next);
  }else{
    father.appendChild(newNode)
  }
}
/**************************************************/





















