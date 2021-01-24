import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import hackathons from '../../hackathonlists';
import HackathonComp from '../../components/Hackathon/hackathonsComp';
import './Hackathon.css';

const Hackathon = () => {

    const [currTime, updateCurrTime] = useState(new Date().toISOString().split("T")[0]);

    return (
        <Container className="hackathonCard" fluid>
            <h1>Upcoming Hackthons</h1>
            <div className="hackathonLogos">
                {
                hackathons.sort((a, b) => (a.year.concat(a.startDate) > b.year.concat(b.startDate)) ? 1:-1).map((hackathonlist) =>
                    (hackathonlist.year.concat(hackathonlist.endDate) > currTime) ? (
                        <HackathonComp hackathonlist = {hackathonlist} key = {hackathonlist.id}/> 
                    ) : null     
                )
                }
            </div>
            <h1>Past Hackathons</h1>
            <div className="hackathonLogos past">
                {
                hackathons.sort((a, b) => (a.year.concat(a.startDate) < b.year.concat(b.startDate)) ? 1:-1).map((hackathonlist) =>
                    (hackathonlist.year.concat(hackathonlist.endDate) < currTime) ? (
                        <HackathonComp hackathonlist = {hackathonlist} key = {hackathonlist.id}/> 
                    ) : null
                )
                }
            </div>
        </Container>
    )
}

export default Hackathon;