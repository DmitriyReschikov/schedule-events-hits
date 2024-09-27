import { Button, Card, Typography } from "antd";
import { ApplicationView } from "../interfaces/DTOs/ManagerApp";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { approveManagerApp, rejectManagerApp } from "../api/requests/managerRequests";

const Application = (Application: ApplicationView) => {

    const {user, application, organization } = Application
    
    const actions: React.ReactNode[] = [
        <Button onClick={() => approveManagerApp(application.applicationId)}><CheckOutlined /></Button> ,   
        <Button onClick={() => rejectManagerApp(application.applicationId)}><CloseOutlined /></Button>,
      ];

    return (
        <Card actions={actions}>
            <Typography.Text>Заявка от {user.username}</Typography.Text>

        </Card>
    )
}

export default Application;