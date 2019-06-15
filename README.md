# rc-fit-text

> 重写下[react-fittext](https://github.com/gianu/react-fittext)组件

## 使用

* 安装依赖

```
yarn add rc-fit-text
```

* 组件中使用

```
import FitText form 'rc-fit-text';

<FitText> 
  <h2>Test React Fit Text</h2> 
</FitText>
```

## Props

### compressor

* 描述: 你可以调整这个变量来增加/减少字体大小
* 默认值: 1

### minFontSize

* 描述: 此组件应使用的最小的字体大小
* 默认值: `Number.NEGATIVE_INFINITY`

### maxFontSize

* 描述: 此组件应使用的最大的字体大小
* 默认值: `Number.POSITIVE_INFINITY`
