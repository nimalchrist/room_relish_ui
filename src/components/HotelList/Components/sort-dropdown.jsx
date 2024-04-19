import React from 'react';
import { MenuItem, Menu } from '@mui/material';
import { Typography } from '@mui/material';

const UserDropdown = ({ anchorEl, onClose, onLogout,onOptionClick,setSelectedOption}) => {
     const handleDropdownOptionClick = (option) =>{
        setSelectedOption(option);
    };
    return (
        <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <MenuItem><Typography   onClick ={() =>  handleDropdownOptionClick ('Price')}variant='body2'>Price</Typography></MenuItem>
            <MenuItem><Typography   onClick ={() => handleDropdownOptionClick ('Rating')}variant='body2'>Rating</Typography></MenuItem>
            <MenuItem><Typography   onClick ={() => handleDropdownOptionClick ('Amenties')}variant='body2'>Amenties</Typography></MenuItem>
           
        </Menu>
    );
};

export default UserDropdown;
