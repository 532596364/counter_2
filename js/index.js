

/**获取ie浏览器版本**/
var browser=navigator.appName 
var b_version=navigator.appVersion 
var version=b_version.split(";"); 
var trim_Version=version[1].replace(/[ ]/g,""); 



/**初始参数的设置**/
// 屏幕对象
var screen = document.getElementById("numScreen");
//存放输入的数字以及符号的数组
var arr = [];
// 输入的字符个数
var count = 0;
// 用于屏幕显示一段数字
var scr ="";
//用于判断是否是连续运算
var conti = 0;
//用于判断数字中是否已经输入过小数点了
var dot = 0;
//清除函数
function clean() {
	arr = [];
	count = 0;
	scr ="";
	screen.value = 0;
	conti = 0;
	dot = 0;
}

//乘除函数
function div_mul() {
	//将数组转化为字符串
	var str = arr.join("");
	var num1=0;
	var num2=0;
	var num3=0;
		// 看看是否存在乘除运算
		if(str.match(/\*/)){
			//将字符串按加减乘除打断，得到输入的各个数字
			var arr2 = str.split(/[\+|\-|\*|\/]/);
			//获得乘除运算那一段的字符，方便将其从数组中剔除
			var arr3 = str.split(/[\+|\-]/);
			//获得乘除运算那一段的字符的长度，方便将其从数组中剔除
			var del = arr3.pop().length;
			//消除取反符号
			for (var i = 0; i < arr2.length; i++) {
				if (arr2[i].toString().match('!')) {
					arr2[i] = (arr2[i].toString().substring(1)-0)*(-1);
				}
			}
			//将乘除运算那一段的字符从数组中剔除
			for (var i = 0; i < del; i++) {
				arr.pop();
				count--;
			}
			//获得乘除运算那一段的字符中的数字，分小数与整数
			if (str.match('.')) {
				num1 = parseFloat(arr2.pop());
				num2 = parseFloat(arr2.pop());
			}else{
				num1 = arr2.pop()-0;
				num2 = arr2.pop()-0;
			}
			//对其进行乘除运算，并将结果加到数组中
			    num3 = dotCounter("*",num1,num2);
			    back(num3);

		}else if(str.match(/\//)){     //这是除法，步骤跟乘法类似，参考上述注释
			var arr2 = str.split(/[\+|\-|\*|\/]/);
			var arr3 = str.split(/[\+|\-]/);
			var del = arr3.pop().length;
			for (var i = 0; i < arr2.length; i++) {
				if (arr2[i].toString().match('!')) {
					arr2[i] = (arr2[i].toString().substring(1)-0)*(-1);
				}
			}

			for (var i = 0; i < del; i++) {
				arr.pop();
				count--;
			}
			
			if (str.match('.')) {
				num1 = parseFloat(arr2.pop());
				num2 = parseFloat(arr2.pop());
			}else{

				num1 = arr2.pop()-0;
				num2 = arr2.pop()-0;
			}
			num3 = dotCounter("/",num1,num2);
			back(num3);
		}
		
}


function commond(val){
	switch(true)
	{
		//输入除号
		case (val == "divide"):
			if (conti) {
				conti=0;
			}
			dot=0;
			if (count && (typeof arr[count-1] == 'number')){
				div_mul();
				arr.push("/");
				count++;
			};
			break;
		//输入乘号
		case (val == "mul"):
			if (conti) {
				conti=0;
			};
			dot=0;
			if (count && (typeof arr[count-1] == 'number')) {
				div_mul();
				arr.push("*");
				count++;
			};
			break;
		//输入减号
		case (val == "minus"):
			if (conti) {
				conti=0;
			};
			dot=0;
			if (count && (typeof arr[count-1] == 'number')) {
				div_mul();
				arr.push("-");
				count++;
			};
			break;
		//输入加号
		case (val == "add"):
			if (conti) {
				conti=0;
			};
			dot=0;
			if (count && (typeof arr[count-1] == 'number')) {
				div_mul();
				arr.push("+");
				count++;
			};
			break;
		//小数点	
		case ( val == "dot"):
			if (conti) {
				conti=0;
			}
			if (!dot) {
				if (count && (typeof arr[count-1] == 'number') && !scr.search(".")) {
					val = ".";
					scr += val;
					screen.value = scr;				
					count++;
					arr.push(val);
				};
				dot=1;
			}
			break;
		//对数组中的数字取反
		case (val =="reverse"):
			if (conti) {
				conti=0;
			}
			//已经输入了数字，且之前一个还是数字输入
			if (count && (typeof arr[count-1] == 'number')){
				var str = arr.join("");
				var arr2 = str.split(/[\+|\-|\*|\/]/);
				var last = arr2.pop();
				for (var i = 0; i < last.length; i++) {
					arr.pop();
					count--;
				}
				if (last.charAt(0) == "!") {
					last = last.substring(1)-0;
					scr =scr.substring(1);
				}else{
					arr.push("!");
					count++;
					last = last-0;
					scr = "-".concat(scr);	
				}
				back(last);
				screen.value = scr;	
			}else if (!count ){  //未输入任何数据
				arr.push("!");
				count++;
				scr = "-";
				screen.value = scr;
			}else if ((typeof arr[count-1]) != 'number' && arr[count-1] !="." && arr[count-1] !="!") {
				//前一个是加减乘除符号
				arr.push("!");
				count++;
				scr = "-";
				screen.value = scr;
			}else if(arr[count-1] == '!'){ //前一个是符号
				arr.pop();
				count--;
				if (scr.length == 1) {
					scr=""
				}else{
					scr = scr.substring(1);
				}
				screen.value = scr;
			};
			break;
		/*********取百分数********/
		case (val == "percent"):
			if (conti) {
				conti=0;
			}
			if (count && (typeof arr[count-1] == 'number')){
				var str = arr.join("");
				var arr2 = str.split(/[\+|\-|\*|\/]/);
				var last = arr2.pop();
				for (var i = 0; i < last.length; i++) {
					arr.pop();
					count--;
				}
				if (last.charAt(0) == "!") {
					last = (last.substring(1)-0)/100;
					arr.push("!");
					count++;	
					scr = last*(-1);
				}else{
					last = (last-0)/100;
					scr = last;	
				}
				back(last);
				screen.value = scr;	
			}
				break;
		//取倒数
		case (val == "inverse"):
			if (conti) {
				conti=0;
			}
			if (count && (typeof arr[count-1] == 'number')){
				var str = arr.join("");
				var arr2 = str.split(/[\+|\-|\*|\/]/);
				var last = arr2.pop();
				for (var i = 0; i < last.length; i++) {
					arr.pop();
					count--;
				}
				if (last.charAt(0) == "!") {				
					last = (last.substring(1)-0);
					if (last != 0) {
						last = 1/last;
						last = last.toFixed(10);
						arr.push("!");
						count++;	
						scr = last*(-1);
					}else{
						alert("0没有倒数");
					}
				}else{
					last = (last-0);
					if (last != 0) {
						last = 1/last;
						last = last.toFixed(10);	
						scr = last;	
					}else{
						alert("0没有倒数！");
					}	
				}
				back(last);
				screen.value = scr;	
			}
				break;
		//开根号
		case (val == "sqr"):
			if (conti) {
				conti=0;
			}
			if (count && (typeof arr[count-1] == 'number')){
				var str = arr.join("");
				var arr2 = str.split(/[\+|\-|\*|\/]/);
				var last = arr2.pop();
				for (var i = 0; i < last.length; i++) {
					arr.pop();
					count--;
				}
				if (last.charAt(0) == "!") {
					alert("负数不能开方！");
				}else{
					last = (last-0);
					last = Math.sqrt(last);
					last = last.toFixed(10);	
					scr = last;	
				}
				back(last);
				screen.value = scr;	
			}
				break;
		//sin cos tan
		case (val == "sin" || val == "cos" || val == "tan"):
			if (conti) {
				conti=0;
			}
			if (count && (typeof arr[count-1] == 'number')){
				var str = arr.join("");
				var arr2 = str.split(/[\+|\-|\*|\/]/);
				var last = arr2.pop();
				for (var i = 0; i < last.length; i++) {
					arr.pop();
					count--;
				}
				if (last.charAt(0) == "!") {
						if (val == "sin") {
							last = Math.sin(last);
						}else if (val == "cos") {
							last = Math.cos(last);	
						}else{
							last = Math.tan(last);
						}
						last = last.toFixed(10);
						arr.push("!");
						count++;	
						scr = last*(-1);
				}else{
					last = (last-0);
					if (val == "sin") {
							last = Math.sin(last);
						}else if (val == "cos") {
							last = Math.cos(last);	
						}else{
							last = Math.tan(last);
					}
					last = last.toFixed(10);
					scr = last;	
				}
				back(last);
				screen.value = scr;	
			}
				break;
		//输入数字
		case (!isNaN(val)):
			//输入数字之前是加减乘除的情况
			if (conti) {
				arr = [];
				count = 0;
				scr ="";
				conti=0;
			}
			if (isNaN(arr[count-1]) && arr[count-1]!="." &&  arr[count-1]!="!" ) {
				scr="";
				scr=val.toString();
			}else if(!isNaN(arr[count-1])){ //输入数字之前是数字的情况
				if (scr.length<7) {
					scr += val;
				}
			}else if(arr[count-1] == ".") { //输入数字之前是小数点的情况
				if (scr.length<7) {
					scr += val;
				}
			}else if (arr[count-1] == "!") {//输入数字之前是负号的情况
				if (scr.length<7) {
					scr += val;
				}
			};
			screen.value = scr;
			arr.push(val);			
			count++;
			break;
		default:break;
	}	
}






//将运算结果再返回到数组中
function back(num3) {
	var array = num3.toString().split("");
			for (var i = 0; i < array.length; i++) {
				if(array[i] != "."){
					array[i] = array[i]-0;
				}
				arr.push(array[i]);
				count++;
		}
}


//限定屏幕显示位数
function subStr(str) {
	try{
		if (str.toString().match(".")) {
			return str.toString().substr(0,9);
		}else{
			return str.toString().substr(0,10);
		}
	}catch(e){
		return 0;
	}
	
}

//自己写的加减运算排除小数加减乘除出现的问题
function dotCounter(str,num1,num2) {
	try {
        sq1 = num1.toString().split(".")[1].length;
    }
    catch (e) {
        sq1 = 0;
    }
    try {
        sq2 = num2.toString().split(".")[1].length;
    }
    catch (e) {
        sq2 = 0;
    }
	var m = Math.pow(10,Math.max(sq1, sq2));
	num1 *=m;
	num2 *=m;
	switch(str){
		case "+":
			return (num1+num2)/m;
		case "-":
			return (num1-num2)/m;
		case "*":
			return (num1*num2)/m/m;
		case "/":
			if (num1 == 0) {
				alert("除数不能为0");
				break;
			}else{
				return (num2/num1);
			}
		default:
			break;
	}
}






//等于号后将结果输出
function equal() {
	if (count && !isNaN(arr[count-1])) {
		conti = 1;
		//只有乘除运算没有加减运算
		div_mul();

		var str = arr.join("");
		if (str.match(/[\+|\-|\*|\/]/) == null) {
			screen.value = subStr(str);
			// 输出结果后对数组，等各项数据格式化
			scr =str-0;
		}else{
		//加减运算
		var arr2 = str.split(/[\+|\-|\*|\/]/);
		var n = arr2.length-1;
		arr2 = arr2.reverse();
		//消除取反符号
		for (var i = 0; i < arr2.length; i++) {
			if (arr2[i].toString().match('!')) {
				arr2[i] = (arr2[i].toString().substring(1)-0)*(-1);
			}
		}
		//具体如果操作数组进行结果输出
		var arr3 = str.split(/[0-9|\.|]*/);
		if(browser=="Microsoft Internet Explorer" && (trim_Version=="MSIE7.0" ||trim_Version=="MSIE8.0") ) 
			{ 
				arr3.push("");
				arr3.unshift("");
			}
		for (var i = 0; i < n; i++) {
			if (str.match('.')) {
				var num1 = parseFloat(arr2.pop());
				var num2 = parseFloat(arr2.pop());
			}else{
				var num1 = arr2.pop()-0;
				var num2 = arr2.pop()-0;
			}
			switch(arr3[i+1]){
					case "+":
						var num3 = dotCounter("+",num1,num2);
						arr2.push(num3);
						break;
					case "-":
						var num3 = dotCounter("-",num1,num2);
						arr2.push(num3);
						break;
					default:
						break;	
				}
		}	
			screen.value = subStr(arr2[0]);
			// 输出结果后对数组，等各项数据格式化
			scr = arr2[0];
		}
	}	
}

