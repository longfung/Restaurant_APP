import React, { useEffect } from 'react'
import Select, { components } from "react-select";
import { MdDehaze } from "react-icons/md";

function SelectOption(props) {
    const options = props.options;
    const handleSelection = props.handleSelection;
    const selectId = props.selectId;
    const formatValue = props.formatValue;
    const width = props.width;

    const customTheme = theme => {
        return {
            ...theme,
            colors: {
                ...theme.colors,
                primary25: 'orange',
                primary: 'green',
            },
        }
    }

    const CaretDownIcon = () => {
        return <MdDehaze color="Primary" size="1rem" />;
    };

    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <CaretDownIcon />
            </components.DropdownIndicator>
        );
    };

    const customStyles = {
        container: (base, state) => ({
            ...base,
            border: state.isFocused ? null : null,
            width: width,
            transition:
                "border-color 0.2s ease, box-shadow 0.2s ease, padding 0.2s ease",
            "&:hover": {
                boxShadow: "0 2px 4px 0 rgba(41, 56, 78, 0.1)"
            }
        }),
        control: base => ({
            ...base,
            background: "#152033"
        }),
        singleValue: base => ({
            ...base,
            color: "#fff"
        }),
        input: base => ({
            ...base,
            color: "#fff"
        })
    };

    return (
        <Select id={selectId}
            // className="abc"
            components={{ DropdownIndicator }}
            theme={customTheme}
            styles={customStyles}
            // className='react-select-container'
            options={options}
            onChange={handleSelection}
            // className="mb-3"
            value={formatValue} />
    )

}
export default SelectOption;