import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';
import AccordionComponent from './Accordion';

describe('Accordion Component', () => {
  const mockLesson = {
    id: 2,
    title: 'test',
    description: 'description test',
    location: 'location test',
    time: 'time test',
    teachers: {
      username: 'username test'
    }
  };
  const mockIdx = 3;

  test('Accordion should render correctly', () => {
    render(<AccordionComponent lesson={mockLesson} idx={mockIdx} />,
      { wrapper: MemoryRouter })

    screen.getByTestId('lesson-title-el');
    screen.getByTestId('lesson-description-el');
    screen.getByTestId('lesson-time-el');
    screen.getByTestId('lesson-location-el');
    screen.getByRole('button', { name: 'More info' });
  })

  test('Accordion should render correctly with mock', async () => {
    await act(async () => {
      render(<AccordionComponent lesson={mockLesson} idx={mockIdx} />,
        { wrapper: MemoryRouter });
    })
    expect(screen.queryByText(mockLesson.title)).toBeInTheDocument();
    expect(screen.getByTestId('lesson-description-el').textContent).toBe(`Description: ${mockLesson.description}`);
    expect(screen.getByTestId('lesson-time-el').textContent).toBe(`Time: ${mockLesson.time}`);
    expect(screen.getByTestId('lesson-location-el').textContent).toBe(`Place: ${mockLesson.location}`);
  })

});