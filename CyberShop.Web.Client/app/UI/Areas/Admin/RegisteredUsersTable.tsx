import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, Checkbox, Grid, IconButton, TextField, Tooltip, Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import AdminService from "../../../Services/AdminService"
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { EnhancedTableToolbar } from './EnhancedTableToolbar';
import * as React from "react"

interface Column {
    id: 'id' | 'fullName' | 'email' | 'status'; 
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'fullName', label: 'Full Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'id', label: 'Id', minWidth: 170},
    { id: 'status', label: 'Status', minWidth: 170}
    

];

interface IUserData {
    fullName: string,
    email: string,
    pointsToGive: number,
    pointsToSpend: number,
    pointsReceived: number,
    status: string
}



const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});



export const UsersTable: React.FunctionComponent<any> = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [tableRows, setTableRows] = React.useState<IUserData[]>([]);
    const [filteredTablerows, setFilteredTableRows] = React.useState<IUserData[]>([]);
    const [searchKeyword, setSearchKeyword] = React.useState('');
    const [numOfUsersSelected, setNumOfUsersSelected] = React.useState(0);
    const [selected, setSelected] = React.useState<string[]>([]);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        setIsLoading(true);
        AdminService.getUsers()
            .then((resp) => {
                setTableRows(resp.data);
                setFilteredTableRows(resp.data);
                setSelected([]);
            })
            .catch(() => {
            }).finally(() => {
                setIsLoading(false);
            });

    }

    





    const updateInput = (event) => {

        setSearchKeyword(event.target.value);

        const filteredData = tableRows.filter(row => {
            return row.fullName.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFilteredTableRows(filteredData);


    };
    const isSelected = (name: string) => selected.indexOf(name) !== -1;



    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);

    };

    const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = tableRows.map((n) => n.email);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    }



    return (

        <div>
            <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Search for an user"
                autoFocus
                value={searchKeyword}
                onChange={updateInput}

                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}

            />
            <Paper className={classes.root}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    itemsToDelete={selected}
                    updateTable={getUsers} />
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={selected.length > 0 && selected.length < filteredTablerows.length}
                                        checked={filteredTablerows.length > 0 && selected.length == filteredTablerows.length}
                                        onChange={onSelectAllClick}

                                    />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTablerows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const isItemSelected = isSelected(row.email);
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        aria-checked={isItemSelected}
                                        selected={isItemSelected}
                                        key={row.email}
                                        onClick={(event) => handleClick(event, row.email)}

                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                            />
                                        </TableCell>

                                        {columns.map((column, index) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell align={column.align} key={index}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredTablerows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

        </div>
    );
}
