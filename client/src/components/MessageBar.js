import React from 'react'
import { Card, CardTitle, Row, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import { MdClear } from 'react-icons/md';

function MessageBar(props) {
    const msg = props.message.msg;
    const status = props.message.status;
    const resetNessageBar = props.resetMessageBar;
    let barColor = '';
    status === 2 ? barColor = "text-danger" : barColor = "text-info";
    return (
        <div>
            <Card>
                <Row>
                    <Col sm='11'>
                        <CardTitle className={barColor} >
                            Status: {status} Message: {msg}
                        </CardTitle>
                </Col>
                    <Col sm='1'>
                      <Link to='#!' onClick={resetNessageBar}>      
                      <MdClear color='dark' size = '2.2rem' /> 
                      </Link> 
                   </Col>
                </Row>
 
            </Card>
        </div>
    )
}

export default MessageBar