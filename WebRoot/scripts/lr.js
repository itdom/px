if (typeof (LiveReceptionCode_isonline) != 'undefined'
	&& LR_GetObj('LR_User_TextLink0') != null) {
if (LiveReceptionCode_isonline)
	LR_GetObj('LR_User_TextLink0').innerHTML = '<a ' + LiveReceptionCode_BuildChatWin(
			'有访客要求对话', '客服人员在线,欢迎点击咨询') + ' style="color: #FFFFFF;text-decoration: none;">咨询</a>';
else
	LR_GetObj('LR_User_TextLink0').innerHTML = '<a ' + LiveReceptionCode_BuildChatWin(
			'有访客要求对话', '客服人员不在线,请点击留言') + ' style="color: #FFFFFF;text-decoration: none;">留言</a>';
}