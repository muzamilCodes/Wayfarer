"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRole = exports.listUsers = exports.updateBookingStatus = exports.listBookings = exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.listVehicles = exports.deleteHotel = exports.updateHotel = exports.createHotel = exports.listHotels = exports.deleteDestination = exports.updateDestination = exports.createDestination = exports.listDestinations = exports.deleteTour = exports.updateTour = exports.createTour = exports.listTours = exports.getStats = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const response_1 = require("../utils/response");
const Destination_1 = require("../models/Destination");
const Package_1 = require("../models/Package");
const Hotel_1 = require("../models/Hotel");
const Vehicle_1 = require("../models/Vehicle");
const Booking_1 = require("../models/Booking");
const User_1 = require("../models/User");
const Enquiry_1 = require("../models/Enquiry");
exports.getStats = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const [destinations, packages, hotels, vehicles, bookings, users, enquiries] = await Promise.all([
        Destination_1.Destination.countDocuments(),
        Package_1.Package.countDocuments(),
        Hotel_1.Hotel.countDocuments(),
        Vehicle_1.Vehicle.countDocuments(),
        Booking_1.Booking.countDocuments(),
        User_1.User.countDocuments(),
        Enquiry_1.Enquiry.countDocuments(),
    ]);
    (0, response_1.ok)(res, 'Admin stats retrieved', {
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
exports.listTours = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await Package_1.Package.find().populate('destination', 'name slug').sort({ createdAt: -1 });
    (0, response_1.ok)(res, 'Tours list', { items });
});
exports.createTour = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const tour = await Package_1.Package.create(req.body);
    (0, response_1.ok)(res, 'Tour created', tour, 201);
});
exports.updateTour = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const tour = await Package_1.Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    (0, response_1.ok)(res, 'Tour updated', tour);
});
exports.deleteTour = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await Package_1.Package.findByIdAndDelete(req.params.id);
    (0, response_1.ok)(res, 'Tour deleted');
});
// Destinations
exports.listDestinations = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await Destination_1.Destination.find().sort({ popularity: -1 });
    (0, response_1.ok)(res, 'Destinations list', { items });
});
exports.createDestination = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dest = await Destination_1.Destination.create(req.body);
    (0, response_1.ok)(res, 'Destination created', dest, 201);
});
exports.updateDestination = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const dest = await Destination_1.Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    (0, response_1.ok)(res, 'Destination updated', dest);
});
exports.deleteDestination = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await Destination_1.Destination.findByIdAndDelete(req.params.id);
    (0, response_1.ok)(res, 'Destination deleted');
});
// Hotels
exports.listHotels = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await Hotel_1.Hotel.find().populate('destination', 'name slug').sort({ createdAt: -1 });
    (0, response_1.ok)(res, 'Hotels list', { items });
});
exports.createHotel = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const hotel = await Hotel_1.Hotel.create(req.body);
    (0, response_1.ok)(res, 'Hotel created', hotel, 201);
});
exports.updateHotel = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const hotel = await Hotel_1.Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    (0, response_1.ok)(res, 'Hotel updated', hotel);
});
exports.deleteHotel = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await Hotel_1.Hotel.findByIdAndDelete(req.params.id);
    (0, response_1.ok)(res, 'Hotel deleted');
});
// Vehicles / Cabs
exports.listVehicles = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await Vehicle_1.Vehicle.find().sort({ pricePerKm: 1 });
    (0, response_1.ok)(res, 'Vehicles list', { items });
});
exports.createVehicle = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const vehicle = await Vehicle_1.Vehicle.create(req.body);
    (0, response_1.ok)(res, 'Vehicle created', vehicle, 201);
});
exports.updateVehicle = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const vehicle = await Vehicle_1.Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    (0, response_1.ok)(res, 'Vehicle updated', vehicle);
});
exports.deleteVehicle = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await Vehicle_1.Vehicle.findByIdAndDelete(req.params.id);
    (0, response_1.ok)(res, 'Vehicle deleted');
});
// Bookings
exports.listBookings = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await Booking_1.Booking.find().populate('user', 'name email').populate('package', 'title slug').sort({ createdAt: -1 });
    (0, response_1.ok)(res, 'Bookings list', { items });
});
exports.updateBookingStatus = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const booking = await Booking_1.Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    (0, response_1.ok)(res, 'Booking status updated', booking);
});
// Users
exports.listUsers = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const items = await User_1.User.find().select('-passwordHash -otpHash -refreshTokenHash').sort({ createdAt: -1 });
    (0, response_1.ok)(res, 'Users list', { items });
});
exports.updateUserRole = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const user = await User_1.User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-passwordHash');
    (0, response_1.ok)(res, 'User role updated', user);
});
