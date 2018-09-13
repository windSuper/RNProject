//
//  RequestSupport.h
//  tbetplatform
//
//  Created by Ric on 21/4/17.
//  Copyright © 2017年 Ric. All rights reserved.
//

#import "HttpRequest.h"

@interface RequestSupport : HttpRequest

+ (void)requestWithUrl:(NSString*)url paramDic:(NSDictionary *)paramDic requestCode:(NSString *)code successBlock:(void(^)(NSDictionary *dic))successBlock failBlock:(void(^)(NSString *dic))failBlock;

+ (void)upLoadPictureWithUrl:(NSString*)url paramDic:(NSDictionary *)paramDic requestCode:(NSString *)code successBlock:(void(^)(NSDictionary *dic))successBlock failBlock:(void(^)(NSString *msg))failBlock;

@end
