import * as React from 'react';
import AccordionComponent from '../mui/Accordion';

export default function LessonItem ({ lesson, idx }) {
  return (
    <div className='lesson-item'>
      <AccordionComponent lesson={lesson} idx={idx} key={lesson.id} />
    </div>
  );
}
