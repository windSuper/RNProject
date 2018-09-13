//
//  FunctionExt.h
//  tbetplatform
//
//  Created by Ric on 12/4/2017.
//  Copyright © 2017 Ric. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FunctionExt : NSObject

/**
 *  cell倒计时显示时间
 *
 *  @param seconds 时间参数
 *
 *  @return 返回字符串时间
 */
+(NSString *)lessSecondToDay:(NSUInteger)seconds;

/**
 *  计算文本高度的并返回高度
 *
 *  @param lbFontSize 字体大小
 *  @param lbWidth 显示文本内容的lb宽度
 *
 *  @return 返回高度
 */
+(CGSize)calcuLateTextHeight:(NSString *)string LBWidth:(CGFloat)lbWidth LBFontSize:(CGFloat)lbFontSize;
/**
 * 类似上面方法，只不过这个用来计算NSAttributedString的size
 */
+(CGSize)calcuLateAttributedStringHeight:(NSAttributedString *)string LBWidth:(CGFloat)lbWidth LBFontSize:(CGFloat)lbFontSize;

/**
 *  计算cell高度的并返回高度数组函数
 *
 *  @param arr arr 数据容器
 *
 *  @param key text文本在数据中的key
 *
 *  @param lbWidth 显示文本内容的lb宽度
 *
 *  @return 返回高度数组
 */
+(NSMutableArray *)CellHeightCalculateWithModelArr:(NSArray *)arr ModelKey:(NSString *)key LBWidth:(CGFloat)lbWidth LBFontSize:(CGFloat)lbFontSize;


/**
 *  传入图片名和左上不变距离拉伸并返回图片
 *
 *  @param imgName 图片名
 *  @param left    左边不拉伸距离
 *  @param right   上面不拉伸距离
 *
 */
+(UIImage *)stretchImageWithImageName:(NSString *)imgName leftCapWith:(NSInteger)left rightCapWidth:(NSInteger)right;




/**
 *  字符串多颜色显示
 *
 *  @param str   需要传入的内容字符串
 *  @param range 变色的范围
 *  @param color 需要变成的颜色
 *
 */
+(NSAttributedString *)changeStringColorWithString:(NSString *)str Range:(NSRange)range Color:(UIColor*)color;

/**
 *  创建返回顶部按钮
 *
 */
+(UIControl *)creatBackTopBtn;



/**
 *  请求成功无数据的时候显示
 *
 *
 */
+(UIView *)showPlaceholderViewWithNoDataMessage:(NSString *)message;

/**
 *  获取当前时间戳
 *
 */
+ (NSString *)getCurrentDateString;


/**
 *  判断字符是否带有emoji
 */

+ (BOOL)stringContainsEmoji:(NSString *)string;



/**
 *  创建消息列表无消息提示视图
 *
 */
+ (UIView *)creatNoMessageViewWithTitle:(NSString *)title;

/**
 *  无网络提示图
 *  obj 当前坐在控制器对象
 *  selector 刷新按钮对应的方法
 */
+ (UIView *)creatNoNetworkView:(id)obj withSelector:(SEL)selector;

/**
 *  创建分割线
 *  入参：视图frame
 */
+ (UIView *)CreatSeparotorLineWithRect:(CGRect)rect;

/**
 *  截图解决策划的时候无tabbar栏
 *  入参：视图frame与所需要截图源
 */
+ (UIImage *)snapshotView:(UIView *)sourceView frame:(CGRect)rect;


/**
 *  设置placeholder文字大小和颜色
 */
+ (NSAttributedString *)placeholderTextFild:(UITextField*)tf TextColor:(UIColor *)color fontSize:(NSInteger)fontSize text:(NSString*)text;

/**
 *  根据银行编号返回银行名称
 */
+ (NSString *)BankCodeTurnBankNameWithCode:(NSString*)code;


/**
 *  根据银行编号返回银行图标（本地）
 */
+ (NSString *)BankCodeTurnBankIconWithCode:(NSString*)code;


// 跳转浏览器
+ (void)openScheme:(NSString *)scheme;


/**
 *  根据level返回会员等级
 */
+ (NSString *)levelCodeTurnVipNameWithCode:(NSString*)code;


/**
 *  根据level返回会员图标（本地）
 */
+ (NSString *)levelCodeTurnVipImageNameWithCode:(NSString*)code;


//设置UITextfield的rightView
+ (UIImageView *)setTextFieldRightView;


//时间戳转日期

+ (NSString *)timeIntervalToDateTimeStrWithTimeIntervalStr:(NSString *)interval;


/**
 *  第三方平台名字（本地）
 */
+ (NSString *)thridPlatCodeTurnNameWithCode:(NSString*)code;


//裁剪图片
+(UIImage*)getSubImage:(UIImage *)image rect:(CGRect)rect;


//计算水平滑动Scorll point
+(CGPoint)scrollOffsetHandleWithItemWidth:(CGFloat)width itemCount:(NSInteger)itemCount superViewWidth:(CGFloat)superWidth index:(NSInteger)index;

@end
