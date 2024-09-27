import { Button, Input, Modal, Typography } from "antd";
import { useState } from "react";
import { createOrganization, updateOrganization } from "../api/requests/adminRequests";

interface NewCompanyModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    setIsUpdating: (isUpdating: boolean) => void;
    id?: number;
    name? : string
    isCreating: boolean;
}

const NewCompanyModal: React.FC<NewCompanyModalProps> = ({ isOpen, setIsOpen, setIsUpdating, id, name, isCreating }) => {

    const [currentName, setCurrentName] = useState<string>(name || '')
    const [isError, setIsError] = useState<boolean>(false)

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentName(event.target.value);
    };

    const closeModal = () => {
        isCreating ? setCurrentName('') : setCurrentName(name),
        setIsOpen(false)
        setIsError(false)
    }

    const createEditOrg = async () => {
        if (currentName.length > 0) {
            isCreating ? await createOrganization(currentName) : await updateOrganization(currentName, id)
            setIsUpdating(true)
            closeModal()
        }
        else {
            setIsError(true)
        }
    }

    return (
        <>
            <Modal open={isOpen} onCancel={closeModal} title='Новая компания' footer={[
                <Button onClick={closeModal}>Закрыть</Button>,
                <Button
                    type="primary"
                    onClick={createEditOrg}
                    >{isCreating ? 'Добавить организацию' : 'Изменить название'}</Button>
            ]}>
                <Input value={currentName}
                    onChange={handleNameChange}
                    placeholder="Введите название"
                    style={{ marginTop: 5 }}
                    status={isError ? 'error' : ''}
                    />
                {isError ? <Typography.Text type="danger">Необходимо ввести название</Typography.Text> : null}
            </Modal>
        </>
    );
};

export default NewCompanyModal;