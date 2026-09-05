import { INITIAL_EQUIPMENT, INITIAL_REQUESTS, INITIAL_USER } from '../data/mockData';

// Simulate API latency
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory state (simulates backend database)
let equipmentData = [...INITIAL_EQUIPMENT];
let requestsData = [...INITIAL_REQUESTS];
let userData = { ...INITIAL_USER };

// ============================================================================
// EQUIPMENT / LISTINGS API
// ============================================================================

export const getAllEquipment = async (filters = {}) => {
  await delay();

  let filtered = [...equipmentData];

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(item => item.category === filters.category);
  }

  // Filter by status
  if (filters.status) {
    filtered = filtered.filter(item => item.status === filters.status);
  }

  // Search by title/description
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Sort
  if (filters.sortBy === 'price-low') {
    filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
  } else if (filters.sortBy === 'price-high') {
    filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
  } else if (filters.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return { success: true, data: filtered };
};

export const getEquipmentById = async (id) => {
  await delay();
  const equipment = equipmentData.find(item => item.id === id);

  if (!equipment) {
    return { success: false, error: 'Equipment not found' };
  }

  return { success: true, data: equipment };
};

export const createEquipment = async (equipmentData) => {
  await delay();

  const newEquipment = {
    id: `eq-${Date.now()}`,
    ...equipmentData,
    ownerId: userData.id,
    ownerName: userData.name,
    ownerAvatar: userData.avatar,
    ownerDepartment: userData.department,
    rating: 0,
    reviewCount: 0,
    status: 'available',
    createdAt: new Date().toISOString()
  };

  equipmentData.push(newEquipment);
  userData.myListings.push(newEquipment);
  userData.listedItemsCount += 1;

  return { success: true, data: newEquipment };
};

export const updateEquipment = async (id, updates) => {
  await delay();

  const index = equipmentData.findIndex(item => item.id === id);
  if (index === -1) {
    return { success: false, error: 'Equipment not found' };
  }

  equipmentData[index] = { ...equipmentData[index], ...updates };

  return { success: true, data: equipmentData[index] };
};

export const deleteEquipment = async (id) => {
  await delay();

  equipmentData = equipmentData.filter(item => item.id !== id);
  userData.myListings = userData.myListings.filter(item => item.id !== id);
  userData.listedItemsCount = Math.max(0, userData.listedItemsCount - 1);

  return { success: true };
};

// ============================================================================
// REQUESTS API
// ============================================================================

export const getAllRequests = async (filters = {}) => {
  await delay();

  let filtered = [...requestsData];

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(req => req.category === filters.category);
  }

  if (filters.urgency) {
    filtered = filtered.filter(req => req.urgency === filters.urgency);
  }

  if (filters.status) {
    filtered = filtered.filter(req => req.status === filters.status);
  }

  return { success: true, data: filtered };
};

export const getRequestById = async (id) => {
  await delay();
  const request = requestsData.find(req => req.id === id);

  if (!request) {
    return { success: false, error: 'Request not found' };
  }

  return { success: true, data: request };
};

export const createRequest = async (requestData) => {
  await delay();

  const newRequest = {
    id: `req-${Date.now()}`,
    ...requestData,
    requesterName: userData.name,
    requesterAvatar: userData.avatar,
    requesterDepartment: userData.department,
    responsesCount: 0,
    createdAt: 'Just now',
    status: 'open'
  };

  requestsData.push(newRequest);

  return { success: true, data: newRequest };
};

export const updateRequest = async (id, updates) => {
  await delay();

  const index = requestsData.findIndex(req => req.id === id);
  if (index === -1) {
    return { success: false, error: 'Request not found' };
  }

  requestsData[index] = { ...requestsData[index], ...updates };

  return { success: true, data: requestsData[index] };
};

export const deleteRequest = async (id) => {
  await delay();

  requestsData = requestsData.filter(req => req.id !== id);

  return { success: true };
};

// ============================================================================
// RENTAL / BOOKING API
// ============================================================================

export const createRental = async (rentalData) => {
  await delay();

  const { equipmentId, startDate, endDate, message } = rentalData;

  // Find equipment
  const equipment = equipmentData.find(item => item.id === equipmentId);
  if (!equipment) {
    return { success: false, error: 'Equipment not found' };
  }

  if (equipment.status !== 'available') {
    return { success: false, error: 'Equipment is not available' };
  }

  // Calculate duration and cost
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  const totalCost = durationDays * equipment.pricePerDay;

  // Create rental record
  const newRental = {
    id: `rent-${Date.now()}`,
    equipmentId,
    equipmentTitle: equipment.title,
    borrowerId: userData.id,
    borrowerName: userData.name,
    ownerId: equipment.ownerId,
    ownerName: equipment.ownerName,
    startDate,
    endDate,
    durationDays,
    pricePerDay: equipment.pricePerDay,
    totalCost,
    deposit: equipment.deposit,
    message,
    status: 'pending', // pending, active, completed, cancelled
    createdAt: new Date().toISOString()
  };

  // Update equipment status
  const equipmentIndex = equipmentData.findIndex(item => item.id === equipmentId);
  equipmentData[equipmentIndex].status = 'rented';

  // Add to user's borrow history
  userData.borrowHistory.unshift({
    id: newRental.id,
    equipmentId,
    title: equipment.title,
    ownerName: equipment.ownerName,
    startDate,
    endDate,
    totalCost,
    status: 'pending',
    reviewed: false
  });
  userData.borrowedItemsCount += 1;

  return { success: true, data: newRental };
};

export const getRentalsByUser = async (userId = userData.id) => {
  await delay();

  return { success: true, data: userData.borrowHistory };
};

export const updateRentalStatus = async (rentalId, status) => {
  await delay();

  const rental = userData.borrowHistory.find(r => r.id === rentalId);
  if (!rental) {
    return { success: false, error: 'Rental not found' };
  }

  rental.status = status;

  // If completed, mark equipment as available again
  if (status === 'completed') {
    const equipment = equipmentData.find(item => item.id === rental.equipmentId);
    if (equipment) {
      equipment.status = 'available';
    }
  }

  return { success: true, data: rental };
};

// ============================================================================
// USER / AUTH API
// ============================================================================

export const getCurrentUser = async () => {
  await delay(100);
  return { success: true, data: userData };
};

export const updateUserMode = async (mode) => {
  await delay(100);
  userData.currentMode = mode;
  return { success: true, data: userData };
};

export const updateUserProfile = async (updates) => {
  await delay();
  userData = { ...userData, ...updates };
  return { success: true, data: userData };
};

export const loginUser = async (email, password) => {
  await delay(500);

  // Mock authentication - always succeeds for demo
  if (email && password) {
    return { success: true, data: userData };
  }

  return { success: false, error: 'Invalid credentials' };
};

export const registerUser = async (userInfo) => {
  await delay(500);

  // Mock registration
  const newUser = {
    ...INITIAL_USER,
    ...userInfo,
    id: `u-${Date.now()}`,
    joinedDate: new Date().toLocaleDateString(),
    borrowHistory: [],
    myListings: []
  };

  userData = newUser;

  return { success: true, data: newUser };
};

export const logoutUser = async () => {
  await delay(100);
  // In a real app, clear tokens/session
  return { success: true };
};

// ============================================================================
// SEARCH & DISCOVERY
// ============================================================================

export const searchEquipment = async (query) => {
  await delay();

  const searchLower = query.toLowerCase();
  const results = equipmentData.filter(item =>
    item.title.toLowerCase().includes(searchLower) ||
    item.description.toLowerCase().includes(searchLower) ||
    item.category.includes(searchLower) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchLower))
  );

  return { success: true, data: results };
};

export const getFeaturedEquipment = async () => {
  await delay();

  // Return top-rated available items
  const featured = equipmentData
    .filter(item => item.status === 'available')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return { success: true, data: featured };
};

// ============================================================================
// STATISTICS (for Lender Dashboard)
// ============================================================================

export const getLenderStats = async () => {
  await delay();

  const myListings = userData.myListings || [];
  const totalEarnings = myListings.reduce((sum, item) => sum + (item.earnings || 0), 0);
  const totalRentals = myListings.reduce((sum, item) => sum + (item.totalRentals || 0), 0);
  const activeListings = myListings.filter(item => item.status === 'available').length;
  const rentedOut = myListings.filter(item => item.status === 'rented').length;

  return {
    success: true,
    data: {
      totalEarnings,
      totalRentals,
      activeListings,
      rentedOut,
      averageRating: userData.rating,
      reviewsCount: userData.reviewsCount,
      recentRentals: [] // Would come from a rentals collection
    }
  };
};
