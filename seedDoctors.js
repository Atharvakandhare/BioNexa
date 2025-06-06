require('dotenv').config();
const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');

const doctors = {
  Cardiology: [
    {
      _id: 1,
      id: 1,
      name: "Dr. Sarah Johnson",
      expertise: "Cardiology",
      experience: "15 years",
      education: "MD in Cardiology, Harvard Medical School",
    rating: 4.8,
      patients: 2500,
      availableDates: [
        new Date("2024-03-25"),
        new Date("2024-03-26"),
        new Date("2024-03-27")
      ],
      availableSlots: ["09:00", "10:00", "11:00", "14:00"],
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop",
      description: "Specialized in preventive cardiology and heart disease management",
      specialization: "Cardiology"
    },
    {
      _id: 2,
      id: 2,
      name: "Dr. Michael Chen",
      expertise: "Cardiology",
      experience: "12 years",
      education: "MD in Cardiology, Johns Hopkins University",
      rating: 4.9,
      patients: 1800,
      availableDates: [
        new Date("2024-03-26"),
        new Date("2024-03-28"),
        new Date("2024-03-29")
      ],
      availableSlots: ["10:00", "11:00", "15:00", "16:00"],
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=500&fit=crop",
      description: "Expert in interventional cardiology and cardiac rehabilitation",
      specialization: "Cardiology"
    }
  ],
  Dermatology: [
    {
      _id: 3,
      id: 3,
      name: "Dr. Emily Rodriguez",
      expertise: "Dermatology",
      experience: "10 years",
      education: "MD in Dermatology, Stanford University",
      rating: 4.7,
      patients: 2000,
      availableDates: [
        new Date("2024-03-25"),
        new Date("2024-03-27"),
        new Date("2024-03-28")
      ],
      availableSlots: ["09:00", "10:00", "14:00", "15:00"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
      description: "Specialized in cosmetic dermatology and skin cancer treatment",
      specialization: "Dermatology"
    },
    {
      _id: 4,
      id: 4,
      name: "Dr. David Kim",
      expertise: "Dermatology",
      experience: "8 years",
      education: "MD in Dermatology, UCLA",
      rating: 4.6,
      patients: 1500,
      availableDates: [
        new Date("2024-03-26"),
        new Date("2024-03-28"),
        new Date("2024-03-29")
      ],
      availableSlots: ["11:00", "12:00", "16:00", "17:00"],
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=500&fit=crop",
      description: "Expert in medical dermatology and skin conditions",
      specialization: "Dermatology"
    }
  ],
  Neurology: [
    {
      _id: 5,
      id: 5,
      name: "Dr. James Wilson",
      expertise: "Neurology",
      experience: "20 years",
      education: "MD in Neurology, Mayo Clinic",
    rating: 4.9,
      patients: 3000,
      availableDates: [
        new Date("2024-03-25"),
        new Date("2024-03-27"),
        new Date("2024-03-29")
      ],
      availableSlots: ["09:00", "10:00", "14:00", "15:00"],
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=500&fit=crop",
      description: "Specialized in neurological disorders and brain health",
      specialization: "Neurology"
    },
    {
      _id: 6,
      id: 6,
      name: "Dr. Lisa Patel",
      expertise: "Neurology",
      experience: "14 years",
      education: "MD in Neurology, Cleveland Clinic",
      rating: 4.8,
      patients: 2200,
      availableDates: [
        new Date("2024-03-26"),
        new Date("2024-03-28"),
        new Date("2024-03-30")
      ],
      availableSlots: ["10:00", "11:00", "15:00", "16:00"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
      description: "Expert in sleep medicine and neurological conditions",
      specialization: "Neurology"
    }
  ],
  Pediatrics: [
    {
      _id: 7,
      id: 7,
      name: "Dr. Maria Garcia",
      expertise: "Pediatrics",
      experience: "16 years",
      education: "MD in Pediatrics, Boston Children's Hospital",
      rating: 4.9,
      patients: 2800,
      availableDates: [
        new Date("2024-03-25"),
        new Date("2024-03-27"),
        new Date("2024-03-28")
      ],
      availableSlots: ["09:00", "10:00", "14:00", "15:00"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop",
      description: "Specialized in child development and pediatric care",
      specialization: "Pediatrics"
    },
    {
      _id: 8,
      id: 8,
      name: "Dr. Robert Taylor",
      expertise: "Pediatrics",
      experience: "11 years",
      education: "MD in Pediatrics, Children's Hospital of Philadelphia",
      rating: 4.7,
      patients: 1800,
      availableDates: [
        new Date("2024-03-26"),
        new Date("2024-03-28"),
        new Date("2024-03-29")
      ],
      availableSlots: ["11:00", "12:00", "16:00", "17:00"],
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=500&fit=crop",
      description: "Expert in pediatric emergency medicine",
      specialization: "Pediatrics"
    }
  ]
};

const seedDoctors = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/bionexa');
    console.log('Connected to MongoDB');
    
    // Clear existing doctors
    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    // Insert new doctors
    for (const specialization in doctors) {
      for (const doctor of doctors[specialization]) {
        await Doctor.create(doctor);
        console.log(`Created doctor: ${doctor.name}`);
      }
    }

    console.log('All doctors seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding doctors:', error);
    process.exit(1);
  }
};

seedDoctors();
