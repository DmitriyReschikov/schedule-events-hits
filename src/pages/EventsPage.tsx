import { useEffect, useState } from "react";
import { Event } from "../interfaces/DTOs/Event";
import { getEvents } from "../api/requests/eventRequests";
import { useLocation } from "react-router-dom";
import { Button, Col, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import ChooseCompanyModal from "../components/ChooseCompanyModal";
import NewEventModal from "../components/NewEventModal";
import EventCard from "../components/EventCard";

const EventsPage = () => {
    const roles: string[] = useSelector((state: RootState) => state.user.roles)
    const [events, setEvents] = useState<Event[]>([])
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isOpenSendRequest, setIsOpenSendRequest] = useState<boolean>(false)
    const [isOpenNewEvent, setIsOpenNewEvent] = useState<boolean>(false)
    const location = useLocation();

    useEffect(() => {
        const fetchEvents = async () => {
            const eventsData = await getEvents(location.search || '')
            if (eventsData) {
                setEvents(eventsData)
            }
            setIsLoading(false)
        }

        fetchEvents()
    }, [isUpdating])

    return (
        <>
        {isLoading ? (
            <Row justify="center" style={{ marginTop: 20 }}>
                <Col>
                    <Typography.Title style={{ margin: 0 }} level={3}>Loading...</Typography.Title>
                </Col>
            </Row>
        ) : (
            <>
                <Row justify="end" style={{ marginTop: 20, marginBottom: 20 }}>
                    {!roles.includes('MANAGER') && !roles.includes('ADMIN') ? (
                        <>
                            <Button onClick={() => setIsOpenSendRequest(true)}>Подать заявку на менеджера</Button>
                            <ChooseCompanyModal isOpen={isOpenSendRequest} setIsOpen={setIsOpenSendRequest} />
                        </>
                    ) : roles.includes('MANAGER') ? (
                        <>
                            <Button onClick={() => setIsOpenNewEvent(true)}>Добавить мероприятие</Button>
                            <NewEventModal isCreating={true} isOpen={isOpenNewEvent} setIsOpen={setIsOpenNewEvent} setIsUpdating={setIsUpdating} />
                        </>
                    ) : null}
                </Row>
                <Row justify='center'>
                    <Col span={20}>
                        <Row justify='start' gutter={[12, 12]}>
                            {events?.map((event) => (
                                <Col xs={24} sm={24} md={12} xl={12} lg={12}>
                                    <EventCard key={event.id} event={event} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </>
        )}
    </>
    )
}

export default EventsPage;
