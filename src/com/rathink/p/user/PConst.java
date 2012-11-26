package com.rathink.p.user;

/**
 * User: Kyll
 * Time: 2008-10-16 14:59:28
 */
public class PConst {
	public static boolean VALIDATE = false;

	public static final String UPLOAD_DIR = "root";
	public static final String INFO_BBS_ATTACHEMENT_DIR = "info_bbs_attachement";
	public static final String STUDENT_PHOTO_DIR = "student_photo";
	public static final String HR_PHOTO_DIR = "hr_photo";
	public static final String MODEL_TEACHER_PATH = (Thread.currentThread().getContextClassLoader().getResource("")).toString().replace("file:", "") + "excel" + System.getProperty("file.separator") + "teacher.properties";
	public static final String MODEL_STUDENT_PATH = (Thread.currentThread().getContextClassLoader().getResource("")).toString().replace("file:", "") + "excel" + System.getProperty("file.separator") + "student.properties";
	public static final String MODEL_FOOD_PATH = (Thread.currentThread().getContextClassLoader().getResource("")).toString().replace("file:", "") + "excel" + System.getProperty("file.separator") + "rawfood.properties";
	public static final String MODEL_FOODDATA_PATH = (Thread.currentThread().getContextClassLoader().getResource("")).toString().replace("file:", "") + "excel" + System.getProperty("file.separator") + "rawfoodCategory.properties";
	//导入thread
    public static final String MODEL_FROMORG_THREAD=(Thread.currentThread().getContextClassLoader().getResource("")).toString().replace("file:", "") + "excel" + System.getProperty("file.separator") + "fromOrgThread.properties";
    public static final String LOG_PATH = (Thread.currentThread().getContextClassLoader().getResource("")).toString().replace("file:", "") + "logs" + System.getProperty("file.separator");
	public static final String BUNDLE_KEY = "ApplicationResources";
	public static final String FILE_SEP = System.getProperty("file.separator");

	public static final int PAGE_SIZE = 20;

	public static final String BRANCH_SETTING_TRAINING_SMALL = "course=single;supply=false;studentAccount=false;studentAccountRefund=true;attendance=course;logo=default";
	public static final String BRANCH_SETTING_TRAINING = "course=single;supply=false;studentAccount=false;studentAccountRefund=true;attendance=course;logo=default;phone=default;card=default;sms=default;studentType=1;pageRecords=30;accountingSystem=enterprise;studentUserAuto=yes;studentUserFrom=studentName";
	public static final String BRANCH_SETTING_MAJOR = "course=multi;supply=false;studentAccount=false;studentAccountRefund=true;attendance=day;logo=default;phone=default;card=default;sms=default;studentType=3;pageRecords=30;accountingSystem=enterprise;studentUserAuto=yes;studentUserFrom=studentName";
	public static final String BRANCH_SETTING_SCHOOL = "course=multi;supply=false;studentAccount=false;studentAccountRefund=true;attendance=day;logo=default;phone=default;card=default;sms=default;studentType=3;pageRecords=30;accountingSystem=enterprise;studentUserAuto=yes;studentUserFrom=studentName";
	public static final String BRANCH_SETTING_KINDERGARDEN = "course=multi;supply=false;studentAccount=true;studentAccountRefund=false;attendance=day;logo=default;phone=default;card=default;sms=default;studentType=2;pageRecords=30;accountingSystem=enterprise;studentUserAuto=yes;studentUserFrom=studentName";
	public static final int BRANCH_TYPE_ADMIN = 0;
	public static final int BRANCH_TYPE_TRAINING = 100;//培训学校
	public static final int BRANCH_TYPE_TRAINING_SMALL = 100;//培训学校
	public static final int BRANCH_TYPE_TRAINING_BIG = 200;
	public static final int BRANCH_TYPE_TECHNICAL = 300;//职业学校
	public static final int BRANCH_TYPE_SCHOOL = 500;//中小学
	public static final int BRANCH_TYPE_KINDERGARDEN = 700;//幼儿园
	public static final int BRANCH_TYPE_SCHOOL_OLD = 4;
	public static final int ORGAN_TYPE_COMMON = 0;
	public static final int ORGAN_TYPE_YEY = 4;
	public static final int ORGAN_TYPE_CLAZZINSTANCE = 5;
	public static final int ORGAN_TYPE_TEACHAREA = 6;
	public static final int ORGAN_STATUS_NORMAL = 10;
	public static final int ORGAN_STATUS_DELETE = 11;
	public static final int USER_TYPE_DELETE = -1;
	public static final int USER_TYPE_STUDENT = 1;
	public static final int USER_TYPE_TEACHER = 0;
	public static final int USER_TEACHER_TYPE_ALL = 1;    //老师和用户
	public static final int USER_TEACHER_TYPE_LOGIN = 2; //  用户
	public static final int USER_TEACHER_TYPE_INFO = 3; //   教师

	// role
	public static final String ROLE_ADMIN = "ROLE_ADMIN";
	public static final String ROLE_USER = "ROLE_USER";
	public static final String ROLE_STUDENT = "STUDENT_USER";
	// usergroup
	public static final String USERGROUP_INITITOR = "INITITOR";
	public static final String USERGROUP_INITITOR_SMALL = "INITITOR_SMALL";
	public static final String USERGROUP_INITITOR_TRAINING = "INITITOR_TRAINING";
	public static final String USERGROUP_INITITOR_MAJOR = "INITITOR_MAJOR";
	public static final String USERGROUP_INITITOR_SCHOOL = "INITITOR_SCHOOL";
	public static final String USERGROUP_INITITOR_KINDERGARDEN = "INITITOR_KINDERGARDEN";
	public static final String USERGROUP_ADMIN = "ADMIN";
	public static final String USERGROUP_MARKET_CHIEF = "MARKET_CHIEF";
	public static final String USERGROUP_ENROLL_STAFF = "ENROLL_STAFF";
	public static final String USERGROUP_ENROLL_CHIEF = "ENROLL_CHIEF";
	public static final String USERGROUP_COM_ENROLL_STAFF = "COM_ENROLL_STAFF";
	public static final String USERGROUP_COM_ENROLL_CHIEF = "COM_ENROLL_CHIEF";
	public static final String USERGROUP_GRADUATE_STAFF = "GRADUATE_STAFF";
	public static final String USERGROUP_GRADUATE_CHIEF = "GRADUATE_CHIEF";
	public static final String USERGROUP_HEAD_TEACHER = "HEAD_TEACHER";
	public static final String USERGROUP_TEACH_CHIEF = "TEACH_CHIEF";
	public static final String USERGROUP_TEACHER = "TEACHER";
	public static final String USERGROUP_FIN_CHIEF = "FIN_CHIEF";
	public static final String USERGROUP_CHARGE_STAFF = "CHARGE_STAFF";
	public static final String USERGROUP_BOOK_STAFF = "BOOK_STAFF";
	public static final String USERGROUP_HR_CHIEF = "HR_CHIEF";
	public static final String USERGROUP_HR_SALARY_CHIEF = "HR_SALARY_CHIEF";
	public static final String USERGROUP_MASTER = "MASTER";
    //rolegroup
    public static final String ROLEGROUP_STUDENT_USER="STUDENT_USER";//学生用户
	// myUser organ
	public static final int USERORGAN_MATTERS = 10;// 行政
	public static final int USERORGAN_FINANCE = 30;// 财务
	public static final int USERORGAN_CHARGE = 35;// 收费员
	public static final int USERORGAN_ENROLL = 40;// 招生咨询
	public static final int USERORGAN_GRADUATE = 50;// 就业
	public static final int USERORGAN_MASTER = 90;// 校长
	public static final int USERORGAN_TEACH = 100;// 教学（考试）
	public static final int USERORGAN_TEACHER_FULLTIME = 200;// 专职授课教师
	public static final int USERORGAN_TEACHER_PARTTIME = 260;// 外聘（兼职）授课教师
	public static final int USERORGAN_STUDENT = 300;
}
