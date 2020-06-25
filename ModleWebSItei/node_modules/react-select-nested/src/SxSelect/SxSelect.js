import React, {Component} from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import styles from './SxSelect.module.scss'
import SubMenu from './SubMenu/SubMenu';

class SxSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      placeholder: this.props.placeholder,
      showSubMenu: false,
      subMenuData: {parent: null, items: []},
      selectedItems: []
    };
    this.selectRef = React.createRef();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
    this.handleSubMenuMouseExit = this.handleSubMenuMouseExit.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.selectSubItem = this.selectSubItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetSelectedItems = this.resetSelectedItems.bind(this);

  }

  handleClickOutside() {
    this.setState({
      listOpen: false,
      showSubMenu: false,
      subMenuData: {parent: null, items: []}
    })
  }

  selectItem = (item) => {
    if (!item.items || !item.items.length) {
      this.setState({
        placeholder: item.label,
        listOpen: false,
        selectedItems: [item]
      });
      this.handleChange(item);
    }
  };

  selectSubItem = (item, parent) => {
    this.setState({
      placeholder: `${parent.label}: ${item.label}`,
      selectedItems: [item, parent],
      listOpen: false
    });

    this.handleChange(item);
  };

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  };


  resetSelectedItems() {
    this.setState({selectedItems: [], placeholder: this.props.placeholder});
  }

  handleChange(item) {
    this.props.onSelectChange(item);
  }

  handleSubMenuMouseExit() {
    this.setState({showSubMenu: false})
  }

  handleMouseEnter(item) {
    this.setState({subMenuData: {parent: null, items: []}, showSubMenu: false});
    if (item.items && item.items.length) {
      this.setState({
        subMenuData: {parent: item, items: item.items},
        showSubMenu: true
      });
    }
  }

  handleMouseExit() {
    if (!this.state.showSubMenu) {
      this.setState({showSubMenu: false});
    }
  }

  render() {
    const {list} = this.props;
    const {listOpen, placeholder, selectedItems} = this.state;
    console.log('placeholder', placeholder);
    const crossIcon = <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"
                           className={styles.cross} onClick={this.resetSelectedItems}>
      <path
        d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"/>
                      </svg>;
    const isSubmenuOn = this.state.showSubMenu && listOpen;
    return (
      <div className={styles.sxSelectMain}>
        <div className={styles.sxSelectWrapper}>
          <div className={styles.sxSelectHeader} onClick={this.toggleList}>
            <div className={styles.sxSelectPlaceholder}>{placeholder}</div>
            <div className={styles.separatorWrapper}>
              {crossIcon}
              <span className={styles.indicatorSeparator}/>
              <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false"
                   className={styles.chevron}>
                <path
                  d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"/>
              </svg>
            </div>
          </div>
          <div className={styles.sxSelectListsWrapper}>
            {listOpen && <ul className={styles.sxDropdownList} ref={this.selectRef}>
              {list.map((item) => (

                <li
                  className={selectedItems.includes(item) ? 'sxSelected ' + styles.sxListItemSelected : styles.sxListItem}
                  key={item.val}
                  onMouseEnter={() => {
                    this.handleMouseEnter(item)
                  }}
                  onMouseLeave={this.handleMouseExit}

                  onClick={() => this.selectItem(item)}><span
                  className={styles.sxListItemLabel}>{item.label}
                                                        </span>
                  {(item.items && item.items.length) ?
                    <svg className={styles.gt} height="20" width="20" transform="rotate(-90)"
                         viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                      <path
                        d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"/>
                    </svg> : null}
                </li>
              ))}
                         </ul>}
            {isSubmenuOn &&
            <SubMenu data={this.state.subMenuData} x={this.state.subMenuX} y={this.state.subMenuY}
                     h={this.state.subMenuH} selectedItems={this.state.selectedItems}
                     handleMouseLeave={this.handleSubMenuMouseExit} handleClick={this.selectSubItem}
                     reset={this.resetSelectedItems}/>}
          </div>
        </div>
      </div>
    )
  }

}

SxSelect.propTypes = {
  placeholder: PropTypes.string,
  onSelectChange: PropTypes.func,
  list: PropTypes.array
};

export default onClickOutside(SxSelect);