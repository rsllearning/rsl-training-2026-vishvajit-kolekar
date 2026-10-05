# AI Migration Report

## Migration Summary

V2 routes were added alongside the unchanged V1 routes:

- GET /api/v2/profile
- POST /api/v2/settings
- GET /api/v2/feed

V2 uses controller, service, repository, domain, DTO, and exception-handling packages. Persistence uses Spring Data JDBC repositories and @Table entities. The settings endpoint keeps V1's response behavior, it doesn't persist a setting, since V1 has no persistence implementation or settings table.

## Dependency Mapping Prompt and Findings

**Prompt used:**

I need to migrate this legacy Spring Boot API. Before writing any code, analyze the supplied files in legacy/controller and legacy/dao, plus schema.sql, data.sql, application.properties, and the existing integration test.

List every endpoint, HTTP method, request parameter type, edge case you can extract from the code and all other importent aspect that we need to understand before starting the migration.

Do not edit files. Return concise V1 contract table.

**Verified findings:** LegacyProfileDao.fetchUserProfile queries by user ID and blocks a private profile unless the supplied requester ID string exactly matches the target ID, returning 403 {"error":"Profile is private"} or 404 {"error":"Not found"} for those cases. A successful profile contains id, `username`, `follower_count`, and an empty `badges` array.`SettingsControllerV1.updateSettings` accepts only the exact strings `true` or `false` — valid input returns `200 {"status":"success"}`, invalid input returns an empty `400`. Its save logic is only a comment, so persistence isn't implemented. `LegacyFeedDao.getFeed` selects non-deleted posts for the requested user, orders by `created_at DESC`, and limits the result to two. It maps `created_at` as a `long`, so the JSON value is numeric. The seed data gives Alice's expected feed post IDs as `104` then `102`.

## Golden Master Evidence

The four required V1 response bodies were saved under `golden/`.

| Request | Status | Saved body |
|---|---:|---|
| `GET /api/v1/profile?user_id=1&requester_id=1` | 200 | `golden/golden_profile_1.json` |
| `GET /api/v1/profile?user_id=2&requester_id=3` | 403 | `golden/golden_profile_2.json` |
| `POST /api/v1/settings?user_id=1`, form `mute_notifications=true` | 200 | `golden/golden_settings.json` |
| `GET /api/v1/feed?user_id=1` | 200 | `golden/golden_feed.json` |

Actual saved responses:

### golden/golden_profile_1.json

```json
{
  "badges": [],
  "id": 1,
  "follower_count": 500,
  "username": "alice"
}
```

### golden/golden_profile_2.json

```json
{
  "error": "Profile is private"
}
```

### golden/golden_settings.json

```json
{
  "status": "success"
}
```

### golden/golden_feed.json

```json
[
  {
    "id": 104,
    "content": "Wow, learning to code is fun",
    "created_at": 1700000030
  },
  {
    "id": 102,
    "content": "Having a great day",
    "created_at": 1700000010
  }
]
```

## Architecture Generation Prompt

**Prompt used:**

Please add V2 versions of the profile, settings, and feed APIs to this project. Use the V1 code, schema, test data, existing tests, and golden response files as the reference. Put the new code under social/modern/ and dont add changes in V1 code.

The new routes should be /api/v2/profile, /api/v2/settings, and /api/v2/feed. Keep the same request parameters and form format as V1, and match its response fields, types, status codes, and error bodies. Don't add behavior that isn't in V1. If something is unclear, point it out instead of guessing.

Apply these five architectural guidelines exactly:
1. Enforce Strict Separation of Concerns (N-Tier Architecture): The codebase should be refactored into distinct controller, service, repository and dto. 
2. Modernize the Persistence Layer: Fully deprecate raw JdbcTemplate queries and manual SQL mapping. Migrate all database interactions to Spring Data JDBC
3. Implement Strict Data Transfer Objects (DTOs): Eliminate the use of loosely typed and raw @RequestParam parsing.
4. Centralize Global Exception Handling: Remove manual ResponseEntity HTTP status returns from the business logic. The application should return standard Java exceptions
5. Maintain Absolute API Contract Integrity (Zero Regressions): While the endpoints will be versioned to /api/v2/..., the structural shape, data types, and status codes of the JSON responses should perfectly match the V1 baseline to ensure backward compatibility for existing mobile clients.

Please use Spring Data JDBC, not JPA. Before coding tell me which files you plan to add. Then make the changes and run the tests. 

## Verification Tests and Hallucinations

The four V2 response bodies were saved under verification/. All four pairs matched:

| Request | V1 result | V2 result | Result |
|---|---|---|---|
| `GET /api/v1/profile?user_id=1&requester_id=1` vs. V2 equivalent | 200; Alice profile | 200; same fields and values | Match |
| `GET /api/v1/profile?user_id=2&requester_id=3` vs. V2 equivalent | 403; private-profile error | 403; same error | Match |
| `POST /api/v1/settings?user_id=1`, `mute_notifications=true` vs. V2 equivalent | 200; success object | 200; same object | Match |
| `GET /api/v1/feed?user_id=1` vs. V2 equivalent | 200; posts 104 then 102 | 200; same posts and numeric timestamps | Match |

**Red-team comparison prompt used:**

**Prompt Used:**

compare saved V1 and V2 responses and their status codes. Check them against the V1 code and test data. For each real mismatch, show the request, what V1 returned, what V2 returned, and which behavior changed.

**Confirmed implementation-time regression:** The first V2 run returned HTTP `500` for profile and feed requests. The server log showed Spring Data JDBC querying quoted lowercase identifiers such as `"users"`, while H2 had created the table as `USERS` from the unquoted `schema.sql`. The profile test initially also got `500` instead of the expected `403`/`404` on its private and missing-user cases. This was one root cause affecting multiple requests, not three separate regressions. Entity table/column annotations were changed to match H2's uppercase identifiers. The final tests and saved response comparisons passed after that change.

The final required response captures show no remaining confirmed regression. The optional V1 captures for private-profile owner access and `mute_notifications=false` don't have corresponding saved V2 response files, so those exact pairs weren't directly compared. The V2 integration tests cover the missing-profile response, invalid settings response, and empty feed, but no matching V2 curl capture files were saved for those optional cases.

## Correction Prompts and Results

**Issue**:

The schema creates tables and columns without quotes, for example `CREATE TABLE users` and `is_private`. H2 stores those unquoted names in uppercase: `USERS`, `IS_PRIVATE`, etc.

Spring Data JDBC initially generated SQL using lowercase identifiers such as "users" and `"is_private"`. identifiers are case sensitive, so H2 looked for a lowercase "users" table, couldn't find it, and returned an SQL error. That caused V2 profile/feed requests to return `500`.

The fix was to change the V2 entity mappings to match H2's uppercase names, for example `@Table("USERS")` and `@Column("IS_PRIVATE")`. After that, the requests and tests passed.

**Correction prompt:**

My V2 profile and feed requests are returning HTTP 500. The server log says a table such as "users" was not found, with "USERS" listed as a candidate.
Please inspect the current entity annotations and schema.sql, then fix the table and column mappings so Spring Data JDBC can read the existing H2 tables.

## Final Validation

- `./gradlew clean test` — passed after the final changes. This includes the legacy and V2 integration tests.
- Focused V2 feed integration test — passed after correcting the entity identifier mapping.
- Saved response comparison using `diff -u <(jq -S . V1.json) <(jq -S . V2.json)` — all four required pairs matched.
- Runtime checks returned Alice's V2 feed with IDs `104`, `102` in descending timestamp order, and Charlie's empty feed as `[]`.
- The application was stopped after runtime checks; port `8080` was verified free.

## Zero-Downtime Rollback Strategy

Keep V1 deployed and set up a runtime changeable API gateway or reverse proxy before releasing V2. If a V2 handler fails while the application process stays healthy, switch the V2 routes back to the equivalent V1 routes: `/api/v2/profile` to `/api/v1/profile` etc. Preserve HTTP methods, query parameters, form bodies, and expected response status. 

This repository has no gateway, route switch, health check configuration. For that failure mode, keep healthy V1 capacity in a separate, and switch traffic there using the external router.