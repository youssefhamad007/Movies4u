import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Reusable CustomAccordion component
const CustomAccordion = ({ panel, title, expanded, handleChange,num,answer,isLast }) => (
  <Accordion
    expanded={expanded === panel}
    onChange={handleChange(panel)}
    className="bg-transparent shadow-none border-b-[2px] border-b-transparent"
    sx={{
        backgroundColor: 'transparent',
        ...(isLast
            ? { borderImage: 'none' } // No border for the last element
            : {
                borderImage:
                'linear-gradient(to right, rgba(179, 127, 209, 0) 0%, rgba(179, 127, 209, 1) 17%, rgba(179, 127, 209, 0) 100%) 1',
            }),
        '&:before': { display: 'none' }, // Remove default Material-UI top border
        color:'white',
      }}
    disableGutters
  >
    <AccordionSummary
      expandIcon={expanded === panel ? <RemoveIcon className='text-white'/> : <AddIcon className='text-white'/>}
      aria-controls={`${panel}-content`}
      id={`${panel}-header`}
      className="bg-transparent "
    >
      <Typography component="span" className='flex gap-8 items-center '><div className='num'>{num}</div>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {answer}
      </Typography>
    </AccordionDetails>
  </Accordion>
);

export default function Accordioncard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Array of accordion data
  const accordionData = [
    { panel: 'panel1', title: 'What is StreamVibe?',num:'01',answer:'Movies4u is a premium streaming service offering a vast library of movies and TV shows, including exclusive originals and recent releases, accessible on multiple devices.' },
    { panel: 'panel2', title: 'How much does StreamVibe cost?',num:'02',answer:'Movies4u offers plans starting at $9.99/month for the Basic Plan, with Standard and Premium options at $12.99 and $15.99, providing additional features like HD streaming.' },
    { panel: 'panel3', title: 'What content is available on StreamVibe?',num:'03',answer:'Movies4u provides a wide range of content, including blockbuster movies, popular TV shows, exclusive originals, and diverse genres like drama, action, and documentaries.' },
    { panel: 'panel4', title: 'How can I watch StreamVibe?',num:'04',answer:'Movies4u provides a wide range of content, including blockbuster movies, popular TV shows, exclusive originals, and diverse genres like drama, action, and documentaries.' },
    { panel: 'panel5', title: 'How do I sign up for StreamVibe?',num:'05',answer:'To sign up, visit the Movies4u website, click "Start Free Trial," and create an account by entering your email, password, and payment details.' },
    { panel: 'panel6', title: 'What is the StreamVibe free trial?',num:'06',answer:'Movies4u offers a 7-day free trial, giving you full access to all content, including premium features, with no charge until the trial period ends.' },
    { panel: 'panel7', title: 'How do I contact StreamVibe customer support?',num:'07',answer:'You can reach Movies4u customer support by emailing support@movies4u.com, using the live chat feature on the website, or calling the helpline number provided in the Support section.' },
    { panel: 'panel8', title: 'What are the StreamVibe payment methods?',num:'08',answer:'Movies4u accepts payments via major credit cards (Visa, MasterCard), PayPal, and select digital wallets like Apple Pay and Google Pay, depending on your region.' },
  ];

  // Split data into two groups for the two columns
  const leftAccordions = accordionData.slice(0, 4); // panel1 to panel4
  const rightAccordions = accordionData.slice(4); // panel5 to panel8

  return (
    <div className="flex flex-row justify-between place-content-between w-[84vw] sesd">
      <div className="flex flex-col gap-8 py-10 w-150 nonone">
        {leftAccordions.map(({ panel, title,num,answer },index) => (
          <CustomAccordion
            key={panel}
            panel={panel}
            title={title}
            expanded={expanded}
            handleChange={handleChange}
            num={num}
            answer={answer}
            isLast={index === leftAccordions.length - 1}
          />
        ))}
      </div>
      <div className="flex flex-col gap-8 py-10 w-150 nonone">
        {rightAccordions.map(({ panel, title,num,answer },index) => (
          <CustomAccordion
            key={panel}
            panel={panel}
            title={title}
            expanded={expanded}
            handleChange={handleChange}
            num={num}
            answer={answer}
            isLast={index === leftAccordions.length - 1}
          />
        ))}
      </div>
    </div>
  );
}