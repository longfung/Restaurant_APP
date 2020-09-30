import React, { useEffect } from "react";
import { Card, CardTitle, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { MdClear } from "react-icons/md";

function MessageBar(props) {
  const msg = props.message.msg;
  const status = props.message.status;
  const resetNessageBar = props.resetMessageBar;

  useEffect(() => {
    setInterval(resetNessageBar, 10000);
  }, []);

  //

  let barColor = "";
  status > 299 ? (barColor = "text-danger font-weight-bold") : (barColor = "text-primary font-weight-bold");
  return (
    <div className="notification-bottom">
      <Card>
        <Row>
          <Col sm="11" xs="10">
            {status < 300 ?
              <CardTitle className={barColor}>
                {msg}
              </CardTitle>
              :
              <CardTitle className={barColor}>
                Status: {status} Message: {msg}
              </CardTitle>
            }

          </Col>
          <Col sm="1" xs="2">
            <Link to="#!" onClick={resetNessageBar}>
              <MdClear color="dark" size="2.2rem" />
            </Link>
          </Col>
        </Row>
      </Card>
    </div >
  );
}

export default MessageBar;
