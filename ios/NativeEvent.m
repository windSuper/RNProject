//
//  NativeEvent.m
//  TBetRN
//
//  Created by Ric on 7/9/17.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "NativeEvent.h"

@interface NativeEvent()

@property (nonatomic , assign)CGFloat  sizeM;

@end

@implementation NativeEvent

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getCacheSize:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self folderSize];
  RCTLogInfo(@"cacheSize=%f",self.sizeM);
  NSString *size = [NSString stringWithFormat:@"%.1fM",self.sizeM];
  resolve(@[size]);
  
}


RCT_EXPORT_METHOD(removeCacheSize:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  [self removeCache];
  resolve(@[@"0M"]);
}


// 缓存大小
- (void)folderSize{
  
  
  
  dispatch_async(dispatch_get_global_queue(0, 0), ^{
    
    CGFloat folderSize = 0.0;
    
    //获取路径
    NSString *cachePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory,NSUserDomainMask,YES)firstObject];
    
    //获取所有文件的数组
    NSArray *files = [[NSFileManager defaultManager] subpathsAtPath:cachePath];
    
    for(NSString *path in files) {
      
      NSString*filePath = [cachePath stringByAppendingString:[NSString stringWithFormat:@"/%@",path]];
      
      //累加
      folderSize += [[NSFileManager defaultManager]attributesOfItemAtPath:filePath error:nil].fileSize;
    }
    NSLog(@"文件数：%f",folderSize/1024/1024);
    
    dispatch_async(dispatch_get_main_queue(), ^{
      
      //转换为M为单位
      self.sizeM = folderSize/1024/1024;
    });
  });
}

- (void)removeCache
{
  //===============清除缓存==============
  //获取路径
  NSString*cachePath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory,NSUserDomainMask,YES)objectAtIndex:0];
  
  //返回路径中的文件数组
  NSArray*files = [[NSFileManager defaultManager]subpathsAtPath:cachePath];
  
  NSLog(@"文件数：%ld",[files count]);
  for(NSString *p in files){
    NSError*error;
    
    NSString*path = [cachePath stringByAppendingString:[NSString stringWithFormat:@"/%@",p]];
    
    if([[NSFileManager defaultManager]fileExistsAtPath:path])
    {
      BOOL isRemove = [[NSFileManager defaultManager]removeItemAtPath:path error:&error];
      if(isRemove) {
        NSLog(@"清除成功");
        
      }else{
        
        NSLog(@"清除失败");
        
      }
    }
  }
  self.sizeM = 0;
}


@end
