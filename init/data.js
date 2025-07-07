const mongoose = require('mongoose');
// const Car = require('../models/car'); // adjust the path according to your project structure

const sampleCars = [
    {
        name: "Mustang GT",
        brand: "Ford",
        year: 2022,
        price: 55000,
        image: "https://example.com/images/mustang.jpg", // replace with actual image URL
        description: "Powerful V8 engine, excellent condition, one owner, perfect for muscle car enthusiasts.",
        createdAt: new Date('2024-01-15')
    },
    {
        name: "Model 3",
        brand: "Tesla",
        year: 2023,
        price: 42000,
        image: "https://example.com/images/tesla.jpg",
        description: "Long-range battery, autopilot features, pristine condition with full self-driving capability.",
        createdAt: new Date('2024-02-01')
    },
    {
        name: "Civic Type R",
        brand: "Honda",
        year: 2023,
        price: 38000,
        image: "https://example.com/images/civic.jpg",
        description: "Sports-tuned suspension, 6-speed manual, perfect for both daily driving and track days.",
        createdAt: new Date('2024-01-20')
    },
    {
        name: "911 Carrera",
        brand: "Porsche",
        year: 2021,
        price: 98000,
        image: "https://example.com/images/porsche.jpg",
        description: "Classic sports car with modern technology, impeccable maintenance history.",
        createdAt: new Date('2024-02-10')
    },
    {
        name: "X5",
        brand: "BMW",
        year: 2022,
        price: 62000,
        image: "https://example.com/images/bmw.jpg",
        description: "Luxury SUV with all the bells and whistles, panoramic roof, leather interior.",
        createdAt: new Date('2024-01-25')
    },
    {
        name: "Camry Hybrid",
        brand: "Toyota",
        year: 2023,
        price: 32000,
        image: "https://example.com/images/camry.jpg",
        description: "Fuel-efficient hybrid sedan, perfect family car with advanced safety features.",
        createdAt: new Date('2024-02-05')
    },
    {
        name: "Range Rover Sport",
        brand: "Land Rover",
        year: 2022,
        price: 85000,
        image: "https://example.com/images/rangerover.jpg",
        description: "Luxury SUV with off-road capabilities, premium interior, and advanced tech features.",
        createdAt: new Date('2024-01-30')
    },
    {
        name: "S-Class",
        brand: "Mercedes-Benz",
        year: 2023,
        price: 110000,
        image: "https://example.com/images/mercedes.jpg",
        description: "Ultimate luxury sedan with state-of-the-art technology and comfort features.",
        createdAt: new Date('2024-02-15')
    },
    {
        name: "Corvette",
        brand: "Chevrolet",
        year: 2022,
        price: 75000,
        image: "https://example.com/images/corvette.jpg",
        description: "Mid-engine sports car with stunning performance and head-turning looks.",
        createdAt: new Date('2024-01-28')
    },
    {
        name: "Miata MX-5",
        brand: "Mazda",
        year: 2023,
        price: 28000,
        image: "https://example.com/images/miata.jpg",
        description: "Perfect convertible sports car for enthusiasts, lightweight and nimble handling.",
        createdAt: new Date('2024-02-08')
    }
];


module.exports.data = sampleCars;