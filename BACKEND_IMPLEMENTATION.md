# ConsultHUB Backend Implementation

The existing frontend remains intact. A production-shaped backend has been added under `backend/`, plus `src/api.js` as the integration layer.

## MVP flow

1. Student registers/logs in.
2. Student submits a free-text problem.
3. `POST /api/match` classifies it and ranks only verified mentors.
4. Student books a 10/15-minute consultation.
5. Hackathon test payment marks the booking confirmed.
6. Backend creates a consultation room ID.
7. Student/mentor can exchange messages.
8. Student submits a rating/feedback; mentor rating is recalculated.

## Important implementation choices

- MongoDB/Mongoose keeps the data model relational enough for bookings/payments while staying quick to build.
- JWT auth keeps the frontend simple.
- AI is optional: no API key means local deterministic matching; an OpenAI key enables structured classification with fallback.
- Verification is enforced server-side: matching queries `verified: true`.
- Payment secrets are intentionally server-side. The current endpoint is explicitly `test-payment`, not a fake production payment flow.
- Call infrastructure is represented by a room ID. Integrate a real Agora/Daily/Twilio token endpoint next.

## Next frontend integration

Replace the current in-memory actions one screen at a time with `src/api.js`:

- AuthCard → `api.login/register` and save `ch-token`.
- Home problem submission → `api.match(problem)`.
- Expert list → `api.mentors()` or the returned `match().mentors`.
- BookSheet → `api.createBooking()` → Razorpay order/checkout → payment verification.
- Sessions → `api.bookings()`.
- Messages → `api.messages()` / `api.sendMessage()`.
- Saved → `api.saved()` / `api.toggleSaved()`.
- Feedback → `api.feedback()`.
