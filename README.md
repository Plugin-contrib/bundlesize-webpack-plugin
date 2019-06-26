> **WIP :warning: The package is still in development stage**

## Please Check the [Micro-Plugin Development branch](https://github.com/anikethsaha/webpack-plugin-bundlesize/tree/micro-plugin-development) For details about micro plugins
**Micro Plugins is still in WIP too would love the feedback over that**

<p align="center" >
    <img src="https://imgur.com/A2YgC4S.png" width="400px" />
</p>
<h1  align="center"> webpack-plugin-bundlesize </h1>

<p align="center" >
Checks your bundle size and Better warnings and suggestions

</p>




## Usage
1. **Installation**
```bash
$ npm i webpack-plugin-bundlesize
```

2. In your webpack config
**webpack.config.js** (Your webpack config file)
```js
const webpackBundleSize = require("webpack-plugin-bundlesize")

...
    plugins: [
        new webpackBundleSize(options),
        ...
    ],

...  // rest of your configuration

```

3. `Options` - Optional
```js
{
    sizeLimit : your-size-in-KB // Default is 10 KB
}
```



## TODO
- [ ] To implement the current in watchRun hook

- [ ] To recommend some optimizations when size exceeding

- [ ] To implement the logo and make the looks better

- [ ] To suggest optmizations
   - [ ] read the config and check whether the splitchunk is implemented or not
   - [ ] Minify plugin
   - [ ] Codespliting suggestion

- [ ] Typescript Migration
