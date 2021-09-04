# rollup-plugin-tiny-livereload
[WIP] rollup plugin for live reload

## How to use

[NOTICE] This plugin does not have a static server. so combine this plugin with your favorite server.

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
