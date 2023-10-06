import React from 'react';
import Record from '../util/Record';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

export default class RecordDetail extends React.Component<Record> {

    render() {
        return (
            <Col lg={3} md={4} xs={6} style={{ padding: '1rem' }}>
                <Card border="light" className='activity-card'>
                    <Card.Body>
                        
                        <Card.Title>{this.props.album}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.props.artist}</Card.Subtitle>
                        <Card.Text>
                            Acquired on {this.props.dateAdded.toDateString()}
                        </Card.Text>
                        {/* <Card.Link href={`https://www.strava.com/activities/${this.props.id}`} target="_blank">Link to Activity</Card.Link> */}
                            
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}