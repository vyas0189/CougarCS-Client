import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { google, outlook, ics } from "calendar-link";
import formatISO from 'date-fns/formatISO'

const AddToCalendar = ({ event }) => {
    const { startDate, endDate } = event;
    const start = startDate ? formatISO(new Date(startDate)) : null;
    const end = endDate ? formatISO(new Date(endDate)) : null;

    return (

        <Dropdown.Menu >
            <Dropdown.Item href={google({ ...event, start, end })} target='_blank'
                rel='noopener nofollow'>Google</Dropdown.Item>
            <Dropdown.Item href={outlook({ ...event, start, end }).replace("&rru=addevent", "")} target='_blank'
                rel='noopener nofollow'>Outlook.com</Dropdown.Item>
            <Dropdown.Item href={ics({ ...event, start, end })}>Others</Dropdown.Item>
        </Dropdown.Menu >

    )
}

export default AddToCalendar