import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import ButtonAuth from '../buttons/ButtonAuth';

import {
  Card,
  CardActions,
  CardContent,
  Container,
  Link,
  Typography,
} from '@mui/material';

export default function LessonCard () {
  //Create a Service to fentch Data
  // getting lessonID from url using "useLocation" hook
  const lessonId = useLocation().pathname.split('/')[2];

  // --- LESSON QUERY ---
  const { loading, error, data } = useQuery(FETCH_ONE_LESSON, {
    variables: { lessonId },
  });
  if (error) return `Error! ${error.message}`;

  // wait for data to load and organize it
  const lesson = loading ? '' : data.getLesson;
  const teachers = loading
    ? ''
    : lesson.teachers.flatMap((teacher) => teacher.username);
  console.log({ teachers });

  return (
    <Container>
      {
        /* wait for data to load to render lesson */
        loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Card
              sx={{ mt: 1, backgroundColor: '#f0f0f0', borderRadius: '0px' }}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  sx={{ fontFamily: 'Ubuntu' }}
                  align='center'>
                  {lesson.title}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ mb: 2 }}>
                  {lesson.description}
                </Typography>
                <Typography variant='body1' color='text.primary'>
                  Teachers:
                  {lesson.teachers.map((teacher, id) =>
                    id !== lesson.teachers.length - 1 ? (
                      <>
                        <Link key={id}>{` ${teacher.first_name} `}</Link> and
                      </>
                    ) : (
                      <>
                        <Link key={id}>{` ${teacher.first_name} `}</Link> .
                      </>
                    )
                  )}
                </Typography>
              </CardContent>
            </Card>
            <CardActions>
              <ButtonAuth lesson={lesson} />
            </CardActions>
          </>
        )
      }
    </Container>
  );
}

const FETCH_ONE_LESSON = gql`
  query getLesson($lessonId: ID!) {
    getLesson(lessonId: $lessonId) {
      id
      title
      description
      location
      time
      teachers {
        id
        username
        first_name
        last_name
      }
      students {
        id
      }
      studentCount
      created_at
    }
  }
`;
