/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <RNCookieManagerIOS.h>
#import "ADScrollView.h"
#import "Orientation.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  [UIApplication sharedApplication].statusBarStyle = UIStatusBarStyleLightContent;
  
  //配置root视图
  [self configRootViewWithlaunchOptions:launchOptions];
  
  
  //配置广告视图
  [self configAdView];
  
  
  [self.window makeKeyAndVisible];
  return YES;
}
- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

#pragma mark ==== 配置root视图
- (void)configRootViewWithlaunchOptions:(NSDictionary *)launchOptions{
  
  NSURL *jsCodeLocation;
  
  
#ifdef DEBUG
  
  //当前ip，node服务器地址
//  jsCodeLocation = [NSURL URLWithString:@"http://192.168.2.120:8081/index.ios.bundle?platform=ios&dev=true"];
  
  //打包
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/main" withExtension:@"jsbundle"];
#else
  jsCodeLocation = [CodePush bundleURL];
#endif
  
  //代码加载root
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"TBetRN"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f
                                                    green:1.0f
                                                     blue:1.0f
                                                    alpha:1];
  
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
}

#pragma mark ==== 启动广告图
- (void)configAdView{
  
  
  //请求广告URL前,必须设置,否则会先进入window的RootVC
  [NSThread sleepForTimeInterval:1];
  
  [RequestTool getADImageWithParamDic:@{@"sys_type":@"IOS"} WithSuccessBlock:^(NSDictionary *resultDic) {
    
    [self configDetailADView:resultDic];
    
  } WithFailBlock:^(NSString *msg) {
    
  }];
  
}
- (void)configDetailADView:(NSDictionary *)dataDic{
  
  NSInteger isShow = [dataDic[@"display"] integerValue];
  NSString *imgUrlStr = dataDic[@"diff_img"];
  NSURL *url = [NSURL URLWithString:imgUrlStr];
  SDWebImageManager *manager = [SDWebImageManager sharedManager];
  BOOL isExist = [manager diskImageExistsForURL:url];
  if (isExist&&isShow) {
    
    ADScrollView *ad = [[ADScrollView alloc]initWithFrame:CGRectMake(0, 0, k_SCREEN_WIDTH, k_SCREEN_HEIGHT)];
    ad.dataArr = @[dataDic,dataDic,dataDic];
    [self.window addSubview:ad];
    [self.window bringSubviewToFront:ad];
  }else{//去下载图片
    
    [[SDWebImageManager sharedManager] downloadImageWithURL:url options:SDWebImageRetryFailed progress:^(NSInteger receivedSize, NSInteger expectedSize) {
      
    } completed:^(UIImage *image, NSError *error, SDImageCacheType cacheType, BOOL finished, NSURL *imageURL) {
      
      [[SDImageCache sharedImageCache] storeImage:image forKey:imgUrlStr toDisk:NO];
    }];
  }
  
}

@end
