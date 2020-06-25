# React-Select-Nested

Yet another Select control for [React](https://reactjs.com). It allows building nested selects.

![](https://github.com/sirbob/media-lib/blob/master/react-select-nested.gif)


```
npm i react-select-nested --save
```

Then use it in your app:

```js

import React, { Component } from 'react';
import Select from 'react-select-nested';

class App extends Component {
  render() {

      const fruit = [
          {
              val: 0,
              label: 'Apple'
          },
          {
              val: 1,
              label: 'Orange',
              items: [{parentVal: 1, val: 7, label: 'sub item 1'}, {{parentVal: 1, val: 8, label: 'sub item 2'}]
          },
          {
              val: 2,
              label: 'Grape',
              items: [{parentVal: 2, val: 5, label: 'sub item 3'}, {parentVal: 2, val: 6, label: 'sub item 4'}]
          },
          {
              val: 3,
              label: 'Pomegranate',
              items: [{parentVal: 3, val: 9, label: 'sub item 5'}, {parentVal: 3, val: 10, label: 'sub item 6'}]
          },
          {
              val: 4,
              label: 'Strawberry',
          }
      ];

      return (
          <div>
              <Select
                  placeholder="Select fruit"
                  list={fruit}
                  onSelectChange={(item)=>console.log('use your custom handler here', item)}
              />
          </div>
      );
  }
}

export default App;

```