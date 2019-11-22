import React, { useState } from 'react';
import styled from "styled-components";
import "styled-components/macro";


export default function ({ name, value, onValueChange, enableEdit = false, displayLine = true }) {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  function onButtonClick () {
    if (editing) {
      onValueChange(currentValue);
    }
    setEditing(!editing);
  }

  return (
    <div>
      <Container>
        <KeyContainer>
          <span>{name}</span>
        </KeyContainer>
        <ValueContainer>
          {editing && (
            <Input type="text" defaultValue={currentValue} onInput={e => setCurrentValue(e.target.value)}/>
          )}
          {!editing && (
            <span>{value}</span>
          )}
        </ValueContainer>
        <EditButton
          css={`visibility: ${enableEdit ? 'unset' : 'hidden'};`}
          onClick={onButtonClick}
        >
          {editing ? 'Save' : 'Edit'}
        </EditButton>
      </Container>
      {displayLine && <Line/>}
    </div>
  )
}

const Line = styled.div`
  height: 1px;
  background-color: #e2dddd;
  width: 100%;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex: 3;
  color: #64605f;
  padding: 10px 0;
`;

const KeyContainer = styled.div`
  flex: 1;
  font-weight: bold;
  font-size: 15px;
`;

const ValueContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
`;

const Input = styled.input`
  
`;

const EditButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  text-decoration: underline;
  color: dodgerblue;
  padding: 0;
`;
