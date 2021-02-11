import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const QNA = ({ questionsAndAnswers }) => {
  return (
    <Table celled striped selectable size="large">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>क्रमांक.</Table.HeaderCell>
          <Table.HeaderCell>विहा ने क्या पूछा था </Table.HeaderCell>
          <Table.HeaderCell>अपने ये उत्तर दिया</Table.HeaderCell>
          <Table.HeaderCell>विहा को ये उत्तर सही लगा</Table.HeaderCell>
          <Table.HeaderCell>विहा ने आपको इतने अंक दिए </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {questionsAndAnswers.map((item, i) => (
          <Table.Row key={i + 1}>
            <Table.Cell>{i + 1}</Table.Cell>
            <Table.Cell>{item.question}</Table.Cell>
            <Table.Cell>{item.user_answer}</Table.Cell>
            <Table.Cell>{item.correct_answer}</Table.Cell>
            <Table.Cell>{item.point}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

QNA.propTypes = {
  questionsAndAnswers: PropTypes.array.isRequired
};

export default QNA;
