//
//  ADScrollView.m
//  tbetplatform
//
//  Created by Ric on 30/8/17.
//  Copyright © 2017年 Ric. All rights reserved.
//

#import "ADScrollView.h"

@interface ADScrollView()<UIScrollViewDelegate>

{
    UIButton *_countDownBtn;
    dispatch_source_t _timer;
}

@end

@implementation ADScrollView

- (id)initWithFrame:(CGRect)frame{
    
    self = [super initWithFrame:frame];
    if(self){
      [self addSubview:self.contentScrollView];
    }
    return self;
    
}

-(UIScrollView *)contentScrollView{
    
    if(!_contentScrollView){
        
        _contentScrollView=[[UIScrollView alloc]initWithFrame:CGRectMake(0, 0, k_SCREEN_WIDTH, k_SCREEN_HEIGHT)];
        _contentScrollView.delegate = self;
        _contentScrollView.pagingEnabled=YES;
    }
    return _contentScrollView;
}

- (void)setDataArr:(NSArray *)dataArr{
    
    _dataArr=dataArr;
    _contentScrollView.contentSize=CGSizeMake(k_SCREEN_WIDTH*dataArr.count, k_SCREEN_HEIGHT);
    for (int i=0;i<dataArr.count;i++) {
        NSDictionary *dic = dataArr[i];
        
        UIImageView *imgView = [[UIImageView alloc]initWithFrame:CGRectMake(k_SCREEN_WIDTH*i, 0, k_SCREEN_WIDTH, k_SCREEN_HEIGHT)];
        imgView.tag = 999999+i;
        imgView.userInteractionEnabled = YES;
        [imgView sd_setImageWithURL:[NSURL URLWithString:dic[@"diff_img"]]];
        
        UITapGestureRecognizer *tap = [[UITapGestureRecognizer alloc]initWithTarget:self action:@selector(selectedAdAction:)];
        [imgView addGestureRecognizer:tap];
        
        [_contentScrollView addSubview:imgView];
    }
    
    _countDownBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    _countDownBtn.titleLabel.font = [UIFont systemFontOfSize:14];
    [_countDownBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    [_countDownBtn setTitle:@"跳过5s" forState:UIControlStateNormal];
    [_countDownBtn setBackgroundColor:k_RegisterBGColor];
    _countDownBtn.frame = CGRectMake(k_SCREEN_WIDTH-85, 40, 70, 30);
    _countDownBtn.layer.cornerRadius = 10;
    _countDownBtn.clipsToBounds = YES;
    [_countDownBtn addTarget:self action:@selector(removeADView) forControlEvents:UIControlEventTouchUpInside];
    [self addSubview:_countDownBtn];
    [self bringSubviewToFront:_countDownBtn];
    [self countDownTimeAction];
}


- (void)countDownTimeAction{
    
    __block int count = 6;
    
    // 获得队列
    dispatch_queue_t queue = dispatch_get_main_queue();
    
    // 创建一个定时器(dispatch_source_t本质还是个OC对象)
    _timer = dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, queue);
    
    // 设置定时器的各种属性（几时开始任务，每隔多长时间执行一次）
    // GCD的时间参数，一般是纳秒（1秒 == 10的9次方纳秒）
    // 何时开始执行第一个任务
    dispatch_time_t start = dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC));
    uint64_t interval = (uint64_t)(1.0 * NSEC_PER_SEC);
    dispatch_source_set_timer(_timer, start, interval, 0);
    
    // 设置回调
    WEAK_SELF;
    dispatch_source_set_event_handler(_timer, ^{
        count--;
        [_countDownBtn setTitle:[NSString stringWithFormat:@"跳过%ds",count] forState:UIControlStateNormal];
        if (count == 0) {
            [weak_self removeADView];
        }
    });
    
    // 启动定时器
    dispatch_resume(_timer);
}

- (void)removeADView{
    
    dispatch_cancel(_timer);
    _timer = nil;
    [self removeFromSuperview];
}


- (void)selectedAdAction:(UIGestureRecognizer *)gesture{
    
    UIView *selectedView = gesture.view;
    NSInteger index = selectedView.tag-999999;
    NSDictionary *dic = self.dataArr[index];
//    NSString *notifStr= [NSString parseNSDictionaryToJSONString:dic];
    [[NSNotificationCenter defaultCenter]postNotificationName:@"TapADImage"
                                                       object:dic];
    [self removeADView];
}


- (void)scrollViewDidScroll:(UIScrollView *)scrollView{
    
    CGFloat offsetX = scrollView.contentOffset.x;
    if (offsetX>(self.dataArr.count-1)*k_SCREEN_WIDTH+80) {
        [self removeADView];
    }
}

@end
