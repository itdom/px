package com.rathink.util;



import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import net.sourceforge.pinyin4j.PinyinHelper;


public class PinYinUtil {
	public static String[] toDiffHanyuPinyinStringArray(char ch, HanyuPinyinOutputFormat format) throws BadHanyuPinyinOutputFormatCombination {
		String[] pinyinStrArray=null;
		if('\u9fa5'<ch||'\u4e00'>ch){//不是汉字
			return new String[]{(""+ch).toUpperCase()};
		}
		pinyinStrArray= PinyinHelper.toHanyuPinyinStringArray(ch, format);
		int count=0;
		for(int i=0;i<pinyinStrArray.length;i++){
			for(int j=i+1;j<pinyinStrArray.length;j++){
				if(pinyinStrArray[i].equals(pinyinStrArray[j])){
					pinyinStrArray[j]="null";
				}
			}
			if(pinyinStrArray[i]!="null"){
				++count;
			}
		}
		String[] reStringArray=new String[count];
		int j=0;
		for(int i=0;i<pinyinStrArray.length;i++){
			if(!pinyinStrArray[i].equals("null")){
				reStringArray[j++]=pinyinStrArray[i];
			}
		}
	
		return reStringArray;
	}
	//通用方法有了。。不过太耗内存。
	public static String Name2Pinyin(String name) throws BadHanyuPinyinOutputFormatCombination{
		//注意在调用此方法是不能有空格。在前面去掉..这里就不去了。。看着费劲
		if (name == null || name.length() == 0||name.length()>4) {
			return null;
		}
		HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
		format.setCaseType(HanyuPinyinCaseType.UPPERCASE);
		format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
		format.setVCharType(HanyuPinyinVCharType.WITH_V);
		char fourChar=0;
		if(name.length()==4){
			fourChar=name.charAt(3);
			name=name.substring(0, 3);
		}
		char[] eachs = name.toCharArray();
		StringBuffer buffer=null;
		
		if(eachs.length==1){
			buffer=new StringBuffer();
			String [] s=PinYinUtil.toDiffHanyuPinyinStringArray(eachs[0],format);
			for(int i=0;i<s.length;i++){
				buffer.append(s[i]);
				if(s.length!=1&&i!=s.length-1){
					buffer.append(";");
				}
			}
			return buffer.toString().replaceAll(" ", "");
		}else if(eachs.length==2){
			buffer=new StringBuffer();
			String[] firstNameArrays=PinYinUtil.toDiffHanyuPinyinStringArray(eachs[0],format);
			String[] secondNameArrays=PinYinUtil.toDiffHanyuPinyinStringArray(eachs[1],format);
			for(int i=0;i<firstNameArrays.length;){
				for(int j=0;j<secondNameArrays.length;j++){
					buffer.append(firstNameArrays[i]+" ");
					buffer.append(secondNameArrays[j]+";");
				}
				i++;
			}
			if(buffer.lastIndexOf(";")==buffer.length()-1){
				return buffer.substring(0, buffer.length()-1).replaceAll(" ","");
			}
		}else if(eachs.length==3){
			buffer=new StringBuffer();
			String[] firstNameArrays=PinYinUtil.toDiffHanyuPinyinStringArray(eachs[0],format);
			String[] secondNameArrays=PinYinUtil.toDiffHanyuPinyinStringArray(eachs[1],format);
			String[] thirdNameArrays=PinYinUtil.toDiffHanyuPinyinStringArray(eachs[2],format);
			for(int i=0;i<firstNameArrays.length;){
				for(int j=0;j<secondNameArrays.length;){
					for(int k=0;k<thirdNameArrays.length;k++){
						buffer.append(firstNameArrays[i]+" ");
						buffer.append(secondNameArrays[j]+" ");
						buffer.append(thirdNameArrays[k]);
						if(fourChar!=0){
                            if((""+fourChar).matches("[a-zA-Z]")){
                                buffer.append((""+fourChar).toUpperCase());
                            }else if('\u9fa5'<fourChar||'\u4e00'>fourChar){
                                buffer.append((""+fourChar));
                            }else{
                                buffer.append(PinyinHelper.toHanyuPinyinStringArray(fourChar)[0].toUpperCase().replaceAll("[^a-zA-Z]",""));
                            }
						}
						buffer.append(";");
					}
					j++;
				}
				i++;
			}
			if(buffer.lastIndexOf(";")==buffer.length()-1){
				return buffer.substring(0, buffer.length()-1).replaceAll(" ", "");
			}
		}
		return null;
	}
	//此处异常一定要捕获、、、不然在spring的service内抛出异常不完成事务性。。除非也catch。。不过外一那。。给他扼杀在摇篮里
	public static String[] Name2PinYinArray(String name){
		try {
			String value=PinYinUtil.Name2Pinyin(name);
			if(value==null){
				return null;
			}
			return value.split(";");
		} catch (BadHanyuPinyinOutputFormatCombination e) {
			e.printStackTrace();
		}
		return null;
	}
}
