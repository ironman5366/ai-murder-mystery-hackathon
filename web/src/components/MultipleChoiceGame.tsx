import React, { useState } from 'react';
import { RadioGroup, Radio, Button, Title, Text } from '@mantine/core';

interface MultipleChoiceGameProps {
  onBackToGame: () => void;
}

export default function MultipleChoiceGame({ onBackToGame }: MultipleChoiceGameProps) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (value === 'correct_answer') { // Replace 'correct_answer' with the actual correct answer
      setCorrect(true);
    } else {
      setCorrect(false);
    }
  };

  return (
    <div>
      <div>
        <Title order={2}>Who is the murderer?</Title>
        <RadioGroup value={value} onChange={setValue} required>
          <Radio value="suspect1" label="Suspect 1" />
          <Radio value="suspect2" label="Suspect 2" />
          <Radio value="suspect3" label="Suspect 3" />
          <Radio value="correct_answer" label="Correct Suspect" /> {/* Replace this label */}
        </RadioGroup>
        <Button onClick={handleSubmit} style={{ marginTop: '20px' }}>
          Submit
        </Button>
        {submitted && (
          <Text style={{ marginTop: '20px' }}>
            {correct ? 'Congratulations! You found the murderer.' : 'Sorry, that is not correct.'}
          </Text>
        )}
      </div>
      <Button
        onClick={onBackToGame}
        size="xs"
        variant="outline"
        style={{ marginTop: '20px', alignSelf: 'center' }}
      >
        Back
      </Button>
    </div>
  );
}