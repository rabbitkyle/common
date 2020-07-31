# vue使用遇到的问题以及解决方法

## data更新后，要在dom渲染完成后执行一些操作
```js
this.renderData = requestData;
this.$nextTick(function () {
 // TODO something
});
```

## 父子组件默认值传递(@Prop)
```js
// 数组类型默认值设置
@Prop({default() { return ['请选择', '请选择', '请选择']}}) selectText!: any[];

// 字符串类型默认值设置
@Prop({default: '/'}) split!: string;
```

## 组件封装问题

### 使用v-model
***将其 value 特性绑定到一个名叫 value 的 prop 上
***在其事件被触发值改变时，将新的值通过自定义的 input 事件抛出
```js
 @Prop(Array) value!: any[];
 @Watch('showValue')
private watchValue(newVal:any, oldVal:any) {
    this.$emit('input', this.formatValue(true));
}
```

## element-ui当form里面只有一个el-form-item时里面嵌套的el-input点击回车会默认触发提交
```html
<!-- 方案1 -->
<el-form :inline="true" @submit.native.prevent>
<!-- 方案2  -->
 <el-form>
  <el-form-item label="登记信息:"></el-form-item>
  <el-form-item label="登记信息:"></el-form-item>
 </el-form>
```

## scrollBehavior router滑动行为可以完全的被定制化处理 - 甚至为每次路由进行定制也可以满足
```ts
export default new Router({
  // mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  },
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue'),
    },
  ],
});
```
