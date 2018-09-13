#pragma mark -
#pragma mark - url


#ifdef DEBUG
#define NSLog(fmt,...) NSLog((@"%s [Line %d] " fmt), __PRETTY_FUNCTION__, __LINE__, ##__VA_ARGS__);
#else
#define NSLog(...)
#endif


#pragma mark - 声明与实现单列

#undef singleton
#define singleton( __class ) \
property (nonatomic, readonly) __class * sharedInstance; \
- (__class *)sharedInstance; \
+ (__class *)sharedInstance;

#undef def_singleton
#define def_singleton( __class ) \
dynamic sharedInstance; \
- (__class *)sharedInstance \
{ \
return [__class sharedInstance]; \
} \
+ (__class *)sharedInstance \
{ \
static dispatch_once_t once; \
static __strong id __singleton__ = nil; \
dispatch_once( &once, ^{ __singleton__ = [[__class alloc] init]; } ); \
return __singleton__; \
}


#define kWeakSelf(obj)   __weak   __typeof(&*obj) weakSelf   = obj;
#define kStrongSelf(obj) __strong __typeof(&*obj) strongSelf = obj;

#define k_UIColorFromRGB(rgbValue)\
\
[UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
green:((float)((rgbValue & 0xFF00) >> 8))/255.0 \
blue:((float)(rgbValue & 0xFF))/255.0 \
alpha:1.0]


#pragma mark -


//#define

#ifdef EasyLife_TestHost

#define CurrentHost @"://app-client.ffzxnet.com"

#else
//正式环境
#define CurrentHost @"://app-client.ffzxnet.com"

#endif

//用于替换查找
#define TEMPHost @"://app-client.ffzxnet.com"

/** 
 @"http:192.168.2.211:4040/"
 @"http://192.168.2.211:4041/"
 @"http://192.168.2.211:4042/"
 @"http://nb.tbobf.com/"
 */
//线上
//#define Host  @"http://www.tbo98.com"
//测试
//#define Host    @"http://192.168.2.211:8089"

#define AESKey   @"123456789"

#define ServiceUrl    @"https://chat.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=387948&configID=47009&jid=6484960942&s=1"

#define LotteryUrl    @"http://slot.tbetag.com/iframe_index.php?account="

#define k_ImgHost @"uploadImage/upload.do?type=app_user_image_type&fileName="//图片baseUrl
#define k_AfterSaleImgHost   @"uploadImage/upload.do?type=app_user_image_type&fileName="
#define k_ConvertInstruction @"convertCouponRule.html"                //兑换说明

#define k_HelpHost           @"ebsite/suggestMobile/help.do"          //帮助页面
#define k_UseHost            @"agreement/use.html"                    //用户协议
#define k_RegisterHost       @"agreement/register.html"               //注册协议
#define k_AboutHost          @"agreement/about.html"                  //关于我们
#define k_RedPacketHost      @"packetInstructions.html"               //红包帮助
#define k_ServiceAgreement   @"bankCard/serviceAgreement.do"          //银行卡服务协议

#define k_downAppHost        @"http://www.dmaichang.com/download"     //下载页面
#define k_ServicePhone       @"400-717-6800"                          //客服电话

//数据库版本
#define KDBVersion              2.0

#define DBVersion               @"DBVersion"
#define GetDBVersion    [[NSUserDefaults standardUserDefaults] objectForKey:DBVersion]

#define WEAK_SELF                   __weak typeof(self) weak_self = self;
#define WEAK_OBJECT(weak_obj, obj)  __weak typeof(obj) weak_obj = obj;

#define kAppDelegate               ((AppDelegate *)([UIApplication sharedApplication].delegate))
#define IMAGE(image)               [UIImage imageNamed:image]


#define K_MainSB [UIStoryboard storyboardWithName:@"Main" bundle:[NSBundle mainBundle]]

#define K_UUIDSTRING [[[UIDevice currentDevice] identifierForVendor] UUIDString]
#define K_UUID_BUNDLE_ID   [NSString stringWithFormat:@"%@+%@",K_UUIDSTRING,@"com.FeiFan.EasyLife"]


//屏幕
#define k_SCREEN_WIDTH [UIScreen mainScreen].bounds.size.width
#define k_SCREEN_HEIGHT [UIScreen mainScreen].bounds.size.height
#define k_IsIOS7System ([[[UIDevice currentDevice] systemVersion] floatValue] < 8.0 ? YES : NO)

//屏幕宽度相对iPhone6屏幕宽度的比例

#define KWidth_IphonePlus_Scale    [UIScreen mainScreen].bounds.size.width/414.0
#define KWidth_Iphone6_Scale    [UIScreen mainScreen].bounds.size.width/375.0
#define KWidth_Scale    [UIScreen mainScreen].bounds.size.width/320.0

//根据iphone5尺寸算高度
#define GetScaleWidthIphone5(width)  width * KWidth_Scale

//根据iphone6尺寸算高度
#define GetScaleWidth(width)  width*KWidth_Iphone6_Scale

//根据iphone plus尺寸算高度
#define GetScaleWidthPlus(width)  width*KWidth_IphonePlus_Scale

//首页cell的单元格高度
#define _INDEX_TH_4_CellH     k_SCREEN_WIDTH * 380 / 750.0
#define _AD_INDEX_ADH         k_SCREEN_WIDTH * 200 / 750.0
#define _limiteSection        k_SCREEN_WIDTH > 375 ? 160 :(k_SCREEN_WIDTH < 375 ? 125: 140)
#define _INDEX_RMSC_8H        k_SCREEN_WIDTH * 620 / 750.0

#define K_Cell_Height  K_SCREEN_HEIGHT >= 568 ? ( K_SCREEN_HEIGHT >= 667 ? ( K_SCREEN_HEIGHT >= 736 ? 736 : 667 ) : 568) : 480




// View 坐标(x,y)和宽高(width,height)
#define k_VX(v)                    (v).frame.origin.x
#define k_VY(v)                    (v).frame.origin.y
#define k_VWIDTH(v)                (v).frame.size.width
#define k_VHEIGHT(v)               (v).frame.size.height





#pragma mark -
#pragma mark - color

/*主色调*/
#define k_color_Bar [UIColor colorWithRed:0.0/255 green:172.0/255 blue:236.0/255 alpha:1.0]

//颜色
#define k_UICOLOR(r,g,b,a) [UIColor colorWithRed:r/255.0 green:g/255.0 blue:b/255.0 alpha:a]
//#define k_UIColorWithRGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]
#define color_globalBG 0Xf7f7f7

//随机颜色
#define k_COLORRANDOM [UIColor colorWithRed:(arc4random()%255)/255.0 green:(arc4random()%255)/255.0 blue:(arc4random()%255)/255.0 alpha:1.0]

#define k_UIColorFromRGB(rgbValue)\
\
[UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 \
green:((float)((rgbValue & 0xFF00) >> 8))/255.0 \
blue:((float)(rgbValue & 0xFF))/255.0 \
alpha:1.0]



#define k_bgChunkColor 0Xffffff
#define k_RegisterBGColor  k_UICOLOR(43, 40, 38, 0.6)
#define k_OrgColor  k_UIColorFromRGB(0xd3a14a)
#define k_GrayColor k_UICOLOR(101, 101, 101, 1)
#define k_LineColor k_UIColorFromRGB(0x464646)
#define k_BGColor k_UICOLOR(12, 12, 12, 1)
#define k_WhiteColor k_UICOLOR(255, 255, 255, 1)
#define k_placeholderColor k_UIColorFromRGB(0x969696)
#define k_cellBGColor k_UICOLOR(25, 25, 25, 1)

//淡灰色线条
#define k_grayLineColor k_UICOLOR(110, 109, 109, 0.6)
////////////////


/*
 
 具体换算是：
 Points     Pixels    Ems     Percent
 6pt        8px      0.5em     50%
 7pt        9px      0.55em    55%
 7.5pt      10px     0.625em   62.5%
 8pt        11px     0.7em     70%
 9pt        12px     0.75em    75%
 10pt       13px     0.8em     80%
 10.5pt     14px     0.875em   87.5%
 11pt       15px     0.95em    95%
 12pt       16px     1em       100%
 13pt       17px     1.05em    105%
 13.5pt     18px     1.125em   112.5%
 14pt       19px     1.2em     120%
 14.5pt     20px     1.25em    125%
 15pt       21px     1.3em     130%
 16pt       22px     1.4em     140%
 17pt       23px     1.45em    145%
 18pt       24px     1.5em     150%
 20pt       26px     1.6em     160%
 22pt       29px     1.8em     180%
 24pt       32px     2em       200%
 26pt       35px     2.2em     220%
 27pt       36px     2.25em    225%
 28pt       37px     2.3em     230%
 29pt       38px     2.35em    235%
 30pt       40px     2.45em    245%
 32pt       42px     2.55em    255%
 34pt       45px     2.75em    275%
 36pt      48px      3em       300%

 
 */




#pragma mark -
#pragma mark - place holder

//图片路径
#define ImageWithBundlePath(name)   [UIImage imageWithContentsOfFile:[[NSBundle mainBundle] pathForResource:name ofType:nil]]
#define ImageWithSandBoxPath(imgPath)   [UIImage imageWithContentsOfFile:imgPath]

#define CommunityPlaceHolderImage [UIImage imageNamed:@"imageplaceholder.png"]

#define UserPhotoPlaceHolder [UIImage imageNamed:@"user_photo_placeholder.png"]

#define GoodsPlaceHolderImage [UIImage imageNamed:@"con_chunk"]

/*锁key*/
#define k_lockedPass @"localPass"


//错误提示
#define k_requestErrorMessage              @"网络异常，请稍后重试"                      
