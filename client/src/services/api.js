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

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getCurrentUser = async () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return { success: false, error: 'No token found' };
  }

  // For now, decode the token payload to get user info
  // In a production app, you'd validate with the backend
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      localStorage.removeItem('authToken');
      return { success: false, error: 'Token expired' };
    }

    // Return user data from localStorage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return { success: true, data: JSON.parse(storedUser) };
    }

    return { success: false, error: 'No user data found' };
  } catch (error) {
    localStorage.removeItem('authToken');
    return { success: false, error: 'Invalid token' };
  }
};

export const updateUserMode = async (mode) => {
  await delay(100);
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    user.currentMode = mode;
    localStorage.setItem('user', JSON.stringify(user));
    return { success: true, data: user };
  }
  userData.currentMode = mode;
  return { success: true, data: userData };
};

export const updateUserProfile = async (updates) => {
  await delay();
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    const updatedUser = { ...user, ...updates };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return { success: true, data: updatedUser };
  }
  userData = { ...userData, ...updates };
  return { success: true, data: userData };
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Login failed' };
    }

    // Store token and user data
    localStorage.setItem('authToken', data.token);

    // Merge backend user data with frontend user structure
    const userWithDefaults = {
      id: data.user.user_id,
      name: data.user.full_name,
      email: data.user.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.full_name)}&background=6366f1&color=fff`,
      department: 'Student',
      currentMode: 'borrower',
      borrowHistory: [],
      myListings: [],
      borrowedItemsCount: 0,
      listedItemsCount: 0,
      rating: 5.0,
      reviewsCount: 0,
      joinedDate: new Date(data.user.created_at).toLocaleDateString()
    };

    localStorage.setItem('user', JSON.stringify(userWithDefaults));

    return { success: true, data: userWithDefaults };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
};

export const registerUser = async (userInfo) => {
  try {
    // Map 'name' field to 'fullName' for backend
    const requestBody = {
      fullName: userInfo.name,
      email: userInfo.email,
      password: userInfo.password
    };

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Registration failed' };
    }

    // After successful registration, log the user in
    return await loginUser(userInfo.email, userInfo.password);
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
};

export const logoutUser = async () => {
  await delay(100);
  // Clear tokens and user data from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
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
