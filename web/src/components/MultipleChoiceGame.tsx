import React, { useState } from 'react';
import { Button, Radio, Stack, Title } from '@mantine/core';

interface MultipleChoiceGameProps {
  onBackToGame: () => void;
  onResumeGame: () => void;
}

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"]
  },
  {
    question: "What is 2 + 2?",
    choices: ["3", "4", "5", "6"]
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["O2", "H2O", "CO2", "NaCl"]
  }
];

const MultipleChoiceGame: React.FC<MultipleChoiceGameProps> = ({ onBackToGame, onResumeGame }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoice(null); // Reset selected choice for next question
    } else {
      onBackToGame();
    }
  };

  const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedChoice(event.currentTarget.value);
  };

  return (
    <div>
      <Title order={2}>{questions[currentQuestionIndex].question}</Title>
      <Stack>
        {questions[currentQuestionIndex].choices.map((choice, index) => (
          <Radio
            key={index}
            value={choice}
            checked={selectedChoice === choice}
            onChange={handleChoiceChange}
            label={choice}
          />
        ))}
      </Stack>
      <Button onClick={handleNextQuestion} disabled={!selectedChoice}>
        {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish"}
      </Button>
      <Button
        onClick={onResumeGame}
        size="xs"
        variant="outline"
        style={{ marginTop: '20px', alignSelf: 'center' }}
      >
        Back
      </Button>
    </div>
  );
};

export default MultipleChoiceGame;