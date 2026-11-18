# Contracts: Immersive AI Portfolio for Alishba

**Created**: 2026-08-26
**Feature**: specs/001-immersive-ai-portfolio/spec.md

---

## Status: Not Applicable

This portfolio project is a **static, single-tenant frontend site** with no external APIs, no backend services, and no programmatic interfaces exposed to other systems.

### Why No Contracts Are Defined

| Reason | Explanation |
|--------|-------------|
| **No external API** | The site does not expose REST/GraphQL endpoints, RPC methods, CLI commands, or any programmatic interface |
| **No inter-service communication** | No microservices, function calls between systems, or shared libraries |
| **No shared schemas** | All data is internal TypeScript modules; no schemas need to be shared across teams or systems |
| **No CLI** | Not a command-line tool |
| **No library** | Not a reusable package |
| **No mobile/desktop integration** | Not a native app exposing APIs |
| **No webhook targets** | No inbound or outbound webhook contracts |

### Internal Data Model

All data is defined in [`data-model.md`](./data-model.md) for internal reference only. These TypeScript interfaces (`Profile`, `Project`, `LearningJourneyStage`, `ContactOption`, `CinematicScene`, `VisualTheme`) are implementation artifacts — not external contracts.

### Contact Form Handling (Internal)

If a contact form is implemented via Next.js Server Actions, the action is an **internal server function** called by the client-side form component. It is not an externally callable API. The email is sent via Resend SDK, which handles its own SMTP contract internally.

If this changes in the future (e.g., the contact form API is exposed as a public endpoint for third-party use), contracts should be defined at that time.

### Conclusion

No `/contracts/` subdirectory with contract documents is needed for this project. This `README.md` serves as the record that the contracts phase was evaluated and found not applicable.