# rollup-plugin-tiny-livereload
[WIP] rollup plugin for live reloading on devel

## How to use

``NOTICE:`` This plugin does not have a static server for built bundle(s).

```javascript
// rollup.config.js
import tinyLivereload from 'rollup-plugin-tiny-livereload';


const production = !process.env.ROLLUP_WATCH;

export default {
  // ...
  plugins: [
    // ...
    !production && serve(),
    !production && tinyLivereload(),
  ]
}
```
