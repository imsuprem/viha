import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { useTranslation } from "react-i18next";

const QNA = ({ questionsAndAnswers }) => {
  const { t } = useTranslation();
  return (
    <Table celled striped selectable size="large">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>{t("Qna.SerialNo")}</Table.HeaderCell>
          <Table.HeaderCell>{t("Qna.Question")} </Table.HeaderCell>
          <Table.HeaderCell>{t("Qna.Answer")}</Table.HeaderCell>
          <Table.HeaderCell>{t("Qna.CorrectAnswer")}</Table.HeaderCell>
          <Table.HeaderCell>{t("Qna.MarksObtained")}</Table.HeaderCell>
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
