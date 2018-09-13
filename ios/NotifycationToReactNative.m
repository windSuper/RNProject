//
//  NotifycationToReactNative.m
//  TBetRN
//
//  Created by Ric on 7/9/17.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "NotifycationToReactNative.h"

@implementation NotifycationToReactNative

RCT_EXPORT_MODULE();

- (id)init{
  
  self = [super init];
  if(self){
    [[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(showDetailPromtionsNotify:) name:@"TapADImage" object:nil];
  }
  return self;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"ShowDetailPromtions"];
}

- (void)showDetailPromtionsNotify:(NSNotification *)notification
{
  NSDictionary *eventName = notification.object;
  [self sendEventWithName:@"ShowDetailPromtions" body:@{@"name": eventName}];
}


@end
