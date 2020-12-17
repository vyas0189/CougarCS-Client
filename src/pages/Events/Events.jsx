import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import Loading from '../../components/Loading/Loading';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import purify from 'dompurify';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import local from "date-fns/locale/en-US";
import AddToCalendar from '../../components/AddToCalendar/AddToCalendar';
import './Event.css';


const locales = {
	'en-US': local,
}

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
})

const URL = 'https://backend.cougarcs.com/api/events';

const addEvents = (eventType, events) => {
	return eventType.map((event) => {

		return events.push({
			start: event.start.date,
			end: event.end.date,
			title: event.summary,
			desc: event?.description ? event.description : 'TBD',
		});
	});
};



const Events = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
		setDesc({
			title: '',
			startDate: '',
			endDate: '',
			description: '',
		});
	};
	const [desc, setDesc] = useState({
		title: '',
		startDate: '',
		endDate: '',
		description: '',
	});

	const formatDates = (date) => {
		return format(new Date(date), 'EEEE, MMMM do yyyy, h:mm a')
	}

	const selectedEvent = (e) => {
		console.log(e);
		setDesc({
			title: e.title,
			startDate: e.start,
			endDate: e.end,
			description: e.desc,
		});
		setShow(true);
	}

	useEffect(() => {
		axios
			.get(URL)
			.then((resp) => {
				const events = [];
				addEvents(resp.data.futureEvents, events);
				addEvents(resp.data.pastEvents, events);

				setEvents(events);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			{loading ? (
				<div className='load'>
					<Loading className='loader' />
				</div>
			) : (
					<div className='event-container'>
						<Calendar
							localizer={localizer}
							events={events}
							startAccessor='start'
							endAccessor='end'
							style={{ height: '100%' }}
							views={{
								month: true,
								agenda: true,
							}}
							popup={true}
							drilldownView='agenda'
							popupOffset={{ x: 30, y: 20 }}
							onSelectEvent={(e) => selectedEvent(e)}
						/>
					</div>
				)}

			<Modal show={show} size='lg' onHide={handleClose} keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>{desc.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					From: {desc.startDate ? formatDates(desc.startDate) : ''} <br /> To: {desc.endDate ? formatDates(desc.endDate) : ''}
					<br />
					<hr />
					Description:{' '}
					{
						<div
							className='eventModalDesc'
							dangerouslySetInnerHTML={{ __html: purify.sanitize(desc.description) }}
						/>
					}
				</Modal.Body>
				<Modal.Footer>

					<Dropdown>
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							Add To Calendar
						  </Dropdown.Toggle>

						<AddToCalendar event={desc} />
					</Dropdown>

					<Button variant='danger' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
export default Events;
