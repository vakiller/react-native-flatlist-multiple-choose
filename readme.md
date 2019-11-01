# React Native Flatlist Multiple Choose
[ ![NPM version](http://img.shields.io/npm/v/react-native-check-box.svg?style=flat)](https://www.npmjs.com/package/react-native-flatlist-multiple-choose)

![](Demo.gif) ![](DemoAndroid.gif)

## Content

- [Installation](#installation)
- [Getting started](#getting-started)
- [Contribution](#contribution)

## Installation

* 1.Run `npm i react-native-flatlist-multiple-choose --save`
* 2.`import {FlatlistMultipleChoose} from 'react-native-flatlist-multiple-choose';`

## Getting started  

Add `react-native-flatlist-multiple-choose` to your js file.   

`import {FlatlistMultipleChoose} from 'react-native-flatlist-multiple-choose` 

```javascript
<FlatlistMultipleChoose itemStyle={{margin : 10,borderColor : '#f3f3f3',borderBottomWidth : 0.8}}  
    extraData={context.state} 
    data={context.state.missionAddress[this.state.missionsList.key].missions}
    onChangeDatasChoosed={(data) => this.setState({ selectedMission: data })} 
    customItem={<MissionHolder navigationKey={this.props.navigation.state.key} />} />
```

- customItem is where you you can set you item of you "Flatlist Multiple Choose"

- onChangeDatasChoosed is a callback function when "Flatlist Multiple Choose" return an array include all of your selected item every time after user choose an item


