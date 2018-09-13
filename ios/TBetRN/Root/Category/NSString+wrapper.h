#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
@interface NSString (wrapper)

+ (Boolean)isEmptyOrNull:(NSString *)string;

+ (NSString *) isEmptyError:(NSString *)string;

- (Boolean)isEmptyOrNull;

+ (NSString *)replaceImageUrlString:(NSString *)originString;

//裁剪图片
+ (NSString *)cutImageSizeWithOriginString:(NSString *)originString curSize:(NSString *)curSize;

+ (NSString *)replaceWebviewUrlString:(NSString *)originString;

+ (BOOL) isBlankString:(NSString *)string;

- (NSString *)substringFromIndex:(int)begin endIndex:(int)end;

- (NSMutableString *)replaceString:(NSString *)originString withString:(NSString *)purposeString;

- (NSString *)trim;

- (NSData*)hexToBytes;

/*去掉前后空格*/
+ (NSString *)trimWhitespace:(NSString *)val;

+ (NSString *)limitStringNotEmpty:(NSString *)string;

/*去除HTML 标签*/
+ (NSString *)flattenHTML:(NSString *)html trimWhiteSpace:(BOOL)trim;

/*获取当前时间戳*/
+ (NSString *)createTimestamp;

/*获取当前时间戳 , 末尾添加x位随机数*/
+ (NSString *)createTimestampWithRnd:(int)number;

/*特殊字符转意 : 参数*/
- (NSString *)clearParams;

+ (NSMutableDictionary *)queryIdentifier:(NSDictionary *)dic;

/*拼接字符串*/
+ (NSString *)queryStringFrom:(NSDictionary *)dic;
//+ (NSString *)queryParamsFrom:(NSDictionary *)dic;

//用于下单json
+ (NSString *)queryStringFromJson:(NSDictionary *)dic;

/*汉字转拼音*/
+ (NSString *)phonetic:(NSString *)sourceString;

/*格式化电话号码*/
+ (NSString *)phoneFormat:(NSString *)phone;

/*格式化电话号码 131****789 */
+ (NSString *)phoneHindeFourNumberFormat:(NSString *)phone;

/*格式化电话号码 131****7899 */
+ (NSString *)phoneHindeFourNumberSecondFormat:(NSString *)phone;

//格式化金额字符串
+(NSString *)moneyFormat:(NSString *)baseString;

/*是否手机号码*/
+ (BOOL)isPhone:(NSString *)phone;

/*是否电子邮箱*/
+ (BOOL)isEmail:(NSString *)email;

/*验证是否是正整数数字*/
+ (BOOL)isNumber:(NSString *)number;

/*是否座机号码*/
+ (BOOL)isTel:(NSString *)tel;

/*银行卡号是否正确*/
+ (BOOL)isBankCardNumber:(NSString*)cardNo;


+ (NSDate *)convertDateFromString:(NSString *)date;

+ (BOOL)isPureInt:(NSString*)string;

+ (NSString *)uuid;

/*部分字符设置颜色*/
+ (NSMutableAttributedString *)attributeString:(NSString *)string colorString:(NSString *)colorString withColor:(UIColor *)color;
+ (NSMutableAttributedString *)attributeString:(NSString *)string colorString1:(NSString *)colorStr1 colorString2:(NSString *)colorStr2 color1:(UIColor *)colorStr3 color2:(UIColor *)color;

+ (NSMutableAttributedString *)attributeString:(NSString *)string colorString1:(NSString *)colorStr1 colorString2:(NSString *)colorStr2 colorString3:(NSString *)colorStr3 withColor:(UIColor *)color;
+ (NSMutableAttributedString *)attributeString:(NSString *)string colorString1:(NSString *)colorStr1 colorString2:(NSString *)colorStr2 colorString3:(NSString *)colorStr3 colorString4:(NSString *)colorStr4 withColor:(UIColor *)color;

/*时间间隔*/
+ (NSString *)intervalSinceNow: (NSString *) theDate WithServerTime: (NSString *)serverTime Type:(NSInteger) type;

/*时间间隔 到某天过完*/
+ (NSString *)intervalYMDSinceNow: (NSString *) theDate addOneDayTime:(NSInteger )addDayTimes;

/** 消息时间转化*/
+ (NSString *)intervalBonusMessageTimeWithDate:(NSString *)messageDate;

/*时间 某时间的前段时间*/
+ (NSString *)intervalTime:(NSString *)theDate WithAheadSeconds:(NSInteger)seconds;

/* 日期格式转换
 * theDate:yyyy-mm-dd
 * dateFormat:默认(yyyy-mm-dd -> yyyy年mm月dd日) (mm-dd -> mm月dd日)
 */
+ (NSString *)dateFormatYYYY_MM_DDOrMM_DD:(NSString *)dateFormat withSoureDateString:(NSString *)theDate linkStrYear:(NSString *)year linkStrMonth:(NSString *)month linkStrDay:(NSString *)day;

/*时间 分钟转天数*/
+ (NSString *)intervalToDateTime:(NSString *)minute;

//32位MD5加密方式
//+ (NSString *)getMd5_32Bit_String:(NSString *)srcString;

//数组转jsonStr
+ (NSString *)dataWithJSONObject:(NSMutableArray *)goodsList;

/** 字符串转字典*/
+(NSDictionary *)parseJSONStringToNSDictionary:(NSString *)JSONString;

// 字典装json字符串
+(NSString *)parseNSDictionaryToJSONString:(NSDictionary *)dic;

/*内容 计算 大小*/
+ (CGSize )sizeCalculateFontSize:(CGFloat )fontSize string:(NSString *)string conditionSize:(CGSize)conditionSize;

+ (NSString *)convertEnumTypeToString:(NSInteger)enumType;

@end
