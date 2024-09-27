import { useEffect, useState } from "react";
import { getOrganizations } from "../api/requests/adminRequests";
import { OrganizationView } from "../interfaces/DTOs/Organization";
import { Row, Col, Typography, Button } from "antd";
import NewCompanyModal from "../components/NewCompanyModal";
import Company from "../components/Company";

const CompaniesPage = () => {

    const [isUpdating, setIsUpdating] = useState<Boolean>(false)
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [organizations, setOrganizations] = useState<OrganizationView[]>()

    useEffect(() => {
        const fetchCompanies = async () => {
            const organizationData = await getOrganizations()
            if (organizationData) {
                setOrganizations(organizationData)
            }
            setIsUpdating(false)
        }

        fetchCompanies()
        setIsLoading(false)
        
    }, [isUpdating])

    return (
        <>
            <Row justify="end" style={{ marginTop: 20, marginBottom: 20 }}>
                <Button onClick={() => setIsOpen(true)}>Добавить компанию</Button>
                <NewCompanyModal isOpen={isOpen} setIsOpen={setIsOpen} setIsUpdating={setIsUpdating} isCreating={true}/>
            </Row>
            {isLoading ? (
                <Row justify="center" style={{ marginTop: 20 }}>
                    <Col><Typography.Title style={{ margin: 0 }} level={3}>Loading...</Typography.Title></Col>
                </Row>
            ) : (
                    <Row gutter={[12, 12]}>
                        {organizations?.map((organization) => (
                            <Col xs={20} sm={20} md={10} xl={10} lg={10}>
                                <Company key={organization.id} company={organization} setIsUpdating={setIsUpdating} />
                            </Col>
                        ))}
                    </Row>
            )}
        </>
    )
}

export default CompaniesPage;