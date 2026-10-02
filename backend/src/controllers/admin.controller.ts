import { asyncHandler } from '../utils/asyncHandler';
import { ok } from '../utils/response';
import { Destination } from '../models/Destination';
import { Package } from '../models/Package';
import { Hotel } from '../models/Hotel';
import { Vehicle } from '../models/Vehicle';
import { Booking } from '../models/Booking';
import { User } from '../models/User';
import { Enquiry } from '../models/Enquiry';

export const getStats = asyncHandler(async (_req, res) => {
  const [destinations, packages, hotels, vehicles, bookings, users, enquiries] = await Promise.all([
    Destination.countDocuments(),
    Package.countDocuments(),
    Hotel.countDocuments(),
    Vehicle.countDocuments(),
    Booking.countDocuments(),
    User.countDocuments(),
    Enquiry.countDocuments(),
  ]);

  ok(res, 'Admin stats retrieved', {
    destinations,
    packages,
    hotels,
    vehicles,
    bookings,
    users,
    enquiries,
  });
});

// Packages (Tours)
export const listTours = asyncHandler(async (_req, res) => {
  const items = await Package.find().populate('destination', 'name slug').sort({ createdAt: -1 });
  ok(res, 'Tours list', { items });
});

export const createTour = asyncHandler(async (req, res) => {
  const tour = await Package.create(req.body);
  ok(res, 'Tour created', tour, 201);
});

export const updateTour = asyncHandler(async (req, res) => {
  const tour = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
  ok(res, 'Tour updated', tour);
});

export const deleteTour = asyncHandler(async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  ok(res, 'Tour deleted');
});

// Destinations
export const listDestinations = asyncHandler(async (_req, res) => {
  const items = await Destination.find().sort({ popularity: -1 });
  ok(res, 'Destinations list', { items });
});

export const createDestination = asyncHandler(async (req, res) => {
  const dest = await Destination.create(req.body);
  ok(res, 'Destination created', dest, 201);
});

export const updateDestination = asyncHandler(async (req, res) => {
  const dest = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
  ok(res, 'Destination updated', dest);
});

export const deleteDestination = asyncHandler(async (req, res) => {
  await Destination.findByIdAndDelete(req.params.id);
  ok(res, 'Destination deleted');
});

// Hotels
export const listHotels = asyncHandler(async (_req, res) => {
  const items = await Hotel.find().populate('destination', 'name slug').sort({ createdAt: -1 });
  ok(res, 'Hotels list', { items });
});

export const createHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.create(req.body);
  ok(res, 'Hotel created', hotel, 201);
});

export const updateHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  ok(res, 'Hotel updated', hotel);
});

export const deleteHotel = asyncHandler(async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id);
  ok(res, 'Hotel deleted');
});

// Vehicles / Cabs
export const listVehicles = asyncHandler(async (_req, res) => {
  const items = await Vehicle.find().sort({ pricePerKm: 1 });
  ok(res, 'Vehicles list', { items });
});

export const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  ok(res, 'Vehicle created', vehicle, 201);
});

export const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  ok(res, 'Vehicle updated', vehicle);
});

export const deleteVehicle = asyncHandler(async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  ok(res, 'Vehicle deleted');
});

// Bookings
export const listBookings = asyncHandler(async (_req, res) => {
  const items = await Booking.find().populate('user', 'name email').populate('package', 'title slug').sort({ createdAt: -1 });
  ok(res, 'Bookings list', { items });
});

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  ok(res, 'Booking status updated', booking);
});

// Users
export const listUsers = asyncHandler(async (_req, res) => {
  const items = await User.find().select('-passwordHash -otpHash -refreshTokenHash').sort({ createdAt: -1 });
  ok(res, 'Users list', { items });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-passwordHash');
  ok(res, 'User role updated', user);
});
