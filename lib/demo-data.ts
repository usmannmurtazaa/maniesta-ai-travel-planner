// lib/demo-data.ts

import { DestinationInfo } from './types';

interface DemoItinerary {
  overview: string;
  destinationInfo: DestinationInfo;
  days: any[];
}

export const DEMO_ITINERARIES: Record<string, DemoItinerary> = {
  tokyo: {
    overview:
      "Tokyo is a dazzling blend of traditional culture and cutting-edge modernity. This itinerary balances iconic landmarks, delicious food experiences, and immersive cultural activities across the city's diverse neighborhoods.",
    destinationInfo: {
      name: 'Tokyo',
      country: 'Japan',
      description:
        'A vibrant metropolis where ancient temples meet futuristic technology, offering world-class cuisine, shopping, and culture.',
      bestTimeToVisit: 'March-May (cherry blossom season) or October-November (autumn colors)',
      localTips: [
        'Get a Suica/Pasmo card for easy public transit',
        'Many restaurants take cash, so carry yen',
        'Learn basic Japanese greetings - locals appreciate the effort',
        'Book popular restaurants in advance',
      ],
      recommendedPlaces: [
        'Shibuya Crossing',
        'Senso-ji Temple',
        'Tsukiji Outer Market',
        'Meiji Shrine',
        'teamLab Borderless',
        'Shinjuku Gyoen',
      ],
    },
    days: [
      {
        dayNumber: 1,
        date: '2024-01-01',
        morning: [
          {
            id: 'a1',
            time: '09:00',
            title: 'Senso-ji Temple',
            description: "Visit Tokyo's oldest temple in Asakusa, explore the Nakamise shopping street.",
            category: 'morning',
            location: 'Asakusa',
            cost: 0,
            duration: '2 hours',
            transportation: 'Subway',
          },
          {
            id: 'a2',
            time: '11:30',
            title: 'Tsukiji Outer Market',
            description: 'Sample fresh sushi and street food at the famous fish market.',
            category: 'morning',
            location: 'Tsukiji',
            cost: 30,
            duration: '1.5 hours',
            transportation: 'Subway',
          },
        ],
        afternoon: [
          {
            id: 'a3',
            time: '14:00',
            title: 'Meiji Shrine',
            description: 'Walk through the peaceful forest to this beautiful Shinto shrine.',
            category: 'afternoon',
            location: 'Harajuku',
            cost: 0,
            duration: '1.5 hours',
            transportation: 'Subway',
          },
          {
            id: 'a4',
            time: '16:00',
            title: 'Harajuku & Omotesando',
            description: 'Explore quirky fashion shops and high-end boutiques.',
            category: 'afternoon',
            location: 'Harajuku',
            cost: 20,
            duration: '2 hours',
            transportation: 'Walking',
          },
        ],
        evening: [
          {
            id: 'a5',
            time: '19:00',
            title: 'Shibuya Crossing',
            description: "Experience the world's busiest pedestrian crossing and explore Shibuya.",
            category: 'evening',
            location: 'Shibuya',
            cost: 0,
            duration: '1 hour',
            transportation: 'Train',
          },
          {
            id: 'a6',
            time: '20:30',
            title: 'Izakaya Dinner',
            description: 'Enjoy Japanese pub food and drinks in a local izakaya.',
            category: 'evening',
            location: 'Shibuya',
            cost: 40,
            duration: '2 hours',
            transportation: 'Walking',
          },
        ],
        restaurants: [
          { id: 'r1', name: 'Sushi Dai', cuisine: 'Sushi', priceLevel: 'moderate', location: 'Tsukiji', rating: 4.7 },
          { id: 'r2', name: 'Ichiran Ramen', cuisine: 'Ramen', priceLevel: 'budget', location: 'Shibuya', rating: 4.5 },
        ],
        transportation: 'Use Tokyo Metro and JR lines',
        totalCost: 90,
      },
      {
        dayNumber: 2,
        date: '2024-01-02',
        morning: [
          {
            id: 'b1',
            time: '09:30',
            title: 'teamLab Borderless',
            description: 'Immersive digital art museum with stunning interactive installations.',
            category: 'morning',
            location: 'Odaiba',
            cost: 35,
            duration: '2.5 hours',
            transportation: 'Train',
          },
        ],
        afternoon: [
          {
            id: 'b2',
            time: '13:00',
            title: 'Shinjuku Gyoen',
            description: 'Beautiful park combining Japanese, English, and French garden styles.',
            category: 'afternoon',
            location: 'Shinjuku',
            cost: 5,
            duration: '2 hours',
            transportation: 'Train',
          },
          {
            id: 'b3',
            time: '15:30',
            title: 'Golden Gai',
            description: 'Explore narrow alleys with tiny, unique bars in Shinjuku.',
            category: 'afternoon',
            location: 'Shinjuku',
            cost: 15,
            duration: '1.5 hours',
            transportation: 'Walking',
          },
        ],
        evening: [
          {
            id: 'b4',
            time: '19:00',
            title: 'Tokyo Tower View',
            description: 'See the city illuminated from the observation deck.',
            category: 'evening',
            location: 'Minato',
            cost: 25,
            duration: '1.5 hours',
            transportation: 'Train',
          },
        ],
        restaurants: [
          { id: 'r3', name: 'Tempura Kondo', cuisine: 'Tempura', priceLevel: 'expensive', location: 'Ginza', rating: 4.8 },
          { id: 'r4', name: 'Afuri Ramen', cuisine: 'Ramen', priceLevel: 'budget', location: 'Shinjuku', rating: 4.4 },
        ],
        transportation: 'Tokyo Metro and walking',
        totalCost: 80,
      },
    ],
  },
  paris: {
    overview:
      "Paris, the City of Light, enchants with its art, cuisine, and romance. This itinerary guides you through iconic landmarks, world-class museums, and hidden gems, ensuring a perfect balance of culture and leisure.",
    destinationInfo: {
      name: 'Paris',
      country: 'France',
      description:
        'The capital of France, renowned for its art, fashion, gastronomy, and culture. Home to the Eiffel Tower, Louvre, and charming cafés.',
      bestTimeToVisit: 'April-June and September-November (mild weather, fewer crowds)',
      localTips: [
        'Buy a Paris Museum Pass to skip lines at major attractions',
        'Learn basic French phrases - locals appreciate the effort',
        'Use the metro, it\'s efficient and covers the whole city',
        'Book popular restaurants in advance, especially for dinner',
      ],
      recommendedPlaces: [
        'Eiffel Tower',
        'Louvre Museum',
        'Montmartre',
        'Notre-Dame Cathedral',
        'Champs-Élysées',
        'Versailles Palace',
      ],
    },
    days: [
      {
        dayNumber: 1,
        date: '2024-01-01',
        morning: [
          {
            id: 'p1',
            time: '09:00',
            title: 'Eiffel Tower',
            description: 'Visit the iconic symbol of Paris and enjoy panoramic views from the top.',
            category: 'morning',
            location: 'Champ de Mars',
            cost: 25,
            duration: '2 hours',
            transportation: 'Metro',
          },
        ],
        afternoon: [
          {
            id: 'p2',
            time: '13:00',
            title: 'Louvre Museum',
            description: 'Explore one of the world\'s greatest art museums, home to the Mona Lisa.',
            category: 'afternoon',
            location: 'Rue de Rivoli',
            cost: 17,
            duration: '3 hours',
            transportation: 'Walking',
          },
        ],
        evening: [
          {
            id: 'p3',
            time: '18:00',
            title: 'Seine River Cruise',
            description: 'Enjoy a scenic boat cruise along the Seine with stunning views of the city.',
            category: 'evening',
            location: 'Pont Neuf',
            cost: 20,
            duration: '1.5 hours',
            transportation: 'Walking',
          },
        ],
        restaurants: [
          { id: 'pr1', name: 'Le Jules Verne', cuisine: 'French', priceLevel: 'expensive', location: 'Eiffel Tower', rating: 4.7 },
          { id: 'pr2', name: 'L\'As du Fallafel', cuisine: 'Middle Eastern', priceLevel: 'budget', location: 'Le Marais', rating: 4.5 },
        ],
        transportation: 'Metro and walking',
        totalCost: 62,
      },
      {
        dayNumber: 2,
        date: '2024-01-02',
        morning: [
          {
            id: 'p4',
            time: '09:30',
            title: 'Montmartre & Sacré-Cœur',
            description: 'Wander through the artistic neighborhood and visit the basilica with panoramic views.',
            category: 'morning',
            location: 'Montmartre',
            cost: 0,
            duration: '2.5 hours',
            transportation: 'Metro',
          },
        ],
        afternoon: [
          {
            id: 'p5',
            time: '14:00',
            title: 'Musée d\'Orsay',
            description: 'Admire Impressionist masterpieces in a stunning former railway station.',
            category: 'afternoon',
            location: 'Rue de Lille',
            cost: 16,
            duration: '2.5 hours',
            transportation: 'Metro',
          },
        ],
        evening: [
          {
            id: 'p6',
            time: '19:00',
            title: 'Dinner in Le Marais',
            description: 'Enjoy dinner in the trendy Le Marais district with its many restaurants and boutiques.',
            category: 'evening',
            location: 'Le Marais',
            cost: 45,
            duration: '2 hours',
            transportation: 'Metro',
          },
        ],
        restaurants: [
          { id: 'pr3', name: 'Bistrot Paul Bert', cuisine: 'French Bistro', priceLevel: 'moderate', location: '11th Arr.', rating: 4.6 },
          { id: 'pr4', name: 'Breizh Café', cuisine: 'Crêperie', priceLevel: 'moderate', location: 'Le Marais', rating: 4.4 },
        ],
        transportation: 'Metro and walking',
        totalCost: 61,
      },
    ],
  },
  newyork: {
    overview:
      "New York City is an exhilarating metropolis that never sleeps. This itinerary captures the essence of the Big Apple—iconic landmarks, world-class museums, diverse neighborhoods, and unforgettable dining experiences.",
    destinationInfo: {
      name: 'New York City',
      country: 'United States',
      description:
        'The largest city in the U.S., known for its skyscrapers, Central Park, Broadway, and cultural diversity. A global hub of finance, art, and entertainment.',
      bestTimeToVisit: 'April-June and September-November (pleasant weather, fewer crowds)',
      localTips: [
        'Purchase a MetroCard for unlimited subway and bus rides',
        'Walk or use the subway to avoid traffic congestion',
        'Book Broadway tickets in advance for popular shows',
        'Explore neighborhoods beyond Manhattan for authentic experiences',
      ],
      recommendedPlaces: [
        'Statue of Liberty',
        'Central Park',
        'Times Square',
        'Empire State Building',
        'Metropolitan Museum of Art',
        'Brooklyn Bridge',
      ],
    },
    days: [
      {
        dayNumber: 1,
        date: '2024-01-01',
        morning: [
          {
            id: 'n1',
            time: '09:00',
            title: 'Statue of Liberty & Ellis Island',
            description: 'Take a ferry to visit the iconic statue and learn about immigration history.',
            category: 'morning',
            location: 'Battery Park',
            cost: 25,
            duration: '3 hours',
            transportation: 'Subway + Ferry',
          },
        ],
        afternoon: [
          {
            id: 'n2',
            time: '13:30',
            title: 'Wall Street & 9/11 Memorial',
            description: 'Walk through the financial district and pay respects at the moving memorial.',
            category: 'afternoon',
            location: 'Financial District',
            cost: 0,
            duration: '2 hours',
            transportation: 'Walking',
          },
        ],
        evening: [
          {
            id: 'n3',
            time: '18:00',
            title: 'Times Square',
            description: 'Experience the dazzling lights and energy of Times Square.',
            category: 'evening',
            location: 'Midtown Manhattan',
            cost: 0,
            duration: '1.5 hours',
            transportation: 'Subway',
          },
        ],
        restaurants: [
          { id: 'nr1', name: 'Katz\'s Delicatessen', cuisine: 'Deli', priceLevel: 'moderate', location: 'Lower East Side', rating: 4.6 },
          { id: 'nr2', name: 'Joe\'s Pizza', cuisine: 'Pizza', priceLevel: 'budget', location: 'Greenwich Village', rating: 4.5 },
        ],
        transportation: 'Subway and walking',
        totalCost: 25,
      },
      {
        dayNumber: 2,
        date: '2024-01-02',
        morning: [
          {
            id: 'n4',
            time: '09:30',
            title: 'Central Park',
            description: 'Stroll through the iconic park, rent a bike, or enjoy a relaxing morning.',
            category: 'morning',
            location: 'Manhattan',
            cost: 0,
            duration: '2 hours',
            transportation: 'Subway',
          },
        ],
        afternoon: [
          {
            id: 'n5',
            time: '13:00',
            title: 'Metropolitan Museum of Art',
            description: 'Explore one of the world\'s finest art collections spanning 5,000 years.',
            category: 'afternoon',
            location: 'Fifth Avenue',
            cost: 30,
            duration: '3 hours',
            transportation: 'Walking',
          },
        ],
        evening: [
          {
            id: 'n6',
            time: '18:00',
            title: 'Broadway Show',
            description: 'Watch a world-class Broadway performance in the Theater District.',
            category: 'evening',
            location: 'Theater District',
            cost: 100,
            duration: '2.5 hours',
            transportation: 'Subway',
          },
        ],
        restaurants: [
          { id: 'nr3', name: 'Shake Shack', cuisine: 'Burgers', priceLevel: 'budget', location: 'Madison Square Park', rating: 4.4 },
          { id: 'nr4', name: 'Le Bernardin', cuisine: 'Seafood', priceLevel: 'expensive', location: 'Midtown', rating: 4.8 },
        ],
        transportation: 'Subway and walking',
        totalCost: 130,
      },
    ],
  },
};

export default DEMO_ITINERARIES;