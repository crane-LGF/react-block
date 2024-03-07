```javascript
// element App组件
// container document.getElementById('root')
// callback  () => {}
function render(element, container, callback) {
  return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
}
```