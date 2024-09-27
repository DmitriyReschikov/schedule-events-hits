import { useEffect, useState } from "react";
import { Event } from "../interfaces/DTOs/Event";
import { getEvents } from "../api/requests/eventRequests";
import { useLocation } from "react-router-dom";
import { Button, Col, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import ChooseCompanyModal from "../components/ChooseCompanyModal";

const EventsPage = () => {
    const roles: string[] = useSelector((state: RootState) => state.user.roles)
    const [events, setEvents] = useState<Event[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
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
    }, [])

    return (
        <>
            {isLoading ? (
                <Row justify="center" style={{ marginTop: 20 }}>
                    <Col><Typography.Title style={{ margin: 0 }} level={3}>Loading...</Typography.Title></Col>
                </Row>
            ) : (
                <>
                {!roles.includes('MANAGER') && !roles.includes('ADMIN') ? 
                    (<Row justify="end" style={{ marginTop: 20, marginBottom: 20 }}>
                        <Button onClick={() => setIsOpen(true)}>Подать заявку на менеджера</Button>
                        <ChooseCompanyModal isOpen={isOpen} setIsOpen={setIsOpen}/>
                    </Row>
                     )
                   
                    :
                    null
                    }
                    
                </>
            )}
        </>
    )
}

export default EventsPage;
