import moment from 'moment/moment';
import React, { useState, useContext } from 'react';
import GlobalContext from '../../context/global-context';
import Button from 'react-bootstrap/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Tooltip from '@mui/material/Tooltip';

export default function YearSelect() {
  const globalCtx = useContext(GlobalContext);

  const [open, setOpen] = useState(false);

  const startYear = 1950;
  const allYear = moment().year();


  const years = [];
  for (let year = startYear; year <= allYear; year++) {
    years.push(year);
  }

  const handleClick = (year) => {
    globalCtx.setYearFn(year);
    
    
  };

 

  return (
    <>
      <div>
        <span
          className='text-light fw-bold mouseHandle d-inline-block mb-4 font-responsive'
          onClick={() => setOpen(!open)}
        >
          Season selector: {globalCtx.chosenYear}
        </span>
        <Tooltip placement='right' title='Show all seasons' arrow>
          <IconButton
            aria-label='expand row'
            size='small'
            color='success'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </Tooltip>
      </div>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <div className='container mx-auto mb-4'>
   

          {years.map((year) => (
            <Button
              active={year === globalCtx.chosenYear}
              variant='success'
              size='sm'
              className='col years font-responsive'
              key={year}
              onClick={() => handleClick(year)}
            >
              {year}
            </Button>
          ))}
        </div>
      </Collapse>
    </>
  );
}
