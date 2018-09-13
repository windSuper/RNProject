//
//  AES.h
//  tbetplatform
//
//  Created by Ric on 14/4/2017.
//  Copyright © 2017 Ric. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AES : NSObject

+(NSData *)AES256ParmEncryptWithKey:(NSString *)key Encrypttext:(NSData *)text;

+ (NSData *)AES256ParmDecryptWithKey:(NSString *)key Decrypttext:(NSData *)text;

//主要使用这个加密
+(NSString *) aes256_encryKey:(NSString *)key Encrypttext:(NSString *)text;

//主要使用这个解密
+(NSString *) aes256_decryptKey:(NSString *)key Decrypttext:(NSString *)text;

@end
