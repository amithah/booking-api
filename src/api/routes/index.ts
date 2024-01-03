import { Router } from 'express'
import bookingRouter from './booking'

const router = Router()

router.use('/bookings', bookingRouter)

export default router