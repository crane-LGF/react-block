https://juejin.cn/post/7018068359392526350

```javascript
// beginWork的工作是传入当前Fiber节点，创建子Fiber节点
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {

  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  if (current !== null) {
    // ...省略

    // 复用current
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderLanes,
    );
  } else {
    didReceiveUpdate = false;
  }

  // mount时：根据tag不同，创建不同的子Fiber节点
  switch (workInProgress.tag) {
    case IndeterminateComponent: 
      // ...省略
    case LazyComponent: 
      // ...省略
    case FunctionComponent: 
      // ...省略
    case ClassComponent: 
      // ...省略
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      updateClassComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes,
      )
    case HostRoot:
      // ...省略
    case HostComponent:
      // ...省略
    case HostText:
      // ...省略
    // ...省略其他类型
  }
}

function updateClassComponent(
  current: Fiber | null,
  workInProgress: Fiber,
  Component: any,
  nextProps: any,
  renderLanes: Lanes,
){
  // 
  const instance = workInProgress.stateNode;

  //根据组件stateNode（组件实例）的值是否为null，以此来判断应该创建组件还是更新组件
  if (instance === null) {
    if (current !== null) {
      current.alternate = null;
      workInProgress.alternate = null;
      workInProgress.flags |= Placement;
    }
    // 实例化组件，将组件实例与对应的fiber节点相关联
    constructClassInstance(workInProgress, Component, nextProps);
    // 将fiber上的state和props更新至组件实例上
    // 并且会检查是否声明了getDerivedStateFromProps生命周期函数
    // 有的话则会调用并且使用getDerivedStateFromProps生命周期函数中返回的state来更新组件实例上的state
    // 检查是否声明了componentDidmount生命周期，有的话则会收集标示添加到fiber的flags属性上
    mountClassInstance(workInProgress, Component, nextProps, renderLanes);
    // 创建组件肯定是需要更新的，所以直接为shouldUpdate赋值为true
    shouldUpdate = true;
  } else if (current === null) {
    shouldUpdate = resumeMountClassInstance(
      workInProgress,
      Component,
      nextProps,
      renderLanes,
    );
  } else {
    // 更新组件-updateClassInstance函数：
    // 调用生命周期：getDerivedStateFromProps，componentWillReceiveProps，shouldComponentUpdate，componentWillUpdate
    // 执行更新队列，把将要更新的state的值与老的state的值进行合并，合并完成和会把新的state的值挂载到workInProgress.memoizedState属性上
    // 使用新的值分别更新组件实例中props，state的值
    // 收集Effect：会判断当前类组件是否声明了生命周期函数：componentDidUpdate，getSnapshotBeforeUpdate，
    // 声明了则会将相对应的flag添加到当前fiber节点的flags属性上
    shouldUpdate = updateClassInstance(
      current,
      workInProgress,
      Component,
      nextProps,
      renderLanes,
    );
  }

}

```