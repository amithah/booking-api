import { Request, Response, Router } from 'express';
import { validationResult,check} from 'express-validator';
import  Booking  from '../../../db/model/booking';

const bookingRouter = Router();

// Validation rules for the booking creation
const createBookingValidation = [
  check('name').notEmpty().withMessage('Name is required'),
  check('jobAddress').notEmpty().withMessage('Job Address is required'),
  check('venueSize').isInt({ min: 1 }).withMessage('Venue Size must be a positive integer'),
  check('isWorkFromHome').isBoolean().withMessage('isWorkFromHome must be a boolean'),
  check('staffs').isArray().withMessage('Staffs must be an array'),
  check('groomingPolicy').notEmpty().withMessage('Grooming Policy is required'),
  check('entryInstructions').notEmpty().withMessage('Entry Instructions are required'),
];

// Middleware to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route to get a booking by ID
bookingRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    // Find the booking by ID using Sequelize
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Successful response with the booking data
    return res.status(200).json({ booking });
  } catch (error: any) {
    console.error('Error fetching booking:', error);

    // Handle specific Sequelize errors
    if (error.name === 'SequelizeDatabaseError') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Generic error response for other errors
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Route to create a new booking

bookingRouter.post('/', createBookingValidation, handleValidationErrors, async (req: Request, res: Response) => {
  try {
    // Extract data from the validated request body
    const { name, jobAddress, venueSize, isWorkFromHome, staffs, groomingPolicy, entryInstructions } = req.body;

    // Create a new booking using Sequelize
    const newBooking = await Booking.create({
      name,
      jobAddress,
      venueSize,
      isWorkFromHome,
      staffs,
      groomingPolicy,
      entryInstructions,
    });

    // Respond with the newly created booking
    return res.status(201).json({ booking: newBooking });
  } catch (error: any) {
    console.error('Error creating booking:', error);

    // Generic error response for other errors
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default bookingRouter;
