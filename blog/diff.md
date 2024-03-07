```JavaScript
    function reconcileSingleElement(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    element: ReactElement,
    lanes: Lanes,
  ): Fiber {
    const key = element.key; // 获取React element元素上的key属性
    let child = currentFirstChild; // current树上的Fiber节点
    while (child !== null) {
      // current树已经被渲染在屏幕上
      // 通过current树上的Fiber节点的key属性与新生成的React element元素上的key属性对比，
      // 如果不相等，则会把该节点对应的current树上的Fiber对象添加到父Fiber的deletions属性中
      // 并且在flags集合中添加删除标识，然后根据新创建的React element元素创建新的Fiber节点
      // 在commit阶段会根据flags集合中是否添加删除标识，去拿出deletions属性中添加的Fiber对象，
      // 将Fiber对象对应的旧的dom节点包括它下面所有的子节点全部删除，然后将新的节点插入到页面中
      // 如果相等，则会复用之前current树上相对应的fiber，并使用最新的props更新fiber上的pendingProps属性
      // 在commit阶段会更新dom节点
      if (child.key === key) {
        const elementType = element.type;
        if (elementType === REACT_FRAGMENT_TYPE) {
          if (child.tag === Fragment) {
            deleteRemainingChildren(returnFiber, child.sibling);
            const existing = useFiber(child, element.props.children);
            existing.return = returnFiber;
            ...
            return existing;
          }
        } else {
          // key相等，通过current树上的Fiber节点的elementType属性与新生成的React element元素上的type属性对比,判断类型是否相同
          // 如果不相等，则会把该节点对应的current树上的Fiber对象添加到父Fiber的deletions属性中
          // 并且在flags集合中添加删除标识，然后根据新创建的React element元素创建新的Fiber节点
          // 在commit阶段会根据flags集合中是否添加删除标识，去拿出deletions属性中添加的Fiber对象，
          // 将Fiber对象对应的旧的dom节点包括它下面所有的子节点全部删除，然后将新的节点插入到页面中
          // 如果相等，则会复用之前current树上相对应的fiber，并使用最新的props更新fiber上的pendingProps属性
          // 在commit阶段会更新dom节点
          if (
            child.elementType === elementType ||
            (__DEV__
              ? isCompatibleFamilyForHotReloading(child, element)
              : false) ||
            (enableLazyElements &&
              typeof elementType === 'object' &&
              elementType !== null &&
              elementType.$$typeof === REACT_LAZY_TYPE &&
              resolveLazy(elementType) === child.type)
          ) {
            deleteRemainingChildren(returnFiber, child.sibling);
            // 复用之前current树上相对应的fiber，并使用最新的props更新fiber上的pendingProps属性
            const existing = useFiber(child, element.props);
            existing.ref = coerceRef(returnFiber, child, element);
            existing.return = returnFiber;
           
            return existing;
          }
        }
        // Didn't match.
        deleteRemainingChildren(returnFiber, child);
        break;
      } else {
        deleteChild(returnFiber, child);
      }
      child = child.sibling;
    }

    // 当key或者类型不相等时，会根据新创建的React element元素创建新的Fiber节点
    ...
    const created = createFiberFromElement(element, returnFiber.mode, lanes);
    created.ref = coerceRef(returnFiber, currentFirstChild, element);
    created.return = returnFiber;
    return created;
  }

```