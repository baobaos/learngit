//数字转换大写的方法

function chineseNumber(dValue) {

	    var maxDec = 2;

	    // 验证输入金额数值或数值字符串：

	    dValue = dValue.toString().replace(/,/g, "");

	    dValue = dValue.replace(/^0+/, ""); // 金额数值转字符、移除逗号、移除前导零
	
	    if (dValue == "") {
	
	        return "零元整";
	
	    } // （错误：金额为空！）

	    else if (isNaN(dValue)) {
	
	        return "错误：金额不是合法的数值！";

	    }

	    var minus = ""; // 负数的符号“-”的大写：“负”字。可自定义字符，如“（负）”。

	    var CN_SYMBOL = ""; // 币种名称（如“人民币”，默认空）

	    if (dValue.length > 1) {
	
	        if (dValue.indexOf('-') == 0) {
	
	            dValue = dValue.replace("-", "");
	
	            minus = "负";
	
	        } // 处理负数符号“-”

	        if (dValue.indexOf('+') == 0) {
	
	            dValue = dValue.replace("+", "");

	        } // 处理前导正数符号“+”（无实际意义）

	    }

	    // 变量定义：
	
	    var vInt = "";

	    var vDec = ""; // 字符串：金额的整数部分、小数部分
	
	    var resAIW; // 字符串：要输出的结果

	    var parts; // 数组（整数部分.小数部分），length=1时则仅为整数。

	    var digits, radices, bigRadices, decimals; // 数组：数字（0~9——零~玖）；基（十进制记数系统中每个数字位的基是10——拾,佰,仟）；大基（万,亿,兆,京,垓,杼,穰,沟,涧,正）；辅币（元以下，角/分/厘/毫/丝）。

	    var zeroCount; // 零计数

	    var i, p, d; // 循环因子；前一位数字；当前位数字。

	    var quotient, modulus; // 整数部分计算用：商数、模数。

	    // 金额数值转换为字符，分割整数部分和小数部分：整数、小数分开来搞（小数部分有可能四舍五入后对整数部分有进位）。

	    var NoneDecLen = (typeof (maxDec) == "undefined" || maxDec == null || Number(maxDec) < 0 || Number(maxDec) > 5); // 是否未指定有效小数位（true/false）

	    parts = dValue.split('.'); // 数组赋值：（整数部分.小数部分），Array的length=1则仅为整数。
	
	    if (parts.length > 1) {
	
	        vInt = parts[0];
	
	        vDec = parts[1]; // 变量赋值：金额的整数部分、小数部分
	
	        if (NoneDecLen) {
	
	            maxDec = vDec.length > 5 ? 5 : vDec.length;

	        } // 未指定有效小数位参数值时，自动取实际小数位长但不超5。

	        var rDec = Number("0." + vDec);

	        rDec *= Math.pow(10, maxDec);

	        rDec = Math.round(Math.abs(rDec));
	
	        rDec /= Math.pow(10, maxDec); // 小数四舍五入
	
	        var aIntDec = rDec.toString().split('.');
	
	        if (Number(aIntDec[0]) == 1) {
	
	            vInt = (Number(vInt) + 1).toString();
	
	        } // 小数部分四舍五入后有可能向整数部分的个位进位（值1）
	
	        if (aIntDec.length > 1) {

	            vDec = aIntDec[1];

	        } else {
	
	            vDec = "";
	
	        }

	    } else {
	
	        vInt = dValue;
	
	        vDec = "";
	
	        if (NoneDecLen) {
	
	            maxDec = 0;

	        }

	    }

	    if (vInt.length > 44) {

	        return "错误：金额值太大了！整数位长【" + vInt.length.toString() + "】超过了上限——44位/千正/10^43（注：1正=1万涧=1亿亿亿亿亿，10^40）！";

	    }

	    // 准备各字符数组 Prepare the characters corresponding to the digits:

	    digits = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); // 零~玖
	
	    radices = new Array("", "拾", "佰", "仟"); // 拾,佰,仟
	
	    bigRadices = new Array("", "万", "亿", "兆", "京", "垓", "杼", "穰", "沟", "涧", "正"); // 万,亿,兆,京,垓,杼,穰,沟,涧,正

	    decimals = new Array("角", "分", "厘", "毫", "丝"); // 角/分/厘/毫/丝
	
	    resAIW = ""; // 开始处理

	    // 处理整数部分（如果有）

	    if (Number(vInt) > 0) {
	
	        zeroCount = 0;
	
	        for (i = 0; i < vInt.length; i++) {
	
	            p = vInt.length - i - 1;
	
	            d = vInt.substr(i, 1);
	
	            quotient = p / 4;

	            modulus = p % 4;
	
	            if (d == "0") {
	
	                zeroCount++;
	
	            } else {
	
	                if (zeroCount > 0) {
	
	                    resAIW += digits[0];
	
	                }
	
	                zeroCount = 0;
	
	                resAIW += digits[Number(d)] + radices[modulus];

	            }

	            if (modulus == 0 && zeroCount < 4) {
	
	                resAIW += bigRadices[quotient];
	
	            }
	
	        }
	
	        resAIW += "元";

	    }

	    // 处理小数部分（如果有）

	    for (i = 0; i < vDec.length; i++) {

	        d = vDec.substr(i, 1);
	
	        if (d != "0") {
	
	            resAIW += digits[Number(d)] + decimals[i];
	
	        }
	
	    }
	
	    // 处理结果
	
	    if (resAIW == "") {
	
	        resAIW = "零" + "元";
	
	    } // 零元
	
	    if (vDec == "") {
	
	        resAIW += "整";
	
	    } // ...元整
	
	    resAIW = CN_SYMBOL + minus + resAIW; // 人民币/负......元角分/整
	
	    return resAIW;
	
	}





function convertCurrency(currencyDigits) { 
	// Constants: 
	    var MAXIMUM_NUMBER = 99999999999.99; 
	    // Predefine the radix characters and currency symbols for output: 
	    var CN_ZERO = "零"; 
	    var CN_ONE = "壹"; 
	    var CN_TWO = "贰"; 
	    var CN_THREE = "叁"; 
	    var CN_FOUR = "肆"; 
	    var CN_FIVE = "伍"; 
	    var CN_SIX = "陆"; 
	    var CN_SEVEN = "柒"; 
	    var CN_EIGHT = "捌"; 
	    var CN_NINE = "玖"; 
	    var CN_TEN = "拾"; 
	    var CN_HUNDRED = "佰"; 
	    var CN_THOUSAND = "仟"; 
	    var CN_TEN_THOUSAND = "万"; 
	    var CN_HUNDRED_MILLION = "亿"; 
	    var CN_SYMBOL = ""; 
	    var CN_DOLLAR = "元"; 
	    var CN_TEN_CENT = "角"; 
	    var CN_CENT = "分"; 
	    var CN_INTEGER = "整"; 
	     
	// Variables: 
	    var integral;    // Represent integral part of digit number. 
	    var decimal;    // Represent decimal part of digit number. 
	    var outputCharacters;    // The output result. 
	    var parts; 
	    var digits, radices, bigRadices, decimals; 
	    var zeroCount; 
	    var i, p, d; 
	    var quotient, modulus; 
	     
	// Validate input string: 
	    currencyDigits = currencyDigits.toString(); 
	    if (currencyDigits == "") { 
	        //alert("请输入小写金额！"); 
	        return ""; 
	    } 
	    if (currencyDigits.match(/[^,.\d]/) != null) { 
	       // alert("小写金额含有无效字符！"); 
	        return ""; 
	    } 
	    if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) { 
	        //alert("小写金额的格式不正确！"); 
	        return ""; 
	    } 
	     
	// Normalize the format of input digits: 
	    currencyDigits = currencyDigits.replace(/,/g, "");    // Remove comma delimiters. 
	    currencyDigits = currencyDigits.replace(/^0+/, "");    // Trim zeros at the beginning. 
	    // Assert the number is not greater than the maximum number. 
	    if (Number(currencyDigits) > MAXIMUM_NUMBER) { 
	        //alert("金额过大，应小于1000亿元！"); 
	        return ""; 
	    } 
	     
	// Process the coversion from currency digits to characters: 
	    // Separate integral and decimal parts before processing coversion: 
	    parts = currencyDigits.split("."); 
	    if (parts.length > 1) { 
	        integral = parts[0]; 
	        decimal = parts[1]; 
	        // Cut down redundant decimal digits that are after the second. 
	        decimal = decimal.substr(0, 2); 
	    } 
	    else { 
	        integral = parts[0]; 
	        decimal = ""; 
	    } 
	    // Prepare the characters corresponding to the digits: 
	    digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE); 
	    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND); 
	    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION); 
	    decimals = new Array(CN_TEN_CENT, CN_CENT); 
	    // Start processing: 
	    outputCharacters = ""; 
	    // Process integral part if it is larger than 0: 
	    if (Number(integral) > 0) { 
	        zeroCount = 0; 
	        for (i = 0; i < integral.length; i++) { 
	            p = integral.length - i - 1; 
	            d = integral.substr(i, 1); 
	            quotient = p / 4; 
	            modulus = p % 4; 
	            if (d == "0") { 
	                zeroCount++; 
	            } 
	            else { 
	                if (zeroCount > 0) 
	                { 
	                    outputCharacters += digits[0]; 
	                } 
	                zeroCount = 0; 
	                outputCharacters += digits[Number(d)] + radices[modulus]; 
	            } 
	            if (modulus == 0 && zeroCount < 4) { 
	                outputCharacters += bigRadices[quotient]; 
	                zeroCount = 0; 
	            } 
	        } 
	        outputCharacters += CN_DOLLAR; 
	    } 
	    // Process decimal part if there is: 
	    if (decimal != "") { 
	    	if(decimal == "00" || decimal == "0"){
	    		decimal = "";
	    	}else{
	    		for (i = 0; i < decimal.length; i++) { 
		            d = decimal.substr(i, 1); 
		            if (d != "0") { 
		                outputCharacters += digits[Number(d)] + decimals[i]; 
		            }
		        } 
	    	}
	        
	    } 
	    // Confirm and return the final output string: 
	    if (outputCharacters == "") { 
	        outputCharacters = CN_ZERO + CN_DOLLAR; 
	    } 
	    if (decimal == "") { 
	        outputCharacters += CN_INTEGER; 
	    } 
	    outputCharacters = CN_SYMBOL + outputCharacters; 
	    return outputCharacters; 
	}

