import { Button, Card, Col, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { UserDTO } from "../interfaces/DTOs/User";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Event } from "../interfaces/DTOs/Event";
import dayjs, { Dayjs } from "dayjs";
import { getUsersFromEvent } from "../api/requests/managerRequests";
import { UsergroupDeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { subscribeOnEvent } from "../api/requests/eventRequests";

interface EventCardProps {
    event: Event
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {

    const [participants, setParticipants] = useState<UserDTO[]>([])
    const roles: string[] = useSelector((state: RootState) => state.user.roles)
    const userId: string = useSelector((state: RootState) => state.user.id)
    const [isEditOpen, setisEditOpen] = useState<boolean>(false)
    const [isGroupOpen, setIsGroupOpen] = useState<boolean>(false)

    useEffect(() => {

        const fetchUsers = async () => {
            if (roles.includes('ADMIN') || roles.includes('MANAGER')) {
                const userData = await getUsersFromEvent(event.id)
                if (userData) {
                    setParticipants(userData)
                }
            }
        }

        fetchUsers()

    }, [])

    const actions: React.ReactNode[] = [
        (roles.includes('ADMIN') || (roles.includes('MANAGER') && event.creatorId == userId)) ? <UsergroupDeleteOutlined onClick={() => setIsGroupOpen(true)} /> : null,
        roles.includes('MANAGER') && event.creatorId == userId ? <EditOutlined onClick={() => setisEditOpen(true)} /> : null,
        roles.includes('USER') ? <PlusSquareOutlined disabled={dayjs(event.deadline).isBefore(dayjs())} onClick={() => subscribeOnEvent(event.id.toString())} /> : null
    ].filter(Boolean);

    return (
        <>
            <Card actions={actions}>
                <Col><Typography.Title level={4} style={{marginTop: 0}}>{event.name}</Typography.Title></Col>
                <Col><Typography.Text>{event.description}</Typography.Text></Col>
                <Col><Typography.Text>Место проведение - {event.locationName}</Typography.Text></Col>
                <Col><Typography.Text>С {dayjs(event.startDate).format('DD-MM-YYYY HH:mm')} до {dayjs(event.endDate).format('DD-MM-YYYY HH:mm')}</Typography.Text></Col>
                <Col>{event.deadline ? <Typography.Text>Дэдлайн в {dayjs(event.deadline).format('DD-MM-YYYY HH:mm')}</Typography.Text> : null}</Col>
            </Card>

            <Modal title='Участники' open={isGroupOpen} onClose={() => setIsGroupOpen(false)} onCancel={() => setIsGroupOpen(false)} footer={[]} >
                {participants.map((user) => (
                    <Col><Typography.Text>{user.username}</Typography.Text></Col>
                ))}
            </Modal>
            
        </>
    )
}

export default EventCard;