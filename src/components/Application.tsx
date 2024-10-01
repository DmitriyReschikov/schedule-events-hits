import { Button, Card, Col, Typography } from "antd";
import { ApplicationView } from "../interfaces/DTOs/ManagerApp";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { approveManagerApp, rejectManagerApp } from "../api/requests/managerRequests";

interface AppProps {
    Application: ApplicationView;
    setIsUpdating: (isUpdating: boolean) => void;
}

const Application: React.FC<AppProps> = ({Application, setIsUpdating}) => {

    const {user, application, organization } = Application
    
    const actions: React.ReactNode[] = [
        <Button onClick={async () => {await approveManagerApp(application.applicationId); setIsUpdating(true)}}><CheckOutlined style={{color: 'green'}}/></Button> ,   
        <Button onClick={async () => {await rejectManagerApp(application.applicationId); setIsUpdating(true)}}><CloseOutlined style={{color: 'red'}}/></Button>,
      ];

    return (
        <Card actions={actions}>
            <Col><Typography.Text style={{marginBottom: 20}}>Заявка от {user.username}</Typography.Text></Col>
            <Col><Typography.Text>в компанию {organization.name}</Typography.Text></Col>
        </Card>
    )
}

export default Application;