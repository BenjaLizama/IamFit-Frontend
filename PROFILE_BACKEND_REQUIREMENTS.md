# IAMFIT - Backend Requirements for Profile Screen

Date: 2026-06-09

This document explains which profile-screen features require backend support.

Some UI changes are frontend-only, such as spacing, sticky chips, collapsible header, chart styling, and visual hierarchy. The items below need backend endpoints, DTO fields, or aggregation support.


## 1. Profile Main Data

The profile screen needs a single endpoint to load the authenticated user's profile.

```http
GET /api/v1/users/profile
```

Recommended response:

```json
{
  "id": "uuid",
  "credentialId": "uuid",
  "email": "user@example.com",
  "nickname": "LucianoxXx",
  "avatarUrl": "https://...",
  "age": 24,
  "sex": "MALE",
  "height": 175,
  "weight": 72,
  "goal": "GAIN_MUSCLE",
  "activityLevel": "MODERATE",
  "allergies": ["mariscos"],
  "foodPreferences": ["alta proteina"],
  "foodDislikes": ["brocoli"],
  "trainingLimitations": ["dolor rodilla"],
  "availableEquipment": ["MANCUERNAS", "PESO_CORPORAL"]
}
```


## 2. Edit Profile

The frontend needs an endpoint to update editable profile fields.

```http
PATCH /api/v1/users/profile
```

Recommended request:

```json
{
  "nickname": "Luciano",
  "avatarUrl": "https://...",
  "age": 24,
  "sex": "MALE",
  "height": 175,
  "weight": 72,
  "goal": "GAIN_MUSCLE",
  "activityLevel": "MODERATE",
  "allergies": ["mariscos"],
  "foodPreferences": ["alta proteina"],
  "foodDislikes": ["brocoli"],
  "trainingLimitations": ["dolor rodilla"],
  "availableEquipment": ["MANCUERNAS", "PESO_CORPORAL"]
}
```

Important:

- Enum values should match the feeding, routine, and M.I.A. services.
- The backend should return the updated profile after saving.
- Updating these values should affect future M.I.A., meal-plan, and routine-generation context.


## 3. Profile Summary Stats

The profile header needs summary counters beside the avatar.

Recommended endpoint:

```http
GET /api/v1/users/profile/summary
```

Recommended response:

```json
{
  "workoutsCount": 12,
  "foodEntriesCount": 38,
  "goalsCompletedCount": 4,
  "activeRoutinesCount": 2,
  "activeMealPlansCount": 1,
  "currentStreakDays": 5
}
```

These counters can also be included inside `GET /profile` if the backend prefers one endpoint.


## 4. Profile Context for M.I.A.

Because M.I.A. is contextual, the frontend needs a way to show what data is being used by the assistant.

Recommended endpoint:

```http
GET /api/v1/users/profile/context
```

Recommended response:

```json
{
  "nickname": "Luciano",
  "goal": "GAIN_MUSCLE",
  "activityLevel": "MODERATE",
  "allergies": ["mariscos"],
  "foodPreferences": ["alta proteina"],
  "foodDislikes": ["brocoli"],
  "trainingLimitations": ["dolor rodilla"],
  "availableEquipment": ["MANCUERNAS", "PESO_CORPORAL"],
  "activeRoutineIds": ["uuid"],
  "activeMealPlanId": "uuid"
}
```

Purpose:

- Let the user understand why M.I.A. gives certain recommendations.
- Help debug whether profile changes are reaching M.I.A.


## 5. Activity Chart Data

The profile design includes an activity chart. This requires backend aggregation data.

Recommended endpoint:

```http
GET /api/v1/users/profile/activity?type=GENERAL|FOOD|WORKOUTS|ROUTINES|WEIGHT&period=MONTHLY
```

Recommended response:

```json
{
  "type": "WORKOUTS",
  "period": "MONTHLY",
  "unit": "workouts",
  "label": "Entrenos completados por mes",
  "points": [
    { "label": "JAN", "value": 4 },
    { "label": "FEB", "value": 6 },
    { "label": "MAR", "value": 8 }
  ],
  "highlight": {
    "label": "MAY",
    "value": 12
  }
}
```

Possible chart types:

```text
GENERAL
FOOD
WORKOUTS
ROUTINES
WEIGHT
CALORIES
PROTEIN
```

This is needed so the frontend can change the chart when the user taps chips like `Comidas`, `Ejercicios`, `Rutinas`, or `Peso`.


## 6. Active Plans and Routines Summary

The profile screen should show the user's active routine and active meal plan.

Existing endpoints may already cover this:

```http
GET /api/v1/routines?status=ACTIVE
GET /api/v1/food/meal-plans/active
```

If the backend wants to optimize profile loading, it can expose a combined endpoint:

```http
GET /api/v1/users/profile/active-items
```

Recommended response:

```json
{
  "activeRoutines": [
    {
      "id": "uuid",
      "name": "Piernas intermedio",
      "durationMinutes": 45
    }
  ],
  "activeMealPlan": {
    "id": "uuid",
    "name": "Plan ganar músculo",
    "goal": "GAIN_MUSCLE"
  }
}
```


## 7. Limits Shown in Profile

The profile/settings area may show user limits.

Existing endpoints:

```http
GET /api/v1/routines/limits
GET /api/v1/food/limits
GET /api/v1/food/meal-plans/limits
```

No new backend route is required if those endpoints are stable.


## 8. Avatar Upload

If the profile design allows changing the avatar, backend support is needed.

Recommended endpoint:

```http
POST /api/v1/users/profile/avatar
```

Request:

```text
multipart/form-data
file: image
```

Recommended response:

```json
{
  "avatarUrl": "https://..."
}
```

If avatar upload is not planned now, the frontend can use a placeholder image or initials.


## 9. Change Password

The profile/settings screen should link to change password.

This is already documented separately in:

```text
PASSWORD_BACKEND_REQUIREMENTS.md
```

Needed endpoint:

```http
POST /api/v1/auth/change-password
```


## 10. Frontend-Only Changes

These do not require backend work:

- Removing duplicated username.
- Making stat numbers larger than labels.
- Improving chip labels to avoid truncation.
- Sticky chips while scrolling.
- Collapsible profile header.
- Better chart visual styling.
- Better contrast for the central `+` button.
- Empty states and loading skeletons.


## 11. Recommended Minimum Backend Scope

Minimum required for a useful first version:

```http
GET   /api/v1/users/profile
PATCH /api/v1/users/profile
GET   /api/v1/users/profile/summary
GET   /api/v1/users/profile/activity?type=...&period=...
```

Optional but useful:

```http
GET  /api/v1/users/profile/context
POST /api/v1/users/profile/avatar
GET  /api/v1/users/profile/active-items
```


## 12. Important Integration Note

Profile data should become the source of truth for:

- M.I.A. context.
- Meal-plan generation defaults.
- Routine-generation defaults.
- User allergies and disliked foods.
- Training limitations and available equipment.

When the profile is updated, future M.I.A., feeding, and routine responses should use the updated values.
