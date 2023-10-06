import React, { lazy, Suspense, Component } from 'react';
import './App.scss';
import Container from 'react-bootstrap/Container';
import Record from './util/Record';
import { getRecords } from './util/API';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
const RecordDetail = lazy(() => import('./components/RecordDetail'));

export default class App extends Component {

  state: {loading: boolean, data: Record[], allRecords: Record[], filter?: string} = { loading: true, data: [], allRecords: [], filter: null };

  render() {
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark" sticky="top">
          <Container style={{ justifyContent: 'center' }} fluid>
            <a href='https://nickvolgas.com'><img
                src="/NV.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Nickvolgas.com"
              /></a>
          </Container>
        </Navbar>
        <Container fluid>
          <Row>
            <Col style={{ textAlign: 'center' }} className='pt-3 mb-2'>
              <ButtonGroup>
                {Object.entries({'abcde1234567890': 'A-E/0-9', 'fghij': 'F-J', 'klmno': 'K-O', 'pqrst': 'P-T', 'uvwxyz': 'U-Z'}).map((letters: string[]) => {
                  return (
                    <Button key={'letterfilter-' + letters[0]} variant={this.state.filter === letters[0] ? 'success' : 'secondary'} data-filter={letters[0]} onClick={e => {this.filterByLetters(e.currentTarget.dataset.filter)}}>{letters[1]}</Button>
                  );
                }) }
                <Button variant="secondary" data-filter="all" onClick={() => { this.setState({...this.state, ...{data: this.state.allRecords}}); }}>All</Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row>
          {! this.state.loading ? (
            this.state.data.map((record: Record) => {
              return <Suspense key={record.id} fallback={<Spinner key={record.id} animation="border" variant="success"/>}><RecordDetail {...record} key={record.id} /></Suspense>
            })
          ) : (<div style={{ textAlign: 'center' }}><Spinner animation="border" variant="success"/></div>)}
          </Row>
        </Container>
      </>
    );
  }

  async componentDidMount() {
    const records = await getRecords();

    records.sort((a: Record, b: Record) => {
      return a.artist.localeCompare(b.artist);
    });

    this.setState({...this.state, ...{loading: false, data: records, allRecords: records}});
  }

  filterByLetters(letters: string) : void {
    const lettersAllowed : string[] = letters.split('').map((letter: string) => { return letter.toUpperCase(); });
    const filteredRecords = this.state.allRecords.filter((record: Record) => {
      return lettersAllowed.includes(record.artist.replace(/^\.\.\./, '').charAt(0).toUpperCase());
    }).sort((a: Record, b: Record) => {
      return a.artist.localeCompare(b.artist);
    });

    this.setState({...this.state, ...{data: filteredRecords}});
  }
};
