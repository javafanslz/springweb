<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript"
	src="jQuery/common/jquery-1.11.1.min.js"></script>
	<script type="application/javascript" src="jsStudy/jsTest.js"></script>
	<script type="application/javascript" src="jsStudy/arrayTest.js"></script>
	<script type="application/javascript" src="jsStudy/selectorTest.js"></script>
	<script type="application/javascript" src="jsStudy/regexpTest.js"></script>
	<script type="application/javascript" src="jsStudy/functionTest.js"></script>
	<script type="text/javascript">
		var contextPath = "${pageContext.request.contextPath}";
	</script>
</head>
<body>
测试正则表达式<input type="text" id="reg" />
<input type="button" value="测试按钮" onclick="regTest()">
<div id="div1">
	第一个<input type ="text" name="myText1"/>
</div>
<div id="div2">
	<input type="button" name="button1" value="点击" disabled/>
</div>
<div  id="div3" name="div3">
	<div id="div3.1">
		<table>
			<tr>
				<td>1.1</td>
				<td>1.2</td>
			</tr>
			<tr>
				<td>2.1</td>
				<td>2.2</td>
			</tr>
		</table>
	</div>
</div>
<div  id="div4" name="div4">
	父亲
	<br/>
	<div id="div4.1">
		haizi
	</div>
</div>

<div id="empty">

</div>
<input type ="hidden" value="sdfas"/>
<br/>

</body>
</html>