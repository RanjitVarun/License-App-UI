import React from 'react'
import PropTypes from 'prop-types';

class Multiselect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      checkedItems: [],
      dropDownValue: [],
      multiSelectValue: false,
      checkedItemsValue: false
    }
    this.checkBox = this.checkBox.bind(this);
  }
  componentDidMount() {
    this.setState({
      dropDownValue: this.props.options,
      checked: this.props.checkedvalues != undefined && this.props.checkedvalues != "" ? this.props.checkedvalues : [],
      isSaveIdBased: this.props.isSaveIdBased,
      checkedItems: this.props.checkedItems != undefined && this.props.checkedItems != "" ? this.props.checkedItems : []
    });
  }
  removeChip(value) {
    this.checkBox(value, false);
  }
  checkBox(value, condition) {
    let checkedValue = this.state.checked;
    if (condition) {
      checkedValue.push(value);
    } else {
      let index = checkedValue.indexOf(value);
      checkedValue.splice(index, 1);
    }
    this.setState({
      checked: checkedValue
    }, () => {
      this.props.onSelectOptions(this.state.checked);
    });
  }
  checkItem(storedValue, condition, displayItem) {
    let checkedValue = this.state.checked;
    let checkedItem = this.state.checkedItems;

    storedValue = Number(storedValue);

    if (condition) {
      checkedValue.push(storedValue);
      checkedItem.push(displayItem);
    }
    else {
      let index = checkedValue.indexOf(storedValue);
      checkedValue.splice(index, 1);
      let itemIndex = checkedValue.indexOf(displayItem);
      checkedItem.splice(itemIndex, 1);
    }

    this.setState({
      checked: checkedValue,
      checkedItem: checkedItem
    }, () => {
      this.props.onSelectOptions(this.state.checked);
    });
  }
  returnChip() {
    const chip = this.state.checked ? this.state.checked.map((data, index) =>
      <div className="chip-body" key={index}>
        <p className="chip-text">{data}</p>
        <button className="chip-close" onClick={() => this.removeChip(data)}>&times;</button>
      </div>
    ) : []
    return chip;
  }
  returnList() {
    var list = null;
    if (this.props.isSaveIdBased) {
      list = this.state.dropDownValue ? this.state.dropDownValue.map((data, index) =>
        <label className="container" key={index}>{data.childLabel + " (" + data.displayLabel + ")"}
          <input type="checkbox" value={data.storedValue} onChange={e => this.checkItem(e.target.value, e.target.checked, data.displayLabel)} checked={this.state.checked.includes(data.storedValue) ? true : false} />
          <span className="checkmark"></span>
        </label>
      ) : null;
    }
    else {
      list = this.state.dropDownValue ? this.state.dropDownValue.map((data, index) =>
        <label className="container" key={index}>{data.displayLabel}
          <input type="checkbox" value={data.storedValue} onChange={e => this.checkBox(e.target.value, e.target.checked)} checked={this.state.checked.includes(data.storedValue) ? true : false} />
          <span className="checkmark"></span>
        </label>
      ) : null;
    }
    return list;
  }
  setMultiSelectValues() {
    this.setState({
      dropDownValue: this.props.options,
      checked: this.props.checkedvalues,
      multiSelectValue: true
    })
  }
  setCheckedItemsValue() {
    this.setState({
      dropDownValue: this.props.options,
      checkedItemsValue: true,
      checked: this.props.checkedvalues,
      checkedItems: this.props.checkedItems
    })
  }
  render() {
    if (this.props.options.length > 0 && this.state.multiSelectValue == false) {
      this.setMultiSelectValues();
    }
    if (this.props.checkedItems != undefined) {
      if (this.props.checkedItems.length > 0 && this.state.checkedItemsValue == false) {
        this.setCheckedItemsValue();
      }
    }

    var checkedValues = this.state.checked.join(',');
    var checkedItems = this.state.checkedItems.join(',');

    return (
      <div className="multiSelect">
        <input type="text" value={(this.props.isSaveIdBased ? checkedItems : checkedValues)} name="Search" placeholder="SBA Loan Types" className={(this.props.editMode == true ? 'input-box' : 'input-box disabled-button')} />
        <div className="search-result">
          <div className="list-result">
            {this.returnList()}
          </div>
        </div>
      </div>
    )
  }
}

Multiselect.propTypes = {
  options: PropTypes.any,
  checkedvalues: PropTypes.any,
  onSelectOptions: PropTypes.any,
  editMode: PropTypes.any,
  isSaveIdBased: PropTypes.any,
  checkedItems: PropTypes.any
};

export default Multiselect;
