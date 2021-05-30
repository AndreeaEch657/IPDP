import * as React from 'react';
import { useState } from 'react';
import { OrderItemsPage } from './OrderItemsPage';
import { OrdersPage } from './OrdersPage';


export const OrderDashboard:React.FunctionComponent<{}> = () =>{

    const [selectedOrderId, setSelectedOrderId] = useState<number>(null);
    const [address, setAddress] = useState<string>(null);
    const handleBackButton = () =>{
        setSelectedOrderId(null);
    }

    const renderCurrentData = () =>{
        if(selectedOrderId == null){
            return <OrdersPage 
                     
                handleRowDoubleClick = {(orderId: number, address: string) => {setSelectedOrderId(orderId); setAddress(address);}}
                />
        } else{
            return <OrderItemsPage
                    orderItemId={selectedOrderId}
                    onBackButtonClick={handleBackButton} 
                    address={address}/>
        }
    }

    return(<div>{renderCurrentData()}</div>)
}