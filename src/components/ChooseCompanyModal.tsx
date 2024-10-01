import { Modal, Button, Typography, Select } from "antd";
import { useEffect, useState } from "react";
import { OrganizationView } from "../interfaces/DTOs/Organization";
import { getOrganizations } from "../api/requests/adminRequests";
import { registerManager } from "../api/requests/managerRequests";
import { toast } from "react-toastify";

interface ChooseCompanyModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}
const ChooseCompanyModal: React.FC<ChooseCompanyModalProps> = ({ isOpen, setIsOpen }) => {
    const [currentCompanyId, setCurrentCompanyId] =  useState<number | undefined>(undefined)
    const [companies, setCompanies] = useState<OrganizationView[]>()
    const [isError, setIsError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchCompanies = async () => {
            const organizationData = await getOrganizations()
            if (organizationData) {
                setCompanies(organizationData)
            }
        }

        fetchCompanies()
    }, [])

    const closeModal = () => {
        setCurrentCompanyId(undefined)
        setIsOpen(false)
        setIsError(false)
    }

    const sendApplication = async () => {
        if (currentCompanyId) {
            setIsLoading(true)
            await registerManager(currentCompanyId)
            toast.success("Ваша заявка отправлена"); 
            setIsLoading(false)
            setIsOpen(false)
        }
        else {
            setIsError(true)
        }

        
    }

    return (<>
        <Modal open={isOpen} onCancel={closeModal} title='Выбор компании' footer={[
            <Button onClick={closeModal}>Закрыть</Button>,
            <Button
                type="primary"
                onClick={sendApplication}
                loading={isLoading}
            >Отправить заявку в компанию</Button>
        ]}>
            <Select style={{ width: '100%' }} onSelect={(value) => setCurrentCompanyId(value)}> 
            {companies?.map((company) => (
                            <Select.Option key={company.id} value={company.id}>{company.name}</Select.Option>
                        ))}
            </Select>
            {isError ? <Typography.Text type="danger">Необходимо выбрать компанию</Typography.Text> : null}
        </Modal></>)
}

export default ChooseCompanyModal;