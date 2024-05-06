import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import DeliveryAddress from './DeliveryAddress';
import Ordersummary from './Ordersummary';
const steps = ['Login', 'Address', 'Summary&payment',];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
 const location = useLocation();
  const querysearch = new URLSearchParams(location.search);
  const step = parseInt(querysearch.get("step"), 10);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  

  return (
    <>
    <div className='px-4 lg:px-20 mt-10'>
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={step}>
        {steps.map((label, index) => {
          const stepProps= {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
           
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
      
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {/* <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button> */}
            <Box sx={{ flex: '1 1 auto' }} />
            {/* <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button> */}
          </Box>
          <div className='mt-20'>
            {step==2?<DeliveryAddress/>:<Ordersummary/>}
          </div>
        </React.Fragment>
      )}
    </Box>
    </div>
    </>
  );}
