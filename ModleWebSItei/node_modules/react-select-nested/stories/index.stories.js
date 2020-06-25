import React from 'react';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

import {Button, Welcome} from '@storybook/react/demo';
import Select from '../src/SxSelect/SxSelect';

const filterOptions = [{
  val: 'age',
  label: 'Age',
  items: [{val: '18-24', label: '18 - 24', parentVal: 'age'}, {
    val: '25-34',
    label: '25 - 34',
    parentVal: 'age'
  }, {val: '35', label: '35 and over', parentVal: 'age'}]
}, {
  val: 'gender',
  label: 'Gender',
  items: [{val: 'female', label: 'Female', parentVal: 'gender'}, {
    val: 'male',
    label: 'Male',
    parentVal: 'gender'
  }, {val: 'other', label: 'Other', parentVal: 'gender'}]
}];

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')}/>);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add('2 level select', () => <div style={{width: '50%', margin: '0 auto'}}>
    <Select
      placeholder="Select filter..."
      list={filterOptions}
      onSelectChange={() => {
      }}
    />
                               </div>);
