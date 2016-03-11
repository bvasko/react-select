import React from 'react';
import Select from 'react-select';

const SEARCH = require('../data/search');

var StatesField = React.createClass({
	displayName: 'StatesField',
	propTypes: {
		label: React.PropTypes.string,
		searchable: React.PropTypes.bool,
	},
	getDefaultProps () {
		return {
			label: 'Search:',
			searchable: true,
		};
	},
	getInitialState () {
		return {
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true,
		};
	},
	updateValue (newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
		});
	},
	focusStateSelect () {
		this.refs.stateSelect.focus();
	},
	render () {
		// var options = STATES[this.state.country];
		 var mappedSearch = SEARCH.map( (item) => {
      return {value: item.name, label: item.name}
    });
		var options = mappedSearch;
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select 
					ref="stateSelect" 
					autofocus options={options} 
					simpleValue 
					clearable={true} 
					name="selected-state" 
					disabled={false} 
					value={this.state.selectValue} 
					onChange={this.updateValue} 
					searchable={true} />

			</div>
		);
	}
});


module.exports = StatesField;
