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