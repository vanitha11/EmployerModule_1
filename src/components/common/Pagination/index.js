import * as React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import './pagination.css';

export default () => {
    return(
        <div className='Wrapper'>
            <div className='LeftWrapper'>
                <Form>
                    <InputGroup size="sm">
                        <InputGroup.Text>Show</InputGroup.Text>
                        <FormControl
                            as="select"
                            custom
                            
                            size="sm"
                            >
                            {[10, 25, 50, 100].map(m => (
                                <option key={m} value={m}>
                                {m}
                                </option>
                            ))}
                        </FormControl>
                        <span className='Entries'> entries</span>
                    </InputGroup>
                </Form>
            </div>
        </div>
    )
}