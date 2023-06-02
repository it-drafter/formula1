import React, { useState, useEffect, useRef, useContext } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/global-context';

const SearchBox = (props) => {
  if (props.home === true) {
    return false;
  }

  const globalCtx = useContext(GlobalContext);

  const navigate = useNavigate();
  const searchString = useRef();

  const handleClickSearch = () => {
    // console.log(searchString.current.value);
    if (searchString.current.value.trim().length === 0) {
      return false;
    }

    // console.log('Search props ', props);
    // props.onSearch(searchString.current.value);

    // const linkTo = `/drivers/search`;
    globalCtx.setSearchStringFn(searchString.current.value.trim());
    navigate(props.linkTo);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClickSearch();
    }
  };

  return (
    <Paper
      component='form'
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '16rem',
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label='menu'>
        <SportsMotorsportsIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        autoFocus
        placeholder={props.placeholder}
        // defaultValue={'Adam'}
        inputProps={{ 'aria-label': 'search' }}
        inputRef={searchString}
        // onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        type='button'
        onClick={handleClickSearch}
        sx={{ p: '10px' }}
        aria-label='search'
      >
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
    </Paper>
  );
};

export default SearchBox;
