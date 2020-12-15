import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import Loading from '../../components/Loading/Loading';
import './Event.css';
import { Modal, Button } from 'react-bootstrap';
import purify from 'dompurify';
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import local from "date-fns/locale/en-US";

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


const url = 'https://backend.cougarcs.com/api/events';

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

	useEffect(() => {
		axios
			.get(url)
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
							onSelectEvent={(e) => {
								setDesc({
									title: e.title,
									startDate: format(new Date(e.start), 'EEEE, MMMM do yyyy, h:mm a'),
									endDate: format(new Date(e.end), 'EEEE, MMMM do yyyy, h:mm a'),
									description: e.desc,
								});
								setShow(true);
							}}
						/>
					</div>
				)}

			<Modal show={show} size='lg' onHide={handleClose} keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>{desc.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					From: {desc.startDate} <br /> To: {desc.endDate}
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
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
export default Events;
