import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Segment,
  Item,
  Dropdown,
  Divider,
  Button,
  Message,
  Label
} from 'semantic-ui-react';

import mindImg from '../../images/mind.svg';

import {
  NUM_OF_QUESTIONS,
  COUNTDOWN_TIME
} from '../../constants';
import { shuffle } from '../../utils';

import Offline from '../Offline';

import { useTranslation } from "react-i18next";

const Main = ({ startQuiz }) => {
  const [category, setCategory] = useState(null);
  const [numOfQuestions, setNumOfQuestions] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [questionsType, setQuestionsType] = useState(null);
  const [countdownTime, setCountdownTime] = useState({
    hours: null,
    minutes: null,
    seconds: null
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);
  const { t } = useTranslation();


  const handleTimeChange = (e, { name, value }) => {
    setCountdownTime({ ...countdownTime, [name]: value });
  };

  const DIFFICULTY =  [{
    key: '0',
    text: t("Difficulty.Any"),
    value: '0'
  },
  {
    key: 'easy',
    text: t("Difficulty.Easy"),
    value: 'easy'
  },
  {
    key: 'medium',
    text: t("Difficulty.Medium"),
    value: 'medium'
  },
  {
    key: 'hard',
    text: t("Difficulty.Hard"),
    value: 'hard'
  }];

  const QUESTIONS_TYPE = [
    {
      key: '0',
      text: t("QuestionType.AnyType"),
      value: '0'
    },
    {
      key: 'multiple',
      text: t("QuestionType.MultipleChoice"),
      value: 'multiple'
    },
    {
      key: 'boolean',
      text: t("QuestionType.TrueFalse"),
      value: 'boolean'
    }
  ];
 
  const CATEGORIES =  [
    {
      "key":0,
      "text":t("Categories.0.text"),
      "value":"0"
    },
    {
      "key":9,
      "text":t("Categories.9.text"),
      "value":9
    },
    {
      "key":10,
      "text":t("Categories.10.text"),
      "value":10
    },
    {
      "key":11,
      "text":t("Categories.11.text"),
      "value":11
    },
    {
      "key":12,
      "text":t("Categories.12.text"),
      "value":12
    },
    {
      "key":13,
      "text":t("Categories.13.text"),
      "value":13
    },
    {
      "key":14,
      "text":t("Categories.14.text"),
      "value":14
    },
    {
      "key":15,
      "text":t("Categories.15.text"),
      "value":15
    },
    {
      "key":16,
      "text":t("Categories.16.text"),
      "value":16
    },
    {
      "key":17,
      "text":t("Categories.17.text"),
      "value":17
    },
    {
      "key":18,
      "text":t("Categories.18.text"),
      "value":18
    },
    {
      "key":19,
      "text":t("Categories.19.text"),
      "value":19
    },
    {
      "key":20,
      "text":t("Categories.20.text"),
      "value":20
    },
    {
      "key":21,
      "text":t("Categories.21.text"),
      "value":21
    },
    {
      "key":22,
      "text":t("Categories.22.text"),
      "value":22
    },
    {
      "key":23,
      "text":t("Categories.23.text"),
      "value":23
    },
    {
      "key":24,
      "text":t("Categories.24.text"),
      "value":24
    },
    {
      "key":25,
      "text":t("Categories.25.text"),
      "value":25
    },
    {
      "key":26,
      "text":t("Categories.26.text"),
      "value":26
    },
    {
      "key":27,
      "text":t("Categories.27.text"),
      "value":27
    },
    {
      "key":28,
      "text":t("Categories.28.text"),
      "value":28
    },
    {
      "key":29,
      "text":t("Categories.29.text"),
      "value":29
    },
    {
      "key":30,
      "text":t("Categories.30.text"),
      "value":30
    },
    {
      "key":31,
      "text":t("Categories.31.text"),
      "value":31
    },
    {
      "key":32,
      "text":t("Categories.32.text"),
      "value":32
    }
  ];

  let allFieldsSelected = false;
  if (
    category &&
    numOfQuestions &&
    difficulty &&
    questionsType &&
    (countdownTime.hours || countdownTime.minutes || countdownTime.seconds)
  ) {
    allFieldsSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    const API = `https://triviadb.vihaconsulting.com/questions?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionsType}`;

    fetch(API)
      .then(respone => respone.json())
      .then(data =>
        setTimeout(() => {
          const { response_code, results } = data;

          if (response_code === 1) {
            const message = (
              <p>
                The API doesn't have enough questions for your query. (Ex.
                Asking for 50 Questions in a Category that only has 20.)
                <br />
                <br />
                Please change the <strong>No. of Questions</strong>,{' '}
                <strong>Difficulty Level</strong>, or{' '}
                <strong>Type of Questions</strong>.
              </p>
            );

            setProcessing(false);
            setError({ message });

            return;
          }

          results.forEach(element => {
            element.options = shuffle([
              element.correct_answer,
              ...element.incorrect_answers
            ]);
          });

          setProcessing(false);
          startQuiz(
            results,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        }, 1000)
      )
      .catch(error =>
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true);
          } else {
            setProcessing(false);
            setError(error);
          }
        }, 1000)
      );
  };

  if (offline) return <Offline />;

  return (
    <Container>
      <Segment>
        <Item.Group divided>
          <Item>
            <Item.Image src={mindImg} />
            <Item.Content>
              <Item.Header>
                <h1>{t('headerTitle')}</h1>
                
                <h5>{t('headerDescription')}</h5>
              </Item.Header>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Divider />
              <Item.Meta>
              <Label size="large" pointing="right">{t("Questions.category")}</Label>
                <Dropdown
                  
                  selection
                  name="category"
                  placeholder={t("Questions.category")}
                  options={CATEGORIES}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  disabled={processing}
                />
                <br />
                <Label size="large" pointing="right">{t("Questions.numOfQ")}</Label>
                <Dropdown
                  
                  selection
                  name="numOfQ"
                  placeholder={t("Questions.numOfQ")}
                  options={NUM_OF_QUESTIONS}
                  value={numOfQuestions}
                  onChange={(e, { value }) => setNumOfQuestions(value)}
                  disabled={processing}
                />
                <br />
                <Label size="large" pointing="right">{t("Questions.difficulty")}</Label>
                <Dropdown
                  
                  selection
                  name="difficulty"
                  placeholder={t("Questions.difficulty")}
                  options={DIFFICULTY}
                  value={difficulty}
                  onChange={(e, { value }) => setDifficulty(value)}
                  disabled={processing}
                />
                <br />
                <Label size="large" pointing="right">{t("Questions.type")}</Label>
                <Dropdown
                  
                  selection
                  name="type"
                  placeholder={t("Questions.type")}
                  options={QUESTIONS_TYPE}
                  value={questionsType}
                  onChange={(e, { value }) => setQuestionsType(value)}
                  disabled={processing}
                />
                <br />
                 <Label size="large" pointing="right">{t("Questions.minutes")}</Label>
                <Dropdown
                  search
                  selection
                  name="minutes"
                  placeholder={t("Questions.minutes")}
                  options={COUNTDOWN_TIME.minutes}
                  value={countdownTime.minutes}
                  onChange={handleTimeChange}
                  disabled={processing}
                />
                 
              </Item.Meta>
              <Divider />
              <Item.Extra>
                <Button
                  primary
                  size="big"
                  icon="play"
                  labelPosition="left"
                  content={processing ? t("Questions.wait") : t("Questions.letsStart")}
                  onClick={fetchData}
                  disabled={!allFieldsSelected || processing}
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <br />
    </Container>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired
};

export default Main;
