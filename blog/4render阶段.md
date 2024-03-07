render阶段开始于performSyncWorkOnRoot或performConcurrentWorkOnRoot方法的调用。这取决于本次更新是同步更新还是异步更新

```javascript
let workInProgress = null;
// performSyncWorkOnRoot会调用该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

// performConcurrentWorkOnRoot会调用该方法
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) { //如果当前浏览器帧没有剩余时间，shouldYield会中止循环，直到浏览器有空闲时间后再继续遍历。
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(unitOfWork){

    let next;

    next = beginWork()

    if(next===null){
      completeUnitOfWork(unitOfWork);
    }else{
      workInProgress = next
    }
}

```
同步更新和异步更新的区别：异步更新中，如果当前浏览器帧没有剩余时间，shouldYield会中止循环，直到浏览器有空闲时间后再继续遍历。

workInProgress代表当前已创建的workInProgress fiber。

performUnitOfWork方法会创建下一个Fiber节点并赋值给workInProgress，并将workInProgress与已创建的Fiber节点连接起来构成Fiber树。

# "递"阶段
首先从rootFiber开始向下深度优先遍历，给每个Fiber节点调用beginWork创建子Fiber节点，当遍历到叶子节点时就会进入“归阶段”

# "归"阶段
当某个Fiber节点执行完completeWork，如果其存在兄弟Fiber节点（即fiber.sibling !== null），会进入其兄弟Fiber的“递”阶段。
如果不存在兄弟Fiber，会进入父级Fiber的“归”阶段。