import React,{useContext} from 'react';
import { Accordion,Card , AccordionContext,useAccordionToggle  } from 'react-bootstrap';
import "./Footer.css";
import ReactDOM from 'react-dom';

function ContextAwareToggle({ children, eventKey, callback }) {
  const currentEventKey = useContext(AccordionContext);

  const decoratedOnClick = useAccordionToggle(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <button
      type="button"
      style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function Example() {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <ContextAwareToggle eventKey="0">User Guide</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>When you enter your name you can copy the code through "copy code" and then share it with your friend. Then, your friend will write his name and paste the provided code in "Make a call". Then, press the call button and you finally, both the connected to have a video conversation with each other</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}
//ReactDOM.render(<Example />);
export default Example;
