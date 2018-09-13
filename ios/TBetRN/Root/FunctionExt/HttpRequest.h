//
//  HttpRequest.h
//  EasyLife
//
//  Created by DingJian on 16/3/23.
//  Copyright © 2016年 CCJ. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AFNetworking.h"

typedef NS_ENUM(NSInteger, HttpRequsetType) {
    RequsetTypePost,
    RequsetTypeGet
};

typedef void (^CompletionBlock)(id result);
typedef void (^FailureBlock)(id error);

@interface HttpRequest : NSObject

+ (AFSecurityPolicy*)customSecurityPolicy;

//网络请求
+ (NSURLSessionDataTask *)requestWithURL:(NSString *)url
                             requestCode:(NSString *)requestCode
                              isFormData:(BOOL)isFormData
                                  params:(NSDictionary *)params
                              httpMethod:(HttpRequsetType)requsetType
                          completedBlock:(CompletionBlock)completedBlock
                            failureBlock:(FailureBlock)failureBlock;

//上传图片
+ (NSURLSessionDataTask *)uploadWithURL:(NSString *)url
                            requestCode:(NSString *)requestCode
                                 params:(NSDictionary *)params
                         completedBlock:(CompletionBlock)completedBlock
                           failureBlock:(FailureBlock)failureBlock;
/**
 *  取消网络请求
 *
 *  @param code 用于取消请求的请求码
 */
+ (void)cancelRequestWithAPlCode:(NSString *)code;


@end
