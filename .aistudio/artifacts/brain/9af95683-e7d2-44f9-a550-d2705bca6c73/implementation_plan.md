# Realtor Growth Lab - Implementation Plan

A professional lead magnet platform designed to capture high-quality leads for real estate services by offering a free "Business Growth Ebook."

## User Review & Critical Decisions

> [!IMPORTANT]
> The application will use Firebase Firestore for persistent lead storage. Access to the ebook is granted immediately upon form submission.

- **Confirmed Decision 1**: The admin dashboard is accessible at `/gog` using the password `9931`.
- **Confirmed Decision 2**: Color palette will be a professional deep forest green and charcoal, derived from the provided PDF.
- **Ebook Mockup**: I will generate a 3D ebook cover asset to increase conversion rates.

## 1. Overview & Core Concept

- **What It Does**: A single-page landing funnel that captures realtor contact information in exchange for a value-packed PDF guide. It includes a private backend for the owner to view and manage these leads.
- **Target Audience**: Real estate agents, agency owners, and property developers.
- **Key Value**: Provides realtors with a roadmap to growth while building a high-intent marketing list for the service provider.

## 2. User Experience & Visual Design

- **Key User Flows**:
    1. **Landing**: User arrives, sees a professional ebook mockup and a "Get More Trust & Leads" value proposition.
    2. **Capture**: User enters Name, Phone, and Business Type (e.g., Independent, Agency, Developer).
    3. **Success**: Instant transition to a "Thank You" state with a prominent "Download Your Ebook" button.
    4. **Admin**: The owner visits `/gog`, enters `9931`, and views a clean, sortable table of all captured leads.

- **Visual Identity & Theme**:
    - *Aesthetic Direction*: Minimalist Professional / High-End Agency.
    - *Color Palette*:
        - Primary: Deep Forest Green (`#064E3B`)
        - Canvas: Clean Off-White (`#F9FAFB`)
        - Accents: Warm Gold or Slate for secondary elements.
    - *Typography*: High-character display serif for headlines (e.g., *Instrument Serif* or *Fraunces*) paired with a highly legible sans-serif for body (e.g., *Plus Jakarta Sans*).

- **Interactive Feedback**:
    - Form validation with immediate error messaging.
    - Smooth button transitions and loading states during submission.
    - Password validation feedback on the admin route.

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Firebase vs. Local Storage**:
    - *Chosen Approach*: Firebase Firestore.
    - *Why*: Ensures data persistence across sessions and allows the admin to view leads from any device.
- **Decision 2: Password Gate**:
    - *Chosen Approach*: Simple client-side password check for `/gog`.
    - *Why*: Provides the requested low-friction access for the owner without requiring complex Auth system setup for a single-user admin.

## 4. Technical Architecture & Data Strategy

```drawio
┌───────────────────────────────────────────────────────────┐
│                   Next.js App Router                      │
├────────────────────────────┬──────────────────────────────┤
│       Public Views         │       Protected Admin        │
│   (Landing + Lead Form)    │         (/gog Path)          │
└─────────────┬──────────────┴──────────────┬───────────────┘
              │                             │
              ▼                             ▼
    ┌───────────────────┐         ┌───────────────────┐
    │   Lead Capture    │         │   Lead Dashboard  │
    │  (Firestore Add)  │         │  (Firestore List) │
    └─────────┬─────────┘         └─────────┬─────────┘
              │                             │
              └──────────────┬──────────────┘
                             ▼
                  ┌────────────────────┐
                  │ Firebase Firestore │
                  │  (leads collection)│
                  └────────────────────┘
```

- **Data Model**:
    - `leads` collection:
        - `name`: string
        - `phone`: string
        - `businessType`: string
        - `createdAt`: timestamp

- **Interactive Component Mapping**:
    - `LeadForm`: Uses `react-hook-form` and `zod` for strict validation.
    - `AdminGate`: Password input with state-based rendering for the dashboard.
    - `LeadTable`: Responsive Tailwind table with tabular numbers and clean typography.
