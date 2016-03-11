require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var CONTRIBUTORS = require('../data/contributors');
var MAX_CONTRIBUTORS = 6;
var ASYNC_DELAY = 500;

var Contributors = _react2['default'].createClass({
	displayName: 'Contributors',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			multi: true,
			value: [CONTRIBUTORS[0]]
		};
	},
	onChange: function onChange(value) {
		this.setState({
			value: value
		});
	},
	switchToMulti: function switchToMulti() {
		this.setState({
			multi: true,
			value: [this.state.value]
		});
	},
	switchToSingle: function switchToSingle() {
		this.setState({
			multi: false,
			value: this.state.value[0]
		});
	},
	getContributors: function getContributors(input, callback) {
		input = input.toLowerCase();
		var options = CONTRIBUTORS.filter(function (i) {
			return i.github.substr(0, input.length) === input;
		});
		var data = {
			options: options.slice(0, MAX_CONTRIBUTORS),
			complete: options.length <= MAX_CONTRIBUTORS
		};
		setTimeout(function () {
			callback(null, data);
		}, ASYNC_DELAY);
	},
	gotoContributor: function gotoContributor(value, event) {
		window.open('https://github.com/' + value.github);
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'].Async, { multi: this.state.multi, value: this.state.value, onChange: this.onChange, onValueClick: this.gotoContributor, valueKey: 'github', labelKey: 'name', loadOptions: this.getContributors }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: this.state.multi, onChange: this.switchToMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multiselect'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'radio', className: 'checkbox-control', checked: !this.state.multi, onChange: this.switchToSingle }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Single Value'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom label and value properties, async options and opens the github profiles in a new window when values are clicked'
			)
		);
	}
});

module.exports = Contributors;

},{"../data/contributors":7,"react":undefined,"react-select":undefined}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactGravatar = require('react-gravatar');

var _reactGravatar2 = _interopRequireDefault(_reactGravatar);

var USERS = require('../data/users');
var GRAVATAR_SIZE = 15;

var GravatarOption = _react2['default'].createClass({
	displayName: 'GravatarOption',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		className: _react2['default'].PropTypes.string,
		isDisabled: _react2['default'].PropTypes.bool,
		isFocused: _react2['default'].PropTypes.bool,
		isSelected: _react2['default'].PropTypes.bool,
		onFocus: _react2['default'].PropTypes.func,
		onSelect: _react2['default'].PropTypes.func,
		onUnfocus: _react2['default'].PropTypes.func,
		option: _react2['default'].PropTypes.object.isRequired
	},
	handleMouseDown: function handleMouseDown(event) {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter: function handleMouseEnter(event) {
		this.props.onFocus(this.props.option, event);
	},
	handleMouseMove: function handleMouseMove(event) {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	},
	handleMouseLeave: function handleMouseLeave(event) {
		this.props.onUnfocus(this.props.option, event);
	},
	render: function render() {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};
		return _react2['default'].createElement(
			'div',
			{ className: this.props.className,
				onMouseDown: this.handleMouseDown,
				onMouseEnter: this.handleMouseEnter,
				onMouseMove: this.handleMouseMove,
				onMouseLeave: this.handleMouseLeave,
				title: this.props.option.title },
			_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.option.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
			this.props.children
		);
	}
});

var GravatarValue = _react2['default'].createClass({
	displayName: 'GravatarValue',

	propTypes: {
		children: _react2['default'].PropTypes.node,
		placeholder: _react2['default'].PropTypes.string,
		value: _react2['default'].PropTypes.object
	},
	render: function render() {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle'
		};
		return _react2['default'].createElement(
			'div',
			{ className: 'Select-value', title: this.props.value.title },
			_react2['default'].createElement(
				'span',
				{ className: 'Select-value-label' },
				_react2['default'].createElement(_reactGravatar2['default'], { email: this.props.value.email, size: GRAVATAR_SIZE, style: gravatarStyle }),
				this.props.children
			)
		);
	}
});

var UsersField = _react2['default'].createClass({
	displayName: 'UsersField',

	propTypes: {
		hint: _react2['default'].PropTypes.string,
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
	},
	render: function render() {
		var placeholder = _react2['default'].createElement(
			'span',
			null,
			'☺ Select User'
		);

		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				onChange: this.setValue,
				optionComponent: GravatarOption,
				options: USERS,
				placeholder: placeholder,
				value: this.state.value,
				valueComponent: GravatarValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example implements custom Option and Value components to render a Gravatar image for each user based on their email. It also demonstrates rendering HTML elements as the placeholder.'
			)
		);
	}
});

module.exports = UsersField;

},{"../data/users":9,"react":undefined,"react-gravatar":19,"react-select":undefined}],3:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var DisabledUpsellOptions = _react2['default'].createClass({
	displayName: 'DisabledUpsellOptions',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {};
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
		console.log('Support level selected:', value.label);
	},
	renderLink: function renderLink() {
		return _react2['default'].createElement(
			'a',
			{ style: { marginLeft: 5 }, href: '/upgrade', target: '_blank' },
			'Upgrade here!'
		);
	},
	renderOption: function renderOption(option) {
		return _react2['default'].createElement(
			'span',
			{ style: { color: option.color } },
			option.label,
			' ',
			option.link
		);
	},
	renderValue: function renderValue(option) {
		return _react2['default'].createElement(
			'strong',
			{ style: { color: option.color } },
			option.label
		);
	},
	render: function render() {
		var options = [{ label: 'Basic customer support', value: 'basic', color: '#E31864' }, { label: 'Premium customer support', value: 'premium', color: '#6216A3' }, { label: 'Pro customer support', value: 'pro', disabled: true, link: this.renderLink() }];
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				placeholder: 'Select your support level',
				options: options,
				optionRenderer: this.renderOption,
				onChange: this.setValue,
				value: this.state.value,
				valueRenderer: this.renderValue
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This demonstates custom render methods and links in disabled options'
			)
		);
	}
});
module.exports = DisabledUpsellOptions;

},{"react":undefined,"react-select":undefined}],4:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var FLAVOURS = [{ label: 'Chocolate', value: 'chocolate' }, { label: 'Vanilla', value: 'vanilla' }, { label: 'Strawberry', value: 'strawberry' }, { label: 'Caramel', value: 'caramel' }, { label: 'Cookies and Cream', value: 'cookiescream' }, { label: 'Peppermint', value: 'peppermint' }];

var WHY_WOULD_YOU = [{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true }].concat(FLAVOURS.slice(1));

var MultiSelectField = _react2['default'].createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			disabled: false,
			crazy: false,
			options: FLAVOURS,
			value: []
		};
	},
	handleSelectChange: function handleSelectChange(value) {
		console.log('You\'ve selected:', value);
		this.setState({ value: value });
	},
	toggleDisabled: function toggleDisabled(e) {
		this.setState({ disabled: e.target.checked });
	},
	toggleChocolate: function toggleChocolate(e) {
		var crazy = e.target.checked;
		this.setState({
			crazy: crazy,
			options: crazy ? WHY_WOULD_YOU : FLAVOURS
		});
	},
	render: function render() {
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], { multi: true, simpleValue: true, disabled: this.state.disabled, value: this.state.value, placeholder: 'Select your favourite(s)', options: this.state.options, onChange: this.handleSelectChange }),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.disabled, onChange: this.toggleDisabled }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Disable the control'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.crazy, onChange: this.toggleChocolate }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'I don\'t like Chocolate (disabled the option)'
					)
				)
			)
		);
	}
});

module.exports = MultiSelectField;

},{"react":undefined,"react-select":undefined}],5:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var ValuesAsNumbersField = _react2['default'].createClass({
	displayName: 'ValuesAsNumbersField',
	propTypes: {
		label: _react2['default'].PropTypes.string
	},
	getInitialState: function getInitialState() {
		return {
			options: [{ value: 10, label: 'Ten' }, { value: 11, label: 'Eleven' }, { value: 12, label: 'Twelve' }, { value: 23, label: 'Twenty-three' }, { value: 24, label: 'Twenty-four' }],
			matchPos: 'any',
			matchValue: true,
			matchLabel: true,
			value: null,
			multi: false
		};
	},
	onChangeMatchStart: function onChangeMatchStart(event) {
		this.setState({
			matchPos: event.target.checked ? 'start' : 'any'
		});
	},
	onChangeMatchValue: function onChangeMatchValue(event) {
		this.setState({
			matchValue: event.target.checked
		});
	},
	onChangeMatchLabel: function onChangeMatchLabel(event) {
		this.setState({
			matchLabel: event.target.checked
		});
	},
	onChange: function onChange(value) {
		this.setState({ value: value });
		console.log('Numeric Select value changed to', value);
	},
	onChangeMulti: function onChangeMulti(event) {
		this.setState({
			multi: event.target.checked
		});
	},
	render: function render() {
		var matchProp = 'any';
		if (this.state.matchLabel && !this.state.matchValue) {
			matchProp = 'label';
		}
		if (!this.state.matchLabel && this.state.matchValue) {
			matchProp = 'value';
		}
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				matchPos: this.state.matchPos,
				matchProp: matchProp,
				multi: this.state.multi,
				onChange: this.onChange,
				options: this.state.options,
				simpleValue: true,
				value: this.state.value
			}),
			_react2['default'].createElement(
				'div',
				{ className: 'checkbox-list' },
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.multi, onChange: this.onChangeMulti }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Multi-Select'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchValue, onChange: this.onChangeMatchValue }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match value only'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchLabel, onChange: this.onChangeMatchLabel }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Match label only'
					)
				),
				_react2['default'].createElement(
					'label',
					{ className: 'checkbox' },
					_react2['default'].createElement('input', { type: 'checkbox', className: 'checkbox-control', checked: this.state.matchPos === 'start', onChange: this.onChangeMatchStart }),
					_react2['default'].createElement(
						'span',
						{ className: 'checkbox-label' },
						'Only include matches from the start of the string'
					)
				)
			),
			_react2['default'].createElement(
				'div',
				{ className: 'hint' },
				'This example uses simple numeric values'
			)
		);
	}
});

module.exports = ValuesAsNumbersField;

},{"react":undefined,"react-select":undefined}],6:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var SEARCH = require('../data/search');

var StatesField = _react2['default'].createClass({
	displayName: 'StatesField',
	propTypes: {
		label: _react2['default'].PropTypes.string,
		searchable: _react2['default'].PropTypes.bool
	},
	getDefaultProps: function getDefaultProps() {
		return {
			label: 'Search:',
			searchable: true
		};
	},
	getInitialState: function getInitialState() {
		return {
			searchable: this.props.searchable,
			selectValue: 'new-south-wales',
			clearable: true
		};
	},
	updateValue: function updateValue(newValue) {
		console.log('State changed to ' + newValue);
		this.setState({
			selectValue: newValue
		});
	},
	focusStateSelect: function focusStateSelect() {
		this.refs.stateSelect.focus();
	},
	render: function render() {
		// var options = STATES[this.state.country];
		var mappedSearch = SEARCH.map(function (item) {
			return { value: item.name, label: item.name };
		});
		var options = mappedSearch;
		return _react2['default'].createElement(
			'div',
			{ className: 'section' },
			_react2['default'].createElement(
				'h3',
				{ className: 'section-heading' },
				this.props.label
			),
			_react2['default'].createElement(_reactSelect2['default'], {
				ref: 'stateSelect',
				autofocus: true, options: options,
				simpleValue: true,
				clearable: true,
				name: 'selected-state',
				disabled: false,
				value: this.state.selectValue,
				onChange: this.updateValue,
				searchable: true })
		);
	}
});

module.exports = StatesField;

},{"../data/search":8,"react":undefined,"react-select":undefined}],7:[function(require,module,exports){
'use strict';

module.exports = [{ github: 'jedwatson', name: 'Jed Watson' }, { github: 'bruderstein', name: 'Dave Brotherstone' }, { github: 'jossmac', name: 'Joss Mackison' }, { github: 'jniechcial', name: 'Jakub Niechciał' }, { github: 'craigdallimore', name: 'Craig Dallimore' }, { github: 'julen', name: 'Julen Ruiz Aizpuru' }, { github: 'dcousens', name: 'Daniel Cousens' }, { github: 'jgautsch', name: 'Jon Gautsch' }, { github: 'dmitry-smirnov', name: 'Dmitry Smirnov' }];

},{}],8:[function(require,module,exports){
"use strict";

var SEARCH = [{
  "id": "56bb972541ef35d8a133300e",
  "type": "episode",
  "name": "Benton Drake"
}, {
  "id": "56bb972577e9b1c4a1e5dbc4",
  "type": "series",
  "name": "Noel Wall"
}, {
  "id": "56bb97250d58bf4e8c00160b",
  "type": "series",
  "name": "Jerry Stephenson"
}, {
  "id": "56bb97259f968184d555c665",
  "type": "episode",
  "name": "Martina Flores"
}, {
  "id": "56bb9725808748508c83c651",
  "type": "movie",
  "name": "Kris Cantrell"
}, {
  "id": "56bb9725e1a9673bce6a1315",
  "type": "series",
  "name": "Townsend Porter"
}, {
  "id": "56bb97253bbb8364f27ecb07",
  "type": "movie",
  "name": "Carolyn Levy"
}, {
  "id": "56bb972573e5d69da8835e25",
  "type": "episode",
  "name": "Mcneil Landry"
}, {
  "id": "56bb97257dc95a7da27524de",
  "type": "movie",
  "name": "Yang Pitts"
}, {
  "id": "56bb97253f9942ef3887c9e1",
  "type": "movie",
  "name": "Stefanie Martinez"
}, {
  "id": "56bb9725f647a6aaf8698a19",
  "type": "series",
  "name": "Rose Dale"
}, {
  "id": "56bb97257c358dca0c322df8",
  "type": "episode",
  "name": "Marcy Strickland"
}, {
  "id": "56bb972531bc974942ed1a3a",
  "type": "episode",
  "name": "Weaver Higgins"
}, {
  "id": "56bb972513e63a9eb3628d12",
  "type": "movie",
  "name": "Hart Sherman"
}, {
  "id": "56bb9725d1be08db0e588cc3",
  "type": "series",
  "name": "Chandler Chan"
}, {
  "id": "56bb9725320a1a1477eca797",
  "type": "episode",
  "name": "Shannon Talley"
}, {
  "id": "56bb97252d5bcb5b19150900",
  "type": "episode",
  "name": "Aguilar Vang"
}, {
  "id": "56bb9725ec02dbc4f27194da",
  "type": "episode",
  "name": "Ethel Stephens"
}, {
  "id": "56bb97254bd8511c69524a2d",
  "type": "movie",
  "name": "Chaney Baird"
}, {
  "id": "56bb97252348732048a2be0e",
  "type": "series",
  "name": "Aileen Christensen"
}, {
  "id": "56bb97259ebdf4768bc162a9",
  "type": "celebrity",
  "name": "Daugherty Mcclure"
}, {
  "id": "56bb972575f21c05b1e5a6c5",
  "type": "celebrity",
  "name": "Isabelle Oconnor"
}, {
  "id": "56bb9725e9870f8ebd635965",
  "type": "series",
  "name": "Lorrie Perkins"
}, {
  "id": "56bb97257932e576a09cc6bd",
  "type": "series",
  "name": "Dillon Hart"
}, {
  "id": "56bb9725080c9a7bf9674fa7",
  "type": "movie",
  "name": "Sanchez Noel"
}, {
  "id": "56bb9725bb564f3e5ab716d9",
  "type": "series",
  "name": "Wolf Reid"
}, {
  "id": "56bb9725bc87b0c349e7eb77",
  "type": "celebrity",
  "name": "Edith Sexton"
}, {
  "id": "56bb97252108253152b19f70",
  "type": "movie",
  "name": "Rosetta Sloan"
}, {
  "id": "56bb9725876e82307e3ad63c",
  "type": "movie",
  "name": "Reva Castillo"
}, {
  "id": "56bb9725af21d2c57c3b60ad",
  "type": "episode",
  "name": "Brady Bartlett"
}, {
  "id": "56bb97252f6d64e0109d7bee",
  "type": "movie",
  "name": "Ayers Powers"
}, {
  "id": "56bb9725a3269606d7089876",
  "type": "movie",
  "name": "Vera Osborne"
}, {
  "id": "56bb9725c6a73561bdc76f9b",
  "type": "series",
  "name": "Antonia Nguyen"
}, {
  "id": "56bb9725afe2aa99f2201065",
  "type": "celebrity",
  "name": "Tasha Ward"
}, {
  "id": "56bb9725cde37177c26582b0",
  "type": "episode",
  "name": "Wilkerson Paul"
}, {
  "id": "56bb9725e14825f0e6b78666",
  "type": "episode",
  "name": "Amanda Obrien"
}, {
  "id": "56bb97253e00e01066d70e46",
  "type": "movie",
  "name": "Carmen Phelps"
}, {
  "id": "56bb9725c48df0267f878570",
  "type": "movie",
  "name": "Lilian Byers"
}, {
  "id": "56bb97255910e0f5480daca0",
  "type": "movie",
  "name": "Mccullough Roy"
}, {
  "id": "56bb9725db219d37759b69f1",
  "type": "episode",
  "name": "Socorro Macdonald"
}, {
  "id": "56bb972584d91c9cf267f328",
  "type": "series",
  "name": "Wilcox Stewart"
}, {
  "id": "56bb972564327fb912202fc0",
  "type": "episode",
  "name": "George Mooney"
}, {
  "id": "56bb972532da2256f48b2389",
  "type": "movie",
  "name": "Cora Mosley"
}, {
  "id": "56bb9725c8d551c7f3673144",
  "type": "series",
  "name": "Travis Molina"
}, {
  "id": "56bb972533960e7aed677c8a",
  "type": "movie",
  "name": "Lessie Sweeney"
}, {
  "id": "56bb9725c017c98df3773593",
  "type": "episode",
  "name": "Mcdaniel Bray"
}, {
  "id": "56bb97252f1774736ed91e13",
  "type": "series",
  "name": "Rosa Herring"
}, {
  "id": "56bb9725608f661ca4001023",
  "type": "episode",
  "name": "Cynthia Humphrey"
}, {
  "id": "56bb9725fba90ed0f3f17f01",
  "type": "series",
  "name": "Buck House"
}, {
  "id": "56bb972514a82c6e43c08d87",
  "type": "series",
  "name": "Joanna Mann"
}, {
  "id": "56bb972511f002b4cdbd4bf4",
  "type": "series",
  "name": "Mckee Parker"
}, {
  "id": "56bb97258a1fc8b4bcf17a8a",
  "type": "celebrity",
  "name": "Hays Garza"
}, {
  "id": "56bb972531aa605332ae2470",
  "type": "episode",
  "name": "Ila Curtis"
}, {
  "id": "56bb97250e9ca5f6b68277ab",
  "type": "movie",
  "name": "Stein Hines"
}, {
  "id": "56bb97251834717ec86a9c1c",
  "type": "celebrity",
  "name": "Robinson Mcneil"
}, {
  "id": "56bb9725ed7801e38278d167",
  "type": "series",
  "name": "Jody Shields"
}, {
  "id": "56bb972568fc6098d0342835",
  "type": "celebrity",
  "name": "Ray Wilcox"
}, {
  "id": "56bb9725a4ba9d1ec95b3175",
  "type": "celebrity",
  "name": "Lindsay Gutierrez"
}, {
  "id": "56bb9725fca4ff2e6e9bc0fb",
  "type": "celebrity",
  "name": "Galloway Jacobs"
}, {
  "id": "56bb97258342207c92e06c61",
  "type": "movie",
  "name": "Kathleen Ryan"
}, {
  "id": "56bb97258d54f864b20bf758",
  "type": "celebrity",
  "name": "Estes Vance"
}, {
  "id": "56bb9725b600b13a3e14b5b3",
  "type": "series",
  "name": "Mann Sanford"
}, {
  "id": "56bb9725846b674c34de32be",
  "type": "celebrity",
  "name": "Graves Berg"
}, {
  "id": "56bb97259870d8436a33b582",
  "type": "episode",
  "name": "Strickland Valentine"
}, {
  "id": "56bb9725b3e85a49d7da3261",
  "type": "movie",
  "name": "Deidre Henderson"
}, {
  "id": "56bb9725754a1bbc5feed989",
  "type": "movie",
  "name": "Hopkins Serrano"
}, {
  "id": "56bb9725fe383420a2d58882",
  "type": "series",
  "name": "Sosa Hicks"
}, {
  "id": "56bb97253c65d6622dddcd73",
  "type": "movie",
  "name": "Angelique Walsh"
}, {
  "id": "56bb9725f027a098caa2382a",
  "type": "series",
  "name": "Orr Colon"
}, {
  "id": "56bb9725baa016f9d8aaa70c",
  "type": "movie",
  "name": "Marshall Graham"
}, {
  "id": "56bb972519e8e5af25c4a8f0",
  "type": "movie",
  "name": "Rosemarie Price"
}, {
  "id": "56bb972530ae76cb3f878210",
  "type": "movie",
  "name": "Cline Fleming"
}, {
  "id": "56bb97255ab3c4c7729c4086",
  "type": "movie",
  "name": "Miriam Carter"
}, {
  "id": "56bb972591f8345d2b8208d8",
  "type": "celebrity",
  "name": "Briggs Ratliff"
}, {
  "id": "56bb972541729933c9be3a61",
  "type": "celebrity",
  "name": "Butler Meadows"
}, {
  "id": "56bb972539c32ae834e058ff",
  "type": "series",
  "name": "Fay Patton"
}, {
  "id": "56bb97254a10b2637eba8eb9",
  "type": "series",
  "name": "Cross Hayes"
}, {
  "id": "56bb9725c73af321820ee3fb",
  "type": "episode",
  "name": "Christina Austin"
}, {
  "id": "56bb97252bb95e4635a787de",
  "type": "celebrity",
  "name": "Terrie Winters"
}, {
  "id": "56bb97258ee8e2b41b53ea41",
  "type": "episode",
  "name": "Calderon Orr"
}, {
  "id": "56bb9725bbf1e228a4172e7b",
  "type": "movie",
  "name": "Addie Gilmore"
}, {
  "id": "56bb9725d43fc42cefd6295a",
  "type": "series",
  "name": "Jaclyn Montoya"
}, {
  "id": "56bb972539ab2ab49bf468f2",
  "type": "episode",
  "name": "Shirley Montgomery"
}, {
  "id": "56bb9725d94b8f796ef8a470",
  "type": "episode",
  "name": "Mayo Joyce"
}, {
  "id": "56bb9725aa764379cc2714ce",
  "type": "celebrity",
  "name": "Flora Wallace"
}, {
  "id": "56bb972535986e7e72b3cdd4",
  "type": "celebrity",
  "name": "Nelson Knapp"
}];

module.exports = SEARCH;

},{}],9:[function(require,module,exports){
'use strict';

module.exports = [{ value: 'John Smith', label: 'John Smith', email: 'john@smith.com' }, { value: 'Merry Jane', label: 'Merry Jane', email: 'merry@jane.com' }, { value: 'Stan Hoper', label: 'Stan Hoper', email: 'stan@hoper.com' }];

},{}],10:[function(require,module,exports){
/* eslint react/prop-types: 0 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _componentsContributors = require('./components/Contributors');

var _componentsContributors2 = _interopRequireDefault(_componentsContributors);

var _componentsCustomComponents = require('./components/CustomComponents');

var _componentsCustomComponents2 = _interopRequireDefault(_componentsCustomComponents);

var _componentsCustomRender = require('./components/CustomRender');

var _componentsCustomRender2 = _interopRequireDefault(_componentsCustomRender);

var _componentsMultiselect = require('./components/Multiselect');

var _componentsMultiselect2 = _interopRequireDefault(_componentsMultiselect);

var _componentsNumericSelect = require('./components/NumericSelect');

var _componentsNumericSelect2 = _interopRequireDefault(_componentsNumericSelect);

var _componentsSearchTest = require('./components/SearchTest');

var _componentsSearchTest2 = _interopRequireDefault(_componentsSearchTest);

_reactDom2['default'].render(_react2['default'].createElement(
	'div',
	null,
	_react2['default'].createElement(_componentsSearchTest2['default'], { label: 'Search', searchable: true })
), document.getElementById('example'));
/*
<SelectedValuesField label="Option Creation (tags mode)" options={FLAVOURS} allowCreate hint="Enter a value that's NOT in the list, then hit return" />
*/

},{"./components/Contributors":1,"./components/CustomComponents":2,"./components/CustomRender":3,"./components/Multiselect":4,"./components/NumericSelect":5,"./components/SearchTest":6,"react":undefined,"react-dom":undefined,"react-select":undefined}],11:[function(require,module,exports){
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;

},{}],12:[function(require,module,exports){
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();

},{}],13:[function(require,module,exports){
module.exports = function() {
  var mediaQuery;
  if (typeof window !== "undefined" && window !== null) {
    mediaQuery = "(-webkit-min-device-pixel-ratio: 1.25), (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (min-resolution: 1.25dppx)";
    if (window.devicePixelRatio > 1.25) {
      return true;
    }
    if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
      return true;
    }
  }
  return false;
};

},{}],14:[function(require,module,exports){
(function(){
  var crypt = require('crypt'),
      utf8 = require('charenc').utf8,
      isBuffer = require('is-buffer'),
      bin = require('charenc').bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if(typeof message == 'undefined')
      return;

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();

},{"charenc":11,"crypt":12,"is-buffer":15}],15:[function(require,module,exports){
/**
 * Determine if an object is Buffer
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install is-buffer`
 */

module.exports = function (obj) {
  return !!(
    obj != null &&
    obj.constructor &&
    typeof obj.constructor.isBuffer === 'function' &&
    obj.constructor.isBuffer(obj)
  )
}

},{}],16:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],17:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],18:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":16,"./encode":17}],19:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
var React, isRetina, md5, querystring;

React = require('react');

md5 = require('md5');

querystring = require('querystring');

isRetina = require('is-retina');

module.exports = React.createClass({
  displayName: 'Gravatar',
  propTypes: {
    email: React.PropTypes.string,
    md5: React.PropTypes.string,
    size: React.PropTypes.number,
    rating: React.PropTypes.string,
    https: React.PropTypes.bool,
    "default": React.PropTypes.string,
    className: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      size: 50,
      rating: 'g',
      https: false,
      "default": "retro",
      className: ""
    };
  },
  render: function() {
    var base, hash, modernBrowser, query, retinaQuery, retinaSrc, src;
    base = this.props.https ? "https://secure.gravatar.com/avatar/" : 'http://www.gravatar.com/avatar/';
    query = querystring.stringify({
      s: this.props.size,
      r: this.props.rating,
      d: this.props["default"]
    });
    retinaQuery = querystring.stringify({
      s: this.props.size * 2,
      r: this.props.rating,
      d: this.props["default"]
    });
    if (this.props.md5) {
      hash = this.props.md5;
    } else if (this.props.email) {
      hash = md5(this.props.email);
    } else {
      console.warn('Gravatar image can not be fetched. Either the "email" or "md5" prop must be specified.');
      return React.createElement("script", null);
    }
    src = base + hash + "?" + query;
    retinaSrc = base + hash + "?" + retinaQuery;
    modernBrowser = true;
    if (typeof window !== "undefined" && window !== null) {
      modernBrowser = 'srcset' in document.createElement('img');
    }
    if (!modernBrowser && isRetina()) {
      return React.createElement("img", React.__spread({
        "style": this.props.style,
        "className": "react-gravatar " + this.props.className,
        "src": retinaSrc,
        "height": this.props.size,
        "width": this.props.size
      }, this.props));
    } else {
      return React.createElement("img", React.__spread({
        "style": this.props.style,
        "className": "react-gravatar " + this.props.className,
        "src": src,
        "srcSet": retinaSrc + " 2x",
        "height": this.props.size,
        "width": this.props.size
      }, this.props));
    }
  }
});

},{"is-retina":13,"md5":14,"querystring":18,"react":undefined}]},{},[10])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYm9ubmllZGlwYXNxdWFsZS9TaXRlcy9SZWFjdF9MaWJyYXJpZXMvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9jb21wb25lbnRzL0NvbnRyaWJ1dG9ycy5qcyIsIi9Vc2Vycy9ib25uaWVkaXBhc3F1YWxlL1NpdGVzL1JlYWN0X0xpYnJhcmllcy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ3VzdG9tQ29tcG9uZW50cy5qcyIsIi9Vc2Vycy9ib25uaWVkaXBhc3F1YWxlL1NpdGVzL1JlYWN0X0xpYnJhcmllcy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvQ3VzdG9tUmVuZGVyLmpzIiwiL1VzZXJzL2Jvbm5pZWRpcGFzcXVhbGUvU2l0ZXMvUmVhY3RfTGlicmFyaWVzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvY29tcG9uZW50cy9NdWx0aXNlbGVjdC5qcyIsIi9Vc2Vycy9ib25uaWVkaXBhc3F1YWxlL1NpdGVzL1JlYWN0X0xpYnJhcmllcy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvTnVtZXJpY1NlbGVjdC5qcyIsIi9Vc2Vycy9ib25uaWVkaXBhc3F1YWxlL1NpdGVzL1JlYWN0X0xpYnJhcmllcy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2NvbXBvbmVudHMvU2VhcmNoVGVzdC5qcyIsIi9Vc2Vycy9ib25uaWVkaXBhc3F1YWxlL1NpdGVzL1JlYWN0X0xpYnJhcmllcy9yZWFjdC1zZWxlY3QvZXhhbXBsZXMvc3JjL2RhdGEvY29udHJpYnV0b3JzLmpzIiwiL1VzZXJzL2Jvbm5pZWRpcGFzcXVhbGUvU2l0ZXMvUmVhY3RfTGlicmFyaWVzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvZGF0YS9zZWFyY2guanMiLCIvVXNlcnMvYm9ubmllZGlwYXNxdWFsZS9TaXRlcy9SZWFjdF9MaWJyYXJpZXMvcmVhY3Qtc2VsZWN0L2V4YW1wbGVzL3NyYy9kYXRhL3VzZXJzLmpzIiwiL1VzZXJzL2Jvbm5pZWRpcGFzcXVhbGUvU2l0ZXMvUmVhY3RfTGlicmFyaWVzL3JlYWN0LXNlbGVjdC9leGFtcGxlcy9zcmMvc2VhcmNoQXBwLmpzIiwibm9kZV9tb2R1bGVzL2NoYXJlbmMvY2hhcmVuYy5qcyIsIm5vZGVfbW9kdWxlcy9jcnlwdC9jcnlwdC5qcyIsIm5vZGVfbW9kdWxlcy9pcy1yZXRpbmEvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbWQ1L21kNS5qcyIsIm5vZGVfbW9kdWxlcy9tZDUvbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZGVjb2RlLmpzIiwibm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9lbmNvZGUuanMiLCJub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0LWdyYXZhdGFyL2Rpc3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O3FCQ0FrQixPQUFPOzs7OzJCQUNOLGNBQWM7Ozs7QUFFakMsSUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDckQsSUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFDM0IsSUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDOztBQUV4QixJQUFNLFlBQVksR0FBRyxtQkFBTSxXQUFXLENBQUM7QUFDdEMsWUFBVyxFQUFFLGNBQWM7QUFDM0IsVUFBUyxFQUFFO0FBQ1YsT0FBSyxFQUFFLG1CQUFNLFNBQVMsQ0FBQyxNQUFNO0VBQzdCO0FBQ0QsZ0JBQWUsRUFBQywyQkFBRztBQUNsQixTQUFPO0FBQ04sUUFBSyxFQUFFLElBQUk7QUFDWCxRQUFLLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDeEIsQ0FBQztFQUNGO0FBQ0QsU0FBUSxFQUFDLGtCQUFDLEtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbmNvbnN0IENPTlRSSUJVVE9SUyA9IHJlcXVpcmUoJy4uL2RhdGEvY29udHJpYnV0b3JzJyk7XG5jb25zdCBNQVhfQ09OVFJJQlVUT1JTID0gNjtcbmNvbnN0IEFTWU5DX0RFTEFZID0gNTAwO1xuXG5jb25zdCBDb250cmlidXRvcnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnQ29udHJpYnV0b3JzJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdFx0dmFsdWU6IFtDT05UUklCVVRPUlNbMF1dLFxuXHRcdH07XG5cdH0sXG5cdG9uQ2hhbmdlICh2YWx1ZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdH0pO1xuXHR9LFxuXHRzd2l0Y2hUb011bHRpICgpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG11bHRpOiB0cnVlLFxuXHRcdFx0dmFsdWU6IFt0aGlzLnN0YXRlLnZhbHVlXSxcblx0XHR9KTtcblx0fSxcblx0c3dpdGNoVG9TaW5nbGUgKCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bXVsdGk6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHRoaXMuc3RhdGUudmFsdWVbMF0sXG5cdFx0fSk7XG5cdH0sXG5cdGdldENvbnRyaWJ1dG9ycyAoaW5wdXQsIGNhbGxiYWNrKSB7XG5cdFx0aW5wdXQgPSBpbnB1dC50b0xvd2VyQ2FzZSgpO1xuXHRcdHZhciBvcHRpb25zID0gQ09OVFJJQlVUT1JTLmZpbHRlcihpID0+IHtcblx0XHRcdHJldHVybiBpLmdpdGh1Yi5zdWJzdHIoMCwgaW5wdXQubGVuZ3RoKSA9PT0gaW5wdXQ7XG5cdFx0fSk7XG5cdFx0dmFyIGRhdGEgPSB7XG5cdFx0XHRvcHRpb25zOiBvcHRpb25zLnNsaWNlKDAsIE1BWF9DT05UUklCVVRPUlMpLFxuXHRcdFx0Y29tcGxldGU6IG9wdGlvbnMubGVuZ3RoIDw9IE1BWF9DT05UUklCVVRPUlMsXG5cdFx0fTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0Y2FsbGJhY2sobnVsbCwgZGF0YSk7XG5cdFx0fSwgQVNZTkNfREVMQVkpO1xuXHR9LFxuXHRnb3RvQ29udHJpYnV0b3IgKHZhbHVlLCBldmVudCkge1xuXHRcdHdpbmRvdy5vcGVuKCdodHRwczovL2dpdGh1Yi5jb20vJyArIHZhbHVlLmdpdGh1Yik7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdC5Bc3luYyBtdWx0aT17dGhpcy5zdGF0ZS5tdWx0aX0gdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfSBvblZhbHVlQ2xpY2s9e3RoaXMuZ290b0NvbnRyaWJ1dG9yfSB2YWx1ZUtleT1cImdpdGh1YlwiIGxhYmVsS2V5PVwibmFtZVwiIGxvYWRPcHRpb25zPXt0aGlzLmdldENvbnRyaWJ1dG9yc30gLz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjaGVja2JveC1saXN0XCI+XG5cdFx0XHRcdFx0PGxhYmVsIGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgY2xhc3NOYW1lPVwiY2hlY2tib3gtY29udHJvbFwiIGNoZWNrZWQ9e3RoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvTXVsdGl9Lz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+TXVsdGlzZWxlY3Q8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17IXRoaXMuc3RhdGUubXVsdGl9IG9uQ2hhbmdlPXt0aGlzLnN3aXRjaFRvU2luZ2xlfS8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPlNpbmdsZSBWYWx1ZTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+VGhpcyBleGFtcGxlIGltcGxlbWVudHMgY3VzdG9tIGxhYmVsIGFuZCB2YWx1ZSBwcm9wZXJ0aWVzLCBhc3luYyBvcHRpb25zIGFuZCBvcGVucyB0aGUgZ2l0aHViIHByb2ZpbGVzIGluIGEgbmV3IHdpbmRvdyB3aGVuIHZhbHVlcyBhcmUgY2xpY2tlZDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udHJpYnV0b3JzO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcbmltcG9ydCBHcmF2YXRhciBmcm9tICdyZWFjdC1ncmF2YXRhcic7XG5cbmNvbnN0IFVTRVJTID0gcmVxdWlyZSgnLi4vZGF0YS91c2VycycpO1xuY29uc3QgR1JBVkFUQVJfU0laRSA9IDE1O1xuXG5jb25zdCBHcmF2YXRhck9wdGlvbiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0cHJvcFR5cGVzOiB7XG5cdFx0Y2hpbGRyZW46IFJlYWN0LlByb3BUeXBlcy5ub2RlLFxuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRpc0Rpc2FibGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcblx0XHRpc0ZvY3VzZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdGlzU2VsZWN0ZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuXHRcdG9uRm9jdXM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdG9uU2VsZWN0OiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcblx0XHRvblVuZm9jdXM6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdG9wdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXHR9LFxuXHRoYW5kbGVNb3VzZURvd24gKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR0aGlzLnByb3BzLm9uU2VsZWN0KHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XG5cdH0sXG5cdGhhbmRsZU1vdXNlRW50ZXIgKGV2ZW50KSB7XG5cdFx0dGhpcy5wcm9wcy5vbkZvY3VzKHRoaXMucHJvcHMub3B0aW9uLCBldmVudCk7XG5cdH0sXG5cdGhhbmRsZU1vdXNlTW92ZSAoZXZlbnQpIHtcblx0XHRpZiAodGhpcy5wcm9wcy5pc0ZvY3VzZWQpIHJldHVybjtcblx0XHR0aGlzLnByb3BzLm9uRm9jdXModGhpcy5wcm9wcy5vcHRpb24sIGV2ZW50KTtcblx0fSxcblx0aGFuZGxlTW91c2VMZWF2ZSAoZXZlbnQpIHtcblx0XHR0aGlzLnByb3BzLm9uVW5mb2N1cyh0aGlzLnByb3BzLm9wdGlvbiwgZXZlbnQpO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdGxldCBncmF2YXRhclN0eWxlID0ge1xuXHRcdFx0Ym9yZGVyUmFkaXVzOiAzLFxuXHRcdFx0ZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG5cdFx0XHRtYXJnaW5SaWdodDogMTAsXG5cdFx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJyxcblx0XHRcdHRvcDogLTIsXG5cdFx0XHR2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcblx0XHR9O1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9XG5cdFx0XHRcdG9uTW91c2VEb3duPXt0aGlzLmhhbmRsZU1vdXNlRG93bn1cblx0XHRcdFx0b25Nb3VzZUVudGVyPXt0aGlzLmhhbmRsZU1vdXNlRW50ZXJ9XG5cdFx0XHRcdG9uTW91c2VNb3ZlPXt0aGlzLmhhbmRsZU1vdXNlTW92ZX1cblx0XHRcdFx0b25Nb3VzZUxlYXZlPXt0aGlzLmhhbmRsZU1vdXNlTGVhdmV9XG5cdFx0XHRcdHRpdGxlPXt0aGlzLnByb3BzLm9wdGlvbi50aXRsZX0+XG5cdFx0XHRcdDxHcmF2YXRhciBlbWFpbD17dGhpcy5wcm9wcy5vcHRpb24uZW1haWx9IHNpemU9e0dSQVZBVEFSX1NJWkV9IHN0eWxlPXtncmF2YXRhclN0eWxlfSAvPlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5jb25zdCBHcmF2YXRhclZhbHVlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0XHRjaGlsZHJlbjogUmVhY3QuUHJvcFR5cGVzLm5vZGUsXG5cdFx0cGxhY2Vob2xkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0dmFsdWU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3Rcblx0fSxcblx0cmVuZGVyICgpIHtcblx0XHR2YXIgZ3JhdmF0YXJTdHlsZSA9IHtcblx0XHRcdGJvcmRlclJhZGl1czogMyxcblx0XHRcdGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuXHRcdFx0bWFyZ2luUmlnaHQ6IDEwLFxuXHRcdFx0cG9zaXRpb246ICdyZWxhdGl2ZScsXG5cdFx0XHR0b3A6IC0yLFxuXHRcdFx0dmVydGljYWxBbGlnbjogJ21pZGRsZScsXG5cdFx0fTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJTZWxlY3QtdmFsdWVcIiB0aXRsZT17dGhpcy5wcm9wcy52YWx1ZS50aXRsZX0+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIlNlbGVjdC12YWx1ZS1sYWJlbFwiPlxuXHRcdFx0XHRcdDxHcmF2YXRhciBlbWFpbD17dGhpcy5wcm9wcy52YWx1ZS5lbWFpbH0gc2l6ZT17R1JBVkFUQVJfU0laRX0gc3R5bGU9e2dyYXZhdGFyU3R5bGV9IC8+XG5cdFx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW59XG5cdFx0XHRcdDwvc3Bhbj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5jb25zdCBVc2Vyc0ZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRwcm9wVHlwZXM6IHtcblx0XHRoaW50OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXHR9LFxuXHRnZXRJbml0aWFsU3RhdGUgKCkge1xuXHRcdHJldHVybiB7fTtcblx0fSxcblx0c2V0VmFsdWUgKHZhbHVlKSB7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlIH0pO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBwbGFjZWhvbGRlciA9IDxzcGFuPiYjOTc4NjsgU2VsZWN0IFVzZXI8L3NwYW4+O1xuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnNldFZhbHVlfVxuXHRcdFx0XHRcdG9wdGlvbkNvbXBvbmVudD17R3JhdmF0YXJPcHRpb259XG5cdFx0XHRcdFx0b3B0aW9ucz17VVNFUlN9XG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuXHRcdFx0XHRcdHZhbHVlQ29tcG9uZW50PXtHcmF2YXRhclZhbHVlfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaGludFwiPlxuXHRcdFx0XHRcdFRoaXMgZXhhbXBsZSBpbXBsZW1lbnRzIGN1c3RvbSBPcHRpb24gYW5kIFZhbHVlIGNvbXBvbmVudHMgdG8gcmVuZGVyIGEgR3JhdmF0YXIgaW1hZ2UgZm9yIGVhY2ggdXNlciBiYXNlZCBvbiB0aGVpciBlbWFpbC5cblx0XHRcdFx0XHRJdCBhbHNvIGRlbW9uc3RyYXRlcyByZW5kZXJpbmcgSFRNTCBlbGVtZW50cyBhcyB0aGUgcGxhY2Vob2xkZXIuXG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVXNlcnNGaWVsZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbnZhciBEaXNhYmxlZFVwc2VsbE9wdGlvbnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdGRpc3BsYXlOYW1lOiAnRGlzYWJsZWRVcHNlbGxPcHRpb25zJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9LFxuXHRzZXRWYWx1ZSAodmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG5cdFx0Y29uc29sZS5sb2coJ1N1cHBvcnQgbGV2ZWwgc2VsZWN0ZWQ6JywgdmFsdWUubGFiZWwpO1xuXHR9LFxuXHRyZW5kZXJMaW5rOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gPGEgc3R5bGU9e3sgbWFyZ2luTGVmdDogNSB9fSBocmVmPVwiL3VwZ3JhZGVcIiB0YXJnZXQ9XCJfYmxhbmtcIj5VcGdyYWRlIGhlcmUhPC9hPjtcblx0fSxcblx0cmVuZGVyT3B0aW9uOiBmdW5jdGlvbihvcHRpb24pIHtcblx0XHRyZXR1cm4gPHNwYW4gc3R5bGU9e3sgY29sb3I6IG9wdGlvbi5jb2xvciB9fT57b3B0aW9uLmxhYmVsfSB7b3B0aW9uLmxpbmt9PC9zcGFuPjtcblx0fSxcblx0cmVuZGVyVmFsdWU6IGZ1bmN0aW9uKG9wdGlvbikge1xuXHRcdHJldHVybiA8c3Ryb25nIHN0eWxlPXt7IGNvbG9yOiBvcHRpb24uY29sb3IgfX0+e29wdGlvbi5sYWJlbH08L3N0cm9uZz47XG5cdH0sXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG9wdGlvbnMgPSBbXG5cdFx0XHR7IGxhYmVsOiAnQmFzaWMgY3VzdG9tZXIgc3VwcG9ydCcsIHZhbHVlOiAnYmFzaWMnLCBjb2xvcjogJyNFMzE4NjQnIH0sXG5cdFx0XHR7IGxhYmVsOiAnUHJlbWl1bSBjdXN0b21lciBzdXBwb3J0JywgdmFsdWU6ICdwcmVtaXVtJywgY29sb3I6ICcjNjIxNkEzJyB9LFxuXHRcdFx0eyBsYWJlbDogJ1BybyBjdXN0b21lciBzdXBwb3J0JywgdmFsdWU6ICdwcm8nLCBkaXNhYmxlZDogdHJ1ZSwgbGluazogdGhpcy5yZW5kZXJMaW5rKCkgfSxcblx0XHRdO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3Rcblx0XHRcdFx0XHRwbGFjZWhvbGRlcj1cIlNlbGVjdCB5b3VyIHN1cHBvcnQgbGV2ZWxcIlxuXHRcdFx0XHRcdG9wdGlvbnM9e29wdGlvbnN9XG5cdFx0XHRcdFx0b3B0aW9uUmVuZGVyZXI9e3RoaXMucmVuZGVyT3B0aW9ufVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLnNldFZhbHVlfVxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuXHRcdFx0XHRcdHZhbHVlUmVuZGVyZXI9e3RoaXMucmVuZGVyVmFsdWV9XG5cdFx0XHRcdFx0Lz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJoaW50XCI+VGhpcyBkZW1vbnN0YXRlcyBjdXN0b20gcmVuZGVyIG1ldGhvZHMgYW5kIGxpbmtzIGluIGRpc2FibGVkIG9wdGlvbnM8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBEaXNhYmxlZFVwc2VsbE9wdGlvbnM7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuXG5jb25zdCBGTEFWT1VSUyA9IFtcblx0eyBsYWJlbDogJ0Nob2NvbGF0ZScsIHZhbHVlOiAnY2hvY29sYXRlJyB9LFxuXHR7IGxhYmVsOiAnVmFuaWxsYScsIHZhbHVlOiAndmFuaWxsYScgfSxcblx0eyBsYWJlbDogJ1N0cmF3YmVycnknLCB2YWx1ZTogJ3N0cmF3YmVycnknIH0sXG5cdHsgbGFiZWw6ICdDYXJhbWVsJywgdmFsdWU6ICdjYXJhbWVsJyB9LFxuXHR7IGxhYmVsOiAnQ29va2llcyBhbmQgQ3JlYW0nLCB2YWx1ZTogJ2Nvb2tpZXNjcmVhbScgfSxcblx0eyBsYWJlbDogJ1BlcHBlcm1pbnQnLCB2YWx1ZTogJ3BlcHBlcm1pbnQnIH0sXG5dO1xuXG5jb25zdCBXSFlfV09VTERfWU9VID0gW1xuXHR7IGxhYmVsOiAnQ2hvY29sYXRlIChhcmUgeW91IGNyYXp5PyknLCB2YWx1ZTogJ2Nob2NvbGF0ZScsIGRpc2FibGVkOiB0cnVlIH0sXG5dLmNvbmNhdChGTEFWT1VSUy5zbGljZSgxKSk7XG5cbnZhciBNdWx0aVNlbGVjdEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ011bHRpU2VsZWN0RmllbGQnLFxuXHRwcm9wVHlwZXM6IHtcblx0XHRsYWJlbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGlzYWJsZWQ6IGZhbHNlLFxuXHRcdFx0Y3Jhenk6IGZhbHNlLFxuXHRcdFx0b3B0aW9uczogRkxBVk9VUlMsXG5cdFx0XHR2YWx1ZTogW10sXG5cdFx0fTtcblx0fSxcblx0aGFuZGxlU2VsZWN0Q2hhbmdlICh2YWx1ZSkge1xuXHRcdGNvbnNvbGUubG9nKCdZb3VcXCd2ZSBzZWxlY3RlZDonLCB2YWx1ZSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IHZhbHVlIH0pO1xuXHR9LFxuXHR0b2dnbGVEaXNhYmxlZCAoZSkge1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBkaXNhYmxlZDogZS50YXJnZXQuY2hlY2tlZCB9KTtcblx0fSxcblx0dG9nZ2xlQ2hvY29sYXRlIChlKSB7XG5cdFx0bGV0IGNyYXp5ID0gZS50YXJnZXQuY2hlY2tlZDtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdGNyYXp5OiBjcmF6eSxcblx0XHRcdG9wdGlvbnM6IGNyYXp5ID8gV0hZX1dPVUxEX1lPVSA6IEZMQVZPVVJTLFxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3QgbXVsdGkgc2ltcGxlVmFsdWUgZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSBwbGFjZWhvbGRlcj1cIlNlbGVjdCB5b3VyIGZhdm91cml0ZShzKVwiIG9wdGlvbnM9e3RoaXMuc3RhdGUub3B0aW9uc30gb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VsZWN0Q2hhbmdlfSAvPlxuXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3gtbGlzdFwiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSBvbkNoYW5nZT17dGhpcy50b2dnbGVEaXNhYmxlZH0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImNoZWNrYm94LWxhYmVsXCI+RGlzYWJsZSB0aGUgY29udHJvbDwvc3Bhbj5cblx0XHRcdFx0XHQ8L2xhYmVsPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLmNyYXp5fSBvbkNoYW5nZT17dGhpcy50b2dnbGVDaG9jb2xhdGV9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPkkgZG9uJ3QgbGlrZSBDaG9jb2xhdGUgKGRpc2FibGVkIHRoZSBvcHRpb24pPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTXVsdGlTZWxlY3RGaWVsZDtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5cbnZhciBWYWx1ZXNBc051bWJlcnNGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblx0ZGlzcGxheU5hbWU6ICdWYWx1ZXNBc051bWJlcnNGaWVsZCcsXG5cdHByb3BUeXBlczoge1xuXHRcdGxhYmVsOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG9wdGlvbnM6IFtcblx0XHRcdFx0eyB2YWx1ZTogMTAsIGxhYmVsOiAnVGVuJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAxMSwgbGFiZWw6ICdFbGV2ZW4nIH0sXG5cdFx0XHRcdHsgdmFsdWU6IDEyLCBsYWJlbDogJ1R3ZWx2ZScgfSxcblx0XHRcdFx0eyB2YWx1ZTogMjMsIGxhYmVsOiAnVHdlbnR5LXRocmVlJyB9LFxuXHRcdFx0XHR7IHZhbHVlOiAyNCwgbGFiZWw6ICdUd2VudHktZm91cicgfVxuXHRcdFx0XSxcblx0XHRcdG1hdGNoUG9zOiAnYW55Jyxcblx0XHRcdG1hdGNoVmFsdWU6IHRydWUsXG5cdFx0XHRtYXRjaExhYmVsOiB0cnVlLFxuXHRcdFx0dmFsdWU6IG51bGwsXG5cdFx0XHRtdWx0aTogZmFsc2Vcblx0XHR9O1xuXHR9LFxuXHRvbkNoYW5nZU1hdGNoU3RhcnQoZXZlbnQpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG1hdGNoUG9zOiBldmVudC50YXJnZXQuY2hlY2tlZCA/ICdzdGFydCcgOiAnYW55J1xuXHRcdH0pO1xuXHR9LFxuXHRvbkNoYW5nZU1hdGNoVmFsdWUoZXZlbnQpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG1hdGNoVmFsdWU6IGV2ZW50LnRhcmdldC5jaGVja2VkXG5cdFx0fSk7XG5cdH0sXG5cdG9uQ2hhbmdlTWF0Y2hMYWJlbChldmVudCkge1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0bWF0Y2hMYWJlbDogZXZlbnQudGFyZ2V0LmNoZWNrZWRcblx0XHR9KTtcblx0fSxcblx0b25DaGFuZ2UodmFsdWUpIHtcblx0XHR0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7XG5cdFx0Y29uc29sZS5sb2coJ051bWVyaWMgU2VsZWN0IHZhbHVlIGNoYW5nZWQgdG8nLCB2YWx1ZSk7XG5cdH0sXG5cdG9uQ2hhbmdlTXVsdGkoZXZlbnQpIHtcblx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdG11bHRpOiBldmVudC50YXJnZXQuY2hlY2tlZFxuXHRcdH0pO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdHZhciBtYXRjaFByb3AgPSAnYW55Jztcblx0XHRpZiAodGhpcy5zdGF0ZS5tYXRjaExhYmVsICYmICF0aGlzLnN0YXRlLm1hdGNoVmFsdWUpIHtcblx0XHRcdG1hdGNoUHJvcCA9ICdsYWJlbCc7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5zdGF0ZS5tYXRjaExhYmVsICYmIHRoaXMuc3RhdGUubWF0Y2hWYWx1ZSkge1xuXHRcdFx0bWF0Y2hQcm9wID0gJ3ZhbHVlJztcblx0XHR9XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwic2VjdGlvblwiPlxuXHRcdFx0XHQ8aDMgY2xhc3NOYW1lPVwic2VjdGlvbi1oZWFkaW5nXCI+e3RoaXMucHJvcHMubGFiZWx9PC9oMz5cblx0XHRcdFx0PFNlbGVjdFxuXHRcdFx0XHRcdG1hdGNoUG9zPXt0aGlzLnN0YXRlLm1hdGNoUG9zfVxuXHRcdFx0XHRcdG1hdGNoUHJvcD17bWF0Y2hQcm9wfVxuXHRcdFx0XHRcdG11bHRpPXt0aGlzLnN0YXRlLm11bHRpfVxuXHRcdFx0XHRcdG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlfVxuXHRcdFx0XHRcdG9wdGlvbnM9e3RoaXMuc3RhdGUub3B0aW9uc31cblx0XHRcdFx0XHRzaW1wbGVWYWx1ZVxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfVxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3gtbGlzdFwiPlxuXHRcdFx0XHRcdDxsYWJlbCBjbGFzc05hbWU9XCJjaGVja2JveFwiPlxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT1cImNoZWNrYm94LWNvbnRyb2xcIiBjaGVja2VkPXt0aGlzLnN0YXRlLm11bHRpfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU11bHRpfSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5NdWx0aS1TZWxlY3Q8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tYXRjaFZhbHVlfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU1hdGNoVmFsdWV9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk1hdGNoIHZhbHVlIG9ubHk8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tYXRjaExhYmVsfSBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZU1hdGNoTGFiZWx9IC8+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJjaGVja2JveC1sYWJlbFwiPk1hdGNoIGxhYmVsIG9ubHk8L3NwYW4+XG5cdFx0XHRcdFx0PC9sYWJlbD5cblx0XHRcdFx0XHQ8bGFiZWwgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzc05hbWU9XCJjaGVja2JveC1jb250cm9sXCIgY2hlY2tlZD17dGhpcy5zdGF0ZS5tYXRjaFBvcyA9PT0gJ3N0YXJ0J30gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2VNYXRjaFN0YXJ0fSAvPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiY2hlY2tib3gtbGFiZWxcIj5Pbmx5IGluY2x1ZGUgbWF0Y2hlcyBmcm9tIHRoZSBzdGFydCBvZiB0aGUgc3RyaW5nPC9zcGFuPlxuXHRcdFx0XHRcdDwvbGFiZWw+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImhpbnRcIj5UaGlzIGV4YW1wbGUgdXNlcyBzaW1wbGUgbnVtZXJpYyB2YWx1ZXM8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdCk7XG5cdH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZhbHVlc0FzTnVtYmVyc0ZpZWxkO1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuY29uc3QgU0VBUkNIID0gcmVxdWlyZSgnLi4vZGF0YS9zZWFyY2gnKTtcblxudmFyIFN0YXRlc0ZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXHRkaXNwbGF5TmFtZTogJ1N0YXRlc0ZpZWxkJyxcblx0cHJvcFR5cGVzOiB7XG5cdFx0bGFiZWw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c2VhcmNoYWJsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG5cdH0sXG5cdGdldERlZmF1bHRQcm9wcyAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGxhYmVsOiAnU2VhcmNoOicsXG5cdFx0XHRzZWFyY2hhYmxlOiB0cnVlLFxuXHRcdH07XG5cdH0sXG5cdGdldEluaXRpYWxTdGF0ZSAoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNlYXJjaGFibGU6IHRoaXMucHJvcHMuc2VhcmNoYWJsZSxcblx0XHRcdHNlbGVjdFZhbHVlOiAnbmV3LXNvdXRoLXdhbGVzJyxcblx0XHRcdGNsZWFyYWJsZTogdHJ1ZSxcblx0XHR9O1xuXHR9LFxuXHR1cGRhdGVWYWx1ZSAobmV3VmFsdWUpIHtcblx0XHRjb25zb2xlLmxvZygnU3RhdGUgY2hhbmdlZCB0byAnICsgbmV3VmFsdWUpO1xuXHRcdHRoaXMuc2V0U3RhdGUoe1xuXHRcdFx0c2VsZWN0VmFsdWU6IG5ld1ZhbHVlXG5cdFx0fSk7XG5cdH0sXG5cdGZvY3VzU3RhdGVTZWxlY3QgKCkge1xuXHRcdHRoaXMucmVmcy5zdGF0ZVNlbGVjdC5mb2N1cygpO1xuXHR9LFxuXHRyZW5kZXIgKCkge1xuXHRcdC8vIHZhciBvcHRpb25zID0gU1RBVEVTW3RoaXMuc3RhdGUuY291bnRyeV07XG5cdFx0IHZhciBtYXBwZWRTZWFyY2ggPSBTRUFSQ0gubWFwKCAoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIHt2YWx1ZTogaXRlbS5uYW1lLCBsYWJlbDogaXRlbS5uYW1lfVxuICAgIH0pO1xuXHRcdHZhciBvcHRpb25zID0gbWFwcGVkU2VhcmNoO1xuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInNlY3Rpb25cIj5cblx0XHRcdFx0PGgzIGNsYXNzTmFtZT1cInNlY3Rpb24taGVhZGluZ1wiPnt0aGlzLnByb3BzLmxhYmVsfTwvaDM+XG5cdFx0XHRcdDxTZWxlY3QgXG5cdFx0XHRcdFx0cmVmPVwic3RhdGVTZWxlY3RcIiBcblx0XHRcdFx0XHRhdXRvZm9jdXMgb3B0aW9ucz17b3B0aW9uc30gXG5cdFx0XHRcdFx0c2ltcGxlVmFsdWUgXG5cdFx0XHRcdFx0Y2xlYXJhYmxlPXt0cnVlfSBcblx0XHRcdFx0XHRuYW1lPVwic2VsZWN0ZWQtc3RhdGVcIiBcblx0XHRcdFx0XHRkaXNhYmxlZD17ZmFsc2V9IFxuXHRcdFx0XHRcdHZhbHVlPXt0aGlzLnN0YXRlLnNlbGVjdFZhbHVlfSBcblx0XHRcdFx0XHRvbkNoYW5nZT17dGhpcy51cGRhdGVWYWx1ZX0gXG5cdFx0XHRcdFx0c2VhcmNoYWJsZT17dHJ1ZX0gLz5cblxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBTdGF0ZXNGaWVsZDtcbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuXHR7IGdpdGh1YjogJ2plZHdhdHNvbicsIG5hbWU6ICdKZWQgV2F0c29uJyB9LFxuXHR7IGdpdGh1YjogJ2JydWRlcnN0ZWluJywgbmFtZTogJ0RhdmUgQnJvdGhlcnN0b25lJyB9LFxuXHR7IGdpdGh1YjogJ2pvc3NtYWMnLCBuYW1lOiAnSm9zcyBNYWNraXNvbicgfSxcblx0eyBnaXRodWI6ICdqbmllY2hjaWFsJywgbmFtZTogJ0pha3ViIE5pZWNoY2lhxYInIH0sXG5cdHsgZ2l0aHViOiAnY3JhaWdkYWxsaW1vcmUnLCBuYW1lOiAnQ3JhaWcgRGFsbGltb3JlJyB9LFxuXHR7IGdpdGh1YjogJ2p1bGVuJywgbmFtZTogJ0p1bGVuIFJ1aXogQWl6cHVydScgfSxcblx0eyBnaXRodWI6ICdkY291c2VucycsIG5hbWU6ICdEYW5pZWwgQ291c2VucycgfSxcblx0eyBnaXRodWI6ICdqZ2F1dHNjaCcsIG5hbWU6ICdKb24gR2F1dHNjaCcgfSxcblx0eyBnaXRodWI6ICdkbWl0cnktc21pcm5vdicsIG5hbWU6ICdEbWl0cnkgU21pcm5vdicgfSxcbl07XG4iLCJjb25zdCBTRUFSQ0ggPSBbe1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTQxZWYzNWQ4YTEzMzMwMGVcIixcbiAgICBcInR5cGVcIjogXCJlcGlzb2RlXCIsXG4gICAgXCJuYW1lXCI6IFwiQmVudG9uIERyYWtlXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTc3ZTliMWM0YTFlNWRiYzRcIixcbiAgICBcInR5cGVcIjogXCJzZXJpZXNcIixcbiAgICBcIm5hbWVcIjogXCJOb2VsIFdhbGxcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1MGQ1OGJmNGU4YzAwMTYwYlwiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIkplcnJ5IFN0ZXBoZW5zb25cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1OWY5NjgxODRkNTU1YzY2NVwiLFxuICAgIFwidHlwZVwiOiBcImVwaXNvZGVcIixcbiAgICBcIm5hbWVcIjogXCJNYXJ0aW5hIEZsb3Jlc1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjU4MDg3NDg1MDhjODNjNjUxXCIsXG4gICAgXCJ0eXBlXCI6IFwibW92aWVcIixcbiAgICBcIm5hbWVcIjogXCJLcmlzIENhbnRyZWxsXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNWUxYTk2NzNiY2U2YTEzMTVcIixcbiAgICBcInR5cGVcIjogXCJzZXJpZXNcIixcbiAgICBcIm5hbWVcIjogXCJUb3duc2VuZCBQb3J0ZXJcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1M2JiYjgzNjRmMjdlY2IwN1wiLFxuICAgIFwidHlwZVwiOiBcIm1vdmllXCIsXG4gICAgXCJuYW1lXCI6IFwiQ2Fyb2x5biBMZXZ5XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTczZTVkNjlkYTg4MzVlMjVcIixcbiAgICBcInR5cGVcIjogXCJlcGlzb2RlXCIsXG4gICAgXCJuYW1lXCI6IFwiTWNuZWlsIExhbmRyeVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjU3ZGM5NWE3ZGEyNzUyNGRlXCIsXG4gICAgXCJ0eXBlXCI6IFwibW92aWVcIixcbiAgICBcIm5hbWVcIjogXCJZYW5nIFBpdHRzXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTNmOTk0MmVmMzg4N2M5ZTFcIixcbiAgICBcInR5cGVcIjogXCJtb3ZpZVwiLFxuICAgIFwibmFtZVwiOiBcIlN0ZWZhbmllIE1hcnRpbmV6XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNWY2NDdhNmFhZjg2OThhMTlcIixcbiAgICBcInR5cGVcIjogXCJzZXJpZXNcIixcbiAgICBcIm5hbWVcIjogXCJSb3NlIERhbGVcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1N2MzNThkY2EwYzMyMmRmOFwiLFxuICAgIFwidHlwZVwiOiBcImVwaXNvZGVcIixcbiAgICBcIm5hbWVcIjogXCJNYXJjeSBTdHJpY2tsYW5kXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTMxYmM5NzQ5NDJlZDFhM2FcIixcbiAgICBcInR5cGVcIjogXCJlcGlzb2RlXCIsXG4gICAgXCJuYW1lXCI6IFwiV2VhdmVyIEhpZ2dpbnNcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1MTNlNjNhOWViMzYyOGQxMlwiLFxuICAgIFwidHlwZVwiOiBcIm1vdmllXCIsXG4gICAgXCJuYW1lXCI6IFwiSGFydCBTaGVybWFuXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNWQxYmUwOGRiMGU1ODhjYzNcIixcbiAgICBcInR5cGVcIjogXCJzZXJpZXNcIixcbiAgICBcIm5hbWVcIjogXCJDaGFuZGxlciBDaGFuXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTMyMGExYTE0NzdlY2E3OTdcIixcbiAgICBcInR5cGVcIjogXCJlcGlzb2RlXCIsXG4gICAgXCJuYW1lXCI6IFwiU2hhbm5vbiBUYWxsZXlcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1MmQ1YmNiNWIxOTE1MDkwMFwiLFxuICAgIFwidHlwZVwiOiBcImVwaXNvZGVcIixcbiAgICBcIm5hbWVcIjogXCJBZ3VpbGFyIFZhbmdcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1ZWMwMmRiYzRmMjcxOTRkYVwiLFxuICAgIFwidHlwZVwiOiBcImVwaXNvZGVcIixcbiAgICBcIm5hbWVcIjogXCJFdGhlbCBTdGVwaGVuc1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjU0YmQ4NTExYzY5NTI0YTJkXCIsXG4gICAgXCJ0eXBlXCI6IFwibW92aWVcIixcbiAgICBcIm5hbWVcIjogXCJDaGFuZXkgQmFpcmRcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1MjM0ODczMjA0OGEyYmUwZVwiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIkFpbGVlbiBDaHJpc3RlbnNlblwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjU5ZWJkZjQ3NjhiYzE2MmE5XCIsXG4gICAgXCJ0eXBlXCI6IFwiY2VsZWJyaXR5XCIsXG4gICAgXCJuYW1lXCI6IFwiRGF1Z2hlcnR5IE1jY2x1cmVcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1NzVmMjFjMDViMWU1YTZjNVwiLFxuICAgIFwidHlwZVwiOiBcImNlbGVicml0eVwiLFxuICAgIFwibmFtZVwiOiBcIklzYWJlbGxlIE9jb25ub3JcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1ZTk4NzBmOGViZDYzNTk2NVwiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIkxvcnJpZSBQZXJraW5zXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTc5MzJlNTc2YTA5Y2M2YmRcIixcbiAgICBcInR5cGVcIjogXCJzZXJpZXNcIixcbiAgICBcIm5hbWVcIjogXCJEaWxsb24gSGFydFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjUwODBjOWE3YmY5Njc0ZmE3XCIsXG4gICAgXCJ0eXBlXCI6IFwibW92aWVcIixcbiAgICBcIm5hbWVcIjogXCJTYW5jaGV6IE5vZWxcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1YmI1NjRmM2U1YWI3MTZkOVwiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIldvbGYgUmVpZFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjViYzg3YjBjMzQ5ZTdlYjc3XCIsXG4gICAgXCJ0eXBlXCI6IFwiY2VsZWJyaXR5XCIsXG4gICAgXCJuYW1lXCI6IFwiRWRpdGggU2V4dG9uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTIxMDgyNTMxNTJiMTlmNzBcIixcbiAgICBcInR5cGVcIjogXCJtb3ZpZVwiLFxuICAgIFwibmFtZVwiOiBcIlJvc2V0dGEgU2xvYW5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1ODc2ZTgyMzA3ZTNhZDYzY1wiLFxuICAgIFwidHlwZVwiOiBcIm1vdmllXCIsXG4gICAgXCJuYW1lXCI6IFwiUmV2YSBDYXN0aWxsb1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjVhZjIxZDJjNTdjM2I2MGFkXCIsXG4gICAgXCJ0eXBlXCI6IFwiZXBpc29kZVwiLFxuICAgIFwibmFtZVwiOiBcIkJyYWR5IEJhcnRsZXR0XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTJmNmQ2NGUwMTA5ZDdiZWVcIixcbiAgICBcInR5cGVcIjogXCJtb3ZpZVwiLFxuICAgIFwibmFtZVwiOiBcIkF5ZXJzIFBvd2Vyc1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjVhMzI2OTYwNmQ3MDg5ODc2XCIsXG4gICAgXCJ0eXBlXCI6IFwibW92aWVcIixcbiAgICBcIm5hbWVcIjogXCJWZXJhIE9zYm9ybmVcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1YzZhNzM1NjFiZGM3NmY5YlwiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIkFudG9uaWEgTmd1eWVuXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNWFmZTJhYTk5ZjIyMDEwNjVcIixcbiAgICBcInR5cGVcIjogXCJjZWxlYnJpdHlcIixcbiAgICBcIm5hbWVcIjogXCJUYXNoYSBXYXJkXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNWNkZTM3MTc3YzI2NTgyYjBcIixcbiAgICBcInR5cGVcIjogXCJlcGlzb2RlXCIsXG4gICAgXCJuYW1lXCI6IFwiV2lsa2Vyc29uIFBhdWxcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1ZTE0ODI1ZjBlNmI3ODY2NlwiLFxuICAgIFwidHlwZVwiOiBcImVwaXNvZGVcIixcbiAgICBcIm5hbWVcIjogXCJBbWFuZGEgT2JyaWVuXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTNlMDBlMDEwNjZkNzBlNDZcIixcbiAgICBcInR5cGVcIjogXCJtb3ZpZVwiLFxuICAgIFwibmFtZVwiOiBcIkNhcm1lbiBQaGVscHNcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1YzQ4ZGYwMjY3Zjg3ODU3MFwiLFxuICAgIFwidHlwZVwiOiBcIm1vdmllXCIsXG4gICAgXCJuYW1lXCI6IFwiTGlsaWFuIEJ5ZXJzXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTU5MTBlMGY1NDgwZGFjYTBcIixcbiAgICBcInR5cGVcIjogXCJtb3ZpZVwiLFxuICAgIFwibmFtZVwiOiBcIk1jY3VsbG91Z2ggUm95XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNWRiMjE5ZDM3NzU5YjY5ZjFcIixcbiAgICBcInR5cGVcIjogXCJlcGlzb2RlXCIsXG4gICAgXCJuYW1lXCI6IFwiU29jb3JybyBNYWNkb25hbGRcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1ODRkOTFjOWNmMjY3ZjMyOFwiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIldpbGNveCBTdGV3YXJ0XCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTY0MzI3ZmI5MTIyMDJmYzBcIixcbiAgICBcInR5cGVcIjogXCJlcGlzb2RlXCIsXG4gICAgXCJuYW1lXCI6IFwiR2VvcmdlIE1vb25leVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjUzMmRhMjI1NmY0OGIyMzg5XCIsXG4gICAgXCJ0eXBlXCI6IFwibW92aWVcIixcbiAgICBcIm5hbWVcIjogXCJDb3JhIE1vc2xleVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjVjOGQ1NTFjN2YzNjczMTQ0XCIsXG4gICAgXCJ0eXBlXCI6IFwic2VyaWVzXCIsXG4gICAgXCJuYW1lXCI6IFwiVHJhdmlzIE1vbGluYVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjUzMzk2MGU3YWVkNjc3YzhhXCIsXG4gICAgXCJ0eXBlXCI6IFwibW92aWVcIixcbiAgICBcIm5hbWVcIjogXCJMZXNzaWUgU3dlZW5leVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjVjMDE3Yzk4ZGYzNzczNTkzXCIsXG4gICAgXCJ0eXBlXCI6IFwiZXBpc29kZVwiLFxuICAgIFwibmFtZVwiOiBcIk1jZGFuaWVsIEJyYXlcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1MmYxNzc0NzM2ZWQ5MWUxM1wiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIlJvc2EgSGVycmluZ1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjU2MDhmNjYxY2E0MDAxMDIzXCIsXG4gICAgXCJ0eXBlXCI6IFwiZXBpc29kZVwiLFxuICAgIFwibmFtZVwiOiBcIkN5bnRoaWEgSHVtcGhyZXlcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1ZmJhOTBlZDBmM2YxN2YwMVwiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIkJ1Y2sgSG91c2VcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1MTRhODJjNmU0M2MwOGQ4N1wiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIkpvYW5uYSBNYW5uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTExZjAwMmI0Y2RiZDRiZjRcIixcbiAgICBcInR5cGVcIjogXCJzZXJpZXNcIixcbiAgICBcIm5hbWVcIjogXCJNY2tlZSBQYXJrZXJcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1OGExZmM4YjRiY2YxN2E4YVwiLFxuICAgIFwidHlwZVwiOiBcImNlbGVicml0eVwiLFxuICAgIFwibmFtZVwiOiBcIkhheXMgR2FyemFcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1MzFhYTYwNTMzMmFlMjQ3MFwiLFxuICAgIFwidHlwZVwiOiBcImVwaXNvZGVcIixcbiAgICBcIm5hbWVcIjogXCJJbGEgQ3VydGlzXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTBlOWNhNWY2YjY4Mjc3YWJcIixcbiAgICBcInR5cGVcIjogXCJtb3ZpZVwiLFxuICAgIFwibmFtZVwiOiBcIlN0ZWluIEhpbmVzXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTE4MzQ3MTdlYzg2YTljMWNcIixcbiAgICBcInR5cGVcIjogXCJjZWxlYnJpdHlcIixcbiAgICBcIm5hbWVcIjogXCJSb2JpbnNvbiBNY25laWxcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1ZWQ3ODAxZTM4Mjc4ZDE2N1wiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIkpvZHkgU2hpZWxkc1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjU2OGZjNjA5OGQwMzQyODM1XCIsXG4gICAgXCJ0eXBlXCI6IFwiY2VsZWJyaXR5XCIsXG4gICAgXCJuYW1lXCI6IFwiUmF5IFdpbGNveFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjVhNGJhOWQxZWM5NWIzMTc1XCIsXG4gICAgXCJ0eXBlXCI6IFwiY2VsZWJyaXR5XCIsXG4gICAgXCJuYW1lXCI6IFwiTGluZHNheSBHdXRpZXJyZXpcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1ZmNhNGZmMmU2ZTliYzBmYlwiLFxuICAgIFwidHlwZVwiOiBcImNlbGVicml0eVwiLFxuICAgIFwibmFtZVwiOiBcIkdhbGxvd2F5IEphY29ic1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjU4MzQyMjA3YzkyZTA2YzYxXCIsXG4gICAgXCJ0eXBlXCI6IFwibW92aWVcIixcbiAgICBcIm5hbWVcIjogXCJLYXRobGVlbiBSeWFuXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNThkNTRmODY0YjIwYmY3NThcIixcbiAgICBcInR5cGVcIjogXCJjZWxlYnJpdHlcIixcbiAgICBcIm5hbWVcIjogXCJFc3RlcyBWYW5jZVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjViNjAwYjEzYTNlMTRiNWIzXCIsXG4gICAgXCJ0eXBlXCI6IFwic2VyaWVzXCIsXG4gICAgXCJuYW1lXCI6IFwiTWFubiBTYW5mb3JkXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTg0NmI2NzRjMzRkZTMyYmVcIixcbiAgICBcInR5cGVcIjogXCJjZWxlYnJpdHlcIixcbiAgICBcIm5hbWVcIjogXCJHcmF2ZXMgQmVyZ1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjU5ODcwZDg0MzZhMzNiNTgyXCIsXG4gICAgXCJ0eXBlXCI6IFwiZXBpc29kZVwiLFxuICAgIFwibmFtZVwiOiBcIlN0cmlja2xhbmQgVmFsZW50aW5lXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNWIzZTg1YTQ5ZDdkYTMyNjFcIixcbiAgICBcInR5cGVcIjogXCJtb3ZpZVwiLFxuICAgIFwibmFtZVwiOiBcIkRlaWRyZSBIZW5kZXJzb25cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1NzU0YTFiYmM1ZmVlZDk4OVwiLFxuICAgIFwidHlwZVwiOiBcIm1vdmllXCIsXG4gICAgXCJuYW1lXCI6IFwiSG9wa2lucyBTZXJyYW5vXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNWZlMzgzNDIwYTJkNTg4ODJcIixcbiAgICBcInR5cGVcIjogXCJzZXJpZXNcIixcbiAgICBcIm5hbWVcIjogXCJTb3NhIEhpY2tzXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTNjNjVkNjYyMmRkZGNkNzNcIixcbiAgICBcInR5cGVcIjogXCJtb3ZpZVwiLFxuICAgIFwibmFtZVwiOiBcIkFuZ2VsaXF1ZSBXYWxzaFwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjVmMDI3YTA5OGNhYTIzODJhXCIsXG4gICAgXCJ0eXBlXCI6IFwic2VyaWVzXCIsXG4gICAgXCJuYW1lXCI6IFwiT3JyIENvbG9uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNWJhYTAxNmY5ZDhhYWE3MGNcIixcbiAgICBcInR5cGVcIjogXCJtb3ZpZVwiLFxuICAgIFwibmFtZVwiOiBcIk1hcnNoYWxsIEdyYWhhbVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjUxOWU4ZTVhZjI1YzRhOGYwXCIsXG4gICAgXCJ0eXBlXCI6IFwibW92aWVcIixcbiAgICBcIm5hbWVcIjogXCJSb3NlbWFyaWUgUHJpY2VcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1MzBhZTc2Y2IzZjg3ODIxMFwiLFxuICAgIFwidHlwZVwiOiBcIm1vdmllXCIsXG4gICAgXCJuYW1lXCI6IFwiQ2xpbmUgRmxlbWluZ1wiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjU1YWIzYzRjNzcyOWM0MDg2XCIsXG4gICAgXCJ0eXBlXCI6IFwibW92aWVcIixcbiAgICBcIm5hbWVcIjogXCJNaXJpYW0gQ2FydGVyXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTkxZjgzNDVkMmI4MjA4ZDhcIixcbiAgICBcInR5cGVcIjogXCJjZWxlYnJpdHlcIixcbiAgICBcIm5hbWVcIjogXCJCcmlnZ3MgUmF0bGlmZlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjU0MTcyOTkzM2M5YmUzYTYxXCIsXG4gICAgXCJ0eXBlXCI6IFwiY2VsZWJyaXR5XCIsXG4gICAgXCJuYW1lXCI6IFwiQnV0bGVyIE1lYWRvd3NcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1MzljMzJhZTgzNGUwNThmZlwiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIkZheSBQYXR0b25cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1NGExMGIyNjM3ZWJhOGViOVwiLFxuICAgIFwidHlwZVwiOiBcInNlcmllc1wiLFxuICAgIFwibmFtZVwiOiBcIkNyb3NzIEhheWVzXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNWM3M2FmMzIxODIwZWUzZmJcIixcbiAgICBcInR5cGVcIjogXCJlcGlzb2RlXCIsXG4gICAgXCJuYW1lXCI6IFwiQ2hyaXN0aW5hIEF1c3RpblwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjUyYmI5NWU0NjM1YTc4N2RlXCIsXG4gICAgXCJ0eXBlXCI6IFwiY2VsZWJyaXR5XCIsXG4gICAgXCJuYW1lXCI6IFwiVGVycmllIFdpbnRlcnNcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1OGVlOGUyYjQxYjUzZWE0MVwiLFxuICAgIFwidHlwZVwiOiBcImVwaXNvZGVcIixcbiAgICBcIm5hbWVcIjogXCJDYWxkZXJvbiBPcnJcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1YmJmMWUyMjhhNDE3MmU3YlwiLFxuICAgIFwidHlwZVwiOiBcIm1vdmllXCIsXG4gICAgXCJuYW1lXCI6IFwiQWRkaWUgR2lsbW9yZVwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiNTZiYjk3MjVkNDNmYzQyY2VmZDYyOTVhXCIsXG4gICAgXCJ0eXBlXCI6IFwic2VyaWVzXCIsXG4gICAgXCJuYW1lXCI6IFwiSmFjbHluIE1vbnRveWFcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1MzlhYjJhYjQ5YmY0NjhmMlwiLFxuICAgIFwidHlwZVwiOiBcImVwaXNvZGVcIixcbiAgICBcIm5hbWVcIjogXCJTaGlybGV5IE1vbnRnb21lcnlcIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIjU2YmI5NzI1ZDk0YjhmNzk2ZWY4YTQ3MFwiLFxuICAgIFwidHlwZVwiOiBcImVwaXNvZGVcIixcbiAgICBcIm5hbWVcIjogXCJNYXlvIEpveWNlXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNWFhNzY0Mzc5Y2MyNzE0Y2VcIixcbiAgICBcInR5cGVcIjogXCJjZWxlYnJpdHlcIixcbiAgICBcIm5hbWVcIjogXCJGbG9yYSBXYWxsYWNlXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCI1NmJiOTcyNTM1OTg2ZTdlNzJiM2NkZDRcIixcbiAgICBcInR5cGVcIjogXCJjZWxlYnJpdHlcIixcbiAgICBcIm5hbWVcIjogXCJOZWxzb24gS25hcHBcIlxuICB9XTtcblxubW9kdWxlLmV4cG9ydHMgPSBTRUFSQ0g7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcblx0eyB2YWx1ZTogJ0pvaG4gU21pdGgnLCBsYWJlbDogJ0pvaG4gU21pdGgnLCBlbWFpbDogJ2pvaG5Ac21pdGguY29tJyB9LFxuXHR7IHZhbHVlOiAnTWVycnkgSmFuZScsIGxhYmVsOiAnTWVycnkgSmFuZScsIGVtYWlsOiAnbWVycnlAamFuZS5jb20nIH0sXG5cdHsgdmFsdWU6ICdTdGFuIEhvcGVyJywgbGFiZWw6ICdTdGFuIEhvcGVyJywgZW1haWw6ICdzdGFuQGhvcGVyLmNvbScgfVxuXTtcbiIsIi8qIGVzbGludCByZWFjdC9wcm9wLXR5cGVzOiAwICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcblxuaW1wb3J0IENvbnRyaWJ1dG9ycyBmcm9tICcuL2NvbXBvbmVudHMvQ29udHJpYnV0b3JzJztcbmltcG9ydCBDdXN0b21Db21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cy9DdXN0b21Db21wb25lbnRzJztcbmltcG9ydCBDdXN0b21SZW5kZXIgZnJvbSAnLi9jb21wb25lbnRzL0N1c3RvbVJlbmRlcic7XG5pbXBvcnQgTXVsdGlzZWxlY3QgZnJvbSAnLi9jb21wb25lbnRzL011bHRpc2VsZWN0JztcbmltcG9ydCBOdW1lcmljU2VsZWN0IGZyb20gJy4vY29tcG9uZW50cy9OdW1lcmljU2VsZWN0JztcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi9jb21wb25lbnRzL1NlYXJjaFRlc3QnO1xuXG5SZWFjdERPTS5yZW5kZXIoXG5cdDxkaXY+XG5cdFx0PFNlYXJjaCBsYWJlbD1cIlNlYXJjaFwiIHNlYXJjaGFibGUgLz5cblx0XHR7Lypcblx0XHQ8U2VsZWN0ZWRWYWx1ZXNGaWVsZCBsYWJlbD1cIk9wdGlvbiBDcmVhdGlvbiAodGFncyBtb2RlKVwiIG9wdGlvbnM9e0ZMQVZPVVJTfSBhbGxvd0NyZWF0ZSBoaW50PVwiRW50ZXIgYSB2YWx1ZSB0aGF0J3MgTk9UIGluIHRoZSBsaXN0LCB0aGVuIGhpdCByZXR1cm5cIiAvPlxuXHRcdCovfVxuXHQ8L2Rpdj4sXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGFtcGxlJylcbik7XG4iLCJ2YXIgY2hhcmVuYyA9IHtcbiAgLy8gVVRGLTggZW5jb2RpbmdcbiAgdXRmODoge1xuICAgIC8vIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBieXRlIGFycmF5XG4gICAgc3RyaW5nVG9CeXRlczogZnVuY3Rpb24oc3RyKSB7XG4gICAgICByZXR1cm4gY2hhcmVuYy5iaW4uc3RyaW5nVG9CeXRlcyh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIHN0cmluZ1xuICAgIGJ5dGVzVG9TdHJpbmc6IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShjaGFyZW5jLmJpbi5ieXRlc1RvU3RyaW5nKGJ5dGVzKSkpO1xuICAgIH1cbiAgfSxcblxuICAvLyBCaW5hcnkgZW5jb2RpbmdcbiAgYmluOiB7XG4gICAgLy8gQ29udmVydCBhIHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBzdHJpbmdUb0J5dGVzOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKVxuICAgICAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRik7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgc3RyaW5nXG4gICAgYnl0ZXNUb1N0cmluZzogZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGZvciAodmFyIHN0ciA9IFtdLCBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKVxuICAgICAgICBzdHIucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldKSk7XG4gICAgICByZXR1cm4gc3RyLmpvaW4oJycpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjaGFyZW5jO1xuIiwiKGZ1bmN0aW9uKCkge1xuICB2YXIgYmFzZTY0bWFwXG4gICAgICA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJyxcblxuICBjcnlwdCA9IHtcbiAgICAvLyBCaXQtd2lzZSByb3RhdGlvbiBsZWZ0XG4gICAgcm90bDogZnVuY3Rpb24obiwgYikge1xuICAgICAgcmV0dXJuIChuIDw8IGIpIHwgKG4gPj4+ICgzMiAtIGIpKTtcbiAgICB9LFxuXG4gICAgLy8gQml0LXdpc2Ugcm90YXRpb24gcmlnaHRcbiAgICByb3RyOiBmdW5jdGlvbihuLCBiKSB7XG4gICAgICByZXR1cm4gKG4gPDwgKDMyIC0gYikpIHwgKG4gPj4+IGIpO1xuICAgIH0sXG5cbiAgICAvLyBTd2FwIGJpZy1lbmRpYW4gdG8gbGl0dGxlLWVuZGlhbiBhbmQgdmljZSB2ZXJzYVxuICAgIGVuZGlhbjogZnVuY3Rpb24obikge1xuICAgICAgLy8gSWYgbnVtYmVyIGdpdmVuLCBzd2FwIGVuZGlhblxuICAgICAgaWYgKG4uY29uc3RydWN0b3IgPT0gTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBjcnlwdC5yb3RsKG4sIDgpICYgMHgwMEZGMDBGRiB8IGNyeXB0LnJvdGwobiwgMjQpICYgMHhGRjAwRkYwMDtcbiAgICAgIH1cblxuICAgICAgLy8gRWxzZSwgYXNzdW1lIGFycmF5IGFuZCBzd2FwIGFsbCBpdGVtc1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuLmxlbmd0aDsgaSsrKVxuICAgICAgICBuW2ldID0gY3J5cHQuZW5kaWFuKG5baV0pO1xuICAgICAgcmV0dXJuIG47XG4gICAgfSxcblxuICAgIC8vIEdlbmVyYXRlIGFuIGFycmF5IG9mIGFueSBsZW5ndGggb2YgcmFuZG9tIGJ5dGVzXG4gICAgcmFuZG9tQnl0ZXM6IGZ1bmN0aW9uKG4pIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW107IG4gPiAwOyBuLS0pXG4gICAgICAgIGJ5dGVzLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGJpZy1lbmRpYW4gMzItYml0IHdvcmRzXG4gICAgYnl0ZXNUb1dvcmRzOiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgd29yZHMgPSBbXSwgaSA9IDAsIGIgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyssIGIgKz0gOClcbiAgICAgICAgd29yZHNbYiA+Pj4gNV0gfD0gYnl0ZXNbaV0gPDwgKDI0IC0gYiAlIDMyKTtcbiAgICAgIHJldHVybiB3b3JkcztcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBiaWctZW5kaWFuIDMyLWJpdCB3b3JkcyB0byBhIGJ5dGUgYXJyYXlcbiAgICB3b3Jkc1RvQnl0ZXM6IGZ1bmN0aW9uKHdvcmRzKSB7XG4gICAgICBmb3IgKHZhciBieXRlcyA9IFtdLCBiID0gMDsgYiA8IHdvcmRzLmxlbmd0aCAqIDMyOyBiICs9IDgpXG4gICAgICAgIGJ5dGVzLnB1c2goKHdvcmRzW2IgPj4+IDVdID4+PiAoMjQgLSBiICUgMzIpKSAmIDB4RkYpO1xuICAgICAgcmV0dXJuIGJ5dGVzO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgYnl0ZSBhcnJheSB0byBhIGhleCBzdHJpbmdcbiAgICBieXRlc1RvSGV4OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgaGV4ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaGV4LnB1c2goKGJ5dGVzW2ldID4+PiA0KS50b1N0cmluZygxNikpO1xuICAgICAgICBoZXgucHVzaCgoYnl0ZXNbaV0gJiAweEYpLnRvU3RyaW5nKDE2KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xuICAgIH0sXG5cbiAgICAvLyBDb252ZXJ0IGEgaGV4IHN0cmluZyB0byBhIGJ5dGUgYXJyYXlcbiAgICBoZXhUb0J5dGVzOiBmdW5jdGlvbihoZXgpIHtcbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGMgPSAwOyBjIDwgaGV4Lmxlbmd0aDsgYyArPSAyKVxuICAgICAgICBieXRlcy5wdXNoKHBhcnNlSW50KGhleC5zdWJzdHIoYywgMiksIDE2KSk7XG4gICAgICByZXR1cm4gYnl0ZXM7XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSBieXRlIGFycmF5IHRvIGEgYmFzZS02NCBzdHJpbmdcbiAgICBieXRlc1RvQmFzZTY0OiBmdW5jdGlvbihieXRlcykge1xuICAgICAgZm9yICh2YXIgYmFzZTY0ID0gW10sIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgICAgdmFyIHRyaXBsZXQgPSAoYnl0ZXNbaV0gPDwgMTYpIHwgKGJ5dGVzW2kgKyAxXSA8PCA4KSB8IGJ5dGVzW2kgKyAyXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspXG4gICAgICAgICAgaWYgKGkgKiA4ICsgaiAqIDYgPD0gYnl0ZXMubGVuZ3RoICogOClcbiAgICAgICAgICAgIGJhc2U2NC5wdXNoKGJhc2U2NG1hcC5jaGFyQXQoKHRyaXBsZXQgPj4+IDYgKiAoMyAtIGopKSAmIDB4M0YpKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBiYXNlNjQucHVzaCgnPScpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJhc2U2NC5qb2luKCcnKTtcbiAgICB9LFxuXG4gICAgLy8gQ29udmVydCBhIGJhc2UtNjQgc3RyaW5nIHRvIGEgYnl0ZSBhcnJheVxuICAgIGJhc2U2NFRvQnl0ZXM6IGZ1bmN0aW9uKGJhc2U2NCkge1xuICAgICAgLy8gUmVtb3ZlIG5vbi1iYXNlLTY0IGNoYXJhY3RlcnNcbiAgICAgIGJhc2U2NCA9IGJhc2U2NC5yZXBsYWNlKC9bXkEtWjAtOStcXC9dL2lnLCAnJyk7XG5cbiAgICAgIGZvciAodmFyIGJ5dGVzID0gW10sIGkgPSAwLCBpbW9kNCA9IDA7IGkgPCBiYXNlNjQubGVuZ3RoO1xuICAgICAgICAgIGltb2Q0ID0gKytpICUgNCkge1xuICAgICAgICBpZiAoaW1vZDQgPT0gMCkgY29udGludWU7XG4gICAgICAgIGJ5dGVzLnB1c2goKChiYXNlNjRtYXAuaW5kZXhPZihiYXNlNjQuY2hhckF0KGkgLSAxKSlcbiAgICAgICAgICAgICYgKE1hdGgucG93KDIsIC0yICogaW1vZDQgKyA4KSAtIDEpKSA8PCAoaW1vZDQgKiAyKSlcbiAgICAgICAgICAgIHwgKGJhc2U2NG1hcC5pbmRleE9mKGJhc2U2NC5jaGFyQXQoaSkpID4+PiAoNiAtIGltb2Q0ICogMikpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBieXRlcztcbiAgICB9XG4gIH07XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBjcnlwdDtcbn0pKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWVkaWFRdWVyeTtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93ICE9PSBudWxsKSB7XG4gICAgbWVkaWFRdWVyeSA9IFwiKC13ZWJraXQtbWluLWRldmljZS1waXhlbC1yYXRpbzogMS4yNSksIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMjUpLCAoLW8tbWluLWRldmljZS1waXhlbC1yYXRpbzogNS80KSwgKG1pbi1yZXNvbHV0aW9uOiAxLjI1ZHBweClcIjtcbiAgICBpZiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxLjI1KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKG1lZGlhUXVlcnkpLm1hdGNoZXMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuIiwiKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGNyeXB0ID0gcmVxdWlyZSgnY3J5cHQnKSxcclxuICAgICAgdXRmOCA9IHJlcXVpcmUoJ2NoYXJlbmMnKS51dGY4LFxyXG4gICAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpLFxyXG4gICAgICBiaW4gPSByZXF1aXJlKCdjaGFyZW5jJykuYmluLFxyXG5cclxuICAvLyBUaGUgY29yZVxyXG4gIG1kNSA9IGZ1bmN0aW9uIChtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICAvLyBDb252ZXJ0IHRvIGJ5dGUgYXJyYXlcclxuICAgIGlmIChtZXNzYWdlLmNvbnN0cnVjdG9yID09IFN0cmluZylcclxuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGluZyA9PT0gJ2JpbmFyeScpXHJcbiAgICAgICAgbWVzc2FnZSA9IGJpbi5zdHJpbmdUb0J5dGVzKG1lc3NhZ2UpO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgbWVzc2FnZSA9IHV0Zjguc3RyaW5nVG9CeXRlcyhtZXNzYWdlKTtcclxuICAgIGVsc2UgaWYgKGlzQnVmZmVyKG1lc3NhZ2UpKVxyXG4gICAgICBtZXNzYWdlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobWVzc2FnZSwgMCk7XHJcbiAgICBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlKSlcclxuICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UudG9TdHJpbmcoKTtcclxuICAgIC8vIGVsc2UsIGFzc3VtZSBieXRlIGFycmF5IGFscmVhZHlcclxuXHJcbiAgICB2YXIgbSA9IGNyeXB0LmJ5dGVzVG9Xb3JkcyhtZXNzYWdlKSxcclxuICAgICAgICBsID0gbWVzc2FnZS5sZW5ndGggKiA4LFxyXG4gICAgICAgIGEgPSAgMTczMjU4NDE5MyxcclxuICAgICAgICBiID0gLTI3MTczMzg3OSxcclxuICAgICAgICBjID0gLTE3MzI1ODQxOTQsXHJcbiAgICAgICAgZCA9ICAyNzE3MzM4Nzg7XHJcblxyXG4gICAgLy8gU3dhcCBlbmRpYW5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBtW2ldID0gKChtW2ldIDw8ICA4KSB8IChtW2ldID4+PiAyNCkpICYgMHgwMEZGMDBGRiB8XHJcbiAgICAgICAgICAgICAoKG1baV0gPDwgMjQpIHwgKG1baV0gPj4+ICA4KSkgJiAweEZGMDBGRjAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBhZGRpbmdcclxuICAgIG1bbCA+Pj4gNV0gfD0gMHg4MCA8PCAobCAlIDMyKTtcclxuICAgIG1bKCgobCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBsO1xyXG5cclxuICAgIC8vIE1ldGhvZCBzaG9ydGN1dHNcclxuICAgIHZhciBGRiA9IG1kNS5fZmYsXHJcbiAgICAgICAgR0cgPSBtZDUuX2dnLFxyXG4gICAgICAgIEhIID0gbWQ1Ll9oaCxcclxuICAgICAgICBJSSA9IG1kNS5faWk7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtLmxlbmd0aDsgaSArPSAxNikge1xyXG5cclxuICAgICAgdmFyIGFhID0gYSxcclxuICAgICAgICAgIGJiID0gYixcclxuICAgICAgICAgIGNjID0gYyxcclxuICAgICAgICAgIGRkID0gZDtcclxuXHJcbiAgICAgIGEgPSBGRihhLCBiLCBjLCBkLCBtW2krIDBdLCAgNywgLTY4MDg3NjkzNik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDFdLCAxMiwgLTM4OTU2NDU4Nik7XHJcbiAgICAgIGMgPSBGRihjLCBkLCBhLCBiLCBtW2krIDJdLCAxNywgIDYwNjEwNTgxOSk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krIDNdLCAyMiwgLTEwNDQ1MjUzMzApO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKyA0XSwgIDcsIC0xNzY0MTg4OTcpO1xyXG4gICAgICBkID0gRkYoZCwgYSwgYiwgYywgbVtpKyA1XSwgMTIsICAxMjAwMDgwNDI2KTtcclxuICAgICAgYyA9IEZGKGMsIGQsIGEsIGIsIG1baSsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krIDddLCAyMiwgLTQ1NzA1OTgzKTtcclxuICAgICAgYSA9IEZGKGEsIGIsIGMsIGQsIG1baSsgOF0sICA3LCAgMTc3MDAzNTQxNik7XHJcbiAgICAgIGQgPSBGRihkLCBhLCBiLCBjLCBtW2krIDldLCAxMiwgLTE5NTg0MTQ0MTcpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKzEwXSwgMTcsIC00MjA2Myk7XHJcbiAgICAgIGIgPSBGRihiLCBjLCBkLCBhLCBtW2krMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xyXG4gICAgICBhID0gRkYoYSwgYiwgYywgZCwgbVtpKzEyXSwgIDcsICAxODA0NjAzNjgyKTtcclxuICAgICAgZCA9IEZGKGQsIGEsIGIsIGMsIG1baSsxM10sIDEyLCAtNDAzNDExMDEpO1xyXG4gICAgICBjID0gRkYoYywgZCwgYSwgYiwgbVtpKzE0XSwgMTcsIC0xNTAyMDAyMjkwKTtcclxuICAgICAgYiA9IEZGKGIsIGMsIGQsIGEsIG1baSsxNV0sIDIyLCAgMTIzNjUzNTMyOSk7XHJcblxyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyAxXSwgIDUsIC0xNjU3OTY1MTApO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKyA2XSwgIDksIC0xMDY5NTAxNjMyKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsxMV0sIDE0LCAgNjQzNzE3NzEzKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgMF0sIDIwLCAtMzczODk3MzAyKTtcclxuICAgICAgYSA9IEdHKGEsIGIsIGMsIGQsIG1baSsgNV0sICA1LCAtNzAxNTU4NjkxKTtcclxuICAgICAgZCA9IEdHKGQsIGEsIGIsIGMsIG1baSsxMF0sICA5LCAgMzgwMTYwODMpO1xyXG4gICAgICBjID0gR0coYywgZCwgYSwgYiwgbVtpKzE1XSwgMTQsIC02NjA0NzgzMzUpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xyXG4gICAgICBhID0gR0coYSwgYiwgYywgZCwgbVtpKyA5XSwgIDUsICA1Njg0NDY0MzgpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKzE0XSwgIDksIC0xMDE5ODAzNjkwKTtcclxuICAgICAgYyA9IEdHKGMsIGQsIGEsIGIsIG1baSsgM10sIDE0LCAtMTg3MzYzOTYxKTtcclxuICAgICAgYiA9IEdHKGIsIGMsIGQsIGEsIG1baSsgOF0sIDIwLCAgMTE2MzUzMTUwMSk7XHJcbiAgICAgIGEgPSBHRyhhLCBiLCBjLCBkLCBtW2krMTNdLCAgNSwgLTE0NDQ2ODE0NjcpO1xyXG4gICAgICBkID0gR0coZCwgYSwgYiwgYywgbVtpKyAyXSwgIDksIC01MTQwMzc4NCk7XHJcbiAgICAgIGMgPSBHRyhjLCBkLCBhLCBiLCBtW2krIDddLCAxNCwgIDE3MzUzMjg0NzMpO1xyXG4gICAgICBiID0gR0coYiwgYywgZCwgYSwgbVtpKzEyXSwgMjAsIC0xOTI2NjA3NzM0KTtcclxuXHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDVdLCAgNCwgLTM3ODU1OCk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krIDhdLCAxMSwgLTIwMjI1NzQ0NjMpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKzExXSwgMTYsICAxODM5MDMwNTYyKTtcclxuICAgICAgYiA9IEhIKGIsIGMsIGQsIGEsIG1baSsxNF0sIDIzLCAtMzUzMDk1NTYpO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKyAxXSwgIDQsIC0xNTMwOTkyMDYwKTtcclxuICAgICAgZCA9IEhIKGQsIGEsIGIsIGMsIG1baSsgNF0sIDExLCAgMTI3Mjg5MzM1Myk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krIDddLCAxNiwgLTE1NTQ5NzYzMik7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krMTBdLCAyMywgLTEwOTQ3MzA2NDApO1xyXG4gICAgICBhID0gSEgoYSwgYiwgYywgZCwgbVtpKzEzXSwgIDQsICA2ODEyNzkxNzQpO1xyXG4gICAgICBkID0gSEgoZCwgYSwgYiwgYywgbVtpKyAwXSwgMTEsIC0zNTg1MzcyMjIpO1xyXG4gICAgICBjID0gSEgoYywgZCwgYSwgYiwgbVtpKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xyXG4gICAgICBiID0gSEgoYiwgYywgZCwgYSwgbVtpKyA2XSwgMjMsICA3NjAyOTE4OSk7XHJcbiAgICAgIGEgPSBISChhLCBiLCBjLCBkLCBtW2krIDldLCAgNCwgLTY0MDM2NDQ4Nyk7XHJcbiAgICAgIGQgPSBISChkLCBhLCBiLCBjLCBtW2krMTJdLCAxMSwgLTQyMTgxNTgzNSk7XHJcbiAgICAgIGMgPSBISChjLCBkLCBhLCBiLCBtW2krMTVdLCAxNiwgIDUzMDc0MjUyMCk7XHJcbiAgICAgIGIgPSBISChiLCBjLCBkLCBhLCBtW2krIDJdLCAyMywgLTk5NTMzODY1MSk7XHJcblxyXG4gICAgICBhID0gSUkoYSwgYiwgYywgZCwgbVtpKyAwXSwgIDYsIC0xOTg2MzA4NDQpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKyA3XSwgMTAsICAxMTI2ODkxNDE1KTtcclxuICAgICAgYyA9IElJKGMsIGQsIGEsIGIsIG1baSsxNF0sIDE1LCAtMTQxNjM1NDkwNSk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDVdLCAyMSwgLTU3NDM0MDU1KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsxMl0sICA2LCAgMTcwMDQ4NTU3MSk7XHJcbiAgICAgIGQgPSBJSShkLCBhLCBiLCBjLCBtW2krIDNdLCAxMCwgLTE4OTQ5ODY2MDYpO1xyXG4gICAgICBjID0gSUkoYywgZCwgYSwgYiwgbVtpKzEwXSwgMTUsIC0xMDUxNTIzKTtcclxuICAgICAgYiA9IElJKGIsIGMsIGQsIGEsIG1baSsgMV0sIDIxLCAtMjA1NDkyMjc5OSk7XHJcbiAgICAgIGEgPSBJSShhLCBiLCBjLCBkLCBtW2krIDhdLCAgNiwgIDE4NzMzMTMzNTkpO1xyXG4gICAgICBkID0gSUkoZCwgYSwgYiwgYywgbVtpKzE1XSwgMTAsIC0zMDYxMTc0NCk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krIDZdLCAxNSwgLTE1NjAxOTgzODApO1xyXG4gICAgICBiID0gSUkoYiwgYywgZCwgYSwgbVtpKzEzXSwgMjEsICAxMzA5MTUxNjQ5KTtcclxuICAgICAgYSA9IElJKGEsIGIsIGMsIGQsIG1baSsgNF0sICA2LCAtMTQ1NTIzMDcwKTtcclxuICAgICAgZCA9IElJKGQsIGEsIGIsIGMsIG1baSsxMV0sIDEwLCAtMTEyMDIxMDM3OSk7XHJcbiAgICAgIGMgPSBJSShjLCBkLCBhLCBiLCBtW2krIDJdLCAxNSwgIDcxODc4NzI1OSk7XHJcbiAgICAgIGIgPSBJSShiLCBjLCBkLCBhLCBtW2krIDldLCAyMSwgLTM0MzQ4NTU1MSk7XHJcblxyXG4gICAgICBhID0gKGEgKyBhYSkgPj4+IDA7XHJcbiAgICAgIGIgPSAoYiArIGJiKSA+Pj4gMDtcclxuICAgICAgYyA9IChjICsgY2MpID4+PiAwO1xyXG4gICAgICBkID0gKGQgKyBkZCkgPj4+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNyeXB0LmVuZGlhbihbYSwgYiwgYywgZF0pO1xyXG4gIH07XHJcblxyXG4gIC8vIEF1eGlsaWFyeSBmdW5jdGlvbnNcclxuICBtZDUuX2ZmICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiAmIGMgfCB+YiAmIGQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2dnICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiAmIGQgfCBjICYgfmQpICsgKHggPj4+IDApICsgdDtcclxuICAgIHJldHVybiAoKG4gPDwgcykgfCAobiA+Pj4gKDMyIC0gcykpKSArIGI7XHJcbiAgfTtcclxuICBtZDUuX2hoICA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICB2YXIgbiA9IGEgKyAoYiBeIGMgXiBkKSArICh4ID4+PiAwKSArIHQ7XHJcbiAgICByZXR1cm4gKChuIDw8IHMpIHwgKG4gPj4+ICgzMiAtIHMpKSkgKyBiO1xyXG4gIH07XHJcbiAgbWQ1Ll9paSAgPSBmdW5jdGlvbiAoYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgdmFyIG4gPSBhICsgKGMgXiAoYiB8IH5kKSkgKyAoeCA+Pj4gMCkgKyB0O1xyXG4gICAgcmV0dXJuICgobiA8PCBzKSB8IChuID4+PiAoMzIgLSBzKSkpICsgYjtcclxuICB9O1xyXG5cclxuICAvLyBQYWNrYWdlIHByaXZhdGUgYmxvY2tzaXplXHJcbiAgbWQ1Ll9ibG9ja3NpemUgPSAxNjtcclxuICBtZDUuX2RpZ2VzdHNpemUgPSAxNjtcclxuXHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobWVzc2FnZSwgb3B0aW9ucykge1xyXG4gICAgaWYodHlwZW9mIG1lc3NhZ2UgPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB2YXIgZGlnZXN0Ynl0ZXMgPSBjcnlwdC53b3Jkc1RvQnl0ZXMobWQ1KG1lc3NhZ2UsIG9wdGlvbnMpKTtcclxuICAgIHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuYXNCeXRlcyA/IGRpZ2VzdGJ5dGVzIDpcclxuICAgICAgICBvcHRpb25zICYmIG9wdGlvbnMuYXNTdHJpbmcgPyBiaW4uYnl0ZXNUb1N0cmluZyhkaWdlc3RieXRlcykgOlxyXG4gICAgICAgIGNyeXB0LmJ5dGVzVG9IZXgoZGlnZXN0Ynl0ZXMpO1xyXG4gIH07XHJcblxyXG59KSgpO1xyXG4iLCIvKipcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgQnVmZmVyXG4gKlxuICogQXV0aG9yOiAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBMaWNlbnNlOiAgTUlUXG4gKlxuICogYG5wbSBpbnN0YWxsIGlzLWJ1ZmZlcmBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuICEhKFxuICAgIG9iaiAhPSBudWxsICYmXG4gICAgb2JqLmNvbnN0cnVjdG9yICYmXG4gICAgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG4gIClcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbWFwKG9iamVjdEtleXMob2JqKSwgZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChpc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG1hcChvYmpba10sIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcbiAgICAgICAgfSkuam9pbihzZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcbiAgICAgIH1cbiAgICB9KS5qb2luKHNlcCk7XG5cbiAgfVxuXG4gIGlmICghbmFtZSkgcmV0dXJuICcnO1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShuYW1lKSkgKyBlcSArXG4gICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9iaikpO1xufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uICh4cykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHhzKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbmZ1bmN0aW9uIG1hcCAoeHMsIGYpIHtcbiAgaWYgKHhzLm1hcCkgcmV0dXJuIHhzLm1hcChmKTtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzLnB1c2goZih4c1tpXSwgaSkpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24gKG9iaikge1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkgcmVzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEwLjBcbnZhciBSZWFjdCwgaXNSZXRpbmEsIG1kNSwgcXVlcnlzdHJpbmc7XG5cblJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxubWQ1ID0gcmVxdWlyZSgnbWQ1Jyk7XG5cbnF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcblxuaXNSZXRpbmEgPSByZXF1aXJlKCdpcy1yZXRpbmEnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnR3JhdmF0YXInLFxuICBwcm9wVHlwZXM6IHtcbiAgICBlbWFpbDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBtZDU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2l6ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcbiAgICByYXRpbmc6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgaHR0cHM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgIFwiZGVmYXVsdFwiOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xuICB9LFxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaXplOiA1MCxcbiAgICAgIHJhdGluZzogJ2cnLFxuICAgICAgaHR0cHM6IGZhbHNlLFxuICAgICAgXCJkZWZhdWx0XCI6IFwicmV0cm9cIixcbiAgICAgIGNsYXNzTmFtZTogXCJcIlxuICAgIH07XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGJhc2UsIGhhc2gsIG1vZGVybkJyb3dzZXIsIHF1ZXJ5LCByZXRpbmFRdWVyeSwgcmV0aW5hU3JjLCBzcmM7XG4gICAgYmFzZSA9IHRoaXMucHJvcHMuaHR0cHMgPyBcImh0dHBzOi8vc2VjdXJlLmdyYXZhdGFyLmNvbS9hdmF0YXIvXCIgOiAnaHR0cDovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLyc7XG4gICAgcXVlcnkgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkoe1xuICAgICAgczogdGhpcy5wcm9wcy5zaXplLFxuICAgICAgcjogdGhpcy5wcm9wcy5yYXRpbmcsXG4gICAgICBkOiB0aGlzLnByb3BzW1wiZGVmYXVsdFwiXVxuICAgIH0pO1xuICAgIHJldGluYVF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHtcbiAgICAgIHM6IHRoaXMucHJvcHMuc2l6ZSAqIDIsXG4gICAgICByOiB0aGlzLnByb3BzLnJhdGluZyxcbiAgICAgIGQ6IHRoaXMucHJvcHNbXCJkZWZhdWx0XCJdXG4gICAgfSk7XG4gICAgaWYgKHRoaXMucHJvcHMubWQ1KSB7XG4gICAgICBoYXNoID0gdGhpcy5wcm9wcy5tZDU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmVtYWlsKSB7XG4gICAgICBoYXNoID0gbWQ1KHRoaXMucHJvcHMuZW1haWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0dyYXZhdGFyIGltYWdlIGNhbiBub3QgYmUgZmV0Y2hlZC4gRWl0aGVyIHRoZSBcImVtYWlsXCIgb3IgXCJtZDVcIiBwcm9wIG11c3QgYmUgc3BlY2lmaWVkLicpO1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiwgbnVsbCk7XG4gICAgfVxuICAgIHNyYyA9IGJhc2UgKyBoYXNoICsgXCI/XCIgKyBxdWVyeTtcbiAgICByZXRpbmFTcmMgPSBiYXNlICsgaGFzaCArIFwiP1wiICsgcmV0aW5hUXVlcnk7XG4gICAgbW9kZXJuQnJvd3NlciA9IHRydWU7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93ICE9PSBudWxsKSB7XG4gICAgICBtb2Rlcm5Ccm93c2VyID0gJ3NyY3NldCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgfVxuICAgIGlmICghbW9kZXJuQnJvd3NlciAmJiBpc1JldGluYSgpKSB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImltZ1wiLCBSZWFjdC5fX3NwcmVhZCh7XG4gICAgICAgIFwic3R5bGVcIjogdGhpcy5wcm9wcy5zdHlsZSxcbiAgICAgICAgXCJjbGFzc05hbWVcIjogXCJyZWFjdC1ncmF2YXRhciBcIiArIHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICBcInNyY1wiOiByZXRpbmFTcmMsXG4gICAgICAgIFwiaGVpZ2h0XCI6IHRoaXMucHJvcHMuc2l6ZSxcbiAgICAgICAgXCJ3aWR0aFwiOiB0aGlzLnByb3BzLnNpemVcbiAgICAgIH0sIHRoaXMucHJvcHMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgUmVhY3QuX19zcHJlYWQoe1xuICAgICAgICBcInN0eWxlXCI6IHRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgIFwiY2xhc3NOYW1lXCI6IFwicmVhY3QtZ3JhdmF0YXIgXCIgKyB0aGlzLnByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgXCJzcmNcIjogc3JjLFxuICAgICAgICBcInNyY1NldFwiOiByZXRpbmFTcmMgKyBcIiAyeFwiLFxuICAgICAgICBcImhlaWdodFwiOiB0aGlzLnByb3BzLnNpemUsXG4gICAgICAgIFwid2lkdGhcIjogdGhpcy5wcm9wcy5zaXplXG4gICAgICB9LCB0aGlzLnByb3BzKSk7XG4gICAgfVxuICB9XG59KTtcbiJdfQ==
