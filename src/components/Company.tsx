import { Card, Row, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { OrganizationView } from "../interfaces/DTOs/Organization";
import NewCompanyModal from "./NewCompanyModal";
import { useState } from "react";
import { deleteOrganization } from "../api/requests/adminRequests";

interface CompanyProps {
    company: OrganizationView;
    setIsUpdating: (isUpdating: boolean) => void;
}

const Company: React.FC<CompanyProps> = ({ company, setIsUpdating }) => {
    console.log(company)

    const [isOpen, setIsOpen] = useState<Boolean>(false)

    const deleteOrg = async () => {
        await deleteOrganization(company.id)
        setIsUpdating(true)
    }

    const editOrg = async () => {
        setIsOpen(true)
    }

    const actions: React.ReactNode[] = [
        <DeleteOutlined key='delete' onClick={deleteOrg} />,
        <EditOutlined key="edit" onClick={editOrg} />,
    ]

    return (
        <>
            <Card actions={actions}>
                <Row justify="center">
                    <Typography.Title level={5} style={{ margin: 0 }}>{company.name}</Typography.Title>
                    <NewCompanyModal isOpen={isOpen} setIsOpen={setIsOpen} setIsUpdating={setIsUpdating} id={company.id} name={company.name} isCreating={false}/>
                </Row>
            </Card>
        </>
    )
}

export default Company;