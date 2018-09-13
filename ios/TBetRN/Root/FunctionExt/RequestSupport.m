//
//  RequestSupport.m
//  tbetplatform
//
//  Created by Ric on 21/4/17.
//  Copyright © 2017年 Ric. All rights reserved.
//

#import "RequestSupport.h"

@implementation RequestSupport

+ (void)requestWithUrl:(NSString*)url paramDic:(NSDictionary *)paramDic requestCode:(NSString *)code successBlock:(void(^)(NSDictionary *dic))successBlock failBlock:(void(^)(NSString *msg))failBlock{
    
    [HttpRequest requestWithURL:url
                    requestCode:code
                     isFormData:NO
                         params:paramDic
                     httpMethod:RequsetTypePost
                 completedBlock:^(id result) {
                  
                     if ([result[@"Status"] integerValue]==200) {
                         
                         successBlock(result[@"Data"]);
                     }else if([result[@"Status"] integerValue]==600){//未登录 被挤一类
                         [self loginFialedHandle];
                         failBlock(@"登陆已失效，请重新登陆");
                     }else{
                         
                         failBlock(result[@"Msg"]);
                     }
                     
                 } failureBlock:^(id error) {
                     
                     failBlock(@"网络请求出错，请检查网络连接");
                     
                 }];

}


+ (void)upLoadPictureWithUrl:(NSString*)url paramDic:(NSDictionary *)paramDic requestCode:(NSString *)code successBlock:(void(^)(NSDictionary *dic))successBlock failBlock:(void(^)(NSString *msg))failBlock{
    
   
            [HttpRequest uploadWithURL:url requestCode:code params:paramDic completedBlock:^(id result) {
                     if ([result[@"Status"] integerValue]==200) {
                         
                         successBlock(result[@"Data"]);
                     }else{
                         
                         failBlock(result[@"Msg"]);
                     }
                     
                 } failureBlock:^(id error) {
                     
                     failBlock(@"网络请求出错，请稍后再试。。。");
                     
                 }];
    
}

+ (void)loginFialedHandle{
    
    
}

@end
