import React from 'react';
import { TestimonialsSection } from './ui/testimonials-with-marquee';

const TESTIMONIALS = [
  {
    author: {
      name: "Elara Vance",
      handle: "@elarav",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "The Midnight Sandalwood transformed my evening ritual. It burns so cleanly and the scent lingers like a soft memory.",
  },
  {
    author: {
      name: "Julian Thorne",
      handle: "@jthorne_studio",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "As a designer, I appreciate the sculptural beauty as much as the fragrance. These aren't just candles; they're art.",
  },
  {
    author: {
      name: "Sienna Rivers",
      handle: "@siennacollection",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Finally, a sustainable brand that doesn't compromise on luxury. The packaging alone is a masterpiece.",
  },
  {
    author: {
      name: "Marcus Chen",
      handle: "@m_chen_living",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "The Atlas Cedar is my go-to for focused mornings. Clean, crisp, and incredibly calming.",
  },
  {
    author: {
      name: "Aria Montgomery",
      handle: "@ariamont",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    text: "Truly bespoke quality. I've given these as gifts multiple times and they never fail to impress.",
  }
];

export const Testimonials: React.FC = () => {
  return (
    <TestimonialsSection
      title="Trusted by Sensory Seekers"
      description="Join our community of individuals who value the quiet poetry of light and fragrance."
      testimonials={TESTIMONIALS}
    />
  );
};
