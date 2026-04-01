---
sidebar_position: 1
---

# Mahjong Hands

A web application for validating and analyzing Mahjong hands. It provides real-time feedback, intelligent grouping of tile combinations, and educational resources for players of all levels.

## Key Features

- Real-time hand validation for standard 4-set + 1-pair and 7-pairs win conditions
- Intelligent grouping that identifies Pungs, Kongs, and Chows with collision resolution
- Interactive tile management with drag-and-drop support
- Flower tile tracking
- Fully responsive design for desktop and mobile

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hand Builder -- the interactive playground for testing combinations |
| `/rules` | Comprehensive primer on basic Mahjong gameplay |
| `/glossary` | Visual guide to all Mahjong tiles and terms |
| `/scoring` | Fan system scoring guide |
| `/strategy` | Tips, tenpai patterns, and mastery principles |
| `/about` | About the project |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Language | TypeScript 5 |
| Routing | React Router DOM 7 |
| Drag and Drop | @dnd-kit |
| Icons | Lucide React |
| Styling | Vanilla CSS with design tokens and CSS Modules |
| Testing | Jest with Testing Library |
| Deployment | Cloudflare Workers |

## Design

The application uses a dark theme with green gradient highlights. Self-hosted Inter font with preloading for fast first contentful paint. Tile assets are optimized SVGs.
