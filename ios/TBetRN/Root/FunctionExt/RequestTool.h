//
//  RequestTool.h
//  tbetplatform
//
//  Created by Ric on 21/4/17.
//  Copyright © 2017年 Ric. All rights reserved.
//

#import "HttpRequest.h"

@interface RequestTool : HttpRequest

//启动页广告
+ (void)getADImageWithParamDic:(NSDictionary *)paramDic WithSuccessBlock:(void (^)(NSDictionary *resultDic))successBlock WithFailBlock:(void (^)(NSString *msg))failBlock;

@end
