import { Container } from "@material-ui/core";
import { UsersTable } from './RegisteredUsersTable'
import * as React from "react"




const AdminPage: React.FunctionComponent<{}> = () => {


    return (
        <Container maxWidth="lg" >

            <UsersTable />

        </Container>

    );
}

export default AdminPage;