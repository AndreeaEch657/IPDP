import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from '@material-ui/core';
import * as React from 'react';
import { useEffect, useState } from 'react';
import AccountService from '../../../Services/AccountService';
import TransactionService from '../../../Services/TransactionService';
import { OrderItemsPage } from './OrderItemsPage';



interface Order{
    date:Date;
    orderId:number;
    status:string;
    total:number;
    userId:string;
    address: string;
}

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    
  }))(TableRow);
  

interface OrdersPageProps{
    handleRowDoubleClick: (orderId: number, address: string) => void;
}

export const OrdersPage: React.FunctionComponent<OrdersPageProps> = (props) => {

    const classes = useStyles();
    const [orders, setOrders] = useState<Order[]>([]);

    const [isUserAdmin, setIsUserAdmin] = React.useState(false);
    useEffect(() =>{
        AccountService.checkUser()
            .then((resp) =>{
                setIsUserAdmin(resp.data)
            })
            .catch((err) =>{
                console.log(err)
            })

    },[]) 

    useEffect(() =>{
        TransactionService.getUserOrders()
            .then(resp =>{
                setOrders(resp.data);
                console.log(resp.data);
            })
            .catch(err =>{
                console.log(err.message);
            })

    }, [])

    

   

    const handleRowDoubleClick = (orderId:number, address: string) =>{
        props.handleRowDoubleClick(orderId, address);
    }

    const ordersTable = () => {

        return(
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow hover>
                                    {isUserAdmin && 
                                    <>
                                        <StyledTableCell component="th" scope="row">User Id</StyledTableCell>
                                        <StyledTableCell align="right">Order Id</StyledTableCell>
                                    </>}

                                    {!isUserAdmin && <StyledTableCell component="th" scope="row">Order Id</StyledTableCell> }
                            
                            <StyledTableCell align="right">Status</StyledTableCell>
                            <StyledTableCell align="right">Total</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
    
                    <TableBody>
                        {orders.map((order) => (
                            <StyledTableRow hover onDoubleClick={() => handleRowDoubleClick(order.orderId, order.address)}> 
    
                                {isUserAdmin && 
                                    <>
                                        <StyledTableCell component="th" scope="row">{order.userId}</StyledTableCell>
                                        <StyledTableCell align="right">{order.orderId}</StyledTableCell>
                                    </>}

                                    {!isUserAdmin && <StyledTableCell component="th" scope="row">{order.orderId}</StyledTableCell> }
                                
    
                                
                                <StyledTableCell align="right">{order.status}</StyledTableCell>
                                <StyledTableCell align="right">{order.total}</StyledTableCell>
                                <StyledTableCell align="right">{new Intl.DateTimeFormat('default', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',

                                }).format(new Date (order.date))}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>

                
            </div>)

    }

    return(
        <div>
            {ordersTable()}
        </div>
    )

    

}