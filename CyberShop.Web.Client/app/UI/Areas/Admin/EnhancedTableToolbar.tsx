import { createStyles, IconButton, makeStyles, Theme, Toolbar, Tooltip, Typography } from "@material-ui/core";
import AdminService from "../../../Services/AdminService"
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import * as React from "react"



const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        title: {
            flex: '1 1 100%',
        },
    }),
);

interface ITableToolbarProps {
    numSelected: number,
    itemsToDelete: string[],
    updateTable: () => void
}



export const EnhancedTableToolbar = (props: ITableToolbarProps) => {

    const classes = useToolbarStyles();
    const { numSelected } = props;

    const onClickDeleteButton = () => {
        AdminService.deleteUsers(props.itemsToDelete)
            .then(resp => {

                props.updateTable();


            })
            .catch(error => {

            })

    }

    return (
        <Toolbar

        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        Users
                    </Typography>
                )}
            {numSelected > 0 && (
                <div>


                    <Tooltip title="Delete">
                        <IconButton
                            aria-label="delete"
                            onClick={onClickDeleteButton}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                    

                </div>



            )}
        </Toolbar>
    );
};