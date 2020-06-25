import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubMenu.module.scss';
import SubMenuListItem from './SubMenuListItem';

const SubMenu = ({data, selectedItems, handleMouseLeave, handleClick, reset}) => {

  return (<ul className={styles.sxSubDropdownList} onMouseLeave={handleMouseLeave}>
    {
      data.items.map((item) => {
        const isSelected = selectedItems.includes(item);
        const {parent} = data;
        const itemProps = {item, isSelected, handleClick, parent, reset};
        return (<SubMenuListItem key={item.val} {...itemProps}/>)
    })
    }
          </ul>);

};

SubMenu.propTypes = {
  data: PropTypes.shape({
    parent: PropTypes.object,
    items: PropTypes.array
  }),
  selectedItems: PropTypes.array,
  handleMouseLeave: PropTypes.func,
  handleClick: PropTypes.func,
  reset: PropTypes.func
};

export default SubMenu;