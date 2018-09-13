//
//  RequestTool.m
//  tbetplatform
//
//  Created by Ric on 21/4/17.
//  Copyright © 2017年 Ric. All rights reserved.
//

#import "RequestTool.h"
#import "RequestSupport.h"
@implementation RequestTool

+ (void)getADImageWithParamDic:(NSDictionary *)paramDic WithSuccessBlock:(void (^)(NSDictionary *resultDic))successBlock WithFailBlock:(void (^)(NSString *msg))failBlock
{
    [RequestSupport requestWithUrl:@"/active/active_show.do" paramDic:paramDic requestCode:nil successBlock:^(NSDictionary *dic) {
        
        successBlock(dic);
        
    } failBlock:^(NSString *msg) {
        failBlock(msg);
    }];
}
@end
