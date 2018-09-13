//
//  FunctionExt.m
//  tbetplatform
//
//  Created by Ric on 12/4/2017.
//  Copyright © 2017 Ric. All rights reserved.
//

#import "FunctionExt.h"

@implementation FunctionExt

+ (NSString *)lessSecondToDay:(NSUInteger)seconds
{
    NSUInteger day = (NSUInteger)(seconds/(24*3600));
    NSUInteger hour = (NSUInteger)(seconds%(24*3600))/3600;
    NSUInteger min  = (NSUInteger)(seconds%(3600))/60;
    NSUInteger second = (NSUInteger)(seconds%60);
    NSString *time;
    if (day) {
        
        time = [NSString stringWithFormat:@"剩余%lu天",(unsigned long)day];
        
    }else{
        
        if (hour) {
            
            time = [NSString stringWithFormat:@"剩余%lu时%lu分%lu秒",(unsigned long)hour,(unsigned long)min,(unsigned long)second];
        }else{
            
            if (min) {
                
                time = [NSString stringWithFormat:@"剩余%lu分%lu秒",(unsigned long)min,(unsigned long)second];
            }else
            {
                if (second) {
                    
                    time = [NSString stringWithFormat:@"剩余%lu秒",(unsigned long)second];
                }else{
                    
                    time = @"";
                }
            }
        }
    }
    return time;
    
}

+(NSMutableArray *)CellHeightCalculateWithModelArr:(NSArray *)arr ModelKey:(NSString *)key LBWidth:(CGFloat)lbWidth LBFontSize:(CGFloat)lbFontSize
{
    NSMutableArray *cellHeightArr = [NSMutableArray array];
    for (NSDictionary *dic in arr) {
        
        NSString *text = dic[key];
        CGSize textSize = [FunctionExt calcuLateTextHeight:text LBWidth:lbWidth LBFontSize:lbFontSize];
        float height = textSize.height;
        NSNumber *h = [NSNumber numberWithFloat:height];
        [cellHeightArr  addObject:h];
        
    }
    return cellHeightArr;
}

+(CGSize)calcuLateTextHeight:(NSString *)string LBWidth:(CGFloat)lbWidth LBFontSize:(CGFloat)lbFontSize
{
    CGSize textSize = [string boundingRectWithSize:CGSizeMake(lbWidth, MAXFLOAT) options:NSStringDrawingUsesLineFragmentOrigin|NSStringDrawingUsesFontLeading|NSStringDrawingTruncatesLastVisibleLine attributes:@{NSFontAttributeName:[UIFont systemFontOfSize:lbFontSize]} context:nil].size;
    return textSize;
}

+(CGSize)calcuLateAttributedStringHeight:(NSAttributedString *)string LBWidth:(CGFloat)lbWidth LBFontSize:(CGFloat)lbFontSize
{
    CGSize textSize = [string boundingRectWithSize:CGSizeMake(lbWidth, MAXFLOAT) options:NSStringDrawingUsesLineFragmentOrigin  context:nil].size;
    
    return textSize;
}

+(UIImage*)stretchImageWithImageName:(NSString *)imgName leftCapWith:(NSInteger)left rightCapWidth:(NSInteger)right
{
    UIImage *img = [UIImage imageNamed:imgName];
    img = [img stretchableImageWithLeftCapWidth:left topCapHeight:right];
    return img;
}

+(NSAttributedString *)changeStringColorWithString:(NSString *)str Range:(NSRange)range Color:(UIColor *)color
{
    NSMutableAttributedString *attStr = [[NSMutableAttributedString alloc]initWithString:str];
    [attStr addAttributes:@{NSForegroundColorAttributeName:[UIColor whiteColor]}
                    range:NSMakeRange(0, str.length)];
    [attStr addAttributes:@{NSForegroundColorAttributeName:color}
                    range:range];
    return attStr;
}


+(UIControl *)creatBackTopBtn
{
    //返回顶部
    
    CGFloat totalHeight = 50;
    
    UIControl * backView = [[UIControl alloc] initWithFrame:CGRectMake(k_SCREEN_WIDTH - 60, k_SCREEN_HEIGHT - totalHeight-49-40, 50, totalHeight)];
    backView.backgroundColor = [UIColor clearColor];
    backView.layer.cornerRadius = 25.0;
    backView.layer.masksToBounds = YES;
    backView.layer.borderWidth = 0.5;
    backView.layer.borderColor = [UIColor colorWithRed:207.0 / 255.0 green:185.0 / 255.0 blue:153.0 / 255.0 alpha:1].CGColor;
    
    UIImageView *imageView = [[UIImageView alloc] initWithFrame:CGRectMake(0, 0, 50, 50)];
    imageView.image = [UIImage imageNamed:@"icon_top"];
    [backView addSubview:imageView];
    
    return backView;
}


+(UIView *)showPlaceholderViewWithNoDataMessage:(NSString *)message{
    
    UIView *bgView = [[UIView alloc] initWithFrame:CGRectMake(0, 64, k_SCREEN_WIDTH, k_SCREEN_HEIGHT - 64)];
    
    UIImageView *imgView = [[UIImageView alloc] initWithFrame:CGRectMake((k_SCREEN_WIDTH - 68) / 2.0, (k_SCREEN_HEIGHT-64-120)/2 - 60, 68, 68)];
    imgView.image = [UIImage imageNamed:@""];
    [bgView addSubview:imgView];
    
    UILabel *mesageLab = [[UILabel alloc] initWithFrame:CGRectMake((k_SCREEN_WIDTH - 150)/2.0, imgView.frame.origin.y + 80, 150, 30)];
    mesageLab.text = message;
    mesageLab.font = [UIFont systemFontOfSize:15];
    mesageLab.textColor = [UIColor lightGrayColor];
    mesageLab.textAlignment = NSTextAlignmentCenter;
    [bgView addSubview:mesageLab];
    
    return bgView;
    
}

//获得当前的时间戳
+ (NSString *)getCurrentDateString
{
    NSTimeZone *zone = [NSTimeZone systemTimeZone];
    NSTimeInterval delta = [zone secondsFromGMTForDate:[NSDate date]];
    NSString *string = [NSString stringWithFormat:@"%f",[[NSDate date] timeIntervalSince1970] + delta];
    NSString *dateString = [[string componentsSeparatedByString:@"."]objectAtIndex:0];
    return dateString;
}


/**
 *  判断字符是否带有emoji
 */

+ (BOOL)stringContainsEmoji:(NSString *)string
{
    __block BOOL returnValue = NO;
    
    [string enumerateSubstringsInRange:NSMakeRange(0, [string length])
                               options:NSStringEnumerationByComposedCharacterSequences
                            usingBlock:^(NSString *substring, NSRange substringRange, NSRange enclosingRange, BOOL *stop) {
                                const unichar hs = [substring characterAtIndex:0];
                                if (0xd800 <= hs && hs <= 0xdbff) {
                                    if (substring.length > 1) {
                                        const unichar ls = [substring characterAtIndex:1];
                                        const int uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                                        if (0x1d000 <= uc && uc <= 0x1f77f) {
                                            returnValue = YES;
                                        }
                                    }
                                } else if (substring.length > 1) {
                                    const unichar ls = [substring characterAtIndex:1];
                                    if (ls == 0x20e3) {
                                        returnValue = YES;
                                    }
                                } else {
                                    if (0x2100 <= hs && hs <= 0x27ff) {
                                        returnValue = YES;
                                    } else if (0x2B05 <= hs && hs <= 0x2b07) {
                                        returnValue = YES;
                                    } else if (0x2934 <= hs && hs <= 0x2935) {
                                        returnValue = YES;
                                    } else if (0x3297 <= hs && hs <= 0x3299) {
                                        returnValue = YES;
                                    } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b || hs == 0x2b50) {
                                        returnValue = YES;
                                    }
                                }
                            }];
    
    return returnValue;
}


+ (UIView *)CreatSeparotorLineWithRect:(CGRect)rect
{
    UIView *line  = [[UIView alloc]initWithFrame:rect];
    line.backgroundColor = [UIColor lightGrayColor];
    return line;
}


/**
 *  创建消息列表无消息提示视图
 *
 */
+ (UIView *)creatNoMessageViewWithTitle:(NSString *)title{
    
    UIView *view = [[UIView alloc]initWithFrame:CGRectMake(0, 64, k_SCREEN_WIDTH, k_SCREEN_HEIGHT-64)];
    
    CGFloat y = k_SCREEN_HEIGHT>568?100:60;;
    UIImageView *imageView = [[UIImageView alloc]initWithFrame:CGRectMake((k_SCREEN_WIDTH-303)/2, y, 303, 180)];
    imageView.image = [UIImage imageNamed:@"friend_nodata"];
    [view addSubview:imageView];
    
    UILabel *lb = [[UILabel alloc]initWithFrame:CGRectMake(15, imageView.bottom+40, k_SCREEN_WIDTH-30, 20)];
    lb.font = [UIFont systemFontOfSize:15];
    lb.textColor = [UIColor whiteColor];
    lb.textAlignment = NSTextAlignmentCenter;
    lb.numberOfLines = 0;
    lb.text = title;
    [view addSubview:lb];
    return view;
}

//无网络提示图
+ (UIView *)creatNoNetworkView:(id)obj withSelector:(SEL)selector{
    
    UIView *view = [[UIView alloc]initWithFrame:CGRectMake(0, 0, k_SCREEN_WIDTH, k_SCREEN_HEIGHT-64)];
    view.backgroundColor = k_BGColor;
    
    UIImageView *icon = [[UIImageView alloc]initWithFrame:CGRectMake((k_SCREEN_WIDTH-200)/2, 50, 200, 200)];
    icon.image = [UIImage imageNamed:@"error_pnc"];
    [view addSubview:icon];
    
    UILabel *lb = [[UILabel alloc]initWithFrame:CGRectMake(15, icon.bottom+15, k_SCREEN_WIDTH-30, 40)];
    lb.font = [UIFont systemFontOfSize:15];
    lb.textColor = k_WhiteColor;
    lb.textAlignment = NSTextAlignmentCenter;
    lb.numberOfLines = 0;
    lb.text = @"网络错误，请检查网络设置";
    [view addSubview:lb];
    
    UIButton *btn = [UIButton buttonWithType:UIButtonTypeCustom];
    btn.titleLabel.font = [UIFont systemFontOfSize:15];
    [btn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [btn setBackgroundColor:k_OrgColor];
    [btn setTitle:@"刷新" forState:UIControlStateNormal];
    btn.frame = CGRectMake(20, lb.bottom+60, k_SCREEN_WIDTH-40, 30);
    [btn addTarget:obj action:selector forControlEvents:UIControlEventTouchUpInside];
    btn.tag = 10000;
    [view addSubview:btn];
    
    return view;
}

+ (UIImage *)snapshotView:(UIView *)sourceView frame:(CGRect)rect {
    
    CGSize size = sourceView.bounds.size;
    
    UIGraphicsBeginImageContextWithOptions(size, NO, [UIScreen mainScreen].scale);
    
    [sourceView drawViewHierarchyInRect:rect afterScreenUpdates:YES];
    
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    //    NSData * data = UIImagePNGRepresentation(image);
    //
    //    NSArray *path = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    //    NSString *filename = [[path objectAtIndex:0] stringByAppendingPathComponent:@"foo.png"];
    //    [data writeToFile:filename atomically:YES];
    
    return image;
}


+ (NSAttributedString *)placeholderTextFild:(UITextField*)tf TextColor:(UIColor *)color fontSize:(NSInteger)fontSize text:(NSString*)text{
    
    
    NSMutableParagraphStyle *style = [tf.defaultTextAttributes[NSParagraphStyleAttributeName] mutableCopy];
    
    style.minimumLineHeight = tf.font.lineHeight - (tf.font.lineHeight - [UIFont systemFontOfSize:fontSize].lineHeight) / 2.0;
    
   NSAttributedString *attStr = [[NSAttributedString alloc] initWithString:text
                                                                     attributes:@{NSForegroundColorAttributeName: color,
                                                                                  NSFontAttributeName : [UIFont systemFontOfSize:fontSize],NSParagraphStyleAttributeName : style}
                                      
                                      ];
    
    return attStr;
}

/**
 *  根据银行编号返回银行名称
 */
+ (NSString *)BankCodeTurnBankNameWithCode:(NSString*)code
{
    NSString *name;
    
    if([code isEqualToString:@"CCB"]||[code isEqualToString:@"ccb"]){
        
        name = @"建设银行";
    }else if([code isEqualToString:@"ABC"]||[code isEqualToString:@"abc"]){
        
        name = @"农业银行";
    }else if([code isEqualToString:@"ICBC"]||[code isEqualToString:@"icbc"]){
        
        name = @"工商银行";
    }else if([code isEqualToString:@"BOC"]||[code isEqualToString:@"boc"]){
        
        name = @"中国银行";
    }else if([code isEqualToString:@"CMBC"]||[code isEqualToString:@"cmbc"]){
        
        name = @"民生银行";
    }else if([code isEqualToString:@"CMB"]||[code isEqualToString:@"cmb"]){
        
        name = @"招商银行";
    }else if([code isEqualToString:@"CIB"]||[code isEqualToString:@"cib"]){
        
        name = @"兴业银行";
    }else if([code isEqualToString:@"BCCB"]||[code isEqualToString:@"bccb"]){
        
        name = @"北京银行";
    }else if([code isEqualToString:@"BOCOM"]||[code isEqualToString:@"bocom"]){
        
        name = @"交通银行";
    }else if([code isEqualToString:@"CEB"]||[code isEqualToString:@"ceb"]){
        
        name = @"中国光大银行";
    }else if([code isEqualToString:@"GDB"]||[code isEqualToString:@"gdb"]){
        
        name = @"广东发展银行";
    }else if([code isEqualToString:@"SPDB"]||[code isEqualToString:@"spdb"]){
        
        name = @"上海浦东发展银行";
    }else if([code isEqualToString:@"CNCB"]||[code isEqualToString:@"cncb"]){
        
        name = @"中信";
    }else if([code isEqualToString:@"PSBC"]||[code isEqualToString:@"psbc"]){//中国邮政
        
        name = @"中国邮政";
    }else if([code isEqualToString:@"HXB"]||[code isEqualToString:@"hxb"]){//深圳发展银行
        
        name = @"华夏银行";
    }else if([code isEqualToString:@"PAB"]||[code isEqualToString:@"pab"]){//平安银行
        
        name = @"平安银行";
    }else if([code isEqualToString:@"CNCB"]||[code isEqualToString:@"cncb"]){//中信
        
        name = @"中信银行";
    }else if([code isEqualToString:@"SRCB"]||[code isEqualToString:@"srcb"]){//上海农商银行
        
        name = @"上海农商银行";
    }else if([code isEqualToString:@"BOS"]||[code isEqualToString:@"bos"]){//上海银行
        
        name = @"上海银行";
    }else if([code isEqualToString:@"BOCSH"]||[code isEqualToString:@"bocsh"]){//中国农商
        
        name = @"中国农商银行";
    }else{
        
        name = @"其他银行";
    }
    
    
    return name;
}

/**
 *  根据银行编号返回银行icon
 */
+ (NSString *)BankCodeTurnBankIconWithCode:(NSString*)code
{
    NSString *name;
    
    if([code isEqualToString:@"CCB"]||[code isEqualToString:@"ccb"]){//建设银行
        
        name = @"bank_icon_ccb";
    }else if([code isEqualToString:@"ABC"]||[code isEqualToString:@"abc"]){//农业银行
        
        name = @"bank_icon_abc";
    }else if([code isEqualToString:@"ICBC"]||[code isEqualToString:@"icbc"]){//工商银行
        
        name = @"bank_icon_icbc";
    }else if([code isEqualToString:@"BOC"]||[code isEqualToString:@"boc"]){//中国银行
        
        name = @"bank_icon_boc";
    }else if([code isEqualToString:@"CMBC"]||[code isEqualToString:@"cmbc"]){//民生银行
        
        name = @"bank_icon_cmbc";
    }else if([code isEqualToString:@"CMB"]||[code isEqualToString:@"cmb"]){//招商银行
        
        name = @"bank_icon_cmb";
    }else if([code isEqualToString:@"CIB"]||[code isEqualToString:@"cib"]){//兴业银行
        
        name = @"bank_icon_cib";
    }else if([code isEqualToString:@"BCCB"]||[code isEqualToString:@"bccb"]){//北京银行
        
        name = @"bank_icon_bob";
    }else if([code isEqualToString:@"BOCOM"]||[code isEqualToString:@"bocom"]){//交通银行
        
        name = @"bank_icon_bcm";
    }else if([code isEqualToString:@"CEB"]||[code isEqualToString:@"ceb"]){//中国光大银行
        
        name = @"bank_icon_ceb";
    }else if([code isEqualToString:@"GDB"]||[code isEqualToString:@"gdb"]){//广东发展银行
        
        name = @"bank_icon_gdb";
    }else if([code isEqualToString:@"SPDB"]||[code isEqualToString:@"spdb"]){//上海浦东发展银行
        
        name = @"bank_icon_spdb";
    }else if([code isEqualToString:@"PSBC"]||[code isEqualToString:@"psbc"]){//中国邮政
        
        name = @"bank_icon_psbc";
    }else if([code isEqualToString:@"HXB"]||[code isEqualToString:@"hxb"]){//深圳发展银行
        
        name = @"bank_icon_hxb";
    }else if([code isEqualToString:@"PAB"]||[code isEqualToString:@"pab"]){//平安银行
        
        name = @"bank_icon_pab";
    }else if([code isEqualToString:@"CNCB"]||[code isEqualToString:@"cncb"]){//中信
        
        name = @"bank_icon_cncb";
    }else if([code isEqualToString:@"SRCB"]||[code isEqualToString:@"srcb"]){//上海农商银行
        
        name = @"bank_icon_shny";
    }else if([code isEqualToString:@"BOS"]||[code isEqualToString:@"bos"]){//上海银行
        
        name = @"bank_icon_sh";
    }else if([code isEqualToString:@"BOCSH"]||[code isEqualToString:@"bocsh"]){//中国农商
        
        name = @"bank_icon_boc";
    }else{
        
        name = @"bank_icon_boc";
    }
    
    
    return name;
}


+ (void)openScheme:(NSString *)scheme {
    
    UIApplication *application = [UIApplication sharedApplication];
    NSURL *URL = [NSURL URLWithString:scheme];
    
    if ([application respondsToSelector:@selector(openURL:options:completionHandler:)]) {
        [application openURL:URL options:@{UIApplicationOpenURLOptionsSourceApplicationKey : @YES}
           completionHandler:^(BOOL success){
               
               NSLog(@"Open %@: %d",scheme,success);
               
           }];
    } else {
        BOOL success = [application openURL:URL];
        NSLog(@"Open faild %@: %d",scheme,success);
    }
}

/**
 *  根据level返回会员等级
 */
+ (NSString *)levelCodeTurnVipNameWithCode:(NSString*)code
{
    NSString *string;
    switch ([code integerValue]) {
        case 0:
        {
            string = @"普通会员";
        }
            break;
        case 2000:
        {
            string = @"特邀会员";
        }
            break;
        case 2101:
        {
            string = @"白银会员";
        }
            break;
        case 2102:
        {
            string = @"黄金会员";
        }
            break;
        case 2103:
        {
            string = @"钻石会员";
        }
            break;
        case 2111:
        {
            string = @"精英会员";
        }
            break;
        case 2112:
        {
            string = @"明星会员";
        }
            break;
        case 2113:
        {
            string = @"大师会员";
        }
            break;
        default:
            break;
    }
    return string;
}


/**
 *  根据level返回会员图标（本地）
 */
+ (NSString *)levelCodeTurnVipImageNameWithCode:(NSString*)code
{
    NSString *string;
    switch ([code integerValue]) {
        case 0:
        {
            string = @"portrait_ordinary";
        }
            break;
        case 2000:
        {
            string = @"portrait_guest";
        }
            break;
        case 2101:
        {
            string = @"portrait_silver";
        }
            break;
        case 2102:
        {
            string = @"portrait_gold";
        }
            break;
        case 2103:
        {
            string = @"portrait_diamond";
        }
            break;
        case 2111:
        {
            string = @"portrait_elite";
        }
            break;
        case 2112:
        {
            string = @"portrait_star";
        }
            break;
        case 2113:
        {
            string = @"portrait_master";
        }
            break;
        default:
            break;
    }
    return string;
}


/**
 *  第三方平台名字（本地）
 */
+ (NSString *)thridPlatCodeTurnNameWithCode:(NSString*)code
{
    NSString *name;
    
    if([code isEqualToString:@"AG"]){
        
        name = @"Ag国际";
    }else if([code isEqualToString:@"AGQ"]){
        
        name = @"Ag极速";
    }else if([code isEqualToString:@"IBC"]){
        
        name = @"沙巴体育";
    }else if([code isEqualToString:@"EA"]){
        
        name = @"EA";
    }else if([code isEqualToString:@"EAS"]){
        
        name = @"EA";
    }else if([code isEqualToString:@"EBTM"]){
        
        name = @"Ebet";
    }else if([code isEqualToString:@"GG"]){
        
        name = @"游联天下";
    }else if([code isEqualToString:@"PT"]){
        
        name = @"PT平台";
    }else if([code isEqualToString:@"SLS"]){
        
        name = @"小金体育";
    }else if([code isEqualToString:@"SLV"]){
        
        name = @"小金真人";
    }else if([code isEqualToString:@"TBBIN"]){
        
        name = @"新版BBIN";
    }else{
        name=code;
    }

    return name;
}



//设置UITextfield的rightView
+ (UIImageView *)setTextFieldRightView
{
    UIImageView *rightView = [[UIImageView alloc]init];
    rightView.image = [UIImage imageNamed:@""];
    rightView.size = CGSizeMake(30, 30);
    rightView.contentMode = UIViewContentModeCenter;
    return rightView;
}

//时间戳转日期

+ (NSString *)timeIntervalToDateTimeStrWithTimeIntervalStr:(NSString *)interval
{
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"YYYY-MM-dd HH:mm:ss"];
    NSTimeZone* timeZone = [NSTimeZone timeZoneWithName:@"Asia/Shanghai"];
    [formatter setTimeZone:timeZone];
    NSTimeInterval timeInterval = [interval doubleValue];
    NSDate *confromTimesp = [NSDate dateWithTimeIntervalSince1970:timeInterval];
    NSString *confromTimespStr = [formatter stringFromDate:confromTimesp];
    return confromTimespStr;
}

//裁剪图片
+(UIImage*)getSubImage:(UIImage *)image rect:(CGRect)rect
{
    CGImageRef subImageRef = CGImageCreateWithImageInRect(image.CGImage, rect);
    
    UIImage* smallImage = [UIImage imageWithCGImage:subImageRef];

    CGImageRelease(subImageRef);
    return smallImage;
   
}

//将图片背景色改成透明
+(UIImage*) imageToTransparent:(UIImage*)image
{
    // 分配内存
    const int imageWidth = image.size.width;
    const int imageHeight = image.size.height;
    size_t      bytesPerRow = imageWidth * 4;
    uint32_t* rgbImageBuf = (uint32_t*)malloc(bytesPerRow * imageHeight);
    
    // 创建context
    CGColorSpaceRef colorSpace = CGColorSpaceCreateDeviceRGB();
    CGContextRef context = CGBitmapContextCreate(rgbImageBuf, imageWidth, imageHeight, 8, bytesPerRow, colorSpace,
                                                 kCGBitmapByteOrder32Little | kCGImageAlphaNoneSkipLast);
    CGContextDrawImage(context, CGRectMake(0, 0, imageWidth, imageHeight), image.CGImage);
    
    // 遍历像素
    int pixelNum = imageWidth * imageHeight;
    uint32_t* pCurPtr = rgbImageBuf;
    for (int i = 0; i < pixelNum; i++, pCurPtr++)
    {
       if ((*pCurPtr & 0xFFFFFF00) == 0xffffff00)    // 将白色变成透明
        {
            uint8_t* ptr = (uint8_t*)pCurPtr;
            ptr[0] = 0;
        }
        else
        {
            // 改成下面的代码，会将图片转成想要的颜色
            uint8_t* ptr = (uint8_t*)pCurPtr;
            ptr[3] = 0; //0~255
            ptr[2] = 0;
            ptr[1] = 0;
        }
        
    }
    
    // 将内存转成image
    CGDataProviderRef dataProvider =CGDataProviderCreateWithData(NULL, rgbImageBuf, bytesPerRow * imageHeight, NULL);
    CGImageRef imageRef = CGImageCreate(imageWidth, imageHeight,8, 32, bytesPerRow, colorSpace,
                                        kCGImageAlphaLast |kCGBitmapByteOrder32Little, dataProvider,
                                        NULL, true,kCGRenderingIntentDefault);
    CGDataProviderRelease(dataProvider);
    
    UIImage* resultUIImage = [UIImage imageWithCGImage:imageRef];
    
    // 释放
    CGImageRelease(imageRef);
    CGContextRelease(context);
    CGColorSpaceRelease(colorSpace);
    
    return resultUIImage;
}

+(CGPoint)scrollOffsetHandleWithItemWidth:(CGFloat)width itemCount:(NSInteger)itemCount superViewWidth:(CGFloat)superWidth index:(NSInteger)index
{
    CGPoint point;
    
    BOOL leftBool  = width*index > superWidth/2 ? YES : NO ;
    BOOL rightBool = width*(itemCount-index-1) > superWidth/2 ? YES : NO ;
    //左右滑动的处理
    if (leftBool && rightBool) {
        
        point = CGPointMake( +(width*index+width/2) - superWidth/2 , 0);
        
    }else {//针对最左边，最右边的处理-左右滑动
        
        if (!leftBool && rightBool) {//能看到最左端
            point = CGPointMake(0 , 0);
        } else {
            point = CGPointMake(itemCount*width-superWidth , 0);

        }
    }
    
    return point;
}
@end
