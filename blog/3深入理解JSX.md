# 疑问
1、JSX和虚拟DOM是同一个东西吗？
在组件mout时，Reconciler根据JSX描述的组件内容生成组件对应的虚拟DOM。
在update时，Reconciler将JSX与虚拟DOM保存的数据对比，生成组件对应的虚拟DOM，并根据对比结果为虚拟DOM打上标记。

2、React Component、React Element是同一个东西么，他们和JSX有什么关系？
React Component是React Element一个子集，JSX会在编译时被babel编译成React Element

# JSX简介
JSX在编译时会被babel编译为React.createElement方法

<!-- react 函数组件 -->
class AppClass extends React.Component {
  render() {
    return <p>KaSong</p>
  }
}
<!-- class组件对应的React Element -->
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {},
  ref: null,
  type: ƒ AppClass(),
  _owner: null,
  _store: {validated: false},
  _self: null,
  _source: null 
}


<!-- react 函数组件 -->
function AppFunc() {
  return <p>KaSong</p>;
}
<!-- 函数组件对应的React Element -->
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {},
  ref: null,
  type: ƒ AppFunc(),
  _owner: null,
  _store: {validated: false},
  _self: null,
  _source: null 
}

# JSX与虚拟DOM
JSX是一种描述当前组件内容的数据结构，但他不包含组件schedule、reconcile、render所需的相关信息。

比如如下信息就不包括在JSX中：
1、组件在更新中的优先级
2、组件的state
3、组件被打上的用于Renderer的标记

上面内容都都包含在虚拟DOM中，
所以在组件mout时，Reconciler根据JSX描述的组件内容生成组件对应的虚拟DOM。
在update时，Reconciler将JSX与虚拟DOM保存的数据对比，生成组件对应的虚拟DOM，并根据对比结果为虚拟DOM打上标记。