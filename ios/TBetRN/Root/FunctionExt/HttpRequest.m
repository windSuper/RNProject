//
//  HttpRequest.m
//  EasyLife
//
//  Created by DingJian on 16/3/23.
//  Copyright © 2016年 CCJ. All rights reserved.
//

#import "HttpRequest.h"
#import "NSString+wrapper.h"
@interface HttpRequest()


@end

@implementation HttpRequest

+ (AFSecurityPolicy*)customSecurityPolicy
{
//    NSString *cerPath = [[NSBundle mainBundle] pathForResource:@"ca" ofType:@"cer"];
//    NSData * certData =[NSData dataWithContentsOfFile:cerPath];
//    NSSet *certSet = [[NSSet alloc] initWithObjects:certData, nil];
    
    AFSecurityPolicy *securityPolicy = [AFSecurityPolicy policyWithPinningMode:AFSSLPinningModeNone];
    securityPolicy.allowInvalidCertificates = YES;
    securityPolicy.validatesDomainName = NO;
//    NSSet * certSet = [[NSSet alloc] initWithObjects:certData, nil];
//    [securityPolicy setPinnedCertificates:certSet];
    
    return securityPolicy;
}

+ (BOOL)isFullUrlWithOriginUrl:(NSString *)originUrl params:(NSDictionary *)params {
    
    BOOL isFullUrl = NO;
    if ([originUrl rangeOfString:@"https://"].location != NSNotFound || [originUrl rangeOfString:@"http://"].location != NSNotFound || [originUrl rangeOfString:@"www."].location != NSNotFound ) {
        isFullUrl = YES;
    }
    
    return isFullUrl;
}

+ (NSURLSessionDataTask *)requestWithURL:(NSString *)url
                               requestCode:(NSString *)requestCode
                                 isFormData:(BOOL)isFormData
                                     params:(NSDictionary *)params
                            httpMethod:(HttpRequsetType)requsetType
                             completedBlock:(CompletionBlock)completedBlock
                               failureBlock:(FailureBlock)failureBlock
 {
     NSMutableString *fullUrl;
     NSDictionary *newParams;
     //操作队列管理
     AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];

     if ([self isFullUrlWithOriginUrl:url params:params]) {
         fullUrl = [NSMutableString stringWithFormat:@"%@",url];
         newParams = params;
         manager.responseSerializer = [AFHTTPResponseSerializer serializer];
     } else {

         NSString *host = @"http://www.tbetios1.com";
         fullUrl = [NSMutableString stringWithFormat:@"%@%@",host,url];
         newParams = params;
         manager.responseSerializer = [AFJSONResponseSerializer serializerWithReadingOptions:NSJSONReadingMutableContainers];

     }
     
     NSLog(@"fullUrl = %@",fullUrl);
     //设置返回数据的解析方式
     NSURLSessionDataTask *requestOperation = nil;
     [manager setSecurityPolicy:[self customSecurityPolicy]];
     //设置超时时间
     [manager.requestSerializer willChangeValueForKey:@"timeoutinterval"];
     manager.requestSerializer.timeoutInterval = 20.f;
     [manager.requestSerializer didChangeValueForKey:@"timeoutinterval"];
     manager.requestSerializer.cachePolicy = NSURLRequestReloadIgnoringCacheData;
     
     manager.responseSerializer.acceptableContentTypes  = [NSSet setWithObjects:@"application/xml",@"text/xml",@"text/plain",@"application/json",@"text/html",@"text/javascript",nil];
     [manager.requestSerializer setValue:@"iPhone" forHTTPHeaderField:@"User-Agent"];

     // ///加密
     // NSDate *datenow = [NSDate date];
     // NSString *timeSp = [NSString stringWithFormat:@"%ld", (long)[datenow timeIntervalSince1970]];
     // NSString *keyStr = [NSString stringWithFormat:@"%@a9c13b4c8c1bd9352af14dc28ba37342",timeSp];
     // NSString *keyStrMD5 = [HDDESEncrypt md5:keyStr];
     // [manager.requestSerializer setValue:keyStrMD5 forHTTPHeaderField:@"key"];
     // [manager.requestSerializer setValue:timeSp forHTTPHeaderField:@"secret"];
     
     if (requsetType == RequsetTypeGet) {
         requestOperation = [manager GET:fullUrl parameters:newParams progress:^(NSProgress * _Nonnull downloadProgress) {
             
         } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
             
             if (completedBlock) {

                 completedBlock(responseObject);
             }
         } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
             if (failureBlock) {
                 failureBlock(error);
             }
         }];
     }
     else if (requsetType == RequsetTypePost){
         if (!isFormData) {  //没有文件
             requestOperation = [manager POST:fullUrl parameters:newParams progress:^(NSProgress * _Nonnull uploadProgress) {
                 
             } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
                 if (completedBlock) {
                     completedBlock(responseObject);
                 }
             } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
                 if (failureBlock) {
                     
                     failureBlock(error);
                 }
             }];
        } else { //如果参数中有文件
             requestOperation = [manager POST:fullUrl parameters:newParams constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
                 //构造body,告诉AF是什么类型的文件，单独添加文件到form表单
                 NSData *imgData = params[@"pic"];
                 if (imgData) {
                     [formData appendPartWithFileData:imgData
                                                 name:@"images"
                                             fileName:@"pic.jpg"
                                             mimeType:@"image/jpeg"];
                 }
             } progress:^(NSProgress * _Nonnull uploadProgress) {
                 
             } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
                 if (completedBlock) {
                     completedBlock(responseObject);
                 }
             } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
                 if (failureBlock) {
                     failureBlock(error);
                 }
             }];
        }
     }
 
     NSMutableDictionary *dic = [HttpRequest shareDictionary];
     if(requestOperation&&requestCode){
         
         [dic setObject:requestOperation forKey:requestCode];
     }
     return requestOperation;
 }

+ (NSURLSessionDataTask *)uploadWithURL:(NSString *)url
                             requestCode:(NSString *)requestCode
                                  params:(NSDictionary *)params
                          completedBlock:(CompletionBlock)completedBlock
                            failureBlock:(FailureBlock)failureBlock
{
    NSString *host = [[NSUserDefaults standardUserDefaults]objectForKey:@"Host"];
    NSMutableString *fullUrl = [NSMutableString stringWithFormat:@"%@%@",host,url];
    NSDictionary *newParams = nil;
    
    //操作队列管理
    AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
    //设置返回数据的解析方式
    NSURLSessionDataTask *requestOperation = nil;
    [manager setSecurityPolicy:[self customSecurityPolicy]];
    //设置超时时间
    manager.requestSerializer = [AFHTTPRequestSerializer serializer];
    manager.responseSerializer = [AFJSONResponseSerializer serializerWithReadingOptions:NSJSONReadingMutableContainers];
    manager.responseSerializer.acceptableContentTypes  = [NSSet setWithObjects:@"text/html",@"application/json",nil];

    requestOperation = [manager POST:fullUrl parameters:newParams constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
        
        //构造body,告诉AF是什么类型的文件，单独添加文件到form表单
        UIImage *image = params[@"pic"];
        NSString *imageName = params[@"imageName"];
        NSData *imgData = UIImageJPEGRepresentation(image, 1);
        NSInteger dataLength = imgData.length;
        CGFloat rate = 1.0;
        if (dataLength >= 1000 * 1000 * 5) {
            rate = 1000.0 * 1000.0 * 5.0 / dataLength;
        } else if (dataLength >= 1000 * 1000 * 2 && dataLength < 1000 * 1000 * 5) {
            rate = 0.7;
        } else {
            rate = 1.0;
        }
        NSData *result = UIImageJPEGRepresentation(image, rate);

        if (result) {
            [formData appendPartWithFileData:result
                                        name:@"upload_pic"
                                    fileName:imageName
                                    mimeType:@"image/jpeg"];
        }
    } progress:^(NSProgress * _Nonnull uploadProgress) {
        
    } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
        if (completedBlock) {
            completedBlock(responseObject);
        }
    } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
        if (failureBlock) {
            failureBlock(error);
        }
    }];
    
    NSMutableDictionary *dic = [HttpRequest shareDictionary];
    [dic setObject:requestOperation forKey:requestCode];
    
    return requestOperation;
}
 
+(NSMutableDictionary *)shareDictionary
{
    static dispatch_once_t onceToken;
    static NSMutableDictionary *dic = nil;
    dispatch_once(&onceToken, ^{
        dic = [NSMutableDictionary dictionaryWithCapacity:1];
    });
    return dic;
}


+ (void)cancelRequestWithAPlCode:(NSString *)code
{
    if(code==nil){
        
        return;
    }
    NSMutableDictionary *dic = [HttpRequest shareDictionary];
    NSURLSessionDataTask *operation = dic[code];
    
    if ( operation ) {
        
        [operation cancel];
        [dic removeObjectForKey:code];

        operation = nil;
    }
}
@end
