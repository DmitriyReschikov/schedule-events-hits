import { Button, ConfigProvider, DatePicker, Form, Input, Modal } from "antd";
import { useState } from "react";
import { NewEvent } from "../interfaces/DTOs/Event";
import TextArea from "antd/es/input/TextArea";
import { createEvent } from "../api/requests/eventRequests";
import dayjs, { Dayjs } from "dayjs";
import ruRU from 'antd/es/locale/ru_RU';
import { updateOrganization } from "../api/requests/adminRequests";

dayjs.locale(ruRU);

interface NewEventModalProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    setIsUpdating: (isUpdating: boolean) => void;
    event?: NewEvent;
    id?: number;
    isCreating: boolean;
}

const NewEventModal: React.FC<NewEventModalProps> = ({ isOpen, setIsOpen, setIsUpdating, event, id, isCreating }) => {

    const [form] = Form.useForm()

    const defaultValue: NewEvent = {
        name: '',
        description: '',
        location: '',
        startDateTime: '',
        endDateTime: '',
        deadlineDateTime: '',
        organizationId: null,
    }

    const [initValue, setInitValue] = useState<NewEvent>(event || defaultValue)

    const closeModal = () => {
        setInitValue(defaultValue),
        setIsOpen(false),
        form.resetFields()
    }

    const createEditEvent = async () => {
        isCreating ? await createEvent(form.getFieldsValue()) : await updateOrganization(form.getFieldsValue(), id)
        setIsUpdating(true)
        closeModal()
    }

    const handleRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        if (dates) {
            form.setFieldsValue({
                startDate: dates[0],
                endDate: dates[1],
            });
        } else {
            form.resetFields(["startDate", "endDate"]);
        }
    };

    return (
        <>
            <Modal open={isOpen} onCancel={closeModal} title='Новое мероприятие' footer={[
                <Button type='primary' onClick={createEditEvent}>{isCreating ? 'Создать мероприятие' : 'Обновить данные'}</Button>,
                <Button onClick={closeModal}>Закрыть</Button>,
            ]}>
                <Form
                    layout='vertical'
                    initialValues={initValue}
                    form={form}
                >
                    <Form.Item
                        label="Название мероприятия"
                        name="name"
                        rules={[{ required: true, message: 'Введите название' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Описание"
                        name="description"
                        rules={[{ required: true, message: 'Введите описание' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        hidden
                        name="startDateTime">
                    </Form.Item>   
                    <Form.Item
                        hidden
                        name="endDateTime">
                    </Form.Item>   

                    <Form.Item
                        label="Место проведения"
                        name="location"
                        rules={[{ required: true, message: 'Введите место проведения' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Время проведения"
                        name="range"
                        rules={[{ required: true, message: "Введите место проведения" }]}
                    >
                        <ConfigProvider locale={ruRU}>
                            <DatePicker.RangePicker style={{ width: '100%' }} onChange={handleRangeChange} showTime={{ format: 'HH:mm' }} format='DD-MM-YYYY HH:mm' />
                        </ConfigProvider>
                    </Form.Item>

                    <Form.Item
                        label="Дэдлайн записи"
                        name='deadline'>
                        <ConfigProvider locale={ruRU}>
                            <DatePicker style={{ width: '100%' }} showTime={{ format: 'HH:mm' }} format='DD-MM-YYYY HH:mm' />
                        </ConfigProvider>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default NewEventModal;