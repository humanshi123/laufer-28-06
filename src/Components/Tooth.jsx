import React from 'react';


const styles = {
    container: {
        width: "75px"
    },
    box: {
        border: "1px solid lightgrey",
        textAlign: "flex-start", 
        padding: "5px"
        // paddingRight: "10px"
    },
    dropdown: {
        textAlign: "flex-start", 
        padding: "5px"
    },
    
};


export default class Tooth extends React.Component {
    
    constructor(props) {
        super(props);
        const {initialValue} = props;
        this.state = {
            selected: initialValue ? initialValue.value : ""
        };
    }

    options = ["", "K", "B", "KV", "BV", "KM", "BM", "V", "IK", "IK3", "IG", "T", "TV", "TM", "MG", "CD", "IS", "TK", "H", "E", "O", "St"];

    onChangeSelection = (event) => {

        this.setState({
            selected: event.target.value
        });
        event.type = "tooth";
        event.toothID = this.props.ID;
        event.isUpperJaw = this.props.isUpperJaw;
        this.props.onChange(event);
    }



    render() {
        const { ID, isUpperJaw, onChange } = this.props;
        const selectedValue = (this.props.isProsthetics) ? "E" : this.state.selected;
        return (
            <td className='tooth-td'>
                {isUpperJaw ? (
                    <div>
                        <div style={styles.box}>{ID}</div>
                        <div style={styles.box}>
                            <select value={selectedValue} onChange={this.onChangeSelection} disabled={!this.props.editable}>
                                {this.options.map((option) => (
                                    <option style={styles.dropdown}  key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div style={styles.box}>
                            <select value={selectedValue} onChange={this.onChangeSelection}>
                                {this.options.map((option) => (
                                    <option style={styles.dropdown} key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={styles.box}>{ID}</div>
                    </div>
                )}
            </td>
        );
    }
}

import PropTypes from 'prop-types';

Tooth.propTypes = {
    ID: PropTypes.string.isRequired,
    isUpperJaw: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    initialValue: PropTypes.shape({
        value: PropTypes.string.isRequired
    })
};

Tooth.defaultProps = {
    editable: true
};