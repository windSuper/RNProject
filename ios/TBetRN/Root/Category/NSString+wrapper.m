#import "NSString+wrapper.h"
#import <CommonCrypto/CommonDigest.h>

@implementation NSString (wrapper)

+ (Boolean) isEmptyOrNull:(NSString *)string {
    if (!string) {
        return YES;
    } else if ([string isEqual:[NSNull null]]) {
        return YES;
    } else {
        NSString *trimedString = [string stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
        if ([trimedString length] == 0) {
            return YES;
        } else {
            return NO;
        }
    }
}

+ (NSString *)replaceHttpsString:(NSString *)originString {
    
    NSString *newString = originString;

    if ([newString rangeOfString:@"https://"].location == NSNotFound && [newString rangeOfString:@"http://"].location != NSNotFound) {
        newString = [newString stringByReplacingOccurrencesOfString:@"http://" withString:@"https://"];
    }
    
    if ([newString rangeOfString:TEMPHost].location != NSNotFound) {
        newString = [newString stringByReplacingOccurrencesOfString:TEMPHost withString:CurrentHost];
    }

    return newString;
}

+ (NSString *)replaceImageUrlString:(NSString *)originString {
    
    NSString *newString = originString;
    
    if (![NSString isEmptyOrNull:originString]) {
        
        newString = [NSString stringWithFormat:@"%@", [originString stringByReplacingOccurrencesOfString:@"jpg" withString:@"png"]];
        
        newString = [self replaceHttpsString:newString];
    }

    return newString;
}

+ (NSString *)cutImageSizeWithOriginString:(NSString *)originString curSize:(NSString *)curSize {
    
    NSString *newString = originString;
    
    if (![NSString isEmptyOrNull:originString] && ![NSString isEmptyOrNull:curSize]) {
        
        newString = [NSString stringWithFormat:@"%@", [originString stringByReplacingOccurrencesOfString:@"size" withString:curSize]];
        
        newString = [self replaceHttpsString:newString];

    }
    
    return newString;
}

+ (NSString *)replaceWebviewUrlString:(NSString *)originString {
    
    NSString *newString = originString;

// 暂时web 用 后台返回什么是什么
    
    if ([newString rangeOfString:TEMPHost].location != NSNotFound) {
        newString = [newString stringByReplacingOccurrencesOfString:TEMPHost withString:CurrentHost];
    }
    
    return newString;
}


+ (NSString *) isEmptyError:(NSString *)string {
    
    if ([string isEqual:[NSNull null]] || string.length == 0) {
        return  k_requestErrorMessage;
    }
    
    return string;
}

- (Boolean) isEmptyOrNull {
    if (!self) {
        return YES;
    } else if ([self isEqual:[NSNull null]]) {
        return YES;
    } else {
        NSString *trimedString = [self stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];
        if ([trimedString length] == 0) {
            return YES;
        } else {
            return NO;
        }
    }
}

+ (BOOL)isBlankString:(NSString *)string
{
    if (string == nil || string == NULL)
    {
        return YES;
    }
    if ([string isKindOfClass:[NSNull class]])
    {
        return YES;
    }
    if ([[string stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]] length]==0)
    {
        return YES;
    }
    
    return NO;
}

+ (NSString *)limitStringNotEmpty:(NSString *)string {
    if (!string || [string isKindOfClass:[NSDictionary class]] || [string isKindOfClass:[NSArray class]]) {
        return @"";
    } else if ([string isEqual:[NSNull null]]) {
        return @"";
        
    }
    
    
    return [NSString stringWithFormat:@"%@",string];
}

- (NSString *) substringFromIndex:(int)begin endIndex:(int)end {
    if (end <= begin) {
        return @"";
    }
    NSRange range = NSMakeRange(begin, end - begin);
    return  [self substringWithRange:range];
}

- (NSMutableString *)replaceString:(NSString *)originString withString:(NSString *)purposeString {
    
    NSMutableString *photo = [NSMutableString stringWithFormat:@"%@",self];
    if ([photo rangeOfString:originString].location != NSNotFound) {
        [photo replaceOccurrencesOfString:originString withString:purposeString options:NSBackwardsSearch range:NSMakeRange(0,photo.length)];
    }
    return photo;
}
- (NSString *)trim {
    NSString *temp = [self stringByReplacingOccurrencesOfString:@" " withString:@""];
    NSMutableString *string = [temp mutableCopy];
    CFStringTrimWhitespace((CFMutableStringRef)string);
    NSString *result = [string copy];
    return result;
}


- (NSData *)hexToBytes {
    NSMutableData *data = [NSMutableData data];
    int idx;
    for (idx = 0; idx+2 <= self.length; idx+=2) {
        NSRange range = NSMakeRange(idx, 2);
        NSString *hexStr = [self substringWithRange:range];
        NSScanner *scanner = [NSScanner scannerWithString:hexStr];
        unsigned int intValue;
        [scanner scanHexInt:&intValue];
        [data appendBytes:&intValue length:1];
    }
    return data;
}

+ (NSString *)trimWhitespace:(NSString *)val {
    
    return [self trim:val trimCharacterSet:[NSCharacterSet whitespaceCharacterSet]]; //去掉前后空格
    
}

+ (NSString *)trim:(NSString *)val trimCharacterSet:(NSCharacterSet *)characterSet {
    NSString *returnVal = @"";
    if (val) {
        returnVal = [val stringByTrimmingCharactersInSet:characterSet];
    }
    return returnVal;
    
}

+ (NSString *)flattenHTML:(NSString *)html trimWhiteSpace:(BOOL)trim
{
    NSScanner *theScanner = [NSScanner scannerWithString:html];
    NSString *text = nil;
    while ([theScanner isAtEnd] == NO) {
        // find start of tag
        [theScanner scanUpToString:@"<" intoString:NULL] ;
        // find end of tag
        [theScanner scanUpToString:@">" intoString:&text] ;
        // replace the found tag with a space
        //(you can filter multi-spaces out later if you wish)
        html = [html stringByReplacingOccurrencesOfString:[NSString stringWithFormat:@"%@>", text] withString:@""];
    }
    html = [html stringByReplacingOccurrencesOfString:@"&nbsp;" withString:@" "];
    return trim ? [html stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]] : html;
}

+ (NSString *)createTimestamp
{
    NSDate *date = [NSDate dateWithTimeIntervalSinceNow:0];
    NSTimeInterval timeInterval = [date timeIntervalSince1970] * 1000;
    NSString *timestamp = [NSString stringWithFormat:@"%f", timeInterval];
    timestamp = [timestamp stringByReplacingOccurrencesOfString:@"." withString:@""];
    return timestamp;
}

+ (NSString *)createTimestampWithRnd:(int)number
{
    NSString *timestamp = [self createTimestamp];
    return timestamp;
}

- (NSString *)clearParams
{
    NSString *clearLeftParenthesis = [self stringByReplacingOccurrencesOfString:@"{" withString:@"%7B"];
    NSString *clearRightParenthesis = [clearLeftParenthesis stringByReplacingOccurrencesOfString:@"}" withString:@"%7D"];
    NSString *result = [clearRightParenthesis stringByReplacingOccurrencesOfString:@"\"" withString:@"%22"];
    return result;
}

+ (NSMutableDictionary *)queryIdentifier:(NSDictionary *)dic {
    
    NSMutableDictionary *paramDic = [NSMutableDictionary dictionary];
    
    if ([dic isKindOfClass:[NSDictionary class]]) {
        [paramDic addEntriesFromDictionary:dic];
    }
    return paramDic;
}

//一般参数拼接处理
+ (NSString *)queryStringFrom:(NSDictionary *)params
{
    NSMutableDictionary *paramDic = [NSString queryIdentifier:params];
    NSString *query = @"params={";
    for (id key in paramDic) {
        if ([[[paramDic objectForKey:key] class] isSubclassOfClass:[NSString class]]) {
            query = [query stringByAppendingFormat:@"%@:\"%@\"", key, [paramDic objectForKey:key]];

            query = [query stringByAppendingString:@","];
        }
        if ([[[paramDic objectForKey:key] class] isSubclassOfClass:[NSNumber class]]) {
            query = [query stringByAppendingFormat:@"%@:%@", key, [paramDic objectForKey:key]];
            query = [query stringByAppendingString:@","];
        }
    }
    query = [query substringToIndex:([query length] - 1)];
    if(paramDic.count){
        
        query = [query stringByAppendingString:@"}"];
    }
    query = [query clearParams];
    return query;
}


//用于下单 、下单于优惠劵、下单赠品 json
+ (NSString *)queryStringFromJson:(NSDictionary *)params
{
    NSMutableDictionary *paramDic = [NSString queryIdentifier:params];

    NSString *query = @"&params={";
    
    for (id key in paramDic) {
        if ([[[paramDic objectForKey:key] class] isSubclassOfClass:[NSString class]]) {
            if ([key isEqualToString:@""]) {
                query = [query stringByAppendingFormat:@"%@:%@", key, [paramDic objectForKey:key]];
                
            }else if ([key isEqualToString:@"goodsList"]) {
                query = [query stringByAppendingFormat:@"%@:%@", key, [paramDic objectForKey:key]];
            }
            else {
                query = [query stringByAppendingFormat:@"%@:\"%@\"", key, [paramDic objectForKey:key]];
            }
            query = [query stringByAppendingString:@","];
        }
        if ([[[paramDic objectForKey:key] class] isSubclassOfClass:[NSNumber class]]) {
            query = [query stringByAppendingFormat:@"%@:%@", key, [paramDic objectForKey:key]];
            query = [query stringByAppendingString:@","];
        }
    }
    query = [query substringToIndex:([query length] - 1)];
    query = [query stringByAppendingString:@"}"];
    query = [query clearParams];
    return query;
}

///*拼接字符串 [{ 'id':'ddd','count':12,'price':'50','orderType':'BUY'}]*/
//+ (NSString *)queryStringToJson:(NSDictionary *)dic {
//
//    NSString *query = @"";
//    for (id key in dic) {
//        if ([[[dic objectForKey:key] class] isSubclassOfClass:[NSString class]]) {
//            query = [query stringByAppendingFormat:@"%@:'%@\'", key, [dic objectForKey:key]];
//            query = [query stringByAppendingString:@","];
//        }
//        if ([[[dic objectForKey:key] class] isSubclassOfClass:[NSNumber class]]) {
//            query = [query stringByAppendingFormat:@"%@:%@", key, [dic objectForKey:key]];
//            query = [query stringByAppendingString:@","];
//        }
//    }
//    query = [query substringToIndex:([query length] - 1)];
//    return query;
//
//}

+ (NSString *)phonetic:(NSString*)sourceString {
    NSMutableString *source = [sourceString mutableCopy];
    CFStringTransform((__bridge CFMutableStringRef)source, NULL, kCFStringTransformMandarinLatin, NO);
    CFStringTransform((__bridge CFMutableStringRef)source, NULL, kCFStringTransformStripDiacritics, NO);
    return source;
}

+ (NSString *)phoneFormat:(NSString *)phone
{
    NSString *stringResult;
    NSString *MOBILE = @"^1(3[0-9]|5[0-35-9]|8[0-9]|7[678]|4[57])\\d{0,8}$";
    NSPredicate *regexMOBILE = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", MOBILE];
    NSString *TEL = @"^(0[1|2][0|1|2|3|5|7|8|9])\\d{0,8}$";
    NSPredicate *regexTEL = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", TEL];
    NSString *Tel = @"^(0[3-9][0-9][0-9])\\d{0,8}$";
    NSPredicate *regexTel = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",Tel];
    if (phone.length >= 8) {
        if (phone.length >= 9 && ([regexMOBILE evaluateWithObject:phone] == YES)) {
            stringResult = [phone substringWithRange:NSMakeRange(0, 3)];
            stringResult = [stringResult stringByAppendingString:@"-"];
            stringResult = [stringResult stringByAppendingString:[phone substringWithRange:NSMakeRange(3, 4)]];
            stringResult = [stringResult stringByAppendingString:@"-"];
            stringResult = [stringResult stringByAppendingString:[phone substringWithRange:NSMakeRange(7, phone.length - 7)]];
        } else if (phone.length >= 8 && ([regexTEL evaluateWithObject:phone] == YES)) {
            stringResult = [phone substringWithRange:NSMakeRange(0,3)];
            stringResult = [stringResult stringByAppendingString:@"-"];
            stringResult = [stringResult stringByAppendingString:[phone substringWithRange:NSMakeRange(3, phone.length - 3)]];
        } else if (phone.length >= 8 && ([regexTel evaluateWithObject:phone] == YES)) {
            stringResult = [phone substringWithRange:NSMakeRange(0, 4)];
            stringResult = [stringResult stringByAppendingString:@"-"];
            stringResult = [stringResult stringByAppendingString:[phone substringWithRange:NSMakeRange(4, phone.length - 4)]];
        } else {
            stringResult = phone;
        }
    } else {
        stringResult = phone;
    }
    return stringResult;
}

/*格式化电话号码 131****789 */
+ (NSString *)phoneHindeFourNumberFormat:(NSString *)phone {

    if (![phone isKindOfClass:[NSString class]]) {
        phone = @"";
    }
    
    if (phone.length >= 11) {
        NSMutableString *card = [NSMutableString stringWithString:phone];
        [card replaceCharactersInRange:NSMakeRange(3, 5) withString:@"****"];
        phone = [NSString stringWithFormat:@"%@",card];
        return phone;
    }
    return phone;
}

/*格式化电话号码 131****7899 */
+ (NSString *)phoneHindeFourNumberSecondFormat:(NSString *)phone {
    
    if (![phone isKindOfClass:[NSString class]]) {
        phone = @"";
    }
    
    if (phone.length >= 11) {
        NSMutableString *card = [NSMutableString stringWithString:phone];
        [card replaceCharactersInRange:NSMakeRange(3, 4) withString:@"****"];
        phone = [NSString stringWithFormat:@"%@",card];
        return phone;
    }
    return phone;
}


//投资金额格式
+(NSString *)moneyFormat:(NSString *)baseString
{
    
    NSArray *tempArr = [baseString componentsSeparatedByString:@"."];
    
    NSString *tempStr = [tempArr firstObject];
    
    int tempLength = (int)tempStr.length;
    int count = tempLength / 3;
    count = tempLength % 3 == 0 ? count : count + 1;
    
    NSMutableString * resultString = [[NSMutableString alloc] init];
    int strNumber = 0;
    
    if (tempStr.length < 4) {
        strNumber = (int)tempStr.length;
        [resultString appendString:[baseString substringToIndex:strNumber]];
        
        if ([resultString rangeOfString:@"."].location != NSNotFound) {
            [resultString appendString:@"."];
            NSString *Temp = [tempArr lastObject];
            if (Temp.length > 2) {
                [resultString appendString:[Temp substringToIndex:2]];
            } else {
                [resultString appendString:Temp];
            }
            
        }
        
    } else {
        for (int i = 0; i < count; i++) {
            
            if (i == 0) {
                if (tempLength % 3 != 0) {
                    strNumber = tempLength % 3;
                    [resultString appendString:[baseString substringToIndex:strNumber]];
                    [resultString appendString:@","];
                } else {
                    strNumber = 3;
                    [resultString appendString:[baseString substringToIndex:strNumber]];
                    [resultString appendString:@","];
                }
            } else if ( i != 0 && i != count - 1) {
                
                [resultString appendString:[baseString substringWithRange:NSMakeRange(strNumber, 3)]];
                [resultString appendString:@","];
                strNumber += 3 ;
            } else {
                if ([resultString rangeOfString:@"."].location != NSNotFound) {
                    [resultString appendString:[baseString substringWithRange:NSMakeRange(strNumber, 3)]];
                    [resultString appendString:@"."];
                    //[resultString appendString:[tempArr lastObject]];
                    NSString *Temp = [tempArr lastObject];
                    if (Temp.length > 2) {
                        [resultString appendString:[Temp substringToIndex:2]];
                    } else {
                        [resultString appendString:Temp];
                    }
                } else {
                    [resultString appendString:[baseString substringWithRange:NSMakeRange(strNumber, 3)]];
                }
            }
            
        }
        
    }
    
    return resultString;
}

+ (BOOL)isPhone:(NSString *)phone
{
    
    // 17[678]  17[0-9]这可以是虚拟号
    NSString *reg = @"^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$";
    NSPredicate *predicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",reg];
    if ([predicate evaluateWithObject:phone]) {
        return YES;
    }
    return NO;
}

+ (BOOL)isEmail:(NSString *)email{
    
    
    NSString *reg = @"^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z])+";
    NSPredicate *predicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",reg];
    if ([predicate evaluateWithObject:email]) {
        return YES;
    }
    return NO;
}

+ (BOOL)isTel:(NSString *)tel
{
    NSString *reg = @"^(0[3-9][0-9][0-9]|0[1|2][0|1|2|3|5|7|8|9]|[3-9][0-9][0-9])\\d{7,8}$";
    NSPredicate *predicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", reg];
    if ([predicate evaluateWithObject:tel]) {
        return YES;
    }
    
    reg = @"^(0[3-9][0-9][0-9]|0[1|2][0|1|2|3|5|7|8|9]|[3-9][0-9][0-9])\\d{3}$";
    predicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",reg];
    if ([predicate evaluateWithObject:tel]) {
        return YES;
    }
    
    reg = @"^(0[3-9][0-9][0-9]|0[1|2][0|1|2|3|5|7|8|9]|[3-9][0-9][0-9])([-])\\d{7,8}$";
    predicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",reg];
    if ([predicate evaluateWithObject:tel]) {
        return YES;
    }
    
    reg = @"^(0[3-9][0-9][0-9]|0[1|2][0|1|2|3|5|7|8|9]|[3-9][0-9][0-9])([-])\\d{3}$";
    predicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@",reg];
    if ([predicate evaluateWithObject:tel]) {
        return YES;
    }
    
    return NO;
}

+ (BOOL)isNumber:(NSString *)number
{
    NSString *regex = @"^[0-9]*$";
    NSPredicate *predicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", regex];
    if ([predicate evaluateWithObject:number]) {
        return YES;
    }
    return NO;
}


+ (BOOL)isBankCardNumber:(NSString*)cardNo{
    int oddsum = 0;     //奇数求和
    int evensum = 0;    //偶数求和
    int allsum = 0;
    int cardNoLength = (int)[cardNo length];
    int lastNum = [[cardNo substringFromIndex:cardNoLength-1] intValue];
    
    cardNo = [cardNo substringToIndex:cardNoLength - 1];
    for (int i = cardNoLength -1 ; i>=1;i--) {
        NSString *tmpString = [cardNo substringWithRange:NSMakeRange(i-1, 1)];
        int tmpVal = [tmpString intValue];
        if (cardNoLength % 2 ==1 ) {
            if((i % 2) == 0){
                tmpVal *= 2;
                if(tmpVal>=10)
                    tmpVal -= 9;
                evensum += tmpVal;
            }else{
                oddsum += tmpVal;
            }
        }else{
            if((i % 2) == 1){
                tmpVal *= 2;
                if(tmpVal>=10)
                    tmpVal -= 9;
                evensum += tmpVal;
            }else{
                oddsum += tmpVal;
            }
        }
    }
    
    allsum = oddsum + evensum;
    allsum += lastNum;
    if((allsum % 10) == 0)
        return YES;
    else
        return NO;
}

+ (BOOL)isPureInt:(NSString*)string
{
    NSScanner* scan = [NSScanner scannerWithString:string];
    int val;
    return[scan scanInt:&val] && [scan isAtEnd];
}

+ (NSDate *)convertDateFromString:(NSString *)date
{
    //    NSTimeZone *timezone = [NSTimeZone timeZoneWithAbbreviation:@"UTC"];
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init] ;
    [formatter setDateFormat:@"YYYY-MM-dd HH:mm:ss"];
    //    [formatter setTimeZone:timezone];
    return [formatter dateFromString:date];
}


+ (NSString *)uuid {
    CFUUIDRef puuid = CFUUIDCreate(nil);
    CFStringRef uuidString = CFUUIDCreateString(nil, puuid);
    NSString * result = (NSString *)CFBridgingRelease(CFStringCreateCopy( NULL, uuidString));
    CFRelease(puuid);
    CFRelease(uuidString);
    return result;
}


+ (NSMutableAttributedString *)attributeString:(NSString *)string colorString:(NSString *)colorString withColor:(UIColor *)color{
    
    if (!string || !colorString) {
        return nil;
    }
    NSMutableAttributedString *str = [[NSMutableAttributedString alloc] initWithString:string];
    NSRange linkRange = [string rangeOfString:colorString];
    if (linkRange.location != NSNotFound) {
        
        [str addAttribute:NSForegroundColorAttributeName value:color range:linkRange];
    }
    
    return str;
}

+ (NSMutableAttributedString *)attributeString:(NSString *)string colorString1:(NSString *)colorStr1 colorString2:(NSString *)colorStr2 color1:(UIColor *)color1 color2:(UIColor *)color2 {
    
    if (!string || !colorStr1 || !colorStr2)
    {
        return nil;
    }
    
    NSMutableAttributedString *str = [[NSMutableAttributedString alloc] initWithString:string];
    NSRange linkRange1 = [string rangeOfString:colorStr1];
    NSRange linkRange2 = [string rangeOfString:colorStr2];

    if (linkRange1.location != NSNotFound)
    {
        [str addAttribute:NSForegroundColorAttributeName value:color1 range:linkRange1];
    }
    if (linkRange2.location != NSNotFound)
    {
        [str addAttribute:NSForegroundColorAttributeName value:color2 range:linkRange2];
    }
    
    return str;
}

+ (NSMutableAttributedString *)attributeString:(NSString *)string colorString1:(NSString *)colorStr1 colorString2:(NSString *)colorStr2 colorString3:(NSString *)colorStr3 withColor:(UIColor *)color
{
    if (!string || !colorStr1 || !colorStr2 || !colorStr3)
    {
        return nil;
    }
    NSMutableAttributedString *str = [[NSMutableAttributedString alloc] initWithString:string];
    NSRange linkRange1 = [string rangeOfString:colorStr1];
    NSRange linkRange2 = [string rangeOfString:colorStr2];
    NSRange linkRange3 = [string rangeOfString:colorStr3];
    
    if (linkRange1.location != NSNotFound)
    {
        [str addAttribute:NSForegroundColorAttributeName value:color range:linkRange1];
    }
    if (linkRange2.location != NSNotFound)
    {
        [str addAttribute:NSForegroundColorAttributeName value:color range:linkRange2];
    }
    if (linkRange3.location != NSNotFound)
    {
        [str addAttribute:NSForegroundColorAttributeName value:color range:linkRange3];
    }
    
    return str;
}

+ (NSMutableAttributedString *)attributeString:(NSString *)string colorString1:(NSString *)colorStr1 colorString2:(NSString *)colorStr2 colorString3:(NSString *)colorStr3 colorString4:(NSString *)colorStr4 withColor:(UIColor *)color
{
    if (!string || !colorStr1 || !colorStr2 || !colorStr3 || !colorStr4)
    {
        return nil;
    }
    NSMutableAttributedString *str = [[NSMutableAttributedString alloc] initWithString:string];
    NSRange linkRange1 = [string rangeOfString:colorStr1];
    NSRange linkRange2 = [string rangeOfString:colorStr2];
    NSRange linkRange3 = [string rangeOfString:colorStr3];
    NSRange linkRange4 = [string rangeOfString:colorStr4];
    
    if (linkRange1.location != NSNotFound)
    {
        [str addAttribute:NSForegroundColorAttributeName value:color range:linkRange1];
    }
    if (linkRange2.location != NSNotFound)
    {
        [str addAttribute:NSForegroundColorAttributeName value:color range:linkRange2];
    }
    if (linkRange3.location != NSNotFound)
    {
        [str addAttribute:NSForegroundColorAttributeName value:color range:linkRange3];
    }
    if (linkRange4.location != NSNotFound)
    {
        [str addAttribute:NSForegroundColorAttributeName value:color range:linkRange4];
    }
    
    return str;
}

+ (NSString *)intervalSinceNow: (NSString *) theDate WithServerTime:(NSString *)serverTime Type:(NSInteger)type
{
    NSString *timeString=@"";
    
    if (type == 4) {
        double leftSec = [theDate floatValue];
        
        NSString *day = [NSString stringWithFormat:@"%f",leftSec/3600/24];
        day = [day substringToIndex:day.length - 7];
        
        double h = (leftSec - [day doubleValue]*3600*24)/3600;
        NSString *hour = [NSString stringWithFormat:@"%f",h];
        hour = [hour substringToIndex:hour.length - 7];
        
        double min = (leftSec - ([day doubleValue]*3600*24 + [hour doubleValue]*3600))/60;
        NSString *minute = [NSString stringWithFormat:@"%f",min];
        minute = [minute substringToIndex:minute.length - 7];
        
        double sec = leftSec - (([day doubleValue]*3600*24 + [hour doubleValue]*3600) + [minute doubleValue]*60);
        NSString *second = [NSString stringWithFormat:@"%f",sec];
        second = [second substringToIndex:second.length - 7];
        
        timeString = [NSString stringWithFormat:@"%@,%@,%@,%@",day,hour,minute,second];
        
    } else if (type == 5) {
        
        double leftSec = [theDate floatValue];
        
        NSString *hour = [NSString stringWithFormat:@"%f",leftSec/3600];
        hour = [hour substringToIndex:hour.length - 7];
        
        double min = (leftSec - [hour doubleValue]*3600)/60;
        NSString *minute = [NSString stringWithFormat:@"%f",min];
        minute = [minute substringToIndex:minute.length - 7];
        
        double sec = leftSec - ([hour doubleValue]*3600 + [minute doubleValue]*60);
        NSString *second = [NSString stringWithFormat:@"%f",sec];
        second = [second substringToIndex:second.length - 7];
        
        timeString = [NSString stringWithFormat:@"%@,%@,%@",hour,minute,second];
        
        
    } else{
        NSDateFormatter *date=[[NSDateFormatter alloc] init];
        [date setDateFormat:@"yyyy-MM-dd HH:mm:ss"];
        NSDate *d=[date dateFromString:theDate];
        NSTimeInterval late=[d timeIntervalSince1970]*1;
        
        NSDate* dat = [date dateFromString:serverTime];
        NSTimeInterval now=[dat timeIntervalSince1970]*1;
        NSTimeInterval cha=late-now;
        
        
        if (type == 1)
        {
            NSString *hour = [NSString stringWithFormat:@"%f",cha/3600];
            hour = [hour substringToIndex:hour.length - 7];
            //    NSLog(@"HOUR----------------------%@",hour);
            
            
            NSString *minute = [NSString stringWithFormat:@"%f",(cha - [hour doubleValue] * 3600)/60];
            minute = [minute substringToIndex:minute.length - 7];
            //    NSLog(@"MINUTE----------------------%@",minute);
            
            double min = ((cha - [hour doubleValue] * 3600)/60 - [minute doubleValue])*60;
            NSString *second = [NSString stringWithFormat:@"%f",min];
            second = [second substringToIndex:second.length - 7];
            //    NSLog(@"SECOND----------------------%@",second);
            
            timeString = [NSString stringWithFormat:@"%@,%@,%@",hour,minute,second];
        }
        else if (type == 2)
        {
            NSString *minute = [NSString stringWithFormat:@"%f",cha/60];
            minute = [minute substringToIndex:minute.length - 7];
            
            NSString *second = [NSString stringWithFormat:@"%f",cha - [minute doubleValue]*60];
            second = [second substringToIndex:second.length - 7];
            
            timeString = [NSString stringWithFormat:@"%@,%@",minute,second];
        }
        else if (type == 3)
        {
            if (cha <= 0)
            {
                timeString = @"";
            }else
            {
                timeString = @"没卖完！";
            }
        }
    }
    return timeString;

}

+ (NSString *)intervalBonusMessageTimeWithDate:(NSString *)messageDate {
    
    NSDateFormatter *date=[[NSDateFormatter alloc] init];
    [date setDateFormat:@"yyyy-MM-dd HH:mm"];
    NSDate *d=[date dateFromString:messageDate];
    NSTimeInterval late=[d timeIntervalSince1970]*1;
    
    NSDate* dat = [NSDate dateWithTimeIntervalSinceNow:0];
    NSTimeInterval now=[dat timeIntervalSince1970]*1;
    NSTimeInterval cha = now - late;
    
    
    NSString *messageStr;
    if (cha >= 48*3600) {
        /** 大于48小时*/
        messageStr = messageDate;
    } else if (cha >= 24*3600) {
        /** 大于24小时*/
        messageStr = [NSString stringWithFormat:@"昨天 %@",[messageDate substringFromIndex:messageDate.length-5]];
    } else {
        messageStr = [NSString stringWithFormat:@"%@",[messageDate substringFromIndex:messageDate.length-5]];
    }
    
    return messageStr;
}

+ (NSString *)intervalYMDSinceNow: (NSString *) theDate addOneDayTime:(NSInteger )addDayTimes
{
    NSDateFormatter *date=[[NSDateFormatter alloc] init];
    [date setDateFormat:@"yyyy.MM.dd"];
    NSDate *d=[date dateFromString:theDate];
    NSTimeInterval late=[d timeIntervalSince1970]*1;
    
    NSDate* dat = [NSDate dateWithTimeIntervalSinceNow:0];
    NSTimeInterval now=[dat timeIntervalSince1970]*1;
    if (addDayTimes > 0) {
        now -= addDayTimes * 86400;
    }
    NSString *timeString=@"";
    NSTimeInterval cha=late-now;
    
    if (cha <= 0) {
        return @"结束";
    }
    
    //    发表在一小时之内
    if (cha/3600<1) {
        if (cha/60<1) {
            timeString = @"1";
        }
        else
        {
            timeString = [NSString stringWithFormat:@"%f", cha/60];
            timeString = [timeString substringToIndex:timeString.length-7];
        }
        
        timeString=[NSString stringWithFormat:@"%@分钟", timeString];
    }
    //    在一小时以上24小以内
    else if (cha/3600>1&&cha/86400<1) {
        timeString = [NSString stringWithFormat:@"%f", cha/3600];
        timeString = [timeString substringToIndex:timeString.length-7];
        
        NSTimeInterval tempT = cha - [timeString doubleValue] * 3600;
        NSString *temStr;
        timeString=[NSString stringWithFormat:@"%@小时", timeString];
        
        if (tempT/3600<1) {
            temStr = [NSString stringWithFormat:@"%f", tempT/60];
            temStr = [temStr substringToIndex:temStr.length-7];
            temStr=[NSString stringWithFormat:@"%@分钟", temStr];
            
            timeString = [NSString stringWithFormat:@"%@ %@",timeString,temStr];
        }
    }
    //    发表在24以上
    else if (cha/86400>1)
    {
        timeString = [NSString stringWithFormat:@"%f", cha/86400];
        timeString = [timeString substringToIndex:timeString.length-7];
        
        NSTimeInterval tempT = cha - [timeString doubleValue] * 86400;
        NSString *temStr;
        timeString=[NSString stringWithFormat:@"%@天", timeString];
        
        
        if (tempT/3600>1&&tempT/86400<1) {
            temStr = [NSString stringWithFormat:@"%f", tempT/3600];
            temStr = [temStr substringToIndex:temStr.length-7];
            temStr=[NSString stringWithFormat:@"%@小时", temStr];
            
            timeString = [NSString stringWithFormat:@"%@ %@",timeString,temStr];
        }
        
        
    }
    //    //    发表时间大于10天
    //    else
    //    {
    //        //        timeString = [NSString stringWithFormat:@"%d-%"]
    //        NSArray *array = [theDate componentsSeparatedByString:@" "];
    //        //        return [array objectAtIndex:0];
    //        timeString = [array objectAtIndex:0];
    //    }
    return timeString;
}


+ (NSString *)dateFormatYYYY_MM_DDOrMM_DD:(NSString *)dateFormat withSoureDateString:(NSString *)theDate linkStrYear:(NSString *)year linkStrMonth:(NSString *)month linkStrDay:(NSString *)day {
    if (!year) {
        year = @"年";;
    }
    if (!month) {
        month = @"月";
    }
    if (!day) {
        day = @"日";
    }
    NSMutableString *date = [NSMutableString stringWithFormat:@"%@",theDate];
    if (date.length >= 10) {
        [date replaceCharactersInRange:NSMakeRange(4, 1) withString:year];
        [date replaceCharactersInRange:NSMakeRange(7, 1) withString:month];
        [date appendString:day];
        
        if ([dateFormat isEqualToString:@"mm-dd"]) {
            return [date substringWithRange:NSMakeRange(5, 6)];
        }
        else if ([dateFormat isEqualToString:@"yyyy-mm-dd"]) {
            
        }
    }
    
    return date;
}

+ (NSString *)intervalTime:(NSString *)theDate WithAheadSeconds:(NSInteger)seconds
{
    NSString *newTime = @"";
    
    //    NSTimeZone *timezone = [NSTimeZone timeZoneWithAbbreviation:@"UTC"];
    NSDateFormatter *date=[[NSDateFormatter alloc] init];
    [date setDateFormat:@"YYYY-MM-dd HH:mm:ss"];
    //    [date setTimeZone:timezone];
    NSDate *d=[date dateFromString:theDate];
    NSTimeInterval actInterval=[d timeIntervalSince1970]*1;
    
    NSTimeInterval newInterval = actInterval - seconds;
    
    newTime = [date stringFromDate:[NSDate dateWithTimeIntervalSince1970:newInterval]];
    
    return newTime;
}



/*时间 分钟转天数*/
+ (NSString *)intervalToDateTime:(NSString *)minute {
    if (minute.length > 0) {
        
        NSString *timeString=@"";
        
        int min = [minute intValue];
        
        if (min / 1440) {
            timeString = [NSString stringWithFormat:@"%i天",min / 1440];
        }
        
        if ((min % 1440) / 60) {
            timeString = [NSString stringWithFormat:@"%@%d小时",timeString,(min % 1440) / 60];
        }
        
        if (min % 60) {
            timeString = [NSString stringWithFormat:@"%@%d分钟",timeString,min % 60];
        }
        
        return timeString;
        
    }
    
    return @"0";
}


//32位MD5加密方式
//+ (NSString *)getMd5_32Bit_String:(NSString *)srcString{
//    const char *cStr = [srcString UTF8String];
//    unsigned char digest[CC_MD5_DIGEST_LENGTH];
//    CC_MD5( cStr, strlen(cStr), digest );
//    NSMutableString *result = [NSMutableString stringWithCapacity:CC_MD5_DIGEST_LENGTH * 2];
//    for(int i = 0; i < CC_MD5_DIGEST_LENGTH; i++)
//        [result appendFormat:@"%02x", digest[i]];
//    
//    return result;
//}

+ (NSString *)dataWithJSONObject:(NSMutableArray *)dataList{
    
    NSError *error = nil;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dataList options:NSJSONWritingPrettyPrinted error:&error];
    
    if ([jsonData length] > 0 && error == nil) {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        
        NSString *jsonString2 = [jsonString stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
        
        return jsonString2;
    }
    
    return @"";
}

// 字符串转字典
+(NSDictionary *)parseJSONStringToNSDictionary:(NSString *)JSONString {
    NSData *JSONData = [JSONString dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *responseJSON = [NSJSONSerialization JSONObjectWithData:JSONData options:NSJSONReadingMutableContainers error:nil];
    return responseJSON;
}

// 字典装json字符串
+(NSString *)parseNSDictionaryToJSONString:(NSDictionary *)dic {
    
    NSError *error;
    
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dic options:NSJSONWritingPrettyPrinted error:&error];
    
    NSString *jsonString;
    
    if (!jsonData) {
        
        NSLog(@"%@",error);
        
    }else{
        
        jsonString = [[NSString alloc]initWithData:jsonData encoding:NSUTF8StringEncoding];
        
    }
    
    NSMutableString *mutStr = [NSMutableString stringWithString:jsonString];
    
    NSRange range = {0,jsonString.length};
    
    //去掉字符串中的空格
    
    [mutStr replaceOccurrencesOfString:@" " withString:@"" options:NSLiteralSearch range:range];
    
    NSRange range2 = {0,mutStr.length};
    
    //去掉字符串中的换行符
    
    [mutStr replaceOccurrencesOfString:@"\n" withString:@"" options:NSLiteralSearch range:range2];
    
    return mutStr;
}


+ (CGSize )sizeCalculateFontSize:(CGFloat )fontSize string:(NSString *)string conditionSize:(CGSize)conditionSize {
    
    NSDictionary *dic = @{NSFontAttributeName : [UIFont systemFontOfSize:fontSize]};
    CGSize size = [string boundingRectWithSize:conditionSize options:NSStringDrawingTruncatesLastVisibleLine | NSStringDrawingUsesLineFragmentOrigin | NSStringDrawingUsesFontLeading attributes:dic context:nil].size;
    return size;
}


+ (NSString *)convertEnumTypeToString:(NSInteger)enumType {
    
    return [NSString stringWithFormat:@"%ld",(long)enumType];
}



@end
