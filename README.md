> **WIP :warning: The package is still in development stage**

**Do help with your awesome contributions and issues**

<p align="center" >
    <img src="https://imgur.com/A2YgC4S.png" width="400px" />
</p>
<h1  align="center"> webpack-plugin-bundlesize </h1>
<h1  align="center"> Micro Plugins for webpack-plugin-bundlesize  </h1>



<p align="center" >
This branch supports the development and implementation of micro plugins in this webpack plugin
More like a concept kind of thing
</p>



:smile:


## Usage
1. **Installation**
```bash
$ npm i npm i anikethsaha/webpack-plugin-bundlesize#micro-plugin-development --save-dev

**If not installed in this way then**

better clone the `micro-plugin-developement` branch , link it then use it


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
    sizeLimit : your-size-in-KB // Default is 10 KB,
    microPlugins : [
        // Your sweet little micro plugins here ....
    ]
}
```


# Micro Plugin Development Guide
## Refer the `examples/micro-plugins for some examples`

Instead of **`apply`** method for webpack plugins, I changed it to **`commit`** method

List of hooks available for this (as of now)
- `onSizeExceed`

```js
microHandlerResponse.onSizeExceed.tap("WebpackSizeExceedMicroPLugin",res => {
    console.log("res",res)
})
```

- `onSizeSafe`

```js
microHandlerResponse.onSizeSafe.tap("WebpackSizeSafeMicroPLugin",res => {
    console.log("res",res)
})
```

- `onSizeWarn`
```js
microHandlerResponse.onSizeWarn.tap("WebpackSizeWarnMicroPLugin",res => {
    console.log("res",res)
})
```


**Few More comming soon like beforeRun,error etc...**




## TODO
- Better Structure May be !
- [ ] Typescript Migration
