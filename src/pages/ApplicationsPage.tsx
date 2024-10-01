import { useEffect, useState } from "react";
import { ApplicationView } from "../interfaces/DTOs/ManagerApp";
import { getAppsToBeManager } from "../api/requests/managerRequests";
import { Col, Row, Typography } from "antd";
import Application from "../components/Application";

const ApplicationsPage = () => {

    const [applications, setApplications] = useState<ApplicationView[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    useEffect(() => {
        const fetchApplications = async () => {
            const applicationData = await getAppsToBeManager()
            if (applicationData) {
                setApplications(applicationData)
            }
            setIsLoading(false)
            setIsUpdating(false)
        }
        
        fetchApplications()

    }, [isUpdating])

    return (
        <>
            {isLoading ? (
                <Row justify="center" style={{ marginTop: 20 }}>
                    <Col><Typography.Title style={{ margin: 0 }} level={3}>Loading...</Typography.Title></Col>
                </Row>
            ) : (
                <Row gutter={[12, 12]}>
                    {applications?.map((application) => (
                        <Col xs={20} sm={20} md={10} xl={10} lg={10}>
                            <Application key={application.application.applicationId} Application={application} setIsUpdating={setIsUpdating} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default ApplicationsPage;