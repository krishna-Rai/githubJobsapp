import React from 'react'
import {Form,FormGroup,Col } from 'react-bootstrap'

export default function ParamForm({params,handleParamChange}) {
    return (
      <Form>
        <Form.Row className="align-items-end">
          <Form.Group as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={handleParamChange}
              value={params.description}
              name="description"
              type="text"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Location</Form.Label>
            <Form.Control
              onChange={handleParamChange}
              value={params.location}
              name="location"
              type="text"
            />
          </Form.Group>
          <Form.Group as={Col} xs="auto" className="mb-4">
            <Form.Check onChange={handleParamChange} value={params.full_time} name='full_time' label="Only Full Time" type="checkbox"/>
          </Form.Group>
        </Form.Row>
      </Form>
    );
}
