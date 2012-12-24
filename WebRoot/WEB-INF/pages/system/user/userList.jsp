 <%@ include file="/common/taglibs.jsp" %>
<html>
<head>
    <meta name="heading" content="<s:text name='menu.workflow.change'/>>><s:text name='workflow.change.check.list'/>"/>

</head>
<body>
<div class="bodydiv">
<div class="jive-table">
	<form action="agent-front-rmb-in-detail.jsp?">
	<input type="hidden" id="includeCalendar" name="includeCalendar" value="true" />
	<table cellpadding="0" cellspacing="0" border="0" width="100%">
	<thead>
	    <tr>
	         <td class="head" width="15%">Month</td>
	      <td class="head" width="15%">Savings</td>
	    </tr>
	</thead>
	<tbody>
	<tr>
	 <td width="10%"> 
	<tr><td> 	<td colspan="2">
	       <input type="submit" value="query" name="query" /></td>
	</tr>
	<tr>
	<td colspan="2">
	<input type="submit" value="query" name="query" />
	</td>
	</tr>
	</tbody>
	</table>
	</form>
</div>
<div class="jive-table2">
	<form action="agent-front-rmb-in-detail.jsp?">
	<input type="hidden" id="includeCalendar" name="includeCalendar" value="true" />
	<table cellpadding="0" cellspacing="0" border="0" width="100%">
	<thead>
	    <tr>
	         <td class="head" width="15%">Month</td>
	      <td class="head" width="15%">Savings</td>
	    </tr>
	</thead>
	<tbody>
	<tr>
	 <td width="10%"> 
	<tr><td> 	<td colspan="2">
	       <input type="submit" value="query" name="query" /></td>
	</tr>
	<tr>
	<td colspan="2">
	<input type="submit" value="query" name="query" />
	</td>
	</tr>
	</tbody>
	</table>
	</form>
</div>

	<table  class="maintable">
	  <thead>
	    <tr>
	      <td class="head" width="15%">Month</td>
	      <td class="head" width="15%">Savings</td>
	    </tr>
	  </thead>
	   <tbody>
		<s:iterator id="user" value="pageInfo.list">
		  <tr>
	      <td class="tint" width="15%">January</td>
	      <td class="deep" width="15%">$总共</td>
	     </tr>
		</s:iterator>
	  </tbody>
	</table>
	</div>
</body>
</html>