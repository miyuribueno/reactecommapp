import React, { useContext } from 'react';
import MyContext from '../../MyContext';
import {Link} from 'react-router-dom';
import { Select, MenuItem, InputLabel, FormControl, Button, ButtonGroup} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const Filter = (props) => {
    const classes = useStyles();
    const { filterQueryHandler, userRole } = useContext(MyContext);
    return (
        <div id="filterContainer">
                  {
                    (userRole === "admin")?
                    <React.Fragment>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="filterByPrice">Filter By Price</InputLabel>
                            <Select
                                labelId="filterByPrice"
                                name="price"
                                onChange={filterQueryHandler}
                                >
                                <MenuItem value="lte">Less than 1000</MenuItem>
                                <MenuItem value="gte">1000 Above</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="filterByAnime">Filter By Anime</InputLabel>
                            <Select
                                labelId="filterByAnime"
                                name="anime"
                                onChange={filterQueryHandler}
                                >
                                <MenuItem value="One Piece">One Piece</MenuItem>
                                <MenuItem value="Gundam">Gundam</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <div id="priceFilter">
                            <h3>Filter by Price</h3>
                            <select name="price" onChange={filterQueryHandler}>
                                <option value="lte">Less than 1000</option>
                                <option value="gte">1000 Above</option>
                            </select>
                        </div> */}
                        {/* <div id="animeFilter">
                            <h3>Filter by Anime</h3>
                            <select name="anime" onChange={filterQueryHandler}>
                                <option value="One Piece">One Piece</option>
                                <option value="Gundam">Gundam</option>
                            </select>
                        </div> */}
                        <div id="adminPanelContainer"><br/>
                            <h3>Admin Controls</h3><br />
                            <ButtonGroup variant="contained" color="secondary" orientation="vertical">
                                <Link to="/addItems"><Button>Add Item/s</Button></Link>
                                <Link to="/editItems"><Button>Edit Item/s</Button></Link>
                                <Link to="/deleteItems"><Button>Delete Item/s</Button></Link>
                            </ButtonGroup>
                            {/* <div id="controls">
                                <Link to="/addItems"><button>Add Item/s</button></Link>
                                <Link to="/editItems"><button>Edit Item/s</button></Link>
                                <Link to="/deleteItems"><button>Delete Item/s</button></Link>
                            </div> */}
                        </div>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="filterByPrice">Filter By Price</InputLabel>
                            <Select
                                labelId="filterByPrice"
                                name="price"
                                onChange={filterQueryHandler}
                                >
                                <MenuItem value="lte">Less than 1000</MenuItem>
                                <MenuItem value="gte">1000 Above</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="filterByAnime">Filter By Anime</InputLabel>
                            <Select
                                labelId="filterByAnime"
                                name="anime"
                                onChange={filterQueryHandler}
                                >
                                <MenuItem value="One Piece">One Piece</MenuItem>
                                <MenuItem value="Gundam">Gundam</MenuItem>
                            </Select>
                        </FormControl>
                    </React.Fragment>
                }
        </div>
    )
}


export default Filter;