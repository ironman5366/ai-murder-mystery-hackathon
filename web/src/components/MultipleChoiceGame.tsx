import React, { useState } from 'react';
import { Button, Radio, Stack, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface MultipleChoiceGameProps {
  onBackToGame: (answers: string[]) => void;
  onResumeGame: () => void;
}

const choiceKeys = [
  ['choiceViolentJerry', 'choiceManagerPatricia', 'choiceSolitaryHannah', 'choiceAmateurLarry', 'choiceInnocentKim'],
  ['motiveBucketMafia', 'motiveManagerPatricia', 'motiveStolenTreasure', 'motiveVengeanceMarcel', 'motiveVengeancePrincess'],
  ['choiceViolentJerry', 'choiceManagerPatricia', 'choiceSolitaryHannah', 'choiceAmateurLarry', 'choiceInnocentKim'],
];

const MultipleChoiceGame: React.FC<MultipleChoiceGameProps> = ({ onBackToGame, onResumeGame }) => {
  const { t } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);

  const questionKeys = ['question1', 'question2', 'question3'];

  const getChoiceValue = (qIndex: number, cIndex: number) => {
    const values = [
      ['Violent Jerry', 'Manager Patricia', 'Solitary Hannah', 'Amateur Larry', 'Innocent Kim'],
      ['Hired to kill from the Bucket Mafia', 'Hired to kill from Manager Patricia', 'Getting back stolen treasure', 'Vengeance for the murder of Missing Marcel', 'Vengeance for Pwetty Princess'],
      ['Violent Jerry', 'Manager Patricia', 'Solitary Hannah', 'Amateur Larry', 'Innocent Kim'],
    ];
    return values[qIndex][cIndex];
  };

  const handleNextQuestion = () => {
    if (selectedChoice !== null) {
      const newAnswers = [...answers, selectedChoice];
      setAnswers(newAnswers);
      setSelectedChoice(null);
      if (currentQuestionIndex < questionKeys.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        onBackToGame(newAnswers);
      }
    }
  };

  const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChoice(event.currentTarget.value);
  };

  return (
    <div>
      <Title order={2}>{t(questionKeys[currentQuestionIndex])}</Title>
      <br></br>
      <Stack>
        {choiceKeys[currentQuestionIndex].map((key, index) => (
          <Radio
            key={index}
            value={getChoiceValue(currentQuestionIndex, index)}
            checked={selectedChoice === getChoiceValue(currentQuestionIndex, index)}
            onChange={handleChoiceChange}
            label={t(key)}
          />
        ))}
      </Stack>
      <br></br>
      <Button onClick={handleNextQuestion} disabled={!selectedChoice}>
        {currentQuestionIndex < questionKeys.length - 1 ? t('nextQuestion') : t('finish')}
      </Button>
      <br></br>
      <Button
        onClick={onResumeGame}
        size="xs"
        variant="outline"
        style={{ marginTop: '20px', alignSelf: 'center' }}
      >
        {t('back')}
      </Button>
    </div>
  );
};

export default MultipleChoiceGame;