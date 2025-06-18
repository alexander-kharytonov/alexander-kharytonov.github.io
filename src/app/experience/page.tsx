'use client';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { AnimatePresence, motion } from 'framer-motion';

export default function ExperiencePage() {
  return (
    <AnimatePresence>
      <Stack
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        flexGrow={1}
      >
        <Timeline sx={{ m: 0, p: 0 }}>
          <TimelineItem>
            <TimelineOppositeContent sx={{ flex: '0 0 140px', pl: 0 }}>
              <Stack>
                <Typography variant="body1" noWrap>
                  JUNE 2024
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  January 2018
                </Typography>
              </Stack>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ pr: 0 }}>
              <Typography variant="h6" lineHeight={1.2}>
                Intetics / CloudBees
              </Typography>
              <Typography variant="body2" color="primary">
                Senior Software Engineer
              </Typography>
              <Typography variant="body2" mt={2.5}>
                Projects:
              </Typography>
              <List disablePadding>
                <ListItem>
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1}>
                        <span>•</span>
                        <Box>
                          <Typography component="span" color="primary" pr={0.5}>
                            CD/RO:
                          </Typography>
                          <Typography component="span">
                            Continuous Delivery / Release Orchestration
                          </Typography>
                        </Box>
                      </Stack>
                    }
                    secondary={
                      <List disablePadding>
                        <ListItem sx={{ py: 0 }}>
                          <ListItemText
                            primary={
                              <Stack direction="row" spacing={1}>
                                <Typography variant="caption">—</Typography>
                                <Typography variant="caption">
                                  Implementing new features like Pipeline Kanban
                                  view, Release portfolio, Plugins/Credentials
                                  management, Application/Procedure job/job step
                                  details, Environment inventory, etc.
                                </Typography>
                              </Stack>
                            }
                            slotProps={{
                              primary: { component: 'div' },
                            }}
                            sx={{ my: 0 }}
                          />
                        </ListItem>
                        <ListItem sx={{ py: 0 }}>
                          <ListItemText
                            primary={
                              <Stack direction="row" spacing={1}>
                                <Typography variant="caption">—</Typography>
                                <Typography variant="caption">
                                  Implementing and migrating to new UI
                                  frameworks
                                </Typography>
                              </Stack>
                            }
                            slotProps={{
                              primary: { component: 'div' },
                            }}
                            sx={{ my: 0 }}
                          />
                        </ListItem>
                        <ListItem sx={{ py: 0 }}>
                          <ListItemText
                            primary={
                              <Stack direction="row" spacing={1}>
                                <Typography variant="caption">—</Typography>
                                <Typography variant="caption">
                                  e2e / unit testing, UI optimization, support
                                </Typography>
                              </Stack>
                            }
                            slotProps={{
                              primary: { component: 'div' },
                            }}
                            sx={{ my: 0 }}
                          />
                        </ListItem>
                        <ListItem sx={{ py: 0 }}>
                          <ListItemText
                            primary={
                              <Stack direction="row" spacing={1}>
                                <Typography variant="caption">—</Typography>
                                <Typography variant="caption">
                                  Optimized rendering performance, reducing load
                                  times by 30%
                                </Typography>
                              </Stack>
                            }
                            slotProps={{
                              primary: { component: 'div' },
                            }}
                            sx={{ my: 0 }}
                          />
                        </ListItem>
                        <ListItem sx={{ py: 0 }}>
                          <ListItemText
                            primary={
                              <Stack direction="row" spacing={1}>
                                <Typography variant="caption">—</Typography>
                                <Typography variant="caption">
                                  Collaboration with international teams in an
                                  agile environment
                                </Typography>
                              </Stack>
                            }
                            slotProps={{
                              primary: { component: 'div' },
                            }}
                            sx={{ my: 0 }}
                          />
                        </ListItem>
                      </List>
                    }
                    slotProps={{
                      primary: { component: 'div' },
                      secondary: { component: 'div', color: 'text.primary' },
                    }}
                    sx={{ m: 0 }}
                  />
                </ListItem>
              </List>
              <Typography variant="body2" color="text.secondary">
                Technologies: React / Hooks / Testing Library, HUI / MUI /
                Bootstrap, D3.js, Underscore.js, Backbone.js, Chaplin,
                TypeScript, SASS, Webpack, Selenium, Playwright, Figma, GitHub
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent sx={{ flex: '0 0 140px', pl: 0 }}>
              <Stack>
                <Typography variant="body1" noWrap>
                  DECEMBER 2017
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  November 2017
                </Typography>
              </Stack>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent sx={{ pr: 0 }}>
              <Typography variant="h6" lineHeight={1.2}>
                Elephant Head Software
              </Typography>
              <Typography variant="body2" color="primary">
                Front End Developer
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Stack>
    </AnimatePresence>
  );
}
