import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  data = [
    {
      show: true,
      title: '平台宗旨',
      content:
        '建立一個專門收集黑心房東或地雷房飯店名宿的平台，讓正要租房的人免於成為受害者。因小弟至今有太多遇到不好的房東而吃虧的經驗，加上最近看到太多新聞報導房東違規、最壞還導致傷亡，因此發揮一下小小碼農的長才，希望透過大家的幫忙一起改善租房的大環境，回饋社會！',
    },
    {
      show: true,
      title: '平台規章',
      content:
        '本平台不對使用者之評論或留言進行事前審查，但若經過查證或是檢舉，將會保留刪除留言或評論之權利。希望大大們所有的發言都應該是從個人經驗出發，並以誠實為前提分享。若刻意散佈不實謠言，須對自己發表的言論負完全責任。站方也同時保留刪除已發佈貼文之權利。<br/><br/><ul><li>無意義的字詞與謾罵</li><li>內容意圖詆毀或傳播仇恨</li><li>評論已經查證為虛假的數據或消息</li><li>不可發與租房和飯店不相干的文章</li></ul>',
    },
    {
      show: true,
      title: '聯絡方式',
      content:
        '由於是小弟抓空擋時間做的，如有任何問題麻煩各位大大告知，多多包涵，感謝各位大大！！</br></br>信箱： housetalkertw@gmail.com ',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  changeShowState(item: any) {
    item.show = !item.show;
  }
}
