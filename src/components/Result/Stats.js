import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Header, Button } from 'semantic-ui-react';

import ShareButton from '../ShareButton';
import { calculateScore, calculateGrade, timeConverter } from '../../utils';
import { useTranslation } from "react-i18next";

const Stats = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  replayQuiz,
  resetQuiz
}) => {
  const score = calculateScore(totalQuestions, correctAnswers);
  const { grade, remarks } = calculateGrade(score);
  const { hours, minutes, seconds } = timeConverter(timeTaken);
  const { t } = useTranslation();

  return (
    <Segment>
      <Header as="h1" textAlign="center" block>
        {remarks}
      </Header>
      <Header as="h2" textAlign="center" block>
      {t("Stats.Grade")} : {grade}
      </Header>
      <Header as="h3" textAlign="center" block>
      {t("Stats.TotalQuestions")} : {totalQuestions}
      </Header>
      <Header as="h3" textAlign="center" block>
      {t("Stats.CorrectAnswers")} : {correctAnswers}
      </Header>
      <Header as="h3" textAlign="center" block>
      {t("Stats.Score")} : {score}%
      </Header>
      <Header as="h3" textAlign="center" block>
      {t("Stats.MinimumRequired")}: 60%
      </Header>
      <Header as="h3" textAlign="center" block>
      {t("Stats.TimeTaken")} :{' '}
        {`${Number(hours)} ${t("Stats.Hours")}  ${Number(minutes)} ${t("Stats.Minutes")}  ${Number(seconds)} ${t("Stats.Seconds")} `}
      </Header>
      <div style={{ marginTop: 35 }}>
        <Button
          primary
          content={t("Stats.RepeatTest")}
          onClick={replayQuiz}
          size="big"
          icon="redo"
          labelPosition="left"
          style={{ marginRight: 15, marginBottom: 8 }}
        />
        <Button
          color="teal"
          content={t("Stats.NewTest")}
          onClick={resetQuiz}
          size="big"
          icon="home"
          labelPosition="left"
          style={{ marginBottom: 8 }}
        />
        <ShareButton />
      </div>
    </Segment>
  );
};

Stats.propTypes = {
  totalQuestions: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  timeTaken: PropTypes.number.isRequired,
  replayQuiz: PropTypes.func.isRequired,
  resetQuiz: PropTypes.func.isRequired
};

export default Stats;
