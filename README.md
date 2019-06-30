> **WIP :warning: The package is still in development stage**

**Do help with your awesome contributions and issues**

**Micro Plugins is still in WIP too would love the feedback over that**


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

<p align="center" >
    <img src="https://imgur.com/yA8RpjI.png" />
</p>


2. In your webpack config
**webpack.config.js** (Your webpack config file)


<p align="center">
<img src="https://imgur.com/ZaKqM28.png" alt="code" />
</p>


3. `Options` - Optional



<p align="">
<img src="https://imgur.com/e3o3SIn.png" alt="code" />
</p>




# Micro Plugin Development Guide
## Refer the `examples/micro-plugins for some examples`

Instead of **`apply`** method for webpack plugins, I changed it to **`commit`** method

List of hooks available for this (as of now)
- `onSizeExceed`


<img src="https://imgur.com/O75j2Zd.png" alt="code" />



- `onSizeSafe`


<img src="https://imgur.com/3lQkRQH.png" alt="code" />




- `onSizeWarn`

<img src="https://imgur.com/UcI4mJF.png" alt="code" />


**Few More comming soon like beforeRun,error etc...**




## TODO
- [ ] Monorepo(s) for builtin microplugin

- [ ] Typescript Migration

- [ ] To implement the current in watchRun hook

- [ ] To recommend some optimizations when size exceeding - **MicroPlugin**

- [ ] To implement the logo and make the looks better

- [ ] To suggest optmizations **MicroPlugin List**

   - [ ] read the config and check whether the splitchunk is implemented or not
   
   - [ ] Minify plugin
   
   - [ ] Codespliting suggestion
