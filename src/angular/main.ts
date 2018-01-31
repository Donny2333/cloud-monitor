// 不显示引入，你会得到"Uncaught reflect-metadata shim is required when using class decorators"的错误
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

// 引入NgModule装饰器
import { NgModule } from '@angular/core';

// 引入浏览器模块
import { BrowserModule } from '@angular/platform-browser';

// 引入启动器
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// 引入我们刚才创建的第一个component
import { AppComponent } from './components/App';

// 声明一个应用模块
@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
class AppModule {}

//启动应用
platformBrowserDynamic().bootstrapModule(AppModule);
